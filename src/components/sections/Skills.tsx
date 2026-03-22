'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { skillCategories } from '@/lib/data/skills';

export function Skills() {
  const ref = useIntersectionObserver();

  return (
    <section id="skills" className="py-24 px-6">
      <div ref={ref} className="fade-in mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold text-white sm:text-4xl">
            Skills
          </h2>
          <div className="mx-auto h-1 w-16 rounded bg-accent-500" />
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {skillCategories.map((category) => (
            <div
              key={category.name}
              className="rounded-xl border border-navy-700 bg-navy-800/50 p-6"
            >
              <h3 className="mb-4 text-lg font-semibold text-accent-400">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-navy-600 bg-navy-900/50 px-3 py-1 text-sm text-navy-200 transition hover:border-accent-500/50 hover:text-accent-400"
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
