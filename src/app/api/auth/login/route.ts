import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { CMS_COOKIE } from '@/lib/auth';
import {
  readAdminBcryptHashRaw,
  readAdminLoginPlainDev,
  readAdminPasswordPlain,
  readCmsSecretRaw,
} from '@/lib/admin-env-read';
import {
  ADMIN_ENV_SETUP_STEPS,
  ADMIN_LOGIN_PASSWORD_HELP,
  describeAdminLoginEnvIssues,
  isAdminLoginEnvReady,
} from '@/lib/admin-env-setup';

function passwordMatches(input: string): boolean {
  const plain = readAdminPasswordPlain();
  if (plain && input === plain) return true;

  const devPlain = readAdminLoginPlainDev();
  if (devPlain && input === devPlain) return true;

  const hash = readAdminBcryptHashRaw();
  if (hash) {
    try {
      return bcrypt.compareSync(input, hash);
    } catch {
      return false;
    }
  }

  return false;
}

export async function POST(request: NextRequest) {
  if (!isAdminLoginEnvReady()) {
    return NextResponse.json(
      {
        error: 'Admin login is not configured yet.',
        issues: describeAdminLoginEnvIssues(),
        steps: [...ADMIN_ENV_SETUP_STEPS],
      },
      { status: 503 },
    );
  }

  const secretFinal = readCmsSecretRaw();

  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const password = body.password;
  if (typeof password !== 'string' || password.length < 1) {
    return NextResponse.json({ error: 'Password required' }, { status: 400 });
  }

  if (!passwordMatches(password)) {
    return NextResponse.json(
      {
        error: 'Incorrect password.',
        hint: ADMIN_LOGIN_PASSWORD_HELP,
      },
      { status: 401 },
    );
  }

  const token = await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(new TextEncoder().encode(secretFinal));

  const res = NextResponse.json({ ok: true });
  res.cookies.set(CMS_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
