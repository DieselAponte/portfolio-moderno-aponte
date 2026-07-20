import { ExperienceCRUDContainer } from "../../../../features/admin-actions/experience/ExperienceCRUDContainer";
import {
  fetchCertifications,
  fetchCarouselItems,
} from "../../../../features/experience/services/experience.service";
import {
  fetchPublicaciones,
  fetchTechnologies,
  fetchTopics,
} from "../../../../features/experience/services/trayectory.service";

export default async function ExperienceModulePage() {
  const [certifications, carouselItems, publicaciones, technologies, topics] = await Promise.all([
    fetchCertifications(),
    fetchCarouselItems(),
    fetchPublicaciones(),
    fetchTechnologies(),
    fetchTopics(),
  ]);

  return (
    <ExperienceCRUDContainer
      certifications={certifications}
      carouselItems={carouselItems}
      publicaciones={publicaciones}
      technologies={technologies}
      topics={topics}
    />
  );
}
