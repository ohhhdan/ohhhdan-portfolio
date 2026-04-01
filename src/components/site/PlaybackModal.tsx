'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';

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

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="playback-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-pine-950/80 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close sample viewer"
      />
      <div className="relative z-10 flex h-[min(90vh,920px)] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-pine-600/40 bg-pine-950 shadow-2xl">
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-pine-700 px-4 py-3">
          <h2 id="playback-modal-title" className="truncate text-sm font-semibold text-pine-50">
            {title}
          </h2>
          <div className="flex shrink-0 items-center gap-3">
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-medium text-pine-300 underline-offset-2 transition hover:text-white hover:underline"
            >
              Open in new tab
            </a>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-pine-300 transition hover:bg-pine-800 hover:text-white"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        <iframe
          src={url}
          title={title}
          className="min-h-0 w-full flex-1 border-0 bg-black"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
        />
      </div>
    </div>
  );
}
