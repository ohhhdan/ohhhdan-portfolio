'use client';

import { useEffect, useState } from 'react';
import { getToken } from '@/components/admin/AdminShell';
import type { Profile } from '@/lib/data/types';
import { Save, CheckCircle } from 'lucide-react';

const inputClass =
  'w-full rounded-lg border border-charcoal-200 bg-white px-3 py-2 text-sm text-charcoal-800 placeholder:text-charcoal-400 focus:border-forest-400 focus:outline-none focus:ring-2 focus:ring-forest-100';

export default function ProfilePage() {
  const [form, setForm] = useState<Profile>({
    name: '',
    tagline: '',
    headline: '',
    summary: '',
    location: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/profile', {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then((r) => r.json())
      .then((data: Profile) => setForm(data))
      .catch(() => setError('Failed to load profile.'))
      .finally(() => setLoading(false));
  }, []);

  function set(key: keyof Profile, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    setError('');
    try {
      const res = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Save failed');
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch {
      setError('Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <PageSkeleton />;
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-charcoal-800">Profile</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-forest-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-forest-600 active:bg-forest-700 disabled:opacity-50"
        >
          {saved ? (
            <>
              <CheckCircle size={15} />
              Saved
            </>
          ) : (
            <>
              <Save size={15} />
              {saving ? 'Saving…' : 'Save'}
            </>
          )}
        </button>
      </div>

      {error && (
        <p className="mb-4 rounded-lg bg-crimson/10 px-3 py-2 text-sm text-crimson">{error}</p>
      )}

      <div className="rounded-xl border border-charcoal-100 bg-white p-6 shadow-sm">
        <div className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-charcoal-700">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-charcoal-700">Headline</label>
            <input
              type="text"
              value={form.headline}
              onChange={(e) => set('headline', e.target.value)}
              placeholder="Staff Learning Experience Designer"
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-charcoal-700">Tagline</label>
            <input
              type="text"
              value={form.tagline}
              onChange={(e) => set('tagline', e.target.value)}
              placeholder="Short punchy tagline"
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-charcoal-700">Location</label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => set('location', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-charcoal-700">Summary</label>
            <textarea
              rows={5}
              value={form.summary}
              onChange={(e) => set('summary', e.target.value)}
              className={`${inputClass} resize-y`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function PageSkeleton() {
  return (
    <div className="mx-auto max-w-2xl animate-pulse space-y-4">
      <div className="h-8 w-32 rounded-lg bg-charcoal-100" />
      <div className="rounded-xl border border-charcoal-100 bg-white p-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="mb-4 space-y-1.5">
            <div className="h-4 w-20 rounded bg-charcoal-100" />
            <div className="h-9 w-full rounded-lg bg-charcoal-100" />
          </div>
        ))}
      </div>
    </div>
  );
}
