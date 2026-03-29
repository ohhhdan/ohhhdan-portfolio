'use client';

import StringArrayInput from './StringArrayInput';
import type { FieldDef } from '@/lib/admin/fields';

interface ItemFormProps {
  fields: FieldDef[];
  values: Record<string, unknown>;
  onChange: (values: Record<string, unknown>) => void;
}

const inputClass =
  'w-full rounded-lg border border-charcoal-200 bg-white px-3 py-2 text-sm text-charcoal-800 placeholder:text-charcoal-400 focus:border-forest-400 focus:outline-none focus:ring-2 focus:ring-forest-100';

export default function ItemForm({ fields, values, onChange }: ItemFormProps) {
  function set(key: string, value: unknown) {
    onChange({ ...values, [key]: value });
  }

  return (
    <div className="space-y-4">
      {fields.map((field) => {
        if (field.type === 'text') {
          return (
            <div key={field.key}>
              <label className="mb-1.5 block text-sm font-medium text-charcoal-700">
                {field.label}
                {field.required && <span className="ml-0.5 text-crimson">*</span>}
              </label>
              <input
                type="text"
                value={String(values[field.key] ?? '')}
                onChange={(e) => set(field.key, e.target.value)}
                placeholder={field.placeholder}
                className={inputClass}
              />
            </div>
          );
        }

        if (field.type === 'textarea') {
          return (
            <div key={field.key}>
              <label className="mb-1.5 block text-sm font-medium text-charcoal-700">
                {field.label}
              </label>
              <textarea
                rows={3}
                value={String(values[field.key] ?? '')}
                onChange={(e) => set(field.key, e.target.value)}
                placeholder={field.placeholder}
                className={`${inputClass} resize-y`}
              />
            </div>
          );
        }

        if (field.type === 'string-array') {
          const arr = (values[field.key] as string[] | undefined) ?? [];
          return (
            <StringArrayInput
              key={field.key}
              label={field.label}
              values={arr}
              onChange={(v) => set(field.key, v)}
              placeholder={field.placeholder}
            />
          );
        }

        return null;
      })}
    </div>
  );
}
