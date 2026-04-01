import type { Profile } from '@/lib/cms/types';
import { Section } from './Section';

export function ProfileBlock({ profile }: { profile: Profile }) {
  return (
    <Section id="profile" eyebrow="Profile" title={profile.headline}>
      <div className="max-w-3xl space-y-4">
        {profile.bioParagraphs?.map((p, i) => (
          <p key={i} className="text-lg leading-relaxed text-ink-muted">
            {p}
          </p>
        ))}
      </div>
    </Section>
  );
}
