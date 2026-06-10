'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import ShinyText from '@/components/ui/ShinyText';
import { useIsMobile } from '@/hooks/useIsMobile';

const FloatingLines = dynamic(() => import('@/components/ui/FloatingLines'), { ssr: false });

// Referencias estáticas para evitar que FloatingLines recree el Canvas de WebGL en cada render de Hero
const LINES_GRADIENT = ["#E945F5", "#2F4BC0", "#E945F5"];
const LINE_COUNT = [10, 15, 20];
const LINE_DISTANCE = [8, 6, 4];
const ROTATING_WORDS = ["Siguiente Nivel", "Premium", "Innovador", "Escalable"];

interface HeroProps {
  title?: string;
  subtitle?: string;
}

export default function Hero({
  title = "Diseño & Desarrollo Web de Siguiente Nivel",
  subtitle = "Creamos experiencias digitales premium, interactivas y optimizadas para potenciar tu marca. Integrando tecnologías de vanguardia para interfaces que marcan la diferencia."
}: HeroProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="inicio" className="relative min-h-[90vh] flex flex-col justify-center items-center bg-neutral-950 px-6 py-24 overflow-hidden select-none">
      {/* 1. Fondo Animado Interactivo FloatingLines */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none bg-[#0b0a0d]">
        {mounted && (
          <FloatingLines
            linesGradient={LINES_GRADIENT}
            animationSpeed={0.4}
            lineCount={LINE_COUNT}
            lineDistance={LINE_DISTANCE}
            bendRadius={5.0}
            bendStrength={-0.8}
            mouseDamping={0.06}
          />
        )}
      </div>

      {/* 2. Spot de luz degradado detrás del título */}
      <div 
        className="absolute w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] rounded-full bg-indigo-500/10 blur-[80px] sm:blur-[120px] pointer-events-none -translate-y-12"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-8 relative z-10">

        {/* Título Principal con tipografía grande, degradado y animación de palabras */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="text-4xl sm:text-7xl font-extrabold tracking-tight leading-[1.1] text-white flex flex-col items-center gap-2"
        >
          {/* El título de arriba queda INTACTO como te gustó */}
          <ShinyText
            text="Diseño & Desarrollo Web"
            speed={3.5}
            delay={0.5}
            color="#FFFFFF"
            shineColor="#00F2FE"
            spread={100}
            className="font-extrabold tracking-tighter"
          />
          
          <span className="relative inline-block w-full h-[1.2em] text-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="absolute left-0 right-0 text-center bg-gradient-to-r from-[#00F2FE] via-[#4FACFE] to-[#00F2FE] bg-clip-text text-transparent font-extrabold tracking-tighter pb-3"
                style={{
                  /* Bajamos la intensidad acá a una atmósfera difusa, fina y elegante */
                  filter: 'drop-shadow(0 4px 12px rgba(0, 242, 254, 0.25))'
                }}
              >
                {ROTATING_WORDS[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h1>

        {/* Subtítulo descriptivo */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="text-sm sm:text-lg text-slate-100 max-w-2xl leading-relaxed font-light"
        >
          {subtitle}
        </motion.p>

      </div>
    </section>
  );
}