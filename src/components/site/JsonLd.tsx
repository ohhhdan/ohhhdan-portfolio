import { getSingleton } from '@/lib/cms/db';
import type { Profile } from '@/lib/cms/types';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site';

/** Person + WebSite schema for hiring/search engines — invisible to visitors. */
export function JsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: SITE_NAME,
        url: SITE_URL,
        jobTitle: 'Learning Experience Designer',
        description: SITE_DESCRIPTION,
        email: `mailto:${getSingleton<Profile>('profile')?.email || 'daniel.c.winter@live.com'}`,
        sameAs: ['https://www.linkedin.com/in/ohhhdan'],
        worksFor: {
          '@type': 'Organization',
          name: 'Okta',
        },
        knowsAbout: [
          'Learning experience design',
          'Customer education',
          'Interactive curriculum',
          'Digital design',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: `${SITE_NAME} — Portfolio`,
        description: SITE_DESCRIPTION,
        publisher: { '@id': `${SITE_URL}/#person` },
        inLanguage: 'en-US',
      },
      {
        '@type': 'ProfilePage',
        '@id': `${SITE_URL}/#profilepage`,
        url: SITE_URL,
        name: SITE_NAME,
        mainEntity: { '@id': `${SITE_URL}/#person` },
        isPartOf: { '@id': `${SITE_URL}/#website` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
