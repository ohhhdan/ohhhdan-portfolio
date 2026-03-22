interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-accent-500/10 px-3 py-1 text-xs font-medium text-accent-400 ring-1 ring-inset ring-accent-500/20 ${className}`}
    >
      {children}
    </span>
  );
}
