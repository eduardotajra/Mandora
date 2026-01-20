"use client";

import { Game } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ExternalLink, Gamepad2, Smartphone } from "lucide-react";

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/game/${game.slug}`);
  };

  return (
    <div
      onClick={handleCardClick}
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
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(139,92,246,0.1)_50%,transparent_75%)] bg-[length:20px_20px]"></div>
            <span className="text-slate-600 text-sm relative z-10">Imagem do Jogo</span>
          </>
        )}
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold tracking-wider text-white mb-3 group-hover:text-cyan-400 transition-all duration-300 font-[var(--font-orbitron)]">
          {game.title}
        </h3>
        <p className="text-slate-400 text-sm mb-4 line-clamp-2 font-[var(--font-inter)] flex-grow">
          {game.shortDescription}
        </p>
        
        <div className="flex items-center gap-3 flex-wrap mt-auto" onClick={(e) => e.stopPropagation()}>
          {game.links.steam && (
            <a
              href={game.links.steam}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors font-[var(--font-inter)]"
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
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors font-[var(--font-inter)]"
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
              className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 text-sm font-medium transition-colors font-[var(--font-inter)]"
            >
              <Smartphone className="w-4 h-4" />
              Google Play
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
