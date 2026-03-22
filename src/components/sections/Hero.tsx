'use client';

import { ChevronDown } from 'lucide-react';

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/50 to-navy-950" />
      <div className="relative z-10 max-w-3xl">
        <p className="mb-4 text-sm font-medium tracking-widest text-accent-400 uppercase">
          Learning Experience Designer
        </p>
        <h1 className="mb-6 text-5xl font-bold tracking-tight text-white sm:text-7xl">
          Dan Winter
        </h1>
        <p className="mx-auto max-w-xl text-lg leading-relaxed text-navy-300">
          Full-stack learning experience designer with 15+ years crafting
          impactful education programs for companies like Okta, Amazon, and
          Microsoft.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="#portfolio"
            className="rounded-lg bg-accent-500 px-8 py-3 font-semibold text-white transition hover:bg-accent-600"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="rounded-lg border border-navy-400 px-8 py-3 font-semibold text-navy-200 transition hover:border-accent-400 hover:text-accent-400"
          >
            Get In Touch
          </a>
        </div>
      </div>
      <a
        href="#profile"
        className="absolute bottom-10 z-10 animate-bounce text-navy-400 transition hover:text-accent-400"
        aria-label="Scroll to profile"
      >
        <ChevronDown size={32} />
      </a>
    </section>
  );
}
