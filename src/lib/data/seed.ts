/**
 * One-time migration script: converts hardcoded data to JSON files.
 * Run with: npx tsx src/lib/data/seed.ts
 */

import { randomUUID } from 'crypto';
import { writeCollection, writeSingleton, getSingleton } from './db';
import type {
  Profile,
  ExperienceItem,
  Project,
  EducationItem,
  CredentialItem,
  AwardItem,
  EngagementItem,
  SkillCategoryItem,
} from './types';

// Check if already seeded
const existing = getSingleton<Profile>('profile');
if (existing) {
  console.log('Data already seeded. Delete data/*.json to re-seed.');
  process.exit(0);
}

console.log('Seeding data...');

// Profile
const profile: Profile = {
  name: 'Dan Winter',
  tagline: 'Full-stack learning experience designer with a personality',
  headline: 'Staff Learning Experience Designer',
  summary:
    'I design learning experiences that actually work. With 15+ years in L&D and customer education, I bring a full-stack approach to instructional design — from needs analysis and curriculum architecture to interactive development and data-driven iteration.',
  location: 'United States',
};
writeSingleton('profile', profile);

// Experience
const experience: ExperienceItem[] = [
  {
    id: randomUUID(), sortOrder: 0,
    title: 'Staff Learning Experience Designer',
    company: 'Okta',
    period: '2023 - Present',
    description: 'Leading learning experience design for identity and access management education at a major enterprise security company.',
    highlights: [
      'Designing AI-powered interactive learning experiences using Parta.io',
      'Developing scalable customer education programs for IAM products',
      'Building SCORM-compliant courses with advanced interactivity',
      'Collaborating cross-functionally with product, engineering, and customer success teams',
    ],
  },
  {
    id: randomUUID(), sortOrder: 1,
    title: 'Founder & Principal Learning Experience Designer',
    company: 'DS Group LLC',
    period: '2014 - Present',
    description: 'Independent consultancy specializing in learning experience design, e-learning development, and customer education strategy.',
    highlights: [
      'Delivered 550+ learning products across multiple industries',
      'Generated $300K+ in course revenue for client programs',
      'Designed PGA-accredited instructor certification programs',
      'Built continuing education platforms for veterinary and medical professionals',
    ],
  },
  {
    id: randomUUID(), sortOrder: 2,
    title: 'Learning Experience Designer',
    company: 'Amazon',
    period: '2021 - 2023',
    description: 'Designed and developed learning experiences for internal teams at scale.',
    highlights: [
      'Created scalable training programs for large distributed teams',
      'Applied data-driven design methodologies to improve learning outcomes',
      'Developed blended learning solutions combining self-paced and instructor-led formats',
    ],
  },
  {
    id: randomUUID(), sortOrder: 3,
    title: 'Learning Experience Designer',
    company: 'Microsoft',
    period: '2019 - 2021',
    description: 'Designed customer education and partner enablement programs for Microsoft products.',
    highlights: [
      'Developed customer-facing education content for product adoption',
      'Designed partner enablement programs to drive ecosystem growth',
      'Applied user research to improve learning experience effectiveness',
    ],
  },
  {
    id: randomUUID(), sortOrder: 4,
    title: 'Learning Experience Designer',
    company: 'Envestnet',
    period: '2017 - 2019',
    description: 'Designed learning programs for financial services technology.',
    highlights: [
      'Created compliance and product training for financial advisors',
      'Developed interactive e-learning modules for fintech platform onboarding',
      'Managed LMS content strategy and learner analytics',
    ],
  },
];
writeCollection('experience', experience);

