import type { Metadata } from 'next';
import { BackgroundIntro } from '@/components/site/BackgroundIntro';
import { ExperienceBlock } from '@/components/site/ExperienceBlock';
import { SkillsBlock } from '@/components/site/SkillsBlock';
import { EducationBlock } from '@/components/site/EducationBlock';
import { AwardsBlock } from '@/components/site/AwardsBlock';
import { getCollection, getSingleton } from '@/lib/cms/db';
import type {
  Profile,
  ExperienceItem,
  SkillCategory,
  EducationItem,
  CredentialItem,
  AwardItem,
  EngagementItem,
} from '@/lib/cms/types';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Background | Dan Winter',
  description:
    'Experience, skills, education, and recognition—learning experience design and customer education.',
};

export default function BackgroundPage() {
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

  return (
    <div className="print-resume bg-paper pb-10 sm:pb-12">
      <BackgroundIntro profile={profile} />
      <ExperienceBlock items={experience} />
      <SkillsBlock categories={skills} />
      <EducationBlock education={education} credentials={credentials} />
      <AwardsBlock awards={awards} engagements={engagements} />
    </div>
  );
}
