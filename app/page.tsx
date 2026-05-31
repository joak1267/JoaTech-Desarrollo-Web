'use client';

import { useState } from 'react';
import Hero from "@/components/sections/Hero";
import Showcase from "@/components/sections/Showcase";
import Works from "@/components/sections/Works";
import AboutSection from "@/components/ui/AboutSection";
import Benefits from "@/components/sections/Benefits";
import Process from "@/components/sections/Process";
import Contact from "@/components/sections/Contact";
import FAQ from "@/components/sections/FAQ";
import Navbar from "@/components/ui/Navbar";
import QuoteModal from "@/components/ui/QuoteModal";
import Footer from "@/components/ui/Footer";
import dynamic from 'next/dynamic';
import { useIsMobile } from '@/hooks/useIsMobile';

const LiquidChrome = dynamic(() => import("@/components/ui/LiquidChrome"), { ssr: false });

const CHROME_BASE_COLOR: [number, number, number] = [0.015, 0.015, 0.025];

export default function Home() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="bg-neutral-950 min-h-screen text-neutral-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white font-sans overflow-hidden relative">
      {/* Navbar Premium Bento */}
      <Navbar onQuoteClick={() => setIsQuoteOpen(true)} />
 
      {/* Main Content Sections */}
      <main className="flex-grow flex flex-col">
        <Hero />
        <Showcase />
        <Works />
 
        {/* LiquidChrome background wrapping Benefits and Process */}
        <div className="relative overflow-hidden bg-neutral-950">
          {/* Capa de Fluido WebGL con calibración ultra oscura para conservar contraste */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
            {!isMobile ? (
              <LiquidChrome
                baseColor={CHROME_BASE_COLOR}
                speed={0.4}
                amplitude={0.4}
                interactive={true}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 relative overflow-hidden pointer-events-none">
                <div 
                  className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                  }}
                />
              </div>
            )}
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
