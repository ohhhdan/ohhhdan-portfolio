import { getCollection } from './db';
import type { EducationItem, CredentialItem } from './types';

export type { EducationItem, CredentialItem } from './types';

export function getEducation(): EducationItem[] {
  return getCollection<EducationItem>('education');
}

export function getCredentials(): CredentialItem[] {
  return getCollection<CredentialItem>('credentials');
}
