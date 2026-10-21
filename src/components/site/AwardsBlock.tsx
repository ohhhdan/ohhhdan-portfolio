import { HeartHandshake, Mic, Trophy, Users } from 'lucide-react';
import type { AwardItem, EngagementItem, TalkItem } from '@/lib/cms/types';
import { Section } from './Section';

export function AwardsBlock({
  awards,
  talks,
  engagements,
}: {
  awards: AwardItem[];
  talks: TalkItem[];
  engagements: EngagementItem[];
}) {
  const members = engagements.filter((g) => g.role.toLowerCase() !== 'volunteer');
  const volunteers = engagements.filter((g) => g.role.toLowerCase() === 'volunteer');

  return (
    <Section id="awards" eyebrow="Recognition" title="Awards, talks, and memberships">
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
            <Mic size={20} className="text-mint" strokeWidth={2} /> Talks
          </h3>
          <ul className="mt-4 space-y-4">
            {talks.map((talk) => (
              <li key={talk.id}>
                <p className="font-semibold text-ink">
                  {talk.url ? (
                    <a
                      href={talk.url}
                      target="_blank"
                      rel="noreferrer"
                      className="underline decoration-mint underline-offset-4 hover:text-forest"
                    >
                      {talk.name}
                    </a>
                  ) : (
                    talk.name
                  )}
                </p>
                <p className="text-sm text-teal">
                  {talk.event}
                  {talk.year ? ` · ${talk.year}` : ''}
                </p>
                {talk.description ? <p className="mt-2 text-sm text-ink-muted">{talk.description}</p> : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {members.length ? (
        <div className="mt-10 rounded-2xl border border-forest/10 bg-surface p-6 shadow-sm">
          <h3 className="flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wide text-forest">
            <Users size={20} className="text-mint" strokeWidth={2} /> Memberships
          </h3>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {members.map((g) => (
              <li key={g.id}>
                <p className="font-semibold text-ink">{g.name}</p>
                <p className="text-sm text-pine-700">
                  {g.role}
                  {g.description ? ` · ${g.description}` : ''}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {volunteers.length ? (
        <div className="mt-10 rounded-2xl border border-forest/10 bg-surface p-6 shadow-sm">
          <h3 className="flex items-center gap-2 font-heading text-sm font-bold uppercase tracking-wide text-forest">
            <HeartHandshake size={20} className="text-mint" strokeWidth={2} /> Volunteer
          </h3>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {volunteers.map((g) => (
              <li key={g.id}>
                <p className="font-semibold text-ink">{g.name}</p>
                <p className="text-sm text-pine-700">{g.description || g.role}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </Section>
  );
}
