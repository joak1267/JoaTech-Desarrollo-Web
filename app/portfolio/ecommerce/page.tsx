'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/ui/Navbar';
import QuoteModal from '@/components/ui/QuoteModal';
import DarkVeil from '../landings/DarkVeil';
import { 
  ArrowLeft, 
  Cog, 
  Settings, 
  Wrench,
  Construction,
  MessageCircle
} from 'lucide-react';

export default function EcommercePortfolioPage() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  return (
    <div className="min-h-screen text-neutral-100 flex flex-col justify-between selection:bg-[#E945F5] selection:text-black font-sans overflow-hidden relative">
      
      {/* Fondo Base Oscuro */}
      <div className="fixed inset-0 bg-[#050406] -z-20 pointer-events-none" aria-hidden="true" />

      {/* Fondo de Shader DarkVeil */}
      <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none">
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <DarkVeil
            hueShift={280} // Shift background hue to purple/magenta tones for E-commerce
            noiseIntensity={0}
            scanlineIntensity={0}
            speed={0.5}
            scanlineFrequency={0}
            warpAmount={0}
          />
        </div>
        {/* Capa de oscurecimiento para legibilidad del texto */}
        <div className="absolute inset-0 bg-[#050406]/75" />
      </div>

      <Navbar onQuoteClick={() => setIsQuoteOpen(true)} />

      <main className="flex-grow max-w-7xl w-full mx-auto px-6 pt-36 pb-24 relative z-10 flex flex-col">
        
        {/* Cabecera superior alineada simétricamente */}
        <div className="flex items-center justify-between w-full border-b border-neutral-800/40 pb-6 mb-8 gap-4">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest font-extrabold text-[#E945F5]">
              PORTFOLIO / CATEGORÍA
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white uppercase bg-gradient-to-r from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent leading-none">
              E-Commerce
            </h1>
          </div>
          <Link 
            href="/#proyectos" 
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-[#E945F5] hover:bg-[#E945F5]/5 hover:border-[#E945F5]/30 px-3.5 py-1.5 rounded-xl border border-transparent transition-all duration-300 group shrink-0"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Volver al Inicio
          </Link>
        </div>

        {/* Descripción de la Categoría */}
        <p className="text-sm sm:text-base text-white font-normal leading-relaxed max-w-3xl mb-12">
          Plataformas de comercio electrónico a medida. Creamos desde tiendas rápidas con redirección directa de pedidos a WhatsApp hasta complejos portales empresariales integrados con pasarelas automáticas de cobro y paneles de administración de stock.
        </p>

        {/* Bloque de Mantenimiento Centrado */}
        <div className="flex-grow flex flex-col items-center justify-center text-center space-y-8 py-8">
          
          {/* Animación Premium de Engranajes */}
          <div className="relative w-48 h-48 flex items-center justify-center">
            {/* Círculo de brillo de fondo */}
            <div className="absolute w-32 h-32 rounded-full bg-[#E945F5]/10 blur-xl animate-pulse" />
            
            {/* Engranaje Principal */}
            <motion.div
              className="absolute text-neutral-700"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
            >
              <Cog className="w-28 h-28 text-[#E945F5]/70 stroke-[1.5]" />
            </motion.div>
            
            {/* Engranaje Secundario (Superior Derecha) */}
            <motion.div
              className="absolute top-6 right-6"
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            >
              <Settings className="w-14 h-14 text-[#00F2FE]/60 stroke-[1.5]" />
            </motion.div>

            {/* Engranaje Terciario (Inferior Izquierda) */}
            <motion.div
              className="absolute bottom-6 left-6"
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
            >
              <Cog className="w-16 h-16 text-neutral-500/50 stroke-[1.5]" />
            </motion.div>

            {/* Ícono central de herramienta */}
            <motion.div
              className="absolute"
              animate={{ 
                y: [0, -4, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 4, 
                ease: "easeInOut" 
              }}
            >
              <Wrench className="w-8 h-8 text-white drop-shadow-[0_0_10px_rgba(233,69,245,0.5)]" />
            </motion.div>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-black uppercase tracking-wider text-[#E945F5] border-[#E945F5]/20 bg-[#E945F5]/5 backdrop-blur-md">
            <Construction className="w-4 h-4 animate-bounce" />
            Sección en Desarrollo
          </div>

          {/* Textos */}
          <div className="space-y-4 max-w-xl">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white uppercase leading-tight">
              Esta página está <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E945F5] to-[#00F2FE]">
                en mantenimiento
              </span>
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
              Estamos trabajando para mejorar tu experiencia web. Gracias por tu paciencia.
            </p>
          </div>

          {/* Acción */}
          <div className="pt-2">
            <button
              onClick={() => setIsQuoteOpen(true)}
              className="py-3.5 px-8 rounded-xl text-center text-xs font-black uppercase tracking-widest text-black bg-[#E945F5] border border-[#E945F5] hover:bg-[#E945F5]/90 hover:shadow-[0_0_20px_rgba(233,69,245,0.4)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4.5 h-4.5" />
              Cotizar Proyecto ↗
            </button>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-900 bg-neutral-950/60 py-8 relative z-10 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            &copy; {new Date().getFullYear()} JoaTech. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E945F5]" />
              Tiendas autogestionables
            </span>
          </div>
        </div>
      </footer>

      {/* Modal de Cotización */}
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </div>
  );
}
