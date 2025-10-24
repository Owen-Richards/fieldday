import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/jwt';
import { userService } from '../services/userService';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email?: string;
    phone?: string;
    roles: string[];
    actAs?: 'player' | 'parent' | 'organizer';
  };
}

export async function authenticateToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // Check for token in header or cookie
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1] || req.cookies?.accessToken;

    if (!token) {
      res.status(401).json({ success: false, error: 'No token provided' });
      return;
    }

    // Verify token
    const payload = verifyAccessToken(token);

    // Check actAs from header or query
    const actAs = (req.headers['x-act-as'] as string) || (req.query.actAs as string);

    req.user = {
      id: payload.sub,
      email: payload.email,
      phone: payload.phone,
      roles: payload.roles,
      actAs: (actAs as any) || payload.actAs,
    };

    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(403).json({ success: false, error: 'Invalid or expired token' });
  }
}

export function requireRole(role: string) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Not authenticated' });
      return;
    }

    if (!req.user.roles.includes(role)) {
      res.status(403).json({ success: false, error: 'Insufficient permissions' });
      return;
    }

    next();
  };
}

export function requireActAs(scope: 'player' | 'parent' | 'organizer') {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Not authenticated' });
      return;
    }

    if (req.user.actAs !== scope) {
      res.status(403).json({ success: false, error: `Must be acting as ${scope}` });
      return;
    }

    next();
  };
}
