'use client';

import { useEffect, useState, use } from 'react';
import { notFound } from 'next/navigation';
import { getToken } from '@/components/admin/AdminShell';
import ItemForm from '@/components/admin/ItemForm';
import { COLLECTION_FIELDS, COLLECTION_LABELS, COLLECTIONS, getItemLabel, type FieldDef } from '@/lib/admin/fields';
import {
  Plus,
  Pencil,
  Trash2,
  ChevronUp,
  ChevronDown,
  X,
  Save,
  CheckCircle,
} from 'lucide-react';

type Item = { id: string; sortOrder: number } & Record<string, unknown>;

interface PageProps {
  params: Promise<{ collection: string }>;
}

function emptyItem(fields: FieldDef[]): Record<string, unknown> {
  const obj: Record<string, unknown> = {};
  for (const f of fields) {
    obj[f.key] = f.type === 'string-array' ? [] : '';
  }
  return obj;
}

export default function CollectionPage({ params }: PageProps) {
  const { collection } = use(params);

  if (!COLLECTIONS.includes(collection)) notFound();

  const fields = COLLECTION_FIELDS[collection];
  const label = COLLECTION_LABELS[collection];

  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Form panel state
  const [editingId, setEditingId] = useState<string | null>(null); // null = new
  const [formOpen, setFormOpen] = useState(false);
  const [formValues, setFormValues] = useState<Record<string, unknown>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [formError, setFormError] = useState('');

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const token = getToken();

  async function fetchItems() {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/${collection}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json() as Item[];
      setItems(data);
    } catch {
      setError('Failed to load data.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchItems();
    // Reset form when collection changes
    setFormOpen(false);
    setEditingId(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collection]);

  function openNew() {
    setEditingId(null);
    setFormValues(emptyItem(fields));
    setFormError('');
    setSaved(false);
    setFormOpen(true);
  }

  function openEdit(item: Item) {
    setEditingId(item.id);
    setFormValues({ ...item });
    setFormError('');
    setSaved(false);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditingId(null);
  }

  async function handleSave() {
    setSaving(true);
    setFormError('');
    try {
      const url = editingId
        ? `/api/admin/${collection}/${editingId}`
        : `/api/admin/${collection}`;
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formValues),
      });
      if (!res.ok) throw new Error('Save failed');
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      await fetchItems();
      if (!editingId) closeForm(); // close after create, stay open on edit
    } catch {
      setFormError('Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      await fetch(`/api/admin/${collection}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (editingId === id) closeForm();
      await fetchItems();
    } catch {
      setError('Delete failed.');
    } finally {
      setDeletingId(null);
    }
  }

  async function handleReorder(id: string, direction: 'up' | 'down') {
    const idx = items.findIndex((i) => i.id === id);
    if (direction === 'up' && idx === 0) return;
    if (direction === 'down' && idx === items.length - 1) return;

    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    const a = items[idx];
    const b = items[swapIdx];

    // Swap sortOrders
    const [aOrder, bOrder] = [a.sortOrder, b.sortOrder];
    await Promise.all([
      fetch(`/api/admin/${collection}/${a.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ sortOrder: bOrder }),
      }),
      fetch(`/api/admin/${collection}/${b.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ sortOrder: aOrder }),
      }),
    ]);
    await fetchItems();
  }

  if (loading) return <ListSkeleton label={label} />;

  return (
    <div className="mx-auto max-w-3xl">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-charcoal-800">{label}</h1>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 rounded-lg bg-forest-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-forest-600"
        >
          <Plus size={15} />
          Add {label.replace(/s$/, '')}
        </button>
      </div>

      {error && (
        <p className="mb-4 rounded-lg bg-crimson/10 px-3 py-2 text-sm text-crimson">{error}</p>
      )}

      {/* Form panel */}
      {formOpen && (
        <div className="mb-6 rounded-xl border border-forest-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold text-charcoal-800">
              {editingId ? 'Edit' : 'New'} {label.replace(/s$/, '')}
            </h2>
            <button onClick={closeForm} className="text-charcoal-400 hover:text-charcoal-600">
              <X size={18} />
            </button>
          </div>

          <ItemForm fields={fields} values={formValues} onChange={setFormValues} />

          {formError && (
            <p className="mt-3 rounded-lg bg-crimson/10 px-3 py-2 text-sm text-crimson">
              {formError}
            </p>
          )}

          <div className="mt-5 flex justify-end gap-2">
            <button
              onClick={closeForm}
              className="rounded-lg border border-charcoal-200 px-4 py-2 text-sm font-medium text-charcoal-600 transition-colors hover:bg-charcoal-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg bg-forest-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-forest-600 disabled:opacity-50"
            >
              {saved ? (
                <>
                  <CheckCircle size={14} />
                  Saved
                </>
              ) : (
                <>
                  <Save size={14} />
                  {saving ? 'Saving…' : 'Save'}
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Items list */}
      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-charcoal-200 bg-white p-12 text-center">
          <p className="text-sm text-charcoal-500">No {label.toLowerCase()} yet.</p>
          <button
            onClick={openNew}
            className="mt-3 text-sm font-medium text-forest-500 hover:text-forest-700"
          >
            Add the first one
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className={`flex items-center gap-3 rounded-xl border bg-white px-4 py-3 shadow-sm transition-colors ${
                editingId === item.id
                  ? 'border-forest-300 ring-1 ring-forest-200'
                  : 'border-charcoal-100 hover:border-charcoal-200'
              }`}
            >
              {/* Reorder */}
              <div className="flex flex-col">
                <button
                  onClick={() => handleReorder(item.id, 'up')}
                  disabled={idx === 0}
                  className="text-charcoal-300 transition-colors hover:text-charcoal-600 disabled:opacity-20"
                >
                  <ChevronUp size={16} />
                </button>
                <button
                  onClick={() => handleReorder(item.id, 'down')}
                  disabled={idx === items.length - 1}
                  className="text-charcoal-300 transition-colors hover:text-charcoal-600 disabled:opacity-20"
                >
                  <ChevronDown size={16} />
                </button>
              </div>

              {/* Label */}
              <span className="flex-1 truncate text-sm font-medium text-charcoal-800">
                {getItemLabel(collection, item)}
              </span>

              {/* Actions */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => openEdit(item)}
                  className="rounded-lg p-1.5 text-charcoal-400 transition-colors hover:bg-charcoal-100 hover:text-charcoal-700"
                  title="Edit"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  disabled={deletingId === item.id}
                  className="rounded-lg p-1.5 text-charcoal-400 transition-colors hover:bg-crimson/10 hover:text-crimson disabled:opacity-50"
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ListSkeleton({ label }: { label: string }) {
  return (
    <div className="mx-auto max-w-3xl animate-pulse">
      <div className="mb-6 flex items-center justify-between">
        <div className="h-7 w-32 rounded-lg bg-charcoal-100" />
        <div className="h-9 w-28 rounded-lg bg-charcoal-100" />
      </div>
      <div className="space-y-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-14 w-full rounded-xl bg-charcoal-100" />
        ))}
      </div>
      <p className="sr-only">Loading {label}…</p>
    </div>
  );
}
