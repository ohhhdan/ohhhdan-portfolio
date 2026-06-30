'use client';

import { useCountUp } from '@/hooks/useCountUp';
import { Reveal } from './Reveal';

interface Metric {
  value: number;
  suffix?: string;
  label: string;
}

const metrics: Metric[] = [
  { value: 15, suffix: '+', label: 'Years in learning & education' },
  { value: 4, suffix: '×', label: 'Learner engagement increase' },
  { value: 550, suffix: '+', label: 'Products designed & managed' },
  { value: 6, suffix: '', label: 'Industry awards' },
];

function MetricCell({ metric, index }: { metric: Metric; index: number }) {
  const { ref, value } = useCountUp(metric.value, 1600 + index * 200);

  return (
    <div ref={ref} className="flex flex-col items-center px-4 py-3">
      <span className="metric-value" aria-label={`${metric.value}${metric.suffix ?? ''}`}>
        {value}
        {metric.suffix ? (
          <span className="text-mustard">{metric.suffix}</span>
        ) : null}
      </span>
      <span className="metric-label">{metric.label}</span>
    </div>
  );
}

export function ImpactStrip() {
  return (
    <section aria-label="Career milestones" className="section-dark relative overflow-hidden">
      {/* Top accent line */}
      <div
        className="animate-shimmer absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-mint via-mustard to-teal"
        aria-hidden
      />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-mint/8 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-16 top-1/3 h-48 w-48 rounded-full bg-mustard/6 blur-3xl" aria-hidden />

      <Reveal>
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-pine-700/50">
          {metrics.map((m, i) => (
            <MetricCell key={m.label} metric={m} index={i} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
