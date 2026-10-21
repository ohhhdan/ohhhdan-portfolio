import Link from 'next/link';
import type { Project } from '@/lib/cms/types';
import { ToolChips } from './ToolChips';

function CardVisual({ project }: { project: Project }) {
  const src = project.screenshots?.find((s) => s.trim());
  if (!src) return null;
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
      {project.screenshots?.some((s) => s.trim()) ? (
        <div className="aspect-[16/10] w-full overflow-hidden bg-paper">
          <CardVisual project={project} />
        </div>
      ) : (
        <div className="h-1.5 bg-forest" aria-hidden />
      )}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-teal">{project.client}</p>
          <h3 className="mt-1.5 font-heading text-lg font-bold tracking-wide text-forest group-hover:text-pine-700">
            {project.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">{project.summary}</p>
        </div>
        <div className="mt-auto pt-1">
          <ToolChips tools={project.technologies ?? []} />
        </div>
      </div>
    </Link>
  );
}
