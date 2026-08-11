import type { Project } from '@/lib/cms/types';
import { scormPackageExists } from '@/lib/scorm/package-root';
import { Section } from './Section';
import { PortfolioCard } from './PortfolioCard';

export function PortfolioGrid({ projects }: { projects: Project[] }) {
  return (
    <Section id="work" eyebrow="Work" title="Portfolio" align="center">
      <ul className="mx-auto mt-8 grid max-w-4xl items-stretch gap-6 sm:grid-cols-2">
        {projects.map((p, i) => {
          const hasLocalScorm = Boolean(p.scormPackageId && scormPackageExists(p.scormPackageId));
          return (
            <li key={p.id} className="h-full">
              <PortfolioCard project={p} hasLocalScorm={hasLocalScorm} delayMs={i * 55} />
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
