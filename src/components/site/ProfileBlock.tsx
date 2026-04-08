import type { Profile } from '@/lib/cms/types';
import { Section } from './Section';

export function ProfileBlock({ profile }: { profile: Profile }) {
  return (
    <Section id="profile" eyebrow="About" title={profile.headline} align="center">
      <div className="mx-auto max-w-2xl space-y-4 text-center">
        {profile.bioParagraphs?.map((p, i) => (
          <p key={i} className="text-base leading-relaxed text-ink-muted sm:text-lg">
            {p}
          </p>
        ))}
      </div>
    </Section>
  );
}
