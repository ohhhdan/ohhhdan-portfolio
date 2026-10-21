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
    [project.problem, project.context].filter(Boolean).join(' ') ||
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

function CaseSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-forest/70">{label}</h2>
      <div className="mt-2">{children}</div>
    </section>
  );
}

export default async function WorkProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const projects = getCollection<Project>('projects');
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const hasLocalScorm = Boolean(project.scormPackageId && scormPackageExists(project.scormPackageId));
  const pageUrl = `${SITE_URL}/work/${project.slug}`;
  const heroImages = (project.screenshots ?? []).filter((s) => s.trim());
  const tools = (project.technologies ?? []).filter((t) => t.trim());
  const approach = (project.approach ?? []).filter((a) => a.trim());
  const results = (project.results ?? []).filter((r) => r.trim());

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
    keywords: tools.join(', '),
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
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-teal">{project.client}</p>
            {project.engagementLabel?.trim() ? (
              <span className="rounded-full border border-forest/15 bg-surface px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-forest">
                {project.engagementLabel}
              </span>
            ) : null}
          </div>
          <h1 className="mt-2 font-heading text-3xl font-bold tracking-wide text-forest sm:text-4xl">
            {project.title}
          </h1>
          {project.period ? <p className="mt-2 text-sm text-ink-muted">{project.period}</p> : null}
          <p className="mt-4 text-base leading-relaxed text-ink-muted">{project.summary}</p>
        </header>

        {project.roleLine?.trim() ? (
          <CaseSection label="Role + team + timeframe">
            <p className="text-sm leading-relaxed text-ink">{project.roleLine}</p>
          </CaseSection>
        ) : null}

        {project.context?.trim() ? (
          <CaseSection label="Context">
            <p className="text-sm leading-relaxed text-ink">{project.context}</p>
          </CaseSection>
        ) : null}

        {project.problem?.trim() ? (
          <CaseSection label="Problem">
            <p className="text-sm leading-relaxed text-ink">{project.problem}</p>
          </CaseSection>
        ) : null}

        {approach.length ? (
          <CaseSection label="Approach">
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink marker:text-mint">
              {approach.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CaseSection>
        ) : project.solution?.trim() ? (
          <CaseSection label="Approach">
            <p className="text-sm leading-relaxed text-ink">{project.solution}</p>
          </CaseSection>
        ) : null}

        <CaseSection label="What I built">
          {heroImages.length ? (
            <ScreenshotCarousel images={heroImages} title={project.title} />
          ) : (
            <div className="flex aspect-[16/10] items-center justify-center rounded-xl border border-dashed border-forest/20 bg-surface px-6 text-center">
              <p className="text-sm font-medium text-ink-muted">
                {project.builtNote?.trim() || '[HERO MEDIA]'}
              </p>
            </div>
          )}
        </CaseSection>

        {results.length ? (
          <CaseSection label="Results">
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink marker:text-mint">
              {results.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </CaseSection>
        ) : null}

        {tools.length ? (
          <CaseSection label="Tools">
            <ToolChips tools={tools} />
          </CaseSection>
        ) : null}

        <div className="mt-10 border-t border-forest/10 pt-8">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-forest/70">Sample</h2>
          <div className="mt-3">
            <ViewSampleButton project={project} hasLocalScorm={hasLocalScorm} />
          </div>
        </div>
      </div>
    </article>
  );
}
