import { GraduationCap, Award } from 'lucide-react';
import type { CredentialItem, EducationItem } from '@/lib/cms/types';
import { Section } from './Section';

export function EducationBlock({
  education,
  credentials,
}: {
  education: EducationItem[];
  credentials: CredentialItem[];
}) {
  return (
    <Section id="education" eyebrow="Education & credentials" title="Formal learning">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="rounded-2xl border border-forest/10 bg-surface p-6 shadow-sm transition hover:shadow-md">
          <h3 className="flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wide text-forest">
            <GraduationCap size={20} className="text-teal" strokeWidth={2} /> Education
          </h3>
          <ul className="mt-4 space-y-4">
            {education.map((e) => (
              <li key={e.id} className="border-b border-forest/5 pb-4 last:border-0">
                <p className="font-semibold text-ink">{e.degree}</p>
                <p className="text-sm text-pine-700">{e.institution}</p>
                {e.year ? <p className="text-xs text-ink-muted">{e.year}</p> : null}
                {e.details ? <p className="mt-2 text-sm text-ink-muted">{e.details}</p> : null}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-forest/10 bg-surface p-6 shadow-sm transition hover:shadow-md">
          <h3 className="flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wide text-forest">
            <Award size={20} className="text-mustard" strokeWidth={2} /> Credentials
          </h3>
          {credentials.length === 0 ? (
            <p className="mt-4 text-sm text-ink-muted">No credentials listed.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {credentials.map((c) => (
                <li key={c.id}>
                  <p className="font-semibold text-ink">{c.name}</p>
                  <p className="text-sm text-ink-muted">
                    {c.issuer}
                    {c.year ? ` · ${c.year}` : ''}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Section>
  );
}
