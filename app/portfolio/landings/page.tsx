'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/ui/Navbar';
import QuoteModal from '@/components/ui/QuoteModal';
import DarkVeil from './DarkVeil';
import { 
  ArrowLeft, 
  Check, 
  Zap, 
  Flame, 
  Sparkles, 
  Code2, 
  Layers,
  Database,
  Terminal,
  Grid
} from 'lucide-react';

const LANDING_TIERS = [
  {
    id: 'base',
    title: 'AURA – ESTÉTICA & SPA',
    price: '$150 USD',
    tagline: 'Estética de Alta Gama con Reserva Express',
    description: 'Una landing de lujo diseñada bajo la filosofía de seda orgánica y relajación. Cuenta con simulador de turnos interactivo, grilla Bento de servicios y fotos reales enfocadas en la conversión inmediata.',
    features: [
      'Simulador interactivo de Turno Express',
      'Grilla de Servicios tipo Bento con fotos reales',
      'Formulario de reserva directo a WhatsApp',
      'Sección de Testimonios "vidrio claro"',
      'Diseño higiénico, limpio y abierto',
      'Tipografía Serif refinada (Playfair Display)'
    ],
    tech: ['React', 'Tailwind CSS v4', 'Framer Motion', 'Google Fonts'],
    badge: 'Modelo Aura',
    badgeIcon: Zap,
    badgeColor: 'text-[#c9927a] border-[#c9927a]/20 bg-[#c9927a]/5',
    buttonText: 'EXPLORAR PROTOTIPO ↗',
    buttonPath: '/portfolio/landings/base',
    accentColor: '#c9927a',
    img: '/landings/spa_hero.jpg'
  },
  {
    id: 'avanzada',
    title: 'NORDIK – MUEBLES & DISEÑO',
    price: '$200 USD',
    tagline: 'Catálogo Interactivo y Showroom Limpio',
    description: 'Exhibición visual premium de productos sin la complejidad de una pasarela de pago. Incluye grilla de categorías por ambiente, catálogo interactivo con buscador y cotizador con WhatsApp integrado.',
    features: [
      'Galerías de ambientes con imágenes reales',
      'Buscador y filtros de productos en tiempo real',
      'Modal de armado de cotización a medida',
      'Ficha técnica interactiva por producto',
      'WhatsApp pre-formateado con los productos',
      'Tipografía escandinava (Cormorant & DM Sans)'
    ],
    tech: ['Next.js', 'Tailwind CSS v4', 'Framer Motion', 'TypeScript'],
    badge: 'Modelo Nordik',
    badgeIcon: Flame,
    badgeColor: 'text-[#8a6a50] border-[#8a6a50]/20 bg-[#8a6a50]/5',
    buttonText: 'EXPLORAR PROTOTIPO ↗',
    buttonPath: '/portfolio/landings/avanzada',
    accentColor: '#8a6a50',
    img: '/landings/nordik_sofa.jpg'
  },
  {
    id: 'premium',
    title: 'APEX – INMOBILIARIA PREMIUM',
    price: '$400 USD',
    tagline: 'Experiencia Inmobiliaria de Élite y Corporativa',
    description: 'La máxima expresión del desarrollo web premium. Cuenta con buscador avanzado de inmuebles, grilla con badges dinámicos de estado, maquetación Bento elástica y retratos de asesores generados por IA.',
    features: [
      'Buscador de inmuebles por filtros múltiples',
      'Tarjetas de propiedades con datos técnicos',
      'Sección de equipo con fotos de IA profesional',
      'Fondo de héroe inmersivo de alta definición',
      'Efectos Bento elásticos y transiciones fluidas',
      'Tipografía de alto impacto (Baskerville & Outfit)'
    ],
    tech: ['Next.js', 'Framer Motion', 'TypeScript', 'Google Fonts'],
    badge: 'Modelo APEX',
    badgeIcon: Sparkles,
    badgeColor: 'text-[#c9a55a] border-[#c9a55a]/20 bg-[#c9a55a]/5',
    buttonText: 'EXPLORAR PROTOTIPO ↗',
    buttonPath: '/portfolio/landings/premium',
    accentColor: '#c9a55a',
    img: '/landings/apex_hero_bg.jpg'
  }
];

