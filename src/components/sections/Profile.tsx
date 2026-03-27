'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { BowTieLogo } from '@/components/ui/BowTieLogo';

export function Profile() {
  const ref = useIntersectionObserver();

  return (
    <section id="profile" className="py-24 px-6 bg-white">
      <div ref={ref} className="fade-in mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold text-forest-500 sm:text-4xl">
            Profile
          </h2>
          <div className="mx-auto h-1 w-16 rounded bg-mint-400" />
        </div>
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
          <div className="flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-cream text-forest-500 border-2 border-forest-100">
            <BowTieLogo size={64} className="text-mint-400" />
          </div>
          <div className="space-y-4 text-charcoal-500 leading-relaxed">
            <p>
              I&apos;m a full-stack learning experience designer with a passion
              for creating educational content that actually sticks. With over 15
              years in learning &amp; development and customer education, I bring
              a unique blend of instructional design expertise, technical
              proficiency, and creative storytelling to every project.
            </p>
            <p>
              Currently serving as Staff Learning Experience Designer at Okta, I
              specialize in building identity and access management courses using
              AI-generated interactions and cutting-edge authoring tools. I also
              run DS Group LLC, where I consult on instructional design projects
              across industries from veterinary medicine to professional golf.
            </p>
            <p>
              My approach combines ADDIE methodology with design thinking and
              data analysis to create learning experiences that drive measurable
              outcomes — like 30% retention boosts and 400% year-over-year
              consumption growth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
