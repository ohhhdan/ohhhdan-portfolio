/**
 * Normalize how we read admin env vars — fixes common .env mistakes (quotes, line breaks in hash).
 */

function stripOuterQuotes(s: string): string {
  let t = s.trim();
  while (
    (t.startsWith('"') && t.endsWith('"')) ||
    (t.startsWith("'") && t.endsWith("'"))
  ) {
    t = t.slice(1, -1).trim();
  }
  return t;
}

/** CMS secret as stored (quotes stripped, not whitespace-collapsed). */
export function readCmsSecretRaw(): string {
  const v = process.env.CMS_SECRET;
  if (v == null) return '';
  return stripOuterQuotes(v);
}

/**
 * Bcrypt hash: strip quotes and remove accidental newlines/spaces (broken copy-paste).
 */
export function readAdminBcryptHashRaw(): string {
  const v = process.env.ADMIN_PASSWORD_BCRYPT;
  if (v == null) return '';
  return stripOuterQuotes(v).replace(/\s+/g, '');
}

/**
 * Development-only mirror password (same value `npm run setup-admin` prints).
 * Ignored unless NODE_ENV === 'development'. Never set this in production hosting.
 */
export function readAdminLoginPlainDev(): string {
  if (process.env.NODE_ENV !== 'development') return '';
  const v = process.env.ADMIN_LOGIN_PLAIN;
  if (v == null) return '';
  return stripOuterQuotes(v);
}
