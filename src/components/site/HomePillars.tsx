/** Resume-summary style value props under the hero. */
export function HomePillars() {
  const items = [
    {
      title: 'Design & build',
      body: 'End-to-end learning design through shipped, production-ready experiences.',
    },
    {
      title: 'Customer & enterprise',
      body: 'Programs that scale with brand standards, stakeholders, and delivery constraints.',
    },
    {
      title: 'Outcomes over slides',
      body: 'Completion, retention, and on-the-job use matter more than deck volume.',
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
