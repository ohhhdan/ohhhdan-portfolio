'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ExternalLink, Play } from 'lucide-react';
import type { Project } from '@/lib/cms/types';
import { buildProjectSamples, getFirstEmbeddableSampleIndex } from '@/lib/playback';
import { SampleViewerModal } from './SampleViewerModal';
import { ToolChips } from './ToolChips';

function CardVisual({ project }: { project: Project }) {
  const src = project.screenshots?.find((s) => s.trim());
  if (!src) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-paper px-4 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">
          {project.builtNote?.trim() || '[HERO MEDIA]'}
        </p>
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="" className="h-full w-full object-cover object-top" />
  );
}

export function PortfolioCard({
  project,
  hasLocalScorm,
}: {
  project: Project;
  hasLocalScorm: boolean;
}) {
  const [viewerOpen, setViewerOpen] = useState(false);
  const samples = useMemo(
    () => buildProjectSamples(project, hasLocalScorm),
    [project, hasLocalScorm],
  );
  const launchIndex = useMemo(() => getFirstEmbeddableSampleIndex(samples), [samples]);

  const hasSamples = samples.length > 0;
  const first = samples[0];
  const preferExternal = Boolean(first && !first.embeddable);

  function openSample() {
    if (!hasSamples || !first) return;
    if (preferExternal) {
      window.open(first.externalUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    setViewerOpen(true);
  }

  return (
    <>
      <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-forest/10 bg-surface transition hover:border-forest/25">
        <button
          type="button"
          onClick={openSample}
          disabled={!hasSamples}
          className="flex flex-1 flex-col text-left disabled:cursor-default"
          aria-label={
            hasSamples
              ? preferExternal
                ? `Open sample for ${project.title}`
                : `View sample for ${project.title}`
              : undefined
          }
        >
          <div className="aspect-[16/10] w-full overflow-hidden border-b border-forest/5 bg-paper">
            <CardVisual project={project} />
          </div>
          <div className="flex flex-1 flex-col gap-3 p-5">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-teal">
                  {project.client}
                </p>
                {project.engagementLabel?.trim() ? (
                  <span className="rounded-full border border-forest/15 bg-paper px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-forest">
                    {project.engagementLabel}
                  </span>
                ) : null}
              </div>
              <h3 className="mt-1.5 font-heading text-lg font-bold tracking-wide text-forest group-hover:text-pine-700">
                {project.title}
              </h3>
              {project.period ? (
                <p className="mt-1 text-xs font-medium text-ink-muted">{project.period}</p>
              ) : null}
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{project.summary}</p>
            </div>
            <div className="mt-auto flex flex-col gap-3 pt-1">
              <ToolChips tools={(project.technologies ?? []).filter((t) => !t.startsWith('['))} />
              {hasSamples ? (
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-forest underline decoration-mint/60 underline-offset-4">
                  {preferExternal ? <ExternalLink size={14} aria-hidden /> : <Play size={14} strokeWidth={2.25} aria-hidden />}
                  View sample
                </span>
              ) : (
                <span className="text-sm text-ink-muted">
                  {project.sampleNote?.trim() || 'Sample available on request.'}
                </span>
              )}
            </div>
          </div>
        </button>
        <div className="border-t border-forest/5 px-5 py-3">
          <Link
            href={`/work/${project.slug}`}
            className="text-sm font-medium text-forest/75 transition hover:text-forest"
          >
            Case study
          </Link>
        </div>
      </article>

      {!preferExternal ? (
        <SampleViewerModal
          samples={samples}
          open={viewerOpen}
          onClose={() => setViewerOpen(false)}
          initialIndex={launchIndex}
        />
      ) : null}
    </>
  );
}
