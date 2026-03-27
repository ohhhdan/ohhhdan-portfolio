interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-charcoal-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-mint-400/40 ${className}`}
    >
      {children}
    </div>
  );
}
