import Link from 'next/link';
import type { Project } from '@/lib/cms/types';
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

export function PortfolioCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-forest/10 bg-surface transition hover:border-forest/25"
    >
      <div className="aspect-[16/10] w-full overflow-hidden border-b border-forest/5 bg-paper">
        <CardVisual project={project} />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-teal">{project.client}</p>
            {project.engagementLabel?.trim() ? (
              <span className="rounded-full border border-forest/15 bg-paper px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-forest">
                {project.engagementLabel}
              </span>
            ) : null}
          </div>
          <h3 className="mt-1.5 font-heading text-lg font-bold tracking-wide text-forest group-hover:text-pine-700">
            {project.title}
          </h3>
          {project.period ? <p className="mt-1 text-xs font-medium text-ink-muted">{project.period}</p> : null}
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">{project.summary}</p>
        </div>
        <div className="mt-auto pt-1">
          <ToolChips tools={(project.technologies ?? []).filter((t) => !t.startsWith('['))} />
        </div>
      </div>
    </Link>
  );
}
