import type { Profile } from '@/lib/cms/types';
import { Section } from './Section';

export function ProfileBlock({ profile }: { profile: Profile }) {
  return (
    <Section id="profile" eyebrow="About" title={profile.headline}>
      <div className="max-w-3xl space-y-4">
        {profile.bioParagraphs?.map((p, i) => (
          <p key={i} className="text-base leading-relaxed text-ink-muted sm:text-lg">
            {p}
          </p>
        ))}
      </div>
    </Section>
  );
}
