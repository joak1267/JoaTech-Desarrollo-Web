'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import QuoteModal from '@/components/ui/QuoteModal';
import {
  ArrowLeft,
  Check,
  MapPin,
  Heart,
  Star,
  Sparkles,
  Smile,
  Clock,
  Phone,
  MessageCircle,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';

/* ─── Datos ─────────────────────────────────────────────────────────────── */

const SERVICES = [
  {
    icon: Sparkles,
    tag: 'Renovación Cutánea',
    title: 'Faciales',
    description:
      'Higiene profunda, exfoliación ultrasónica, hidratación con ácido hialurónico y peeling clínico para una piel fresca y rejuvenecida.',
  },
  {
    icon: Heart,
    tag: 'Armonía & Relax',
    title: 'Corporales',
    description:
      'Masajes descontracturantes, relajantes con piedras calientes y drenaje linfático manual para eliminar tensiones y toxinas.',
  },
  {
    icon: Smile,
    tag: 'Estilo & Detalle',
    title: 'Manicuría',
    description:
      'Cuidado completo de manos y uñas, esmaltado semipermanente de primera línea y spa de hidratación profunda.',
  },
];

const TESTIMONIALS = [
  {
    name: 'Mariela S.',
    location: 'Recoleta, CABA',
    rating: 5,
    comment:
      'Los masajes descontracturantes son increíbles. El lugar transmite una paz absoluta desde el momento en que entrás.',
  },
  {
    name: 'Sofía G.',
    location: 'Belgrano, CABA',
    rating: 5,
    comment:
      'La limpieza facial me cambió la piel por completo. Te analizan el cutis y te recomiendan la rutina ideal para tu casa.',
  },
  {
    name: 'Florencia M.',
    location: 'San Isidro, Prov. Buenos Aires',
    rating: 5,
    comment:
      'El esmaltado semipermanente me dura impecable por semanas. Excelente atención y el spa de manos es soñado.',
  },
];

const CONTACT_INFO = [
  {
    icon: MapPin,
    label: 'Dirección',
    value: 'Av. Alvear 1850, Recoleta, CABA, Argentina',
  },
  {
    icon: Clock,
    label: 'Horarios',
    value: 'Lun–Vie: 09:00–20:00 hs · Sáb: 09:00–15:00 hs',
  },
  {
    icon: Phone,
    label: 'WhatsApp',
    value: '+54 9 11 2467-3417',
  },
];

/* ─── Componente principal ───────────────────────────────────────────────── */

export default function LandingBaseDemoPage() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Formulario de contacto
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMsg, setFormMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail) return;
    setIsSubmitting(true);
    setTimeout(() => {
      const text = `Hola Aura! Mi nombre es ${formName} (${formEmail}). Les escribo para consultar: "${formMsg}"`;
      window.open(`https://wa.me/5491124673417?text=${encodeURIComponent(text)}`, '_blank');
      setIsSubmitting(false);
      setFormName('');
      setFormEmail('');
      setFormMsg('');
    }, 600);
  };

  return (
    <>
      {/* Inyección de fuentes via Google Fonts */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
          .font-playfair { font-family: 'Playfair Display', Georgia, serif; }
          .font-inter    { font-family: 'Inter', system-ui, sans-serif; }
        `,
      }} />

      <div className="bg-[#fcfcfa] min-h-screen text-neutral-800 font-inter flex flex-col">

        {/* Botones de Control Flotantes (JoaTech) */}
        <div className="fixed top-4 left-4 z-50 pointer-events-auto hidden sm:flex">
          <Link
            href="/portfolio/landings"
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/80 hover:bg-white text-neutral-700 hover:text-neutral-900 border border-neutral-200/80 shadow-md backdrop-blur-md transition-all duration-300 group hover:scale-105"
            title="Volver al Portfolio"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
            <span className="text-xs font-medium pr-1">Volver</span>
          </Link>
        </div>

        <div className="fixed top-4 right-4 z-50 pointer-events-auto hidden sm:flex items-center gap-2">
          <span className="hidden sm:inline-block text-[10px] font-semibold uppercase tracking-widest text-[#a37264] bg-white/80 border border-[#e8cfc7]/60 px-3 py-1.5 rounded-full shadow-sm backdrop-blur-md">
            Demo Esencial ($150)
          </span>
          <button
            onClick={() => setIsQuoteOpen(true)}
            className="px-4 py-2 text-xs font-semibold rounded-full text-white bg-gradient-to-r from-[#00F2FE] to-[#2F4BC0] transition-all duration-300 hover:scale-105 cursor-pointer shadow-[0_0_15px_rgba(0,242,254,0.25)] hover:shadow-[0_0_25px_rgba(0,242,254,0.55)] border border-[#00F2FE]/20"
          >
            Cotizar Estructura ↗
          </button>
        </div>

        {/* ── Navbar ficticio de Aura ──────────────────────────────────── */}
        <header className="bg-white border-b border-neutral-100 relative">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-[#c9927a] flex items-center justify-center font-playfair text-white font-bold italic text-sm">
                A
              </div>
              <span className="font-playfair font-semibold tracking-widest uppercase text-neutral-800">Aura</span>
            </div>

            <nav className="hidden md:flex items-center gap-7 text-xs font-medium uppercase tracking-widest text-neutral-500">
              <a href="#nosotros"   className="hover:text-[#c9927a] transition-colors">Nosotros</a>
              <a href="#servicios"  className="hover:text-[#c9927a] transition-colors">Servicios</a>
              <a href="#opiniones"  className="hover:text-[#c9927a] transition-colors">Testimonios</a>
              <a href="#contacto"   className="hover:text-[#c9927a] transition-colors">Contacto</a>
            </nav>

            <div className="hidden md:flex items-center gap-4">
              <a
                href="#contacto"
                className="px-4 py-2 rounded-lg border border-neutral-300 text-xs font-semibold text-neutral-700 hover:border-[#c9927a] hover:text-[#c9927a] transition-colors"
              >
                Reservar Cita
              </a>
            </div>

            {/* Hamburger Button for Mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-neutral-100 text-neutral-600 transition-colors"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-white border-b border-neutral-100 shadow-lg px-6 py-6 md:hidden flex flex-col gap-4 z-40">
              <nav className="flex flex-col gap-3 text-sm font-medium uppercase tracking-widest text-neutral-500">
                <a 
                  href="#nosotros" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-[#c9927a] py-1.5 transition-colors border-b border-neutral-50"
                >
                  Nosotros
                </a>
                <a 
                  href="#servicios" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-[#c9927a] py-1.5 transition-colors border-b border-neutral-50"
                >
                  Servicios
                </a>
                <a 
                  href="#opiniones" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-[#c9927a] py-1.5 transition-colors border-b border-neutral-50"
                >
                  Testimonios
                </a>
                <a 
                  href="#contacto" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-[#c9927a] py-1.5 transition-colors border-b border-neutral-50"
                >
                  Contacto
                </a>
              </nav>
              <div className="flex flex-col gap-3 pt-3 border-t border-neutral-100">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsQuoteOpen(true);
                  }}
                  className="w-full py-3 text-xs font-bold tracking-wide uppercase rounded-xl text-white bg-gradient-to-r from-[#00F2FE] to-[#2F4BC0] transition-all duration-300 shadow-[0_0_15px_rgba(0,242,254,0.2)] text-center cursor-pointer border border-[#00F2FE]/20"
                >
                  Cotizar Estructura ↗
                </button>
                <a
                  href="#contacto"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-3 rounded-lg border border-neutral-300 text-xs font-semibold text-neutral-700 text-center hover:border-[#c9927a] hover:text-[#c9927a] transition-colors"
                >
                  Reservar Cita
                </a>
              </div>
            </div>
          )}
        </header>

        <main className="flex-1">

          {/* ── HERO ──────────────────────────────────────────────────── */}
          <section className="py-20 bg-[#fcfcfa]">
            <div className="max-w-6xl mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Columna izquierda: copy */}
                <div>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-[#a37264] mb-5">
                    <span className="w-4 h-px bg-[#c9927a]" />
                    Centro de Estética de Alta Gama · Recoleta, Buenos Aires
                  </span>

                  <h1 className="font-playfair text-5xl sm:text-6xl font-light text-neutral-800 leading-tight mb-5">
                    Tu momento de <br />
                    <em className="not-italic text-[#c9927a]">paz y renovación</em>
                  </h1>

                  <p className="text-base text-neutral-600 font-light leading-relaxed max-w-xl mb-8">
                    En Aura diseñamos tratamientos personalizados para revitalizar tu piel,
                    armonizar tu cuerpo y brindarte un momento de desconexión real.
                    Cuidamos cada detalle para garantizar una experiencia placentera y profesional.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="https://wa.me/5491124673417?text=Hola%20Aura!%20Quiero%20agendar%20un%20turno."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#c9927a] text-white font-semibold text-sm hover:bg-[#b87f68] transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Agendar Turno por WhatsApp
                    </a>
                    <a
                      href="#servicios"
                      className="inline-flex items-center justify-center gap-1.5 px-7 py-3.5 rounded-xl border border-neutral-300 text-sm font-medium text-neutral-600 hover:border-neutral-400 hover:text-neutral-800 transition-colors"
                    >
                      Ver Servicios
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>

                  <div className="flex flex-wrap gap-5 mt-8 text-xs text-neutral-500">
                    <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#c9927a]" /> Diagnóstico de Piel Bonificado</span>
                    <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#c9927a]" /> Cosmética Natural e Importada</span>
                    <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#c9927a]" /> Turnos Online y por WhatsApp</span>
                  </div>
                </div>

                {/* Columna derecha: imagen real */}
                <div className="hidden lg:block rounded-2xl overflow-hidden shadow-sm">
                  <img
                    src="/landings/spa_hero.jpg"
                    alt="Centro Aura Estética"
                    className="w-full h-full object-cover rounded-2xl"
                    style={{ maxHeight: '480px' }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* ── SOBRE NOSOTROS ────────────────────────────────────────── */}
          <section id="nosotros" className="py-16 border-t border-neutral-100">
            <div className="max-w-3xl mx-auto px-6 text-center">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#a37264] block mb-4">
                Nuestra Filosofía
              </span>
              <h2 className="font-playfair text-3xl sm:text-4xl font-light text-neutral-800 mb-4">
                El arte del cuidado personal y la calma
              </h2>
              <div className="w-10 h-px bg-[#c9927a] mx-auto mb-6" />
              <p className="text-neutral-600 font-light leading-relaxed text-base">
                Creemos que la belleza exterior es el reflejo de una mente y un cuerpo en armonía.
                En Aura no solo ofrecemos tratamientos de vanguardia, sino un espacio donde el tiempo
                se detiene. Nuestro equipo combina técnicas milenarias con cosmetología avanzada,
                enfocando cada sesión en tu bienestar absoluto.
              </p>
            </div>
          </section>

          {/* ── SERVICIOS ─────────────────────────────────────────────── */}
          <section id="servicios" className="py-16 border-t border-neutral-100 bg-neutral-50">
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-12">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#a37264] block mb-3">
                  Tratamientos Destacados
                </span>
                <h2 className="font-playfair text-3xl font-light text-neutral-800">Nuestros Servicios</h2>
                <p className="text-sm text-neutral-500 mt-2">Elegí el cuidado que tu piel y tu cuerpo necesitan</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {SERVICES.map((srv) => {
                  const images: Record<string, string> = {
                    Faciales: '/landings/spa_facial.jpg',
                    Corporales: '/landings/spa_massage.jpg',
                    Manicuría: '/landings/spa_manicure.jpg',
                  };
                  const alts: Record<string, string> = {
                    Faciales: 'Tratamientos Faciales',
                    Corporales: 'Masajes Corporales',
                    Manicuría: 'Manicuría Spa',
                  };
                  return (
                    <div
                      key={srv.title}
                      className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md hover:border-neutral-300 transition-all"
                    >
                      <img
                        src={images[srv.title]}
                        alt={alts[srv.title]}
                        className="w-full h-44 object-cover"
                      />
                      <div className="p-7 flex flex-col gap-5">
                        <div>
                          <span className="text-[9px] uppercase tracking-widest font-semibold text-neutral-400 block mb-1">{srv.tag}</span>
                          <h3 className="font-playfair text-xl font-semibold text-neutral-800 mb-2">{srv.title}</h3>
                          <p className="text-sm text-neutral-500 font-light leading-relaxed">{srv.description}</p>
                        </div>
                        <a
                          href={`https://wa.me/5491124673417?text=Hola%20Aura!%20Quiero%20consultar%20sobre%20tratamientos%20de%20${encodeURIComponent(srv.title)}.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-auto text-xs font-semibold text-[#c9927a] hover:underline flex items-center gap-1"
                        >
                          Consultar por WhatsApp <ChevronRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ── TESTIMONIOS ───────────────────────────────────────────── */}
          <section id="opiniones" className="py-16 border-t border-neutral-100">
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-12">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#a37264] block mb-3">
                  Experiencias Reales
                </span>
                <h2 className="font-playfair text-3xl font-light text-neutral-800">La voz de nuestras clientas</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {TESTIMONIALS.map((tst) => (
                  <div
                    key={tst.name}
                    className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-7 flex flex-col gap-4"
                  >
                    <div className="flex gap-0.5">
                      {Array.from({ length: tst.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-sm text-neutral-600 font-light leading-relaxed italic flex-1">
                      "{tst.comment}"
                    </p>
                    <div className="pt-4 border-t border-neutral-100 flex justify-between items-center">
                      <span className="text-sm font-semibold text-neutral-800">{tst.name}</span>
                      <span className="text-[10px] uppercase tracking-wider text-neutral-400">{tst.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── CONTACTO ──────────────────────────────────────────────── */}
          <section id="contacto" className="py-16 border-t border-neutral-100 bg-neutral-50">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

              {/* Datos del centro */}
              <div className="flex flex-col gap-8">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[#a37264] block mb-3">
                    Contacto
                  </span>
                  <h2 className="font-playfair text-3xl font-light text-neutral-800 mb-3">
                    Vení a visitarnos
                  </h2>
                  <p className="text-sm text-neutral-500 font-light leading-relaxed">
                    Estamos ubicados en una de las zonas más tranquilas de Recoleta.
                    Reservá tu turno con anticipación para asegurarte el espacio.
                  </p>
                </div>

                <div className="flex flex-col gap-5">
                  {CONTACT_INFO.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-[#c9927a] shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-neutral-700">{label}</p>
                        <p className="text-sm text-neutral-500 font-light mt-0.5">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <a
                  href="https://wa.me/5491124673417?text=Hola%20Aura!%20Quiero%20consultar%20disponibilidad."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#c9927a] text-white text-sm font-semibold hover:bg-[#b87f68] transition-colors w-fit"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat Directo por WhatsApp
                </a>
              </div>

              {/* Formulario */}
              <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-8">
                <h3 className="font-playfair text-xl font-semibold text-neutral-800 mb-6">
                  Dejanos tu consulta
                </h3>

                <form onSubmit={handleContactSubmit} className="flex flex-col gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-neutral-600 mb-1.5">
                      Nombre Completo
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="Ej: Laura García"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-[#c9927a] focus:ring-2 focus:ring-[#c9927a]/10 transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-neutral-600 mb-1.5">
                      Email de Contacto
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="Ej: laura@email.com"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-[#c9927a] focus:ring-2 focus:ring-[#c9927a]/10 transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-neutral-600 mb-1.5">
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      placeholder="Escribí aquí tus dudas sobre tratamientos o disponibilidad..."
                      value={formMsg}
                      onChange={(e) => setFormMsg(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-[#c9927a] focus:ring-2 focus:ring-[#c9927a]/10 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-[#c9927a] text-white font-semibold text-sm hover:bg-[#b87f68] disabled:opacity-60 transition-colors border-none cursor-pointer"
                  >
                    {isSubmitting ? 'Procesando...' : 'Enviar por WhatsApp ↗'}
                  </button>
                </form>
              </div>

            </div>
          </section>

        </main>

        {/* ── FOOTER ────────────────────────────────────────────────────── */}
        <footer className="border-t border-neutral-200 bg-white">
          <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400">
            <span>
              &copy; {new Date().getFullYear()} Aura Estética & Bienestar — Todos los derechos reservados.{' '}
              <span className="text-neutral-300">Propuesta Esencial ($150 USD) diseñada por JoaTech.</span>
            </span>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-[#c9927a] transition-colors flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
                Instagram
              </a>
              <a href="#" className="hover:text-[#c9927a] transition-colors">Privacidad</a>
            </div>
          </div>
        </footer>

      </div>

      {/* Modal de Cotización JoaTech */}
      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </>
  );
}
