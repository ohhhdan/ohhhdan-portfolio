import Link from 'next/link';
import { FileText } from 'lucide-react';

export function ResumeTeaser() {
  return (
    <section
      aria-labelledby="resume-teaser-heading"
      className="border-y border-forest/10 bg-surface/80 px-4 py-8 sm:px-6 sm:py-9"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <h2
            id="resume-teaser-heading"
            className="font-heading text-lg font-bold uppercase tracking-wide text-forest sm:text-xl"
          >
            Experience, skills & credentials
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            The full timeline lives on its own page—easier to scan than one endless scroll, and you can print or save it as
            a PDF when you need a traditional packet.
          </p>
        </div>
        <Link
          href="/background"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-pine-600 hover:shadow-lg motion-reduce:hover:translate-y-0"
        >
          <FileText size={18} className="text-mustard" aria-hidden />
          Open background page
        </Link>
      </div>
    </section>
  );
}
