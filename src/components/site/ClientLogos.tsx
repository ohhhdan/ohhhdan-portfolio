import { Reveal } from './Reveal';

const companies = [
  'Okta',
  'Amazon',
  'Microsoft',
  'Envestnet',
  'New York Life',
  'Randstad',
  'SuperSpeed',
  'ACVIM',
];

export function ClientLogos() {
  return (
    <section aria-label="Companies worked with" className="border-y border-forest/8 bg-surface/60 px-4 py-10 sm:px-6 sm:py-12">
      <Reveal>
        <div className="mx-auto max-w-5xl">
          <p className="mb-8 text-center text-xs font-bold uppercase tracking-[0.22em] text-ink-muted/60">
            Some of the teams along the way
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12">
            {companies.map((name) => (
              <span key={name} className="logo-text select-none whitespace-nowrap">
                {name}
              </span>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
