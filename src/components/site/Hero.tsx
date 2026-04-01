import Link from 'next/link';
import { ChevronDown, Sparkles } from 'lucide-react';
import type { Profile } from '@/lib/cms/types';
import { BowTieLogo } from './BowTieLogo';

/** Welcoming, exploratory tone inspired by strong LXD portfolios (e.g. Milloway): craft + tech, invitation to dig in. */
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
            className="animate-fade-up font-heading text-xs font-bold uppercase tracking-[0.28em] text-forest/85"
            style={{ animationDelay: '80ms' }}
          >
            {profile.rolesLine}
          </p>

          <h1
            className="animate-fade-up mt-5 font-heading text-4xl font-bold leading-[1.12] tracking-tight text-forest sm:text-5xl sm:leading-[1.1] lg:text-[2.65rem]"
            style={{ animationDelay: '160ms' }}
          >
            {profile.tagline}
          </h1>

          <p
            className="animate-fade-up mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg"
            style={{ animationDelay: '240ms' }}
          >
            {profile.summary}
          </p>

          <p
            className="animate-fade-up mt-5 max-w-xl text-sm leading-relaxed text-ink sm:text-[0.95rem]"
            style={{ animationDelay: '300ms' }}
          >
            Below you’ll find selected work—interactive modules, video, and enterprise courseware. Some projects include
            more detail behind confidentiality; I’m always happy to speak further if there’s a fit.
          </p>

          <div
            className="animate-fade-up mt-8 flex flex-wrap items-center gap-4"
            style={{ animationDelay: '380ms' }}
          >
            <Link
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-pine-600 hover:shadow-lg motion-reduce:hover:translate-y-0"
            >
              <Sparkles size={16} className="text-mustard" aria-hidden />
              Email me
            </Link>
            <Link
              href="/#work"
              className="group inline-flex items-center gap-1 text-sm font-semibold text-forest transition hover:text-mustard"
            >
              See portfolio
              <ChevronDown size={16} className="transition group-hover:translate-y-0.5" />
            </Link>
            <Link
              href="/background"
              className="text-sm font-medium text-ink-muted underline decoration-mint/60 decoration-2 underline-offset-4 transition hover:text-forest"
            >
              Full background →
            </Link>
          </div>
        </div>

        <div
          className="animate-fade-up flex justify-center lg:justify-end"
          style={{ animationDelay: '220ms' }}
        >
          <div className="relative">
            <div className="absolute inset-0 scale-110 rounded-3xl bg-gradient-to-br from-mint/25 via-transparent to-mustard/20 blur-2xl motion-reduce:hidden" />
            <BowTieLogo size="lg" className="relative" />
          </div>
        </div>
      </div>
    </section>
  );
}
