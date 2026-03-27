import { getCollection } from './db';
import type { ExperienceItem } from './types';

export type { ExperienceItem } from './types';

export function getExperience(): ExperienceItem[] {
  return getCollection<ExperienceItem>('experience');
}
