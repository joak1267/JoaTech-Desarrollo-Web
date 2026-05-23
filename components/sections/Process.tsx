'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, FileCode, Sparkles, Code2, Cpu, CheckCircle } from 'lucide-react';

interface ProcessCardProps {
  number: string;
  title: string;
  fileName: string;
  description: string;
  command: string;
  logs: string[];
  index: number;
}

const ProcessCard = ({ number, title, fileName, description, command, logs, index }: ProcessCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-55px' }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative rounded-2xl bg-neutral-950/40 border border-neutral-900/80 backdrop-blur-xl transition-all duration-500 overflow-hidden flex flex-col group hover:border-purple-500/30 hover:shadow-[0_20px_50px_rgba(168,85,247,0.04)]"
    >
      {/* VSCode header */}
      <div className="flex items-center justify-between px-4 py-3 bg-neutral-950 border-b border-neutral-900/80 select-none">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-neutral-800 group-hover:bg-[#ff5f56] transition-colors duration-300" />
          <div className="w-2.5 h-2.5 rounded-full bg-neutral-800 group-hover:bg-[#ffbd2e] transition-colors duration-300" />
          <div className="w-2.5 h-2.5 rounded-full bg-neutral-800 group-hover:bg-[#27c93f] transition-colors duration-300" />
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-500 group-hover:text-neutral-400 transition-colors">
          <FileCode className="w-3.5 h-3.5 text-purple-400" />
          <span>{fileName}</span>
        </div>
        <div className="w-6" /> {/* Spacer */}
      </div>

      {/* Main card body */}
      <div className="p-6 flex-grow flex flex-col justify-between gap-6">
        <div className="space-y-4">
          
          {/* Badge - absolute on mobile, relative on desktop */}
          <div className="lg:relative absolute left-[-42px] sm:left-[-54px] lg:left-0 top-6 lg:top-0 w-8 h-8 lg:w-auto lg:h-auto rounded-full bg-neutral-950 lg:bg-transparent border border-purple-500/20 lg:border-none flex items-center justify-center z-10 shadow-[0_0_10px_rgba(168,85,247,0.05)] lg:shadow-none">
            <span className="font-mono text-xs font-bold px-2 py-0.5 lg:rounded bg-purple-500/10 text-purple-400 lg:border border-purple-500/20 tracking-wider shadow-[0_0_15px_rgba(168,85,247,0.1)]">
              {number}
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="text-base sm:text-lg font-bold text-neutral-105 group-hover:text-neutral-50 transition-colors">
              {title}
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed font-light">
              {description}
            </p>
          </div>
        </div>

        {/* Console / Terminal Section */}
        <div className="mt-2 rounded-xl bg-neutral-950/80 border border-neutral-900/60 p-4 font-mono text-[10px] text-neutral-400 space-y-2.5 select-none min-h-[130px] transition-all duration-500 group-hover:bg-black/30 group-hover:border-neutral-800/80 shadow-inner">
          <div className="flex items-center justify-between text-neutral-600 border-b border-neutral-900 pb-2">
            <div className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-purple-400" />
              <span className="font-semibold text-neutral-550 uppercase tracking-widest text-[8px]">pipeline</span>
            </div>
            <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-pulse" />
          </div>
          
          <div className="space-y-1.5 pt-0.5">
            <div className="text-neutral-300 flex items-center gap-1">
              <span className="text-purple-400 font-bold">$</span>
              <span className="text-neutral-200">{command}</span>
            </div>
            
            {/* Staggered logs animation */}
            <div className="space-y-1">
              {logs.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0.25, x: 0 }}
                  animate={isHovered ? { opacity: 1, x: 2 } : { opacity: 0.35, x: 0 }}
                  transition={{ duration: 0.25, delay: isHovered ? i * 0.08 : 0 }}
                  className="text-neutral-500 flex items-center gap-1.5"
                >
                  <span className="text-[7px] text-neutral-600">❯</span>
                  <span className={`truncate ${isHovered && i === logs.length - 1 ? "text-purple-400 font-medium" : ""}`}>
                    {log}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Process() {
  const steps = [
    {
      number: "01",
      title: "Planificación y Kickoff",
      fileName: "kickoff.json",
      description: "Definimos los requerimientos técnicos, la arquitectura de la información y los objetivos de conversión de tu plataforma.",
      command: "node init-project.js",
      logs: [
        "Analyzing business goals...",
        "Defining technical stack (Next.js, TS)",
        "Mapping architectural nodes",
        "Ready for UI interface wireframing"
      ]
    },
    {
      number: "02",
      title: "Diseño de Interfaz UI",
      fileName: "interface.tsx",
      description: "Creamos prototipos interactivos de alta fidelidad para validar la experiencia visual antes de codificar.",
      command: "npm run design:sync",
      logs: [
        "Importing Figma style tokens",
        "Building premium component library",
        "Validating responsive grid glows",
        "Design specs exported to code"
      ]
    },
    {
      number: "03",
      title: "Desarrollo de Alta Performance",
      fileName: "development.ts",
      description: "Escribimos código limpio y optimizado utilizando Next.js 14, TypeScript y animaciones fluidas de Framer Motion.",
      command: "npm run build:core",
      logs: [
        "Compiling Next.js App components",
        "Optimizing server-side rendering",
        "Running strict lint checks...",
        "Types & schemas compiled: 100% OK"
      ]
    },
    {
      number: "04",
      title: "Despliegue y Optimización",
      fileName: "deploy.sh",
      description: "Lanzamos el proyecto a producción bajo estándares estrictos de velocidad, auditoría de código y SEO técnico.",
      command: "vercel deploy --prod",
      logs: [
        "Generating static web route maps",
        "Uploading builds to global Edge Nodes",
        "Auditing Core Web Vitals (SEO/LCP)",
        "Production deployment is LIVE!"
      ]
    }
  ];

  return (
    <section id="proceso" className="relative bg-transparent px-6 py-24 sm:py-32 overflow-hidden">
      {/* Ambient background glows */}
      <div 
        className="absolute top-1/4 right-[-15%] w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[150px] pointer-events-none select-none"
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-1/4 left-[-15%] w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[150px] pointer-events-none select-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-20">

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-50 max-w-3xl leading-tight"
          >
            Un proceso transparente{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-scroll">
              de principio a fin
            </span>
          </motion.h2>
        </div>

        {/* Pipeline Container */}
        <div className="relative pl-14 lg:pl-0">
          
          {/* Horizontal line for desktop */}
          <div className="absolute top-[180px] left-12 right-12 h-[2px] hidden lg:block pointer-events-none z-0">
            <svg className="w-full h-full" fill="none">
              <line
                x1="0"
                y1="1"
                x2="100%"
                y2="1"
                className="stroke-neutral-900"
                strokeWidth="1.5"
                strokeDasharray="6 6"
              />
              <motion.line
                x1="0"
                y1="1"
                x2="100%"
                y2="1"
                className="stroke-purple-500/30"
                strokeWidth="1.5"
                strokeDasharray="30 150"
                animate={{ strokeDashoffset: [0, -360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
            </svg>
          </div>

          {/* Vertical line for mobile/tablet */}
          <div className="absolute left-[28px] top-6 bottom-6 w-[2px] lg:hidden pointer-events-none z-0">
            <svg className="w-full h-full" fill="none">
              <line
                x1="1"
                y1="0"
                x2="1"
                y2="100%"
                className="stroke-neutral-900"
                strokeWidth="1.5"
                strokeDasharray="6 6"
              />
              <motion.line
                x1="1"
                y1="0"
                x2="1"
                y2="100%"
                className="stroke-purple-500/30"
                strokeWidth="1.5"
                strokeDasharray="30 150"
                animate={{ strokeDashoffset: [0, -360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
            </svg>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <ProcessCard
                key={step.number}
                index={index}
                number={step.number}
                title={step.title}
                fileName={step.fileName}
                description={step.description}
                command={step.command}
                logs={step.logs}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
