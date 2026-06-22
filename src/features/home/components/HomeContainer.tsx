import { HeroSection } from "./HeroSection";
import { WhatIDo } from "./WhatIDo";
import { CasesOfStudy } from "./CasesOfStudy";
import { AboutMe } from "./AboutMe";
import { ContactMe } from "./ContactMe";
import { Footer } from "./Footer";
import type { HomeCaseOfStudy, HomeService } from "../types";

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