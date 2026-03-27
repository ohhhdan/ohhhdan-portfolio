'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import type { EducationItem, CredentialItem } from '@/lib/data/types';
import { GraduationCap, Award } from 'lucide-react';

export function Education({ education, credentials }: { education: EducationItem[]; credentials: CredentialItem[] }) {
  const ref = useIntersectionObserver();

  return (
    <section id="education" className="bg-cream py-24 px-6">
      <div ref={ref} className="fade-in mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold text-forest-500 sm:text-4xl">
            Education &amp; Credentials
          </h2>
          <div className="mx-auto h-1 w-16 rounded bg-mint-400" />
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-6 flex items-center gap-2 text-xl font-semibold text-charcoal-800">
              <GraduationCap size={24} className="text-forest-500" />
              Education
            </h3>
            <div className="space-y-4">
              {education.map((edu, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-charcoal-100 bg-white p-5 shadow-sm"
                >
                  <h4 className="font-semibold text-charcoal-800">{edu.degree}</h4>
                  <p className="text-forest-500 font-medium">{edu.institution}</p>
                  {edu.year && (
                    <p className="text-sm text-charcoal-400">{edu.year}</p>
                  )}
                  {edu.details && (
                    <p className="mt-2 text-sm text-charcoal-500">{edu.details}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-6 flex items-center gap-2 text-xl font-semibold text-charcoal-800">
              <Award size={24} className="text-mustard-500" />
              Credentials
            </h3>
            <div className="space-y-4">
              {credentials.map((cred, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-charcoal-100 bg-white p-5 shadow-sm"
                >
                  <h4 className="font-semibold text-charcoal-800">{cred.name}</h4>
                  <p className="text-sm text-charcoal-500">{cred.issuer}</p>
                  {cred.year && (
                    <p className="text-sm text-charcoal-400">{cred.year}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
