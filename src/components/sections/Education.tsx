'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { education, credentials } from '@/lib/data/education';
import { GraduationCap, Award } from 'lucide-react';

export function Education() {
  const ref = useIntersectionObserver();

  return (
    <section id="education" className="bg-navy-900/50 py-24 px-6">
      <div ref={ref} className="fade-in mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold text-white sm:text-4xl">
            Education &amp; Credentials
          </h2>
          <div className="mx-auto h-1 w-16 rounded bg-accent-500" />
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-6 flex items-center gap-2 text-xl font-semibold text-white">
              <GraduationCap size={24} className="text-accent-400" />
              Education
            </h3>
            <div className="space-y-4">
              {education.map((edu, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-navy-700 bg-navy-800/50 p-5"
                >
                  <h4 className="font-semibold text-white">{edu.degree}</h4>
                  <p className="text-accent-400">{edu.institution}</p>
                  {edu.year && (
                    <p className="text-sm text-navy-400">{edu.year}</p>
                  )}
                  {edu.details && (
                    <p className="mt-2 text-sm text-navy-300">{edu.details}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-6 flex items-center gap-2 text-xl font-semibold text-white">
              <Award size={24} className="text-accent-400" />
              Credentials
            </h3>
            <div className="space-y-4">
              {credentials.map((cred, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-navy-700 bg-navy-800/50 p-5"
                >
                  <h4 className="font-semibold text-white">{cred.name}</h4>
                  <p className="text-sm text-navy-300">{cred.issuer}</p>
                  {cred.year && (
                    <p className="text-sm text-navy-400">{cred.year}</p>
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
