import type { SkillCategory } from '@/lib/cms/types';
import { Section } from './Section';
import { Reveal } from './Reveal';

export function SkillsBlock({ categories }: { categories: SkillCategory[] }) {
  return (
    <Section id="skills" eyebrow="Skills" title="Tools, methods & platforms">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat, i) => (
          <Reveal key={cat.id} delayMs={i * 60}>
            <div className="h-full rounded-2xl border border-forest/10 bg-surface p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-mint/45 hover:shadow-lg motion-reduce:hover:translate-y-0">
              <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-forest">{cat.name}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {cat.skills.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-forest/10 bg-paper px-3 py-1 text-xs font-semibold text-ink transition hover:border-mustard/40 hover:bg-mustard/5"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
