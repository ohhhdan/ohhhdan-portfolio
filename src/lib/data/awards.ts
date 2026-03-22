export interface AwardItem {
  name: string;
  org: string;
  year?: string;
  description?: string;
}

export interface EngagementItem {
  name: string;
  role: string;
  description?: string;
}

export const awards: AwardItem[] = [
  {
    name: 'CEdMA Pinnacle Award',
    org: 'Customer Education Management Association (CEdMA)',
    year: '2024',
    description:
      'Recognized for excellence in customer education program design and measurable impact on learner outcomes.',
  },
];

export const engagements: EngagementItem[] = [
  {
    name: 'Customer Education Management Association (CEdMA)',
    role: 'Member',
    description:
      'Active member contributing to the advancement of customer education practices and standards.',
  },
  {
    name: 'Association for Talent Development (ATD)',
    role: 'Member',
    description:
      'Engaged in professional development and knowledge sharing within the talent development community.',
  },
  {
    name: 'Learning & Development Community',
    role: 'Speaker & Contributor',
    description:
      'Regular contributor to L&D discussions, sharing insights on instructional design, e-learning, and AI in education.',
  },
];
