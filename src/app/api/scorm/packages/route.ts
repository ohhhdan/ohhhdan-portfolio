import { NextResponse } from 'next/server';
import { parseManifest } from '@/lib/scorm/manifest-parser';
import path from 'path';
import fs from 'fs';
import { getScormRoot } from '@/lib/scorm/package-root';

export async function GET() {
  try {
    const scormDir = getScormRoot();
    if (!fs.existsSync(scormDir)) {
      return NextResponse.json([]);
    }

    const entries = fs.readdirSync(scormDir, { withFileTypes: true });
    const packages = [];

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      if (entry.name.startsWith('.')) continue;

      const packagePath = path.join(scormDir, entry.name);
      const manifestPath = path.join(packagePath, 'imsmanifest.xml');

      if (!fs.existsSync(manifestPath)) continue;

      try {
        const manifest = await parseManifest(packagePath);
        packages.push({
          ...manifest,
          id: entry.name,
        });
      } catch {
        // skip invalid
      }
    }

    return NextResponse.json(packages);
  } catch {
    return NextResponse.json({ error: 'Failed to list packages' }, { status: 500 });
  }
}
