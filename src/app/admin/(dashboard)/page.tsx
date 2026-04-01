import Link from 'next/link';
import { COLLECTION_LABELS } from '@/lib/cms/fields';

export default function AdminHomePage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-pine-900">Your site</h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">
        Update your profile, portfolio, and other sections here. Changes appear on the public site after you save.
      </p>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        <li>
          <Link
            href="/admin/profile"
            className="block rounded-xl border border-pine-200 bg-white p-4 text-pine-800 shadow-sm transition hover:border-pine-400"
          >
            <span className="font-medium">Profile</span>
            <p className="mt-1 text-xs text-ink-muted">Name, headline, bio, email</p>
          </Link>
        </li>
        {Object.entries(COLLECTION_LABELS).map(([key, label]) => (
          <li key={key}>
            <Link
              href={`/admin/${key}`}
              className="block rounded-xl border border-pine-200 bg-white p-4 text-pine-800 shadow-sm transition hover:border-pine-400"
            >
              <span className="font-medium">{label}</span>
              <p className="mt-1 text-xs text-ink-muted">Add or edit entries</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
