import { Reveal } from './Reveal';

export function Section({
  id,
  eyebrow,
  title,
  children,
  className = '',
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-24 px-4 py-16 sm:px-6 lg:py-20 ${className}`}>
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <header className="border-l-4 border-mint pl-4 sm:pl-5">
            <p className="font-heading text-xs font-bold uppercase tracking-[0.22em] text-forest/80">{eyebrow}</p>
            <h2 className="font-heading mt-2 text-2xl font-bold uppercase tracking-[0.04em] text-forest sm:text-3xl">
              {title}
            </h2>
          </header>
        </Reveal>
        <Reveal delayMs={90} className="mt-8">
          {children}
        </Reveal>
      </div>
    </section>
  );
}
