'use client';

import { useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import AdminNav from './AdminNav';

export default function AdminShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  async function logout() {
    setBusy(true);
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-pine-50">
      <header className="border-b border-pine-200 bg-white px-4 py-3">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-lg border border-pine-200 p-2 lg:hidden"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
            <Link href="/admin" className="font-semibold text-pine-900">
              Site editor
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm text-pine-600 hover:text-pine-500">
              View site
            </Link>
            <button
              type="button"
              disabled={busy}
              onClick={() => void logout()}
              className="text-sm text-pine-600 hover:text-pine-500 disabled:opacity-50"
            >
              Log out
            </button>
          </div>
        </div>
      </header>
      <div className="mx-auto flex max-w-6xl gap-8 px-4 py-8">
        <aside className={`w-56 shrink-0 lg:block ${open ? 'block' : 'hidden'}`}>
          <AdminNav />
        </aside>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
