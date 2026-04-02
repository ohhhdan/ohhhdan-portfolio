import Link from 'next/link';
import type { Profile } from '@/lib/cms/types';
import { HeroBrandVisual } from './HeroBrandVisual';

export function Hero({ profile }: { profile: Profile }) {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-forest/10 bg-paper px-4 pb-14 pt-14 sm:px-6 sm:pb-16 sm:pt-16"
    >
      <div className="hero-mesh hero-mesh-animated pointer-events-none absolute inset-0" aria-hidden />
      <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-mustard/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 h-48 w-48 rounded-full bg-teal/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
        <div>
          <p
            className="animate-fade-up text-[11px] font-medium uppercase tracking-[0.22em] text-ink-muted sm:text-xs"
            style={{ animationDelay: '80ms' }}
          >
            {profile.rolesLine}
          </p>

          <h1
            className="animate-fade-up mt-4 font-heading text-4xl font-bold leading-[1.08] tracking-tight text-forest sm:text-5xl lg:text-[2.65rem]"
            style={{ animationDelay: '140ms' }}
          >
            {profile.tagline}
          </h1>

          <p
            className="animate-fade-up mt-5 max-w-[34rem] text-[15px] leading-relaxed text-ink sm:text-base"
            style={{ animationDelay: '200ms' }}
          >
            {profile.summary}
          </p>

          <nav
            className="animate-fade-up mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            style={{ animationDelay: '260ms' }}
            aria-label="Primary actions"
          >
            <Link
              href={`mailto:${profile.email}`}
              className="inline-flex h-11 min-w-[8.5rem] items-center justify-center rounded-full bg-forest px-6 text-[15px] font-medium text-white transition-colors hover:bg-pine-700"
            >
              Email
            </Link>
            <Link
              href="/#work"
              className="inline-flex h-11 min-w-[8.5rem] items-center justify-center rounded-full border border-forest/22 bg-surface/90 px-6 text-[15px] font-medium text-forest shadow-sm transition-colors hover:border-forest/35 hover:bg-paper"
            >
              Work
            </Link>
            <Link
              href="/background"
              className="inline-flex h-11 min-w-[8.5rem] items-center justify-center rounded-full border border-forest/22 bg-surface/90 px-6 text-[15px] font-medium text-forest shadow-sm transition-colors hover:border-forest/35 hover:bg-paper"
            >
              Background
            </Link>
          </nav>
        </div>

        <div className="animate-fade-up lg:pt-1" style={{ animationDelay: '180ms' }}>
          <HeroBrandVisual />
        </div>
      </div>
    </section>
  );
}
