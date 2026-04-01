import { Trophy, Users } from 'lucide-react';
import type { AwardItem, EngagementItem } from '@/lib/cms/types';
import { Section } from './Section';

export function AwardsBlock({
  awards,
  engagements,
}: {
  awards: AwardItem[];
  engagements: EngagementItem[];
}) {
  return (
    <Section id="awards" eyebrow="Awards & engagement" title="Recognition & community">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="rounded-2xl border border-forest/10 bg-surface p-6 shadow-sm">
          <h3 className="flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wide text-forest">
            <Trophy size={20} className="text-mustard" strokeWidth={2} /> Awards
          </h3>
          <ul className="mt-4 space-y-4">
            {awards.map((a) => (
              <li key={a.id}>
                <p className="font-semibold text-ink">{a.name}</p>
                <p className="text-sm text-teal">
                  {a.org}
                  {a.year ? ` · ${a.year}` : ''}
                </p>
                {a.description ? <p className="mt-2 text-sm text-ink-muted">{a.description}</p> : null}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-forest/10 bg-surface p-6 shadow-sm">
          <h3 className="flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wide text-forest">
            <Users size={20} className="text-mint" strokeWidth={2} /> Engagement
          </h3>
          <ul className="mt-4 space-y-4">
            {engagements.map((g) => (
              <li key={g.id}>
                <p className="font-semibold text-ink">{g.name}</p>
                <p className="text-sm text-pine-700">{g.role}</p>
                {g.description ? <p className="mt-2 text-sm text-ink-muted">{g.description}</p> : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
