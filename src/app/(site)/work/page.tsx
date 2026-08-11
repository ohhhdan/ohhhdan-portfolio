import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getCollection } from '@/lib/cms/db';
import type { Project } from '@/lib/cms/types';
import { PortfolioGrid } from '@/components/site/PortfolioGrid';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Work | Dan Winter',
  description:
    'Interactive demos, course modules, and production samples in customer education, identity security, and learning experience design.',
};

export default function WorkPage() {
  const projects = getCollection<Project>('projects');

  return (
    <div className="bg-paper pb-10 sm:pb-12">
      <div className="border-b border-forest/10 bg-paper px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm font-semibold text-forest transition hover:text-mustard"
          >
            <ArrowLeft size={16} aria-hidden />
            Back to home
          </Link>
        </div>
      </div>

      <div className="border-b border-forest/10 bg-surface/80 px-4 py-8 sm:px-6 sm:py-10">
        <div className="mx-auto max-w-5xl text-center">
          <div
            className="mx-auto mb-4 h-1 w-12 rounded-full bg-gradient-to-r from-mint to-teal"
            aria-hidden
          />
          <p className="font-heading text-xs font-bold uppercase tracking-[0.22em] text-forest/80">
            Portfolio
          </p>
          <h1 className="font-heading mt-2 text-3xl font-bold uppercase tracking-wide text-forest sm:text-4xl">
            Work samples
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-ink-muted">
            A selection of interactive demos, course modules, and production samples.
            Spanning identity security, compliance, soft-skills curriculum, certification programs, and more.
          </p>
        </div>
      </div>

      <PortfolioGrid projects={projects} />
    </div>
  );
}
