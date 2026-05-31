'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/ui/Navbar';
import QuoteModal from '@/components/ui/QuoteModal';
import dynamic from 'next/dynamic';
import { useIsMobile } from '@/hooks/useIsMobile';

const DarkVeil = dynamic(() => import('../landings/DarkVeil'), { ssr: false });
import { 
  ArrowLeft, 
  Check, 
  Zap, 
  Cpu, 
  Sparkles, 
  Code2, 
  Layers,
  Database,
  Terminal,
  Grid,
  ShieldAlert,
  Users
} from 'lucide-react';

const SAAS_TIERS = [
  {
    id: 'webapp',
    title: 'SISTEMAS & WEB APPS DE GESTIÓN',
    price: '$700 USD',
    tagline: 'Gestión Interna y Automatización',
    description: 'Sistemas a medida para administrar reservas, turnos, clientes o facturación. Conectados a bases de datos relacionales rápidas e interfaces de usuario intuitivas para optimizar las operaciones de tu equipo.',
    features: [
      'Panel de control interactivo (Dashboard de métricas)',
      'Sistemas de gestión de turnos/citas interactivo',
      'Inicio de sesión y autenticación de usuarios (JWT / Supabase)',
      'Base de datos SQL integrada (PostgreSQL / SQLite)',
      'Módulo de exportación de reportes (PDF / Excel)',
      'Diseño responsivo de alta performance'
    ],
    tech: ['React', 'Next.js', 'Supabase', 'Tailwind CSS v4'],
    badge: 'Modelo Gestión',
    badgeIcon: Zap,
    badgeColor: 'text-[#60a5fa] border-[#60a5fa]/20 bg-[#60a5fa]/5',
    accentColor: '#3b82f6',
    img: '/ecommerce/express_shop.png'
  },
  {
    id: 'saas',
    title: 'PLATAFORMAS SAAS MULTI-USUARIO',
    price: '$1200+ USD',
    tagline: 'Estructuras Robustas y Modelos de Negocio',
    description: 'Desarrollo de software completo bajo modelo de suscripción. Soporte multi-inquilino (multi-tenant), pasarela de cobro recurrente integrada (Stripe Billing), roles avanzados y escalabilidad elástica en la nube.',
    features: [
      'Arquitectura SaaS Multi-Inquilino (Multi-tenant)',
      'Suscripciones recurrentes integradas con Stripe Billing',
      'Roles y permisos avanzados (Admin, Staff, Clientes)',
      'Panel analítico complejo con gráficos en tiempo real',
      'Configuración e integración de APIs de terceros',
      'Despliegue serverless de alta disponibilidad global'
    ],
    tech: ['Next.js', 'Supabase Auth & DB', 'Stripe Billing', 'TypeScript'],
    badge: 'Modelo SaaS',
    badgeIcon: Sparkles,
    badgeColor: 'text-[#818cf8] border-[#818cf8]/20 bg-[#818cf8]/5',
    accentColor: '#6366f1',
    img: '/ecommerce/corporate_shop.png'
  }
];

export default function SaasPortfolioPage() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const isMobile = useIsMobile();

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
      return <Zap className="w-3.5 h-3.5 text-[#3b82f6]" />;
    }
    if (lower.includes('stripe')) {
      return <Cpu className="w-3.5 h-3.5 text-[#635bff]" />;
    }
    if (lower.includes('supabase')) {
      return <Database className="w-3.5 h-3.5 text-[#3ecf8e]" />;
    }
    return <Grid className="w-3.5 h-3.5 text-neutral-400" />;
  };

  return (
    <div className="min-h-screen text-neutral-100 flex flex-col justify-between selection:bg-[#2F4BC0] selection:text-white font-sans overflow-hidden relative">
      
      {/* Fondo Base Oscuro */}
      <div className="fixed inset-0 bg-[#050406] -z-20 pointer-events-none" aria-hidden="true" />

      {/* Fondo de Shader DarkVeil */}
      <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none">
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          {!isMobile && (
            <DarkVeil
              hueShift={220} // Shift background hue to blue/cyan tones for SaaS
              noiseIntensity={0}
              scanlineIntensity={0}
              speed={0.5}
              scanlineFrequency={0}
              warpAmount={0}
            />
          )}
        </div>
        {/* Capa de oscurecimiento para legibilidad del texto */}
        <div className="absolute inset-0 bg-[#050406]/75" />
      </div>

      <Navbar onQuoteClick={() => setIsQuoteOpen(true)} />

      <main className="flex-grow max-w-7xl w-full mx-auto px-6 pt-36 pb-24 relative z-10">
        
        {/* Cabecera superior alineada simétricamente */}
        <div className="flex items-center justify-between w-full border-b border-neutral-800/40 pb-6 mb-8 gap-4">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest font-extrabold text-[#2F4BC0]">
              PORTFOLIO / CATEGORÍA
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white uppercase bg-gradient-to-r from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent leading-none">
              Web Apps & SaaS
            </h1>
          </div>
          <Link 
            href="/#proyectos" 
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-[#2F4BC0] hover:bg-[#2F4BC0]/5 hover:border-[#2F4BC0]/30 px-3.5 py-1.5 rounded-xl border border-transparent transition-all duration-300 group shrink-0"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Volver al Inicio
          </Link>
        </div>

        {/* Descripción de la Categoría */}
        <p className="text-sm sm:text-base text-white font-normal leading-relaxed max-w-3xl mb-12">
          Sistemas e infraestructura de software a medida. Diseñamos plataformas orientadas a la optimización de procesos de negocio y productos SaaS escalables, listos para manejar altos volúmenes de usuarios y transacciones seguras.
        </p>

        {/* Listado de Ofertas / Tiers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {SAAS_TIERS.map((tier) => {
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
                  {/* Portada Visual Real */}
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden rounded-2xl border border-neutral-900 bg-neutral-900">
                    <div className="w-full h-full bg-gradient-to-br from-neutral-900 to-neutral-950 flex items-center justify-center p-6 text-center">
                      <Cpu className="w-16 h-16 text-neutral-800 group-hover:scale-110 transition-transform duration-500" style={{ color: `${tier.accentColor}40` }} />
                    </div>
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
                        <span className="text-[9px] uppercase font-bold text-green-700/90 tracking-wider font-sans">
                          Base
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

                  {/* Listado de Características */}
                  <div className="border-t border-neutral-900/80 pt-5 space-y-3">
                    <h4 className="text-[10px] uppercase font-black tracking-widest text-neutral-500">
                      ¿Qué incluye el desarrollo?
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
                  <button
                    onClick={() => setIsQuoteOpen(true)}
                    className="w-full py-3 px-4 rounded-xl text-center text-xs font-black uppercase tracking-widest border transition-all duration-300 flex items-center justify-center cursor-pointer text-white bg-neutral-900/30 border-neutral-800 hover:text-black"
                    style={{
                      '--hover-bg': tier.accentColor,
                    } as React.CSSProperties}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = tier.accentColor;
                      e.currentTarget.style.borderColor = tier.accentColor;
                      e.currentTarget.style.color = '#000000';
                      e.currentTarget.style.boxShadow = `0 0 15px ${tier.accentColor}40`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.borderColor = '#262626';
                      e.currentTarget.style.color = '#ffffff';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    COTIZAR MODELO ↗
                  </button>
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
              <span className="h-1.5 w-1.5 rounded-full bg-[#2F4BC0]" />
              Alta performance garantizada
            </span>
          </div>
        </div>
      </footer>

      {/* Modal de Cotización */}
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </div>
  );
}
