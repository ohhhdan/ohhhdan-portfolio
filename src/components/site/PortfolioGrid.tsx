import type { Project } from '@/lib/cms/types';
import { scormPackageExists } from '@/lib/scorm/package-root';
import { PortfolioCard } from './PortfolioCard';

export function PortfolioGrid({ projects }: { projects: Project[] }) {
  return (
    <ul className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
      {projects.map((p) => {
        const hasLocalScorm = Boolean(p.scormPackageId && scormPackageExists(p.scormPackageId));
        return (
          <li key={p.id} className="h-full">
            <PortfolioCard project={p} hasLocalScorm={hasLocalScorm} />
          </li>
        );
      })}
    </ul>
  );
}
