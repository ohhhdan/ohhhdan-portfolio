interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-forest-50 px-3 py-1 text-xs font-medium text-forest-500 ring-1 ring-inset ring-forest-100 ${className}`}
    >
      {children}
    </span>
  );
}
