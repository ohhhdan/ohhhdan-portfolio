'use client';

import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import type { ProjectLink } from '@/lib/cms/types';
import { buildProjectSamples } from '@/lib/playback';
import { PlaybackFrame } from './PlaybackFrame';
import type { Project } from '@/lib/cms/types';

interface ProjectWorkLinksProps {
  links: ProjectLink[];
  hasLocalScorm: boolean;
  scormPackageId: string | null;
  projectTitle: string;
}

export function ProjectWorkLinks({
  links,
  hasLocalScorm,
  scormPackageId,
  projectTitle,
}: ProjectWorkLinksProps) {
  const project = {
    id: '',
    sortOrder: 0,
    slug: '',
    title: projectTitle,
    client: '',
    summary: '',
    body: '',
    technologies: [],
    links,
    scormPackageId,
  } satisfies Project;

  const samples = buildProjectSamples(project, hasLocalScorm);

  if (samples.length === 0) {
    return <p className="mt-10 text-sm text-ink-muted">No public sample links for this project.</p>;
  }

  return (
    <div className="mt-10 space-y-8">
      {samples.map((sample) => (
        <PlaybackFrame
          key={sample.externalUrl + sample.title}
          title={sample.title}
          embedUrl={sample.embedUrl}
          externalUrl={sample.externalUrl}
          embeddable={sample.embeddable}
          blockReason={sample.blockReason}
          className="h-[min(75vh,780px)]"
        />
      ))}
      {hasLocalScorm && scormPackageId ? (
        <div className="flex justify-center">
          <Link
            href={`/learn/${encodeURIComponent(scormPackageId)}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-forest/15 bg-surface px-5 py-3 text-sm font-semibold text-forest transition hover:border-mustard/60 hover:bg-mustard/5"
          >
            Open interactive sample in new tab <ExternalLink size={16} />
          </Link>
        </div>
      ) : null}
    </div>
  );
}
