'use client';

import { Printer } from 'lucide-react';

export function PrintPageButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print inline-flex items-center gap-2 rounded-full border-2 border-forest/20 bg-surface px-4 py-2 text-sm font-semibold text-forest transition hover:border-mustard hover:bg-mustard/10"
    >
      <Printer size={16} aria-hidden />
      Print or save as PDF
    </button>
  );
}
