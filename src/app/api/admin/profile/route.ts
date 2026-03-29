import { NextRequest, NextResponse } from 'next/server';
import { isAuthorized, UNAUTHORIZED } from '@/lib/admin/auth';
import { getSingleton, writeSingleton } from '@/lib/data/db';
import type { Profile } from '@/lib/data/types';

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) return UNAUTHORIZED;

  const profile = getSingleton<Profile>('profile');
  if (!profile) {
    return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
  }
  return NextResponse.json(profile);
}

export async function PUT(request: NextRequest) {
  if (!isAuthorized(request)) return UNAUTHORIZED;

  const body = await request.json() as Partial<Profile>;

  const existing = getSingleton<Profile>('profile') ?? {} as Profile;
  const updated: Profile = {
    name: body.name ?? existing.name,
    tagline: body.tagline ?? existing.tagline,
    headline: body.headline ?? existing.headline,
    summary: body.summary ?? existing.summary,
    location: body.location ?? existing.location,
  };

  writeSingleton('profile', updated);
  return NextResponse.json(updated);
}
