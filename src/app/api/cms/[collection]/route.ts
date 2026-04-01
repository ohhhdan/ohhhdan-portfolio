import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { requireAdmin } from '@/lib/auth';
import { getCollection, tryWriteCollection } from '@/lib/cms/db';
import { COLLECTIONS } from '@/lib/cms/fields';

const VALID = new Set(COLLECTIONS);

type Item = { id: string; sortOrder: number } & Record<string, unknown>;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ collection: string }> }
) {
  const deny = await requireAdmin(request);
  if (deny) return deny;

  const { collection } = await params;
  if (!VALID.has(collection)) {
    return NextResponse.json({ error: 'Invalid collection' }, { status: 400 });
  }

  return NextResponse.json(getCollection<Item>(collection));
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ collection: string }> }
) {
  const deny = await requireAdmin(request);
  if (deny) return deny;

  const { collection } = await params;
  if (!VALID.has(collection)) {
    return NextResponse.json({ error: 'Invalid collection' }, { status: 400 });
  }

  const body = (await request.json()) as Omit<Item, 'id'>;
  const items = getCollection<Item>(collection);
  const maxOrder = items.reduce((max, item) => Math.max(max, item.sortOrder ?? 0), -1);

  const newItem: Item = {
    ...body,
    id: randomUUID(),
    sortOrder: typeof body.sortOrder === 'number' ? body.sortOrder : maxOrder + 1,
  };

  if (collection === 'projects') {
    if (!newItem.links || !Array.isArray(newItem.links)) {
      newItem.links = [];
    }
    if (newItem.scormPackageId === undefined) {
      newItem.scormPackageId = null;
    }
    const sid = newItem.scormPackageId;
    if (typeof sid === 'string' && sid.trim() === '') {
      newItem.scormPackageId = null;
    }
  }

  const w = tryWriteCollection(collection, [...items, newItem]);
  if (!w.ok) {
    return NextResponse.json({ error: w.error }, { status: 503 });
  }
  return NextResponse.json(newItem, { status: 201 });
}
