import { Hero } from '@/components/sections/Hero';
import { Profile } from '@/components/sections/Profile';
import { Experience } from '@/components/sections/Experience';
import { Skills } from '@/components/sections/Skills';
import { Education } from '@/components/sections/Education';
import { Awards } from '@/components/sections/Awards';
import { Portfolio } from '@/components/sections/Portfolio';
import { Contact } from '@/components/sections/Contact';
import { getExperience } from '@/lib/data/experience';
import { getSkillCategories } from '@/lib/data/skills';
import { getEducation, getCredentials } from '@/lib/data/education';
import { getAwards, getEngagements } from '@/lib/data/awards';
import { getProjects } from '@/lib/data/projects';

export default function Home() {
  const experience = getExperience();
  const skillCategories = getSkillCategories();
  const education = getEducation();
  const credentials = getCredentials();
  const awards = getAwards();
  const engagements = getEngagements();
  const projects = getProjects();

  return (
    <>
      <Hero />
      <Profile />
      <Experience data={experience} />
      <Skills data={skillCategories} />
      <Education education={education} credentials={credentials} />
      <Awards awards={awards} engagements={engagements} />
      <Portfolio data={projects} />
      <Contact />
    </>
  );
}
