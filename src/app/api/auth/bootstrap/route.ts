import { NextRequest, NextResponse } from 'next/server';
import { bootstrapAdminEnv } from '@/lib/admin-env-bootstrap';

/** Development-only: write .env admin vars and return the password (one-click setup). */
export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'Bootstrap is only available in development.' }, { status: 403 });
  }

  let chosenPassword: string | undefined;
  try {
    const body = (await request.json()) as { password?: string };
    chosenPassword = body.password;
  } catch {
    chosenPassword = undefined;
  }

  try {
    const result = bootstrapAdminEnv(chosenPassword);
    return NextResponse.json({
      ok: true,
      password: result.password,
      files: result.files.map((f) => f.replace(process.cwd(), '.').replace(/\\/g, '/')),
      message: 'Env files updated. Restart npm run dev, then sign in with this password.',
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Bootstrap failed' },
      { status: 500 },
    );
  }
}
