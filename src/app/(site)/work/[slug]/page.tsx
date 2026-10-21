import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { getCollection } from '@/lib/cms/db';
import type { Project } from '@/lib/cms/types';
import { scormPackageExists } from '@/lib/scorm/package-root';
import { ScreenshotCarousel } from '@/components/site/ScreenshotCarousel';
import { ToolChips } from '@/components/site/ToolChips';
import { ViewSampleButton } from '@/components/site/ViewSampleButton';
import { SITE_NAME, SITE_URL } from '@/lib/site';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getCollection<Project>('projects').map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getCollection<Project>('projects').find((p) => p.slug === slug);
  if (!project) return { title: 'Work' };

  const description =
    project.summary ||
    [project.problem, project.solution].filter(Boolean).join(' ') ||
    `${project.title} — case study by ${SITE_NAME}`;

  return {
    title: project.title,
    description,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.title} | ${SITE_NAME}`,
      description,
      url: `/work/${project.slug}`,
      type: 'article',
    },
  };
}

export default async function WorkProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const projects = getCollection<Project>('projects');
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const hasLocalScorm = Boolean(project.scormPackageId && scormPackageExists(project.scormPackageId));
  const hasCase = Boolean(project.problem?.trim() || project.solution?.trim());
  const pageUrl = `${SITE_URL}/work/${project.slug}`;

  const creativeWorkLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.summary,
    url: pageUrl,
    creator: {
      '@type': 'Person',
      name: SITE_NAME,
      url: SITE_URL,
    },
    about: project.client,
    keywords: (project.technologies ?? []).join(', '),
  };

  return (
    <article className="bg-paper px-4 py-10 sm:px-6 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkLd) }}
      />
      <div className="mx-auto max-w-3xl">
        <Link
          href="/work"
          className="inline-flex items-center gap-1 text-sm font-medium text-forest/80 transition hover:text-forest"
        >
          <ArrowLeft size={16} /> Work
        </Link>

        <header className="mt-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-teal">{project.client}</p>
          <h1 className="mt-2 font-heading text-3xl font-bold tracking-wide text-forest sm:text-4xl">
            {project.title}
          </h1>
          {project.period ? (
            <p className="mt-2 text-sm text-ink-muted">{project.period}</p>
          ) : null}
          <p className="mt-4 text-base leading-relaxed text-ink-muted">{project.summary}</p>
        </header>

        <div className="mt-8">
          <ScreenshotCarousel images={project.screenshots ?? []} title={project.title} />
        </div>

        {hasCase ? (
          <dl className="mt-10 grid gap-8 sm:grid-cols-2">
            {project.problem?.trim() ? (
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-forest/70">Problem</dt>
                <dd className="mt-2 text-sm leading-relaxed text-ink">{project.problem}</dd>
              </div>
            ) : null}
            {project.solution?.trim() ? (
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-forest/70">Solution</dt>
                <dd className="mt-2 text-sm leading-relaxed text-ink">{project.solution}</dd>
              </div>
            ) : null}
          </dl>
        ) : project.body?.trim() ? (
          <p className="mt-10 text-sm leading-relaxed text-ink-muted">{project.body}</p>
        ) : null}

        {project.technologies?.length ? (
          <div className="mt-10">
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-forest/70">Tools</h2>
            <div className="mt-3">
              <ToolChips tools={project.technologies} />
            </div>
          </div>
        ) : null}

        <div className="mt-10 border-t border-forest/10 pt-8">
          <ViewSampleButton project={project} hasLocalScorm={hasLocalScorm} />
        </div>
      </div>
    </article>
  );
}
