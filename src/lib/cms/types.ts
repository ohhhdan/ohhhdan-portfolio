export interface Profile {
  name: string;
  tagline: string;
  headline: string;
  summary: string;
  location: string;
  email: string;
  rolesLine: string;
  bioParagraphs: string[];
}

export interface ExperienceItem {
  id: string;
  sortOrder: number;
  title: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
  presentationUrl?: string;
  presentationLabel?: string;
}

export interface SkillCategory {
  id: string;
  sortOrder: number;
  name: string;
  skills: string[];
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

export interface ProjectLink {
  label: string;
  href: string;
  kind?: 'external' | 'video' | 'articulate';
  /** If true and href is https, portfolio shows an in-page player (playback-only; not SCORM). */
  embedOnSite?: boolean;
}

export interface Project {
  id: string;
  sortOrder: number;
  slug: string;
  title: string;
  client: string;
  summary: string;
  body: string;
  technologies: string[];
  links: ProjectLink[];
  /** Folder name under scorm-packages/ when hosted on this site */
  scormPackageId: string | null;
}
