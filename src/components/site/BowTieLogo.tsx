/**
 * Bow tie mark from brand guidelines: detail + slight tilt = creative precision.
 */
export function BowTieLogo({
  className = '',
  size = 'md',
  tone = 'onLight',
}: {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  /** `onDark` for forest/cover surfaces (softer box, still mint detail). */
  tone?: 'onLight' | 'onDark';
}) {
  const box = size === 'lg' ? 'h-24 w-24' : size === 'sm' ? 'h-11 w-11' : 'h-16 w-16';
  const svgW = size === 'lg' ? 48 : size === 'sm' ? 22 : 32;
  const svgH = size === 'lg' ? 30 : size === 'sm' ? 14 : 20;
  const shell =
    tone === 'onDark'
      ? 'bg-pine-700/80 shadow-none ring-1 ring-white/25'
      : 'bg-forest shadow-lg ring-1 ring-ink/10 hover:shadow-xl motion-reduce:hover:shadow-lg';

  return (
    <div
      className={`inline-flex shrink-0 -rotate-3 items-center justify-center rounded-lg transition-transform duration-300 ease-out hover:-rotate-6 motion-reduce:hover:-rotate-3 ${shell} ${box} ${className}`}
      aria-hidden
    >
      <div className="animate-float-soft motion-reduce:animate-none">
        <svg
          width={svgW}
          height={svgH}
          viewBox="0 0 60 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="-rotate-6 drop-shadow-sm"
        >
          <title>Bow tie</title>
          <path
            d="M4 4 L22 14 V26 L4 36 Z"
            fill="white"
            stroke="#69bc92"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path
            d="M56 4 L38 14 V26 L56 36 Z"
            fill="white"
            stroke="#69bc92"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path
            d="M22 14 H38 V26 H22 Z"
            fill="white"
            stroke="#69bc92"
            strokeWidth="4"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
