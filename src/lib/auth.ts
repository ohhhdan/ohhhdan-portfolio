import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export const CMS_COOKIE = 'cms_session';

function secretKey() {
  const s = process.env.CMS_SECRET;
  if (!s || s.length < 16) return null;
  return new TextEncoder().encode(s);
}

export async function requireAdmin(request: NextRequest): Promise<NextResponse | null> {
  const key = secretKey();
  if (!key) {
    return NextResponse.json({ error: 'CMS_SECRET is not configured' }, { status: 503 });
  }
  const token = request.cookies.get(CMS_COOKIE)?.value;
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    await jwtVerify(token, key);
    return null;
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
