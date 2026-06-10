'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Cpu, 
  Globe, 
  Flame, 
  Layers, 
  Gamepad2, 
  TrendingUp, 
  X, 
  Check, 
  ExternalLink,
  Hourglass,
  Sparkles,
  Scissors
} from 'lucide-react';

import dynamic from 'next/dynamic';
import { useIsMobile } from '@/hooks/useIsMobile';

const GridScan = dynamic(() => import("@/components/ui/GridScan"), { ssr: false });

// Tipado de proyectos
interface Project {
  id: string;
  title: string;
  category: 'saas' | 'web' | 'juegos';
  categoryLabel: string;
  tagline: string;
  description: string;
  features: string[];
  tech: string[];
  status: 'live' | 'development';
  accentColor: string;
  glowColor: string;
  icon: React.ComponentType<any>;
  img: string;
  demoUrl?: string;
  logoUrl?: string;
}

const PROJECTS_DATA: Project[] = [
  {
    id: 'evidenstalk',
    title: 'eVidensTalk Enterprise',
    category: 'saas',
    categoryLabel: 'SaaS & AI Client',
    tagline: 'Cliente AI de Escritorio con Base de Datos Híbrida',
    description: 'Plataforma de escritorio empresarial que integra modelos de lenguaje local y en la nube. Diseñada con arquitectura offline-first con SQLite local y sincronización en tiempo real mediante Supabase.',
    features: [
      'Motor de IA local integrado mediante @xenova/transformers',
      'Sincronización bidireccional automática en la nube con Supabase',
      'Base de datos SQLite local con indexación y buscador FTS5',
      'Cliente de escritorio multiplataforma desarrollado con Electron y React 19'
    ],
    tech: ['React 19', 'Electron 33', 'Supabase', 'SQLite', 'Transformers.js'],
    status: 'live',
    accentColor: '#3b82f6',
    glowColor: 'rgba(59, 130, 246, 0.4)',
    icon: Bot,
    img: '/landings/apex_hero_bg.jpg',
    demoUrl: 'https://evidenstalk.vercel.app/',
    logoUrl: '/logo_evidenstalk.png'
  },
  {
    id: 'aaron',
    title: 'Aaron in Rio',
    category: 'web',
    categoryLabel: 'Turismo & Reservas',
    tagline: 'Sitio Oficial de Actividades y Tours en Río de Janeiro',
    description: 'Página web oficial de turismo y reservas para el mercado brasilero. Diseñada desde cero con foco absoluto en SEO local, velocidad de carga y conversión de reservas directa a WhatsApp.',
    features: [
      'Integración dinámica de itinerarios y tours turísticos',
      'Estructura web optimizada logrando 99/100 en Google Lighthouse',
      'Checkout y reservas instantáneas directamente integradas con WhatsApp',
      'Diseño responsivo de alta gama con carga inteligente de imágenes'
    ],
    tech: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'WhatsApp API'],
    status: 'live',
    accentColor: '#06b6d4',
    glowColor: 'rgba(6, 182, 212, 0.4)',
    icon: Globe,
    img: '/landings/apex_hero_bg.jpg',
    demoUrl: 'https://aaroninrio.com/',
    logoUrl: '/logo_aaron.png'
  },
  {
    id: 'scraper',
    title: 'Scrap Web System',
    category: 'saas',
    categoryLabel: 'Automatización & Scraping',
    tagline: 'Extractor de Prospectos y Leads Comerciales',
    description: 'Herramienta interna de automatización que ejecuta agentes de Playwright en segundo plano para recopilar datos de contacto de empresas directamente desde directorios públicos.',
    features: [
      'Script de extracción automatizada en Python con Playwright',
      'Bypass de protecciones antibot con rotación inteligente de cabeceras',
      'Pipeline de procesamiento y formateo directo a planillas Excel (XLSX)',
      'Dashboard interactivo en React para monitorear delays e hilos de ejecución'
    ],
    tech: ['React', 'Electron', 'Python', 'Playwright', 'Excel Pipeline'],
    status: 'live',
    demoUrl: 'https://scraping-web-system.vercel.app/',
    accentColor: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.4)',
    icon: Flame,
    img: '/ecommerce/express_shop.png',
    logoUrl: '/logo_scraper.png'
  },
  {
    id: 'crossfit',
    title: 'CrossFit Box',
    category: 'web',
    categoryLabel: 'Fitness Landing',
    tagline: 'Landing Page de Alta Conversión para Boxes de CrossFit',
    description: 'Prototipo interactivo enfocado en captación de atletas para gimnasios y boxes de CrossFit. Cuenta con una estética oscura agresiva y animaciones estimulantes en hover.',
    features: [
      'Simulador interactivo para agendar clases y entrenamientos de prueba',
      'Diseño bento para visualizar los entrenamientos del día (WOD)',
      'Módulo de tarifas dinámico y tablas comparativas de membresías',
      'Compilación ultrarrápida optimizada en Next.js con Turbopack'
    ],
    tech: ['Next.js 16', 'Tailwind CSS', 'Framer Motion', 'Turbopack'],
    status: 'live',
    demoUrl: 'https://crossfit-villa-luro.vercel.app/',
    accentColor: '#f97316',
    glowColor: 'rgba(249, 115, 22, 0.4)',
    icon: Flame,
    img: '/landings/spa_hero.jpg',
    logoUrl: '/logo_crossfit.png'
  },
  {
    id: 'nike-store',
    title: 'Nike Store',
    category: 'web',
    categoryLabel: 'E-Commerce / Landing',
    tagline: 'Landing Page y Tienda Virtual Premium de Nike',
    description: 'Réplica ultra profesional y optimizada de la tienda Nike oficial. Cuenta con un sistema de doble cabecera, selección de tallas interactiva con validación, carrito lateral persistente segregado por talle y catálogo de productos reales.',
    features: [
      'Doble cabecera oficial con logotipos vectoriales de Nike y Jordan',
      'Modal de detalles de calzado con selección de tallas y visualizador de miniaturas',
      'Carrito lateral interactivo (bolsa) con lógica de persistencia local',
      'Diseño responsive adaptado y optimizado con variables CSS y tipografías premium'
    ],
    tech: ['HTML5', 'CSS3 Vanilla', 'JavaScript (ES6)', 'Vercel Deployment'],
    status: 'live',
    demoUrl: 'https://nike-store-three-alpha.vercel.app/',
    accentColor: '#ffffff',
    glowColor: 'rgba(255, 255, 255, 0.4)',
    icon: Globe,
    img: '/ecommerce/express_shop.png',
    logoUrl: '/logo_nike.svg'
  },
  {
    id: 'peluqueria-demo',
    title: 'Peluqueria Demo',
    category: 'web',
    categoryLabel: 'Turnero & Barber Shop',
    tagline: 'Terminal de Turnos Online y Catálogo de Estilos',
    description: 'Aplicación web premium para peluquerías y barberías con un sistema de reservas dinámico mediante acordeón inteligente y catálogo de cortes interactivo integrado con WhatsApp.',
    features: [
      'Menú interactivo de reserva de turnos en 4 etapas consolidado',
      'Lookbook / Catálogo de estilos con opción de reserva directa de look',
      'Selección de estilista personalizado y calendario interactivo mensual',
      'Integración nativa para confirmaciones instantáneas por WhatsApp API'
    ],
    tech: ['React 19', 'Vite', 'Tailwind CSS', 'WhatsApp API'],
    status: 'live',
    demoUrl: 'https://peluqueria-demo-phi.vercel.app/',
    accentColor: '#c5a880',
    glowColor: 'rgba(197, 168, 128, 0.4)',
    icon: Scissors,
    img: '/landings/spa_hero.jpg'
  }
];

