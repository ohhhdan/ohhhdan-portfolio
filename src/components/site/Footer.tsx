import Link from 'next/link';
import { Mail, Linkedin } from 'lucide-react';
import { getSingleton } from '@/lib/cms/db';
import type { Profile } from '@/lib/cms/types';

export async function Footer() {
  const profile = getSingleton<Profile>('profile');
  const email = profile?.email ?? 'daniel.c.winter@live.com';

  return (
    <footer className="relative border-t border-mint/25 bg-forest text-pine-100">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-mint via-mustard to-teal" aria-hidden />
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-heading text-lg font-bold uppercase tracking-wide text-white">
            {profile?.name ?? 'Dan Winter'}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:items-end">
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-2 text-sm text-white/90 transition hover:translate-x-0.5 hover:text-mustard motion-reduce:hover:translate-x-0"
          >
            <Mail size={18} className="text-mustard" /> {email}
          </a>
          <a
            href="https://www.linkedin.com/in/ohhhdan"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-sm text-white/90 transition hover:translate-x-0.5 hover:text-mustard motion-reduce:hover:translate-x-0"
          >
            <Linkedin size={18} className="text-white" aria-hidden /> LinkedIn
          </a>
          <Link href="/#background" className="text-sm font-medium text-mint transition hover:text-white">
            Background
          </Link>
          <Link
            href="/work"
            className="text-sm font-medium text-mint transition hover:text-white"
          >
            Work →
          </Link>
        </div>
      </div>
    </footer>
  );
}
