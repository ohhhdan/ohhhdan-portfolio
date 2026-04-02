'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { KeyRound, Eye, EyeOff } from 'lucide-react';

type LoginFailPayload = {
  error?: string;
  issues?: string[];
  steps?: string[];
  hint?: string;
};

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [err, setErr] = useState('');
  const [setup, setSetup] = useState<{ issues: string[]; steps: string[] } | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr('');
    setSetup(null);
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ password }),
      });
      const data = (await res.json().catch(() => ({}))) as LoginFailPayload;
      if (!res.ok) {
        if (res.status === 503 && Array.isArray(data.steps) && data.steps.length > 0) {
          setErr(data.error ?? 'Configuration needed');
          setSetup({
            issues: Array.isArray(data.issues) ? data.issues : [],
            steps: data.steps,
          });
          return;
        }
        if (res.status === 401 && typeof data.hint === 'string') {
          setErr(data.error ?? 'Login failed');
          setSetup({ issues: [], steps: [data.hint] });
          return;
        }
        const hint = typeof data.hint === 'string' ? ` ${data.hint}` : '';
        setErr((data.error ?? 'Login failed') + hint);
        return;
      }
      router.push('/admin');
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-pine-100 px-4 py-10">
      <div className="w-full max-w-lg rounded-2xl border border-pine-200 bg-white p-8 shadow-sm">
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
            <p className="mt-1.5 text-xs leading-relaxed text-ink-muted">
              Run <code className="rounded bg-pine-100 px-1 py-0.5 text-[0.7rem]">npm run setup-admin</code>, restart{' '}
              <code className="text-[0.7rem]">npm run dev</code>, then use the password it printed. Do not type{' '}
              <code className="text-[0.7rem]">CMS_SECRET</code> or the <code className="text-[0.7rem]">$2a$…</code> hash.
            </p>
            <div className="relative mt-2">
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
          {err ? <p className="text-sm font-medium text-red-700">{err}</p> : null}
          {setup ? (
            <div className="rounded-xl border border-amber-200 bg-amber-50/90 px-4 py-3 text-sm text-amber-950">
              {setup.issues.length > 0 ? (
                <>
                  <p className="font-semibold text-amber-950">What’s wrong</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-amber-900">
                    {setup.issues.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </>
              ) : null}
              <p className={setup.issues.length > 0 ? 'mt-4 font-semibold' : 'font-semibold'}>
                {setup.steps.length === 1 && setup.issues.length === 0 ? 'What to do' : 'How to fix it'}
              </p>
              {setup.steps.length === 1 && setup.issues.length === 0 ? (
                <p className="mt-2 leading-relaxed text-amber-900">{setup.steps[0]}</p>
              ) : (
                <ol className="mt-2 list-decimal space-y-2 pl-5 text-amber-900">
                  {setup.steps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              )}
            </div>
          ) : null}
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
