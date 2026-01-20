"use client";

import { motion } from "framer-motion";
import { Users, Code, Gamepad2, Sparkles, ExternalLink, History } from "lucide-react";
import { TeamMember } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

const features = [
  {
    icon: Gamepad2,
    title: "Desenvolvimento de Jogos",
    description: "Criamos experiências imersivas e envolventes",
  },
  {
    icon: Code,
    title: "Tecnologia de Ponta",
    description: "Utilizamos as melhores ferramentas e frameworks",
  },
  {
    icon: Sparkles,
    title: "Inovação",
    description: "Sempre buscando novas formas de contar histórias",
  },
  {
    icon: Users,
    title: "Trabalho em Equipe",
    description: "Colaboração e paixão em cada projeto",
  },
];

interface AboutContentProps {
  teamMembers: TeamMember[];
}

export default function AboutContent({ teamMembers }: AboutContentProps) {
  const router = useRouter();

  const handleMemberClick = (slug: string | undefined) => {
    if (slug && slug.trim() !== "") {
      router.push(`/team/${slug}`);
    } else {
      console.warn("Membro sem slug:", slug);
    }
  };

  return (
    <div className="flex flex-col gap-24 py-20">
      {/* SEÇÃO 1: Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center flex flex-col items-center"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider text-white mb-4 font-[var(--font-orbitron)]">
          Sobre Nós
        </h1>
        <p className="text-slate-400 text-base md:text-lg max-w-3xl mx-auto font-[var(--font-inter)]">
          O Team Staircase é um time apaixonado por desenvolvimento de jogos,
          dedicado a criar experiências únicas e memoráveis no universo digital.
          Nossa missão é transformar ideias em realidade através de jogos extraordinários.
        </p>
      </motion.div>

      {/* SEÇÃO 2: Cards de Valores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center hover:border-purple-500/50 hover:bg-slate-800/60 transition-all duration-300 flex flex-col items-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 mb-4 mx-auto">
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold tracking-wider text-white mb-3 font-[var(--font-orbitron)]">
                {feature.title}
              </h3>
              <p className="text-slate-400 text-sm font-[var(--font-inter)]">
                {feature.description}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* SEÇÃO 3: Nossa História */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex items-center gap-3 mb-6 justify-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600">
            <History className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-4xl font-bold tracking-wider text-white font-[var(--font-orbitron)]">
            Nossa História
          </h2>
        </div>
        <div className="bg-slate-900/30 border border-white/5 rounded-2xl p-8 md:p-12">
          <div className="prose prose-invert max-w-none flex flex-col items-center text-center">
            <p className="text-slate-400 text-lg mb-4 font-[var(--font-inter)] leading-relaxed max-w-3xl">
              O Team Staircase nasceu da paixão compartilhada por criar jogos que vão além do entretenimento.
              Fundado com a missão de desenvolver experiências digitais imersivas, nosso estúdio busca
              unir tecnologia, arte e narrativa em mundos virtuais únicos e memoráveis.
            </p>
            <p className="text-slate-400 text-lg mb-4 font-[var(--font-inter)] leading-relaxed max-w-3xl">
              Acreditamos que cada jogo conta uma história e que cada história merece ser contada com excelência.
              Nossa equipe multidisciplinar trabalha incansavelmente para transformar ideias em realidade,
              sempre priorizando a qualidade, a inovação e a experiência do jogador.
            </p>
            <p className="text-slate-400 text-lg font-[var(--font-inter)] leading-relaxed max-w-3xl">
              Com um compromisso constante com a excelência técnica e artística, o Team Staircase continua
              a evoluir e a expandir seus horizontes, sempre em busca de novos desafios e oportunidades de
              criar algo verdadeiramente especial no universo dos jogos digitais.
            </p>
          </div>
        </div>
      </motion.div>

      {/* SEÇÃO 4: Nossa Equipe */}
      {teamMembers.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h3 className="text-4xl font-bold tracking-wider text-white mb-12 font-[var(--font-orbitron)]">
            Nossa Equipe
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => {
                  if (member.slug && member.slug.trim() !== "") {
                    handleMemberClick(member.slug);
                  } else {
                    console.warn(`Membro "${member.name}" não tem slug configurado. Configure no Sanity Studio.`);
                  }
                }}
                className="flex flex-col items-center text-center gap-4 group cursor-pointer hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-purple-500/30 group-hover:border-cyan-500 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-300">
                  {member.photo ? (
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 128px, 128px"
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center">
                      <span className="text-4xl text-white">
                        {member.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <h4 className="text-xl font-bold text-white font-[var(--font-orbitron)] group-hover:text-cyan-400 transition-colors">
                  {member.name}
                </h4>
                <p className="text-sm text-purple-400 uppercase tracking-widest font-[var(--font-inter)]">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
