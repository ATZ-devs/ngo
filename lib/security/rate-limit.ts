import "server-only";

interface RateLimitBucket {
  count: number;
  resetAt: number;
}

interface RateLimitInput {
  key: string;
  limit: number;
  windowMs: number;
}

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

const buckets = new Map<string, RateLimitBucket>();

function cleanupExpiredBuckets(now: number) {
  for (const [key, bucket] of buckets.entries()) {
    if (bucket.resetAt <= now) {
      buckets.delete(key);
    }
  }
}

export function consumeRateLimit(input: RateLimitInput): RateLimitResult {
  const now = Date.now();
  cleanupExpiredBuckets(now);

  const current = buckets.get(input.key);
  if (!current || current.resetAt <= now) {
    buckets.set(input.key, {
      count: 1,
      resetAt: now + input.windowMs,
    });

    return {
      allowed: true,
      remaining: Math.max(0, input.limit - 1),
      retryAfterSeconds: Math.ceil(input.windowMs / 1000),
    };
  }

  current.count += 1;
  buckets.set(input.key, current);

  const retryAfterSeconds = Math.max(1, Math.ceil((current.resetAt - now) / 1000));
  const remaining = Math.max(0, input.limit - current.count);

  return {
    allowed: current.count <= input.limit,
    remaining,
    retryAfterSeconds,
  };
}
