"use client";

import { motion } from "framer-motion";
import { Game } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ExternalLink, Gamepad2, Smartphone, ArrowRight } from "lucide-react";
import Container from "./ui/Container";

interface FeaturedGamesProps {
  games: Game[];
}

export default function FeaturedGames({ games }: FeaturedGamesProps) {
  const router = useRouter();
  
  if (games.length === 0) return null;

  return (
    <section className="py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 flex flex-col items-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider text-white mb-4 font-[var(--font-orbitron)]">
            Destaques
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-3xl mx-auto font-[var(--font-inter)]">
            Conheça nossos jogos mais recentes
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {games.map((game: Game, index: number) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => router.push(`/game/${game.slug}`)}
              className="group relative overflow-hidden rounded-xl bg-slate-900/50 backdrop-blur-md border border-white/10 transition-all duration-300 hover:border-purple-500/50 hover:bg-slate-800/60 hover:shadow-[0_0_30px_-5px_rgba(168,85,247,0.3)] h-full flex flex-col cursor-pointer"
            >
              <div className="relative aspect-video bg-gradient-to-br from-purple-900/20 to-cyan-900/20 flex items-center justify-center overflow-hidden">
                {game.coverImage ? (
                  <>
                    <Image
                      src={game.coverImage}
                      alt={game.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(139,92,246,0.1)_50%,transparent_75%)] bg-[length:20px_20px] scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <span className="text-slate-600 text-sm relative z-10">Imagem do Jogo</span>
                  </>
                )}
              </div>
              
              <div className="p-6 flex-grow flex flex-col relative z-10">
                <h3 className="text-xl font-bold tracking-wider text-white mb-3 group-hover:text-cyan-400 transition-all duration-300 font-[var(--font-orbitron)]">
                  {game.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-2 font-[var(--font-inter)] flex-grow">
                  {game.shortDescription}
                </p>
                
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap" onClick={(e) => e.stopPropagation()}>
                  {game.links.steam && (
                    <a
                      href={game.links.steam}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-xs sm:text-sm font-medium transition-colors font-[var(--font-inter)]"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Steam
                    </a>
                  )}
                  {game.links.itch && (
                    <a
                      href={game.links.itch}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 text-xs sm:text-sm font-medium transition-colors font-[var(--font-inter)]"
                    >
                      <Gamepad2 className="w-4 h-4" />
                      itch.io
                    </a>
                  )}
                  {game.links.googlePlay && (
                    <a
                      href={game.links.googlePlay}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 text-xs sm:text-sm font-medium transition-colors font-[var(--font-inter)]"
                    >
                      <Smartphone className="w-4 h-4" />
                      Google Play
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center"
        >
          <Link
            href="/games"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/20 font-[var(--font-inter)]"
          >
            Ver todos os jogos
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
