interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-navy-800 bg-navy-900/50 p-6 transition-all duration-300 hover:border-accent-500/40 hover:shadow-lg hover:shadow-accent-500/5 ${className}`}
    >
      {children}
    </div>
  );
}
