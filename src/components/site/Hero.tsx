import Link from 'next/link';
import type { Profile } from '@/lib/cms/types';
import { BowTieLogo } from './BowTieLogo';

const paths: Array<{ href: string; label: string; download?: boolean }> = [
  { href: '/background', label: 'Bio' },
  { href: '/background/resume', label: 'CV', download: true },
  { href: '/work', label: 'Portfolio' },
  { href: '/#contact', label: 'Contact' },
];

export function Hero({ profile }: { profile: Profile }) {
  const positioning = profile.tagline?.trim();
  const role = profile.rolesLine?.trim() || profile.headline?.trim();

  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100dvh-4.25rem)] flex-col justify-center overflow-hidden bg-forest px-4 py-16 text-center sm:px-6 sm:py-20"
      aria-label="Introduction"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-90 hero-cover-mesh hero-cover-mesh-animated"
        aria-hidden
      />
      <div className="relative mx-auto flex w-full max-w-xl flex-col items-center">
        <div className="animate-fade-up" style={{ animationDelay: '40ms' }}>
          <div className="inline-flex rounded-sm border border-white/35 p-3 sm:p-3.5">
            <BowTieLogo size="md" tone="onDark" className="!shadow-none !ring-white/20" />
          </div>
        </div>

        <h1
          className="animate-fade-up mt-8 font-heading text-5xl font-bold uppercase tracking-[0.14em] text-white sm:text-6xl sm:tracking-[0.16em]"
          style={{ animationDelay: '140ms' }}
        >
          {profile.name}
        </h1>

        {role ? (
          <p
            className="animate-fade-up mt-4 max-w-md text-[11px] font-medium uppercase tracking-[0.22em] text-mint"
            style={{ animationDelay: '220ms' }}
          >
            {role}
          </p>
        ) : null}

        <div
          className="animate-fade-up mt-6 h-px w-16 bg-gradient-to-r from-transparent via-mustard/80 to-transparent"
          style={{ animationDelay: '280ms' }}
          aria-hidden
        />

        {positioning ? (
          <p
            className="animate-fade-up mt-6 max-w-md text-lg leading-snug text-pine-100/95 sm:text-xl"
            style={{ animationDelay: '340ms' }}
          >
            {positioning}
          </p>
        ) : null}

        <nav
          className="animate-fade-up mt-10 flex flex-wrap items-center justify-center gap-x-1 gap-y-3 sm:gap-x-2"
          style={{ animationDelay: '440ms' }}
          aria-label="Site paths"
        >
          {paths.map((path, i) => (
            <span key={path.href} className="contents">
              {i > 0 ? (
                <span className="hidden text-white/25 sm:inline" aria-hidden>
                  ·
                </span>
              ) : null}
              {path.download ? (
                <a
                  href={path.href}
                  className="hub-path rounded-full px-4 py-2 text-sm font-semibold tracking-wide text-white/90 transition hover:bg-white/10 hover:text-white"
                >
                  {path.label}
                </a>
              ) : (
                <Link
                  href={path.href}
                  className="hub-path rounded-full px-4 py-2 text-sm font-semibold tracking-wide text-white/90 transition hover:bg-white/10 hover:text-white"
                >
                  {path.label}
                </Link>
              )}
            </span>
          ))}
        </nav>
      </div>
    </section>
  );
}
