import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { getSingleton, tryWriteSingleton } from '@/lib/cms/db';
import type { Profile } from '@/lib/cms/types';

const EMPTY_PROFILE: Profile = {
  name: '',
  tagline: '',
  headline: '',
  summary: '',
  location: '',
  email: '',
  rolesLine: '',
  bioParagraphs: [],
};

export async function GET(request: NextRequest) {
  const deny = await requireAdmin(request);
  if (deny) return deny;

  const profile = getSingleton<Profile>('profile');
  return NextResponse.json(profile ?? EMPTY_PROFILE);
}

export async function PUT(request: NextRequest) {
  const deny = await requireAdmin(request);
  if (deny) return deny;

  const body = (await request.json()) as Partial<Profile>;
  const existing = getSingleton<Profile>('profile') ?? ({} as Profile);

  const updated: Profile = {
    name: body.name ?? existing.name,
    tagline: body.tagline ?? existing.tagline,
    headline: body.headline ?? existing.headline,
    summary: body.summary ?? existing.summary,
    location: body.location ?? existing.location,
    email: body.email ?? existing.email,
    rolesLine: body.rolesLine ?? existing.rolesLine,
    bioParagraphs: Array.isArray(body.bioParagraphs) ? body.bioParagraphs : existing.bioParagraphs ?? [],
  };

  const w = tryWriteSingleton('profile', updated);
  if (!w.ok) {
    return NextResponse.json({ error: w.error }, { status: 503 });
  }
  return NextResponse.json(updated);
}
