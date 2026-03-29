import { NextRequest, NextResponse } from 'next/server';
import { isAuthorized, UNAUTHORIZED } from '@/lib/admin/auth';
import { getCollection, writeCollection } from '@/lib/data/db';

const VALID_COLLECTIONS = new Set([
  'experience',
  'projects',
  'education',
  'credentials',
  'awards',
  'engagements',
  'skills',
]);

type CollectionItem = { id: string; sortOrder: number } & Record<string, unknown>;

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ collection: string; id: string }> }
) {
  if (!isAuthorized(request)) return UNAUTHORIZED;

  const { collection, id } = await params;
  if (!VALID_COLLECTIONS.has(collection)) {
    return NextResponse.json({ error: 'Invalid collection' }, { status: 400 });
  }

  const items = getCollection<CollectionItem>(collection);
  const index = items.findIndex((item) => item.id === id);
  if (index === -1) {
    return NextResponse.json({ error: 'Item not found' }, { status: 404 });
  }

  const body = await request.json() as Partial<CollectionItem>;
  const updated: CollectionItem = {
    ...items[index],
    ...body,
    id,  // never allow id override
  };

  items[index] = updated;
  writeCollection(collection, items);
  return NextResponse.json(updated);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ collection: string; id: string }> }
) {
  if (!isAuthorized(request)) return UNAUTHORIZED;

  const { collection, id } = await params;
  if (!VALID_COLLECTIONS.has(collection)) {
    return NextResponse.json({ error: 'Invalid collection' }, { status: 400 });
  }

  const items = getCollection<CollectionItem>(collection);
  const filtered = items.filter((item) => item.id !== id);
  if (filtered.length === items.length) {
    return NextResponse.json({ error: 'Item not found' }, { status: 404 });
  }

  writeCollection(collection, filtered);
  return new Response(null, { status: 204 });
}
