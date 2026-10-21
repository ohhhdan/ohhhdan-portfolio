export function ToolChips({ tools }: { tools: string[] }) {
  if (!tools.length) return null;
  return (
    <ul className="flex flex-wrap gap-1.5">
      {tools.map((t) => (
        <li
          key={t}
          className="rounded-md border border-forest/12 bg-paper px-2 py-0.5 text-[11px] font-medium text-ink-muted"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}
