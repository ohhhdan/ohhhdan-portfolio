import Link from 'next/link';
import { Menu } from 'lucide-react';
import { BowTieLogo } from './BowTieLogo';

const nav = [
  { href: '#profile', label: 'Profile' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#education', label: 'Education' },
  { href: '#awards', label: 'Awards' },
  { href: '#work', label: 'Portfolio' },
  { href: '#contact', label: 'Contact' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-forest/10 bg-paper/88 backdrop-blur-md transition-shadow duration-300 supports-[backdrop-filter]:bg-paper/72">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/#top"
          className="group flex items-center gap-3 text-forest transition hover:text-pine-600"
        >
          <BowTieLogo size="sm" className="!h-10 !w-10 shadow-md" />
          <span className="font-heading text-sm font-bold uppercase tracking-[0.12em]">Dan Winter</span>
        </Link>
        <nav className="hidden flex-wrap items-center justify-end gap-x-1 sm:gap-x-2 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="link-underline-grow px-2 py-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-forest"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/admin"
            className="ml-2 rounded-full border-2 border-forest/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-forest/80 transition hover:border-mustard hover:bg-mustard/10 hover:text-forest"
          >
            Sign in
          </Link>
        </nav>
        <details className="relative md:hidden">
          <summary className="cursor-pointer list-none rounded-lg border border-forest/15 p-2 text-forest [&::-webkit-details-marker]:hidden">
            <Menu size={20} />
          </summary>
          <div className="absolute right-0 z-50 mt-2 w-52 rounded-xl border border-forest/10 bg-surface py-2 shadow-xl">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2.5 text-sm font-medium text-ink transition hover:bg-paper hover:text-forest"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/admin"
              className="block border-t border-forest/5 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-forest/80"
            >
              Sign in
            </Link>
          </div>
        </details>
      </div>
    </header>
  );
}
