import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { getCollection, writeCollection } from '@/lib/cms/db';
import { COLLECTIONS } from '@/lib/cms/fields';

const VALID = new Set(COLLECTIONS);
type Item = { id: string; sortOrder: number } & Record<string, unknown>;

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ collection: string; id: string }> }
) {
  const deny = await requireAdmin(request);
  if (deny) return deny;

  const { collection, id } = await params;
  if (!VALID.has(collection)) {
    return NextResponse.json({ error: 'Invalid collection' }, { status: 400 });
  }

  const items = getCollection<Item>(collection);
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) {
    return NextResponse.json({ error: 'Item not found' }, { status: 404 });
  }

  const body = (await request.json()) as Partial<Item>;
  const updated: Item = {
    ...items[index],
    ...body,
    id,
  };

  if (collection === 'projects') {
    if (!Array.isArray(updated.links)) {
      updated.links = (items[index].links as unknown[]) ?? [];
    }
    const sid = updated.scormPackageId;
    if (typeof sid === 'string' && sid.trim() === '') {
      updated.scormPackageId = null;
    }
  }

  items[index] = updated;
  writeCollection(collection, items);
  return NextResponse.json(updated);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ collection: string; id: string }> }
) {
  const deny = await requireAdmin(request);
  if (deny) return deny;

  const { collection, id } = await params;
  if (!VALID.has(collection)) {
    return NextResponse.json({ error: 'Invalid collection' }, { status: 400 });
  }

  const items = getCollection<Item>(collection);
  const filtered = items.filter((item) => item.id !== id);
  if (filtered.length === items.length) {
    return NextResponse.json({ error: 'Item not found' }, { status: 404 });
  }

  writeCollection(collection, filtered);
  return new Response(null, { status: 204 });
}
