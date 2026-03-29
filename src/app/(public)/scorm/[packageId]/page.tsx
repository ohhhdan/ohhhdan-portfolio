import { parseManifest } from '@/lib/scorm/manifest-parser';
import { ScormPlayer } from '@/components/scorm/ScormPlayer';
import { notFound } from 'next/navigation';
import path from 'path';
import fs from 'fs';

const SCORM_DIR =
  process.env.SCORM_PACKAGES_PATH || path.join(process.cwd(), 'scorm-packages');

interface PageProps {
  params: Promise<{ packageId: string }>;
}

export default async function ScormPlayerPage({ params }: PageProps) {
  const { packageId } = await params;

  // Validate packageId - alphanumeric, hyphens, underscores only
  if (!/^[a-zA-Z0-9_-]+$/.test(packageId)) {
    notFound();
  }

  const packagePath = path.join(SCORM_DIR, packageId);

  if (!fs.existsSync(packagePath)) {
    notFound();
  }

  try {
    const manifest = await parseManifest(packagePath);
    return (
      <ScormPlayer
        packageId={packageId}
        launchUrl={manifest.launchUrl}
        title={manifest.title}
        version={manifest.version}
      />
    );
  } catch {
    notFound();
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { packageId } = await params;

  if (!/^[a-zA-Z0-9_-]+$/.test(packageId)) {
    return { title: 'Not Found' };
  }

  const packagePath = path.join(SCORM_DIR, packageId);
  if (!fs.existsSync(packagePath)) {
    return { title: 'Not Found' };
  }

  try {
    const manifest = await parseManifest(packagePath);
    return { title: `${manifest.title} | SCORM Player` };
  } catch {
    return { title: 'SCORM Player' };
  }
}
