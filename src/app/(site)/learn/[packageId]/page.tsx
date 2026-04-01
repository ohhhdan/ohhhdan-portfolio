import { notFound } from 'next/navigation';
import path from 'path';
import { parseManifest } from '@/lib/scorm/manifest-parser';
import { ScormPlayer } from '@/components/learn/ScormPlayer';

const SCORM_DIR =
  process.env.SCORM_PACKAGES_PATH || path.join(process.cwd(), 'scorm-packages');

interface PageProps {
  params: Promise<{ packageId: string }>;
}

export default async function LearnPage({ params }: PageProps) {
  const { packageId } = await params;
  if (!/^[a-zA-Z0-9_-]+$/.test(packageId)) notFound();

  const packagePath = path.join(SCORM_DIR, packageId);
  let meta;
  try {
    meta = await parseManifest(packagePath);
  } catch {
    notFound();
  }

  return (
    <ScormPlayer
      packageId={packageId}
      launchUrl={meta.launchUrl}
      title={meta.title}
      version={meta.version}
    />
  );
}
