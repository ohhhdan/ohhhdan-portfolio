/** Parse `{ error: string }` from failed CMS API responses. */
export async function cmsErrorFromResponse(res: Response, fallback: string): Promise<string> {
  try {
    const j = (await res.json()) as { error?: unknown; hint?: unknown };
    if (typeof j.error === 'string' && j.error.length > 0) {
      const hint = typeof j.hint === 'string' && j.hint.length > 0 ? `\n\n${j.hint}` : '';
      return j.error + hint;
    }
  } catch {
    /* ignore */
  }
  if (res.status === 401) return 'Session expired—sign in again from /admin/login.';
  if (res.status === 503) {
    return `${fallback}\n\nIf this mentions CMS_SECRET, add it to .env (16+ characters), restart the dev server, or set env vars on your host and redeploy.`;
  }
  return fallback;
}
