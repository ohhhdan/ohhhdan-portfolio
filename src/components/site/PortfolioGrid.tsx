import type { Project } from '@/lib/cms/types';
import { PortfolioCard } from './PortfolioCard';

export function PortfolioGrid({ projects }: { projects: Project[] }) {
  return (
    <ul className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
      {projects.map((p) => (
        <li key={p.id} className="h-full">
          <PortfolioCard project={p} />
        </li>
      ))}
    </ul>
  );
}
