import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { readCmsSecretRaw } from './admin-env-read';

export const CMS_COOKIE = 'cms_session';

function secretKey() {
  const s = readCmsSecretRaw();
  if (!s || s.length < 16) return null;
  return new TextEncoder().encode(s);
}

export async function requireAdmin(request: NextRequest): Promise<NextResponse | null> {
  const key = secretKey();
  if (!key) {
    return NextResponse.json(
      {
        error: 'CMS_SECRET is missing or too short.',
        hint: 'Add CMS_SECRET (16+ random characters) to .env in the project root, restart npm run dev, or set it in your host’s environment variables and redeploy.',
      },
      { status: 503 }
    );
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
