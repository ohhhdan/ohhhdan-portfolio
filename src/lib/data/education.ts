export interface EducationItem {
  degree: string;
  institution: string;
  year?: string;
  details?: string;
}

export interface CredentialItem {
  name: string;
  issuer: string;
  year?: string;
}

export const education: EducationItem[] = [
  {
    degree: 'Master of Science in Instructional Design and Technology',
    institution: 'Western Governors University',
    year: '2018',
  },
  {
    degree: 'Bachelor of Science in Business Management',
    institution: 'Western Governors University',
    year: '2015',
  },
];

export const credentials: CredentialItem[] = [
  {
    name: 'Certified Professional in Talent Development (CPTD)',
    issuer: 'Association for Talent Development (ATD)',
    year: '2020',
  },
  {
    name: 'Articulate Storyline Certified Developer',
    issuer: 'Articulate',
    year: '2019',
  },
];
