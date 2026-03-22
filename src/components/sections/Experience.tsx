'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { experience } from '@/lib/data/experience';
import { Briefcase } from 'lucide-react';

export function Experience() {
  const ref = useIntersectionObserver();

  return (
    <section id="experience" className="bg-navy-900/50 py-24 px-6">
      <div ref={ref} className="fade-in mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold text-white sm:text-4xl">
            Experience
          </h2>
          <div className="mx-auto h-1 w-16 rounded bg-accent-500" />
        </div>
        <div className="relative space-y-8">
          {/* Timeline line */}
          <div className="absolute top-0 left-6 h-full w-px bg-navy-700 md:left-1/2" />
          {experience.map((job, i) => (
            <div
              key={i}
              className={`relative flex flex-col gap-4 pl-16 md:w-1/2 md:pl-0 ${
                i % 2 === 0
                  ? 'md:pr-12 md:text-right'
                  : 'md:ml-auto md:pl-12'
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute top-1 left-4 flex h-5 w-5 items-center justify-center rounded-full border-2 border-accent-500 bg-navy-950 md:left-auto md:right-auto md:-ml-2.5 md:left-1/2" style={i % 2 === 0 ? { left: 'auto', right: '-10px' } : { left: '-10px' }}>
                <div className="h-2 w-2 rounded-full bg-accent-500" />
              </div>
              <div className="rounded-xl border border-navy-700 bg-navy-800/50 p-6 transition hover:border-accent-500/30">
                <div className="mb-1 flex items-center gap-2 text-sm text-accent-400">
                  <Briefcase size={14} />
                  <span>{job.period}</span>
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {job.title}
                </h3>
                <p className="mb-3 text-navy-300">{job.company}</p>
                <p className="text-sm text-navy-200">{job.description}</p>
                {job.highlights && job.highlights.length > 0 && (
                  <ul className="mt-3 space-y-1 text-sm text-navy-300">
                    {job.highlights.map((h, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
