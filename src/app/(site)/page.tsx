import { Hero } from '@/components/site/Hero';
import { ProfileBlock } from '@/components/site/ProfileBlock';
import { ResumeTeaser } from '@/components/site/ResumeTeaser';
import { PortfolioGrid } from '@/components/site/PortfolioGrid';
import { ContactForm } from '@/components/site/ContactForm';
import { getCollection, getSingleton } from '@/lib/cms/db';
import type { Profile, Project } from '@/lib/cms/types';

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

  const projects = getCollection<Project>('projects');

  return (
    <>
      <Hero profile={profile} />
      <ProfileBlock profile={profile} />
      <ResumeTeaser />
      <PortfolioGrid projects={projects} />
      <ContactForm />
    </>
  );
}
