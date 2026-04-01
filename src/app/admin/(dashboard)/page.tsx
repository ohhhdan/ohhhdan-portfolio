import Link from 'next/link';
import { COLLECTION_LABELS } from '@/lib/cms/fields';

export default function AdminHomePage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-pine-900">Your site</h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">
        Pick a section in the sidebar (or below on small screens), then edit or use <strong>Add</strong> for new
        portfolio pieces—like posts in WordPress. Always click <strong>Save</strong> when you finish a form.
      </p>
      <div className="mt-4 max-w-2xl rounded-lg border border-amber-200/80 bg-amber-50/90 px-4 py-3 text-sm text-amber-950">
        <p className="font-medium">Saving changes</p>
        <p className="mt-1 text-amber-900/90">
          Content is stored as JSON files under the <code className="rounded bg-amber-100/80 px-1">data/</code>{' '}
          folder. Editing works when the app can write to disk (typical on your own machine). Many serverless hosts
          are read-only—if saves fail, run locally or deploy to a host with persistent storage.
        </p>
      </div>
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
