import { NextRequest } from 'next/server';

/**
 * Validates the Bearer token on admin API requests.
 * Set ADMIN_TOKEN in your environment variables.
 * Returns true if authorized, false otherwise.
 */
export function isAuthorized(request: NextRequest): boolean {
  const token = process.env.ADMIN_TOKEN;
  if (!token) return false;

  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) return false;

  const provided = authHeader.slice(7);
  // Constant-time comparison to prevent timing attacks
  if (provided.length !== token.length) return false;
  let mismatch = 0;
  for (let i = 0; i < token.length; i++) {
    mismatch |= provided.charCodeAt(i) ^ token.charCodeAt(i);
  }
  return mismatch === 0;
}

export const UNAUTHORIZED = new Response(
  JSON.stringify({ error: 'Unauthorized' }),
  { status: 401, headers: { 'Content-Type': 'application/json' } }
);
