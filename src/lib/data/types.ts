export interface Profile {
  name: string;
  tagline: string;
  headline: string;
  summary: string;
  location: string;
}

export interface ExperienceItem {
  id: string;
  sortOrder: number;
  title: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
}

export interface Project {
  id: string;
  sortOrder: number;
  slug: string;
  title: string;
  client: string;
  description: string;
  role: string;
  challenge: string;
  solution: string;
  results: string[];
  technologies: string[];
  scormPackageId?: string;
}

export interface EducationItem {
  id: string;
  sortOrder: number;
  degree: string;
  institution: string;
  year?: string;
  details?: string;
}

export interface CredentialItem {
  id: string;
  sortOrder: number;
  name: string;
  issuer: string;
  year?: string;
}

export interface AwardItem {
  id: string;
  sortOrder: number;
  name: string;
  org: string;
  year?: string;
  description?: string;
}

export interface EngagementItem {
  id: string;
  sortOrder: number;
  name: string;
  role: string;
  description?: string;
}

export interface SkillCategoryItem {
  id: string;
  sortOrder: number;
  name: string;
  skills: string[];
}
