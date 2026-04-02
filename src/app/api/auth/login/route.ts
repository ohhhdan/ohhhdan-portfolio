import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { CMS_COOKIE } from '@/lib/auth';
import { readAdminBcryptHashRaw, readAdminLoginPlainDev, readCmsSecretRaw } from '@/lib/admin-env-read';
import {
  ADMIN_ENV_SETUP_STEPS,
  ADMIN_LOGIN_PASSWORD_HELP,
  describeAdminLoginEnvIssues,
  isAdminLoginEnvReady,
} from '@/lib/admin-env-setup';

export async function POST(request: NextRequest) {
  if (!isAdminLoginEnvReady()) {
    return NextResponse.json(
      {
        error: 'Admin login isn’t configured on this server yet.',
        issues: describeAdminLoginEnvIssues(),
        steps: [...ADMIN_ENV_SETUP_STEPS],
      },
      { status: 503 }
    );
  }

  const hashFinal = readAdminBcryptHashRaw();
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

  const devPlain = readAdminLoginPlainDev();
  let ok = Boolean(devPlain && password === devPlain);

  if (!ok) {
    try {
      ok = bcrypt.compareSync(password, hashFinal);
    } catch {
      return NextResponse.json(
        {
          error: 'ADMIN_PASSWORD_BCRYPT in .env looks broken (not a valid bcrypt hash).',
          hint: 'Run npm run setup-admin again, or fix the hash line (one line, starts with $2). Development: ADMIN_LOGIN_PLAIN in .env still lets you in.',
        },
        { status: 401 }
      );
    }
  }

  if (!ok) {
    return NextResponse.json(
      {
        error: 'Incorrect password.',
        hint: ADMIN_LOGIN_PASSWORD_HELP,
      },
      { status: 401 }
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
