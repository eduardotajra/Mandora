"use client";

import { motion } from "framer-motion";
import { Gamepad2, Mail } from "lucide-react";
import Link from "next/link";
import Container from "./ui/Container";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-slate-950 text-center">
      <Container className="relative z-10 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center justify-center text-center space-y-8 md:space-y-10 w-full"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-wider text-white font-[var(--font-orbitron)]"
          >
            Team Staircase
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-[var(--font-inter)]"
          >
            Criando mundos digitais imersivos e experiências únicas
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center pt-8"
          >
            <Link
              href="/games"
              className="group relative w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/20 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <Gamepad2 className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform" />
              Nossos Jogos
            </Link>
            
            <Link
              href="/contact"
              className="group relative w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-full font-medium text-white transition-all duration-300 hover:border-purple-500/50 hover:bg-slate-800/50 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              Contato
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
