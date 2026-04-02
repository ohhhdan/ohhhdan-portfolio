import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import type { Project } from '@/lib/cms/types';
import { Section } from './Section';
import { Reveal } from './Reveal';

export function PortfolioGrid({ projects }: { projects: Project[] }) {
  return (
    <Section id="work" eyebrow="Work" title="Samples">
      <p className="max-w-xl text-sm leading-snug text-ink-muted sm:text-base">
        Modules, video, enterprise builds—open a card.
      </p>
      <ul className="mt-8 grid gap-6 sm:grid-cols-2">
        {projects.map((p, i) => (
          <li key={p.id} className="h-full">
            <Reveal delayMs={i * 55} className="h-full">
              <Link
                href={`/work/${p.slug}`}
                className="group relative block h-full overflow-hidden rounded-2xl border border-forest/10 bg-surface p-6 shadow-sm transition duration-300 ease-out hover:-translate-y-1 hover:border-mustard/50 hover:shadow-xl motion-reduce:hover:translate-y-0"
              >
                <span
                  className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-mint to-teal opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:opacity-60"
                  aria-hidden
                />
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-teal">{p.client}</p>
                <h3 className="mt-2 font-heading text-lg font-bold uppercase leading-snug tracking-wide text-forest transition group-hover:text-pine-700">
                  {p.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-muted">{p.summary}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-mustard transition group-hover:gap-2">
                  View project <ExternalLink size={14} strokeWidth={2.25} />
                </span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
