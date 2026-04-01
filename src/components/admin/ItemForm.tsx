'use client';

import { useState } from 'react';
import type { FieldDef } from '@/lib/cms/fields';
import StringArrayInput from './StringArrayInput';

type Item = Record<string, unknown>;

interface ItemFormProps {
  collection: string;
  fields: FieldDef[];
  initial: Item | null;
  onSave: (data: Record<string, unknown>) => Promise<void>;
  onCancel: () => void;
}

export default function ItemForm({ collection, fields, initial, onSave, onCancel }: ItemFormProps) {
  const [data, setData] = useState<Item>(() => {
    if (!initial) {
      const empty: Item = { sortOrder: 0 };
      if (collection === 'projects') {
        empty.links = [];
        empty._linksJson = '[]';
        empty.scormPackageId = '';
        empty.slug = '';
        empty.title = '';
        empty.client = '';
        empty.summary = '';
        empty.body = '';
        empty.technologies = [];
      } else if (collection === 'skills') {
        empty.skills = [];
      } else if (collection === 'experience') {
        empty.highlights = [];
      }
      return empty;
    }
    const base = { ...initial };
    if (collection === 'projects') {
      if (!base.links) base.links = [];
      base._linksJson = JSON.stringify(base.links ?? [], null, 2);
      if (base.scormPackageId == null) base.scormPackageId = '';
    }
    return base;
  });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr('');
    setSaving(true);
    try {
      const out = { ...data };
      if (collection === 'projects') {
        delete out._linksJson;
        try {
          out.links = JSON.parse(String(data._linksJson ?? '[]'));
        } catch {
          setErr('Links must be a valid list in the expected format (label, href, and optional kind per item).');
          setSaving(false);
          return;
        }
        const sid = String(out.scormPackageId ?? '').trim();
        out.scormPackageId = sid === '' ? null : sid;
      }
      await onSave(out);
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  function setField(key: string, value: unknown) {
    setData((d) => ({ ...d, [key]: value }));
  }

  return (
    <form onSubmit={submit} className="space-y-4 rounded-xl border border-pine-200 bg-white p-6 shadow-sm">
      {fields.map((field) => {
        if (field.type === 'text') {
          return (
            <div key={field.key}>
              <label className="block text-sm font-medium text-pine-800">{field.label}</label>
              <input
                type="text"
                required={field.required}
                value={String(data[field.key] ?? '')}
                onChange={(e) => setField(field.key, e.target.value)}
                placeholder={field.placeholder}
                className="mt-1 w-full rounded-lg border border-pine-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-pine-300"
              />
            </div>
          );
        }
        if (field.type === 'textarea') {
          return (
            <div key={field.key}>
              <label className="block text-sm font-medium text-pine-800">{field.label}</label>
              <textarea
                value={String(data[field.key] ?? '')}
                onChange={(e) => setField(field.key, e.target.value)}
                placeholder={field.placeholder}
                rows={field.key === 'body' || field.key === 'description' ? 6 : 3}
                className="mt-1 w-full rounded-lg border border-pine-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-pine-300"
              />
            </div>
          );
        }
        if (field.type === 'string-array') {
          return (
            <StringArrayInput
              key={field.key}
              label={field.label}
              values={(data[field.key] as string[]) ?? []}
              onChange={(v) => setField(field.key, v)}
              placeholder={field.placeholder}
            />
          );
        }
        return null;
      })}

      {collection === 'projects' ? (
        <div>
          <label className="block text-sm font-medium text-pine-800">Links</label>
          <p className="mt-0.5 text-xs text-ink-muted">
            Structured list: each item has a label, a URL, and optionally a kind (external, video, or articulate).
          </p>
          <textarea
            value={String(data._linksJson ?? '[]')}
            onChange={(e) => setField('_linksJson', e.target.value)}
            rows={8}
            className="mt-1 w-full rounded-lg border border-pine-200 px-3 py-2 font-mono text-xs outline-none focus:ring-2 focus:ring-pine-300"
          />
        </div>
      ) : null}

      {err ? <p className="text-sm text-red-600">{err}</p> : null}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-pine-600 px-4 py-2 text-sm font-medium text-white hover:bg-pine-500 disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save'}
        </button>
        <button type="button" onClick={onCancel} className="rounded-lg border border-pine-200 px-4 py-2 text-sm text-pine-800">
          Cancel
        </button>
      </div>
    </form>
  );
}
