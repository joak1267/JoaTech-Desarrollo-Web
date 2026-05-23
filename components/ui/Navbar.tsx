'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';

interface NavItem {
  label: string;
  id: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Inicio', id: 'inicio' },
  { label: 'Proyectos', id: 'proyectos' },
  { label: 'Nosotros', id: 'sobre-nosotros' },
  { label: 'Beneficios', id: 'beneficios' },
  { label: 'Proceso', id: 'proceso' },
  { label: 'FAQ', id: 'faq' },
  { label: 'Contacto', id: 'contacto' },
];

interface NavbarProps {
  onQuoteClick: () => void;
}

export default function Navbar({ onQuoteClick }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Controlar el cambio de estilo con el scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Fallback para cuando estamos arriba del todo
      if (window.scrollY < 80) {
        setActiveSection('inicio');
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Detectar la sección activa en pantalla con Intersection Observer
  useEffect(() => {
    if (pathname !== '/') {
      setActiveSection(''); // Limpiar sección activa si no estamos en la Home
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '-80px 0px -60% 0px', // Margen adaptado al navbar flotante
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    NAV_ITEMS.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [pathname]);

  // Desplazamiento suave con offset para no tapar los títulos o redirección
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    setIsOpen(false);
    
    if (pathname !== '/') {
      e.preventDefault();
      router.push('/#' + id);
    } else {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        const offset = 90; // Offset para el navbar flotante
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <>
      {/* 1. Contenedor de la Barra de Navegación */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] sm:w-[95%] max-w-5xl transition-all duration-500 rounded-full border ${
          isScrolled
            ? 'bg-neutral-950/70 backdrop-blur-md border-[#00F2FE]/20 shadow-[0_0_25px_rgba(0,242,254,0.15)] py-2.5 px-4 sm:px-6'
            : 'bg-transparent border-transparent py-4 px-6'
        }`}
      >
        <div className="flex items-center justify-between w-full">
          {/* Logo JoaTech */}
          <a
            href={pathname === '/' ? '#inicio' : '/#inicio'}
            onClick={(e) => handleNavClick(e, 'inicio')}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-[#00F2FE] via-[#2F4BC0] to-[#E945F5] flex items-center justify-center font-bold text-white shadow-md shadow-[#00F2FE]/10 group-hover:shadow-[#00F2FE]/30 transition-all duration-300 group-hover:scale-105">
              J
            </div>
            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent group-hover:from-white group-hover:to-[#00F2FE] transition-all duration-300">
              JoaTech
            </span>
          </a>

          {/* Links para Desktop */}
          <div className="hidden md:flex items-center gap-1.5 bg-neutral-900/30 border border-neutral-800/20 px-2 py-1.5 rounded-full relative">
            {NAV_ITEMS.map((item, index) => {
              const isActive = activeSection === item.id;
              const isHovered = hoveredIndex === index;
              
              return (
                <a
                  key={item.id}
                  href={pathname === '/' ? `#${item.id}` : `/#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase transition-colors duration-300 select-none z-10 ${
                    isActive ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {/* Indicador animado elástico de fondo */}
                  <AnimatePresence>
                    {(isActive || isHovered) && (
                      <motion.span
                        layoutId="active-pill"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{
                          type: 'spring',
                          stiffness: 350,
                          damping: 28,
                        }}
                        className={`absolute inset-0 rounded-full -z-10 transition-colors duration-300 ${
                          isActive
                            ? 'bg-purple-500/10 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.05)]'
                            : 'bg-purple-500/5 border border-transparent'
                        }`}
                      />
                    )}
                  </AnimatePresence>
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* CTA / Botón de Acción derecha */}
          <div className="hidden md:block">
            <button
              onClick={onQuoteClick}
              className="relative inline-flex items-center justify-center px-5 py-2 text-xs font-bold tracking-wide uppercase rounded-full text-white bg-gradient-to-r from-[#00F2FE] to-[#2F4BC0] transition-all duration-300 hover:scale-105 cursor-pointer shadow-[0_0_15px_rgba(0,242,254,0.25)] hover:shadow-[0_0_25px_rgba(0,242,254,0.55)] border border-[#00F2FE]/20"
            >
              Cotizar
            </button>
          </div>

          {/* Botón de Hamburguesa para Mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-neutral-950/60 border border-neutral-800/40 hover:border-purple-500/40 hover:shadow-[0_0_12px_rgba(168,85,247,0.2)] transition-all duration-300 backdrop-blur-md cursor-pointer group"
            aria-label="Toggle Menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-neutral-400 group-hover:text-white transition-colors duration-300">
              <motion.line
                x1="4"
                y1="6"
                x2="20"
                y2="6"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                style={{ originX: '12px', originY: '6px' }}
              />
              <motion.line
                x1="4"
                y1="12"
                x2="20"
                y2="12"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.15 }}
              />
              <motion.line
                x1="4"
                y1="18"
                x2="20"
                y2="18"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                style={{ originX: '12px', originY: '18px' }}
              />
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* 2. Menú Desplegable para Móviles */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-40 w-[92%] bg-neutral-950/90 backdrop-blur-xl border border-[#00F2FE]/25 rounded-3xl p-6 md:hidden shadow-[0_15px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(0,242,254,0.1)] flex flex-col gap-6"
          >
            <div className="flex flex-col gap-3">
              {NAV_ITEMS.map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.a
                    key={item.id}
                    href={pathname === '/' ? `#${item.id}` : `/#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`px-4 py-2.5 rounded-xl text-sm font-bold tracking-wide uppercase transition-all duration-300 border ${
                      isActive
                        ? 'text-[#00F2FE] bg-[#00F2FE]/5 border-[#00F2FE]/20 shadow-[0_0_10px_rgba(0,242,254,0.05)]'
                        : 'text-neutral-400 border-transparent hover:text-white hover:bg-neutral-900/50'
                    }`}
                  >
                    {item.label}
                  </motion.a>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="border-t border-neutral-900 pt-4"
            >
              <button
                onClick={() => {
                  setIsOpen(false);
                  onQuoteClick();
                }}
                className="w-full inline-flex items-center justify-center py-3 text-xs font-bold tracking-wide uppercase rounded-xl text-white bg-gradient-to-r from-[#00F2FE] to-[#2F4BC0] transition-all duration-300 shadow-[0_0_15px_rgba(0,242,254,0.2)] active:scale-98 cursor-pointer"
              >
                Cotizar Proyecto
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
