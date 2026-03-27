import { getSingleton } from './db';
import type { Profile } from './types';

export type { Profile } from './types';

const defaultProfile: Profile = {
  name: 'Dan Winter',
  tagline: 'Full-stack learning experience designer with a personality',
  headline: 'Staff Learning Experience Designer',
  summary:
    'I design learning experiences that actually work.',
  location: 'United States',
};

export function getProfile(): Profile {
  return getSingleton<Profile>('profile') ?? defaultProfile;
}
