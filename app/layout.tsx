import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron, Inter } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Team Staircase | Game Studio",
    template: "%s | Team Staircase",
  },
  description: "Team Staircase criando mundos digitais imersivos e experiências únicas. Explore nossos jogos e descubra aventuras extraordinárias.",
  keywords: ["jogos", "games", "desenvolvimento de jogos", "game studio", "Team Staircase"],
  authors: [{ name: "Team Staircase" }],
  creator: "Team Staircase",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://teamstaircase.com",
    siteName: "Team Staircase",
    title: "Team Staircase | Game Studio",
    description: "Team Staircase criando mundos digitais imersivos e experiências únicas. Explore nossos jogos e descubra aventuras extraordinárias.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Team Staircase - Game Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Team Staircase | Game Studio",
    description: "Team Staircase criando mundos digitais imersivos e experiências únicas. Explore nossos jogos e descubra aventuras extraordinárias.",
    images: ["/og-image.jpg"],
    creator: "@teamstaircase",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-slate-950 text-slate-300 antialiased min-h-screen flex flex-col`}>
        {/* Navbar fixa no topo */}
        <Navbar /> 
        
        {/* Main com padding-top para não ficar atrás da navbar */}
        <main className="flex-grow flex flex-col pt-20">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
