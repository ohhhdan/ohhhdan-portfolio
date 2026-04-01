/** Parse `{ error: string }` from failed CMS API responses. */
export async function cmsErrorFromResponse(res: Response, fallback: string): Promise<string> {
  try {
    const j = (await res.json()) as { error?: unknown };
    if (typeof j.error === 'string' && j.error.length > 0) return j.error;
  } catch {
    /* ignore */
  }
  if (res.status === 401) return 'Session expired—sign in again from /admin/login.';
  if (res.status === 503) return 'Server is not configured or cannot save (check env and disk).';
  return fallback;
}
