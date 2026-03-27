interface SectionHeadingProps {
  children: React.ReactNode;
}

export default function SectionHeading({ children }: SectionHeadingProps) {
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-forest-500 sm:text-4xl">
        {children}
      </h2>
      <div className="mt-3 h-1 w-16 rounded-full bg-mint-400" />
    </div>
  );
}
