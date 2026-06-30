import Link from 'next/link';
import { Linkedin } from 'lucide-react';
import type { Profile } from '@/lib/cms/types';

function HeroPortrait({ imageUrl }: { imageUrl?: string }) {
  if (imageUrl?.trim()) {
    return (
      <div className="relative mx-auto h-44 w-44 sm:mx-0 sm:h-52 sm:w-52">
        {/* Gradient ring */}
        <div className="photo-ring absolute -inset-1 rounded-full blur-[2px]" aria-hidden />
        <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-surface shadow-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageUrl} alt="" className="h-full w-full object-cover" />
        </div>
      </div>
    );
  }

  // Fallback: initials in a styled circle
  return (
    <div className="relative mx-auto h-44 w-44 sm:mx-0 sm:h-52 sm:w-52">
      <div className="photo-ring absolute -inset-1 rounded-full blur-[2px]" aria-hidden />
      <div className="relative flex h-full w-full items-center justify-center rounded-full border-4 border-surface bg-forest shadow-xl">
        <span className="font-heading text-5xl font-bold text-white/90 sm:text-6xl">DW</span>
      </div>
    </div>
  );
}

export function Hero({ profile }: { profile: Profile }) {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-forest/10 bg-paper px-4 pb-16 pt-20 sm:px-6 sm:pb-20 sm:pt-24 lg:pb-24 lg:pt-28"
    >
      {/* Background mesh */}
      <div className="hero-mesh-bold hero-mesh-animated pointer-events-none absolute inset-0" aria-hidden />

      {/* Ambient blobs */}
      <div className="pointer-events-none absolute -right-24 top-8 h-80 w-80 rounded-full bg-mustard/10 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute bottom-0 left-1/4 h-56 w-56 rounded-full bg-teal/12 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -left-16 top-1/3 h-64 w-64 rounded-full bg-mint/8 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-5xl">
        <div className="flex flex-col items-center gap-10 text-center lg:flex-row lg:gap-16 lg:text-left">
          {/* Portrait */}
          <div className="animate-fade-up shrink-0" style={{ animationDelay: '40ms' }}>
            <HeroPortrait imageUrl={profile.heroImageUrl} />
          </div>

          {/* Copy */}
          <div className="flex-1">
            <p
              className="animate-fade-up text-[11px] font-medium uppercase tracking-[0.22em] text-ink-muted sm:text-xs"
              style={{ animationDelay: '80ms' }}
            >
              {profile.rolesLine}
            </p>

            <h1
              className="animate-fade-up mt-4 font-heading text-4xl font-bold leading-[1.08] tracking-tight text-forest sm:text-5xl sm:leading-[1.06] lg:text-[3.4rem]"
              style={{ animationDelay: '140ms' }}
            >
              Learning experiences people{' '}
              <span className="text-gradient">actually finish</span>.
            </h1>

            <p
              className="animate-fade-up mt-5 max-w-xl text-[15px] leading-relaxed text-ink sm:text-lg"
              style={{ animationDelay: '200ms' }}
            >
              Fifteen years in customer education, interactive curriculum, and learning experience design.
              Started building storyboards, now leading teams that ship production-ready courses at enterprise scale.
            </p>

            <div
              className="animate-fade-up mt-4 flex items-center gap-3 text-sm text-ink-muted"
              style={{ animationDelay: '230ms' }}
            >
              <Linkedin size={16} className="text-forest/60" />
              <a
                href="https://www.linkedin.com/in/ohhhdan"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-forest transition hover:text-mustard"
              >
                linkedin.com/in/ohhhdan
              </a>
            </div>

            <nav
              className="animate-fade-up mt-8 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap lg:justify-start"
              style={{ animationDelay: '260ms' }}
              aria-label="Primary actions"
            >
              <a
                href="#career"
                className="inline-flex h-12 w-full min-w-[10rem] max-w-xs items-center justify-center rounded-full bg-forest px-7 text-[15px] font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-pine-700 hover:shadow-lg motion-reduce:hover:translate-y-0 sm:w-auto"
              >
                More below ↓
              </a>
              <a
                href="#contact"
                className="inline-flex h-12 w-full min-w-[10rem] max-w-xs items-center justify-center rounded-full border border-forest/22 bg-surface/90 px-7 text-[15px] font-semibold text-forest shadow-sm transition-all hover:border-forest/35 hover:bg-paper hover:shadow-md sm:w-auto"
              >
                Get in touch
              </a>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
