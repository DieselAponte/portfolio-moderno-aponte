import { HeroSection } from "./HeroSection";
import { WhatIDo } from "./WhatIDo";
import { CasesOfStudy } from "./CasesOfStudy";
import { AboutMe } from "./AboutMe";
import { ContactMe } from "./ContactMe";
import { Footer } from "./Footer";

export const HomeContainer = () => {
  return (
    <main className="relative w-full">

      <section id="hero" className="h-screen w-full">
        <HeroSection />
      </section>

      <section id="what-i-do" className="py-20 px-6">
        <WhatIDo />
      </section>

      <section id="cases" className="py-20 bg-aperture-dark/30">
        <CasesOfStudy />
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