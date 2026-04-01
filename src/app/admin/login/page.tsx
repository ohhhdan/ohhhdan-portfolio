'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { KeyRound, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErr(data.error ?? 'Login failed');
        return;
      }
      router.push('/admin');
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-pine-100 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-pine-200 bg-white p-8 shadow-sm">
        <div className="mb-6 flex justify-center text-pine-600">
          <KeyRound size={32} />
        </div>
        <h1 className="text-center text-lg font-semibold text-pine-900">Sign in</h1>
        <p className="mt-2 text-center text-sm text-ink-muted">Edit your public site content.</p>
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="pw" className="block text-sm font-medium text-pine-800">
              Password
            </label>
            <div className="relative mt-1">
              <input
                id="pw"
                type={show ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="w-full rounded-lg border border-pine-200 py-2 pl-3 pr-10 text-sm outline-none focus:ring-2 focus:ring-pine-300"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-pine-500"
                onClick={() => setShow(!show)}
                tabIndex={-1}
              >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          {err ? <p className="text-sm text-red-600">{err}</p> : null}
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full rounded-lg bg-pine-600 py-2.5 text-sm font-medium text-white hover:bg-pine-500 disabled:opacity-50"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
