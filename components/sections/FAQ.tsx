'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LiquidEther from '@/components/ui/LiquidEther';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "¿Cuánto tardás en entregar una landing page?",
    answer: "Por lo general, el tiempo de entrega estimado es menos de 7 días hábiles. Esto depende directamente de la complejidad del diseño, las integraciones solicitadas y la velocidad con la que nos proveas el contenido base (textos e imágenes) y el feedback durante el proceso."
  },
  {
    question: "¿Cómo es el proceso y las condiciones de pago?",
    answer: "Trabajamos con un esquema estándar de 50% de anticipo para dar inicio a la etapa de diseño y planificación, y el 50% restante contra entrega final del proyecto (una vez que el sitio esté desplegado en el servidor de producción y cuente con tu total conformidad). El presupuesto final depende directamente del alcance y valor del proyecto. Para desarrollos de mayor envergadura o alto valor corporativo, ofrecemos la flexibilidad de dividir el pago en hasta 3 partes estructuradas, vinculadas a los hitos y entregas clave del proceso de desarrollo."
  },
  {
    question: "¿Qué tecnologías utilizás para los proyectos?",
    answer: "Nos enfocamos en el desarrollo moderno y de alto rendimiento. Utilizamos Next.js (React) y TypeScript para la arquitectura, Tailwind CSS para estilos optimizados, y Framer Motion para lograr interacciones y micro-animaciones premium. Esto garantiza velocidades de carga ultrarrápidas y excelente posicionamiento SEO."
  },
  {
    question: "¿Los sitios web son adaptables a dispositivos móviles?",
    answer: "Absolutamente. Adoptamos una filosofía de diseño 'Mobile-First'. Tu sitio web se verá y funcionará a la perfección en smartphones, tablets, laptops y pantallas de escritorio de gran resolución, optimizando la experiencia del usuario y la conversión."
  },
  {
    question: "¿El hosting y el dominio están incluidos en el presupuesto?",
    answer: "Te asesoramos en la adquisición de tu dominio y configuramos el hosting de alto rendimiento. Implementamos tu plataforma sobre infraestructura cloud serverless de última generación (como Vercel o Netlify), totalmente optimizada para el ecosistema de Next.js 14 App Router y React Server Components. Esta arquitectura limpia y descentralizada permite servir tu web directamente desde nodos perimetrales (Edge Network) cercanos al usuario. Esto no solo elimina costos de hosting tradicional, sino que garantiza tiempos de carga casi instantáneos (maximizando las métricas de Core Web Vitals) y proporcionando una base de SEO técnico insuperable y escalabilidad automática ilimitada."
  },
  {
    question: "¿Ofrecés soporte técnico post-lanzamiento?",
    answer: "Sí, todos los proyectos incluyen 30 días de soporte técnico gratuito post-lanzamiento para resolver dudas o corregir eventualidades. Finalizado ese período, ofrecemos planes mensuales de mantenimiento preventivo, actualizaciones de seguridad y optimización continua."
  }
];

const ETHER_COLORS = [ '#4c1d95', '#7c3aed', '#1e1b4b' ]; // Tonos Violeta/Índigo profundos

export default function FAQ() {
  // Guardamos el índice del acordeón abierto (null si todos están cerrados)
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative bg-neutral-950 px-6 py-24 sm:py-32 overflow-hidden">
      {/* Fondo WebGL LiquidEther */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-45"
        style={{ 
          maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)', 
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)' 
        }}
      >
        <LiquidEther
          colors={ETHER_COLORS}
          mouseForce={18}
          cursorSize={85}
          resolution={0.4}
          autoDemo={true}
          autoSpeed={0.4}
          autoIntensity={1.8}
        />
      </div>

      {/* Luces de fondo decorativas */}
      <div 
        className="absolute bottom-0 right-1/4 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] rounded-full bg-purple-500/5 blur-[80px] sm:blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div 
        className="absolute top-1/4 left-1/4 w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] rounded-full bg-indigo-500/5 blur-[70px] sm:blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Cabecera de la sección */}
        <div className="text-center flex flex-col items-center gap-4 mb-16 sm:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-50"
          >
            Resolvé tus{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-scroll">
              Dudas
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-neutral-400 text-sm sm:text-base max-w-xl font-light leading-relaxed"
          >
            Todo lo que necesitás saber sobre el proceso de diseño, desarrollo, pagos y soporte técnico para tu próximo sitio web.
          </motion.p>
        </div>

        {/* Lista de Acordeones FAQ con Glassmorphism Individual */}
        <div className="relative z-10 flex flex-col gap-4">
          {faqData.map((item, index) => {
            const isOpen = activeIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={`group rounded-2xl border transition-colors duration-300 backdrop-blur-md overflow-hidden ${
                  isOpen 
                    ? 'bg-neutral-900/40 border-indigo-500/30 shadow-lg shadow-indigo-500/[0.02]' 
                    : 'bg-neutral-950/40 border-neutral-900 hover:border-neutral-800 hover:bg-neutral-900/20'
                }`}
              >
                {/* Botón / Título del acordeón */}
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full text-left px-6 py-5 sm:px-8 sm:py-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-sm sm:text-base text-neutral-100 group-hover:text-neutral-50 transition-colors">
                    {item.question}
                  </span>
                  
                  {/* Icono de estado rotativo */}
                  <div className="flex-shrink-0">
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center border transition-all duration-300 ${
                      isOpen 
                        ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400' 
                        : 'bg-neutral-900 border-neutral-800 text-neutral-400 group-hover:text-neutral-200 group-hover:border-neutral-700'
                    }`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-4 h-4 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </button>

                {/* Contenido animado (Guardado en el DOM para SEO) */}
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: isOpen ? 'auto' : 0,
                    opacity: isOpen ? 1 : 0
                  }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pt-1 sm:px-8 sm:pb-8 text-xs sm:text-sm text-neutral-400 font-light leading-relaxed border-t border-neutral-900/50">
                    <p className="m-0">{item.answer}</p>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
