'use client';

import { useCallback, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import {
  COLLECTION_FIELDS,
  COLLECTION_LABELS,
  COLLECTIONS,
  getItemLabel,
} from '@/lib/cms/fields';
import ItemForm from '@/components/admin/ItemForm';

type Item = Record<string, unknown> & { id: string };

export default function CollectionAdminPage() {
  const params = useParams();
  const router = useRouter();
  const collection = params.collection as string;
  const label = COLLECTION_LABELS[collection] ?? collection;
  const fields = COLLECTION_FIELDS[collection] ?? [];

  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Item | null | 'new'>(null);
  const [err, setErr] = useState('');

  const load = useCallback(() => {
    if (!COLLECTIONS.includes(collection)) {
      setErr('Unknown collection');
      setLoading(false);
      return;
    }
    fetch(`/api/cms/${collection}`, { credentials: 'include' })
      .then((r) => r.json())
      .then((data: Item[]) => setItems(Array.isArray(data) ? data : []))
      .catch(() => setErr('Failed to load'))
      .finally(() => setLoading(false));
  }, [collection]);

  useEffect(() => {
    load();
  }, [load]);

  async function remove(id: string) {
    if (!confirm('Delete this item?')) return;
    const res = await fetch(`/api/cms/${collection}/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (res.ok) load();
  }

  async function save(data: Record<string, unknown>) {
    if (editing === 'new') {
      const res = await fetch(`/api/cms/${collection}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Create failed');
    } else if (editing && typeof editing === 'object') {
      const res = await fetch(`/api/cms/${collection}/${editing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Update failed');
    }
    setEditing(null);
    load();
    router.refresh();
  }

  if (!COLLECTIONS.includes(collection)) {
    return <p className="text-red-600">Invalid collection.</p>;
  }

  if (editing) {
    return (
      <div>
        <button
          type="button"
          onClick={() => setEditing(null)}
          className="mb-4 text-sm text-pine-600 hover:text-pine-500"
        >
          ← Back to list
        </button>
        <h1 className="mb-6 text-xl font-semibold text-pine-900">
          {editing === 'new' ? `New ${label}` : `Edit ${label}`}
        </h1>
        <ItemForm
          collection={collection}
          fields={fields}
          initial={editing === 'new' ? null : editing}
          onSave={save}
          onCancel={() => setEditing(null)}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-xl font-semibold text-pine-900">{label}</h1>
        <button
          type="button"
          onClick={() => setEditing('new')}
          className="inline-flex items-center gap-2 rounded-lg bg-pine-600 px-4 py-2 text-sm font-medium text-white hover:bg-pine-500"
        >
          <Plus size={18} /> Add
        </button>
      </div>
      {err ? <p className="text-sm text-red-600">{err}</p> : null}
      {loading ? (
        <p className="text-sm text-ink-muted">Loading…</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between rounded-lg border border-pine-200 bg-white px-4 py-3 shadow-sm"
            >
              <span className="text-sm font-medium text-pine-900">{getItemLabel(collection, item)}</span>
              <div className="flex gap-2">
                {collection === 'projects' && typeof item.slug === 'string' ? (
                  <Link
                    href={`/work/${item.slug}`}
                    className="rounded-lg border border-pine-200 px-2 py-1 text-xs text-pine-700 hover:bg-pine-50"
                    target="_blank"
                  >
                    View
                  </Link>
                ) : null}
                <button
                  type="button"
                  onClick={() => setEditing(item)}
                  className="rounded-lg border border-pine-200 p-2 text-pine-700 hover:bg-pine-50"
                  aria-label="Edit"
                >
                  <Pencil size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => void remove(item.id)}
                  className="rounded-lg border border-pine-200 p-2 text-red-600 hover:bg-red-50"
                  aria-label="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
