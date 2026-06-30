import Link from 'next/link';
import { Linkedin, ArrowRight, FileText, Mail } from 'lucide-react';
import type { Profile } from '@/lib/cms/types';

function HeroPortrait({ imageUrl }: { imageUrl?: string }) {
  if (imageUrl?.trim()) {
    return (
      <div className="relative mx-auto h-40 w-40 sm:h-48 sm:w-48">
        <div className="photo-ring absolute -inset-1 rounded-full blur-[2px]" aria-hidden />
        <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-surface shadow-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageUrl} alt="" className="h-full w-full object-cover" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto h-40 w-40 sm:h-48 sm:w-48">
      <div className="photo-ring absolute -inset-1 rounded-full blur-[2px]" aria-hidden />
      <div className="relative flex h-full w-full items-center justify-center rounded-full border-4 border-surface bg-forest shadow-xl">
        <span className="font-heading text-5xl font-bold text-white/90 sm:text-6xl">DW</span>
      </div>
    </div>
  );
}

const doors = [
  {
    href: '/work',
    label: 'Work samples',
    description: 'Courses, demos, and interactive modules from across the years.',
    icon: <ArrowRight size={18} strokeWidth={2} />,
  },
  {
    href: '/background',
    label: 'Background & CV',
    description: 'Experience, skills, education, and a print-friendly résumé.',
    icon: <FileText size={18} strokeWidth={2} />,
  },
  {
    href: '#contact',
    label: 'Get in touch',
    description: 'Drop a note or grab the email.',
    icon: <Mail size={18} strokeWidth={2} />,
  },
];

export function Hero({ profile }: { profile: Profile }) {
  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden border-b border-forest/10 bg-paper px-4 py-16 sm:px-6 sm:py-20"
    >
      {/* Background mesh */}
      <div className="hero-mesh-bold hero-mesh-animated pointer-events-none absolute inset-0" aria-hidden />

      {/* Ambient blobs */}
      <div className="pointer-events-none absolute -right-24 top-8 h-80 w-80 rounded-full bg-mustard/10 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute bottom-0 left-1/4 h-56 w-56 rounded-full bg-teal/12 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -left-16 top-1/3 h-64 w-64 rounded-full bg-mint/8 blur-3xl" aria-hidden />

      <div className="relative mx-auto w-full max-w-4xl">
        {/* Identity */}
        <div className="text-center">
          <div className="animate-fade-up" style={{ animationDelay: '40ms' }}>
            <HeroPortrait imageUrl={profile.heroImageUrl} />
          </div>

          <p
            className="animate-fade-up mt-6 text-[11px] font-medium uppercase tracking-[0.22em] text-ink-muted sm:text-xs"
            style={{ animationDelay: '80ms' }}
          >
            {profile.rolesLine}
          </p>

          <h1
            className="animate-fade-up mt-4 font-heading text-4xl font-bold leading-[1.08] tracking-tight text-forest sm:text-5xl sm:leading-[1.06]"
            style={{ animationDelay: '140ms' }}
          >
            Learning experiences people{' '}
            <span className="text-gradient">actually finish</span>.
          </h1>

          <p
            className="animate-fade-up mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-ink sm:text-lg"
            style={{ animationDelay: '200ms' }}
          >
            Fifteen years in customer education, interactive curriculum, and learning experience design.
            Started building storyboards, now leading teams that ship production-ready courses at enterprise scale.
          </p>

          {/* Credentials line */}
          <p
            className="animate-fade-up mx-auto mt-4 max-w-lg text-sm text-ink-muted"
            style={{ animationDelay: '230ms' }}
          >
            Okta · Amazon · Microsoft · Envestnet · CEdMA Pinnacle winner · ATD One to Watch
          </p>

          <div
            className="animate-fade-up mt-3 flex items-center justify-center gap-2 text-sm text-ink-muted"
            style={{ animationDelay: '250ms' }}
          >
            <Linkedin size={15} className="text-forest/50" />
            <a
              href="https://www.linkedin.com/in/ohhhdan"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-forest/70 transition hover:text-forest"
            >
              linkedin.com/in/ohhhdan
            </a>
          </div>
        </div>

        {/* Doors */}
        <nav
          className="animate-fade-up mx-auto mt-14 grid max-w-3xl gap-4 sm:grid-cols-3"
          style={{ animationDelay: '320ms' }}
          aria-label="Primary navigation"
        >
          {doors.map((door) => (
            <Link
              key={door.href}
              href={door.href}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-forest/10 bg-surface/80 px-5 py-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-mint/40 hover:shadow-lg motion-reduce:hover:translate-y-0"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest/8 text-forest transition group-hover:bg-forest group-hover:text-white">
                {door.icon}
              </div>
              <div>
                <p className="font-heading text-sm font-bold uppercase tracking-wide text-forest">
                  {door.label}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">
                  {door.description}
                </p>
              </div>
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
