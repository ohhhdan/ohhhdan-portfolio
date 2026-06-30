'use client';

import { useMemo, useState } from 'react';
import { ExternalLink, Play } from 'lucide-react';
import type { Project } from '@/lib/cms/types';
import { buildProjectSamples, getFirstEmbeddableSampleIndex } from '@/lib/playback';
import { Reveal } from './Reveal';
import { SampleViewerModal } from './SampleViewerModal';

function getVisitSiteLink(project: Project) {
  return project.links?.find(
    (link) =>
      !link.embedOnSite &&
      link.kind !== 'articulate' &&
      link.kind !== 'video' &&
      !link.href.includes('articulate.com'),
  );
}

export function PortfolioCard({
  project,
  hasLocalScorm,
  delayMs,
}: {
  project: Project;
  hasLocalScorm: boolean;
  delayMs: number;
}) {
  const [viewerOpen, setViewerOpen] = useState(false);

  const samples = useMemo(
    () => buildProjectSamples(project, hasLocalScorm),
    [project, hasLocalScorm],
  );
  const launchIndex = useMemo(() => getFirstEmbeddableSampleIndex(samples), [samples]);

  const hasSamples = samples.length > 0;
  const narrative = project.body?.trim() || project.summary;
  const visitSite = getVisitSiteLink(project);
  const demoLabel =
    project.ctaLabel?.trim() ||
    (hasSamples ? (samples.length > 1 ? 'View samples' : 'View demo') : null);
  const noPublicSample = !hasSamples && !visitSite;

  return (
    <>
      <Reveal delayMs={delayMs} className="h-full">
        <article className="group relative flex h-full min-h-[24rem] flex-col overflow-hidden rounded-2xl border border-forest/10 bg-surface p-6 shadow-sm transition duration-300 ease-out hover:-translate-y-1 hover:border-mustard/50 hover:shadow-xl motion-reduce:hover:translate-y-0">
          <span
            className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-mint to-teal opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:opacity-60"
            aria-hidden
          />

          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-teal">{project.client}</p>
            <h3 className="mt-2 font-heading text-lg font-bold uppercase leading-snug tracking-wide text-forest transition group-hover:text-pine-700">
              {project.title}
            </h3>
            {project.period ? (
              <p className="mt-1 text-xs font-medium text-ink-muted">{project.period}</p>
            ) : null}
            <p className="mt-3 text-sm leading-relaxed text-ink">{narrative}</p>
          </div>

          <div className="mt-6 shrink-0 border-t border-forest/10 pt-5">
            <div className="flex flex-col gap-3">
              {hasSamples && demoLabel ? (
                <button
                  type="button"
                  onClick={() => setViewerOpen(true)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-forest px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-pine-600 hover:shadow-lg motion-reduce:hover:translate-y-0"
                >
                  <Play size={16} strokeWidth={2.25} />
                  {demoLabel}
                </button>
              ) : null}
              {visitSite ? (
                <a
                  href={visitSite.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-forest/15 bg-paper px-4 py-2.5 text-sm font-semibold text-forest transition hover:border-mustard/50 hover:bg-mustard/5"
                >
                  Visit site <ExternalLink size={14} />
                </a>
              ) : null}
              {noPublicSample ? (
                <p className="text-center text-sm text-ink-muted">
                  {project.client.includes('ACVIM')
                    ? 'Samples available to ACVIM members on request.'
                    : 'Sample available on request.'}
                </p>
              ) : null}
            </div>
          </div>
        </article>
      </Reveal>

      <SampleViewerModal
        samples={samples}
        open={viewerOpen}
        onClose={() => setViewerOpen(false)}
        initialIndex={launchIndex}
      />
    </>
  );
}
