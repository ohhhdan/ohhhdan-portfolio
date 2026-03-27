import { getCollection } from './db';
import type { Project } from './types';

export type { Project } from './types';

export function getProjects(): Project[] {
  return getCollection<Project>('projects');
}