export default function LandingsPortfolioPage() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const getTechIcon = (tech: string) => {
    const lower = tech.toLowerCase();
    if (lower.includes('react')) {
      return <Code2 className="w-3.5 h-3.5 text-[#61dafb]" />;
    }
    if (lower.includes('next.js')) {
      return <Terminal className="w-3.5 h-3.5 text-white" />;
    }
    if (lower.includes('typescript')) {
      return <Database className="w-3.5 h-3.5 text-[#3178c6]" />;
    }
    if (lower.includes('framer motion')) {
      return <Layers className="w-3.5 h-3.5 text-[#f107a3]" />;
    }
    if (lower.includes('tailwind')) {
      return <Zap className="w-3.5 h-3.5 text-[#38bdf8]" />;
    }
    if (lower.includes('fonts')) {
      return <Sparkles className="w-3.5 h-3.5 text-[#c9a55a]" />;
    }
    return <Grid className="w-3.5 h-3.5 text-neutral-400" />;
  };

  return (
    <div className="min-h-screen text-neutral-100 flex flex-col justify-between selection:bg-[#00F2FE] selection:text-black font-sans overflow-hidden relative">
      
      {/* Fondo Base Oscuro */}
      <div className="fixed inset-0 bg-[#050406] -z-20 pointer-events-none" aria-hidden="true" />

      {/* Fondo de Shader DarkVeil */}
      <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none">
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <DarkVeil
            hueShift={0}
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

      <main className="flex-grow max-w-7xl w-full mx-auto px-6 pt-36 pb-24 relative z-10">
        
        {/* Cabecera superior alineada simétricamente */}
        <div className="flex items-center justify-between w-full border-b border-neutral-800/40 pb-6 mb-8 gap-4">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest font-extrabold text-[#00F2FE]">
              PORTFOLIO / CATEGORÍA
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white uppercase bg-gradient-to-r from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent leading-none">
              Landing Pages
            </h1>
          </div>
          <Link 
            href="/#proyectos" 
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-[#00F2FE] hover:bg-[#00F2FE]/5 hover:border-[#00F2FE]/30 px-3.5 py-1.5 rounded-xl border border-transparent transition-all duration-300 group shrink-0"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Volver al Inicio
          </Link>
        </div>

        {/* Descripción de la Categoría */}
        <p className="text-sm sm:text-base text-white font-normal leading-relaxed max-w-3xl mb-12">
          Propuestas de desarrollo de una sola página enfocadas en conversiones. Estructuramos tres ofertas diseñadas para cubrir desde necesidades inmediatas de tracción hasta experiencias visuales inmersivas en 3D.
        </p>

        {/* Listado de Ofertas / Tiers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {LANDING_TIERS.map((tier) => {
            const BadgeIcon = tier.badgeIcon;
            
            return (
              <motion.article
                key={tier.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-[2rem] bg-neutral-950/40 border border-neutral-900/80 backdrop-blur-xl transition-all duration-500 hover:border-neutral-800 hover:shadow-3xl overflow-hidden"
              >
                {/* Visual Glow Layer en Hover de la tarjeta */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    backgroundImage: `linear-gradient(to bottom, ${tier.accentColor}08, transparent, transparent)`
                  }}
                />

                <div className="space-y-6">
                  {/* Portada Visual Real de la Landing */}
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden rounded-2xl border border-neutral-900 bg-neutral-900">
                    <img 
                      src={tier.img} 
                      alt={tier.title} 
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
                  </div>

                  {/* Título & Precio */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider ${tier.badgeColor}`}>
                        <BadgeIcon className="w-3.5 h-3.5" />
                        {tier.badge}
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-mono font-black text-green-600">
                          {tier.price}
                        </span>
                        <span className="text-[9px] uppercase font-bold text-green-700/90 tracking-wider">
                          Pago Único
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl font-extrabold text-white tracking-tight uppercase group-hover:text-white/95 transition-colors">
                      {tier.title}
                    </h3>
                    <p className="text-[11px] font-bold uppercase tracking-wide" style={{ color: tier.accentColor }}>
                      {tier.tagline}
                    </p>
                  </div>

                  <p className="text-xs text-neutral-400 font-light leading-relaxed">
                    {tier.description}
                  </p>

                  {/* Tecnologías */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {tier.tech.map((t) => (
                      <div 
                        key={t}
                        className="flex items-center gap-1.5 bg-neutral-900/60 border border-neutral-850 px-2.5 py-1 rounded-lg text-[9px] font-mono text-neutral-300 backdrop-blur-sm"
                      >
                        {getTechIcon(t)}
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>

                  {/* Listado de Características Reales */}
                  <div className="border-t border-neutral-900/80 pt-5 space-y-3">
                    <h4 className="text-[10px] uppercase font-black tracking-widest text-neutral-500">
                      Características del Prototipo
                    </h4>
                    <ul className="space-y-2.5">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                          <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: tier.accentColor }} />
                          <span className="leading-snug">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Botón de Acción */}
                <div className="mt-8 pt-4">
                  <Link
                    href={tier.buttonPath}
                    className={`w-full py-3 px-4 rounded-xl text-center text-xs font-black uppercase tracking-widest border transition-all duration-300 flex items-center justify-center cursor-pointer text-white bg-neutral-900/30 border-neutral-800 ${
                      tier.id === 'base'
                        ? 'hover:bg-[#c9927a] hover:border-[#c9927a] hover:text-white hover:shadow-[0_0_15px_rgba(201,146,122,0.25)]'
                        : tier.id === 'avanzada'
                        ? 'hover:bg-[#8a6a50] hover:border-[#8a6a50] hover:text-white hover:shadow-[0_0_15px_rgba(138,106,80,0.25)]'
                        : 'hover:bg-[#c9a55a] hover:border-[#c9a55a] hover:text-black hover:shadow-[0_0_15px_rgba(201,165,90,0.25)]'
                    }`}
                  >
                    {tier.buttonText}
                  </Link>
                </div>

              </motion.article>
            );
          })}
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
              <span className="h-1.5 w-1.5 rounded-full bg-[#00F2FE]" />
              Focalizado en conversiones
            </span>
          </div>
        </div>
      </footer>

      {/* Modal de Cotización */}
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </div>
  );
}
