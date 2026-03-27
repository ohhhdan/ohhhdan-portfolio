'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import type { Project } from '@/lib/data/types';
import Link from 'next/link';
import { ExternalLink, Play } from 'lucide-react';

export function Portfolio({ data: projects }: { data: Project[] }) {
  const ref = useIntersectionObserver();

  return (
    <section id="portfolio" className="bg-cream py-24 px-6">
      <div ref={ref} className="fade-in mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold text-forest-500 sm:text-4xl">
            Portfolio
          </h2>
          <div className="mx-auto h-1 w-16 rounded bg-mint-400" />
          <p className="mt-4 text-charcoal-500">
            Selected projects showcasing learning experiences across industries
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.slug}
              className="group rounded-xl border border-charcoal-100 bg-white p-6 shadow-sm transition hover:shadow-md hover:border-mint-400/50"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-forest-50 text-forest-500">
                <ExternalLink size={24} />
              </div>
              <h3 className="mb-1 text-lg font-semibold text-charcoal-800 group-hover:text-forest-500 transition">
                {project.title}
              </h3>
              <p className="mb-3 text-sm text-forest-400 font-medium">{project.client}</p>
              <p className="mb-4 text-sm text-charcoal-500 line-clamp-3">
                {project.description}
              </p>
              <div className="mb-4 flex flex-wrap gap-1.5">
                {project.technologies.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-cream px-2 py-0.5 text-xs text-charcoal-500 border border-charcoal-100"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="rounded-full bg-cream px-2 py-0.5 text-xs text-charcoal-400 border border-charcoal-100">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>
              <div className="flex gap-3">
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="text-sm font-medium text-forest-500 transition hover:text-forest-400"
                >
                  View Case Study
                </Link>
                {project.scormPackageId && (
                  <Link
                    href={`/scorm/${project.scormPackageId}`}
                    className="flex items-center gap-1 text-sm font-medium text-charcoal-400 transition hover:text-forest-500"
                  >
                    <Play size={14} />
                    Launch Demo
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
