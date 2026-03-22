import { projects } from '@/lib/data/projects';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Play, ExternalLink } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-navy-950 px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/#portfolio"
          className="mb-8 inline-flex items-center gap-1 text-sm text-navy-300 transition hover:text-accent-400"
        >
          <ArrowLeft size={16} />
          Back to Portfolio
        </Link>

        <div className="mb-4 flex items-center gap-3">
          <span className="text-sm font-medium text-accent-400">
            {project.client}
          </span>
          {project.scormPackageId && (
            <Link
              href={`/scorm/${project.scormPackageId}`}
              className="flex items-center gap-1 rounded-full bg-accent-500/10 px-3 py-1 text-xs font-medium text-accent-400 transition hover:bg-accent-500/20"
            >
              <Play size={12} />
              Launch Demo
            </Link>
          )}
        </div>

        <h1 className="mb-6 text-3xl font-bold text-white sm:text-4xl">
          {project.title}
        </h1>

        <div className="mb-8 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-navy-600 bg-navy-800/50 px-3 py-1 text-sm text-navy-200"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="space-y-8">
          <div className="rounded-xl border border-navy-700 bg-navy-800/50 p-6">
            <h2 className="mb-3 text-lg font-semibold text-accent-400">
              Role
            </h2>
            <p className="text-navy-200">{project.role}</p>
          </div>

          <div className="rounded-xl border border-navy-700 bg-navy-800/50 p-6">
            <h2 className="mb-3 text-lg font-semibold text-accent-400">
              Challenge
            </h2>
            <p className="text-navy-200">{project.challenge}</p>
          </div>

          <div className="rounded-xl border border-navy-700 bg-navy-800/50 p-6">
            <h2 className="mb-3 text-lg font-semibold text-accent-400">
              Solution
            </h2>
            <p className="text-navy-200">{project.solution}</p>
          </div>

          <div className="rounded-xl border border-navy-700 bg-navy-800/50 p-6">
            <h2 className="mb-3 text-lg font-semibold text-accent-400">
              Results
            </h2>
            <ul className="space-y-2">
              {project.results.map((result, i) => (
                <li key={i} className="flex items-start gap-2 text-navy-200">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent-500" />
                  {result}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex gap-4">
          <Link
            href="/#portfolio"
            className="rounded-lg border border-navy-600 px-6 py-3 text-sm font-medium text-navy-200 transition hover:border-accent-400 hover:text-accent-400"
          >
            View All Projects
          </Link>
          {project.scormPackageId && (
            <Link
              href={`/scorm/${project.scormPackageId}`}
              className="flex items-center gap-2 rounded-lg bg-accent-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-600"
            >
              <ExternalLink size={16} />
              Launch Interactive Demo
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: 'Not Found' };

  return {
    title: `${project.title} | Dan Winter Portfolio`,
    description: project.description,
  };
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
