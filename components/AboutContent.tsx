"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { TeamMember } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

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

      {/* SEÇÃO 2: Nossa Equipe */}
      {teamMembers.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center flex flex-col items-center"
        >
          <div className="flex flex-wrap justify-center items-start gap-24 md:gap-32 max-w-6xl mx-auto">
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
                className="flex flex-col items-center text-center gap-4 group cursor-pointer hover:-translate-y-2 transition-transform duration-300 w-[280px]"
              >
                <div className="relative w-48 h-48 md:w-56 md:h-56 mx-auto rounded-full overflow-hidden border-2 border-purple-500/30 group-hover:border-cyan-500 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-300">
                  {member.photo ? (
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 192px, 224px"
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center">
                      <span className="text-6xl md:text-7xl text-white">
                        {member.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                <h4 className="text-xl font-bold text-white font-[var(--font-orbitron)] group-hover:text-cyan-400 transition-colors">
                  {member.name}
                </h4>
                {member.skills && member.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 justify-center max-w-[260px]">
                    {member.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="bg-slate-800/80 border border-white/10 text-cyan-400 text-xs px-3 py-1 rounded-full font-medium font-[var(--font-inter)]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
