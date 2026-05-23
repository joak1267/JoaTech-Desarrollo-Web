import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import Footer from '@/components/ui/Footer';

export const metadata: Metadata = {
  title: 'Términos del Servicio | JoaTech',
  description: 'Revisa los términos del servicio de JoaTech. Condiciones de desarrollo de software, propiedad intelectual, políticas de pago y responsabilidades cloud.',
};

interface Clause {
  id: string;
  number: string;
  title: string;
  content: string[];
}

const TERMS_CLAUSES: Clause[] = [
  {
    id: 'alcance',
    number: '01',
    title: 'Alcance de los Servicios de Desarrollo Web y SaaS',
    content: [
      'JoaTech provee soluciones especializadas en diseño web premium, desarrollo de comercio electrónico, arquitecturas de software a medida y plataformas SaaS (Software as a Service). El alcance de las prestaciones de ingeniería se define de manera formal en el documento de propuesta comercial y técnica aprobado por el cliente previo al inicio de las tareas de desarrollo.',
      'Modificaciones subsecuentes en el alcance definido, requerimientos adicionales fuera de la hoja de ruta pactada, o cambios drásticos de diseño una vez iniciada la fase de maquetación, serán evaluados de forma técnica por nuestro equipo y cotizados como anexos presupuestarios complementarios.',
    ],
  },
  {
    id: 'propiedad',
    number: '02',
    title: 'Propiedad Intelectual y Licenciamiento de Código',
    content: [
      'Una vez que se haya cancelado y liquidado el pago total estipulado en la propuesta comercial, JoaTech transfiere de forma definitiva los derechos de explotación sobre el código fuente a medida desarrollado exclusivamente para el cliente, entregando repositorios y accesos administrativos de producción.',
      'No obstante, JoaTech retiene la propiedad intelectual de sus frameworks base, metodologías de maquetación, scripts preexistentes de optimización y librerías modulares de su propiedad. Otorgamos al cliente una licencia perpetua, transferible y no exclusiva para el uso de estos recursos incorporados dentro del software entregado.',
    ],
  },
  {
    id: 'pagos',
    number: '03',
    title: 'Procesos de Pago e Hitos de Entrega',
    content: [
      'Para dar inicio a cualquier desarrollo técnico, se requiere la acreditación del pago de anticipo estipulado en la propuesta (comúnmente el 50%). Los saldos restantes o pagos correspondientes a hitos específicos se facturarán conforme al calendario de entregables acordado de antemano.',
      'En caso de rescisión del contrato por decisión del cliente antes del despliegue final, el anticipo inicial o los montos cobrados correspondientes a hitos ya completados o en proceso no serán reembolsables, actuando como compensación por las horas de ingeniería y planeación dedicadas.',
    ],
  },
  {
    id: 'responsabilidades',
    number: '04',
    title: 'Limitación de Responsabilidad de Infraestructura Cloud',
    content: [
      'JoaTech realiza despliegues de infraestructura cloud de alto rendimiento a través de proveedores de primer nivel (tales como Vercel, AWS, Supabase o Netlify). Los costos recurrentes de mantenimiento, licencias de APIs de terceros y hospedaje son responsabilidad directa y exclusiva del cliente contratante.',
      'No nos hacemos responsables por pérdidas comerciales directas o indirectas causadas por indisponibilidad del hosting cloud, suspensiones de cuenta del proveedor de infraestructura por falta de pago del cliente, o filtraciones de seguridad resultantes del mal manejo de credenciales de administración ajenas a nuestro control.',
    ],
  },
];

export default function TermsPage() {
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
              Términos del Servicio
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
              {TERMS_CLAUSES.map((clause) => (
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
                Bienvenido a <strong>JoaTech</strong>. Al contratar cualquiera de nuestros servicios de consultoría, diseño técnico y desarrollo de software, declaras estar de acuerdo con las condiciones estipuladas en este documento. Te sugerimos revisarlas con detenimiento antes de formalizar tu proyecto.
              </p>
            </div>

            {/* Cláusulas Legales */}
            <div className="space-y-10">
              {TERMS_CLAUSES.map((clause) => (
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
