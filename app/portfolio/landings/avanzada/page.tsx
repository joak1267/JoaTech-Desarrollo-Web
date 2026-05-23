'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import QuoteModal from '@/components/ui/QuoteModal';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Star,
  Truck,
  Wrench,
  PackageCheck,
  Ruler,
  Menu,
  X,
} from 'lucide-react';

/* ─── Tipografías ───────────────────────────────────────────────────────── */
const FONTS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
  .font-cormorant { font-family: 'Cormorant Garamond', Georgia, serif; }
  .font-dm        { font-family: 'DM Sans', system-ui, sans-serif; }
`;

/* ─── Datos ─────────────────────────────────────────────────────────────── */

const STATS = [
  { value: '12+', label: 'Años en el mercado' },
  { value: '850', label: 'Proyectos entregados' },
  { value: '40+', label: 'Marcas disponibles' },
  { value: '98%', label: 'Clientes satisfechos' },
];

const CATEGORIES = [
  {
    name: 'Living & Sala',
    items: 'Sofás · Sillones · Mesas de Centro',
    accent: '#c9a87c',
    bg: 'bg-[#f7f2eb]',
    img: '/landings/nordik_living.jpg',
  },
  {
    name: 'Dormitorio',
    items: 'Camas · Placards · Mesas de Luz',
    accent: '#8fa3a0',
    bg: 'bg-[#eef2f1]',
    img: '/landings/nordik_bedroom.jpg',
  },
  {
    name: 'Oficina & Estudio',
    items: 'Escritorios · Sillas Ergonómicas · Estantes',
    accent: '#a89080',
    bg: 'bg-[#f2edea]',
    img: '/landings/nordik_office.jpg',
  },
  {
    name: 'Comedor',
    items: 'Mesas · Sillas · Aparadores',
    accent: '#9a9570',
    bg: 'bg-[#f2f1ea]',
    img: '/landings/nordik_dining.jpg',
  },
];

const PRODUCTS = [
  {
    name: 'Sofá Nordic 3 Cuerpos',
    category: 'Living',
    material: 'Tela premium bouclé · Patas de roble',
    price: '$485.000',
    img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&h=300&q=80',
  },
  {
    name: 'Mesa de Comedor Oslo',
    category: 'Comedor',
    material: 'Madera maciza de pino · Barniz mate',
    price: '$310.000',
    img: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=400&h=300&q=80',
  },
  {
    name: 'Escritorio Arco',
    category: 'Oficina',
    material: 'Tabletón de MDF laminado · Metal negro',
    price: '$198.000',
    img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=400&h=300&q=80',
  },
  {
    name: 'Cama Bergen 2 plazas',
    category: 'Dormitorio',
    material: 'Estructura en MDF · Cabezal tapizado',
    price: '$420.000',
    img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=400&h=300&q=80',
  },
  {
    name: 'Sillón Lectura Fjord',
    category: 'Living',
    material: 'Cuero sintético premium · Base giratoria',
    price: '$275.000',
    img: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=400&h=300&q=80',
  },
  {
    name: 'Estante Flotante Lund',
    category: 'Estudio',
    material: 'Madera de eucalipto · Soportes de acero',
    price: '$94.000',
    img: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=400&h=300&q=80',
  },
];

const PROCESS = [
  {
    icon: Ruler,
    step: '01',
    title: 'Consulta y Medición',
    desc: 'Coordinamos una visita a domicilio o videollamada para relevar el espacio, tus gustos y necesidades.',
  },
  {
    icon: PackageCheck,
    step: '02',
    title: 'Propuesta & Selección',
    desc: 'Te presentamos una selección curada de piezas que encajan con el espacio y tu presupuesto disponible.',
  },
  {
    icon: Truck,
    step: '03',
    title: 'Entrega & Armado',
    desc: 'Coordinamos la logística y armado en tu domicilio. Todo queda montado, prolijo y listo para usar.',
  },
];

const TESTIMONIALS = [
  {
    name: 'Valentina R.',
    location: 'Palermo, CABA',
    rating: 5,
    comment:
      'Renovamos el living completo con piezas de NORDIK y la diferencia es brutal. Calidad increíble y el proceso de compra fue súper simple.',
  },
  {
    name: 'Marcos T.',
    location: 'Martínez, Prov. Buenos Aires',
    rating: 5,
    comment:
      'El escritorio Arco que compré para mi home office quedó impecable. Resistente, estético y llegó a tiempo y bien embalado.',
  },
  {
    name: 'Luciana B.',
    location: 'Vicente López, Prov. Buenos Aires',
    rating: 5,
    comment:
      'Excelente atención postventa. Tuve una consulta y la resolvieron al instante por WhatsApp. Recomiendo 100%.',
  },
];

const CONTACT_INFO = [
  { icon: MapPin, label: 'Showroom', value: 'Av. del Libertador 3200, Núñez, CABA' },
  { icon: Clock, label: 'Horarios', value: 'Lun–Vie: 09:00–19:00 hs · Sáb: 10:00–16:00 hs' },
  { icon: Phone, label: 'WhatsApp', value: '+54 9 11 5534-2200' },
];

/* ─── Componente Principal ───────────────────────────────────────────────── */

export default function LandingAvanzadaDemoPage() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMsg, setFormMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail) return;
    setIsSubmitting(true);
    setTimeout(() => {
      const text = `Hola NORDIK! Soy ${formName} (${formEmail}). Consulta: "${formMsg}"`;
      window.open(`https://wa.me/5491155342200?text=${encodeURIComponent(text)}`, '_blank');
      setIsSubmitting(false);
      setFormName('');
      setFormEmail('');
      setFormMsg('');
    }, 600);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: FONTS }} />

      <div className="bg-[#faf9f6] min-h-screen text-neutral-800 font-dm flex flex-col">

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
          <span className="hidden sm:inline-block text-[10px] font-semibold uppercase tracking-widest text-[#8a6a50] bg-white/80 border border-[#dfd0c0]/60 px-3 py-1.5 rounded-full shadow-sm backdrop-blur-md">
            Demo Catálogo ($200)
          </span>
          <button
            onClick={() => setIsQuoteOpen(true)}
            className="px-4 py-2 text-xs font-semibold rounded-full text-white bg-gradient-to-r from-[#00F2FE] to-[#2F4BC0] transition-all duration-300 hover:scale-105 cursor-pointer shadow-[0_0_15px_rgba(0,242,254,0.25)] hover:shadow-[0_0_25px_rgba(0,242,254,0.55)] border border-[#00F2FE]/20"
          >
            Cotizar Estructura ↗
          </button>
        </div>

        {/* ── Navbar ficticio NORDIK ────────────────────────────────────── */}
        <header className="bg-[#faf9f6] border-b border-neutral-200 relative">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-sm bg-[#2c2a27] flex items-center justify-center">
                <span className="font-cormorant text-[#c9a87c] font-bold text-base italic">N</span>
              </div>
              <div>
                <span className="font-cormorant font-semibold tracking-[0.25em] uppercase text-[#2c2a27] text-lg">NORDIK</span>
                <span className="text-neutral-400 text-xs ml-1.5 tracking-wider hidden sm:inline">Casa & Diseño</span>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-7 text-xs font-medium tracking-wider text-neutral-500 uppercase">
              <a href="#catalogo"   className="hover:text-[#2c2a27] transition-colors">Catálogo</a>
              <a href="#productos"  className="hover:text-[#2c2a27] transition-colors">Productos</a>
              <a href="#proceso"    className="hover:text-[#2c2a27] transition-colors">Proceso</a>
              <a href="#showroom"   className="hover:text-[#2c2a27] transition-colors">Showroom</a>
            </nav>

            <div className="hidden md:flex items-center gap-4">
              <a
                href="#showroom"
                className="px-4 py-2 rounded-lg bg-[#2c2a27] text-white text-xs font-medium tracking-wider hover:bg-neutral-700 transition-colors"
              >
                Visitar Showroom
              </a>
            </div>

            {/* Hamburger Button for Mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-neutral-200 text-neutral-600 transition-colors animate-none"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-[#faf9f6] border-b border-neutral-200 shadow-lg px-6 py-6 md:hidden flex flex-col gap-4 z-40">
              <nav className="flex flex-col gap-3 text-sm font-medium tracking-wider text-neutral-500 uppercase">
                <a 
                  href="#catalogo" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-[#2c2a27] py-1.5 transition-colors border-b border-neutral-200/50"
                >
                  Catálogo
                </a>
                <a 
                  href="#productos" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-[#2c2a27] py-1.5 transition-colors border-b border-neutral-200/50"
                >
                  Productos
                </a>
                <a 
                  href="#proceso" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-[#2c2a27] py-1.5 transition-colors border-b border-neutral-200/50"
                >
                  Proceso
                </a>
                <a 
                  href="#showroom" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-[#2c2a27] py-1.5 transition-colors border-b border-neutral-200/50"
                >
                  Showroom
                </a>
              </nav>
              <div className="flex flex-col gap-3 pt-3 border-t border-neutral-200">
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
                  href="#showroom"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-3 rounded-lg bg-[#2c2a27] text-white text-xs font-medium tracking-wider text-center hover:bg-neutral-700 transition-colors"
                >
                  Visitar Showroom
                </a>
              </div>
            </div>
          )}
        </header>

        <main className="flex-1">

          {/* ── HERO ──────────────────────────────────────────────────── */}
          <section className="py-16 lg:py-24">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

              {/* Copy */}
              <div className="space-y-7">
                <span className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-widest text-[#8a6a50]">
                  <span className="w-5 h-px bg-[#c9a87c]" />
                  Showroom en Núñez · Buenos Aires
                </span>

                <h1 className="font-cormorant text-5xl sm:text-6xl lg:text-7xl font-light text-[#2c2a27] leading-[1.1]">
                  Diseño que<br />
                  <em className="not-italic font-semibold">transforma</em><br />
                  espacios
                </h1>

                <p className="text-base text-neutral-500 font-light leading-relaxed max-w-lg">
                  Muebles de diseño contemporáneo para hogares y oficinas en Argentina.
                  Cada pieza está seleccionada por nuestros expertos en interior design
                  para combinar estética, durabilidad y confort.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="#productos"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#2c2a27] text-white text-sm font-medium hover:bg-neutral-700 transition-colors"
                  >
                    Ver Catálogo Completo
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="https://wa.me/5491155342200?text=Hola%20NORDIK!%20Quiero%20asesoramiento%20para%20un%20espacio."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-neutral-300 text-sm font-medium text-neutral-600 hover:border-[#2c2a27] hover:text-[#2c2a27] transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Asesoramiento por WhatsApp
                  </a>
                </div>

                <div className="flex flex-wrap gap-5 text-xs text-neutral-500 pt-1">
                  <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#c9a87c]" /> Entrega a domicilio en AMBA</span>
                  <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#c9a87c]" /> Armado incluido</span>
                  <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#c9a87c]" /> Garantía 2 años</span>
                </div>
              </div>

              {/* Imagen real del sofá héroe */}
              <div className="relative rounded-3xl overflow-hidden shadow-md h-[480px]">
                <img src="/landings/nordik_sofa.jpg" alt="Sofá Nordic" className="w-full h-full object-cover" />
                <div className="absolute top-5 right-5 bg-white rounded-xl px-4 py-2.5 shadow-sm border border-neutral-100">
                  <p className="text-[9px] font-medium uppercase tracking-wider text-neutral-400">Producto Destacado</p>
                  <p className="font-cormorant text-base font-semibold text-[#2c2a27]">Sofá Nordic 3C.</p>
                  <p className="text-sm font-medium text-[#8a6a50] mt-0.5">$485.000</p>
                </div>
              </div>

            </div>
          </section>

          {/* ── MÉTRICAS DE CONFIANZA ─────────────────────────────────── */}
          <section className="border-y border-neutral-200 bg-white py-10">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-cormorant text-4xl font-semibold text-[#2c2a27]">{s.value}</p>
                  <p className="text-xs text-neutral-500 mt-1 tracking-wide">{s.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── CATEGORÍAS ───────────────────────────────────────────── */}
          <section id="catalogo" className="py-16 bg-[#faf9f6]">
            <div className="max-w-6xl mx-auto px-6">
              <div className="mb-10">
                <span className="text-[10px] font-medium uppercase tracking-widest text-[#8a6a50] block mb-2">
                  Nuestras Categorías
                </span>
                <h2 className="font-cormorant text-3xl sm:text-4xl font-light text-[#2c2a27]">
                  Ambientes completos a tu estilo
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {CATEGORIES.map((cat) => (
                  <a
                    key={cat.name}
                    href="#productos"
                    className={`group ${cat.bg} rounded-2xl p-6 border border-neutral-200/60 hover:border-neutral-300 hover:shadow-sm transition-all flex flex-col justify-between`}
                  >
                    <img src={cat.img} alt={cat.name} className="w-full h-36 object-cover rounded-xl mb-4" />
                    <div>
                      <h3 className="font-cormorant text-xl font-semibold text-[#2c2a27] mb-1">{cat.name}</h3>
                      <p className="text-xs text-neutral-500 font-light">{cat.items}</p>
                    </div>
                    <div className="flex items-center gap-1 mt-4 text-xs font-medium group-hover:gap-2 transition-all" style={{ color: cat.accent }}>
                      Ver productos <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* ── PRODUCTOS DESTACADOS ──────────────────────────────────── */}
          <section id="productos" className="py-16 border-t border-neutral-100 bg-neutral-50">
            <div className="max-w-6xl mx-auto px-6">
              <div className="flex items-end justify-between mb-10">
                <div>
                  <span className="text-[10px] font-medium uppercase tracking-widest text-[#8a6a50] block mb-2">
                    Selección Curada
                  </span>
                  <h2 className="font-cormorant text-3xl sm:text-4xl font-light text-[#2c2a27]">
                    Productos Destacados
                  </h2>
                </div>
                <a
                  href="https://wa.me/5491155342200?text=Hola%20NORDIK!%20Quiero%20ver%20el%20catálogo%20completo."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-[#2c2a27] transition-colors"
                >
                  Ver catálogo completo <ChevronRight className="w-4 h-4" />
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {PRODUCTS.map((p) => (
                  <div
                    key={p.name}
                    className="bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-md hover:border-neutral-300 transition-all group"
                  >
                    {/* Imagen del producto */}
                    <div className="h-48 relative overflow-hidden bg-neutral-100">
                      <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute bottom-3 right-3">
                        <span className="text-[9px] font-medium uppercase tracking-wider text-neutral-500 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded border border-neutral-200/50">
                          {p.category}
                        </span>
                      </div>
                    </div>
                    {/* Info */}
                    <div className="p-5">
                      <h3 className="font-cormorant text-lg font-semibold text-[#2c2a27]">{p.name}</h3>
                      <p className="text-xs text-neutral-400 font-light mt-1">{p.material}</p>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-base font-semibold text-[#2c2a27]">{p.price}</span>
                        <a
                          href={`https://wa.me/5491155342200?text=Hola%20NORDIK!%20Me%20interesa%20el%20producto:%20${encodeURIComponent(p.name)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-medium text-[#8a6a50] hover:underline flex items-center gap-1"
                        >
                          Consultar <ChevronRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── PROCESO ───────────────────────────────────────────────── */}
          <section id="proceso" className="py-16 border-t border-neutral-100 bg-[#faf9f6]">
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-12">
                <span className="text-[10px] font-medium uppercase tracking-widest text-[#8a6a50] block mb-2">
                  Sin complicaciones
                </span>
                <h2 className="font-cormorant text-3xl sm:text-4xl font-light text-[#2c2a27]">
                  Cómo funciona
                </h2>
                <p className="text-sm text-neutral-500 mt-2 max-w-md mx-auto">
                  Desde la primera consulta hasta el armado final en tu hogar, acompañamos cada etapa.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {PROCESS.map((step) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.step} className="flex flex-col gap-5 bg-white rounded-2xl border border-neutral-200 p-7 hover:shadow-sm transition-all">
                      <div className="flex items-center gap-3">
                        <span className="font-cormorant text-4xl font-light text-neutral-200 leading-none">{step.step}</span>
                        <div className="w-9 h-9 rounded-xl bg-[#f2ebe3] flex items-center justify-center text-[#c9a87c]">
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-cormorant text-xl font-semibold text-[#2c2a27] mb-2">{step.title}</h3>
                        <p className="text-sm text-neutral-500 font-light leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ── TESTIMONIOS ───────────────────────────────────────────── */}
          <section className="py-16 border-t border-neutral-100 bg-neutral-50">
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-12">
                <span className="text-[10px] font-medium uppercase tracking-widest text-[#8a6a50] block mb-2">
                  Experiencias
                </span>
                <h2 className="font-cormorant text-3xl font-light text-[#2c2a27]">
                  Lo que dicen nuestros clientes
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {TESTIMONIALS.map((t) => (
                  <div key={t.name} className="bg-white rounded-2xl border border-neutral-200 p-7 flex flex-col gap-4">
                    <div className="flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-sm text-neutral-600 font-light leading-relaxed italic flex-1">
                      "{t.comment}"
                    </p>
                    <div className="pt-4 border-t border-neutral-100 flex justify-between">
                      <span className="text-sm font-semibold text-[#2c2a27]">{t.name}</span>
                      <span className="text-[10px] uppercase tracking-wider text-neutral-400">{t.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── SHOWROOM & CONTACTO ───────────────────────────────────── */}
          <section id="showroom" className="py-16 border-t border-neutral-100 bg-[#faf9f6]">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

              {/* Información del showroom */}
              <div className="flex flex-col gap-8">
                <div>
                  <span className="text-[10px] font-medium uppercase tracking-widest text-[#8a6a50] block mb-3">
                    Visitanos
                  </span>
                  <h2 className="font-cormorant text-3xl font-light text-[#2c2a27] mb-3">
                    Nuestro Showroom
                  </h2>
                  <p className="text-sm text-neutral-500 font-light leading-relaxed max-w-sm">
                    En nuestro espacio físico podés ver, tocar y probar cada pieza antes de decidir.
                    También trabajamos con showroom virtual por videollamada.
                  </p>
                </div>

                <div className="flex flex-col gap-5">
                  {CONTACT_INFO.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-[#c9a87c] shrink-0">
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
                  href="https://wa.me/5491155342200?text=Hola%20NORDIK!%20Quiero%20coordinar%20una%20visita%20al%20showroom."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#2c2a27] text-white text-sm font-medium hover:bg-neutral-700 transition-colors w-fit"
                >
                  <MessageCircle className="w-4 h-4" />
                  Coordinar Visita al Showroom
                </a>
              </div>

              {/* Formulario de consulta */}
              <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-8">
                <h3 className="font-cormorant text-xl font-semibold text-[#2c2a27] mb-1">Consultá por un espacio</h3>
                <p className="text-xs text-neutral-400 mb-6">Contanos en qué ambiente querés trabajar y te asesoramos sin compromiso.</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-neutral-600 mb-1.5">Nombre</label>
                    <input
                      id="name" type="text" required
                      placeholder="Ej: Valentina García"
                      value={formName} onChange={(e) => setFormName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-[#c9a87c] focus:ring-2 focus:ring-[#c9a87c]/10 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-neutral-600 mb-1.5">Email</label>
                    <input
                      id="email" type="email" required
                      placeholder="Ej: valentina@email.com"
                      value={formEmail} onChange={(e) => setFormEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-[#c9a87c] focus:ring-2 focus:ring-[#c9a87c]/10 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="msg" className="block text-xs font-medium text-neutral-600 mb-1.5">¿Qué espacio querés renovar?</label>
                    <textarea
                      id="msg" rows={4} required
                      placeholder="Ej: Living de 20m², estoy buscando sofá y mesa de centro..."
                      value={formMsg} onChange={(e) => setFormMsg(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-[#c9a87c] focus:ring-2 focus:ring-[#c9a87c]/10 transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit" disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-[#2c2a27] text-white text-sm font-medium hover:bg-neutral-700 disabled:opacity-60 transition-colors border-none cursor-pointer"
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar Consulta por WhatsApp ↗'}
                  </button>
                </form>
              </div>
            </div>
          </section>

        </main>

        {/* ── FOOTER ────────────────────────────────────────────────────── */}
        <footer className="border-t border-neutral-200 bg-[#2c2a27]">
          <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="font-cormorant text-white font-semibold tracking-widest uppercase text-base">NORDIK</span>
              <p className="text-neutral-400 text-xs mt-0.5">
                &copy; {new Date().getFullYear()} NORDIK Casa & Diseño · Todos los derechos reservados.
              </p>
              <p className="text-neutral-500 text-[10px] mt-0.5">
                Propuesta Catálogo ($200 USD) diseñada por JoaTech.
              </p>
            </div>
            <div className="flex items-center gap-5 text-xs text-neutral-400">
              <a href="#" className="hover:text-white transition-colors flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
                Instagram
              </a>
              <a href="#" className="hover:text-white transition-colors">Privacidad</a>
              <a href="#" className="hover:text-white transition-colors">Términos</a>
            </div>
          </div>
        </footer>

      </div>

      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </>
  );
}
