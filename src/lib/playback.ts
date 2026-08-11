import type { Project, ProjectLink } from '@/lib/cms/types';

/** HTTPS-only: mixed content blocks http iframes on an https site. */
export function isEmbeddablePlaybackUrl(href: string): boolean {
  try {
    return new URL(href).protocol === 'https:';
  } catch {
    return false;
  }
}

export function youtubeEmbedUrl(href: string): string | null {
  try {
    const url = new URL(href);
    if (url.hostname.includes('youtube.com')) {
      const id = url.searchParams.get('v');
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
    if (url.hostname === 'youtu.be') {
      const id = url.pathname.replace(/^\//, '');
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
  } catch {
    /* ignore */
  }
  return null;
}

/** Articulate Review and similar hosts block iframe embedding. */
export function isBlockedEmbedHost(href: string): boolean {
  try {
    const url = new URL(href);
    if (url.hostname === '360.articulate.com') return true;
    if (url.pathname.includes('/review')) return true;
  } catch {
    /* ignore */
  }
  return false;
}

export function resolveEmbedUrl(href: string, kind?: ProjectLink['kind']): string | null {
  const youtube = youtubeEmbedUrl(href);
  if (youtube) return youtube;
  if (kind === 'articulate' || isBlockedEmbedHost(href)) return null;
  if (isEmbeddablePlaybackUrl(href)) return href;
  return null;
}

export function canEmbedProjectLink(link: ProjectLink): boolean {
  if (link.kind === 'articulate' || isBlockedEmbedHost(link.href)) return false;
  if (link.embedOnSite) return resolveEmbedUrl(link.href, link.kind) !== null;
  if (link.kind === 'video') return youtubeEmbedUrl(link.href) !== null;
  return false;
}

export function getEmbedUrlForLink(link: ProjectLink): string | null {
  if (!canEmbedProjectLink(link)) return null;
  return resolveEmbedUrl(link.href, link.kind);
}

export function getEmbeddableLinks(links: ProjectLink[]): ProjectLink[] {
  return links.filter(canEmbedProjectLink);
}

export function getPrimaryExternalLink(project: Project): ProjectLink | null {
  const links = project.links ?? [];
  return getEmbeddableLinks(links)[0] ?? links[0] ?? null;
}

export interface ProjectSample {
  title: string;
  embedUrl: string | null;
  externalUrl: string;
  embeddable: boolean;
  /** Why in-page preview is unavailable, when embeddable is false. */
  blockReason?: 'articulate-review';
}

export function getFirstEmbeddableSampleIndex(samples: ProjectSample[]): number {
  const index = samples.findIndex((s) => s.embeddable && s.embedUrl);
  return index >= 0 ? index : 0;
}

export function buildProjectSamples(project: Project, hasLocalScorm: boolean): ProjectSample[] {
  const samples: ProjectSample[] = [];

  if (hasLocalScorm && project.scormPackageId) {
    const url = `/learn/${encodeURIComponent(project.scormPackageId)}`;
    samples.push({
      title: project.title,
      embedUrl: url,
      externalUrl: url,
      embeddable: true,
    });
  }

  for (const link of project.links ?? []) {
    const embeddable = canEmbedProjectLink(link);
    samples.push({
      title: link.label,
      embedUrl: getEmbedUrlForLink(link),
      externalUrl: link.href,
      embeddable,
      blockReason:
        !embeddable && (link.kind === 'articulate' || isBlockedEmbedHost(link.href))
          ? 'articulate-review'
          : undefined,
    });
  }

  return samples.sort((a, b) => Number(b.embeddable) - Number(a.embeddable));
}
