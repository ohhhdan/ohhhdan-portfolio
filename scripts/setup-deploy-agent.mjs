import fs from 'node:fs';
import path from 'node:path';
import { randomBytes } from 'node:crypto';
import { detectLocalIp } from './deploy-agent-lib.mjs';

const root = path.resolve(import.meta.dirname, '..');
const configPath = path.join(root, 'deploy-agent.config.json');
const prodEnvPath = path.join(root, 'docker', 'synology', 'production.env');

const secret = randomBytes(24).toString('base64url');
const port = 3939;

const config = {
  nasPath: '\\\\192.168.0.122\\docker\\ohhhdan-portfolio',
  nasProjectPath: '/volume1/docker/ohhhdan-portfolio',
  sshHost: '192.168.0.122',
  sshUser: 'YOUR_NAS_USERNAME',
  agentHost: '',
  rebuildOnNas: true,
  agentPort: port,
  agentSecret: secret,
};

if (fs.existsSync(configPath)) {
  const existing = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  const keepUser =
    existing.sshUser && existing.sshUser !== 'YOUR_NAS_USERNAME' ? existing.sshUser : config.sshUser;
  Object.assign(config, existing, { agentPort: port, agentSecret: secret, sshUser: keepUser });
}

fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + '\n', 'utf8');

const ip = config.agentHost?.trim() || detectLocalIp(config.sshHost);
const agentUrl = `http://${ip}:${port}/deploy`;

const envLines = [
  '',
  '# Deploy agent (PC must run: npm run deploy-agent:serve)',
  `DEPLOY_AGENT_URL=${agentUrl}`,
  `DEPLOY_AGENT_SECRET=${secret}`,
  '',
];

if (fs.existsSync(prodEnvPath)) {
  let prodEnv = fs.readFileSync(prodEnvPath, 'utf8');
  prodEnv = prodEnv.replace(/\n# Deploy agent[\s\S]*?(?=\n[A-Z_]+=|\n*$)/, '');
  prodEnv = prodEnv.replace(/\nDEPLOY_AGENT_URL=.*\n?/g, '\n');
  prodEnv = prodEnv.replace(/\nDEPLOY_AGENT_SECRET=.*\n?/g, '\n');
  fs.writeFileSync(prodEnvPath, prodEnv.trimEnd() + envLines.join('\n'), 'utf8');
} else {
  console.warn(`Warning: ${prodEnvPath} not found — run npm run generate-prod-env first.`);
}

console.log('\nDeploy agent configured.\n');
console.log(`  ${configPath}`);
console.log('\n1. Edit deploy-agent.config.json — set sshUser to your NAS username.');
console.log('2. Start the agent on this PC (leave running):');
console.log('       npm run deploy-agent:serve');
console.log('3. Install weekly auto-check:');
console.log('       npm run install-weekly-deploy');
console.log('4. Copy production.env to the NAS (or npm run copy-to-nas).');
const nasPrefix = config.sshHost.split('.').slice(0, 3).join('.');
if (!ip.startsWith(`${nasPrefix}.`)) {
  console.log(`\nNote: PC IP (${ip}) is not on the same subnet as NAS (${config.sshHost}).`);
  console.log('If "Pull changes" fails, set agentHost in deploy-agent.config.json to your PC IP on the home network.');
}
console.log(`\nAdmin "Pull changes" will call: ${agentUrl}\n`);
