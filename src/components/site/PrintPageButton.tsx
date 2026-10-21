import { Download } from 'lucide-react';

export function PrintPageButton() {
  return (
    <a
      href="/background/resume"
      className="no-print inline-flex w-fit items-center gap-2 self-start rounded-full border-2 border-forest/20 bg-surface px-4 py-2 text-sm font-semibold text-forest transition hover:border-mustard hover:bg-mustard/10"
    >
      <Download size={16} aria-hidden />
      Download PDF
    </a>
  );
}
