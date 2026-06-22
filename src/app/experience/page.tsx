import ExperienceContainer from "../../features/experience/components/ExperienceContainer";
import { fetchModules, fetchSlides, fetchTechBubbles } from "../../features/experience/services/experience.service";

export default async function ExperiencePage() {
  const [modules, slides, techBubbles] = await Promise.all([
    fetchModules(),
    fetchSlides(),
    fetchTechBubbles()
  ]);

  return <ExperienceContainer modules={modules} slides={slides} techBubbles={techBubbles} />;
}
