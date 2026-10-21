import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getCollection } from '@/lib/cms/db';
import type { Project } from '@/lib/cms/types';
import { PortfolioGrid } from '@/components/site/PortfolioGrid';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Selected customer education work — problem, solution, tools, and a sample.',
  alternates: { canonical: '/work' },
  openGraph: {
    title: 'Work | Dan Winter',
    description:
      'Selected customer education work — problem, solution, tools, and a sample.',
    url: '/work',
  },
};

export default function WorkPage() {
  const projects = getCollection<Project>('projects');

  return (
    <div className="bg-paper pb-16 sm:pb-20">
      <div className="border-b border-forest/10 px-4 py-4 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm font-medium text-forest/80 transition hover:text-forest"
          >
            <ArrowLeft size={16} aria-hidden />
            Home
          </Link>
        </div>
      </div>

      <div className="px-4 pt-10 sm:px-6 sm:pt-12">
        <div className="mx-auto max-w-5xl">
          <h1 className="font-heading text-3xl font-bold tracking-wide text-forest sm:text-4xl">Work</h1>
          <p className="mt-2 max-w-xl text-sm text-ink-muted sm:text-base">
            Selected customer education work. Problem, solution, tools, and a sample.
          </p>
        </div>
      </div>

      <div className="mt-10 px-4 sm:px-6">
        <PortfolioGrid projects={projects} />
      </div>
    </div>
  );
}
