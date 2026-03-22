'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { awards, engagements } from '@/lib/data/awards';
import { Trophy, Users } from 'lucide-react';

export function Awards() {
  const ref = useIntersectionObserver();

  return (
    <section id="awards" className="py-24 px-6">
      <div ref={ref} className="fade-in mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold text-white sm:text-4xl">
            Awards &amp; Engagement
          </h2>
          <div className="mx-auto h-1 w-16 rounded bg-accent-500" />
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-6 flex items-center gap-2 text-xl font-semibold text-white">
              <Trophy size={24} className="text-accent-400" />
              Awards
            </h3>
            <div className="space-y-4">
              {awards.map((award, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-navy-700 bg-navy-800/50 p-5"
                >
                  <h4 className="font-semibold text-white">{award.name}</h4>
                  <p className="text-sm text-navy-300">{award.org}</p>
                  {award.year && (
                    <p className="text-sm text-accent-400">{award.year}</p>
                  )}
                  {award.description && (
                    <p className="mt-2 text-sm text-navy-200">
                      {award.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-6 flex items-center gap-2 text-xl font-semibold text-white">
              <Users size={24} className="text-accent-400" />
              Professional Engagement
            </h3>
            <div className="space-y-4">
              {engagements.map((eng, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-navy-700 bg-navy-800/50 p-5"
                >
                  <h4 className="font-semibold text-white">{eng.name}</h4>
                  <p className="text-sm text-navy-300">{eng.role}</p>
                  {eng.description && (
                    <p className="mt-2 text-sm text-navy-200">
                      {eng.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
