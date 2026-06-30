import Link from 'next/link';
import { ArrowRight, Layers } from 'lucide-react';
import { Reveal } from './Reveal';

export function WorkCTA() {
  return (
    <section id="work" className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <div className="group relative overflow-hidden rounded-3xl border border-forest/10 bg-surface px-6 py-12 text-center shadow-sm transition duration-300 hover:border-mint/40 hover:shadow-xl sm:px-10 sm:py-16">
            {/* Decorative gradient blobs */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-mint/10 blur-3xl transition-opacity group-hover:opacity-70" aria-hidden />
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-mustard/8 blur-3xl transition-opacity group-hover:opacity-70" aria-hidden />

            <div className="relative">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-forest/8 text-forest transition group-hover:bg-forest group-hover:text-white">
                <Layers size={28} strokeWidth={1.75} />
              </div>

              <h2 className="font-heading text-2xl font-bold uppercase tracking-[0.04em] text-forest sm:text-3xl">
                Work samples
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-ink-muted">
                Interactive demos, course modules, and production samples spanning identity security,
                compliance training, soft-skills curriculum, and more — built with
                Articulate 360, Parta, Adobe Creative Suite, and AI-assisted workflows.
              </p>

              <div className="mt-8">
                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 rounded-full bg-forest px-7 py-3.5 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-pine-600 hover:shadow-lg motion-reduce:hover:translate-y-0"
                >
                  Explore the portfolio
                  <ArrowRight size={16} strokeWidth={2.25} />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
