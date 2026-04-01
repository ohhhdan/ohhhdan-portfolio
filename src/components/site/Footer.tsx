import Link from 'next/link';
import { Mail } from 'lucide-react';
import { getSingleton } from '@/lib/cms/db';
import type { Profile } from '@/lib/cms/types';

export async function Footer() {
  const profile = getSingleton<Profile>('profile');
  const email = profile?.email ?? 'dan@ohhhdan.com';

  return (
    <footer className="relative border-t border-mint/25 bg-forest text-pine-100">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-mint via-mustard to-teal" aria-hidden />
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-heading text-lg font-bold uppercase tracking-wide text-white">
            {profile?.name ?? 'Dan Winter'}
          </p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-mint/90">
            Learning experience design & customer education—sophisticated, approachable, and sharply detailed.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:items-end">
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-2 text-sm text-white/90 transition hover:translate-x-0.5 hover:text-mustard motion-reduce:hover:translate-x-0"
          >
            <Mail size={18} className="text-mustard" /> {email}
          </a>
          <Link href="/background" className="text-sm font-medium text-mint transition hover:text-white">
            Background &amp; print-friendly CV
          </Link>
          <Link
            href="/#contact"
            className="text-sm font-medium text-mint transition hover:text-white"
          >
            Contact form →
          </Link>
        </div>
      </div>
    </footer>
  );
}
