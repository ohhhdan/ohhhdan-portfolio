'use client';

import { X } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-xl transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-charcoal-100 px-4 py-4">
          <span className="text-lg font-bold text-charcoal-800">Menu</span>
          <button
            type="button"
            className="p-2 text-charcoal-400 hover:text-charcoal-800 transition-colors"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex flex-col gap-1 p-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="rounded-lg px-4 py-3 text-sm font-medium text-charcoal-500 transition-colors hover:bg-cream hover:text-forest-500"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
