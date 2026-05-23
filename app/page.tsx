'use client';

import { useState } from 'react';
import Hero from "@/components/sections/Hero";
import Showcase from "@/components/sections/Showcase";
import AboutSection from "@/components/ui/AboutSection";
import Benefits from "@/components/sections/Benefits";
import Process from "@/components/sections/Process";
import Contact from "@/components/sections/Contact";
import FAQ from "@/components/sections/FAQ";
import Navbar from "@/components/ui/Navbar";
import QuoteModal from "@/components/ui/QuoteModal";
import LiquidChrome from "@/components/ui/LiquidChrome";
import Footer from "@/components/ui/Footer";

const CHROME_BASE_COLOR: [number, number, number] = [0.015, 0.015, 0.025];

export default function Home() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  return (
    <div className="bg-neutral-950 min-h-screen text-neutral-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white font-sans overflow-hidden relative">
      {/* Navbar Premium Bento */}
      <Navbar onQuoteClick={() => setIsQuoteOpen(true)} />
 
      {/* Main Content Sections */}
      <main className="flex-grow flex flex-col">
        <Hero />
        <Showcase />
 
        {/* LiquidChrome background wrapping Benefits and Process */}
        <div className="relative overflow-hidden bg-neutral-950">
          {/* Capa de Fluido WebGL con calibración ultra oscura para conservar contraste */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
            <LiquidChrome
              baseColor={CHROME_BASE_COLOR}
              speed={0.4}
              amplitude={0.4}
              interactive={true}
            />
          </div>
          
          {/* Contenido de ingeniería sobre el fluido */}
          <div className="relative z-10">
            <AboutSection />
            <Benefits />
            <Process />
          </div>
        </div>

        <FAQ />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modal de Cotización */}
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </div>
  );
}
