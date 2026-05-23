import React from 'react';
import Image from 'next/image';

export default function AboutSection() {
  return (
    <section id="sobre-nosotros" className="scroll-mt-24 py-24 border-t border-zinc-900/60 relative overflow-hidden">
      {/* Luces decorativas de fondo (Tech Blur) */}
      <div className="absolute top-1/2 left-[-10%] w-[400px] h-[400px] rounded-full bg-violet-500/5 blur-[100px] pointer-events-none -z-10" aria-hidden="true" />
      <div className="absolute top-1/3 right-[-10%] w-[400px] h-[400px] rounded-full bg-sky-500/5 blur-[100px] pointer-events-none -z-10" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Columna de Contenido Técnico */}
        <div className="lg:col-span-7">
          <div className="bg-zinc-950/70 border border-zinc-900/80 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden group">
            {/* Gradiente sutil en hover */}
            <div className="absolute -inset-px bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl" />
            
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-6 uppercase leading-tight">
              Transformamos ideas complejas en{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-violet-500">
                código de alto rendimiento
              </span>
            </h2>
            
            <div className="text-zinc-100 font-light leading-relaxed text-sm sm:text-base space-y-4">
              <p>
                En <strong>JoaTech</strong>, entendemos que el software no solo debe funcionar; debe ser una obra de ingeniería sólida, limpia y preparada para escalar. Nos especializamos en desarrollo full-stack a medida, diseñando arquitecturas modulares que eliminan el desperdicio de recursos y priorizan la velocidad de carga absoluta.
              </p>
              <p>
                Creemos firmemente que cada línea de código debe tener un propósito. Por ello, adoptamos metodologías ágiles y principios de diseño robustos que se traducen en ecosistemas web rápidos, seguros y adaptables a las demandas de tu negocio. Desde aplicaciones web corporativas hasta plataformas SaaS de alto tráfico, desarrollamos soluciones tecnológicas estables de nivel internacional.
              </p>
              <p>
                Nuestra misión es humanizar la tecnología sin comprometer la precisión. Colaboramos estrechamente con fundadores y equipos técnicos para estructurar código de fácil mantenimiento que reduce la deuda técnica, permitiéndote escalar de forma elástica y con total confianza.
              </p>
            </div>
          </div>
        </div>

        {/* Columna del Perfil Interactivo */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-full max-w-[320px] aspect-[4/5] rounded-2xl border border-zinc-900 bg-zinc-900/10 backdrop-blur-md p-3 flex flex-col group shadow-2xl">
            {/* Gradiente sutil en hover */}
            <div className="absolute -inset-px bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl z-10" />
            
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              <Image
                src="/yoimg2.png"
                alt="Desarrollador Principal de JoaTech"
                fill
                sizes="(max-w-7xl) 320px, 100vw"
                priority
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out transform hover:scale-[1.02] cursor-pointer"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
