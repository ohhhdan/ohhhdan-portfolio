'use client';

import { useEffect, useRef } from 'react';

/** Full-width brand strip with motion parallax on gradient layers only. */
export function BrandScrollBand() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const driftRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const drift = driftRef.current;
    if (!wrap || !drift) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const damp = 0.1;
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
      className="relative h-36 overflow-hidden border-y border-forest/10 sm:h-44 md:h-52"
      aria-hidden
    >
      <div ref={driftRef} className="absolute -inset-[20%] will-change-transform">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 120% at 10% 50%, rgba(105, 188, 146, 0.35), transparent 55%),
              radial-gradient(ellipse 70% 100% at 90% 40%, rgba(27, 74, 56, 0.55), transparent 50%),
              linear-gradient(105deg, #163d2e 0%, #1b4a38 35%, #2a9d8f 100%)
            `,
          }}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-paper/20 via-transparent to-paper/30" />
    </div>
  );
}
