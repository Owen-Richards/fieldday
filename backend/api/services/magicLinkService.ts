import crypto from 'crypto';
import Redis from 'ioredis';
import { magicLinkRateLimiter } from '../utils/rateLimit';

const redis = process.env.REDIS_URL ? new Redis(process.env.REDIS_URL) : null;
const memoryStore = new Map<
  string,
  { email: string; consumed: boolean; expiresAt: number; redirectUrl?: string }
>();

const MAGIC_LINK_TTL = 15 * 60 * 1000; // 15 minutes

export class MagicLinkService {
  async generateMagicLink(
    email: string,
    redirectUrl?: string
  ): Promise<{ token: string; success: boolean; error?: string }> {
    // Check rate limit
    const rateLimit = await magicLinkRateLimiter.checkLimit(email);
    if (!rateLimit.allowed) {
      return {
        token: '',
        success: false,
        error: 'Too many requests. Please try again later.',
      };
    }

    // Generate secure token
    const token = crypto.randomBytes(32).toString('hex');
    const key = `magic:${token}`;
    const expiresAt = Date.now() + MAGIC_LINK_TTL;

    const data = {
      email,
      consumed: false,
      redirectUrl: redirectUrl || '/',
    };

    if (redis) {
      await redis.setex(key, Math.ceil(MAGIC_LINK_TTL / 1000), JSON.stringify(data));
    } else {
      memoryStore.set(key, { ...data, expiresAt });
    }

    // Send magic link
    await this.sendMagicLink(email, token, redirectUrl);

    return { token, success: true };
  }

  async validateMagicLink(
    token: string
  ): Promise<{ email: string; redirectUrl: string; valid: boolean; error?: string }> {
    const key = `magic:${token}`;

    let linkData: { email: string; consumed: boolean; redirectUrl?: string } | null = null;

    if (redis) {
      const data = await redis.get(key);
      if (data) {
        linkData = JSON.parse(data);
      }
    } else {
      const stored = memoryStore.get(key);
      if (stored && stored.expiresAt > Date.now()) {
        linkData = stored;
      }
    }

    if (!linkData) {
      return { email: '', redirectUrl: '/', valid: false, error: 'Link expired or not found' };
    }

    if (linkData.consumed) {
      return { email: '', redirectUrl: '/', valid: false, error: 'Link already used' };
    }

    // Mark as consumed
    linkData.consumed = true;

    if (redis) {
      const ttl = await redis.ttl(key);
      await redis.setex(key, ttl, JSON.stringify(linkData));
    } else {
      const stored = memoryStore.get(key);
      if (stored) {
        stored.consumed = true;
      }
    }

    return {
      email: linkData.email,
      redirectUrl: linkData.redirectUrl || '/',
      valid: true,
    };
  }

  private async sendMagicLink(email: string, token: string, redirectUrl?: string): Promise<void> {
    const baseUrl = process.env.APP_URL || 'http://localhost:3000';
    const link = `${baseUrl}/api/auth/magic/verify?token=${token}`;

    if (process.env.SENDGRID_API_KEY) {
      // Send email via SendGrid
      console.log(`[Magic Link] Would send email to ${email}: ${link}`);
      // Actual SendGrid implementation here
    } else {
      // Development mode - log to console
      console.log(`\n✨ Magic Link for ${email}:\n${link}\n`);
    }
  }
}

export const magicLinkService = new MagicLinkService();
