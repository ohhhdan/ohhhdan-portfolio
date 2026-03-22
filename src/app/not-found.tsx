import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="mb-4 text-6xl font-bold text-white">404</h1>
      <p className="mb-8 text-lg text-navy-300">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-accent-500 px-6 py-3 font-semibold text-white transition hover:bg-accent-600"
      >
        Go Home
      </Link>
    </div>
  );
}
