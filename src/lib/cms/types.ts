export interface Profile {
  name: string;
  tagline: string;
  headline: string;
  /** Background and PDF summary. Plain first person. */
  summary: string;
  /** Optional short line under the homepage tagline (marketing tone). */
  heroIntro?: string;
  location: string;
  email: string;
  rolesLine: string;
  bioParagraphs: string[];
  /** Hero portrait path or URL, e.g. /images/hero.jpg */
  heroImageUrl?: string;
}

export interface ExperienceRole {
  title: string;
  period: string;
  description?: string;
  highlights: string[];
  presentationUrl?: string;
  presentationLabel?: string;
}

export interface EarlierRole {
  title: string;
  company: string;
  period?: string;
}

export interface ExperienceItem {
  id: string;
  sortOrder: number;
  title: string;
  company: string;
  period: string;
  /** Optional promotion path (legacy); prefer `roles` for multi-role employers. */
  roleProgression?: string;
  /** Multiple roles at the same company, newest first. */
  roles?: ExperienceRole[];
  description: string;
  highlights: string[];
  presentationUrl?: string;
  presentationLabel?: string;
  /** Compressed earlier jobs, rendered as a list rather than a case study. */
  lines?: EarlierRole[];
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

export interface TalkItem {
  id: string;
  sortOrder: number;
  name: string;
  event: string;
  year?: string;
  description?: string;
  url?: string;
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

export type ProjectPortfolioGroup = 'platform' | 'sample';

export interface Project {
  id: string;
  sortOrder: number;
  slug: string;
  title: string;
  client: string;
  /** e.g. "2023 to present" — shown in platform-style headings. */
  period?: string;
  /** Featured section on /work when true. */
  featured?: boolean;
  /** Badge on cards, e.g. "Freelance". */
  engagementLabel?: string;
  /** platform = programs & clients; sample = individual modules. */
  portfolioGroup?: ProjectPortfolioGroup;
  /** One-line card blurb. */
  summary: string;
  /** Role + team + timeframe. */
  roleLine?: string;
  /** Two-sentence context. */
  context?: string;
  /** Optional longer narrative (legacy); prefer problem/approach/results. */
  body?: string;
  problem?: string;
  /** Legacy; prefer approach bullets. */
  solution?: string;
  /** Three approach bullets: what was researched/decided and why. */
  approach?: string[];
  /** Results with existing numbers only. */
  results?: string[];
  /** Shown when no hero screenshot yet, e.g. [HERO MEDIA]. */
  builtNote?: string;
  /** Shown when View sample is not login-free yet. */
  sampleNote?: string;
  /** Public paths or absolute URLs, e.g. /images/work/okta-iam-1.webp */
  screenshots?: string[];
  technologies: string[];
  links: ProjectLink[];
  /** @deprecated UI always uses "View sample". */
  ctaLabel?: string;
  /** Folder name under scorm-packages/ when hosted on this site */
  scormPackageId: string | null;
}
