import { HomeContainer } from "../features/home/components/HomeContainer";
import { fetchCasesOfStudy, fetchHomeServices } from "../features/home/services/home.service";

export default async function Home() {
  const [services, casesOfStudy] = await Promise.all([
    fetchHomeServices(),
    fetchCasesOfStudy()
  ]);

  return <HomeContainer services={services} casesOfStudy={casesOfStudy} />;
}
