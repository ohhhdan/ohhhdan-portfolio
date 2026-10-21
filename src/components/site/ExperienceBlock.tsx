import { Briefcase } from 'lucide-react';
import type { EarlierRole, ExperienceItem } from '@/lib/cms/types';
import { Section } from './Section';
import { Reveal } from './Reveal';

function RoleHighlights({ highlights }: { highlights: string[] }) {
  if (!highlights.length) return null;
  return (
    <ul className="mt-4 list-disc space-y-2.5 pl-5 text-sm leading-relaxed text-ink-muted marker:text-mint">
      {highlights.map((h, j) => (
        <li key={j}>{h}</li>
      ))}
    </ul>
  );
}

function ExperienceRoles({ roles }: { roles: NonNullable<ExperienceItem['roles']> }) {
  return (
    <div className="mt-7 space-y-5">
      {roles.map((role) => (
        <div
          key={role.title + role.period}
          className="rounded-xl border border-forest/10 bg-paper/90 px-4 py-5 sm:px-5"
        >
          <h4 className="font-heading text-base font-bold uppercase tracking-wide text-forest">{role.title}</h4>
          <p className="mt-1 text-sm font-semibold text-teal">{role.period}</p>
          {role.description ? (
            <p className="mt-3 text-[15px] leading-relaxed text-ink">{role.description}</p>
          ) : null}
          <RoleHighlights highlights={role.highlights} />
          {role.presentationUrl ? (
            <p className="mt-4">
              <a
                href={role.presentationUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-forest underline decoration-mustard decoration-2 underline-offset-4 transition hover:text-mustard"
              >
                {role.presentationLabel ?? 'Watch presentation'}
              </a>
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function EarlierList({ lines }: { lines: EarlierRole[] }) {
  return (
    <ul className="divide-y divide-forest/10 overflow-hidden rounded-xl border border-forest/10 bg-surface">
      {lines.map((line) => (
        <li key={line.title + line.company} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-4 py-3 sm:px-5">
          <p className="text-sm text-ink">
            <span className="font-semibold">{line.title}</span>
            <span className="text-ink-muted"> · {line.company}</span>
          </p>
          {line.period ? <p className="text-sm font-semibold text-teal">{line.period}</p> : null}
        </li>
      ))}
    </ul>
  );
}

export function ExperienceBlock({ items }: { items: ExperienceItem[] }) {
  return (
    <Section id="experience" eyebrow="Experience" title="Work history">
      <div className="space-y-10">
        {items.map((job, i) => {
          if (job.lines?.length) {
            return (
              <Reveal key={job.id} delayMs={i * 45}>
                <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-forest">Earlier</h3>
                <div className="mt-3">
                  <EarlierList lines={job.lines} />
                </div>
              </Reveal>
            );
          }

          const hasRoles = Boolean(job.roles?.length);

          return (
            <Reveal key={job.id} delayMs={i * 45}>
              <article className="group relative rounded-xl border border-transparent bg-surface/90 px-5 py-6 pl-6 shadow-sm ring-1 ring-forest/5 transition duration-300 hover:border-mint/40 hover:shadow-md motion-reduce:transition-none sm:pl-7">
                <div
                  className="absolute bottom-3 left-0 top-3 w-1 rounded-full bg-gradient-to-b from-mint via-forest to-mustard opacity-70 transition group-hover:opacity-100"
                  aria-hidden
                />
                <div className="flex flex-wrap items-baseline gap-2 pl-1">
                  <Briefcase className="hidden text-mustard sm:inline" size={18} strokeWidth={2} aria-hidden />
                  {hasRoles ? (
                    <h3 className="font-heading text-lg font-bold uppercase tracking-wide text-forest">{job.company}</h3>
                  ) : (
                    <>
                      <h3 className="font-heading text-lg font-bold uppercase tracking-wide text-forest">{job.title}</h3>
                      <span className="text-ink-muted">·</span>
                      <span className="font-semibold text-pine-700">{job.company}</span>
                    </>
                  )}
                </div>
                <p className="mt-1 text-sm font-semibold text-teal">{job.period}</p>
                {!hasRoles && job.roleProgression ? (
                  <p className="mt-1 text-xs leading-relaxed text-ink-muted sm:text-sm">{job.roleProgression}</p>
                ) : null}
                {job.description ? (
                  <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-ink sm:text-base">{job.description}</p>
                ) : null}

                {hasRoles ? (
                  <ExperienceRoles roles={job.roles!} />
                ) : (
                  <div className={job.description ? 'mt-2' : 'mt-4'}>
                    <RoleHighlights highlights={job.highlights ?? []} />
                  </div>
                )}

                {job.presentationUrl ? (
                  <p className="mt-5">
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
          );
        })}
      </div>
    </Section>
  );
}
