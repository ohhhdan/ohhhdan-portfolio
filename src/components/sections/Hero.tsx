'use client';

import { ChevronDown } from 'lucide-react';
import { BowTieLogo } from '@/components/ui/BowTieLogo';

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center bg-gradient-to-br from-forest-500 via-forest-600 to-forest-700"
    >
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="relative z-10 max-w-3xl">
        <div className="mb-6 flex justify-center">
          <BowTieLogo size={72} className="text-mint-400" />
        </div>
        <p className="mb-4 text-sm font-medium tracking-widest text-mint-300 uppercase">
          Learning Experience Designer
        </p>
        <h1 className="mb-6 text-5xl font-bold tracking-tight text-white sm:text-7xl">
          Dan Winter
        </h1>
        <p className="mx-auto max-w-xl text-lg leading-relaxed text-white/80">
          Full-stack learning experience designer with 15+ years crafting
          impactful education programs for companies like Okta, Amazon, and
          Microsoft.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="#portfolio"
            className="rounded-lg bg-mustard-500 px-8 py-3 font-semibold text-charcoal-800 transition hover:bg-mustard-400 shadow-lg"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="rounded-lg border-2 border-white/30 px-8 py-3 font-semibold text-white transition hover:border-white hover:bg-white/10"
          >
            Get In Touch
          </a>
        </div>
      </div>
      <a
        href="#profile"
        className="absolute bottom-10 z-10 animate-bounce text-white/50 transition hover:text-mustard-500"
        aria-label="Scroll to profile"
      >
        <ChevronDown size={32} />
      </a>
    </section>
  );
}
