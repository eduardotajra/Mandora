import { getTeamMembers } from "@/lib/sanity";
import AboutContent from "@/components/AboutContent";
import Container from "@/components/ui/Container";

// Revalidar a página a cada 60 segundos
export const revalidate = 60;

export const metadata = {
  title: "Sobre Nós | Team Staircase",
  description: "Conheça o Team Staircase, um estúdio de desenvolvimento de jogos dedicado a criar experiências únicas e memoráveis no universo digital.",
};

export default async function AboutPage() {
  const teamMembers = await getTeamMembers();

  return (
    <section className="py-20">
      <Container>
        {/* Todo o conteúdo (Título, Cards, História, Equipe) VEM AQUI DENTRO */}
        <div className="flex flex-col gap-20 text-center items-center">
          <AboutContent teamMembers={teamMembers} />
        </div>
      </Container>
    </section>
  );
}
