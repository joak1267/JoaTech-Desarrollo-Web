'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useIsMobile } from '@/hooks/useIsMobile';

const GridScan = dynamic(() => import("@/components/ui/GridScan"), { ssr: false });
import { 
  FileText, 
  ShoppingBag, 
  Cpu, 
  Check,
  Code2,
  Database,
  CreditCard,
  TrendingUp,
  Gauge,
  Layers
} from 'lucide-react';

const CATEGORIES = [
  {
    id: 'landings',
    title: 'LANDING PAGES',
    subtitle: 'Conversión & Alta Gama',
    description: 'Sitios web de una sola página diseñados para capturar clientes potenciales. Desde estructuras limpias y veloces hasta experiencias WebGL 3D disruptivas con animaciones interactivas.',
    features: [
      'Optimización SEO y Velocidad Crítica',
      'Integración con WhatsApp y CRM',
      'Experiencias WebGL 3D Inmersivas',
      'Diseño UX/UI Responsivo Premium'
    ],
    path: '/portfolio/landings',
    glowColor: 'from-[#00F2FE]/10 via-transparent to-transparent',
    borderColor: 'hover:border-[#00F2FE]/40',
    shadowColor: 'hover:shadow-[0_0_35px_rgba(0,242,254,0.12)]',
    accentColor: '#00F2FE',
    icon: FileText
  },
  {
    id: 'ecommerce',
    title: 'E-COMMERCE',
    subtitle: 'Ventas Automatizadas',
    description: 'Tiendas online diseñadas para maximizar tus ventas. Catálogos dinámicos autogestionables, carritos interactivos, checkout directo a WhatsApp o pasarelas de pago automáticas.',
    features: [
      'Catálogos y Filtros Inteligentes',
      'Checkout a WhatsApp o Stripe/MP',
      'Panel de Control de Inventario',
      'Carga Ultrarrápida de Productos'
    ],
    path: '/portfolio/ecommerce',
    glowColor: 'from-[#E945F5]/10 via-transparent to-transparent',
    borderColor: 'hover:border-[#E945F5]/40',
    shadowColor: 'hover:shadow-[0_0_35px_rgba(233,69,245,0.12)]',
    accentColor: '#E945F5',
    icon: ShoppingBag
  },
  {
    id: 'saas',
    title: 'WEB APPS & SAAS',
    subtitle: 'Sistemas & Automatización',
    description: 'Plataformas web a medida para optimizar y automatizar tus procesos de negocio. Sistemas de reservas, integraciones de API, cobro de suscripciones recurrentes y métricas avanzadas.',
    features: [
      'Paneles de Control (Dashboards)',
      'Sistemas de Turnos en Tiempo Real',
      'Gráficos Dinámicos y Reportes',
      'Arquitectura de Datos Escalable'
    ],
    path: '/portfolio/saas',
    glowColor: 'from-[#2F4BC0]/15 via-transparent to-transparent',
    borderColor: 'hover:border-[#2F4BC0]/40',
    shadowColor: 'hover:shadow-[0_0_35px_rgba(47,75,192,0.15)]',
    accentColor: '#2F4BC0',
    icon: Cpu
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 15,
    },
  },
};

