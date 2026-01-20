import Hero from "@/components/Hero";
import FeaturedGames from "@/components/FeaturedGames";
import AboutSummary from "@/components/AboutSummary";
import { getGames } from "@/lib/sanity";

// Revalidar a página a cada 60 segundos
export const revalidate = 60;

export const metadata = {
  title: "Team Staircase | Game Studio",
  description: "Team Staircase é um estúdio de desenvolvimento de jogos criando mundos digitais imersivos e experiências únicas. Explore nossos jogos e junte-se à aventura!",
};

export default async function Home() {
  const allGames = await getGames();

  // Pegar apenas os 3 jogos mais recentes
  const featuredGames = allGames.slice(0, 3);

  return (
    <div className="flex flex-col w-full">
      <Hero />
      <div className="pt-16">
        <FeaturedGames games={featuredGames} />
      </div>
      <AboutSummary />
    </div>
  );
}
