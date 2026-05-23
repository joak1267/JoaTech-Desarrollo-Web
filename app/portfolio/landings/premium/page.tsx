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
  Search,
  Building2,
  Home,
  KeyRound,
  TrendingUp,
  ShieldCheck,
  Award,
  Users,
  Handshake,
  ClipboardList,
  BadgeCheck,
  Menu,
  X,
} from 'lucide-react';

/* ─── Fuentes ────────────────────────────────────────────────────────────── */
const FONTS = `
  @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Outfit:wght@300;400;500;600&display=swap');
  .font-baskerville { font-family: 'Libre Baskerville', Georgia, serif; }
  .font-outfit      { font-family: 'Outfit', system-ui, sans-serif; }
`;

/* ─── Datos ──────────────────────────────────────────────────────────────── */

const STATS = [
  { value: '1.200+', label: 'Propiedades vendidas' },
  { value: '18 años', label: 'En el mercado' },
  { value: '96%', label: 'Clientes que vuelven' },
  { value: '12 zonas', label: 'En CABA y GBA' },
];

const OPERATIONS = [
  { icon: TrendingUp, label: 'Venta',              desc: 'Vendé tu propiedad al mejor precio del mercado con nuestra red de compradores calificados.',  count: '480+ en oferta' },
  { icon: KeyRound,   label: 'Alquiler',           desc: 'Propiedades residenciales y comerciales para alquilar en las mejores zonas de Buenos Aires.', count: '210+ disponibles' },
  { icon: Building2,  label: 'Inversión',          desc: 'Asesoramiento profesional para que tu capital rinda al máximo en propiedades en pozo y a estrenar.', count: '35+ proyectos' },
];

const PROPERTIES = [
  { type: 'Departamento', operation: 'Venta',    zona: 'Palermo Soho',       ambientes: '3',  m2: '85',  price: 'USD 185.000', tag: 'Destacado', img: '/landings/apex_apt_palermo.jpg'    },
  { type: 'Casa',         operation: 'Venta',    zona: 'Martínez, GBA Norte',ambientes: '5',  m2: '280', price: 'USD 520.000', tag: 'Exclusivo',  img: '/landings/apex_house_martinez.jpg' },
  { type: 'PH',           operation: 'Venta',    zona: 'Recoleta',           ambientes: '4',  m2: '150', price: 'USD 310.000', tag: null,         img: '/landings/apex_ph_recoleta.jpg'    },
  { type: 'Departamento', operation: 'Alquiler', zona: 'Núñez',              ambientes: '2',  m2: '60',  price: '$480.000/mes', tag: null,         img: '/landings/apex_apt_nunez.jpg'      },
  { type: 'Local Comer.', operation: 'Alquiler', zona: 'Cabildo, Belgrano',  ambientes: null, m2: '95',  price: '$620.000/mes', tag: 'Nuevo',      img: '/landings/apex_local_belgrano.jpg' },
  { type: 'Departamento', operation: 'Pozo',     zona: 'Villa Urquiza',      ambientes: '2',  m2: '58',  price: 'USD 98.000',  tag: 'En pozo',    img: '/landings/apex_pozo_urquiza.jpg'   },
];

const ZONES = [
  'Palermo', 'Recoleta', 'Belgrano', 'Núñez',
  'San Isidro', 'Vicente López', 'Martínez', 'Tigre',
  'Villa Urquiza', 'Caballito', 'Barracas', 'Puerto Madero',
];

const PROCESS = [
  { icon: Search,        step: '01', title: 'Consulta Inicial',      desc: 'Analizamos tus necesidades, presupuesto y ubicaciones preferidas para encontrar la propiedad ideal.' },
  { icon: ClipboardList, step: '02', title: 'Selección & Visitas',   desc: 'Curaduria de propiedades filtradas y coordinación de visitas presenciales o virtuales.' },
  { icon: Handshake,     step: '03', title: 'Oferta & Negociación',  desc: 'Te acompañamos en toda la negociación del precio y condiciones para proteger tus intereses.' },
  { icon: BadgeCheck,    step: '04', title: 'Escritura & Entrega',   desc: 'Gestionamos toda la documentación notarial, la escritura y la entrega final de llaves.' },
];

