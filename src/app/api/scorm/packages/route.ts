import { NextResponse } from 'next/server';
import { parseManifest } from '@/lib/scorm/manifest-parser';
import path from 'path';
import fs from 'fs';

const SCORM_DIR =
  process.env.SCORM_PACKAGES_PATH || path.join(process.cwd(), 'scorm-packages');

export async function GET() {
  try {
    if (!fs.existsSync(SCORM_DIR)) {
      return NextResponse.json([]);
    }

    const entries = fs.readdirSync(SCORM_DIR, { withFileTypes: true });
    const packages = [];

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      if (entry.name.startsWith('.')) continue;

      const packagePath = path.join(SCORM_DIR, entry.name);
      const manifestPath = path.join(packagePath, 'imsmanifest.xml');

      if (!fs.existsSync(manifestPath)) continue;

      try {
        const manifest = await parseManifest(packagePath);
        packages.push({
          ...manifest,
          id: entry.name,
        });
      } catch {
        // Skip packages with invalid manifests
      }
    }

    return NextResponse.json(packages);
  } catch {
    return NextResponse.json(
      { error: 'Failed to list packages' },
      { status: 500 }
    );
  }
}
