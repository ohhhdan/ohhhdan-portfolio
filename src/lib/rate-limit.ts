/**
 * Sliding window rate limiter using an in-memory store.
 * Suitable for single-process deployments (e.g. Next.js serverless or standalone).
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const store = new Map<string, RateLimitEntry>();

// Clean up expired entries every 60 seconds
const CLEANUP_INTERVAL_MS = 60_000;
let cleanupTimer: ReturnType<typeof setInterval> | null = null;

function ensureCleanupRunning(): void {
  if (cleanupTimer !== null) return;
  cleanupTimer = setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of store) {
      if (now >= entry.resetTime) {
        store.delete(key);
      }
    }
    // Stop the timer if the store is empty to avoid keeping the process alive
    if (store.size === 0 && cleanupTimer !== null) {
      clearInterval(cleanupTimer);
      cleanupTimer = null;
    }
  }, CLEANUP_INTERVAL_MS);

  // Allow the Node.js process to exit even if the timer is running
  if (cleanupTimer && typeof cleanupTimer === 'object' && 'unref' in cleanupTimer) {
    cleanupTimer.unref();
  }
}

/**
 * Check and apply a rate limit for the given identifier (typically an IP address).
 *
 * @param ip        - Unique identifier for the requester
 * @param limit     - Maximum number of requests allowed in the window (default: 5)
 * @param windowMs  - Duration of the sliding window in milliseconds (default: 15 minutes)
 * @returns An object with `success` (whether the request is allowed) and `remaining` count
 */
export function rateLimit(
  ip: string,
  limit: number = 5,
  windowMs: number = 15 * 60 * 1000
): { success: boolean; remaining: number } {
  ensureCleanupRunning();

  const now = Date.now();
  const entry = store.get(ip);

  // No existing entry or window has expired: start a fresh window
  if (!entry || now >= entry.resetTime) {
    store.set(ip, { count: 1, resetTime: now + windowMs });
    return { success: true, remaining: limit - 1 };
  }

  // Within the current window
  if (entry.count < limit) {
    entry.count += 1;
    const remaining = limit - entry.count;
    return { success: true, remaining };
  }

  // Rate limit exceeded
  return { success: false, remaining: 0 };
}

/**
 * Reset the rate limit entry for a given identifier.
 * Useful for testing or manual overrides.
 */
export function rateLimitReset(ip: string): void {
  store.delete(ip);
}
