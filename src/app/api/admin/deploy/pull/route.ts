import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';

export const maxDuration = 600;

export async function POST(request: NextRequest) {
  const deny = await requireAdmin(request);
  if (deny) return deny;

  const agentUrl = process.env.DEPLOY_AGENT_URL?.trim();
  const agentSecret = process.env.DEPLOY_AGENT_SECRET?.trim();

  if (!agentUrl || !agentSecret) {
    return NextResponse.json(
      {
        error: 'Deploy agent is not configured on this server.',
        hint: 'On your PC run: npm run setup-deploy-agent, then copy production.env to the NAS and restart the container.',
      },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(agentUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${agentSecret}`,
      },
      signal: AbortSignal.timeout(600_000),
    });

    const body = (await res.json().catch(() => ({}))) as {
      error?: string;
      message?: string;
      changed?: boolean;
      rebuild?: { message?: string; ok?: boolean };
    };

    if (!res.ok) {
      return NextResponse.json(
        {
          error: body.error || 'Deploy agent request failed.',
          hint: 'Make sure this PC is on and running: npm run deploy-agent:serve',
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      message: body.message || 'Deploy finished.',
      changed: body.changed,
      rebuild: body.rebuild,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Deploy agent unreachable';
    return NextResponse.json(
      {
        error: message,
        hint: 'Your PC must be on the same network with the deploy agent running (npm run deploy-agent:serve).',
      },
      { status: 502 },
    );
  }
}
