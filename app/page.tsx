import { NavBar } from '@/src/components/NavBar';
import { NavDots } from '@/src/components/NavDots';
import { HeroSection } from '@/src/components/HeroSection';
import { AboutSection } from '@/src/components/AboutSection';
import { WorkSection } from '@/src/components/WorkSection';
import { TechStackSection } from '@/src/components/TechStackSection';
import { ContactFooter } from '@/src/components/ContactFooter';
import { SmoothScrollProvider } from '@/src/components/SmoothScrollProvider';
import { CustomCursor } from '@/src/components/CustomCursor';
import { SkipLink } from '@/src/components/SkipLink';

export default function HomePage() {
  return (
    <SmoothScrollProvider>
      <SkipLink />
      <CustomCursor />
      <NavBar />
      <NavDots />
      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <WorkSection />
        <TechStackSection />
        <ContactFooter />
      </main>
    </SmoothScrollProvider>
  );
}
