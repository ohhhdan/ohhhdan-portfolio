export function Reveal({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
  /** Kept so existing call sites compile. Entrance hiding was removed; it left the homepage blank. */
  delayMs?: number;
}) {
  return <div className={className}>{children}</div>;
}
