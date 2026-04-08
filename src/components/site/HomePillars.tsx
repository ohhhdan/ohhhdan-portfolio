/**
 * Parta-style capability strip: three tight value props, no stock art.
 * Keeps the homepage feeling like a landing page (scannable bands) vs. one endless essay.
 */
export function HomePillars() {
  const items = [
    {
      title: 'Design & build',
      body: 'Storyline, Rise, and video—from storyboard to shipped modules.',
    },
    {
      title: 'Customer & enterprise',
      body: 'Programs that match brand, SMEs, and real delivery constraints.',
    },
    {
      title: 'Outcomes over slides',
      body: 'Clarity first—learning people can finish and use.',
    },
  ];

  return (
    <div className="mx-auto mt-12 max-w-4xl border-t border-forest/10 pt-10">
      <ul className="grid gap-8 text-center sm:grid-cols-3 sm:gap-6">
        {items.map((item) => (
          <li key={item.title}>
            <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-forest">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
