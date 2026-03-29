'use client';

import { useState, FormEvent, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { setToken } from '@/components/admin/AdminShell';
import { KeyRound, Eye, EyeOff } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [token, setTokenInput] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!token.trim()) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/profile', {
        headers: { Authorization: `Bearer ${token.trim()}` },
      });
      if (res.ok) {
        setToken(token.trim());
        const from = params.get('from') ?? '/admin/profile';
        router.push(from);
      } else {
        setError('Invalid token. Please try again.');
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-forest-800">
            <KeyRound size={22} className="text-mint-400" />
          </div>
          <h1 className="text-xl font-semibold text-charcoal-800">Admin Access</h1>
          <p className="mt-1 text-sm text-charcoal-500">Enter your admin token to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-xl border border-charcoal-100 bg-white p-6 shadow-sm">
          <div className="mb-4">
            <label className="mb-1.5 block text-sm font-medium text-charcoal-700">
              Admin Token
            </label>
            <div className="relative">
              <input
                type={show ? 'text' : 'password'}
                value={token}
                onChange={(e) => setTokenInput(e.target.value)}
                placeholder="Paste your token"
                autoFocus
                className="w-full rounded-lg border border-charcoal-200 bg-white py-2 pl-3 pr-10 text-sm text-charcoal-800 placeholder:text-charcoal-400 focus:border-forest-400 focus:outline-none focus:ring-2 focus:ring-forest-100"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-charcoal-600"
              >
                {show ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <p className="mb-4 rounded-lg bg-crimson/10 px-3 py-2 text-sm text-crimson">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !token.trim()}
            className="w-full rounded-lg bg-forest-500 py-2.5 text-sm font-medium text-white transition-colors hover:bg-forest-600 active:bg-forest-700 disabled:pointer-events-none disabled:opacity-50"
          >
            {loading ? 'Verifying…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
