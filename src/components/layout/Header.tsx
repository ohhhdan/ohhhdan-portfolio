'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';
import { MobileNav } from './MobileNav';
import { BowTieLogo } from '@/components/ui/BowTieLogo';

export function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-charcoal-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <a href="#home" className="flex items-center gap-1.5 text-xl font-bold text-charcoal-800">
              <span>Dan</span>
              <BowTieLogo size={28} className="text-mint-400" />
              <span>Winter</span>
            </a>

            <nav className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-charcoal-500 transition-colors hover:text-forest-500"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <button
              type="button"
              className="md:hidden p-2 text-charcoal-500 hover:text-charcoal-800 transition-colors"
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <MobileNav open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
    </>
  );
}
