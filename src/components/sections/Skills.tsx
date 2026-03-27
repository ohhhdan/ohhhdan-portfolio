'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import type { SkillCategoryItem } from '@/lib/data/types';

export function Skills({ data: skillCategories }: { data: SkillCategoryItem[] }) {
  const ref = useIntersectionObserver();

  return (
    <section id="skills" className="py-24 px-6 bg-white">
      <div ref={ref} className="fade-in mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold text-forest-500 sm:text-4xl">
            Skills
          </h2>
          <div className="mx-auto h-1 w-16 rounded bg-mint-400" />
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {skillCategories.map((category) => (
            <div
              key={category.name}
              className="rounded-xl border border-charcoal-100 bg-cream p-6 shadow-sm"
            >
              <h3 className="mb-4 text-lg font-semibold text-forest-500">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-forest-100 bg-white px-3 py-1 text-sm text-charcoal-700 transition hover:border-mint-400 hover:text-forest-500"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
