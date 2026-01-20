import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Gamepad2, Smartphone, Calendar, Tag } from "lucide-react";
import { getGameBySlug, urlFor, client, GAMES_QUERY } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import { PortableTextComponents } from "@portabletext/react";
import ImageGallery from "@/components/ImageGallery";
import VideoPlayer from "@/components/VideoPlayer";
import Container from "@/components/ui/Container";

// Componentes customizados para o PortableText
const portableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold tracking-wider text-white mb-4 font-[var(--font-orbitron)]">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold tracking-wider text-white mb-3 font-[var(--font-orbitron)]">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-bold tracking-wider text-slate-200 mb-2 font-[var(--font-orbitron)]">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="text-slate-400 mb-4 font-[var(--font-inter)] leading-relaxed">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-purple-500/50 pl-4 italic text-slate-400 my-4">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside text-slate-400 mb-4 space-y-2 font-[var(--font-inter)]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside text-slate-400 mb-4 space-y-2 font-[var(--font-inter)]">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-slate-200">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-slate-400">{children}</em>
    ),
    code: ({ children }) => (
      <code className="bg-slate-900/50 px-2 py-1 rounded text-cyan-400 font-mono text-sm">
        {children}
      </code>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-cyan-400 hover:text-cyan-300 underline transition-colors"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const imageUrl = urlFor(value).width(1200).height(675).url();
      return (
        <div className="my-6 rounded-lg overflow-hidden">
            <div className="relative aspect-video w-full rounded-lg overflow-hidden">
              <Image
                src={imageUrl}
                alt={value.alt || "Imagem"}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                className="object-cover"
              />
            </div>
        </div>
      );
    },
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Função para gerar páginas estáticas no build
export async function generateStaticParams() {
  try {
    const games = await client.fetch(GAMES_QUERY);
    
    return games.map((game: any) => ({
      slug: game.slug?.current || game.slug,
    }));
  } catch (error) {
    console.error("Erro ao gerar static params:", error);
    return [];
  }
}

// Função para gerar metadados dinâmicos
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const game = await getGameBySlug(slug);

  if (!game) {
    return {
      title: "Jogo não encontrado",
      description: "O jogo que você está procurando não foi encontrado.",
    };
  }

  const coverImageUrl = game.coverImage
    ? urlFor(game.coverImage).width(1200).height(630).url()
    : "/og-image.jpg";

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://teamstaircase.com";

  return {
    title: game.title,
    description: game.shortDescription,
    openGraph: {
      title: game.title,
      description: game.shortDescription,
      type: "website",
      url: `${siteUrl}/game/${slug}`,
      siteName: "Team Staircase",
      images: [
        {
          url: coverImageUrl,
          width: 1200,
          height: 630,
          alt: game.title,
        },
      ],
      locale: "pt_BR",
    },
    twitter: {
      card: "summary_large_image",
      title: game.title,
      description: game.shortDescription,
      images: [coverImageUrl],
      creator: "@teamstaircase",
    },
    alternates: {
      canonical: `${siteUrl}/game/${slug}`,
    },
  };
}