const TEAM = [
  { 
    name: 'Luciana Paredes',  
    role: 'Socia Directora',        
    zone: 'Palermo · Recoleta · Belgrano',   
    deals: '320+ operaciones',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&h=300&q=80'
  },
  { 
    name: 'Matías Echeverría',
    role: 'Asesor Senior',          
    zone: 'GBA Norte · Tigre · San Isidro',  
    deals: '210+ operaciones',
    img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&h=300&q=80'
  },
  { 
    name: 'Camila Rodríguez', 
    role: 'Asesora Comercial',      
    zone: 'Caballito · Villa Urquiza · CABA', 
    deals: '180+ operaciones',
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&h=300&q=80'
  },
];

const TESTIMONIALS = [
  { name: 'Diego F.',   location: 'Comprador — Palermo',     rating: 5, comment: 'Vendí mi departamento en 3 semanas al precio que yo pedía. Atención personalizada de principio a fin, sin vueltas.' },
  { name: 'Andrea M.',  location: 'Inversora — Villa Urquiza',rating: 5, comment: 'Me asesoraron en la compra de un piso en pozo y la proyección de rentabilidad fue exacta. Muy profesionales.' },
  { name: 'Roberto G.', location: 'Inquilino — Núñez',       rating: 5, comment: 'Encontraron el departamento ideal en 10 días. El proceso de documentación fue todo muy claro y transparente.' },
];

const CONTACT = [
  { icon: MapPin,  label: 'Oficina Central', value: 'Av. Santa Fe 2450, 3° piso, Palermo, CABA' },
  { icon: Clock,   label: 'Horarios',        value: 'Lun–Vie: 09:00–18:30 hs · Sáb: 10:00–14:00 hs' },
  { icon: Phone,   label: 'Teléfono',        value: '+54 9 11 4820-7700' },
];

/* ─── Componente ─────────────────────────────────────────────────────────── */

