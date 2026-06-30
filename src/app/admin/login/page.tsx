'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { KeyRound, Eye, EyeOff, Wand2, Copy, Check } from 'lucide-react';

type LoginFailPayload = {
  error?: string;
  issues?: string[];
  steps?: string[];
  hint?: string;
};

const IS_DEV = process.env.NODE_ENV === 'development';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [err, setErr] = useState('');
  const [setup, setSetup] = useState<{ issues: string[]; steps: string[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [bootstrapLoading, setBootstrapLoading] = useState(false);
  const [bootstrapPassword, setBootstrapPassword] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [customPassword, setCustomPassword] = useState('');

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

  async function runBootstrap(useCustom: boolean) {
    setErr('');
    setSetup(null);
    setBootstrapLoading(true);
    setCopied(false);
    try {
      const res = await fetch('/api/auth/bootstrap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          useCustom && customPassword.trim() ? { password: customPassword.trim() } : {},
        ),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        password?: string;
        message?: string;
      };
      if (!res.ok) {
        setErr(data.error ?? 'Setup failed');
        return;
      }
      const pw = data.password ?? '';
      setBootstrapPassword(pw);
      setPassword(pw);
      setSetup({
        issues: [],
        steps: [
          data.message ?? 'Env updated.',
          'Stop the dev server (Ctrl+C), run npm run dev again, then click Sign in.',
        ],
      });
    } finally {
      setBootstrapLoading(false);
    }
  }

  async function copyPassword() {
    if (!bootstrapPassword) return;
    await navigator.clipboard.writeText(bootstrapPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-pine-100 px-4 py-10">
      <div className="w-full max-w-lg rounded-2xl border border-pine-200 bg-white p-8 shadow-sm">
        <div className="mb-6 flex justify-center text-pine-600">
          <KeyRound size={32} />
        </div>
        <h1 className="text-center text-lg font-semibold text-pine-900">Sign in</h1>
        <p className="mt-2 text-center text-sm text-ink-muted">Edit your public site content.</p>

        {IS_DEV ? (
          <div className="mt-6 rounded-xl border border-teal/30 bg-teal/5 px-4 py-4">
            <p className="text-sm font-semibold text-pine-900">Quick local setup</p>
            <p className="mt-1 text-xs leading-relaxed text-ink-muted">
              Writes a simple password to <code className="rounded bg-white px-1">.env</code>. No bcrypt
              copy-paste. Restart <code className="rounded bg-white px-1">npm run dev</code> after setup,
              then sign in.
            </p>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <input
                type="text"
                value={customPassword}
                onChange={(e) => setCustomPassword(e.target.value)}
                placeholder="Optional: pick your own password"
                className="min-w-0 flex-1 rounded-lg border border-pine-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-pine-300"
              />
              <button
                type="button"
                disabled={bootstrapLoading}
                onClick={() => void runBootstrap(true)}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-teal-700 px-4 py-2 text-sm font-medium text-white hover:bg-teal-600 disabled:opacity-50"
              >
                <Wand2 size={16} />
                {bootstrapLoading ? 'Setting up…' : 'Set up admin'}
              </button>
            </div>
            {bootstrapPassword ? (
              <div className="mt-3 flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm">
                <span className="text-ink-muted">Password:</span>
                <code className="flex-1 truncate font-mono text-pine-900">{bootstrapPassword}</code>
                <button
                  type="button"
                  onClick={() => void copyPassword()}
                  className="text-pine-600 hover:text-pine-800"
                  aria-label="Copy password"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
            ) : null}
          </div>
        ) : null}

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="pw" className="block text-sm font-medium text-pine-800">
              Password
            </label>
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
                  <p className="font-semibold text-amber-950">What&apos;s wrong</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-amber-900">
                    {setup.issues.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </>
              ) : null}
              <p className={setup.issues.length > 0 ? 'mt-4 font-semibold' : 'font-semibold'}>Next steps</p>
              <ol className="mt-2 list-decimal space-y-2 pl-5 text-amber-900">
                {setup.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
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

        <p className="mt-6 text-center text-xs leading-relaxed text-ink-muted">
          Prefer editing files directly? Change copy in the{' '}
          <code className="rounded bg-pine-50 px-1">data/</code> folder (profile.json, experience.json,
          projects.json) and refresh the site.
        </p>
      </div>
    </div>
  );
}
