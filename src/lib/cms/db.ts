import fs from 'fs';
import path from 'path';

function dataDir(): string {
  if (process.env.DATA_DIR) return process.env.DATA_DIR;
  return path.join(/*turbopackIgnore: true*/ process.cwd(), 'data');
}

function ensureDir() {
  const dir = dataDir();
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function filePath(name: string): string {
  return path.join(dataDir(), `${name}.json`);
}

export function getCollection<T>(name: string): T[] {
  const fp = filePath(name);
  if (!fs.existsSync(fp)) return [];
  const raw = fs.readFileSync(fp, 'utf-8');
  const items = JSON.parse(raw) as (T & { sortOrder?: number })[];
  return items.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)) as T[];
}

export function writeCollection<T>(name: string, data: T[]): void {
  ensureDir();
  const fp = filePath(name);
  const tmp = `${fp}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2), 'utf-8');
  fs.renameSync(tmp, fp);
}

export type CmsWriteResult = { ok: true } | { ok: false; error: string };

function writeErrorMessage(err: unknown): string {
  const msg = err instanceof Error ? err.message : String(err);
  const lower = msg.toLowerCase();
  if (lower.includes('erofs') || lower.includes('eperm') || lower.includes('read-only')) {
    return 'Disk is read-only on this host. Edit locally with npm run dev, commit data/, and push so Vercel redeploys.';
  }
  return `Could not save: ${msg}`;
}

export function tryWriteCollection<T>(name: string, data: T[]): CmsWriteResult {
  try {
    writeCollection(name, data);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: writeErrorMessage(e) };
  }
}

export function getSingleton<T>(name: string): T | null {
  const fp = filePath(name);
  if (!fs.existsSync(fp)) return null;
  const raw = fs.readFileSync(fp, 'utf-8');
  return JSON.parse(raw) as T;
}

export function writeSingleton<T>(name: string, data: T): void {
  ensureDir();
  const fp = filePath(name);
  const tmp = `${fp}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2), 'utf-8');
  fs.renameSync(tmp, fp);
}

export function tryWriteSingleton<T>(name: string, data: T): CmsWriteResult {
  try {
    writeSingleton(name, data);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: writeErrorMessage(e) };
  }
}
