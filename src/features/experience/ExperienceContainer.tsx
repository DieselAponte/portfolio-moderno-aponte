import Aspirations from "./components/Aspirations";
import HeroSection from "./components/ExperienceHeroSection";
import College from "./components/Trayectory/College";
import CurrentlyWorkingOn from "./components/Trayectory/CurrentlyWorkingOn";
import Experience from "./components/Trayectory/ProfessionalExperience";
import { PublicationType } from "./types";
import type { FullPublication, EducationPublication, ProjectPublication, ExperiencePublication, ExperienceCertification, ExperienceCarouselItem } from "./types";

type ExperienceContainerProps = {
  publicaciones: FullPublication[];
  certifications: ExperienceCertification[];
  carouselItems: ExperienceCarouselItem[];
};

export default function ExperienceContainer({ publicaciones, certifications, carouselItems }: ExperienceContainerProps) {
  const educationPubs = publicaciones.filter((p): p is EducationPublication => p.type === PublicationType.EDUCATION);
  const projectPubs = publicaciones.filter((p): p is ProjectPublication => p.type === PublicationType.PROJECT);
  const experiencePubs = publicaciones.filter((p): p is ExperiencePublication => p.type === PublicationType.EXPERIENCE);

  return (
    <main className="relative w-full overflow-hidden">
      <HeroSection certifications={certifications} carouselItems={carouselItems} />
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
          {educationPubs.map((edu) => (
            <College key={edu.id} data={edu} />
          ))}
          {projectPubs.map((proj) => (
            <CurrentlyWorkingOn key={proj.id} data={proj} />
          ))}
          {experiencePubs.length > 0 && (
            <Experience data={experiencePubs} />
          )}
        </div>
      </section>

      <Aspirations />
    </main>
  );
}