// Projects
const projects: Project[] = [
  {
    id: randomUUID(), sortOrder: 0,
    slug: 'okta-explore-iam',
    title: 'Explore Identity and Access Management',
    client: 'Okta',
    description: 'An AI-powered interactive learning experience that introduces learners to identity and access management concepts through guided exploration and scenario-based practice.',
    role: 'Staff Learning Experience Designer',
    challenge: 'Identity and access management is a complex technical domain that can overwhelm newcomers. Okta needed an engaging, accessible entry point for customers and prospects to understand IAM fundamentals without requiring deep security expertise.',
    solution: 'Designed an AI-generated interactive experience using Parta.io that adapts to learner responses and provides personalized feedback. The course uses scenario-based learning to contextualize abstract IAM concepts in real-world situations, making the content approachable and memorable.',
    results: ['Launched as a flagship customer education offering', 'Leveraged AI to create dynamic, personalized learning paths', 'Reduced time-to-understanding for IAM concepts', 'Scalable format supporting self-paced learning across global audiences'],
    technologies: ['Parta.io', 'AI-Generated Interactions', 'SCORM'],
    scormPackageId: 'okta-explore-iam',
  },
  {
    id: randomUUID(), sortOrder: 1,
    slug: 'acvim-veterinary-ce',
    title: 'Veterinary Continuing Education',
    client: 'ACVIM (American College of Veterinary Internal Medicine)',
    description: 'A comprehensive continuing education platform for veterinary professionals, delivering accredited coursework in internal medicine specialties.',
    role: 'Learning Experience Designer',
    challenge: 'Veterinary professionals require ongoing continuing education credits to maintain their certifications, but existing options were limited in interactivity and accessibility. ACVIM needed a modern digital learning platform that met accreditation standards while engaging busy practitioners.',
    solution: 'Built a full continuing education platform using Articulate 360 and Moodle, featuring interactive case studies, clinical scenario simulations, and knowledge assessments. Designed the curriculum to meet RACE (Registry of Approved Continuing Education) accreditation requirements.',
    results: ['Successfully launched accredited CE courses for veterinary specialists', 'Increased learner engagement through interactive clinical scenarios', 'Met RACE accreditation standards for continuing education credits', 'Enabled self-paced learning for time-constrained veterinary professionals'],
    technologies: ['Articulate 360', 'Moodle', 'SCORM'],
    scormPackageId: 'acvim-vet-ce',
  },
  {
    id: randomUUID(), sortOrder: 2,
    slug: 'superspeed-golf-certification',
    title: 'PGA-Accredited Instructor Certification',
    client: 'SuperSpeed Golf',
    description: 'A PGA-accredited certification program for golf instructors on the SuperSpeed Golf training system, combining sport science education with practical coaching methodology.',
    role: 'Learning Experience Designer',
    challenge: 'SuperSpeed Golf needed a certification program that would earn PGA accreditation while teaching instructors the science and methodology behind their speed training system. The program had to be rigorous enough for professional accreditation yet practical enough for immediate coaching application.',
    solution: 'Designed a multi-module certification course using Articulate 360, integrating sport science content with video demonstrations and practical assessments. Built the program on Moodle with tracking and certification workflows aligned to PGA accreditation requirements.',
    results: ['Achieved PGA accreditation for the instructor certification program', 'Trained and certified golf instructors worldwide', 'Established SuperSpeed Golf as a credentialed training methodology', 'Created a scalable certification pipeline supporting business growth'],
    technologies: ['Articulate 360', 'Moodle', 'SCORM', 'Video Production'],
    scormPackageId: 'superspeed-golf',
  },
  {
    id: randomUUID(), sortOrder: 3,
    slug: 'id9-soft-skills',
    title: 'Soft-Skills Curriculum',
    client: 'ID9 (ID9 Intelligent Design)',
    description: 'A comprehensive soft-skills curriculum encompassing 550+ learning products covering communication, leadership, emotional intelligence, and professional development.',
    role: 'Learning Experience Designer',
    challenge: 'ID9 needed a massive library of soft-skills content that could serve diverse organizations and learner populations. The challenge was maintaining quality and instructional integrity across hundreds of products while ensuring each module was standalone yet part of a cohesive curriculum.',
    solution: 'Developed a systematic content production workflow to design, build, and quality-assure 550+ learning products. Each module followed a consistent instructional framework while addressing specific soft-skill competencies, enabling organizations to mix and match content for their needs.',
    results: ['Delivered 550+ learning products across soft-skill competency areas', 'Created a scalable content library serving multiple client organizations', 'Maintained consistent instructional quality across the full curriculum', 'Enabled flexible deployment for diverse organizational learning needs'],
    technologies: ['Articulate 360', 'SCORM', 'Content Management'],
  },
  {
    id: randomUUID(), sortOrder: 4,
    slug: 'piano-technician-academy',
    title: 'Interactive Tuning & Repair Courses',
    client: 'Piano Technician Academy',
    description: 'An interactive online education platform teaching piano tuning, repair, and regulation techniques, generating over $300K in course revenue.',
    role: 'Learning Experience Designer',
    challenge: 'Piano tuning and repair is a highly specialized craft traditionally taught through in-person apprenticeships. The Piano Technician Academy needed to translate hands-on technical skills into effective online learning while building a sustainable revenue-generating education business.',
    solution: 'Created a comprehensive course catalog using Articulate 360 with rich multimedia content including close-up video demonstrations, interactive simulations, and step-by-step procedural guides. Built the platform on LearnUpon with e-commerce integration to support course sales and learner management.',
    results: ['Generated $300K+ in course revenue', 'Built a self-sustaining online education business model', 'Enabled learners worldwide to develop piano technician skills remotely', 'Created a repeatable content production pipeline for new courses'],
    technologies: ['Articulate 360', 'LearnUpon', 'SCORM', 'Video Production'],
    scormPackageId: 'piano-tech-academy',
  },
  {
    id: randomUUID(), sortOrder: 5,
    slug: 'ethosvet-ecg',
    title: 'ECG Interpretation Training',
    client: 'EthosVet',
    description: 'A specialized e-learning course teaching veterinary professionals how to accurately interpret electrocardiogram readings in clinical practice.',
    role: 'Learning Experience Designer',
    challenge: 'ECG interpretation is a critical clinical skill that requires pattern recognition and systematic analysis. EthosVet needed training that could develop this expertise in veterinary professionals who may not have extensive cardiology backgrounds, while ensuring clinical accuracy.',
    solution: 'Designed an interactive course using Articulate 360 with authentic ECG strip analysis exercises, progressive difficulty scaffolding, and immediate feedback on interpretation accuracy. Incorporated real clinical cases to build practical diagnostic confidence.',
    results: ['Delivered specialized ECG training for veterinary professionals', 'Improved clinical confidence in electrocardiogram interpretation', 'Created reusable assessment framework for clinical skill evaluation', 'Reduced reliance on in-person cardiology training sessions'],
    technologies: ['Articulate 360', 'SCORM'],
    scormPackageId: 'ethosvet-ecg',
  },
  {
    id: randomUUID(), sortOrder: 6,
    slug: 'randstad-singapore',
    title: 'Job Specialization Recruiter Training',
    client: 'Randstad Singapore',
    description: 'A targeted training program for Randstad Singapore recruiters on job specialization techniques, improving placement accuracy and client service quality.',
    role: 'Learning Experience Designer',
    challenge: 'Randstad Singapore needed to upskill their recruitment team on specialization strategies to improve placement quality and client satisfaction. The training had to accommodate busy recruiters across different experience levels and specialization areas.',
    solution: 'Designed a modular training program covering job market analysis, candidate assessment techniques, and specialization best practices. Built interactive scenarios based on real recruitment situations to develop practical decision-making skills.',
    results: ['Trained recruitment teams across Randstad Singapore offices', 'Improved recruiter specialization knowledge and placement quality', 'Created a reusable onboarding resource for new recruiters', 'Standardized recruitment best practices across the organization'],
    technologies: ['Articulate 360', 'SCORM'],
  },
  {
    id: randomUUID(), sortOrder: 7,
    slug: 'circle-education-leadership',
    title: 'Leadership Development for Educators',
    client: 'Circle Education',
    description: 'A leadership development program designed for Australian educators, building management and instructional leadership capabilities across educational institutions.',
    role: 'Learning Experience Designer',
    challenge: 'Australian educators moving into leadership roles needed structured professional development that addressed the unique challenges of educational leadership, from instructional coaching to school management, while fitting into demanding school schedules.',
    solution: 'Created a blended leadership development program combining self-paced e-learning modules with reflective practice activities. Designed content around Australian educational standards and leadership frameworks, with practical tools educators could apply immediately in their schools.',
    results: ['Delivered leadership training for educators across Australian institutions', 'Built practical leadership competencies aligned to educational standards', 'Created a flexible learning pathway accommodating educator schedules', 'Supported the professional growth pipeline for educational leaders'],
    technologies: ['Articulate 360', 'SCORM', 'Blended Learning'],
  },
  {
    id: randomUUID(), sortOrder: 8,
    slug: 'new-york-life-compliance',
    title: 'Annuities Compliance Training',
    client: 'New York Life',
    description: 'A regulatory compliance training program on annuity products for New York Life financial professionals, ensuring adherence to industry regulations and company standards.',
    role: 'Learning Experience Designer',
    challenge: 'Financial professionals at New York Life required mandatory compliance training on annuity products and regulations. The training needed to be thorough enough to satisfy regulatory requirements while remaining engaging enough to drive genuine understanding rather than passive completion.',
    solution: 'Designed scenario-based compliance training that contextualizes regulations within realistic client interaction situations. Used branching scenarios to let learners practice compliant decision-making and experience the consequences of regulatory violations in a safe environment.',
    results: ['Met regulatory compliance training requirements for financial professionals', 'Improved understanding of annuity regulations through scenario-based learning', 'Achieved high completion rates across the target audience', 'Reduced compliance-related errors through practical application exercises'],
    technologies: ['Articulate 360', 'SCORM', 'LMS Integration'],
  },
];
writeCollection('projects', projects);

