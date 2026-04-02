'use client';

import { useEffect, useRef } from 'react';

/**
 * Brand-only hero art: forest / mint / paper palette, no stock photos.
 * Subtle scroll depth; disabled when prefers-reduced-motion.
 */
export function HeroBrandVisual() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const driftRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const drift = driftRef.current;
    if (!wrap || !drift) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const damp = 0.06;
    let ticking = false;
    const tick = () => {
      const rect = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      const center = rect.top + rect.height / 2;
      const delta = (vh / 2 - center) * damp;
      drift.style.transform = `translate3d(0, ${delta}px, 0)`;
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(tick);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    tick();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative mx-auto w-full max-w-[min(100%,420px)] lg:mx-0 lg:ml-auto"
      aria-hidden
    >
      <div className="relative aspect-[5/4] overflow-hidden rounded-3xl border border-forest/12 bg-surface shadow-[0_24px_60px_-20px_rgba(27,74,56,0.25)]">
        <div ref={driftRef} className="absolute -inset-[28%] will-change-transform">
          <div
            className="absolute inset-0 opacity-90"
            style={{
              background: `
                radial-gradient(ellipse 70% 55% at 20% 30%, rgba(105, 188, 146, 0.45), transparent 55%),
                radial-gradient(ellipse 60% 50% at 85% 20%, rgba(230, 159, 0, 0.18), transparent 50%),
                radial-gradient(ellipse 50% 45% at 70% 85%, rgba(42, 157, 143, 0.28), transparent 50%),
                linear-gradient(165deg, #f5f9f7 0%, #e8f2ec 38%, #dceee4 100%)
              `,
            }}
          />
          <div className="absolute left-[8%] top-[12%] h-[62%] w-[78%] rounded-2xl border border-forest/10 bg-paper/40 shadow-inner backdrop-blur-[2px]" />
          <div className="absolute left-[14%] top-[20%] h-[6px] w-[28%] rounded-full bg-forest/12" />
          <div className="absolute left-[14%] top-[32%] h-[5px] w-[55%] rounded-full bg-forest/8" />
          <div className="absolute left-[14%] top-[42%] h-[5px] w-[48%] rounded-full bg-forest/8" />
        </div>
        <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/50" />
      </div>
    </div>
  );
}
