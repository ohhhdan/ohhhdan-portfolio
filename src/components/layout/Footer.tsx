import { Linkedin, Mail } from 'lucide-react';
import { SOCIAL_LINKS } from '@/lib/constants';
import { BowTieLogo } from '@/components/ui/BowTieLogo';

export function Footer() {
  return (
    <footer className="border-t border-charcoal-100 bg-forest-500 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <BowTieLogo size={24} className="text-mint-400" />
            <p className="text-sm text-white/80">
              &copy; {new Date().getFullYear()} Dan Winter. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 transition-colors hover:text-mustard-500"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${SOCIAL_LINKS.email}`}
              className="text-white/70 transition-colors hover:text-mustard-500"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
