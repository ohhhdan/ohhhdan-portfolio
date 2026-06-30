'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Animates a number from 0 to `end` when the element scrolls into view.
 * Returns a ref to attach to the container and the current display value.
 */
export function useCountUp(end: number, duration = 1800) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Skip animation for reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(end);
      return;
    }

    const ob = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          ob.disconnect();

          const start = performance.now();
          function tick(now: number) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * end));
            if (progress < 1) requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 },
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, [end, duration]);

  return { ref, value };
}
