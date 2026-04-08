import Link from 'next/link';
import { FileText } from 'lucide-react';

export function ResumeTeaser() {
  return (
    <section
      aria-labelledby="resume-teaser-heading"
      className="border-y border-forest/10 bg-surface/80 px-4 py-8 sm:px-6 sm:py-9"
    >
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        <div>
          <h2
            id="resume-teaser-heading"
            className="font-heading text-lg font-bold uppercase tracking-wide text-forest sm:text-xl"
          >
            Résumé & skills
          </h2>
          <p className="mt-2 text-sm leading-snug text-ink-muted">
            Timeline, tools, creds—one page. Print-friendly.
          </p>
        </div>
        <Link
          href="/background"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-pine-600 hover:shadow-lg motion-reduce:hover:translate-y-0"
        >
          <FileText size={18} className="text-mustard" aria-hidden />
          Open
        </Link>
      </div>
    </section>
  );
}
