export interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
}

export const experience: ExperienceItem[] = [
  {
    title: 'Staff Learning Experience Designer',
    company: 'Okta',
    period: '2023 - Present',
    description:
      'Leading learning experience design for identity and access management education at a major enterprise security company.',
    highlights: [
      'Designing AI-powered interactive learning experiences using Parta.io',
      'Developing scalable customer education programs for IAM products',
      'Building SCORM-compliant courses with advanced interactivity',
      'Collaborating cross-functionally with product, engineering, and customer success teams',
    ],
  },
  {
    title: 'Founder & Principal Learning Experience Designer',
    company: 'DS Group LLC',
    period: '2014 - Present',
    description:
      'Independent consultancy specializing in learning experience design, e-learning development, and customer education strategy.',
    highlights: [
      'Delivered 550+ learning products across multiple industries',
      'Generated $300K+ in course revenue for client programs',
      'Designed PGA-accredited instructor certification programs',
      'Built continuing education platforms for veterinary and medical professionals',
    ],
  },
  {
    title: 'Learning Experience Designer',
    company: 'Amazon',
    period: '2021 - 2023',
    description:
      'Designed and developed learning experiences for internal teams at scale.',
    highlights: [
      'Created scalable training programs for large distributed teams',
      'Applied data-driven design methodologies to improve learning outcomes',
      'Developed blended learning solutions combining self-paced and instructor-led formats',
    ],
  },
  {
    title: 'Learning Experience Designer',
    company: 'Microsoft',
    period: '2019 - 2021',
    description:
      'Designed customer education and partner enablement programs for Microsoft products.',
    highlights: [
      'Developed customer-facing education content for product adoption',
      'Designed partner enablement programs to drive ecosystem growth',
      'Applied user research to improve learning experience effectiveness',
    ],
  },
  {
    title: 'Learning Experience Designer',
    company: 'Envestnet',
    period: '2017 - 2019',
    description:
      'Designed learning programs for financial services technology.',
    highlights: [
      'Created compliance and product training for financial advisors',
      'Developed interactive e-learning modules for fintech platform onboarding',
      'Managed LMS content strategy and learner analytics',
    ],
  },
];
