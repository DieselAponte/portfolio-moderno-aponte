import { HomeCRUDContainer } from "../../../../features/admin-actions/home/HomeCRUDContainer";
import {
  fetchHomeServices,
  fetchCasesOfStudy,
} from "../../../../features/home/services/home.service";

export default async function AdminHomeModulePage() {
  const [services, casesOfStudy] = await Promise.all([
    fetchHomeServices(),
    fetchCasesOfStudy(),
  ]);

  return <HomeCRUDContainer services={services} casesOfStudy={casesOfStudy} />;
}
