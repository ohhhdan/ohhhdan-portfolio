import { readFile } from 'fs/promises';
import { join } from 'path';
import { XMLParser } from 'fast-xml-parser';
import type { ScormPackage, ScormVersion } from './types';

/**
 * Parse an imsmanifest.xml file from a SCORM package directory
 * and return structured package metadata.
 *
 * @param packagePath - Absolute filesystem path to the extracted SCORM package directory
 */
export async function parseManifest(packagePath: string): Promise<ScormPackage> {
  const manifestPath = join(packagePath, 'imsmanifest.xml');
  const xml = await readFile(manifestPath, 'utf-8');

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    removeNSPrefix: true,
  });

  const doc = parser.parse(xml);
  const manifest = doc.manifest;

  if (!manifest) {
    throw new Error('Invalid SCORM manifest: missing <manifest> root element');
  }

  const version = detectVersion(manifest);
  const title = extractTitle(manifest);
  const launchUrl = extractLaunchUrl(manifest);
  const id = manifest['@_identifier'] ?? 'unknown';
  const description = extractDescription(manifest);

  return {
    id,
    title,
    version,
    description,
    launchUrl,
    manifestPath,
  };
}

/**
 * Detect the SCORM version from the manifest metadata.
 */
function detectVersion(manifest: Record<string, unknown>): ScormVersion {
  const metadata = manifest.metadata as Record<string, unknown> | undefined;

  if (metadata) {
    const schemaVersion = metadata.schemaversion as string | undefined;
    if (schemaVersion) {
      const normalized = schemaVersion.trim().toLowerCase();
      if (normalized.startsWith('2004') || normalized.startsWith('cam 1.3') || normalized === '1.3') {
        return '2004';
      }
      if (normalized === '1.2' || normalized.startsWith('1.2')) {
        return '1.2';
      }
    }
  }

  // Fallback: check namespace hints in manifest attributes
  const rawAttrs = JSON.stringify(manifest).toLowerCase();
  if (rawAttrs.includes('adlscorm_v1p3') || rawAttrs.includes('2004')) {
    return '2004';
  }

  // Default to 1.2 if version cannot be determined
  return '1.2';
}

/**
 * Extract the package title from the first organization element.
 */
function extractTitle(manifest: Record<string, unknown>): string {
  const organizations = manifest.organizations as Record<string, unknown> | undefined;
  if (!organizations) return 'Untitled';

  const org = organizations.organization;
  if (!org) return 'Untitled';

  // Could be a single org or an array
  const firstOrg = Array.isArray(org) ? org[0] : org;
  const title = (firstOrg as Record<string, unknown>)?.title;

  if (typeof title === 'string') return title;
  if (title && typeof (title as Record<string, string>)['#text'] === 'string') {
    return (title as Record<string, string>)['#text'];
  }

  return 'Untitled';
}

/**
 * Extract the package description from the first organization's metadata
 * or from the manifest-level metadata.
 */
function extractDescription(manifest: Record<string, unknown>): string {
  const metadata = manifest.metadata as Record<string, unknown> | undefined;
  if (metadata) {
    const desc = metadata.description;
    if (typeof desc === 'string') return desc;
  }
  return '';
}

/**
 * Extract the SCO launch URL from resource elements.
 * Looks for the resource with adlcp:scormtype="sco" or adlcp:scormType="sco".
 */
function extractLaunchUrl(manifest: Record<string, unknown>): string {
  const resources = manifest.resources as Record<string, unknown> | undefined;
  if (!resources) {
    throw new Error('Invalid SCORM manifest: missing <resources> element');
  }

  const resourceList = resources.resource;
  if (!resourceList) {
    throw new Error('Invalid SCORM manifest: no <resource> elements found');
  }

  const items: Record<string, unknown>[] = Array.isArray(resourceList)
    ? resourceList
    : [resourceList as Record<string, unknown>];

  // Find the SCO resource
  for (const resource of items) {
    const scormType =
      (resource['@_adlcp:scormtype'] as string) ??
      (resource['@_adlcp:scormType'] as string) ??
      (resource['@_scormtype'] as string) ??
      (resource['@_scormType'] as string) ??
      '';

    if (scormType.toLowerCase() === 'sco') {
      const href = resource['@_href'] as string | undefined;
      if (href) return href;
    }
  }

  // Fallback: use the first resource with an href
  for (const resource of items) {
    const href = resource['@_href'] as string | undefined;
    if (href) return href;
  }

  throw new Error('Invalid SCORM manifest: no launchable resource found');
}
