'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import type { AwardItem, EngagementItem } from '@/lib/data/types';
import { Trophy, Users } from 'lucide-react';

export function Awards({ awards, engagements }: { awards: AwardItem[]; engagements: EngagementItem[] }) {
  const ref = useIntersectionObserver();

  return (
    <section id="awards" className="py-24 px-6 bg-white">
      <div ref={ref} className="fade-in mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold text-forest-500 sm:text-4xl">
            Awards &amp; Engagement
          </h2>
          <div className="mx-auto h-1 w-16 rounded bg-mint-400" />
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-6 flex items-center gap-2 text-xl font-semibold text-charcoal-800">
              <Trophy size={24} className="text-mustard-500" />
              Awards
            </h3>
            <div className="space-y-4">
              {awards.map((award, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-charcoal-100 bg-cream p-5 shadow-sm"
                >
                  <h4 className="font-semibold text-charcoal-800">{award.name}</h4>
                  <p className="text-sm text-charcoal-500">{award.org}</p>
                  {award.year && (
                    <p className="text-sm text-mustard-500 font-medium">{award.year}</p>
                  )}
                  {award.description && (
                    <p className="mt-2 text-sm text-charcoal-500">
                      {award.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-6 flex items-center gap-2 text-xl font-semibold text-charcoal-800">
              <Users size={24} className="text-forest-500" />
              Professional Engagement
            </h3>
            <div className="space-y-4">
              {engagements.map((eng, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-charcoal-100 bg-cream p-5 shadow-sm"
                >
                  <h4 className="font-semibold text-charcoal-800">{eng.name}</h4>
                  <p className="text-sm text-forest-500">{eng.role}</p>
                  {eng.description && (
                    <p className="mt-2 text-sm text-charcoal-500">
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
