import Redis from 'ioredis';

// Redis client (optional, fallback to in-memory)
const redis = process.env.REDIS_URL ? new Redis(process.env.REDIS_URL) : null;

// In-memory fallback store
const memoryStore = new Map<string, { count: number; resetAt: number }>();

export class RateLimiter {
  constructor(
    private readonly maxAttempts: number,
    private readonly windowMs: number,
    private readonly keyPrefix: string
  ) {}

  async checkLimit(
    identifier: string
  ): Promise<{ allowed: boolean; remaining: number; resetAt: number }> {
    const key = `${this.keyPrefix}:${identifier}`;
    const now = Date.now();
    const resetAt = now + this.windowMs;

    if (redis) {
      // Redis implementation
      const multi = redis.multi();
      multi.incr(key);
      multi.expire(key, Math.ceil(this.windowMs / 1000));
      const results = await multi.exec();

      if (!results) {
        throw new Error('Redis transaction failed');
      }

      const count = results[0][1] as number;
      const remaining = Math.max(0, this.maxAttempts - count);

      return {
        allowed: count <= this.maxAttempts,
        remaining,
        resetAt: now + this.windowMs,
      };
    } else {
      // In-memory fallback
      const record = memoryStore.get(key);

      if (!record || record.resetAt < now) {
        memoryStore.set(key, { count: 1, resetAt });
        return {
          allowed: true,
          remaining: this.maxAttempts - 1,
          resetAt,
        };
      }

      record.count++;
      const remaining = Math.max(0, this.maxAttempts - record.count);

      return {
        allowed: record.count <= this.maxAttempts,
        remaining,
        resetAt: record.resetAt,
      };
    }
  }

  async reset(identifier: string): Promise<void> {
    const key = `${this.keyPrefix}:${identifier}`;

    if (redis) {
      await redis.del(key);
    } else {
      memoryStore.delete(key);
    }
  }
}

// Cleanup old entries periodically (for in-memory store)
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of memoryStore.entries()) {
    if (value.resetAt < now) {
      memoryStore.delete(key);
    }
  }
}, 60000); // Clean every minute

export const otpRateLimiter = new RateLimiter(3, 60000, 'otp'); // 3 per minute
export const magicLinkRateLimiter = new RateLimiter(3, 60000, 'magic'); // 3 per minute
export const loginAttemptLimiter = new RateLimiter(5, 900000, 'login'); // 5 per 15 minutes
