import { Request, Response } from 'express';
import { z } from 'zod';
import { otpService } from '../services/otpService';
import { magicLinkService } from '../services/magicLinkService';
import { userService } from '../services/userService';
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  rotateRefreshToken,
} from '../utils/jwt';
import { AuthRequest } from '../middleware/auth';

// Validation schemas
const otpRequestSchema = z
  .object({
    phone: z.string().optional(),
    email: z.string().email().optional(),
  })
  .refine((data) => data.phone || data.email, {
    message: 'Either phone or email is required',
  });

const otpVerifySchema = z
  .object({
    phone: z.string().optional(),
    email: z.string().email().optional(),
    code: z.string().length(6),
    deviceInfo: z.record(z.any()).optional(),
  })
  .refine((data) => data.phone || data.email, {
    message: 'Either phone or email is required',
  });

const magicRequestSchema = z.object({
  email: z.string().email(),
  redirectUrl: z.string().optional(),
});

const refreshSchema = z.object({
  refreshToken: z.string().optional(),
});

export class AuthController {
  async requestOtp(req: Request, res: Response): Promise<void> {
    console.log('🚀 Request OTP called with body:', req.body);
    try {
      const data = otpRequestSchema.parse(req.body);
      const identifier = data.phone || data.email!;

      const result = await otpService.generateOtp(identifier);

      if (!result.success) {
        res.status(429).json({ success: false, error: result.error });
        return;
      }

      console.log('✅ OTP generated successfully');
      res.status(204).send();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, error: error.errors[0].message });
        return;
      }
      console.error('OTP request error:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }

  async verifyOtp(req: Request, res: Response): Promise<void> {
    try {
      const data = otpVerifySchema.parse(req.body);
      const identifier = data.phone || data.email!;

      // Validate OTP
      const validation = await otpService.validateOtp(identifier, data.code);

      if (!validation.valid) {
        res.status(400).json({ success: false, error: validation.error });
        return;
      }

      // Find or create user
      const user = await userService.findOrCreateUser({
        email: data.email,
        phone: data.phone,
        provider: data.email ? 'email' : 'phone',
      });

      // Generate tokens
      const accessToken = signAccessToken({
        sub: user.id,
        email: user.email,
        phone: user.phone,
        roles: user.roles as any,
      });

      const refreshToken = signRefreshToken({
        sub: user.id,
        email: user.email,
        phone: user.phone,
        roles: user.roles as any,
      });

      // Set cookie for web, return tokens for mobile
      const isWeb = req.headers['user-agent']?.includes('Mozilla');

      if (isWeb) {
        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
      }

      res.json({
        success: true,
        data: {
          accessToken,
          refreshToken: isWeb ? undefined : refreshToken,
          user: {
            id: user.id,
            email: user.email,
            phone: user.phone,
            roles: user.roles,
            profile: user.profile,
          },
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, error: error.errors[0].message });
        return;
      }
      console.error('OTP verify error:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }

  async requestMagicLink(req: Request, res: Response): Promise<void> {
    try {
      const data = magicRequestSchema.parse(req.body);

      const result = await magicLinkService.generateMagicLink(data.email, data.redirectUrl);

      if (!result.success) {
        res.status(429).json({ success: false, error: result.error });
        return;
      }

      res.status(204).send();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, error: error.errors[0].message });
        return;
      }
      console.error('Magic link request error:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }

  async verifyMagicLink(req: Request, res: Response): Promise<void> {
    try {
      const token = req.query.token as string;

      if (!token) {
        res.status(400).json({ success: false, error: 'Token required' });
        return;
      }

      // Validate magic link
      const validation = await magicLinkService.validateMagicLink(token);

      if (!validation.valid) {
        res.status(400).json({ success: false, error: validation.error });
        return;
      }

      // Find or create user
      const user = await userService.findOrCreateUser({
        email: validation.email,
        provider: 'email',
      });

      // Generate tokens
      const accessToken = signAccessToken({
        sub: user.id,
        email: user.email,
        roles: user.roles as any,
      });

      const refreshToken = signRefreshToken({
        sub: user.id,
        email: user.email,
        roles: user.roles as any,
      });

      // Check if web request
      const isWeb = req.headers['user-agent']?.includes('Mozilla');

      if (isWeb) {
        // Set cookie and redirect
        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.cookie('accessToken', accessToken, {
          httpOnly: false, // Allow JS access for immediate use
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 15 * 60 * 1000, // 15 minutes
        });

        res.redirect(302, validation.redirectUrl);
      } else {
        // Return JSON for API clients
        res.json({
          success: true,
          data: {
            accessToken,
            refreshToken,
            user: {
              id: user.id,
              email: user.email,
              roles: user.roles,
              profile: user.profile,
            },
          },
        });
      }
    } catch (error) {
      console.error('Magic link verify error:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }

  async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const data = refreshSchema.parse(req.body);
      const refreshToken = data.refreshToken || req.cookies?.refreshToken;

      if (!refreshToken) {
        res.status(401).json({ success: false, error: 'Refresh token required' });
        return;
      }

      // Verify and rotate
      const payload = verifyRefreshToken(refreshToken);
      const { accessToken, refreshToken: newRefreshToken } = rotateRefreshToken(payload);

      // Set new refresh token cookie for web
      const isWeb = req.headers['user-agent']?.includes('Mozilla');

      if (isWeb) {
        res.cookie('refreshToken', newRefreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
      }

      res.json({
        success: true,
        data: {
          accessToken,
          refreshToken: isWeb ? undefined : newRefreshToken,
        },
      });
    } catch (error) {
      console.error('Refresh error:', error);
      res.status(403).json({ success: false, error: 'Invalid refresh token' });
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    try {
      // Clear cookies
      res.clearCookie('refreshToken');
      res.clearCookie('accessToken');

      // TODO: Add refresh token to blacklist in Redis

      res.status(204).send();
    } catch (error) {
      console.error('Logout error:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }

  async getCurrentUser(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ success: false, error: 'Not authenticated' });
        return;
      }

      const user = await userService.findUserById(req.user.id);

      if (!user) {
        res.status(404).json({ success: false, error: 'User not found' });
        return;
      }

      res.json({
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
            phone: user.phone,
            username: user.username,
            roles: user.roles,
            profile: user.profile,
            reliability: user.reliability,
            actAs: req.user.actAs,
          },
        },
      });
    } catch (error) {
      console.error('Get user error:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }

  async oauthCallback(req: Request, res: Response): Promise<void> {
    try {
      // Stub implementation - would handle OAuth provider callbacks
      const { provider, email, providerId } = req.body;

      if (!provider || !email || !providerId) {
        res.status(400).json({ success: false, error: 'Missing OAuth data' });
        return;
      }

      // Find or create user
      const user = await userService.findOrCreateUser({
        email,
        provider,
        providerId,
      });

      // Generate tokens
      const accessToken = signAccessToken({
        sub: user.id,
        email: user.email,
        roles: user.roles as any,
      });

      const refreshToken = signRefreshToken({
        sub: user.id,
        email: user.email,
        roles: user.roles as any,
      });

      res.json({
        success: true,
        data: {
          accessToken,
          refreshToken,
          user: {
            id: user.id,
            email: user.email,
            roles: user.roles,
            profile: user.profile,
          },
        },
      });
    } catch (error) {
      console.error('OAuth callback error:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  }
}

export const authController = new AuthController();
