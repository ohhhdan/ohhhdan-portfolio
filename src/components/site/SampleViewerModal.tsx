'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import type { ProjectSample } from '@/lib/playback';
import { PlaybackFrame } from './PlaybackFrame';

interface SampleViewerModalProps {
  samples: ProjectSample[];
  open: boolean;
  onClose: () => void;
  initialIndex?: number;
}

export function SampleViewerModal({ samples, open, onClose, initialIndex = 0 }: SampleViewerModalProps) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) setActiveIndex(initialIndex);
  }, [open, initialIndex]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!mounted || !open || samples.length === 0) return null;

  const active = samples[activeIndex] ?? samples[0];

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sample-viewer-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-pine-950/85 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close sample viewer"
      />
      <div className="relative z-10 flex h-[min(94vh,980px)] w-[min(96vw,1440px)] flex-col gap-2">
        {samples.length > 1 ? (
          <div className="flex shrink-0 flex-wrap justify-center gap-2 rounded-xl border border-pine-700/50 bg-pine-950/95 p-2">
            {samples.map((sample, index) => (
              <button
                key={sample.externalUrl + sample.title}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  index === activeIndex
                    ? 'bg-mustard text-pine-950'
                    : 'bg-pine-800 text-pine-100 hover:bg-pine-700'
                }`}
              >
                {sample.title}
              </button>
            ))}
          </div>
        ) : null}
        <PlaybackFrame
          title={active.title}
          embedUrl={active.embedUrl}
          externalUrl={active.externalUrl}
          embeddable={active.embeddable}
          blockReason={active.blockReason}
          className="min-h-0 flex-1"
          onClose={onClose}
        />
      </div>
    </div>,
    document.body,
  );
}
