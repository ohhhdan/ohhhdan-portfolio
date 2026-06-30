'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { PlaybackFrame } from './PlaybackFrame';

interface PlaybackModalProps {
  url: string;
  title: string;
  open: boolean;
  onClose: () => void;
}

export function PlaybackModal({ url, title, open, onClose }: PlaybackModalProps) {
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

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sample-viewer-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-pine-950/80 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close sample viewer"
      />
      <div className="relative z-10 h-[min(90vh,920px)] w-full max-w-6xl">
        <PlaybackFrame
          title={title}
          embedUrl={url}
          externalUrl={url}
          embeddable
          className="h-full"
          onClose={onClose}
        />
      </div>
    </div>,
    document.body,
  );
}
