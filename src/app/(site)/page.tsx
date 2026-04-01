import { Hero } from '@/components/site/Hero';
import { ProfileBlock } from '@/components/site/ProfileBlock';
import { ExperienceBlock } from '@/components/site/ExperienceBlock';
import { SkillsBlock } from '@/components/site/SkillsBlock';
import { EducationBlock } from '@/components/site/EducationBlock';
import { AwardsBlock } from '@/components/site/AwardsBlock';
import { PortfolioGrid } from '@/components/site/PortfolioGrid';
import { ContactForm } from '@/components/site/ContactForm';
import { getCollection, getSingleton } from '@/lib/cms/db';
import type {
  Profile,
  ExperienceItem,
  SkillCategory,
  EducationItem,
  CredentialItem,
  AwardItem,
  EngagementItem,
  Project,
} from '@/lib/cms/types';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const profile = getSingleton<Profile>('profile');
  if (!profile) {
    return (
      <div className="px-4 py-24 text-center">
        <p className="text-ink-muted">This page is still being set up. Please check back soon.</p>
      </div>
    );
  }

  const experience = getCollection<ExperienceItem>('experience');
  const skills = getCollection<SkillCategory>('skills');
  const education = getCollection<EducationItem>('education');
  const credentials = getCollection<CredentialItem>('credentials');
  const awards = getCollection<AwardItem>('awards');
  const engagements = getCollection<EngagementItem>('engagements');
  const projects = getCollection<Project>('projects');

  return (
    <>
      <Hero profile={profile} />
      <ProfileBlock profile={profile} />
      <ExperienceBlock items={experience} />
      <SkillsBlock categories={skills} />
      <EducationBlock education={education} credentials={credentials} />
      <AwardsBlock awards={awards} engagements={engagements} />
      <PortfolioGrid projects={projects} />
      <ContactForm />
    </>
  );
}
