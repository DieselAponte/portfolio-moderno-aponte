import { ExperienceCRUDContainer } from "../../../../features/admin-actions/experience/ExperienceCRUDContainer";
import {
  fetchCertifications,
  fetchCarouselItems,
} from "../../../../features/experience/services/experience.service";

export default async function ExperienceModulePage() {
  const [certifications, carouselItems] = await Promise.all([
    fetchCertifications(),
    fetchCarouselItems(),
  ]);

  return (
    <ExperienceCRUDContainer
      certifications={certifications}
      carouselItems={carouselItems}
    />
  );
}
