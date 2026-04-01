import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-paper px-6 text-center">
      <h1 className="font-heading mb-2 text-5xl font-bold uppercase tracking-wide text-forest">404</h1>
      <p className="mb-8 text-ink-muted">This page doesn&apos;t exist.</p>
      <Link
        href="/"
        className="rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white transition hover:bg-pine-600"
      >
        Home
      </Link>
    </div>
  );
}
