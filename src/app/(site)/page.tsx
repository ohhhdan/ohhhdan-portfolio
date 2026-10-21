import { Hero } from '@/components/site/Hero';
import { ContactForm } from '@/components/site/ContactForm';
import { ExperienceBlock } from '@/components/site/ExperienceBlock';
import { SkillsBlock } from '@/components/site/SkillsBlock';
import { EducationBlock } from '@/components/site/EducationBlock';
import { AwardsBlock } from '@/components/site/AwardsBlock';
import { PrintPageButton } from '@/components/site/PrintPageButton';
import { getCollection, getSingleton } from '@/lib/cms/db';
import type {
  AwardItem,
  CredentialItem,
  TalkItem,
  EducationItem,
  EngagementItem,
  ExperienceItem,
  Profile,
  SkillCategory,
} from '@/lib/cms/types';

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
  const talks = getCollection<TalkItem>('presentations');
  const engagements = getCollection<EngagementItem>('engagements');

  return (
    <>
      <Hero profile={profile} />
      <div id="background" className="scroll-mt-24">
        <ExperienceBlock items={experience} action={<PrintPageButton />} />
      </div>
      <SkillsBlock categories={skills} />
      <EducationBlock education={education} credentials={credentials} />
      <AwardsBlock awards={awards} talks={talks} engagements={engagements} />
      <ContactForm email={profile.email} />
    </>
  );
}
