import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import os from 'node:os';

const EXCLUDE_DIRS = new Set(['node_modules', '.next', '.git', 'out', 'build', 'coverage']);
const EXCLUDE_FILES = new Set(['.deploy-state.json']);

export function getProjectRoot() {
  return path.resolve(import.meta.dirname, '..');
}

export function loadConfig(root = getProjectRoot()) {
  const configPath = path.join(root, 'deploy-agent.config.json');
  if (!fs.existsSync(configPath)) {
    throw new Error('Missing deploy-agent.config.json — run: npm run setup-deploy-agent');
  }
  return JSON.parse(fs.readFileSync(configPath, 'utf8'));
}

function shouldInclude(relPath) {
  const parts = relPath.split(/[/\\]/);
  if (parts.some((p) => EXCLUDE_DIRS.has(p))) return false;
  if (EXCLUDE_FILES.has(path.basename(relPath))) return false;
  return true;
}

export function computeDeployHash(root = getProjectRoot()) {
  const hash = crypto.createHash('sha256');

  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      const rel = path.relative(root, full).replace(/\\/g, '/');
      if (!shouldInclude(rel)) continue;
      if (entry.isDirectory()) {
        walk(full);
        continue;
      }
      if (!entry.isFile()) continue;
      const stat = fs.statSync(full);
      hash.update(rel);
      hash.update(String(stat.size));
      hash.update(String(stat.mtimeMs));
    }
  }

  walk(root);
  return hash.digest('hex');
}

function readState(root) {
  const statePath = path.join(root, '.deploy-state.json');
  if (!fs.existsSync(statePath)) return null;
  try {
    return JSON.parse(fs.readFileSync(statePath, 'utf8'));
  } catch {
    return null;
  }
}

function writeState(root, state) {
  fs.writeFileSync(path.join(root, '.deploy-state.json'), JSON.stringify(state, null, 2) + '\n', 'utf8');
}

function ensureNasDirs(nasPath) {
  fs.mkdirSync(path.join(nasPath, 'docker', 'synology', 'data'), { recursive: true });
  fs.mkdirSync(path.join(nasPath, 'docker', 'synology', 'scorm-packages'), { recursive: true });
}

function syncProductionEnv(root, nasPath) {
  const srcEnv = path.join(root, 'docker', 'synology', '.env');
  const destEnv = path.join(nasPath, 'docker', 'synology', 'production.env');
  if (!fs.existsSync(srcEnv)) {
    throw new Error('Missing docker/synology/.env — run: npm run generate-prod-env www.yourdomain.com');
  }
  fs.copyFileSync(srcEnv, destEnv);
}

export function copyToNas(root, nasPath) {
  if (!fs.existsSync(nasPath)) {
    throw new Error(`NAS path not found: ${nasPath}`);
  }

  ensureNasDirs(nasPath);
  syncProductionEnv(root, nasPath);

  if (process.platform === 'win32') {
    const result = spawnSync(
      'robocopy',
      [
        root,
        nasPath,
        '/E',
        '/XD',
        'node_modules',
        '.next',
        'out',
        'build',
        'coverage',
        '.git',
        '/XF',
        '.env.local',
        '/R:2',
        '/W:2',
        '/NFL',
        '/NDL',
        '/NJH',
        '/NJS',
        '/nc',
        '/ns',
        '/np',
      ],
      { encoding: 'utf8', shell: true },
    );
    if (result.status > 7) {
      throw new Error(`robocopy failed with exit code ${result.status}\n${result.stderr || result.stdout}`);
    }
    return;
  }

  throw new Error('Automatic copy is supported on Windows only. Use git pull on the NAS instead.');
}

export function rebuildOnNas(config) {
  if (!config.rebuildOnNas) {
    return { skipped: true, message: 'NAS rebuild disabled in config.' };
  }
  if (!config.sshHost || !config.sshUser || config.sshUser === 'YOUR_NAS_USERNAME') {
    return { skipped: true, message: 'SSH not configured — files copied; rebuild manually on NAS.' };
  }

  const remoteDir = config.nasProjectPath || '/volume1/docker/ohhhdan-portfolio';
  const cmd =
    `cd ${remoteDir} && sudo docker compose -f docker/synology/docker-compose.yml up -d --build`;

  const result = spawnSync('ssh', [`${config.sshUser}@${config.sshHost}`, cmd], {
    encoding: 'utf8',
    shell: process.platform === 'win32',
  });

  if (result.status !== 0) {
    return {
      skipped: false,
      ok: false,
      message:
        'Files copied but NAS rebuild failed. Set up SSH keys or run rebuild manually on the NAS.',
      detail: (result.stderr || result.stdout || '').trim(),
    };
  }

  return { skipped: false, ok: true, message: 'NAS container rebuilt.' };
}

export function runDeployAgent(options = {}) {
  const root = getProjectRoot();
  const config = loadConfig(root);
  const force = Boolean(options.force);
  const hash = computeDeployHash(root);
  const previous = readState(root);

  if (!force && previous?.hash === hash) {
    return {
      ok: true,
      changed: false,
      message: 'No local changes since last deploy.',
      hash,
    };
  }

  copyToNas(root, config.nasPath);
  const rebuild = rebuildOnNas(config);

  const state = {
    hash,
    deployedAt: new Date().toISOString(),
    nasPath: config.nasPath,
  };
  writeState(root, state);

  return {
    ok: true,
    changed: true,
    message: rebuild.ok
      ? 'Changes copied to NAS and container rebuilt.'
      : 'Changes copied to NAS.',
    hash,
    rebuild,
  };
}

export function detectLocalIp(preferHost) {
  const candidates = [];
  for (const entries of Object.values(os.networkInterfaces())) {
    for (const entry of entries || []) {
      if (entry.family === 'IPv4' && !entry.internal) {
        candidates.push(entry.address);
      }
    }
  }

  if (preferHost) {
    const prefix = preferHost.split('.').slice(0, 3).join('.');
    const sameSubnet = candidates.find((ip) => ip.startsWith(`${prefix}.`));
    if (sameSubnet) return sameSubnet;
  }

  return candidates[0] || '127.0.0.1';
}
