import { Briefcase, TrendingUp, Award, Rocket } from 'lucide-react';
import type { ExperienceItem } from '@/lib/cms/types';
import { Reveal } from './Reveal';
import Link from 'next/link';

interface CareerHighlight {
  company: string;
  role: string;
  period: string;
  achievements: string[];
  icon: React.ReactNode;
  accentColor: string;
}

function buildHighlights(experience: ExperienceItem[]): CareerHighlight[] {
  const highlights: CareerHighlight[] = [];

  // Okta
  const okta = experience.find((e) => e.company === 'Okta');
  if (okta) {
    const topAchievements = [
      'Three promotions in three years — from curriculum developer to leading learning experience and digital design.',
      'CEdMA Customer Education Pinnacle Award (Innovation, 2025). Okta\'s first CEdMA recognition since 2017.',
      'Nearly 4× average learner course consumption through AI-powered simulation widgets.',
    ];
    highlights.push({
      company: 'Okta',
      role: okta.roles?.[0]?.title ?? okta.title,
      period: okta.period,
      achievements: topAchievements,
      icon: <Rocket size={22} strokeWidth={2} />,
      accentColor: 'from-mint to-teal',
    });
  }

  // DS Group
  const ds = experience.find((e) => e.company === 'DS Group, LLC');
  if (ds) {
    highlights.push({
      company: 'DS Group, LLC',
      role: ds.title,
      period: ds.period,
      achievements: [
        'Independent consulting practice across eLearning, video, LMS, and assessments.',
        'Grew a client\'s training consumption 400% year-over-year by converting in-person to on-demand.',
        'Migrated 250+ courses into a new LMS; advised through vendor selection.',
      ],
      icon: <TrendingUp size={22} strokeWidth={2} />,
      accentColor: 'from-mustard to-mint',
    });
  }

  // Big-name credibility
  const bigNames = experience.find((e) =>
    e.company.includes('Amazon') || e.highlights?.some((h) => h.includes('Amazon')),
  );
  if (bigNames) {
    highlights.push({
      company: 'Amazon, Microsoft & more',
      role: 'Program Management & Instructional Design',
      period: '2013 – 2020',
      achievements: [
        'Program Manager and LMS Specialist at Amazon Advertising.',
        'Instructional Designer and Program Manager at Microsoft GDCO.',
        'Built training programs spanning global teams, compliance, and partner enablement.',
      ],
      icon: <Briefcase size={22} strokeWidth={2} />,
      accentColor: 'from-teal to-forest',
    });
  }

  // Envestnet
  const envestnet = experience.find((e) => e.company === 'Envestnet');
  if (envestnet) {
    highlights.push({
      company: 'Envestnet',
      role: envestnet.title,
      period: envestnet.period,
      achievements: [
        'Product education for a wealth-management platform with 300+ courses.',
        'Built Storyline template system that cut QA by 2.5 business days per release.',
        'JIRA workflow improvements saved the team ~20 hours per week.',
      ],
      icon: <Award size={22} strokeWidth={2} />,
      accentColor: 'from-forest to-mustard',
    });
  }

  return highlights;
}

export function CareerJourney({ experience }: { experience: ExperienceItem[] }) {
  const highlights = buildHighlights(experience);

  return (
    <section id="career" className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="text-center">
            <div
              className="mx-auto mb-4 h-1 w-12 rounded-full bg-gradient-to-r from-mint to-teal"
              aria-hidden
            />
            <p className="font-heading text-xs font-bold uppercase tracking-[0.22em] text-forest/80">
              Career
            </p>
            <h2 className="font-heading mt-2 text-2xl font-bold uppercase tracking-[0.04em] text-forest sm:text-3xl">
              From storyboard to strategy
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ink-muted">
              A track record built across enterprise platforms, consulting engagements, and some of the
              biggest names in tech — with measurable outcomes at every stop.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {highlights.map((h, i) => (
            <Reveal key={h.company} delayMs={i * 80}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-forest/10 bg-surface p-6 shadow-sm transition duration-300 hover:border-mint/40 hover:shadow-lg motion-reduce:transition-none">
                {/* Top accent gradient */}
                <div
                  className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${h.accentColor} opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:opacity-60`}
                  aria-hidden
                />

                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-forest/8 text-forest transition group-hover:bg-forest group-hover:text-white">
                    {h.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-heading text-lg font-bold uppercase tracking-wide text-forest">
                      {h.company}
                    </h3>
                    <p className="text-sm font-semibold text-teal">{h.role}</p>
                    <p className="mt-0.5 text-xs font-medium text-ink-muted">{h.period}</p>
                  </div>
                </div>

                <ul className="mt-5 flex-1 space-y-2.5 text-sm leading-relaxed text-ink-muted">
                  {h.achievements.map((a, j) => (
                    <li key={j} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-mint" aria-hidden />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delayMs={350}>
          <div className="mt-10 text-center">
            <Link
              href="/background"
              className="inline-flex items-center gap-2 rounded-full border border-forest/20 bg-surface/90 px-6 py-3 text-sm font-semibold text-forest shadow-sm transition hover:border-forest/40 hover:bg-paper hover:shadow-md"
            >
              View full background →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
