import { getCollection } from './db';
import type { SkillCategoryItem } from './types';

export type { SkillCategoryItem } from './types';

export function getSkillCategories(): SkillCategoryItem[] {
  return getCollection<SkillCategoryItem>('skills');
}
