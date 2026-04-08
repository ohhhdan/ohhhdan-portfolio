import { Reveal } from './Reveal';

export function Section({
  id,
  eyebrow,
  title,
  children,
  className = '',
  align = 'start',
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  /** `center` — homepage / landing-style blocks. `start` — long-form pages (e.g. background). */
  align?: 'start' | 'center';
}) {
  const centered = align === 'center';

  return (
    <section
      id={id}
      className={`scroll-mt-24 px-4 py-12 sm:px-6 sm:py-14 ${centered ? 'text-center' : ''} ${className}`}
    >
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <header
            className={
              centered
                ? 'mx-auto max-w-2xl'
                : 'border-l-4 border-mint pl-4 sm:pl-5 text-left'
            }
          >
            {centered ? (
              <div
                className="mx-auto mb-4 h-1 w-12 rounded-full bg-gradient-to-r from-mint to-teal"
                aria-hidden
              />
            ) : null}
            <p className="font-heading text-xs font-bold uppercase tracking-[0.22em] text-forest/80">{eyebrow}</p>
            <h2 className="font-heading mt-2 text-2xl font-bold uppercase tracking-[0.04em] text-forest sm:text-3xl">
              {title}
            </h2>
          </header>
        </Reveal>
        <Reveal delayMs={90} className={`mt-6 ${centered ? 'mx-auto max-w-3xl' : ''}`}>
          {children}
        </Reveal>
      </div>
    </section>
  );
}
