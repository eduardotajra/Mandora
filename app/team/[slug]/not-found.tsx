import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Container from "@/components/ui/Container";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <Container>
        <div className="text-center">
          <h1 className="text-6xl font-bold tracking-wider text-white mb-4 font-[var(--font-orbitron)]">
            404
          </h1>
          <p className="text-slate-400 text-xl mb-8 font-[var(--font-inter)]">
            Membro da equipe não encontrado
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-violet-500/20 font-[var(--font-inter)]"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para a Equipe
          </Link>
        </div>
      </Container>
    </div>
  );
}
