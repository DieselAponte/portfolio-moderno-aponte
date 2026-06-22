import Aspirations from "./Aspirations";
import HeroSection from "./HeroSection";
import College from "./Trayectory/College";
import CurrentlyWorkingOn from "./Trayectory/CurrentlyWorkingOn";
import Experience from "./Trayectory/Experience";
import type { TrajectorySectionData, ExperienceSlide, TechBubble } from "../types";

type ExperienceContainerProps = {
  modules: TrajectorySectionData[];
  slides: ExperienceSlide[];
  techBubbles: TechBubble[];
};

export default function ExperienceContainer({ modules, slides, techBubbles }: ExperienceContainerProps) {
  const collegeModule = modules.find(m => m.id === "01");
  const currentlyWorkingModule = modules.find(m => m.id === "02");
  const experienceModule = modules.find(m => m.id === "03");

  return (
    <main className="relative w-full overflow-hidden">
      <HeroSection />
      <section id="trayectory" className="relative">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[#0a0a0c]/[0.005]">
          <video
            className="absolute inset-0 h-full w-full object-cover blur-sm opacity-50"
            src="/videos/experience-loop.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />
        </div>

        <div className="relative mx-auto w-full max-w-6xl space-y-24 px-6 py-24">
          {collegeModule && <College data={collegeModule} />}
          {currentlyWorkingModule && <CurrentlyWorkingOn data={currentlyWorkingModule} techBubbles={techBubbles} />}
          {experienceModule && <Experience data={experienceModule} slides={slides} />}
        </div>
      </section>

      <Aspirations />
    </main>
  );
}
