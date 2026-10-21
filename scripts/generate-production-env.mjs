/**
 * Writes docker/synology/.env for NAS production deploy.
 * Usage: node scripts/generate-production-env.mjs [your-domain.com]
 * Default domain: www.ohhhdan.com
 */
import fs from 'node:fs';
import path from 'node:path';
import { randomBytes } from 'node:crypto';
import bcrypt from 'bcryptjs';

const root = process.cwd();
const outPath = path.join(root, 'docker', 'synology', '.env');
const prodOutPath = path.join(root, 'docker', 'synology', 'production.env');
const domain = process.argv[2]?.trim() || 'www.ohhhdan.com';

const cmsSecret = randomBytes(32).toString('base64url');
const adminPassword = randomBytes(16).toString('base64url');
const bcryptHash = bcrypt.hashSync(adminPassword, 12);

/** Docker Compose treats `$var` in env files as substitution; bcrypt hashes use `$2b$12$...`. */
function escapeForDockerCompose(value) {
  return String(value).replace(/\$/g, '$$');
}

const lines = [
  '# Generated for Synology / production. Do not commit.',
  `DOMAIN=${domain}`,
  '',
  'CMS_SECRET=' + cmsSecret,
  'ADMIN_PASSWORD=' + adminPassword,
  'ADMIN_PASSWORD_BCRYPT=' + escapeForDockerCompose(bcryptHash),
  '',
  'DATA_DIR=/app/data',
  'NODE_ENV=production',
  'SCORM_PACKAGES_PATH=/app/scorm-packages',
  '',
  '# Contact form (optional — leave blank to disable email sending)',
  'CONTACT_TO_EMAIL=',
  'SMTP_HOST=',
  'SMTP_PORT=587',
  'SMTP_USER=',
  'SMTP_PASS=',
  'SMTP_FROM=',
  '',
];

fs.mkdirSync(path.dirname(outPath), { recursive: true });
const content = lines.join('\n') + '\n';
fs.writeFileSync(outPath, content, 'utf-8');
fs.writeFileSync(prodOutPath, content, 'utf-8');

console.log('\n========================================');
console.log('  Production env written');
console.log('========================================\n');
console.log(`  ${outPath}\n`);
console.log(`  ${prodOutPath}\n`);
console.log('Domain (edit DOMAIN in .env if wrong):');
console.log(`  ${domain}\n`);
console.log('Admin password for /admin/login (save this now):\n');
console.log(`  ${adminPassword}\n`);
console.log('Copy docker/synology/.env to your NAS before starting the container.');
console.log('See docker/synology/DEPLOY.md for Namecheap + Synology steps.\n');
