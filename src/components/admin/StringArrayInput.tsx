'use client';

import { useState, KeyboardEvent } from 'react';
import { X } from 'lucide-react';

interface StringArrayInputProps {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}

export default function StringArrayInput({
  label,
  values,
  onChange,
  placeholder = 'Type and press Enter',
}: StringArrayInputProps) {
  const [draft, setDraft] = useState('');

  function add() {
    const trimmed = draft.trim();
    if (!trimmed) return;
    onChange([...values, trimmed]);
    setDraft('');
  }

  function remove(index: number) {
    onChange(values.filter((_, i) => i !== index));
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      add();
    } else if (e.key === 'Backspace' && draft === '' && values.length > 0) {
      onChange(values.slice(0, -1));
    }
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-pine-800">{label}</label>
      <div className="min-h-[2.75rem] w-full rounded-lg border border-pine-200 bg-white px-3 py-2 focus-within:border-pine-400 focus-within:ring-2 focus-within:ring-pine-100">
        <div className="flex flex-wrap gap-1.5">
          {values.map((val, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 rounded-md bg-pine-100 px-2 py-0.5 text-sm text-pine-800"
            >
              {val}
              <button type="button" onClick={() => remove(i)} className="text-pine-500 hover:text-pine-700">
                <X size={12} />
              </button>
            </span>
          ))}
          <input
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={onKeyDown}
            onBlur={add}
            placeholder={values.length === 0 ? placeholder : ''}
            className="min-w-[8rem] flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-muted"
          />
        </div>
      </div>
    </div>
  );
}
