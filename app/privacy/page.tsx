import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import Footer from '@/components/ui/Footer';

export const metadata: Metadata = {
  title: 'Políticas de Privacidad | JoaTech',
  description: 'Conoce las políticas de privacidad de JoaTech. Información transparente sobre la recopilación de datos, cookies de analítica y protección de información de clientes.',
};

interface Clause {
  id: string;
  number: string;
  title: string;
  content: string[];
}

const PRIVACY_CLAUSES: Clause[] = [
  {
    id: 'recoleccion',
    number: '01',
    title: 'Recolección de Datos y Formularios de Contacto',
    content: [
      'En JoaTech recopilamos información personal únicamente cuando interactúas de forma directa con nosotros a través de nuestros formularios de contacto, solicitudes de cotización o canales de comunicación oficiales (como WhatsApp y correo electrónico).',
      'Los datos recopilados incluyen, de manera no limitativa: nombre, dirección de correo electrónico, número de teléfono, nombre de la empresa y detalles técnicos o comerciales del proyecto propuesto. La recolección de estos datos tiene como única finalidad procesar tus solicitudes de cotización, proporcionar soporte y mantener la comunicación comercial necesaria.',
    ],
  },
  {
    id: 'proteccion',
    number: '02',
    title: 'Protección de la Información y Seguridad Técnica',
    content: [
      'La seguridad de tu información y de tus desarrollos de software es una prioridad crítica para nosotros. Implementamos medidas técnicas, administrativas y físicas de nivel industrial para proteger tus datos contra accesos no autorizados, alteraciones, divulgación o destrucción.',
      'Para clientes de desarrollo de software y productos SaaS, toda la información del negocio, credenciales de pruebas, bases de datos de desarrollo y especificaciones del sistema se gestionan bajo estrictos estándares de seguridad y acuerdos de confidencialidad (NDA), protegiendo rigurosamente tu propiedad intelectual y ventajas competitivas.',
    ],
  },
  {
    id: 'cookies',
    number: '03',
    title: 'Cookies y Analítica Técnica',
    content: [
      'Nuestra plataforma utiliza cookies técnicas y herramientas de análisis web para recopilar información estadística anónima sobre los patrones de navegación de los usuarios.',
      'Estas herramientas nos permiten comprender el comportamiento de los visitantes, diagnosticar problemas de rendimiento técnico y optimizar la experiencia general de la interfaz de usuario. Puedes deshabilitar el uso de cookies en cualquier momento modificando la configuración correspondiente en tu navegador web.',
    ],
  },
  {
    id: 'derechos',
    number: '04',
    title: 'Derechos de Acceso, Rectificación y Cancelación (ARCO)',
    content: [
      'Como titular de los datos personales, posees el derecho a conocer qué información tenemos almacenada sobre ti, solicitar su corrección o rectificación en caso de que sea inexacta, o demandar su eliminación total de nuestras bases de datos comerciales.',
      'Para ejercer cualquiera de estos derechos de acceso o para cualquier consulta relacionada con nuestra política de privacidad de datos, puedes comunicarte de forma directa con nuestro equipo técnico y de soporte legal a través de nuestros canales de contacto.',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-400 relative selection:bg-indigo-500 selection:text-white overflow-x-hidden">
      {/* Estructura de fondo: Malla de cuadrícula fina de Vercel */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" 
        aria-hidden="true"
      />

      {/* Resplandor ambiental de identidad JoaTech */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-violet-500/5 blur-[120px] pointer-events-none -z-20" aria-hidden="true" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/5 blur-[120px] pointer-events-none -z-20" aria-hidden="true" />

      {/* Barra superior de acento con gradiente premium */}
      <div className="h-1.5 w-full bg-gradient-to-r from-violet-600 via-indigo-500 to-sky-400 shrink-0" />

      {/* Contenedor principal de lectura con grid layout asimétrico de Vercel Legal */}
      <main className="max-w-7xl w-full mx-auto px-6 py-16 md:py-24 relative z-10 flex-grow flex flex-col gap-12">
        
        {/* Cabecera superior con botón de regreso estilizado */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-zinc-900 pb-8 gap-6">
          <div className="space-y-2">
            <h1 className="text-white font-extrabold text-3xl md:text-5xl tracking-tight leading-none uppercase">
              Políticas de Privacidad
            </h1>
          </div>
          
          <Link 
            href="/" 
            className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-sky-400 transition-colors duration-200 self-start sm:self-center"
          >
            <svg 
              className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Volver al Inicio
          </Link>
        </div>

        {/* Layout de Documentación Asimétrica */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Columna 1 (Menú Lateral Sticky) */}
          <aside className="sticky top-28 self-start hidden md:block col-span-1 space-y-4">
            <span className="font-mono text-[10px] tracking-[0.15em] text-zinc-500 font-bold uppercase block">
              Documento
            </span>
            <nav className="flex flex-col space-y-0.5">
              {PRIVACY_CLAUSES.map((clause) => (
                <a
                  key={clause.id}
                  href={`#${clause.id}`}
                  className="border-l border-zinc-900 pl-3 text-xs text-zinc-500 hover:text-sky-400 hover:border-violet-500 py-1.5 transition-all duration-200 block font-medium"
                >
                  {clause.title}
                </a>
              ))}
            </nav>
          </aside>

          {/* Columna 2 (Cuerpo de Datos) */}
          <div className="col-span-3 max-w-3xl space-y-8">
            
            {/* Introducción - Tarjeta Glassmorphism */}
            <div className="bg-zinc-900/20 border border-zinc-900 backdrop-blur-md p-5 rounded-xl">
              <p className="text-sm font-light leading-relaxed text-zinc-300">
                En <strong>JoaTech</strong> valoramos la confianza de nuestros clientes y colaboradores. Esta Política de Privacidad describe de manera transparente cómo tratamos y protegemos la información personal y los activos digitales que gestionamos al diseñar, desarrollar y desplegar soluciones de software personalizadas.
              </p>
            </div>

            {/* Cláusulas Legales */}
            <div className="space-y-10">
              {PRIVACY_CLAUSES.map((clause) => (
                <section 
                  key={clause.id} 
                  id={clause.id} 
                  className="scroll-mt-32 border-b border-zinc-900/40 pb-8 last:border-0 last:pb-0"
                >
                  <h2 className="text-zinc-100 font-bold text-xl tracking-tight mt-6 mb-4 flex items-center gap-3">
                    <span className="text-sky-400 font-mono font-bold">
                      {parseInt(clause.number, 10)}.
                    </span>
                    <span>{clause.title}</span>
                  </h2>
                  <div className="space-y-4">
                    {clause.content.map((paragraph, index) => (
                      <p key={index} className="text-zinc-400 font-light leading-relaxed text-sm">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

          </div>

        </div>

      </main>

      {/* Footer global integrado */}
      <Footer />
    </div>
  );
}
