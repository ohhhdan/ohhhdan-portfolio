'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';
import { MobileNav } from './MobileNav';

export function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-navy-900/80 backdrop-blur border-b border-navy-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <a href="#home" className="text-xl font-bold text-navy-100">
              Dan Winter
            </a>

            <nav className="hidden md:flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-navy-300 transition-colors hover:text-accent-500"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <button
              type="button"
              className="md:hidden p-2 text-navy-300 hover:text-navy-100 transition-colors"
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
