import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Linkedin, Github, Gamepad2 } from "lucide-react";
import { getMemberBySlug, getAllMemberSlugs, urlFor, client } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import { PortableTextComponents } from "@portabletext/react";
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
      <p className="text-slate-300 mb-4 font-[var(--font-inter)] leading-relaxed">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-purple-500/50 pl-4 italic text-slate-300 my-4">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside text-slate-300 mb-4 space-y-2 font-[var(--font-inter)]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside text-slate-300 mb-4 space-y-2 font-[var(--font-inter)]">
        {children}
      </ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic text-slate-200">{children}</em>,
    code: ({ children }) => (
      <code className="bg-slate-900/50 px-2 py-1 rounded text-cyan-400 text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ children, value }) => (
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
      const imageUrl = urlFor(value).width(800).height(600).url();
      return (
        <div className="my-6">
          <Image
            src={imageUrl}
            alt={value.alt || "Imagem"}
            width={800}
            height={600}
            className="rounded-lg w-full h-auto"
          />
        </div>
      );
    },
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Gerar páginas estáticas no build
export async function generateStaticParams() {
  const slugs = await getAllMemberSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Metadata dinâmica
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const member = await getMemberBySlug(resolvedParams.slug);

  if (!member) {
    return {
      title: "Membro não encontrado | Team Staircase",
    };
  }

  const avatarUrl = member.avatar
    ? urlFor(member.avatar).width(1200).height(630).url()
    : "/og-image.jpg";

  const roleDescription = member.skills && member.skills.length > 0 
    ? member.skills[0] 
    : "Membro do Team Staircase";

  return {
    title: `${member.name} | Team Staircase`,
    description: `${roleDescription} - ${member.name} do Team Staircase`,
    openGraph: {
      title: `${member.name} | Team Staircase`,
      description: `${roleDescription} - ${member.name} do Team Staircase`,
      images: [avatarUrl],
    },
  };
}

export default async function MemberPage({ params }: PageProps) {
  const resolvedParams = await params;
  const member = await getMemberBySlug(resolvedParams.slug);

  if (!member) {
    notFound();
  }

  const avatarUrl = member.avatar
    ? urlFor(member.avatar).width(400).height(400).url()
    : null;

  // Criar array único de tags (skills, sem duplicatas)
  const allTags = (member.skills || []).filter((tag): tag is string => Boolean(tag) && tag.trim() !== "");
  const uniqueTags = Array.from(new Set(allTags.map(tag => tag.trim())));

  return (
    <div className="min-h-screen bg-slate-950 relative">
      {/* Botão Voltar */}
      <Link
        href="/about"
        className="fixed top-24 left-4 sm:left-6 z-50 inline-flex items-center gap-2 px-4 py-2 bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-lg text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-all duration-300 font-[var(--font-inter)]"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Voltar</span>
      </Link>

      {/* Conteúdo Principal */}
      <section className="py-20">
        <Container>
          {/* Hero Section - Avatar Gigante + Nome + Links Sociais */}
          <div className="flex flex-col items-center text-center mb-16">
            {/* Avatar Gigante - Protagonista */}
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-purple-500/30 ring-4 ring-purple-500/10 mx-auto mb-8 shadow-[0_0_50px_rgba(168,85,247,0.5)]">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 256px, 320px"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center">
                  <span className="text-8xl md:text-9xl text-white">
                    {member.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            {/* Nome */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider text-white mb-4 font-[var(--font-orbitron)]">
              {member.name}
            </h1>

            {/* Links Sociais Pessoais */}
            {(member.linkedinUrl || member.githubUrl) && (
              <div className="flex items-center gap-6 justify-center mt-6">
                {member.linkedinUrl && (
                  <a
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 flex items-center justify-center rounded-full bg-slate-900/50 backdrop-blur-md border border-white/10 text-slate-300 hover:text-cyan-400 hover:border-purple-500/50 hover:bg-slate-800/50 hover:shadow-lg hover:shadow-purple-500/20 hover:scale-110 transition-all duration-300"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-7 h-7" />
                  </a>
                )}
                {member.githubUrl && (
                  <a
                    href={member.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 flex items-center justify-center rounded-full bg-slate-900/50 backdrop-blur-md border border-white/10 text-slate-300 hover:text-cyan-400 hover:border-purple-500/50 hover:bg-slate-800/50 hover:shadow-lg hover:shadow-purple-500/20 hover:scale-110 transition-all duration-300"
                    aria-label="GitHub"
                  >
                    <Github className="w-7 h-7" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Grid de Conteúdo */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Coluna Esquerda (2/3) - Bio */}
            <div className="lg:col-span-2 space-y-8">
              {/* Bio */}
              {member.bio && member.bio.length > 0 ? (
                <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-10">
                  <div className="prose prose-invert max-w-none">
                    <PortableText
                      value={member.bio}
                      components={portableTextComponents}
                    />
                  </div>
                </div>
              ) : (
                <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-10 text-center">
                  <p className="text-slate-400 font-[var(--font-inter)] text-lg">
                    Biografia em breve...
                  </p>
                </div>
              )}
            </div>

            {/* Coluna Direita (1/3) - Sidebar Info */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Card Specialties */}
                {uniqueTags.length > 0 && (
                  <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                    <h3 className="text-2xl font-bold tracking-wider text-white mb-6 font-[var(--font-orbitron)]">
                      Funções
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {uniqueTags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-slate-800/80 border border-white/10 text-cyan-400 text-sm px-4 py-1.5 rounded-full font-medium font-[var(--font-inter)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Card Favorite Game */}
                {member.favoriteGame && (
                  <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-6">
                    <h3 className="text-2xl font-bold tracking-wider text-white mb-6 font-[var(--font-orbitron)]">
                      Jogo Favorito
                    </h3>
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
                        <Gamepad2 className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-slate-300 font-[var(--font-inter)] text-lg">
                        <span className="text-purple-400 font-semibold">{member.favoriteGame}</span>
                      </p>
                    </div>
                  </div>
                )}

              </div>
            </aside>
          </div>
        </Container>
      </section>
    </div>
  );
}
