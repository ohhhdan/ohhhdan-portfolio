interface BowTieLogoProps {
  className?: string;
  size?: number;
}

export function BowTieLogo({ className = '', size = 40 }: BowTieLogoProps) {
  const height = size * (40 / 60);
  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 60 40"
      fill="none"
      className={className}
    >
      <path
        d="M4 4 L22 14 V26 L4 36 Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M56 4 L38 14 V26 L56 36 Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M22 14 H38 V26 H22 Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}
