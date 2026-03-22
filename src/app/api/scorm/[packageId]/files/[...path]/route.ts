import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

const SCORM_DIR =
  process.env.SCORM_PACKAGES_PATH || path.join(process.cwd(), 'scorm-packages');

// Allowlisted file extensions for security
const ALLOWED_EXTENSIONS = new Set([
  '.html', '.htm', '.js', '.css', '.json', '.xml',
  '.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.ico',
  '.mp3', '.mp4', '.ogg', '.wav', '.webm',
  '.woff', '.woff2', '.ttf', '.eot', '.otf',
  '.txt', '.csv', '.pdf', '.swf',
]);

const MIME_TYPES: Record<string, string> = {
  '.html': 'text/html',
  '.htm': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.mp3': 'audio/mpeg',
  '.mp4': 'video/mp4',
  '.ogg': 'audio/ogg',
  '.wav': 'audio/wav',
  '.webm': 'video/webm',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'font/otf',
  '.txt': 'text/plain',
  '.csv': 'text/csv',
  '.pdf': 'application/pdf',
  '.swf': 'application/x-shockwave-flash',
};

interface RouteParams {
  params: Promise<{ packageId: string; path: string[] }>;
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  const { packageId, path: filePath } = await params;

  // Validate packageId
  if (!/^[a-zA-Z0-9_-]+$/.test(packageId)) {
    return NextResponse.json({ error: 'Invalid package ID' }, { status: 400 });
  }

  // Reconstruct the file path
  const relativePath = filePath.join('/');

  // Reject path traversal attempts
  if (relativePath.includes('..') || relativePath.includes('\\')) {
    return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
  }

  const ext = path.extname(relativePath).toLowerCase();
  if (!ALLOWED_EXTENSIONS.has(ext)) {
    return NextResponse.json(
      { error: 'File type not allowed' },
      { status: 403 }
    );
  }

  const absolutePath = path.resolve(SCORM_DIR, packageId, relativePath);
  const packageRoot = path.resolve(SCORM_DIR, packageId);

  // Double-check resolved path stays within package directory
  if (!absolutePath.startsWith(packageRoot + path.sep) && absolutePath !== packageRoot) {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 });
  }

  // Reject sensitive files
  const basename = path.basename(relativePath);
  if (basename.startsWith('.') || basename === 'web.config') {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 });
  }

  try {
    const fileBuffer = fs.readFileSync(absolutePath);
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'X-Content-Type-Options': 'nosniff',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }
}
