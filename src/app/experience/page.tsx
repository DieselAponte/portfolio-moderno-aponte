import ExperienceContainer from "../../features/experience/ExperienceContainer";
import { fetchModules, fetchSlides, fetchTechBubbles, fetchCertifications, fetchCarouselItems } from "../../features/experience/services/experience.service";

export default async function ExperiencePage() {
  const [modules, slides, techBubbles, certifications, carouselItems] = await Promise.all([
    fetchModules(),
    fetchSlides(),
    fetchTechBubbles(),
    fetchCertifications(),
    fetchCarouselItems(),
  ]);

  return (
    <ExperienceContainer
      modules={modules}
      slides={slides}
      techBubbles={techBubbles}
      certifications={certifications}
      carouselItems={carouselItems}
    />
  );
}
