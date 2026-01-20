"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import Container from "./ui/Container";

export default function AboutSummary() {
  return (
    <section className="py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center text-center"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider text-white mb-4 font-[var(--font-orbitron)]">
            Sobre Nós
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto mb-8 font-[var(--font-inter)]">
            O Team Staircase é um time apaixonado por desenvolvimento de jogos,
            dedicado a criar experiências únicas e memoráveis no universo digital.
            Nossa missão é transformar ideias em realidade através de jogos extraordinários.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-lg font-medium text-white transition-all duration-300 hover:border-cyan-500/50 hover:bg-slate-800/50 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20 font-[var(--font-inter)]"
          >
            <Users className="w-5 h-5" />
            Conheça a Equipe
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