export default function Showcase() {
  const isMobile = useIsMobile();
  // Renderizar la vista previa de la maqueta abstracta de cada categoría
  const renderCategoryPreview = (id: string) => {
    switch (id) {
      case 'landings':
        return (
          <div className="w-full h-36 bg-neutral-950 rounded-xl border border-neutral-900 overflow-hidden relative flex flex-col justify-between">
            {/* Header */}
            <div className="flex items-center gap-1.5 border-b border-neutral-900 px-3 py-1.5 bg-neutral-950/80">
              <div className="flex gap-1">
                <span className="w-1 h-1 rounded-full bg-neutral-800" />
                <span className="w-1 h-1 rounded-full bg-neutral-800" />
                <span className="w-1 h-1 rounded-full bg-neutral-800" />
              </div>
              <div className="mx-auto w-24 h-2 rounded bg-neutral-900 border border-neutral-850 flex items-center justify-center">
                <span className="text-[5px] text-neutral-600 font-mono">landing-webgl.joatech.com</span>
              </div>
            </div>
            {/* Content */}
            <div className="p-3 flex-grow flex items-center justify-between gap-3 relative overflow-hidden">
              {/* Radial glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,242,254,0.06)_0%,transparent_70%)]" />
              
              <div className="flex-grow space-y-1.5 relative z-10">
                <div className="h-2 w-4/5 bg-gradient-to-r from-[#00F2FE] to-[#2F4BC0] rounded-sm" />
                <div className="space-y-0.5">
                  <div className="h-0.5 w-1/2 bg-neutral-800 rounded-sm" />
                  <div className="h-0.5 w-2/3 bg-neutral-800 rounded-sm" />
                </div>
                <div className="h-3 w-12 bg-[#00F2FE]/20 border border-[#00F2FE]/40 rounded-sm" />
              </div>
              
              {/* Score / WebGL Circle simulation */}
              <div className="flex flex-col items-center justify-center p-1.5 rounded-lg bg-neutral-900/60 border border-neutral-800/40 w-12 h-12 shrink-0 relative z-10">
                <span className="text-emerald-400 font-mono font-bold text-xs">99</span>
                <span className="text-[4px] text-neutral-500 font-bold uppercase mt-0.5 tracking-wider">SPEED</span>
              </div>
            </div>
          </div>
        );
      case 'ecommerce':
        return (
          <div className="w-full h-36 bg-neutral-950 rounded-xl border border-neutral-900 overflow-hidden relative flex flex-col justify-between">
            {/* Header */}
            <div className="flex items-center gap-1.5 border-b border-neutral-900 px-3 py-1.5 bg-neutral-950/80">
              <div className="flex gap-1">
                <span className="w-1 h-1 rounded-full bg-neutral-800" />
                <span className="w-1 h-1 rounded-full bg-neutral-800" />
                <span className="w-1 h-1 rounded-full bg-neutral-800" />
              </div>
              <div className="mx-auto w-24 h-2 rounded bg-neutral-900 border border-neutral-850 flex items-center justify-center">
                <span className="text-[5px] text-neutral-600 font-mono">shop-system.joatech.com</span>
              </div>
            </div>
            {/* Checkout split layout */}
            <div className="p-2.5 flex-grow grid grid-cols-2 gap-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(233,69,245,0.04)_0%,transparent_70%)]" />

              {/* Products list */}
              <div className="flex flex-col justify-between border-r border-neutral-900 pr-1.5 relative z-10">
                <div className="space-y-1">
                  <div className="h-1 w-8 bg-neutral-800 rounded-sm" />
                  <div className="flex justify-between items-center">
                    <div className="h-0.5 w-6 bg-neutral-850 rounded-sm" />
                    <div className="h-1 w-3 bg-neutral-800 rounded-sm" />
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="h-0.5 w-8 bg-neutral-850 rounded-sm" />
                    <div className="h-1 w-4 bg-neutral-800 rounded-sm" />
                  </div>
                </div>
                <div className="pt-1 border-t border-neutral-900 flex justify-between items-center">
                  <span className="text-[4px] text-neutral-500 font-bold">Total:</span>
                  <span className="text-[5px] font-mono font-bold text-[#E945F5]">$799</span>
                </div>
              </div>

              {/* Visa card mock */}
              <div className="flex flex-col justify-between relative z-10">
                <div className="h-8 w-full rounded bg-gradient-to-br from-[#2F4BC0] to-[#E945F5] p-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="h-1.5 w-2 rounded-sm bg-yellow-400/80" />
                    <span className="text-[3px] font-mono text-white">VISA</span>
                  </div>
                  <span className="text-[3px] font-mono text-white tracking-widest">**** 8840</span>
                </div>
                <div className="h-2 w-full bg-[#E945F5]/10 border border-[#E945F5]/20 rounded flex items-center justify-center">
                  <span className="text-[3.5px] font-bold text-[#E945F5] tracking-widest">PAGAR AHORA</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'saas':
        return (
          <div className="w-full h-36 bg-neutral-950 rounded-xl border border-neutral-900 overflow-hidden relative flex flex-col justify-between">
            {/* Header */}
            <div className="flex items-center gap-1.5 border-b border-neutral-900 px-3 py-1.5 bg-neutral-950/80">
              <div className="flex gap-1">
                <span className="w-1 h-1 rounded-full bg-neutral-800" />
                <span className="w-1 h-1 rounded-full bg-neutral-800" />
                <span className="w-1 h-1 rounded-full bg-neutral-800" />
              </div>
              <div className="mx-auto w-24 h-2 rounded bg-neutral-900 border border-neutral-850 flex items-center justify-center">
                <span className="text-[5px] text-neutral-600 font-mono">dashboard-saas.joatech.com</span>
              </div>
            </div>
            {/* Graph & Stats */}
            <div className="p-2.5 flex-grow flex flex-col justify-between relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(47,75,192,0.06)_0%,transparent_70%)]" />

              <div className="flex justify-between items-center relative z-10">
                <div className="h-1 w-10 bg-neutral-800 rounded-sm" />
                <span className="text-[4px] font-mono bg-[#2F4BC0]/10 border border-[#2F4BC0]/20 px-1 py-0.2 rounded text-[#00F2FE]">Live</span>
              </div>
              
              {/* Minimal SVG chart */}
              <div className="h-6 w-full relative overflow-hidden bg-neutral-900/10 border border-neutral-850/30 rounded relative z-10">
                <svg className="w-full h-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0,20 L0,14 Q12,4 28,10 T56,4 T84,8 T100,2 L100,20 Z" fill="rgba(47, 75, 192, 0.15)" />
                  <path d="M0,14 Q12,4 28,10 T56,4 T84,8 T100,2" fill="none" stroke="#2F4BC0" strokeWidth="0.8" />
                </svg>
              </div>

              {/* Indicators */}
              <div className="flex justify-between items-center text-[4px] font-mono relative z-10">
                <span className="text-neutral-500">Suscripciones: 142</span>
                <span className="text-[#00F2FE] font-bold">MRR: $3,420 USD</span>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="proyectos" className="relative bg-transparent px-6 py-24 overflow-hidden border-t border-neutral-900">
      
      {/* Fondo Holográfico 3D GridScan */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-40">
        {!isMobile ? (
          <GridScan
            sensitivity={0.5}
            lineThickness={1}
            linesColor="#1e1b4b"
            gridScale={0.08}
            scanColor="#a855f7"
            scanOpacity={0.25}
            lineStyle="solid"
            lineJitter={0.05}
            enablePost={true}
            bloomIntensity={0.5}
            chromaticAberration={0.001}
            noiseIntensity={0.008}
            enableWebcam={false}
            showPreview={false}
            scanDuration={3.0}
            scanDelay={2.0}
          />
        ) : (
          <div className="relative w-full h-full overflow-hidden">
            <div 
              className="absolute inset-0 opacity-10" 
              style={{
                backgroundImage: `linear-gradient(to right, #1e1b4b 1px, transparent 1px), linear-gradient(to bottom, #1e1b4b 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
              }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.04)_0%,transparent_70%)]" />
          </div>
        )}
      </div>
      
      {/* 1. Elementos de decoración de fondo / Gradientes Neón */}
      <div 
        className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-[#00F2FE]/4 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-[#E945F5]/4 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      
      {/* Cuadrícula o Malla fina */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* 2. Cabecera de la sección */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-20">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-50">
            Categorías de{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-scroll">
              Desarrollo
            </span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
            Elegí una categoría para explorar propuestas de maquetación específicas y proyectos reales alineados con el mercado tecnológico.
          </p>
        </div>

        {/* 3. Gateway Hub - 3 Columnas Monumentales */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            
            return (
              <motion.article
                key={cat.id}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                className={`group relative flex flex-col justify-between p-7 sm:p-8 rounded-3xl bg-neutral-950/50 border border-neutral-900 backdrop-blur-md transition-all duration-500 ${cat.borderColor} ${cat.shadowColor} overflow-hidden`}
              >
                {/* Link Overlay que hace clickable toda la tarjeta */}
                <Link 
                  href={cat.path} 
                  className="absolute inset-0 z-20 cursor-pointer"
                  aria-label={`Explorar portfolio de ${cat.title}`}
                />

                {/* Resplandor de gradiente interno */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${cat.glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
                  aria-hidden="true"
                />

                <div className="flex flex-col gap-6 flex-grow relative z-10">
                  
                  {/* Arriba: Vista Previa de la Interfaz */}
                  <div className="relative overflow-hidden rounded-xl bg-neutral-950/80 p-1 border border-neutral-900 group-hover:border-neutral-800 transition-colors duration-300">
                    {renderCategoryPreview(cat.id)}
                  </div>

                  {/* Centro: Título, Icono y Subtítulo */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div 
                        className="h-9 w-9 rounded-lg flex items-center justify-center transition-colors duration-300"
                        style={{ backgroundColor: `${cat.accentColor}12`, border: `1px solid ${cat.accentColor}25` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: cat.accentColor }} />
                      </div>
                      <div>
                        <h3 className="font-extrabold tracking-wider text-white text-lg uppercase">
                          {cat.title}
                        </h3>
                        <p className="text-[10px] uppercase font-bold tracking-widest" style={{ color: cat.accentColor }}>
                          {cat.subtitle}
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-xs text-neutral-400 font-light leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  {/* Abajo: Listado de características clave */}
                  <div className="border-t border-neutral-900/60 pt-5 mt-auto">
                    <ul className="space-y-2.5">
                      {cat.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-[11px] text-neutral-300 font-medium">
                          <Check className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: cat.accentColor }} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Base: Botón de exploración idéntico pero adaptable */}
                <div className="w-full mt-8 relative z-10 pointer-events-none">
                  <div 
                    className={`w-full py-3 px-4 rounded-xl text-center text-xs font-black uppercase tracking-widest border transition-all duration-300 flex items-center justify-center gap-1.5 bg-neutral-900/30 border-neutral-800 text-neutral-300 ${
                      cat.id === 'landings'
                        ? 'group-hover:bg-[#00F2FE] group-hover:border-[#00F2FE] group-hover:text-black group-hover:shadow-[0_0_15px_rgba(0,242,254,0.3)]'
                        : cat.id === 'ecommerce'
                        ? 'group-hover:bg-[#E945F5] group-hover:border-[#E945F5] group-hover:text-black group-hover:shadow-[0_0_15px_rgba(233,69,245,0.3)]'
                        : 'group-hover:bg-[#2F4BC0] group-hover:border-[#2F4BC0] group-hover:text-black group-hover:shadow-[0_0_15px_rgba(47,75,192,0.3)]'
                    }`}
                  >
                    <span>EXPLORAR CATEGORÍA ↗</span>
                  </div>
                </div>

              </motion.article>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
