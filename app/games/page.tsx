import { getGames } from "@/lib/sanity";
import Container from "@/components/ui/Container";
import GameCard from "@/components/GameCard";

// Revalidar a página a cada 10 segundos (para atualizações mais rápidas após mudanças no CMS)
export const revalidate = 10;
export const dynamic = 'force-dynamic';

export const metadata = {
  title: "Jogos | Team Staircase",
  description: "Explore todos os jogos desenvolvidos pelo Team Staircase. Descubra mundos digitais imersivos e experiências únicas.",
};

export default async function GamesPage() {
  const games = await getGames();

  return (
    <section className="py-20">
      <Container>
        <div className="text-center mb-16 flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider text-white mb-4 font-[var(--font-orbitron)]">
            Nossos Jogos
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-3xl mx-auto font-[var(--font-inter)]">
            Explore os mundos digitais que criamos com paixão e dedicação
          </p>
        </div>

        {games.length === 0 ? (
          <div className="text-center py-24">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-purple-600/20 to-cyan-600/20 mb-8">
              <span className="text-5xl">🎮</span>
            </div>
            <h3 className="text-3xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-4 font-[var(--font-orbitron)]">
              Em breve novos projetos
            </h3>
            <p className="text-slate-400 max-w-md mx-auto text-lg font-[var(--font-inter)]">
              Estamos trabalhando em projetos incríveis. Volte em breve para ver nossos jogos!
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center items-start gap-12 md:gap-16">
            {games.map((game) => (
              <div key={game.id} className="w-full max-w-[400px]">
                <GameCard game={game} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
