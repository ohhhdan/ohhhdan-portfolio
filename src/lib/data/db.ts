import fs from 'fs';
import path from 'path';

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), 'data');

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function filePath(name: string): string {
  return path.join(DATA_DIR, `${name}.json`);
}

export function getCollection<T>(name: string): T[] {
  const fp = filePath(name);
  if (!fs.existsSync(fp)) return [];
  const raw = fs.readFileSync(fp, 'utf-8');
  const items = JSON.parse(raw) as T[];
  return items.sort((a: T & { sortOrder?: number }, b: T & { sortOrder?: number }) =>
    (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
  );
}

export function writeCollection<T>(name: string, data: T[]): void {
  ensureDir();
  const fp = filePath(name);
  const tmp = fp + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2), 'utf-8');
  fs.renameSync(tmp, fp);
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
  const tmp = fp + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2), 'utf-8');
  fs.renameSync(tmp, fp);
}
