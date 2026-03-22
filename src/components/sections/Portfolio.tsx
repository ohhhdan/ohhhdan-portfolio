'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { projects } from '@/lib/data/projects';
import Link from 'next/link';
import { ExternalLink, Play } from 'lucide-react';

export function Portfolio() {
  const ref = useIntersectionObserver();

  return (
    <section id="portfolio" className="bg-navy-900/50 py-24 px-6">
      <div ref={ref} className="fade-in mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold text-white sm:text-4xl">
            Portfolio
          </h2>
          <div className="mx-auto h-1 w-16 rounded bg-accent-500" />
          <p className="mt-4 text-navy-300">
            Selected projects showcasing learning experiences across industries
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.slug}
              className="group rounded-xl border border-navy-700 bg-navy-800/50 p-6 transition hover:border-accent-500/30 hover:bg-navy-800"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent-500/10 text-accent-400">
                <ExternalLink size={24} />
              </div>
              <h3 className="mb-1 text-lg font-semibold text-white group-hover:text-accent-400 transition">
                {project.title}
              </h3>
              <p className="mb-3 text-sm text-accent-400">{project.client}</p>
              <p className="mb-4 text-sm text-navy-300 line-clamp-3">
                {project.description}
              </p>
              <div className="mb-4 flex flex-wrap gap-1.5">
                {project.technologies.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-navy-900/50 px-2 py-0.5 text-xs text-navy-300"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="rounded-full bg-navy-900/50 px-2 py-0.5 text-xs text-navy-400">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>
              <div className="flex gap-3">
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="text-sm font-medium text-accent-400 transition hover:text-accent-300"
                >
                  View Case Study
                </Link>
                {project.scormPackageId && (
                  <Link
                    href={`/scorm/${project.scormPackageId}`}
                    className="flex items-center gap-1 text-sm font-medium text-navy-300 transition hover:text-accent-400"
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