// Education
const education: EducationItem[] = [
  { id: randomUUID(), sortOrder: 0, degree: 'Master of Science in Instructional Design and Technology', institution: 'Western Governors University', year: '2018' },
  { id: randomUUID(), sortOrder: 1, degree: 'Bachelor of Science in Business Management', institution: 'Western Governors University', year: '2015' },
];
writeCollection('education', education);

// Credentials
const credentials: CredentialItem[] = [
  { id: randomUUID(), sortOrder: 0, name: 'Certified Professional in Talent Development (CPTD)', issuer: 'Association for Talent Development (ATD)', year: '2020' },
  { id: randomUUID(), sortOrder: 1, name: 'Articulate Storyline Certified Developer', issuer: 'Articulate', year: '2019' },
];
writeCollection('credentials', credentials);

// Awards
const awards: AwardItem[] = [
  { id: randomUUID(), sortOrder: 0, name: 'CEdMA Pinnacle Award', org: 'Customer Education Management Association (CEdMA)', year: '2024', description: 'Recognized for excellence in customer education program design and measurable impact on learner outcomes.' },
];
writeCollection('awards', awards);

// Engagements
const engagements: EngagementItem[] = [
  { id: randomUUID(), sortOrder: 0, name: 'Customer Education Management Association (CEdMA)', role: 'Member', description: 'Active member contributing to the advancement of customer education practices and standards.' },
  { id: randomUUID(), sortOrder: 1, name: 'Association for Talent Development (ATD)', role: 'Member', description: 'Engaged in professional development and knowledge sharing within the talent development community.' },
  { id: randomUUID(), sortOrder: 2, name: 'Learning & Development Community', role: 'Speaker & Contributor', description: 'Regular contributor to L&D discussions, sharing insights on instructional design, e-learning, and AI in education.' },
];
writeCollection('engagements', engagements);

