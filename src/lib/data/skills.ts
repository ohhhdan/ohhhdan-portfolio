export interface SkillCategoryItem {
  name: string;
  skills: string[];
}

export const skillCategories: SkillCategoryItem[] = [
  {
    name: 'Design',
    skills: [
      'ADDIE', 'SAM', 'Design Thinking', 'Instructional Design',
      'Curriculum Development', 'Content Development', 'E-Learning Design',
      'User Research', 'Needs Analysis', 'Assessment Design', 'Storyboarding',
    ],
  },
  {
    name: 'Technical',
    skills: [
      'SCORM', 'xAPI', 'HTML/CSS', 'JavaScript', 'Responsive Design',
      'Accessibility (WCAG)', 'LMS Administration', 'Data Analysis',
      'Learning Analytics', 'API Integration',
    ],
  },
  {
    name: 'Leadership',
    skills: [
      'Program Management', 'Project Management', 'Stakeholder Management',
      'Cross-Functional Collaboration', 'Vendor Management', 'Team Leadership',
      'Strategic Planning', 'Customer Education Strategy',
    ],
  },
  {
    name: 'Tools',
    skills: [
      'Articulate 360 (Storyline & Rise)', 'Camtasia', 'Figma',
      'Adobe Creative Suite', 'Moodle', 'LearnUpon', 'Parta.io',
      'AI Tools (Gemini, OpenAI, Claude)', 'Google Workspace', 'Microsoft 365',
    ],
  },
];
