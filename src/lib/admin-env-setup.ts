import { readAdminBcryptHashRaw, readAdminPasswordPlain, readCmsSecretRaw } from './admin-env-read';

/** Human-readable steps shown when admin auth env vars are missing (login API + UI). */
export const ADMIN_ENV_SETUP_STEPS = [
  'On this page, use Quick local setup (development only), or run npm run setup-admin in the project root.',
  'Stop the dev server completely, then npm run dev again so .env reloads.',
  'Sign in with the password you chose or the one the setup step printed.',
] as const;

export function describeAdminLoginEnvIssues(): string[] {
  const hash = readAdminBcryptHashRaw();
  const plain = readAdminPasswordPlain();
  const secret = readCmsSecretRaw();
  const issues: string[] = [];
  if (!hash && !plain) {
    issues.push('No admin password is set (add ADMIN_PASSWORD or ADMIN_PASSWORD_BCRYPT).');
  }
  if (!secret) {
    issues.push('CMS_SECRET is missing or empty.');
  } else if (secret.length < 16) {
    issues.push(`CMS_SECRET must be at least 16 characters (currently ${secret.length}).`);
  }
  return issues;
}

export function isAdminLoginEnvReady(): boolean {
  return describeAdminLoginEnvIssues().length === 0;
}

export const ADMIN_LOGIN_PASSWORD_HELP =
  'Use Quick local setup on this page, restart npm run dev, then sign in with that password. Or set ADMIN_PASSWORD and CMS_SECRET in .env manually.';