// Skills
const skillCategories: SkillCategoryItem[] = [
  { id: randomUUID(), sortOrder: 0, name: 'Design', skills: ['ADDIE', 'SAM', 'Design Thinking', 'Instructional Design', 'Curriculum Development', 'Content Development', 'E-Learning Design', 'User Research', 'Needs Analysis', 'Assessment Design', 'Storyboarding'] },
  { id: randomUUID(), sortOrder: 1, name: 'Technical', skills: ['SCORM', 'xAPI', 'HTML/CSS', 'JavaScript', 'Responsive Design', 'Accessibility (WCAG)', 'LMS Administration', 'Data Analysis', 'Learning Analytics', 'API Integration'] },
  { id: randomUUID(), sortOrder: 2, name: 'Leadership', skills: ['Program Management', 'Project Management', 'Stakeholder Management', 'Cross-Functional Collaboration', 'Vendor Management', 'Team Leadership', 'Strategic Planning', 'Customer Education Strategy'] },
  { id: randomUUID(), sortOrder: 3, name: 'Tools', skills: ['Articulate 360 (Storyline & Rise)', 'Camtasia', 'Figma', 'Adobe Creative Suite', 'Moodle', 'LearnUpon', 'Parta.io', 'AI Tools (Gemini, OpenAI, Claude)', 'Google Workspace', 'Microsoft 365'] },
];
writeCollection('skills', skillCategories);

console.log('Seed complete! JSON files written to data/');
