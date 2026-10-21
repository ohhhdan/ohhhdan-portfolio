import Link from 'next/link';
import { ArrowUpRight, Linkedin } from 'lucide-react';
import type { Profile } from '@/lib/cms/types';

export function Hero({ profile }: { profile: Profile }) {
  return (
    <section id="top" className="border-b border-forest/10 bg-paper px-4 pb-8 pt-10 sm:px-6 sm:pb-10 sm:pt-14">
      <div className="mx-auto max-w-5xl">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-muted">
          {profile.rolesLine}
        </p>
        <h1 className="mt-3 max-w-3xl font-heading text-5xl font-bold tracking-tight text-forest sm:text-6xl">
          {profile.name}
        </h1>
        <p className="mt-4 max-w-xl text-xl leading-snug text-ink sm:text-2xl">
          {profile.tagline}
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            href="/work"
            className="group inline-flex items-center gap-3 rounded-full bg-forest py-2 pl-5 pr-2 text-sm font-semibold text-white shadow-[0_10px_28px_-14px_rgba(27,74,56,0.9)] transition hover:bg-pine-600"
          >
            View work
            <span className="grid h-8 w-8 place-items-center rounded-full bg-mint text-forest transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0">
              <ArrowUpRight size={16} aria-hidden />
            </span>
          </Link>
          <Link
            href="/#background"
            className="inline-flex items-center rounded-full border border-forest/15 bg-surface px-5 py-2.5 text-sm font-medium text-forest transition hover:border-forest/35 hover:bg-white"
          >
            Background
          </Link>
          <a
            href="https://www.linkedin.com/in/ohhhdan"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-forest/15 bg-surface px-4 py-2.5 text-sm font-medium text-forest transition hover:border-forest/35 hover:bg-white"
          >
            <Linkedin size={15} className="text-ink" aria-hidden />
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
