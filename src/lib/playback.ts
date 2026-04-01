/** HTTPS-only: mixed content blocks http iframes on an https site. */
export function isEmbeddablePlaybackUrl(href: string): boolean {
  try {
    return new URL(href).protocol === 'https:';
  } catch {
    return false;
  }
}
