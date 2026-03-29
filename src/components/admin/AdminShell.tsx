'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import AdminNav from './AdminNav';
import { Menu, X } from 'lucide-react';

export const TOKEN_KEY = 'admin_token';

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  sessionStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  sessionStorage.removeItem(TOKEN_KEY);
}

interface AdminShellProps {
  children: React.ReactNode;
}

export default function AdminShell({ children }: AdminShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token && pathname !== '/admin/login') {
      router.replace('/admin/login');
    } else {
      setReady(true);
    }
  }, [pathname, router]);

  function handleLogout() {
    clearToken();
    router.push('/admin/login');
  }

  // Login page renders without the shell chrome
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-forest-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-charcoal-50">
      {/* Sidebar — desktop */}
      <aside className="hidden w-56 shrink-0 bg-forest-800 lg:block">
        <div className="sticky top-0 h-screen overflow-y-auto px-3 py-4">
          <AdminNav onLogout={handleLogout} />
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-56 bg-forest-800 transition-transform lg:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col px-3 py-4">
          <button
            onClick={() => setSidebarOpen(false)}
            className="mb-2 self-end rounded-lg p-1 text-forest-200 hover:text-white"
          >
            <X size={20} />
          </button>
          <AdminNav onLogout={handleLogout} />
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile topbar */}
        <header className="flex items-center gap-3 border-b border-charcoal-200 bg-white px-4 py-3 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-1.5 text-charcoal-600 hover:bg-charcoal-100"
          >
            <Menu size={20} />
          </button>
          <span className="text-sm font-semibold text-charcoal-800">Admin</span>
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
