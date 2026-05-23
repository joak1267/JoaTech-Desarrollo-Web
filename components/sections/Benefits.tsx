'use client';

import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Zap, Search, Shield, Cpu, Sparkles, Terminal, FileCode, CheckCircle2 } from 'lucide-react';

interface BenefitCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
  className?: string;
  children?: React.ReactNode;
}

const BenefitCard = ({ title, description, icon, index, className = '', children }: BenefitCardProps) => {
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 } }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -6, borderColor: 'rgba(99, 102, 241, 0.35)' }}
      className={`p-6 sm:p-8 rounded-3xl bg-neutral-950/40 border border-neutral-900/80 backdrop-blur-xl transition-all duration-500 relative overflow-hidden group hover:bg-neutral-900/20 hover:shadow-[0_20px_50px_rgba(99,102,241,0.05)] ${className}`}
    >
      {/* Decorative hover gradient glow */}
      <div className="absolute -inset-px bg-gradient-to-br from-indigo-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl" />
      
      {/* Subtle ambient light dot */}
      <div className="absolute -right-20 -top-20 w-44 h-44 rounded-full bg-indigo-500/5 blur-[80px] group-hover:bg-indigo-500/10 transition-all duration-500 pointer-events-none" />

      {children}
    </motion.div>
  );
};

