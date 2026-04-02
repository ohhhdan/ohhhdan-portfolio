'use client';

import { useEffect, useState } from 'react';
import type { Profile } from '@/lib/cms/types';
import { Save, CheckCircle } from 'lucide-react';
import StringArrayInput from '@/components/admin/StringArrayInput';
import { cmsErrorFromResponse } from '@/lib/admin/fetch-cms';

const inputClass =
  'w-full rounded-lg border border-pine-200 bg-white px-3 py-2 text-sm text-ink outline-none focus:ring-2 focus:ring-pine-300';

export default function ProfilePage() {
  const [form, setForm] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    void (async () => {
      setError('');
      try {
        const res = await fetch('/api/cms/profile', { credentials: 'include' });
        if (!res.ok) {
          setError(await cmsErrorFromResponse(res, 'Failed to load profile'));
          setLoading(false);
          return;
        }
        const data = (await res.json()) as Profile;
        setForm({
          ...data,
          bioParagraphs: data.bioParagraphs ?? [],
        });
      } catch {
        setError('Could not reach the server.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  function set<K extends keyof Profile>(key: K, value: Profile[K]) {
    if (!form) return;
    setForm({ ...form, [key]: value });
    setSaved(false);
  }

  async function handleSave() {
    if (!form) return;
    setSaving(true);
    setError('');
    try {
      const res = await fetch('/api/cms/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(await cmsErrorFromResponse(res, 'Save failed'));
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to save.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="text-sm text-ink-muted">Loading…</p>;
  }

  if (!form) {
    return (
      <p className="text-sm text-red-700">
        {error || 'Something went wrong.'}{' '}
        <button type="button" className="underline" onClick={() => window.location.reload()}>
          Reload
        </button>
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-pine-900">Profile</h1>
        <button
          type="button"
          onClick={() => void handleSave()}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-pine-600 px-4 py-2 text-sm font-medium text-white hover:bg-pine-500 disabled:opacity-50"
        >
          {saved ? (
            <>
              <CheckCircle size={15} /> Saved
            </>
          ) : (
            <>
              <Save size={15} /> {saving ? 'Saving…' : 'Save'}
            </>
          )}
        </button>
      </div>

      {error ? (
        <p className="mb-4 whitespace-pre-line rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      ) : null}

      <div className="space-y-4 rounded-xl border border-pine-200 bg-white p-6 shadow-sm">
        {(
          [
            ['name', 'Name'],
            ['headline', 'Headline'],
            ['tagline', 'Tagline'],
            ['rolesLine', 'Roles line (hero)'],
            ['email', 'Email'],
            ['location', 'Location'],
          ] as const
        ).map(([key, label]) => (
          <div key={key}>
            <label className="mb-1.5 block text-sm font-medium text-pine-800">{label}</label>
            <input
              type="text"
              value={String(form[key] ?? '')}
              onChange={(e) => set(key, e.target.value)}
              className={inputClass}
            />
          </div>
        ))}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-pine-800">Summary (hero)</label>
          <textarea
            value={form.summary}
            onChange={(e) => set('summary', e.target.value)}
            rows={3}
            className={inputClass}
          />
        </div>
        <StringArrayInput
          label="Bio paragraphs (profile section)"
          values={form.bioParagraphs}
          onChange={(v) => set('bioParagraphs', v)}
        />
      </div>
    </div>
  );
}
