'use client';

import { ExternalLink, X } from 'lucide-react';

interface PlaybackFrameProps {
  title: string;
  externalUrl: string;
  embedUrl?: string | null;
  embeddable?: boolean;
  blockReason?: 'articulate-review';
  className?: string;
  onClose?: () => void;
}

const IFRAME_SANDBOX =
  'allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-modals allow-downloads allow-presentation';

export function PlaybackFrame({
  title,
  externalUrl,
  embedUrl,
  embeddable = true,
  blockReason,
  className = '',
  onClose,
}: PlaybackFrameProps) {
  const showIframe = embeddable && embedUrl;

  const fallbackCopy =
    blockReason === 'articulate-review'
      ? 'This sample is on Articulate Review, which blocks in-page preview. Use the button below to open it in a new tab.'
      : 'This sample could not be loaded in the viewer. Open it in a new tab instead.';

  return (
    <div
      className={`flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-forest/15 bg-pine-950 shadow-lg ${className}`}
    >
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-pine-700/80 px-4 py-3">
        <h3 id="sample-viewer-title" className="truncate text-sm font-semibold text-pine-50">
          {title}
        </h3>
        <div className="flex shrink-0 items-center gap-2">
          <a
            href={externalUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-pine-300 underline-offset-2 transition hover:text-white hover:underline"
          >
            Open in new tab <ExternalLink size={12} />
          </a>
          {onClose ? (
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1.5 text-pine-300 transition hover:bg-pine-800 hover:text-white"
              aria-label="Close sample viewer"
            >
              <X size={18} />
            </button>
          ) : null}
        </div>
      </div>

      {showIframe ? (
        <iframe
          src={embedUrl}
          title={title}
          className="min-h-0 w-full flex-1 border-0 bg-black"
          style={{ minHeight: 'min(78vh, 820px)' }}
          sandbox={IFRAME_SANDBOX}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        />
      ) : (
        <div
          className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-10 text-center"
          style={{ minHeight: 'min(78vh, 820px)' }}
        >
          <p className="max-w-md text-sm leading-relaxed text-pine-200">{fallbackCopy}</p>
          <a
            href={externalUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-mustard px-5 py-2.5 text-sm font-semibold text-pine-950 transition hover:bg-mustard/90"
          >
            Open in new tab <ExternalLink size={16} />
          </a>
        </div>
      )}
    </div>
  );
}
