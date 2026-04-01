'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ExternalLink, Play } from 'lucide-react';
import type { ProjectLink } from '@/lib/cms/types';
import { isEmbeddablePlaybackUrl } from '@/lib/playback';
import { PlaybackModal } from './PlaybackModal';

interface ProjectWorkLinksProps {
  links: ProjectLink[];
  hasLocalScorm: boolean;
  scormPackageId: string | null;
}

export function ProjectWorkLinks({ links, hasLocalScorm, scormPackageId }: ProjectWorkLinksProps) {
  const [modal, setModal] = useState<{ url: string; title: string } | null>(null);

  return (
    <>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        {hasLocalScorm && scormPackageId ? (
          <Link
            href={`/learn/${encodeURIComponent(scormPackageId)}`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-pine-600 hover:shadow-lg motion-reduce:hover:translate-y-0"
          >
            <Play size={18} /> Open interactive sample
          </Link>
        ) : null}

        {links.map((link) => {
          const canEmbed = Boolean(link.embedOnSite && isEmbeddablePlaybackUrl(link.href));
          return (
            <div key={link.href + link.label} className="flex flex-wrap items-center gap-2">
              {canEmbed ? (
                <button
                  type="button"
                  onClick={() => setModal({ url: link.href, title: link.label })}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-pine-600 hover:shadow-lg motion-reduce:hover:translate-y-0"
                >
                  <Play size={18} />
                  {link.label}
                </button>
              ) : null}
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className={
                  canEmbed
                    ? 'inline-flex items-center justify-center gap-2 rounded-full border-2 border-forest/25 bg-surface px-4 py-2.5 text-xs font-semibold text-forest transition hover:border-mustard/60 hover:bg-mustard/5'
                    : 'inline-flex items-center justify-center gap-2 rounded-full border-2 border-forest/15 bg-surface px-5 py-3 text-sm font-semibold text-forest transition hover:border-mustard/60 hover:bg-mustard/5'
                }
              >
                {canEmbed ? (
                  <>
                    Open in new tab <ExternalLink size={14} />
                  </>
                ) : (
                  <>
                    {link.label} <ExternalLink size={16} />
                  </>
                )}
              </a>
            </div>
          );
        })}
      </div>

      {modal ? (
        <PlaybackModal
          url={modal.url}
          title={modal.title}
          open
          onClose={() => setModal(null)}
        />
      ) : null}
    </>
  );
}