export default function LandingPremiumDemoPage() {
  const [isQuoteOpen, setIsQuoteOpen]   = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchOp, setSearchOp]         = useState('Venta');
  const [searchZone, setSearchZone]     = useState('');
  const [formName, setFormName]         = useState('');
  const [formEmail, setFormEmail]       = useState('');
  const [formPhone, setFormPhone]       = useState('');
  const [formMsg, setFormMsg]           = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail) return;
    setIsSubmitting(true);
    setTimeout(() => {
      const text = `Hola APEX! Soy ${formName} (${formEmail}${formPhone ? ` · ${formPhone}` : ''}). Consulta: "${formMsg}"`;
      window.open(`https://wa.me/5491148207700?text=${encodeURIComponent(text)}`, '_blank');
      setIsSubmitting(false);
      setFormName(''); setFormEmail(''); setFormPhone(''); setFormMsg('');
    }, 600);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: FONTS }} />

      <div className="bg-white min-h-screen text-neutral-800 font-outfit flex flex-col">

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
          <span className="hidden sm:inline-block text-[10px] font-semibold uppercase tracking-widest text-[#7a6030] bg-white/80 border border-[#e8d9a8]/60 px-3 py-1.5 rounded-full shadow-sm backdrop-blur-md">
            Demo Premium ($400)
          </span>
          <button
            onClick={() => setIsQuoteOpen(true)}
            className="px-4 py-2 text-xs font-semibold rounded-full text-white bg-gradient-to-r from-[#00F2FE] to-[#2F4BC0] transition-all duration-300 hover:scale-105 cursor-pointer shadow-[0_0_15px_rgba(0,242,254,0.25)] hover:shadow-[0_0_25px_rgba(0,242,254,0.55)] border border-[#00F2FE]/20"
          >
            Cotizar Estructura ↗
          </button>
        </div>

        {/* ── Navbar APEX ──────────────────────────────────────────────── */}
        <header className="bg-[#1a1f2e] text-white relative">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <span className="font-baskerville text-2xl font-bold text-white tracking-tight">APEX</span>
              </div>
              <span className="text-neutral-400 text-xs tracking-widest uppercase hidden sm:inline border-l border-neutral-700 pl-3">Propiedades Premium</span>
            </div>

            <nav className="hidden md:flex items-center gap-7 text-xs font-medium tracking-wider text-neutral-400 uppercase">
              <a href="#propiedades" className="hover:text-white transition-colors">Propiedades</a>
              <a href="#zonas"       className="hover:text-white transition-colors">Zonas</a>
              <a href="#proceso"     className="hover:text-white transition-colors">Proceso</a>
              <a href="#equipo"      className="hover:text-white transition-colors">Equipo</a>
              <a href="#contacto"    className="hover:text-white transition-colors">Contacto</a>
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <span className="text-xs text-neutral-400 hidden lg:inline">11 4820-7700</span>
              <a
                href="https://wa.me/5491148207700?text=Hola%20APEX!%20Necesito%20asesoramiento."
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-[#c9a55a] text-[#1a1f2e] text-xs font-semibold hover:bg-[#d4b06a] transition-colors"
              >
                Consultar Ahora
              </a>
            </div>

            {/* Hamburger Button for Mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-neutral-800 text-neutral-300 transition-colors"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-[#1a1f2e] border-b border-neutral-800 shadow-lg px-6 py-6 md:hidden flex flex-col gap-4 z-40">
              <nav className="flex flex-col gap-3 text-sm font-medium tracking-wider text-neutral-400 uppercase">
                <a 
                  href="#propiedades" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-white py-1.5 transition-colors border-b border-white/5"
                >
                  Propiedades
                </a>
                <a 
                  href="#zonas" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-white py-1.5 transition-colors border-b border-white/5"
                >
                  Zonas
                </a>
                <a 
                  href="#proceso" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-white py-1.5 transition-colors border-b border-white/5"
                >
                  Proceso
                </a>
                <a 
                  href="#equipo" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-white py-1.5 transition-colors border-b border-white/5"
                >
                  Equipo
                </a>
                <a 
                  href="#contacto" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-white py-1.5 transition-colors border-b border-white/5"
                >
                  Contacto
                </a>
              </nav>
              <div className="flex flex-col gap-3 pt-3 border-t border-white/10">
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
                  href="https://wa.me/5491148207700?text=Hola%20APEX!%20Necesito%20asesoramiento."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-3 rounded-lg bg-[#c9a55a] text-[#1a1f2e] text-xs font-semibold text-center hover:bg-[#d4b06a] transition-colors"
                >
                  Consultar Ahora
                </a>
              </div>
            </div>
          )}
        </header>

        <main className="flex-1">

          {/* ── HERO + BUSCADOR ───────────────────────────────────────── */}
          <section className="relative bg-[#1a1f2e] text-white pb-0 pt-16 overflow-hidden">
            {/* Fondo con imagen premium y overlay */}
            <div className="absolute inset-0 z-0">
              <img 
                src="/landings/apex_hero_bg.jpg" 
                alt="Fondo APEX" 
                className="w-full h-full object-cover opacity-20 object-center" 
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#1a1f2e]/60 via-[#1a1f2e]/85 to-[#1a1f2e]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
              <div className="max-w-3xl mx-auto text-center space-y-6 pb-12">
                <span className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-widest text-[#c9a55a]">
                  <span className="w-5 h-px bg-[#c9a55a]" />
                  Inmobiliaria Premium · CABA & GBA Norte
                  <span className="w-5 h-px bg-[#c9a55a]" />
                </span>
                <h1 className="font-baskerville text-5xl sm:text-6xl lg:text-7xl font-normal leading-[1.1]">
                  Tu próxima propiedad,<br />
                  <em className="text-[#c9a55a]">a un paso</em>
                </h1>
                <p className="text-base text-neutral-400 font-light leading-relaxed max-w-xl mx-auto">
                  18 años conectando familias, inversores y empresas con las mejores
                  propiedades de Buenos Aires. Asesoramiento 100% personalizado.
                </p>
              </div>

              {/* Widget buscador interactivo */}
              <div className="max-w-3xl mx-auto bg-white rounded-t-2xl p-4 shadow-xl">
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Operación */}
                  <div className="flex gap-1.5 p-1 bg-neutral-100 rounded-xl">
                    {['Venta', 'Alquiler', 'Inversión'].map((op) => (
                      <button
                        key={op}
                        onClick={() => setSearchOp(op)}
                        className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all border-none cursor-pointer ${
                          searchOp === op
                            ? 'bg-[#1a1f2e] text-white'
                            : 'bg-transparent text-neutral-500 hover:text-neutral-800'
                        }`}
                      >
                        {op}
                      </button>
                    ))}
                  </div>

                  {/* Zona */}
                  <div className="flex-1 relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input
                      type="text"
                      placeholder="Zona o barrio (ej: Palermo, San Isidro...)"
                      value={searchZone}
                      onChange={(e) => setSearchZone(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-[#c9a55a] focus:ring-2 focus:ring-[#c9a55a]/10 transition-all"
                    />
                  </div>

                  {/* Buscar */}
                  <a
                    href={`https://wa.me/5491148207700?text=Hola%20APEX!%20Busco%20una%20propiedad%20en%20${encodeURIComponent(searchOp)}${searchZone ? `%20en%20${encodeURIComponent(searchZone)}` : ''}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#c9a55a] text-[#1a1f2e] text-xs font-semibold hover:bg-[#d4b06a] transition-colors"
                  >
                    <Search className="w-4 h-4" />
                    Buscar
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* ── STATS ─────────────────────────────────────────────────── */}
          <section className="bg-[#f8f7f3] border-b border-neutral-200 py-10">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-baskerville text-3xl font-bold text-[#1a1f2e]">{s.value}</p>
                  <p className="text-xs text-neutral-500 mt-1 tracking-wide">{s.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── TIPO DE OPERACIÓN ─────────────────────────────────────── */}
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="mb-10">
                <span className="text-[10px] font-medium uppercase tracking-widest text-[#7a6030] block mb-2">¿Qué estás buscando?</span>
                <h2 className="font-baskerville text-3xl font-normal text-[#1a1f2e]">Encontrá lo que necesitás</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {OPERATIONS.map((op) => {
                  const Icon = op.icon;
                  return (
                    <a
                      key={op.label}
                      href={`https://wa.me/5491148207700?text=Hola%20APEX!%20Me%20interesa%20${encodeURIComponent(op.label)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-[#f8f7f3] border border-neutral-200 rounded-2xl p-7 hover:border-[#c9a55a]/60 hover:shadow-md transition-all flex flex-col gap-5"
                    >
                      <div className="w-11 h-11 rounded-xl bg-[#1a1f2e] flex items-center justify-center text-[#c9a55a] group-hover:bg-[#252b40] transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-baskerville text-xl font-normal text-[#1a1f2e]">{op.label}</h3>
                          <span className="text-[9px] font-semibold text-[#7a6030] bg-[#fdf6e8] border border-[#e8d9a8] px-2 py-0.5 rounded-full">{op.count}</span>
                        </div>
                        <p className="text-sm text-neutral-500 font-light leading-relaxed">{op.desc}</p>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#c9a55a] group-hover:gap-2.5 transition-all mt-auto">
                        Ver propiedades <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ── PROPIEDADES DESTACADAS ────────────────────────────────── */}
          <section id="propiedades" className="py-16 border-t border-neutral-100 bg-[#f8f7f3]">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-end justify-between mb-10">
                <div>
                  <span className="text-[10px] font-medium uppercase tracking-widest text-[#7a6030] block mb-2">Selección Curada</span>
                  <h2 className="font-baskerville text-3xl font-normal text-[#1a1f2e]">Propiedades Destacadas</h2>
                </div>
                <a
                  href="https://wa.me/5491148207700?text=Hola%20APEX!%20Quiero%20ver%20más%20propiedades."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-neutral-500 hover:text-[#1a1f2e] transition-colors"
                >
                  Ver todas <ChevronRight className="w-4 h-4" />
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {PROPERTIES.map((p, i) => (
                  <a
                    key={i}
                    href={`https://wa.me/5491148207700?text=Hola%20APEX!%20Me%20interesa%20el%20${encodeURIComponent(p.type)}%20en%20${encodeURIComponent(p.zona)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-lg hover:border-neutral-300 transition-all"
                  >
                    <div className="h-44 relative overflow-hidden">
                      <img src={p.img} alt={`${p.type} en ${p.zona}`} className="w-full h-full object-cover" />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="text-[9px] font-semibold uppercase tracking-wider bg-[#1a1f2e] text-white px-2 py-0.5 rounded">{p.operation}</span>
                        {p.tag && <span className="text-[9px] font-semibold uppercase tracking-wider bg-[#c9a55a] text-[#1a1f2e] px-2 py-0.5 rounded">{p.tag}</span>}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-5">
                      <p className="text-[10px] font-medium uppercase tracking-widest text-neutral-400 mb-1">{p.type}</p>
                      <h3 className="font-baskerville text-base font-normal text-[#1a1f2e]">{p.zona}</h3>
                      <div className="flex items-center gap-4 mt-2 text-xs text-neutral-500">
                        {p.ambientes && <span>{p.ambientes} amb.</span>}
                        <span>{p.m2} m²</span>
                      </div>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-100">
                        <span className="font-baskerville text-base font-bold text-[#1a1f2e]">{p.price}</span>
                        <span className="text-xs font-medium text-[#c9a55a] group-hover:underline">Ver más →</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* ── ZONAS ────────────────────────────────────────────────── */}
          <section id="zonas" className="py-16 border-t border-neutral-100 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="mb-10">
                <span className="text-[10px] font-medium uppercase tracking-widest text-[#7a6030] block mb-2">Cobertura</span>
                <h2 className="font-baskerville text-3xl font-normal text-[#1a1f2e]">Zonas donde operamos</h2>
                <p className="text-sm text-neutral-500 mt-2">Especializados en los barrios más cotizados de Buenos Aires y GBA Norte.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {ZONES.map((z) => (
                  <a
                    key={z}
                    href={`https://wa.me/5491148207700?text=Hola%20APEX!%20Busco%20propiedades%20en%20${encodeURIComponent(z)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#f8f7f3] border border-neutral-200 text-sm font-medium text-neutral-700 hover:bg-[#1a1f2e] hover:text-white hover:border-[#1a1f2e] transition-all group"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#c9a55a] group-hover:text-[#c9a55a]" />
                    {z}
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* ── PROCESO ───────────────────────────────────────────────── */}
          <section id="proceso" className="py-16 border-t border-neutral-100 bg-[#f8f7f3]">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-12">
                <span className="text-[10px] font-medium uppercase tracking-widest text-[#7a6030] block mb-2">Sin sorpresas</span>
                <h2 className="font-baskerville text-3xl font-normal text-[#1a1f2e]">Así trabajamos</h2>
                <p className="text-sm text-neutral-500 mt-2 max-w-md mx-auto">
                  Un proceso claro, transparente y acompañado en cada etapa.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {PROCESS.map((step) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.step} className="bg-white rounded-2xl border border-neutral-200 p-6 flex flex-col gap-5 hover:shadow-sm transition-all">
                      <div className="flex items-center gap-3">
                        <span className="font-baskerville text-5xl font-bold text-neutral-100 leading-none select-none">{step.step}</span>
                        <div className="w-9 h-9 rounded-xl bg-[#1a1f2e] flex items-center justify-center text-[#c9a55a]">
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-baskerville text-base font-normal text-[#1a1f2e] mb-2">{step.title}</h3>
                        <p className="text-xs text-neutral-500 font-light leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ── EQUIPO ────────────────────────────────────────────────── */}
          <section id="equipo" className="py-16 border-t border-neutral-100 bg-white">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-12">
                <span className="text-[10px] font-medium uppercase tracking-widest text-[#7a6030] block mb-2">Expertos</span>
                <h2 className="font-baskerville text-3xl font-normal text-[#1a1f2e]">Nuestro equipo</h2>
                <p className="text-sm text-neutral-500 mt-2">Asesores especializados por zona, con años de experiencia y cientos de operaciones.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {TEAM.map((member) => (
                  <div key={member.name} className="bg-[#f8f7f3] rounded-2xl border border-neutral-200 p-7 flex flex-col gap-5 hover:shadow-sm transition-all text-center">
                    {/* Foto del agente */}
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#c9a55a]/30 mx-auto shadow-sm bg-neutral-100">
                      <img 
                        src={member.img} 
                        alt={member.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-baskerville text-lg font-normal text-[#1a1f2e]">{member.name}</h3>
                      <p className="text-xs font-medium text-[#7a6030] uppercase tracking-wider mt-1">{member.role}</p>
                    </div>
                    <div className="text-xs text-neutral-500 space-y-1.5 text-left border-t border-neutral-200 pt-4">
                      <p className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-[#c9a55a] shrink-0" />{member.zone}</p>
                      <p className="flex items-center gap-2"><Award className="w-3.5 h-3.5 text-[#c9a55a] shrink-0" />{member.deals}</p>
                    </div>
                    <a
                      href={`https://wa.me/5491148207700?text=Hola%20APEX!%20Quiero%20hablar%20con%20${encodeURIComponent(member.name)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center justify-center gap-1.5 text-xs font-medium text-neutral-600 hover:text-[#1a1f2e] transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#c9a55a]" /> Contactar por WhatsApp
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── TESTIMONIOS ───────────────────────────────────────────── */}
          <section className="py-16 border-t border-neutral-100 bg-[#f8f7f3]">
            <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-12">
                <span className="text-[10px] font-medium uppercase tracking-widest text-[#7a6030] block mb-2">Opiniones</span>
                <h2 className="font-baskerville text-3xl font-normal text-[#1a1f2e]">Lo que dicen nuestros clientes</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {TESTIMONIALS.map((t) => (
                  <div key={t.name} className="bg-white rounded-2xl border border-neutral-200 p-7 flex flex-col gap-4">
                    <div className="flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-sm text-neutral-600 font-light leading-relaxed italic flex-1">"{t.comment}"</p>
                    <div className="pt-4 border-t border-neutral-100 flex justify-between">
                      <span className="text-sm font-semibold text-[#1a1f2e]">{t.name}</span>
                      <span className="text-[10px] uppercase tracking-wider text-neutral-400">{t.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── CTA BANNER ────────────────────────────────────────────── */}
          <section className="bg-[#1a1f2e] py-16">
            <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
              <h2 className="font-baskerville text-4xl sm:text-5xl font-normal text-white leading-tight">
                ¿Listo para dar el<br />
                <em className="text-[#c9a55a]">siguiente paso</em>?
              </h2>
              <p className="text-neutral-400 font-light max-w-lg mx-auto">
                Hablá hoy con uno de nuestros asesores y encontrá la propiedad que cambia tu vida.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://wa.me/5491148207700?text=Hola%20APEX!%20Quiero%20asesoramiento%20para%20comprar%20o%20vender."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#c9a55a] text-[#1a1f2e] font-semibold text-sm hover:bg-[#d4b06a] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Hablar con un Asesor
                </a>
                <a
                  href="#propiedades"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-neutral-600 text-white text-sm font-medium hover:border-neutral-400 transition-colors"
                >
                  Ver Propiedades
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs text-neutral-500">
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-[#c9a55a]" /> Operación 100% segura</span>
                <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-[#c9a55a]" /> Equipo con matrícula</span>
                <span className="flex items-center gap-1.5"><BadgeCheck className="w-3.5 h-3.5 text-[#c9a55a]" /> Asesoramiento sin cargo</span>
              </div>
            </div>
          </section>

          {/* ── CONTACTO ──────────────────────────────────────────────── */}
          <section id="contacto" className="py-16 border-t border-neutral-100 bg-white">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

              {/* Datos */}
              <div className="flex flex-col gap-8">
                <div>
                  <span className="text-[10px] font-medium uppercase tracking-widest text-[#7a6030] block mb-3">Contacto</span>
                  <h2 className="font-baskerville text-3xl font-normal text-[#1a1f2e] mb-3">Oficina Central</h2>
                  <p className="text-sm text-neutral-500 font-light leading-relaxed max-w-sm">
                    Visitanos en nuestras oficinas de Palermo o coordiná una reunión virtual con tu asesor asignado.
                  </p>
                </div>

                <div className="flex flex-col gap-5">
                  {CONTACT.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-xl bg-[#f8f7f3] border border-neutral-200 flex items-center justify-center text-[#c9a55a] shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-neutral-700">{label}</p>
                        <p className="text-sm text-neutral-500 font-light mt-0.5">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-3">
                  <a
                    href="https://wa.me/5491148207700?text=Hola%20APEX!%20Quiero%20coordinar%20una%20reunión."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1a1f2e] text-white text-sm font-medium hover:bg-[#252b40] transition-colors w-fit"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Coordinar Reunión por WhatsApp
                  </a>
                  <p className="text-xs text-neutral-400">También por email: info@apexpropiedades.com.ar</p>
                </div>
              </div>

              {/* Formulario */}
              <div className="bg-[#f8f7f3] rounded-2xl border border-neutral-200 p-8">
                <h3 className="font-baskerville text-xl font-normal text-[#1a1f2e] mb-1">Dejanos tu consulta</h3>
                <p className="text-xs text-neutral-400 mb-6">Te responde un asesor en menos de 2 horas hábiles.</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-medium text-neutral-600 mb-1.5">Nombre</label>
                      <input
                        id="name" type="text" required placeholder="Tu nombre"
                        value={formName} onChange={(e) => setFormName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-[#c9a55a] focus:ring-2 focus:ring-[#c9a55a]/10 transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-xs font-medium text-neutral-600 mb-1.5">Teléfono</label>
                      <input
                        id="phone" type="tel" placeholder="11 xxxx-xxxx"
                        value={formPhone} onChange={(e) => setFormPhone(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-[#c9a55a] focus:ring-2 focus:ring-[#c9a55a]/10 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-neutral-600 mb-1.5">Email</label>
                    <input
                      id="email" type="email" required placeholder="tucorreo@email.com"
                      value={formEmail} onChange={(e) => setFormEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-[#c9a55a] focus:ring-2 focus:ring-[#c9a55a]/10 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="msg" className="block text-xs font-medium text-neutral-600 mb-1.5">Mensaje</label>
                    <textarea
                      id="msg" rows={4} required placeholder="Contanos qué tipo de propiedad buscás, zona, presupuesto..."
                      value={formMsg} onChange={(e) => setFormMsg(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-white text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-[#c9a55a] focus:ring-2 focus:ring-[#c9a55a]/10 transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit" disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-[#1a1f2e] text-white text-sm font-medium hover:bg-[#252b40] disabled:opacity-60 transition-colors border-none cursor-pointer"
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar Consulta por WhatsApp ↗'}
                  </button>
                </form>
              </div>
            </div>
          </section>

        </main>

        {/* ── FOOTER ────────────────────────────────────────────────────── */}
        <footer className="bg-[#1a1f2e] text-white">
          <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-white/10">
            <div>
              <div className="flex items-center gap-1 mb-3">
                <span className="font-baskerville text-xl font-bold">APEX</span>
              </div>
              <p className="text-xs text-neutral-400 font-light leading-relaxed max-w-xs">
                Inmobiliaria premium especializada en CABA y GBA Norte. 18 años conectando personas con propiedades que transforman su vida.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-4">Zonas Principales</p>
              <div className="grid grid-cols-2 gap-1.5">
                {ZONES.slice(0, 8).map((z) => (
                  <span key={z} className="text-xs text-neutral-400 hover:text-white transition-colors cursor-default">{z}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-4">Contacto</p>
              <div className="space-y-2 text-xs text-neutral-400">
                <p>Av. Santa Fe 2450, Palermo, CABA</p>
                <p>+54 9 11 4820-7700</p>
                <p>info@apexpropiedades.com.ar</p>
              </div>
              <a
                href="https://wa.me/5491148207700"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-xs font-medium text-[#c9a55a] hover:underline"
              >
                <MessageCircle className="w-3.5 h-3.5" /> WhatsApp directo
              </a>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-neutral-500">
            <span>&copy; {new Date().getFullYear()} APEX Propiedades Premium. Todos los derechos reservados. Matrícula CUCICBA 7842.</span>
            <span className="text-neutral-600">Propuesta Premium ($400 USD) diseñada por JoaTech.</span>
          </div>
        </footer>

      </div>

      <QuoteModal isOpen={isQuoteOpen} onClose={() => setIsQuoteOpen(false)} />
    </>
  );
}
