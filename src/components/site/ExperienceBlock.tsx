import { Briefcase } from 'lucide-react';
import type { ExperienceItem } from '@/lib/cms/types';
import { Section } from './Section';
import { Reveal } from './Reveal';

export function ExperienceBlock({ items }: { items: ExperienceItem[] }) {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I’ve focused my energy">
      <div className="space-y-10">
        {items.map((job, i) => (
          <Reveal key={job.id} delayMs={i * 45}>
            <article className="group relative rounded-xl border border-transparent bg-surface/90 px-5 py-6 pl-6 shadow-sm ring-1 ring-forest/5 transition duration-300 hover:border-mint/40 hover:shadow-md motion-reduce:transition-none sm:pl-7">
              <div
                className="absolute bottom-3 left-0 top-3 w-1 rounded-full bg-gradient-to-b from-mint via-forest to-mustard opacity-70 transition group-hover:opacity-100"
                aria-hidden
              />
              <div className="flex flex-wrap items-baseline gap-2 pl-1">
                <Briefcase className="hidden text-mustard sm:inline" size={18} strokeWidth={2} aria-hidden />
                <h3 className="font-heading text-lg font-bold uppercase tracking-wide text-forest">{job.title}</h3>
                <span className="text-ink-muted">·</span>
                <span className="font-semibold text-pine-700">{job.company}</span>
              </div>
              <p className="mt-1 text-sm font-medium text-teal">{job.period}</p>
              {job.description ? <p className="mt-3 leading-relaxed text-ink-muted">{job.description}</p> : null}
              {job.highlights?.length ? (
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink-muted marker:text-mint">
                  {job.highlights.map((h, j) => (
                    <li key={j}>{h}</li>
                  ))}
                </ul>
              ) : null}
              {job.presentationUrl ? (
                <p className="mt-4">
                  <a
                    href={job.presentationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold text-forest underline decoration-mustard decoration-2 underline-offset-4 transition hover:text-mustard"
                  >
                    {job.presentationLabel ?? 'Watch presentation'}
                  </a>
                </p>
              ) : null}
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
