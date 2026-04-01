import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, Play } from 'lucide-react';
import { getCollection } from '@/lib/cms/db';
import type { Project } from '@/lib/cms/types';
import { scormPackageExists } from '@/lib/scorm/package-root';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

export default async function WorkProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const projects = getCollection<Project>('projects');
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const hasLocalScorm =
    project.scormPackageId && scormPackageExists(project.scormPackageId);

  return (
    <article className="border-b border-forest/10 bg-paper px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/#work"
          className="inline-flex items-center gap-1 text-sm font-semibold text-forest transition hover:text-mustard"
        >
          <ArrowLeft size={16} /> Portfolio
        </Link>
        <p className="mt-6 font-heading text-xs font-bold uppercase tracking-[0.2em] text-teal">{project.client}</p>
        <h1 className="font-heading mt-3 text-3xl font-bold uppercase tracking-wide text-forest sm:text-4xl">
          {project.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-muted">{project.summary}</p>
        {project.body ? (
          <div className="mt-6 whitespace-pre-wrap leading-relaxed text-ink-muted">{project.body}</div>
        ) : null}

        {project.technologies?.length ? (
          <div className="mt-8">
            <h2 className="font-heading text-xs font-bold uppercase tracking-wider text-forest">Technology</h2>
            <ul className="mt-2 flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-forest/15 bg-surface px-3 py-1 text-xs font-semibold text-ink"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {hasLocalScorm && project.scormPackageId ? (
            <Link
              href={`/learn/${encodeURIComponent(project.scormPackageId)}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-pine-600 hover:shadow-lg motion-reduce:hover:translate-y-0"
            >
              <Play size={18} /> Open interactive sample
            </Link>
          ) : null}
          {project.links?.map((link) => (
            <a
              key={link.href + link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-forest/15 bg-surface px-5 py-3 text-sm font-semibold text-forest transition hover:border-mustard/60 hover:bg-mustard/5"
            >
              {link.label} <ExternalLink size={16} />
            </a>
          ))}
        </div>

        {!hasLocalScorm && project.scormPackageId ? (
          <p className="mt-6 text-sm text-ink-muted">
            On-site playback isn&apos;t available for this sample—the links above open the hosted version.
          </p>
        ) : null}
      </div>
    </article>
  );
}
