'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

interface FooterLink {
  label: string;
  href: string;
}

const SERVICIOS_LINKS: FooterLink[] = [
  { label: 'Desarrollo Web Premium', href: '/portfolio/landings' },
  { label: 'E-commerce Escalables', href: '/portfolio/ecommerce' },
  { label: 'Aplicaciones Web a Medida', href: '/portfolio/saas' },
  { label: 'Optimización SEO & Performance', href: '/#beneficios' },
];

const AGENCIA_LINKS: FooterLink[] = [
  { label: 'Sobre Nosotros', href: '/#sobre-nosotros' },
  { label: 'Casos de Éxito', href: '/#proyectos' },
  { label: 'Preguntas Frecuentes', href: '/#faq' },
  { label: 'Contacto', href: '/#contacto' },
  { label: 'Portfolio Oficial', href: 'https://portafolio-joa-tech.vercel.app/' },
];

const LinkedinIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const GithubIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const WhatsappIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.731-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.019-5.114-2.875-6.973-1.856-1.86-4.332-2.883-6.973-2.884-5.439 0-9.865 4.425-9.869 9.87-.001 1.701.453 3.361 1.315 4.8l-.999 3.648 3.717-.975zm11.367-6.864c-.328-.164-1.94-.957-2.268-1.076-.328-.12-.568-.18-.807.18-.239.359-.926 1.166-1.135 1.405-.21.239-.419.269-.747.104-.328-.164-1.386-.51-2.64-1.628-.975-.869-1.633-1.942-1.824-2.27-.191-.328-.02-.505.143-.668.147-.146.328-.389.493-.583.164-.194.219-.329.328-.549.11-.22.055-.41-.027-.573-.082-.164-.807-1.942-1.106-2.66-.291-.703-.588-.607-.807-.618-.21-.01-.448-.012-.687-.012-.239 0-.628.09-.957.449-.328.359-1.256 1.227-1.256 2.992 0 1.766 1.286 3.475 1.465 3.714.18.24 2.532 3.867 6.134 5.422.857.371 1.526.592 2.048.757.86.273 1.644.235 2.263.142.69-.104 1.94-.793 2.215-1.558.275-.765.275-1.42.193-1.558-.082-.138-.299-.22-.628-.384z"/>
  </svg>
);

const SOCIAL_LINKS = [
  { 
    icon: LinkedinIcon, 
    href: 'https://www.linkedin.com/in/joaquin-gil-apesteguia-ignacio-a963a737a', 
    label: 'LinkedIn', 
    hoverStyles: 'hover:text-sky-500 hover:border-sky-500/30 hover:bg-sky-500/5' 
  },
  { 
    icon: GithubIcon, 
    href: 'https://github.com/joak1267', 
    label: 'GitHub', 
    hoverStyles: 'hover:text-white hover:border-zinc-300/30 hover:bg-zinc-300/5' 
  },
  { 
    icon: InstagramIcon, 
    href: 'https://www.instagram.com/joaco_2206/?hl=es-la', 
    label: 'Instagram', 
    hoverStyles: 'hover:text-fuchsia-500 hover:border-fuchsia-500/30 hover:bg-fuchsia-500/5' 
  },
  { 
    icon: WhatsappIcon, 
    href: 'https://wa.me/5491124673417', 
    label: 'WhatsApp', 
    hoverStyles: 'hover:text-emerald-500 hover:border-emerald-500/30 hover:bg-emerald-500/5' 
  },
];

export default function Footer() {
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    fetch('/developer.json')
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error('Error loading Lottie animation:', err));
  }, []);

  return (
    <footer className="relative z-15 border-t border-zinc-900/60 bg-zinc-950 px-6 py-16 sm:py-24 text-zinc-400 selection:bg-indigo-500 selection:text-white font-sans">
      {/* Luces de fondo decorativas muy sutiles */}
      <div 
        className="absolute top-0 left-1/3 w-[300px] h-[300px] rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none"
        aria-hidden="true"
      />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 pb-16 border-b border-zinc-900/60">
          
          {/* Columna 1 & 2: Marca (ocupa 2 columnas en medianas/grandes) */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <Link 
                href="/"
                className="font-extrabold text-xl tracking-tight text-white uppercase hover:text-sky-400 transition-colors duration-200"
              >
                JoaTech
              </Link>
            </div>
            
            <p className="text-sm font-light leading-relaxed text-zinc-400 max-w-sm">
              Construimos soluciones digitales de alto rendimiento con arquitectura moderna y escalable. Experiencias web premium que impulsan tu negocio al siguiente nivel.
            </p>

            {/* Animación Lottie de desarrollador */}
            <div className="max-w-[240px] w-full">
              {animationData && (
                <Lottie
                  animationData={animationData}
                  loop={true}
                  autoplay={true}
                />
              )}
            </div>
          </div>

          {/* Columna 3: Servicios */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-extrabold tracking-widest text-zinc-200">
              Servicios
            </h4>
            <ul className="space-y-3">
              {SERVICIOS_LINKS.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-sm font-light text-zinc-400 hover:text-violet-400 transition-colors duration-200 flex items-center gap-1 group"
                  >
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4: Agencia & Redes */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h4 className="text-xs uppercase font-extrabold tracking-widest text-zinc-200">
                Agencia
              </h4>
              <ul className="space-y-3">
                {AGENCIA_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href}
                      className="group text-sm font-light text-zinc-400 hover:text-violet-400 transition-colors duration-200 flex items-center gap-1.5"
                    >
                      <svg 
                        className="w-2.5 h-2.5 text-zinc-600 group-hover:text-violet-400 group-hover:translate-x-0.5 transition-all duration-200 shrink-0" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor" 
                        strokeWidth={3}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs uppercase font-extrabold tracking-widest text-zinc-200">
                Conectemos
              </h4>
              <div className="flex gap-4">
                {SOCIAL_LINKS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      className={`h-9 w-9 rounded-lg border border-zinc-800 bg-zinc-900/40 flex items-center justify-center text-zinc-400 transition-all duration-300 ${item.hoverStyles}`}
                    >
                      <Icon />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

        {/* Sub-footer (Barra Inferior) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div suppressHydrationWarning>
            &copy; {new Date().getFullYear()} JoaTech. Todos los derechos reservados.
          </div>
          
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-zinc-200 transition-colors duration-200">
              Políticas de Privacidad
            </Link>
            <Link href="/terms" className="hover:text-zinc-200 transition-colors duration-200">
              Términos del Servicio
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
