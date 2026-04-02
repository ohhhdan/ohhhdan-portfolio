/**
 * Writes CMS_SECRET, ADMIN_PASSWORD_BCRYPT, and ADMIN_LOGIN_PLAIN (dev fallback) to .env.
 * If .env.local exists, updates the same keys there so stale overrides don’t break login.
 */
import fs from 'node:fs';
import path from 'node:path';
import { randomBytes } from 'node:crypto';
import bcrypt from 'bcryptjs';

const root = process.cwd();
const envPath = path.join(root, '.env');
const envLocalPath = path.join(root, '.env.local');

function upsertKey(content, key, value) {
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

/** Quote for .env so `$` in bcrypt isn’t mangled by variable expansion. */
function q(v) {
  const s = String(v);
  if (/[\s#"']/.test(s)) return `"${s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
  return s;
}

const cmsSecret = randomBytes(32).toString('base64url');
const plainPassword = randomBytes(18).toString('base64url');
const bcryptHash = bcrypt.hashSync(plainPassword, 12);

function writeEnvFile(filePath, prior) {
  let body = prior;
  let out = body.trimEnd();
  if (out && !out.endsWith('\n')) out += '\n';
  if (out) out += '\n';
  out = upsertKey(out || '', 'CMS_SECRET', q(cmsSecret));
  out = upsertKey(out, 'ADMIN_PASSWORD_BCRYPT', q(bcryptHash));
  out = upsertKey(out, 'ADMIN_LOGIN_PLAIN', q(plainPassword));
  fs.writeFileSync(filePath, out.endsWith('\n') ? out : `${out}\n`, 'utf-8');
}

let prior = '';
try {
  prior = fs.readFileSync(envPath, 'utf-8');
} catch {
  prior = '';
}
writeEnvFile(envPath, prior);

let updatedLocal = false;
try {
  const localPrior = fs.readFileSync(envLocalPath, 'utf-8');
  writeEnvFile(envLocalPath, localPrior);
  updatedLocal = true;
} catch {
  /* no .env.local */
}

console.log('\n========================================');
console.log('  Admin env written');
console.log('========================================\n');
console.log(`  ${envPath}`);
if (updatedLocal) console.log(`  ${envLocalPath} (synced — this file overrides .env in Next.js)\n`);
else console.log('  (.env.local not found — only .env was written)\n');

console.log('Your admin password (copy it now):\n');
console.log(`  ${plainPassword}\n`);
console.log('ADMIN_LOGIN_PLAIN was set to the same value for local dev (development only).');
console.log('Restart the dev server: Ctrl+C, then npm run dev\n');