export default function Works() {
  const [activeTab, setActiveTab] = useState<'todos' | 'saas' | 'web'>('todos');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const isMobile = useIsMobile();

  // Filtrado de proyectos
  const filteredProjects = PROJECTS_DATA.filter(project => {
    if (activeTab === 'todos') return true;
    return project.category === activeTab;
  });

  return (
    <section id="mis-trabajos" className="relative bg-neutral-950 px-6 py-24 overflow-hidden border-t border-neutral-900">
      
      {/* Fondo Holográfico 3D GridScan de Alta Tecnología */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-30">
        {!isMobile ? (
          <GridScan
            sensitivity={0.4}
            lineThickness={1}
            linesColor="#1e1b4b"
            gridScale={0.1}
            scanColor="#3b82f6"
            scanOpacity={0.2}
            lineStyle="solid"
            lineJitter={0.03}
            enablePost={true}
            bloomIntensity={0.3}
            chromaticAberration={0.001}
            noiseIntensity={0.005}
            enableWebcam={false}
            showPreview={false}
            scanDuration={4.0}
            scanDelay={3.0}
          />
        ) : (
          <div className="relative w-full h-full overflow-hidden">
            <div 
              className="absolute inset-0 opacity-5" 
              style={{
                backgroundImage: `linear-gradient(to right, #1e1b4b 1px, transparent 1px), linear-gradient(to bottom, #1e1b4b 1px, transparent 1px)`,
                backgroundSize: '48px 48px',
              }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03)_0%,transparent_70%)]" />
          </div>
        )}
      </div>

      {/* Luces de fondo decorativas (Tech Glow) */}
      <div 
        className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Cabecera de la sección */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-50 uppercase">
            Mis Trabajos
          </h2>
          <p className="text-sm text-neutral-400 font-light leading-relaxed">
            Hacé clic en los íconos para explorar los detalles técnicos, capturas de pantalla y el estado de desarrollo de cada aplicación.
          </p>
        </div>

        {/* Selector de Pestañas (Filtros) */}
        <div className="flex justify-center mb-14">
          <div className="flex bg-neutral-950/80 p-1.5 rounded-2xl border border-neutral-900 backdrop-blur-md">
            {[
              { id: 'todos', label: 'Todos' },
              { id: 'saas', label: 'SaaS & Software' },
              { id: 'web', label: 'Webs & Landings' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-neutral-900 text-white shadow-sm border border-neutral-800'
                    : 'text-neutral-500 hover:text-neutral-300 border border-transparent'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Escritorio / Rejilla de Íconos de Apps */}
        <motion.div 
          layout
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-y-10 gap-x-6 justify-items-center max-w-4xl mx-auto"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const ProjectIcon = project.icon;
              return (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setSelectedProject(project)}
                  className="group flex flex-col items-center text-center cursor-pointer select-none relative"
                >
                  {/* Ícono de App Cuadrado */}
                  <div 
                    className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-[1.5rem] bg-neutral-950/50 border border-neutral-900 flex items-center justify-center transition-all duration-300 group-hover:scale-105"
                    style={{
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = project.accentColor;
                      e.currentTarget.style.boxShadow = `0 0 25px ${project.glowColor}`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#171717';
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4)';
                    }}
                  >
                    {/* Gradiente de Fondo del Ícono (Hover) */}
                    <div 
                      className="absolute inset-0 rounded-2xl sm:rounded-[1.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${project.accentColor}15, transparent)`
                      }}
                    />

                    {/* Ícono central */}
                    {project.logoUrl ? (
                      <img 
                        src={project.logoUrl} 
                        alt={project.title} 
                        className="w-9 h-9 sm:w-11 sm:h-11 object-contain rounded-xl select-none pointer-events-none transition-transform duration-300"
                      />
                    ) : (
                      <ProjectIcon 
                        className="w-7 h-7 sm:w-9 sm:h-9 transition-colors duration-300"
                        style={{ color: project.accentColor }}
                      />
                    )}

                    {/* Indicador de Status "Live" discreto en el ícono */}
                    {project.status === 'live' && (
                      <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                    )}
                  </div>

                  {/* Nombre de la App */}
                  <span className="mt-3 text-[11px] sm:text-xs font-bold text-neutral-400 group-hover:text-neutral-200 transition-colors tracking-wide max-w-[90px] truncate-2-lines leading-tight">
                    {project.title}
                  </span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Modal de Detalle de App */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop con Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Contenedor del Modal */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative w-full max-w-4xl bg-neutral-950 border border-neutral-900 rounded-[2.5rem] overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row max-h-[92vh]"
            >
              
              {/* Botón de Cerrar */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 z-20 p-2.5 rounded-full border border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white hover:bg-red-500/20 hover:border-red-500/50 hover:scale-110 active:scale-95 transition-all duration-200"
                aria-label="Cerrar modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Columna Izquierda: Vista Previa Visual / Abstracta */}
              <div className="w-full md:w-[45%] h-52 md:h-auto min-h-[220px] bg-neutral-900 relative overflow-hidden flex items-center justify-center border-b md:border-b-0 md:border-r border-neutral-900">
                <img 
                  src={selectedProject.img} 
                  alt={selectedProject.title} 
                  className="absolute inset-0 w-full h-full object-cover opacity-20 filter blur-xs"
                />
                
                {/* Cuadrícula o Malla fina de fondo */}
                <div 
                  className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"
                  aria-hidden="true"
                />

                {/* Gran Ícono de la App Flotante */}
                <div 
                  className="relative w-28 h-28 rounded-[2rem] bg-neutral-950/70 border border-neutral-800 flex items-center justify-center z-10 animate-bounce-slow"
                  style={{
                    boxShadow: `0 0 35px ${selectedProject.glowColor}`
                  }}
                >
                  {selectedProject.logoUrl ? (
                    <img 
                      src={selectedProject.logoUrl} 
                      alt={selectedProject.title} 
                      className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-2xl select-none pointer-events-none"
                    />
                  ) : (
                    React.createElement(selectedProject.icon, {
                      className: "w-14 h-14",
                      style: { color: selectedProject.accentColor }
                    })
                  )}
                </div>
              </div>

              {/* Columna Derecha: Información del Proyecto */}
              <div className="w-full md:w-[55%] p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
                <div className="space-y-4">
                  
                  {/* Badges de Categoría y Status */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-[10px] uppercase font-black tracking-widest text-neutral-400 bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded-lg">
                      {selectedProject.categoryLabel}
                    </span>
                    {selectedProject.status === 'live' ? (
                      <span className="inline-flex items-center gap-1.5 text-[9px] uppercase font-black tracking-widest text-emerald-400 border border-emerald-500/20 bg-emerald-500/5 px-2.5 py-1 rounded-lg">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                        ● Live / Demo
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-[9px] uppercase font-black tracking-widest text-amber-500 border border-amber-500/20 bg-amber-500/5 px-2.5 py-1 rounded-lg">
                        <Hourglass className="w-3 h-3 animate-spin-slow" />
                        ● En Desarrollo
                      </span>
                    )}
                  </div>

                  {/* Título y Tagline */}
                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                      {selectedProject.title}
                    </h3>
                    <p className="text-xs font-bold leading-normal" style={{ color: selectedProject.accentColor }}>
                      {selectedProject.tagline}
                    </p>
                  </div>

                  {/* Descripción */}
                  <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                    {selectedProject.description}
                  </p>

                  {/* Listado de Características */}
                  <div className="space-y-2 pt-1">
                    <h4 className="text-[10px] uppercase font-black tracking-widest text-neutral-500">
                      Especificaciones
                    </h4>
                    <ul className="space-y-2">
                      {selectedProject.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                          <Check className="w-4 h-4 mt-0.5 shrink-0" style={{ color: selectedProject.accentColor }} />
                          <span className="leading-snug">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tecnologías */}
                  <div className="space-y-2 pt-1">
                    <h4 className="text-[10px] uppercase font-black tracking-widest text-neutral-500">
                      Stack de Tecnologías
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.tech.map((t) => (
                        <span 
                          key={t}
                          className="bg-neutral-900 border border-neutral-850 px-2.5 py-1 rounded-lg text-[9px] font-mono text-neutral-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Footer del Modal (Botones) */}
                <div className="mt-5 pt-5 border-t border-neutral-900 flex items-center justify-end gap-4">

                  {selectedProject.status === 'live' ? (
                    <a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-xl text-center text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-1.5 shadow-lg cursor-pointer"
                      style={{
                        backgroundColor: selectedProject.accentColor,
                        color: selectedProject.accentColor === '#ffffff' ? '#111111' : '#ffffff',
                        boxShadow: `0 4px 15px ${selectedProject.glowColor}`
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.filter = 'brightness(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.filter = 'none';
                      }}
                    >
                      Ver Web
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Hourglass className="w-3.5 h-3.5" />
                      Próximamente disponible
                    </span>
                  )}
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
