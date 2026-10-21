import Link from 'next/link';
import { Linkedin } from 'lucide-react';
import type { Profile } from '@/lib/cms/types';

function HeroPortrait({ imageUrl }: { imageUrl?: string }) {
  if (imageUrl?.trim()) {
    return (
      <div className="mx-auto h-28 w-28 overflow-hidden rounded-full border border-forest/15 bg-surface sm:h-32 sm:w-32">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageUrl} alt="" className="h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-forest/15 bg-forest sm:h-32 sm:w-32">
      <span className="font-heading text-3xl font-bold text-white/90 sm:text-4xl">DW</span>
    </div>
  );
}

const doors = [
  { href: '/work', label: 'Work', description: 'Case studies and samples' },
  { href: '/background', label: 'Background', description: 'Experience and CV' },
  { href: '#contact', label: 'Contact', description: 'Say hello' },
];

export function Hero({ profile }: { profile: Profile }) {
  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100vh-4rem)] items-center border-b border-forest/10 bg-paper px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="hero-mesh pointer-events-none absolute inset-0 opacity-80" aria-hidden />

      <div className="relative mx-auto w-full max-w-3xl">
        <div className="text-center">
          <HeroPortrait imageUrl={profile.heroImageUrl} />

          <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.2em] text-ink-muted">
            {profile.rolesLine}
          </p>

          <h1 className="mt-4 font-heading text-5xl font-bold tracking-tight text-forest sm:text-6xl">
            Dan Winter
          </h1>

          <p className="mx-auto mt-5 max-w-md text-lg text-ink-muted">
            Learning experience design for customer education.
          </p>

          <p className="mx-auto mt-2 max-w-md text-sm text-ink-muted/90">
            Leading learning experience and digital design at Okta.
          </p>

          <a
            href="https://www.linkedin.com/in/ohhhdan"
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm text-forest/70 transition hover:text-forest"
          >
            <Linkedin size={15} />
            linkedin.com/in/ohhhdan
          </a>
        </div>

        <nav
          className="mx-auto mt-14 grid max-w-2xl gap-3 sm:grid-cols-3"
          aria-label="Primary navigation"
        >
          {doors.map((door) => (
            <Link
              key={door.href}
              href={door.href}
              className="rounded-lg border border-forest/12 bg-surface/80 px-4 py-5 text-center transition hover:border-forest/30 hover:bg-surface"
            >
              <p className="font-heading text-base font-bold tracking-wide text-forest">{door.label}</p>
              <p className="mt-1 text-xs text-ink-muted">{door.description}</p>
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
