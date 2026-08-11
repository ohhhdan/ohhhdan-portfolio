import fs from 'node:fs';
import path from 'node:path';
import { randomBytes } from 'node:crypto';
import bcrypt from 'bcryptjs';

function upsertKey(content: string, key: string, value: string): string {
  const lines = content.length ? content.split(/\r?\n/) : [];
  let replaced = false;
  const next = lines.map((line) => {
    if (/^\s*#/.test(line) || !line.trim()) return line;
    const m = line.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*=(.*)$/);
    if (m && m[1] === key) {
      replaced = true;
      return `${key}=${value}`;
    }
    return line;
  });
  if (!replaced) {
    if (next.length && next[next.length - 1].trim() !== '') next.push('');
    next.push(`${key}=${value}`);
  }
  return next.join('\n');
}

function q(v: string): string {
  const s = String(v);
  if (/[\s#"']/.test(s)) return `"${s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
  return s;
}

export interface AdminBootstrapResult {
  password: string;
  files: string[];
}

/**
 * Writes admin env vars to .env (+ .env.local when present).
 * Uses ADMIN_PASSWORD (simple) plus bcrypt + dev plain mirror for compatibility.
 */
export function bootstrapAdminEnv(chosenPassword?: string): AdminBootstrapResult {
  const root = process.cwd();
  const envPath = path.join(root, '.env');
  const envLocalPath = path.join(root, '.env.local');

  const password = chosenPassword?.trim() || randomBytes(12).toString('base64url');
  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters.');
  }

  const cmsSecret = randomBytes(32).toString('base64url');
  const bcryptHash = bcrypt.hashSync(password, 12);

  function writeEnvFile(filePath: string, prior: string) {
    let out = prior.trimEnd();
    if (out && !out.endsWith('\n')) out += '\n';
    if (out) out += '\n';
    out = upsertKey(out || '', 'CMS_SECRET', q(cmsSecret));
    out = upsertKey(out, 'ADMIN_PASSWORD', q(password));
    out = upsertKey(out, 'ADMIN_PASSWORD_BCRYPT', q(bcryptHash));
    out = upsertKey(out, 'ADMIN_LOGIN_PLAIN', q(password));
    fs.writeFileSync(filePath, out.endsWith('\n') ? out : `${out}\n`, 'utf-8');
  }

  let prior = '';
  try {
    prior = fs.readFileSync(envPath, 'utf-8');
  } catch {
    prior = '';
  }
  writeEnvFile(envPath, prior);

  const files = [envPath];
  try {
    const localPrior = fs.readFileSync(envLocalPath, 'utf-8');
    writeEnvFile(envLocalPath, localPrior);
    files.push(envLocalPath);
  } catch {
    /* no .env.local */
  }

  return { password, files };
}
