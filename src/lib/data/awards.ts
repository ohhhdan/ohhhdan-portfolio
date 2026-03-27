import { getCollection } from './db';
import type { AwardItem, EngagementItem } from './types';

export type { AwardItem, EngagementItem } from './types';

export function getAwards(): AwardItem[] {
  return getCollection<AwardItem>('awards');
}

export function getEngagements(): EngagementItem[] {
  return getCollection<EngagementItem>('engagements');
}
