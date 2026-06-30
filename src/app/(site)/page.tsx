import { Hero } from '@/components/site/Hero';
import { ImpactStrip } from '@/components/site/ImpactStrip';
import { CareerJourney } from '@/components/site/CareerJourney';
import { ClientLogos } from '@/components/site/ClientLogos';
import { WorkCTA } from '@/components/site/WorkCTA';
import { ContactForm } from '@/components/site/ContactForm';
import { getCollection, getSingleton } from '@/lib/cms/db';
import type { Profile, ExperienceItem } from '@/lib/cms/types';

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

  return (
    <>
      <Hero profile={profile} />
      <ImpactStrip />
      <CareerJourney experience={experience} />
      <ClientLogos />
      <WorkCTA />
      <ContactForm />
    </>
  );
}
