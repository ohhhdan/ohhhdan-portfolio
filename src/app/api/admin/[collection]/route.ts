import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
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

function validateCollection(collection: string): boolean {
  return VALID_COLLECTIONS.has(collection);
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ collection: string }> }
) {
  if (!isAuthorized(request)) return UNAUTHORIZED;

  const { collection } = await params;
  if (!validateCollection(collection)) {
    return NextResponse.json({ error: 'Invalid collection' }, { status: 400 });
  }

  const items = getCollection<CollectionItem>(collection);
  return NextResponse.json(items);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ collection: string }> }
) {
  if (!isAuthorized(request)) return UNAUTHORIZED;

  const { collection } = await params;
  if (!validateCollection(collection)) {
    return NextResponse.json({ error: 'Invalid collection' }, { status: 400 });
  }

  const body = await request.json() as Omit<CollectionItem, 'id'>;
  const items = getCollection<CollectionItem>(collection);

  const maxOrder = items.reduce((max, item) => Math.max(max, item.sortOrder ?? 0), -1);
  const newItem: CollectionItem = {
    ...body,
    id: randomUUID(),
    sortOrder: typeof body.sortOrder === 'number' ? body.sortOrder : maxOrder + 1,
  };

  writeCollection(collection, [...items, newItem]);
  return NextResponse.json(newItem, { status: 201 });
}