export default function Benefits() {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  // Network Nodes definitions for Card 4
  const nodes = [
    { id: 1, cx: 40, cy: 35, label: "Edge US-East", latency: "12ms" },
    { id: 2, cx: 120, cy: 20, label: "Origin DB", latency: "42ms" },
    { id: 3, cx: 200, cy: 30, label: "Edge EU-West", latency: "8ms" },
    { id: 4, cx: 90, cy: 85, label: "Edge SA-East", latency: "15ms" },
    { id: 5, cx: 170, cy: 95, label: "Edge AP-South", latency: "10ms" },
    { id: 6, cx: 240, cy: 80, label: "Edge US-West", latency: "7ms" }
  ];

  return (
    <section id="beneficios" className="relative bg-transparent px-6 py-24 sm:py-32 overflow-hidden">
      {/* Ambient background glows */}
      <div 
        className="absolute top-1/4 left-[-15%] w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-[150px] pointer-events-none select-none"
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-1/4 right-[-15%] w-[600px] h-[600px] rounded-full bg-purple-500/5 blur-[150px] pointer-events-none select-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Badge & Title */}
        <div className="text-center flex flex-col items-center gap-4 mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-50 max-w-3xl leading-tight"
          >
            Web a la{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-scroll">
              medida de tu escala
            </span>
          </motion.h2>
        </div>

        {/* Bento Grid Asimétrico */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 items-stretch">
          
          {/* Tarjeta 1: Velocidad Absoluta (col-span-4) */}
          <BenefitCard
            title="Velocidad Absoluta"
            description="Cargas sub-1s optimizadas nativamente para maximizar tu tasa de conversión y retención."
            icon={<Zap />}
            index={0}
            className="lg:col-span-4 flex flex-col justify-between"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center h-full">
              <div className="md:col-span-7 flex flex-col justify-between h-full space-y-6">
                <div className="space-y-4">
                  <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500/15 transition-all duration-300">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-neutral-100 group-hover:text-neutral-50 transition-colors">
                      Velocidad Absoluta
                    </h3>
                    <p className="text-sm text-neutral-400 leading-relaxed font-light">
                      Cargas sub-1s optimizadas de extremo a extremo. Eliminamos el bloatware y renderizamos en el Edge para lograr una experiencia instantánea.
                    </p>
                  </div>
                </div>

                {/* Performance specs */}
                <div className="grid grid-cols-3 gap-3 border-t border-neutral-900/60 pt-4">
                  <div>
                    <div className="text-[10px] text-neutral-500 font-mono">LCP</div>
                    <div className="text-sm font-bold text-emerald-400 font-mono">0.3s</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-neutral-500 font-mono">FID</div>
                    <div className="text-sm font-bold text-emerald-400 font-mono">11ms</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-neutral-500 font-mono">CLS</div>
                    <div className="text-sm font-bold text-emerald-400 font-mono">0.00</div>
                  </div>
                </div>
              </div>
              
              {/* Google Lighthouse Circle Graphic */}
              <div className="md:col-span-5 flex justify-center lg:justify-end">
                <div className="flex flex-col items-center gap-4 bg-neutral-950/70 p-6 rounded-2xl border border-neutral-900 shadow-2xl shadow-black/50 w-full max-w-[220px]">
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="48" cy="48" r="42" className="stroke-neutral-900" strokeWidth="6" fill="transparent" />
                      <motion.circle 
                        cx="48" 
                        cy="48" 
                        r="42" 
                        className="stroke-emerald-500" 
                        strokeWidth="6" 
                        fill="transparent" 
                        strokeDasharray={264}
                        initial={{ strokeDashoffset: 264 }}
                        whileInView={{ strokeDashoffset: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                        style={{ filter: "drop-shadow(0 0 6px rgba(16, 185, 129, 0.3))" }}
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className="text-neutral-50 font-mono text-2xl font-black leading-none">100</span>
                      <span className="text-[7px] text-emerald-400 font-mono tracking-widest mt-1">PASSED</span>
                    </div>
                  </div>
                  <div className="w-full space-y-1.5 text-center">
                    <div className="text-[9px] text-neutral-500 font-mono tracking-widest">LIGHTHOUSE RATING</div>
                    <div className="text-xs text-neutral-200 font-bold">Rendimiento Perfecto</div>
                    <div className="flex items-center justify-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] text-emerald-400 font-mono font-medium">Core Web Vitals Estables</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </BenefitCard>

          {/* Tarjeta 2: SEO Técnico Nativo (col-span-2) */}
          <BenefitCard
            title="SEO Técnico Nativo"
            description="Estructura semántica limpia e indexación perfecta para escalar orgánicamente en Google."
            icon={<Search />}
            index={1}
            className="lg:col-span-2 flex flex-col justify-between gap-6"
          >
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500/15 transition-all duration-300">
                <Search className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-neutral-100 group-hover:text-neutral-50 transition-colors">
                  SEO Técnico Nativo
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed font-light">
                  Configuración semántica rigurosa, sitemaps dinámicos, indexación inmediata y microdatos estructurados JSON-LD nativos en Next.js.
                </p>
              </div>
            </div>

            {/* Metadatos JSON-LD Mockup (Next.js Syntax style) */}
            <div className="bg-neutral-950/80 rounded-2xl border border-neutral-900/80 p-4 font-mono text-[9px] sm:text-[10px] text-neutral-400 space-y-1.5 overflow-hidden select-none h-44 relative group/code shadow-inner">
              <div className="flex items-center justify-between border-b border-neutral-900 pb-2 mb-2 text-neutral-500">
                <div className="flex items-center gap-1.5">
                  <FileCode className="w-3.5 h-3.5 text-indigo-400" />
                  <span>app/layout.tsx</span>
                </div>
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
              </div>
              <div className="space-y-1 select-none">
                <div><span className="text-purple-400">const</span> <span className="text-blue-400">jsonLd</span> = <span className="text-neutral-300">{"{"}</span></div>
                <div className="pl-3"><span className="text-neutral-500">"@context":</span> <span className="text-emerald-400">"https://schema.org"</span>,</div>
                <div className="pl-3"><span className="text-neutral-500">"@type":</span> <span className="text-emerald-400">"WebSite"</span>,</div>
                <div className="pl-3"><span className="text-neutral-500">"name":</span> <span className="text-emerald-400">"JoaTech Studio"</span>,</div>
                <div className="pl-3"><span className="text-neutral-500">"url":</span> <span className="text-emerald-400">"https://joatech.com"</span></div>
                <div><span className="text-neutral-300">{"};"}</span></div>
                <div className="pt-1"><span className="text-purple-400">export default</span> <span className="text-purple-400">function</span> <span className="text-yellow-400">Layout</span>() ...</div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-neutral-950 to-transparent" />
            </div>
          </BenefitCard>

          {/* Tarjeta 3: Seguridad Blindada (col-span-2) */}
          <BenefitCard
            title="Seguridad Blindada"
            description="Arquitectura aislada sin plugins de terceros vulnerables, protegiendo tus datos al 100%."
            icon={<Shield />}
            index={2}
            className="lg:col-span-2 flex flex-col justify-between gap-6"
          >
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500/15 transition-all duration-300">
                <Shield className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-neutral-100 group-hover:text-neutral-50 transition-colors">
                  Seguridad Blindada
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed font-light">
                  Protegemos tu sitio contra inyecciones y ataques mediante cabeceras HTTP de seguridad avanzada y saneamiento estricto.
                </p>
              </div>
            </div>

            {/* HTTP Security Headers Mockup DevTools Style */}
            <div className="bg-neutral-950/80 rounded-2xl border border-neutral-900/80 p-4 font-mono text-[9px] sm:text-[10px] text-neutral-400 space-y-2 overflow-hidden select-none h-44 relative shadow-inner">
              <div className="flex items-center justify-between border-b border-neutral-900 pb-2 text-neutral-550">
                <div className="flex items-center gap-1.5 text-neutral-500">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Headers de Red</span>
                </div>
                <span className="text-[8px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 font-bold">200 OK</span>
              </div>
              <div className="space-y-1.5 pt-1">
                <div className="truncate"><span className="text-purple-400">Content-Security-Policy</span>:</div>
                <div className="text-[8px] text-neutral-500 pl-2 truncate font-mono">default-src 'self' https:; sandbox;</div>
                <div className="truncate"><span className="text-purple-400">Strict-Transport-Security</span>:</div>
                <div className="text-[8px] text-neutral-500 pl-2 truncate font-mono">max-age=63072000; includeSubDomains; preload</div>
                <div className="truncate"><span className="text-purple-400">X-Frame-Options</span>: <span className="text-neutral-300">DENY</span></div>
                <div className="truncate"><span className="text-purple-400">Set-Cookie</span>: <span className="text-neutral-350">SameSite=Strict; Secure</span></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-neutral-950 to-transparent" />
            </div>
          </BenefitCard>

          {/* Tarjeta 4: Escalabilidad Sin Límites (col-span-4) */}
          <BenefitCard
            title="Escalabilidad Sin Límites"
            description="Código modular que crece y se adapta al ritmo de los objetivos de tu modelo de negocio."
            icon={<Cpu />}
            index={3}
            className="lg:col-span-4 flex flex-col justify-between"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center h-full">
              <div className="md:col-span-7 flex flex-col justify-between h-full space-y-6">
                <div className="space-y-4">
                  <div className="h-12 w-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500/15 transition-all duration-300">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-neutral-100 group-hover:text-neutral-50 transition-colors">
                      Escalabilidad Sin Límites
                    </h3>
                    <p className="text-sm text-neutral-400 leading-relaxed font-light">
                      Diseñado con arquitectura modular basada en componentes de React Server. Integra APIs eficientes y se conecta a bases de datos globales con latencia ultra-baja.
                    </p>
                  </div>
                </div>

                {/* Status indicators */}
                <div className="flex items-center gap-6 border-t border-neutral-900/60 pt-4">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="text-[10px] text-neutral-400 font-mono">Edge Ready</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="text-[10px] text-neutral-400 font-mono">Multi-region DB</span>
                  </div>
                </div>
              </div>
              
              {/* Interactive Nodes Network SVG Graph */}
              <div className="md:col-span-5">
                <div className="relative bg-neutral-950/70 rounded-2xl border border-neutral-900 h-44 overflow-hidden flex items-center justify-center shadow-2xl shadow-black/50 w-full">
                  <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    {/* Background paths connecting the nodes */}
                    <motion.path 
                      d="M 40,35 L 120,20 L 200,30 L 240,80 L 170,95 L 90,85 Z"
                      fill="transparent" 
                      className="stroke-indigo-500/15" 
                      strokeWidth="1"
                    />
                    <motion.path 
                      d="M 120,20 L 90,85 L 170,95 L 200,30 Z"
                      fill="transparent" 
                      className="stroke-purple-500/15" 
                      strokeWidth="1"
                    />

                    {/* Animated moving pulse trails along the paths */}
                    <motion.path 
                      d="M 40,35 L 120,20 L 200,30 L 240,80"
                      fill="transparent" 
                      className="stroke-indigo-500/30" 
                      strokeWidth="1.5"
                      strokeDasharray="10, 80"
                      animate={{ strokeDashoffset: [0, -300] }}
                      transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                    />

                    <motion.path 
                      d="M 90,85 L 170,95 L 200,30 L 120,20"
                      fill="transparent" 
                      className="stroke-purple-500/30" 
                      strokeWidth="1.5"
                      strokeDasharray="15, 60"
                      animate={{ strokeDashoffset: [0, 250] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Draw SVG connections dynamically */}
                    {nodes.map((node) => 
                      nodes.filter(n => n.id > node.id).map(targetNode => {
                        // Create selective lines to keep it clean
                        if (
                          (node.id === 1 && targetNode.id === 4) ||
                          (node.id === 2 && targetNode.id === 5) ||
                          (node.id === 3 && targetNode.id === 6)
                        ) {
                          return (
                            <line
                              key={`${node.id}-${targetNode.id}`}
                              x1={node.cx}
                              y1={node.cy}
                              x2={targetNode.cx}
                              y2={targetNode.cy}
                              className="stroke-neutral-800"
                              strokeWidth="0.8"
                            />
                          );
                        }
                        return null;
                      })
                    )}

                    {/* Nodes drawing */}
                    {nodes.map((node) => (
                      <g 
                        key={node.id}
                        onMouseEnter={() => setHoveredNode(node.id)}
                        onMouseLeave={() => setHoveredNode(null)}
                        className="cursor-pointer"
                      >
                        {/* Glow ring on hover */}
                        <motion.circle
                          cx={node.cx}
                          cy={node.cy}
                          r={hoveredNode === node.id ? 8 : 4}
                          className={node.id % 2 === 0 ? "fill-purple-500/20" : "fill-indigo-500/20"}
                          animate={{ scale: hoveredNode === node.id ? [1, 1.4, 1] : 1 }}
                          transition={{ repeat: hoveredNode === node.id ? Infinity : 0, duration: 1.5 }}
                        />
                        {/* Core dot */}
                        <circle
                          cx={node.cx}
                          cy={node.cy}
                          r={3.5}
                          className={`${
                            hoveredNode === node.id 
                              ? node.id % 2 === 0 ? "fill-purple-400" : "fill-indigo-400" 
                              : node.id % 2 === 0 ? "fill-purple-500" : "fill-indigo-500"
                          } transition-all duration-305`}
                        />
                      </g>
                    ))}
                  </svg>
                  
                  {/* Overlay details */}
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-neutral-950 to-neutral-950/0 pointer-events-none flex items-center justify-between text-[8px] font-mono text-neutral-500">
                    <span className="uppercase tracking-widest">Global Serverless Nodes</span>
                    <div className="min-h-[12px]">
                      {hoveredNode ? (
                        <motion.span 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-indigo-400 font-semibold"
                        >
                          {nodes[hoveredNode - 1].label}: {nodes[hoveredNode - 1].latency}
                        </motion.span>
                      ) : (
                        <span className="text-neutral-600">Pasa el cursor por los nodos</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </BenefitCard>

        </div>

      </div>
    </section>
  );
}
