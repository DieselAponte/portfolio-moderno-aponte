import { HeroSection } from "./components/HeroSection/HomeHeroSection";
import { WhatIDo } from "./components/WhatIDo";
import { CasesOfStudy } from "./components/CasesOfStudy";
import { AboutMe } from "./components/AboutMe";
import { ContactMe } from "./components/ContactMe";
import { Footer } from "./components/Footer";
import type { HomeCaseOfStudy, HomeService } from "./types";

type HomeContainerProps = {
  services: HomeService[];
  casesOfStudy: HomeCaseOfStudy[];
};

export const HomeContainer = ({ services, casesOfStudy }: HomeContainerProps) => {
  return (
    <main className="relative w-full">

      <section id="hero" className="h-screen w-full">
        <HeroSection />
      </section>

      <section id="what-i-do" className="py-20 px-6">
        <WhatIDo services={services} />
      </section>

      <section id="cases" className="py-20 bg-aperture-dark/30">
        <CasesOfStudy cases={casesOfStudy} />
      </section>

      <section id="about" className="py-20 bg-aperture-dark/30">
        <AboutMe />
      </section>

      <section id="contact" className="py-20 px-6">
        <ContactMe />
      </section>

      <Footer />
    </main>
  );
};