import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { Game, TeamMember } from "@/types";

// Configuração do cliente Sanity
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  useCdn: true,
  apiVersion: "2024-01-01",
});

// Verificar se as variáveis de ambiente estão configuradas
if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  console.warn("⚠️ NEXT_PUBLIC_SANITY_PROJECT_ID não está configurado. Configure no arquivo .env.local");
}

// Builder para URLs de imagens
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// Tipos para os dados do Sanity
interface SanityGame {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  shortDescription: string;
  fullDescription?: any[];
  coverImage: any;
  screenshots?: any[];
  releaseDate: string;
  genre?: string;
  platformLinks?: {
    steam?: string;
    itch?: string;
    googlePlay?: string;
  };
  videoUrl?: string;
}

interface SanityMember {
  _id: string;
  name: string;
  slug?: {
    current: string;
  };
  avatar: any;
  bio?: any[];
  skills?: string[];
  favoriteGame?: string;
  linkedinUrl?: string;
  githubUrl?: string;
}

// Query GROQ para buscar todos os jogos
export const GAMES_QUERY = `*[_type == "game"] | order(releaseDate desc) {
  _id,
  title,
  slug,
  shortDescription,
  fullDescription,
  coverImage,
  screenshots,
  releaseDate,
  genre,
  platformLinks
}`;

// Query GROQ para buscar um jogo específico por slug
export const GAME_BY_SLUG_QUERY = `*[_type == "game" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  shortDescription,
  fullDescription,
  coverImage,
  screenshots,
  releaseDate,
  genre,
  platformLinks,
  videoUrl
}`;

// Função para buscar todos os jogos
// O cache é gerenciado pelo CDN do Sanity (useCdn: true)
// Para revalidação no Next.js, use fetch nativo ou configure no page.tsx
export async function getGames(): Promise<Game[]> {
  try {
    const games: SanityGame[] = await client.fetch(GAMES_QUERY);

    return games.map((game) => ({
      id: parseInt(game._id.replace(/[^0-9]/g, "")) || 0,
      title: game.title,
      slug: game.slug?.current || "",
      shortDescription: game.shortDescription,
      coverImage: game.coverImage
        ? urlFor(game.coverImage).width(800).height(600).url()
        : "/api/placeholder/800/600",
      screenshots: game.screenshots
        ? game.screenshots.map((screenshot: any) =>
            urlFor(screenshot).width(1920).height(1080).url()
          )
        : [],
      releaseDate: game.releaseDate,
      links: {
        ...(game.platformLinks?.steam && { steam: game.platformLinks.steam }),
        ...(game.platformLinks?.itch && { itch: game.platformLinks.itch }),
        ...(game.platformLinks?.googlePlay && { googlePlay: game.platformLinks.googlePlay }),
      },
    }));
  } catch (error) {
    console.error("Erro ao buscar jogos do Sanity:", error);
    // Retorna array vazio em caso de erro
    return [];
  }
}

// Query GROQ para buscar todos os membros da equipe
export const TEAM_QUERY = `*[_type == "member"] | order(name asc) {
  _id,
  name,
  slug,
  avatar,
  skills,
  linkedinUrl,
  githubUrl
}`;

// Query GROQ para buscar um membro específico por slug
export const MEMBER_BY_SLUG_QUERY = `*[_type == "member" && slug.current == $slug][0] {
  _id,
  name,
  slug,
  avatar,
  bio,
  skills,
  favoriteGame,
  linkedinUrl,
  githubUrl
}`;

// Função para buscar todos os membros da equipe
// O cache é gerenciado pelo CDN do Sanity (useCdn: true)
export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const members: SanityMember[] = await client.fetch(TEAM_QUERY);

    return members.map((member, index) => {
      // Determina o link social principal (prioridade: LinkedIn > GitHub)
      const socialLink = 
        member.linkedinUrl || 
        member.githubUrl || 
        "";

      // Pega o primeiro skill como role (para compatibilidade com código existente)
      const role = member.skills && member.skills.length > 0 ? member.skills[0] : "";

      return {
        id: parseInt(member._id.replace(/[^0-9]/g, "")) || index + 1,
        name: member.name,
        slug: member.slug?.current || "",
        role: role,
        photo: member.avatar
          ? urlFor(member.avatar).width(400).height(400).url()
          : "/api/placeholder/400/400",
        socialLink: socialLink,
        linkedinUrl: member.linkedinUrl,
        githubUrl: member.githubUrl,
        skills: member.skills || [],
      };
    });
  } catch (error) {
    console.error("Erro ao buscar membros do Sanity:", error);
    // Retorna array vazio em caso de erro
    return [];
  }
}

// Interface para o jogo completo (com fullDescription)
export interface GameDetails extends SanityGame {
  fullDescription: any[];
}

// Função para buscar um jogo específico por slug
export async function getGameBySlug(slug: string): Promise<GameDetails | null> {
  try {
    const game: SanityGame | null = await client.fetch(
      GAME_BY_SLUG_QUERY,
      { slug }
    );

    if (!game) {
      return null;
    }

    return {
      ...game,
      fullDescription: game.fullDescription || [],
    };
  } catch (error) {
    console.error("Erro ao buscar jogo do Sanity:", error);
    return null;
  }
}

// Função para buscar um membro específico por slug
export async function getMemberBySlug(slug: string): Promise<SanityMember | null> {
  try {
    const member: SanityMember | null = await client.fetch(
      MEMBER_BY_SLUG_QUERY,
      { slug }
    );

    if (!member) {
      return null;
    }

    return member;
  } catch (error) {
    console.error("Erro ao buscar membro do Sanity:", error);
    return null;
  }
}

// Função para buscar todos os slugs dos membros (para generateStaticParams)
export async function getAllMemberSlugs(): Promise<string[]> {
  try {
    const members = await client.fetch(
      `*[_type == "member" && defined(slug.current)] {
        "slug": slug.current
      }`
    );
    return members.map((member: { slug: string }) => member.slug);
  } catch (error) {
    console.error("Erro ao buscar slugs dos membros:", error);
    return [];
  }
}
