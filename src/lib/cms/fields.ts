export type FieldDef =
  | { type: 'text'; key: string; label: string; required?: boolean; placeholder?: string }
  | { type: 'textarea'; key: string; label: string; placeholder?: string }
  | { type: 'string-array'; key: string; label: string; placeholder?: string };

export const COLLECTION_FIELDS: Record<string, FieldDef[]> = {
  experience: [
    { type: 'text', key: 'title', label: 'Title', required: true },
    { type: 'text', key: 'company', label: 'Company', required: true },
    { type: 'text', key: 'period', label: 'Period', required: true, placeholder: '2023 – Present' },
    {
      type: 'text',
      key: 'roleProgression',
      label: 'Role progression (optional)',
      placeholder: 'Staff LXD (2025–2026) · Senior Curriculum Developer (2023–2025)',
    },
    { type: 'textarea', key: 'description', label: 'Description' },
    { type: 'string-array', key: 'highlights', label: 'Highlights' },
    { type: 'text', key: 'presentationLabel', label: 'Media link label', placeholder: 'Watch presentation' },
    { type: 'text', key: 'presentationUrl', label: 'Media URL', placeholder: 'https://…' },
  ],
  projects: [
    { type: 'text', key: 'slug', label: 'Slug', required: true, placeholder: 'my-project' },
    { type: 'text', key: 'title', label: 'Title', required: true },
    { type: 'text', key: 'client', label: 'Client / org' },
    {
      type: 'text',
      key: 'period',
      label: 'Period (optional)',
      placeholder: '2023 to present',
    },
    {
      type: 'text',
      key: 'featured',
      label: 'Featured (true/false)',
      placeholder: 'true',
    },
    {
      type: 'text',
      key: 'engagementLabel',
      label: 'Engagement label',
      placeholder: 'Freelance',
    },
    {
      type: 'text',
      key: 'portfolioGroup',
      label: 'Portfolio group',
      placeholder: 'platform or sample',
    },
    { type: 'textarea', key: 'summary', label: 'Summary (one line)' },
    { type: 'textarea', key: 'roleLine', label: 'Role + team + timeframe' },
    { type: 'textarea', key: 'context', label: 'Context (2 sentences)' },
    { type: 'textarea', key: 'problem', label: 'Problem', placeholder: 'What needed to change?' },
    { type: 'string-array', key: 'approach', label: 'Approach (3 bullets)' },
    { type: 'string-array', key: 'results', label: 'Results' },
    { type: 'textarea', key: 'builtNote', label: 'Built note / hero placeholder', placeholder: '[HERO MEDIA]' },
    { type: 'textarea', key: 'sampleNote', label: 'Sample note when no public link', placeholder: '[SCREEN RECORDING]' },
    {
      type: 'string-array',
      key: 'screenshots',
      label: 'Screenshot URLs (one per line)',
      placeholder: '/images/work/project-1.webp',
    },
    { type: 'string-array', key: 'technologies', label: 'Tools (one per line)' },
    {
      type: 'text',
      key: 'scormPackageId',
      label: 'On-site sample id (optional)',
      placeholder: 'only if you host a package on this site',
    },
  ],
  education: [
    { type: 'text', key: 'degree', label: 'Degree', required: true },
    { type: 'text', key: 'institution', label: 'Institution', required: true },
    { type: 'text', key: 'year', label: 'Year' },
    { type: 'textarea', key: 'details', label: 'Details' },
  ],
  credentials: [
    { type: 'text', key: 'name', label: 'Name', required: true },
    { type: 'text', key: 'issuer', label: 'Issuer', required: true },
    { type: 'text', key: 'year', label: 'Year' },
  ],
  awards: [
    { type: 'text', key: 'name', label: 'Award name', required: true },
    { type: 'text', key: 'org', label: 'Organization', required: true },
    { type: 'text', key: 'year', label: 'Year' },
    { type: 'textarea', key: 'description', label: 'Description' },
  ],
  presentations: [
    { type: 'text', key: 'name', label: 'Title', required: true },
    { type: 'text', key: 'event', label: 'Event', required: true },
    { type: 'text', key: 'year', label: 'Year' },
    { type: 'textarea', key: 'description', label: 'Description' },
    { type: 'text', key: 'url', label: 'URL' },
  ],
  engagements: [
    { type: 'text', key: 'name', label: 'Organization', required: true },
    { type: 'text', key: 'role', label: 'Role', required: true },
    { type: 'textarea', key: 'description', label: 'Description' },
  ],
  skills: [
    { type: 'text', key: 'name', label: 'Category name', required: true },
    { type: 'string-array', key: 'skills', label: 'Skills' },
  ],
};

export const COLLECTION_LABELS: Record<string, string> = {
  experience: 'Experience',
  projects: 'Portfolio',
  education: 'Education',
  credentials: 'Credentials',
  awards: 'Awards',
  presentations: 'Presentations',
  engagements: 'Engagements',
  skills: 'Skills',
};

export const COLLECTIONS = Object.keys(COLLECTION_LABELS);

export function getItemLabel(collection: string, item: Record<string, unknown>): string {
  const fields = COLLECTION_FIELDS[collection] ?? [];
  const first = fields.find((f) => f.type === 'text');
  if (!first) return String(item.id ?? 'Item');
  return String(item[first.key] ?? 'Untitled');
}
