import { readAdminBcryptHashRaw, readCmsSecretRaw } from './admin-env-read';

/** Human-readable steps shown when admin auth env vars are missing (login API + UI). */
export const ADMIN_ENV_SETUP_STEPS = [
  'Run `npm run setup-admin` in the project root. It updates `.env` (and `.env.local` if present) and prints your password.',
  'Stop the dev server completely, then `npm run dev` again.',
  'If you still have an old `.env.local`, it overrides `.env` — the setup script syncs both now.',
  'Production: set `CMS_SECRET` and `ADMIN_PASSWORD_BCRYPT` in the host dashboard (do not set `ADMIN_LOGIN_PLAIN` there).',
] as const;

export function describeAdminLoginEnvIssues(): string[] {
  const hash = readAdminBcryptHashRaw();
  const secret = readCmsSecretRaw();
  const issues: string[] = [];
  if (!hash) {
    issues.push('ADMIN_PASSWORD_BCRYPT is missing or empty.');
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

/** Short hint when bcrypt rejects (avoid blaming hash-password if they used setup-admin). */
export const ADMIN_LOGIN_PASSWORD_HELP =
  'Run `npm run setup-admin`, use the password it prints, restart `npm run dev`. In development, `.env` can also include ADMIN_LOGIN_PLAIN=that_same_password so login matches even if the bcrypt line is wrong.';
