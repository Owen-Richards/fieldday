import crypto from 'crypto';
import Redis from 'ioredis';
import { otpRateLimiter } from '../utils/rateLimit';

const redis = process.env.REDIS_URL ? new Redis(process.env.REDIS_URL) : null;
const memoryStore = new Map<string, { code: string; attempts: number; expiresAt: number }>();

const OTP_TTL = 5 * 60 * 1000; // 5 minutes
const MAX_ATTEMPTS = 5;
const BLOCKED_TTL = 15 * 60 * 1000; // 15 minutes block after max attempts

export class OtpService {
  async generateOtp(
    identifier: string
  ): Promise<{ code: string; success: boolean; error?: string }> {
    // Check rate limit
    const rateLimit = await otpRateLimiter.checkLimit(identifier);
    if (!rateLimit.allowed) {
      return {
        code: '',
        success: false,
        error: 'Too many requests. Please try again later.',
      };
    }

    // Check if blocked
    const isBlocked = await this.isBlocked(identifier);
    if (isBlocked) {
      return {
        code: '',
        success: false,
        error: 'Too many failed attempts. Please try again later.',
      };
    }

    // Generate 6-digit code
    const code = crypto.randomInt(100000, 999999).toString();
    const key = `otp:${identifier}`;
    const expiresAt = Date.now() + OTP_TTL;

    if (redis) {
      await redis.setex(key, Math.ceil(OTP_TTL / 1000), JSON.stringify({ code, attempts: 0 }));
    } else {
      memoryStore.set(key, { code, attempts: 0, expiresAt });
    }

    // Send OTP (actual implementation would use Twilio/SendGrid)
    await this.sendOtp(identifier, code);

    return { code, success: true };
  }

  async validateOtp(
    identifier: string,
    inputCode: string
  ): Promise<{ valid: boolean; error?: string }> {
    const key = `otp:${identifier}`;

    let otpData: { code: string; attempts: number } | null = null;

    if (redis) {
      const data = await redis.get(key);
      if (data) {
        otpData = JSON.parse(data);
      }
    } else {
      const stored = memoryStore.get(key);
      if (stored && stored.expiresAt > Date.now()) {
        otpData = { code: stored.code, attempts: stored.attempts };
      }
    }

    if (!otpData) {
      return { valid: false, error: 'OTP expired or not found' };
    }

    // Check attempts
    if (otpData.attempts >= MAX_ATTEMPTS) {
      await this.blockIdentifier(identifier);
      await this.clearOtp(identifier);
      return { valid: false, error: 'Too many failed attempts' };
    }

    // Validate code
    if (otpData.code !== inputCode) {
      otpData.attempts++;

      if (redis) {
        const ttl = await redis.ttl(key);
        await redis.setex(key, ttl, JSON.stringify(otpData));
      } else {
        const stored = memoryStore.get(key);
        if (stored) {
          stored.attempts = otpData.attempts;
        }
      }

      if (otpData.attempts >= MAX_ATTEMPTS) {
        await this.blockIdentifier(identifier);
        await this.clearOtp(identifier);
        return { valid: false, error: 'Too many failed attempts' };
      }

      return {
        valid: false,
        error: `Invalid code. ${MAX_ATTEMPTS - otpData.attempts} attempts remaining.`,
      };
    }

    // Success - clear OTP
    await this.clearOtp(identifier);
    return { valid: true };
  }

  private async clearOtp(identifier: string): Promise<void> {
    const key = `otp:${identifier}`;

    if (redis) {
      await redis.del(key);
    } else {
      memoryStore.delete(key);
    }
  }

  private async blockIdentifier(identifier: string): Promise<void> {
    const key = `blocked:${identifier}`;
    const expiresAt = Date.now() + BLOCKED_TTL;

    if (redis) {
      await redis.setex(key, Math.ceil(BLOCKED_TTL / 1000), '1');
    } else {
      memoryStore.set(key, { code: '', attempts: 0, expiresAt });
    }
  }

  private async isBlocked(identifier: string): Promise<boolean> {
    const key = `blocked:${identifier}`;

    if (redis) {
      const blocked = await redis.get(key);
      return !!blocked;
    } else {
      const blocked = memoryStore.get(key);
      return !!(blocked && blocked.expiresAt > Date.now());
    }
  }

  private async sendOtp(identifier: string, code: string): Promise<void> {
    const isPhone = /^\+?[1-9]\d{1,14}$/.test(identifier);

    if (isPhone && process.env.TWILIO_ACCOUNT_SID) {
      // Send SMS via Twilio
      console.log(`[OTP] Would send SMS to ${identifier}: ${code}`);
      // Actual Twilio implementation here
    } else if (!isPhone && process.env.SENDGRID_API_KEY) {
      // Send email via SendGrid
      console.log(`[OTP] Would send email to ${identifier}: ${code}`);
      // Actual SendGrid implementation here
    } else {
      // Development mode - log to console
      console.log(`\n🔐 OTP Code for ${identifier}: ${code}\n`);
    }
  }
}

export const otpService = new OtpService();
