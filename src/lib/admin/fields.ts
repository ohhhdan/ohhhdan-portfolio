export type FieldDef =
  | { type: 'text'; key: string; label: string; required?: boolean; placeholder?: string }
  | { type: 'textarea'; key: string; label: string; placeholder?: string }
  | { type: 'string-array'; key: string; label: string; placeholder?: string };

export const COLLECTION_FIELDS: Record<string, FieldDef[]> = {
  experience: [
    { type: 'text', key: 'title', label: 'Title', required: true },
    { type: 'text', key: 'company', label: 'Company', required: true },
    { type: 'text', key: 'period', label: 'Period', required: true, placeholder: '2023 - Present' },
    { type: 'textarea', key: 'description', label: 'Description' },
    { type: 'string-array', key: 'highlights', label: 'Highlights' },
  ],
  projects: [
    { type: 'text', key: 'slug', label: 'Slug', required: true, placeholder: 'my-project' },
    { type: 'text', key: 'title', label: 'Title', required: true },
    { type: 'text', key: 'client', label: 'Client' },
    { type: 'text', key: 'role', label: 'Role' },
    { type: 'textarea', key: 'description', label: 'Description' },
    { type: 'textarea', key: 'challenge', label: 'Challenge' },
    { type: 'textarea', key: 'solution', label: 'Solution' },
    { type: 'string-array', key: 'results', label: 'Results' },
    { type: 'string-array', key: 'technologies', label: 'Technologies' },
    { type: 'text', key: 'scormPackageId', label: 'SCORM Package ID', placeholder: 'optional' },
  ],
  education: [
    { type: 'text', key: 'degree', label: 'Degree', required: true },
    { type: 'text', key: 'institution', label: 'Institution', required: true },
    { type: 'text', key: 'year', label: 'Year', placeholder: '2018' },
    { type: 'textarea', key: 'details', label: 'Details' },
  ],
  credentials: [
    { type: 'text', key: 'name', label: 'Name', required: true },
    { type: 'text', key: 'issuer', label: 'Issuer', required: true },
    { type: 'text', key: 'year', label: 'Year', placeholder: '2020' },
  ],
  awards: [
    { type: 'text', key: 'name', label: 'Award Name', required: true },
    { type: 'text', key: 'org', label: 'Organization', required: true },
    { type: 'text', key: 'year', label: 'Year', placeholder: '2024' },
    { type: 'textarea', key: 'description', label: 'Description' },
  ],
  engagements: [
    { type: 'text', key: 'name', label: 'Organization', required: true },
    { type: 'text', key: 'role', label: 'Role', required: true },
    { type: 'textarea', key: 'description', label: 'Description' },
  ],
  skills: [
    { type: 'text', key: 'name', label: 'Category Name', required: true },
    { type: 'string-array', key: 'skills', label: 'Skills' },
  ],
};

export const COLLECTION_LABELS: Record<string, string> = {
  experience: 'Experience',
  projects: 'Projects',
  education: 'Education',
  credentials: 'Credentials',
  awards: 'Awards',
  engagements: 'Engagements',
  skills: 'Skills',
};

export const COLLECTIONS = Object.keys(COLLECTION_LABELS);

/** Returns the human-readable display name for an item (first text field) */
export function getItemLabel(collection: string, item: Record<string, unknown>): string {
  const fields = COLLECTION_FIELDS[collection] ?? [];
  const first = fields.find((f) => f.type === 'text');
  if (!first) return String(item.id ?? 'Item');
  return String(item[first.key] ?? 'Untitled');
}
