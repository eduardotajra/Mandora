"use client";

import { motion } from "framer-motion";
import { X, Linkedin, Mail, Youtube, Instagram, Gamepad2, Cloud } from "lucide-react";
import Container from "./ui/Container";

const socialLinks = [
  { icon: X, href: "https://x.com/TeamStaircase", label: "X" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Mail, href: "mailto:teamstaircasegames@gmail.com", label: "Email" },
  { icon: Gamepad2, href: "https://team-staircase.itch.io/", label: "Itch.io" },
  { icon: Cloud, href: "https://bsky.app/profile/team-staircase.bsky.social", label: "Bluesky" },
];

export default function Footer() {
  return (
    <footer id="contact" className="py-8 sm:py-10 md:py-12 bg-slate-950 border-t border-white/10 mt-auto">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center md:text-left"
          >
            <h3 className="text-xl sm:text-2xl font-bold tracking-wider text-white mb-2 font-[var(--font-orbitron)]">
              Team Staircase
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm font-[var(--font-inter)]">
              Criando mundos digitais imersivos e experiências únicas
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex gap-3 sm:gap-4 flex-wrap justify-center"
          >
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-slate-900/50 backdrop-blur-md border border-white/10 text-slate-300 hover:text-cyan-400 hover:border-purple-500/50 hover:bg-slate-800/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.a>
              );
            })}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/10 text-center text-slate-400 text-xs sm:text-sm font-[var(--font-inter)]"
        >
          <p>&copy; {new Date().getFullYear()} Team Staircase. Todos os direitos reservados.</p>
        </motion.div>
      </Container>
    </footer>
  );
}
