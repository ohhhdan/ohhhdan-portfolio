import path from 'path';
import fs from 'fs';

export function getScormRoot(): string {
  if (process.env.SCORM_PACKAGES_PATH) {
    return process.env.SCORM_PACKAGES_PATH;
  }
  // Scope filesystem tracing to scorm-packages/ (not the whole repo)
  return path.join(/*turbopackIgnore: true*/ process.cwd(), 'scorm-packages');
}

export function scormPackageExists(packageId: string): boolean {
  if (!/^[a-zA-Z0-9_-]+$/.test(packageId)) return false;
  const root = path.join(getScormRoot(), packageId);
  const manifest = path.join(root, 'imsmanifest.xml');
  return fs.existsSync(manifest);
}