export default async function GamePage({ params }: PageProps) {
  const { slug } = await params;
  const game = await getGameBySlug(slug);

  if (!game) {
    notFound();
  }

  const coverImageUrl = game.coverImage
    ? urlFor(game.coverImage).width(1920).height(1080).url()
    : null;

  const screenshots = game.screenshots
    ? game.screenshots.map((screenshot: any) => ({
        url: urlFor(screenshot).width(1920).height(1080).url(),
        alt: screenshot.alt || game.title,
      }))
    : [];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 relative">
      {/* Botão Voltar - Topo absoluto esquerda */}
      <Link
        href="/"
        className="fixed top-24 left-4 sm:left-6 z-50 inline-flex items-center gap-2 px-4 py-2 bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-lg text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all duration-300 font-[var(--font-inter)]"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Voltar</span>
      </Link>

      {/* Hero Header com imagem de capa full-width */}
      <section className="relative w-full h-[60vh] overflow-hidden">
        {coverImageUrl ? (
          <Image
            src={coverImageUrl}
            alt={game.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-cyan-900/20"></div>
        )}
        
        {/* Overlay gradiente preto para legibilidade */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>
        
        {/* Conteúdo do Hero - Centralizado */}
        <div className="relative h-full flex items-center justify-center">
          <Container>
            <div className="text-center">
              {game.genre && (
                <span className="inline-block px-4 py-2 mb-4 bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-full text-cyan-400 text-sm font-medium font-[var(--font-inter)]">
                  {game.genre}
                </span>
              )}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-wider text-white font-[var(--font-orbitron)]">
                {game.title}
              </h1>
            </div>
          </Container>
        </div>
      </section>

      {/* Conteúdo Principal */}
      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Coluna da Esquerda (Texto + Galeria) */}
            <div className="lg:col-span-8 space-y-12">
              {/* Descrição Completa */}
              {game.fullDescription && game.fullDescription.length > 0 ? (
                <div className="prose prose-invert max-w-none">
                  <PortableText
                    value={game.fullDescription}
                    components={portableTextComponents}
                  />
                </div>
              ) : (
                <div className="text-slate-400 text-center font-[var(--font-inter)]">
                  <p>Descrição em breve...</p>
                </div>
              )}

              {/* Trailer do Jogo */}
              {game.videoUrl && (
                <div>
                  <h2 className="text-3xl font-bold tracking-wider text-white mb-6 font-[var(--font-orbitron)]">
                    Trailer
                  </h2>
                  <VideoPlayer url={game.videoUrl} title={`Trailer - ${game.title}`} />
                </div>
              )}

              {/* Galeria de Screenshots */}
              <ImageGallery screenshots={screenshots} title="Screenshots" />
            </div>

            {/* Coluna da Direita (Sidebar com botões) */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-xl p-6 space-y-6 flex flex-col">
                <h3 className="text-xl font-bold tracking-wider text-white font-[var(--font-orbitron)] mb-6">
                  Informações
                </h3>
                
                {/* Botões de Ação */}
                <div className="space-y-3 pb-6 border-b border-white/10">
                  {game.platformLinks?.steam ? (
                    <a
                      href={game.platformLinks.steam}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/20"
                    >
                      <ExternalLink className="w-5 h-5" />
                      Jogar na Steam
                    </a>
                  ) : null}
                  
                  {game.platformLinks?.itch ? (
                    <a
                      href={game.platformLinks.itch}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-lg font-medium text-white transition-all duration-300 hover:border-purple-500/50 hover:bg-slate-800/50 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20"
                    >
                      <Gamepad2 className="w-5 h-5" />
                      Baixar no Itch.io
                    </a>
                  ) : null}
                  
                  {game.platformLinks?.googlePlay ? (
                    <a
                      href={game.platformLinks.googlePlay}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-lg font-medium text-white transition-all duration-300 hover:border-green-500/50 hover:bg-slate-800/50 hover:scale-105 hover:shadow-lg hover:shadow-green-500/20"
                    >
                      <Smartphone className="w-5 h-5" />
                      Google Play
                    </a>
                  ) : null}
                  
                  {!game.platformLinks?.steam && !game.platformLinks?.itch && !game.platformLinks?.googlePlay && (
                    <p className="text-slate-400 text-sm text-center font-[var(--font-inter)]">
                      Links de download em breve
                    </p>
                  )}
                </div>

                {/* Detalhes Técnicos */}
                <div className="space-y-4">
                  {/* Gênero */}
                  {game.genre && (
                    <div className="flex items-start gap-3">
                      <Tag className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-slate-500 font-[var(--font-inter)] uppercase tracking-wider mb-1">
                          Gênero
                        </p>
                        <p className="text-slate-300 font-medium font-[var(--font-inter)]">
                          {game.genre}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Data de Lançamento */}
                  {game.releaseDate && (
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-slate-500 font-[var(--font-inter)] uppercase tracking-wider mb-1">
                          Lançamento
                        </p>
                        <p className="text-slate-300 font-medium font-[var(--font-inter)]">
                          {formatDate(game.releaseDate)}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Plataformas */}
                  <div className="flex items-start gap-3">
                    <Gamepad2 className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-slate-500 font-[var(--font-inter)] uppercase tracking-wider mb-1">
                        Plataformas
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {game.platformLinks?.steam && (
                          <span className="px-2 py-1 bg-slate-800/50 rounded text-xs text-slate-300 font-[var(--font-inter)]">
                            Steam
                          </span>
                        )}
                        {game.platformLinks?.itch && (
                          <span className="px-2 py-1 bg-slate-800/50 rounded text-xs text-slate-300 font-[var(--font-inter)]">
                            itch.io
                          </span>
                        )}
                        {game.platformLinks?.googlePlay && (
                          <span className="px-2 py-1 bg-slate-800/50 rounded text-xs text-slate-300 font-[var(--font-inter)]">
                            Android
                          </span>
                        )}
                        {!game.platformLinks?.steam && !game.platformLinks?.itch && !game.platformLinks?.googlePlay && (
                          <span className="text-slate-400 text-xs font-[var(--font-inter)]">
                            Em breve
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Equipe */}
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-xs text-slate-500 font-[var(--font-inter)] uppercase tracking-wider mb-2">
                      Equipe
                    </p>
                    <p className="text-slate-300 font-medium font-[var(--font-inter)]">
                      Team Staircase
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </div>
  );
}
