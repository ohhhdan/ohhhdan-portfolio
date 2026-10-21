'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function ScreenshotCarousel({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const slides = images.map((s) => s.trim()).filter(Boolean);
  const [index, setIndex] = useState(0);

  if (slides.length === 0) {
    return (
      <div className="flex aspect-[16/10] w-full items-center justify-center rounded-xl border border-forest/10 bg-gradient-to-br from-forest/85 via-pine-700 to-teal/75">
        <p className="px-6 text-center text-sm text-white/75">Screenshots coming soon</p>
      </div>
    );
  }

  const current = slides[index] ?? slides[0];
  const multi = slides.length > 1;

  function prev() {
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  }

  function next() {
    setIndex((i) => (i + 1) % slides.length);
  }

  return (
    <div className="overflow-hidden rounded-xl border border-forest/10 bg-surface">
      <div className="relative aspect-[16/10] bg-paper">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={current}
          alt={`${title} — screenshot ${index + 1} of ${slides.length}`}
          className="h-full w-full object-cover object-top"
        />
        {multi ? (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-forest/15 bg-surface/95 p-2 text-forest shadow-sm transition hover:bg-paper"
              aria-label="Previous screenshot"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-forest/15 bg-surface/95 p-2 text-forest shadow-sm transition hover:bg-paper"
              aria-label="Next screenshot"
            >
              <ChevronRight size={18} />
            </button>
          </>
        ) : null}
      </div>
      {multi ? (
        <div className="flex items-center justify-between gap-3 border-t border-forest/10 px-4 py-2.5">
          <p className="text-xs text-ink-muted">
            {index + 1} / {slides.length}
          </p>
          <div className="flex gap-1.5">
            {slides.map((_, i) => (
              <button
                key={slides[i]}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Go to screenshot ${i + 1}`}
                className={`h-1.5 w-1.5 rounded-full transition ${
                  i === index ? 'bg-forest' : 'bg-forest/25 hover:bg-forest/40'
                }`}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
