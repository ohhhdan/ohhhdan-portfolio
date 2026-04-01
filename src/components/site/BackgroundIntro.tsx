import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Profile } from '@/lib/cms/types';
import { PrintPageButton } from './PrintPageButton';

export function BackgroundIntro({ profile }: { profile: Profile }) {
  return (
    <>
      <div className="no-print border-b border-forest/10 bg-paper px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm font-semibold text-forest transition hover:text-mustard"
          >
            <ArrowLeft size={16} aria-hidden />
            Back to home
          </Link>
          <PrintPageButton />
        </div>
      </div>

      <div className="print-resume-header border-b border-forest/10 bg-surface px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-teal">Background</p>
          <h1 className="font-heading mt-2 text-3xl font-bold uppercase tracking-wide text-forest sm:text-4xl">
            {profile.name}
          </h1>
          <p className="mt-1 text-ink-muted">{profile.headline}</p>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">{profile.summary}</p>
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink">
            <li>
              <a href={`mailto:${profile.email}`} className="font-medium text-forest underline decoration-mint underline-offset-2">
                {profile.email}
              </a>
            </li>
            {profile.location ? <li>{profile.location}</li> : null}
            <li className="no-print">
              <Link href="/#work" className="font-medium text-forest underline decoration-mint underline-offset-2">
                View portfolio
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
