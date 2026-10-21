'use client';

import { useMemo, useState } from 'react';
import { ExternalLink, Play } from 'lucide-react';
import type { Project } from '@/lib/cms/types';
import { buildProjectSamples, getFirstEmbeddableSampleIndex } from '@/lib/playback';
import { SampleViewerModal } from './SampleViewerModal';

/** Secondary action: open interactive sample (lightbox or external). */
export function ViewSampleButton({
  project,
  hasLocalScorm,
}: {
  project: Project;
  hasLocalScorm: boolean;
}) {
  const [open, setOpen] = useState(false);
  const samples = useMemo(
    () => buildProjectSamples(project, hasLocalScorm),
    [project, hasLocalScorm],
  );
  const launchIndex = useMemo(() => getFirstEmbeddableSampleIndex(samples), [samples]);

  if (samples.length === 0) {
    return (
      <p className="text-sm text-ink-muted">
        {project.sampleNote?.trim() || '[SCREEN RECORDING]'}
      </p>
    );
  }

  const first = samples[0];
  const preferExternal = first && !first.embeddable;

  if (preferExternal && first) {
    return (
      <a
        href={first.externalUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 text-sm font-semibold text-forest underline decoration-mint/60 underline-offset-4 transition hover:text-pine-700"
      >
        View sample <ExternalLink size={14} />
      </a>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 text-sm font-semibold text-forest underline decoration-mint/60 underline-offset-4 transition hover:text-pine-700"
      >
        <Play size={14} strokeWidth={2.25} />
        View sample
      </button>
      <SampleViewerModal
        samples={samples}
        open={open}
        onClose={() => setOpen(false)}
        initialIndex={launchIndex}
      />
    </>
  );
}
