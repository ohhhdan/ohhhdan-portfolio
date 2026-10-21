import { Hero } from '@/components/site/Hero';
import { ContactForm } from '@/components/site/ContactForm';
import { getSingleton } from '@/lib/cms/db';
import type { Profile } from '@/lib/cms/types';

export default function HomePage() {
  const profile = getSingleton<Profile>('profile');
  if (!profile) {
    return (
      <div className="px-4 py-24 text-center">
        <p className="text-ink-muted">This page is still being set up. Please check back soon.</p>
      </div>
    );
  }

  return (
    <>
      <Hero profile={profile} />
      <ContactForm />
    </>
  );
}
