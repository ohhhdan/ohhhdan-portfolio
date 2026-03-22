import { Hero } from '@/components/sections/Hero';
import { Profile } from '@/components/sections/Profile';
import { Experience } from '@/components/sections/Experience';
import { Skills } from '@/components/sections/Skills';
import { Education } from '@/components/sections/Education';
import { Awards } from '@/components/sections/Awards';
import { Portfolio } from '@/components/sections/Portfolio';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <Profile />
      <Experience />
      <Skills />
      <Education />
      <Awards />
      <Portfolio />
      <Contact />
    </>
  );
}
