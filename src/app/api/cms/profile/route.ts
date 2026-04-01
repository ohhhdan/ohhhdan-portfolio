import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { getSingleton, writeSingleton } from '@/lib/cms/db';
import type { Profile } from '@/lib/cms/types';

export async function GET(request: NextRequest) {
  const deny = await requireAdmin(request);
  if (deny) return deny;

  const profile = getSingleton<Profile>('profile');
  if (!profile) {
    return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
  }
  return NextResponse.json(profile);
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

  writeSingleton('profile', updated);
  return NextResponse.json(updated);
}
