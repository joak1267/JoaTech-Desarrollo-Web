'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FileText, Layers, ShoppingBag, Cpu, LucideIcon } from 'lucide-react';

// Esquema de validación estricta con Zod
const quoteSchema = z.object({
  projectType: z.string().min(1, 'Seleccioná un tipo de proyecto'),
  budget: z.string().min(1, 'Seleccioná un presupuesto'),
  timeline: z.string().min(1, 'Seleccioná un plazo de entrega'),
  features: z.string().min(10, 'Contanos un poco más sobre el proyecto (mínimo 10 caracteres)'),
  name: z.string().min(2, 'Ingresá tu nombre (mínimo 2 caracteres)'),
  email: z.string().email('Ingresá un correo electrónico válido'),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ProjectTypeOption {
  id: string;
  label: string;
  icon: LucideIcon;
  desc: string;
}

const PROJECT_TYPES: ProjectTypeOption[] = [
  { id: 'landing', label: 'Landing Page', icon: FileText, desc: 'Para captar clientes o lanzar productos' },
  { id: 'webapp', label: 'Web App / SaaS', icon: Layers, desc: 'Plataformas interactivas y sistemas a medida' },
  { id: 'ecommerce', label: 'E-commerce', icon: ShoppingBag, desc: 'Tiendas online con pasarela de pagos' },
  { id: 'custom', label: 'Software a Medida', icon: Cpu, desc: 'Soluciones complejas e integraciones' },
];

const TIMELINES = [
  { id: 'fast', label: 'Urgente (< 1 mes)' },
  { id: 'normal', label: '1 a 3 meses' },
  { id: 'flexible', label: 'Flexible (3+ meses)' },
];

// Obtener presupuestos dinámicos basados en la selección de tipo de proyecto
const getBudgetRanges = (projectType: string) => {
  switch (projectType) {
    case 'landing':
      return [
        { id: 'landing_low', label: 'Menos de $200 USD' },
        { id: 'landing_high', label: '$200 - $400 USD' },
      ];
    case 'ecommerce':
      return [
        { id: 'ecommerce_low', label: 'Menos de $400 USD' },
        { id: 'ecommerce_high', label: '$400 - $800 USD' },
      ];
    case 'webapp':
      return [
        { id: 'webapp_low', label: 'Menos de $700 USD' },
        { id: 'webapp_high', label: '$700 - $1200 USD' },
      ];
    case 'custom':
      return [
        { id: 'custom_agreed', label: 'A convenir según requerimientos técnicos' },
      ];
    default:
      return [];
  }
};

export default function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1); // 1 = adelante, -1 = atrás
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    reset,
    formState: { errors },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      projectType: '',
      budget: '',
      timeline: '',
      features: '',
      name: '',
      email: '',
    },
  });

  // Observar valores del formulario
  const selectedProjectType = watch('projectType');
  const selectedBudget = watch('budget');
  const selectedTimeline = watch('timeline');

  // Navegación de pasos con validación parcial
  const handleNextStep = async () => {
    let fieldsToValidate: Array<keyof QuoteFormData> = [];
    if (step === 1) {
      fieldsToValidate = ['projectType'];
    } else if (step === 2) {
      fieldsToValidate = ['budget', 'timeline'];
    }

    const isStepValid = await trigger(fieldsToValidate);

    if (isStepValid) {
      setDirection(1);
      setStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setDirection(-1);
    setStep((prev) => prev - 1);
  };

  // Enviar formulario y redireccionar a WhatsApp
  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true);

    // Mapeo amigable de los campos para el mensaje
    const projectTypeLabels: Record<string, string> = {
      landing: 'Landing Page',
      webapp: 'Web App / SaaS',
      ecommerce: 'E-commerce',
      custom: 'Software a Medida',
    };

    const budgetRanges = getBudgetRanges(data.projectType);
    const selectedBudgetObj = budgetRanges.find((r) => r.id === data.budget);
    const budgetLabel = selectedBudgetObj ? selectedBudgetObj.label : data.budget;

    const timelineLabels: Record<string, string> = {
      fast: 'Urgente (< 1 mes)',
      normal: '1 a 3 meses',
      flexible: 'Flexible (3+ meses)',
    };

    const pType = projectTypeLabels[data.projectType] || data.projectType;
    const pBudget = budgetLabel;
    const pTimeline = timelineLabels[data.timeline] || data.timeline;

    // Formatear el mensaje para WhatsApp
    const whatsappMessage = `*JOATECH // REPORTE DE COTIZACIÓN WEB*
──────────────────────────────

*DATOS DEL CLIENTE*
∙ Nombre: ${data.name}
∙ Email: ${data.email}

*REQUERIMIENTOS DEL PROYECTO*
∙ Tipo: ${pType}
∙ Presupuesto estimado: ${pBudget}
∙ Plazo de entrega: ${pTimeline}

*DETALLES ADICIONALES*
"${data.features}"
──────────────────────────────`;

    const whatsappUrl = `https://wa.me/5491124673417?text=${encodeURIComponent(whatsappMessage)}`;

    // Simulación de respuesta de guardado local / API (1.5 segundos)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Abrir WhatsApp en una nueva pestaña
    window.open(whatsappUrl, '_blank');

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleClose = () => {
    onClose();
    // Reiniciar formulario y estados después de cerrar
    setTimeout(() => {
      setStep(1);
      setDirection(1);
      setIsSuccess(false);
      reset();
    }, 300);
  };

  // Variantes para animación de pasos
  const stepVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  const budgetRanges = selectedProjectType ? getBudgetRanges(selectedProjectType) : [];
  const isCustomProjectType = selectedProjectType === 'custom';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* 1. Backdrop del Modal con desenfoque */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm"
          />

          {/* 2. Caja del Modal (Bento) */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="w-full max-w-xl bg-neutral-950/90 border border-[#00F2FE]/25 rounded-3xl overflow-hidden relative shadow-[0_0_50px_rgba(0,242,254,0.15)] z-10 flex flex-col max-h-[90vh]"
          >
            {/* Botón de Cerrar (X) */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white p-2 rounded-full hover:bg-neutral-900 transition-colors z-20 cursor-pointer"
              aria-label="Cerrar Modal"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Barra de Progreso (solo si no es pantalla de éxito) */}
            {!isSuccess && (
              <div className="w-full h-1.5 bg-neutral-900 relative">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: `${(step / 3) * 100}%` }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#00F2FE] via-[#4FACFE] to-[#E945F5]"
                />
              </div>
            )}

            {/* Contenido del Formulario */}
            <div className="p-6 sm:p-8 flex-grow overflow-y-auto">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  /* --- Pantalla de Éxito --- */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-10"
                  >
                    <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-[#00F2FE] to-[#2F4BC0] flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(0,242,254,0.4)]">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-[#00F2FE] via-[#4FACFE] to-[#E945F5] bg-clip-text text-transparent mb-4 tracking-tight">
                      ¡Presupuesto Enviado!
                    </h3>
                    <p className="text-sm sm:text-base text-neutral-300 max-w-sm leading-relaxed font-light mb-8">
                      Se ha abierto una ventana de WhatsApp para contactarte directamente con nosotros. Si no se abrió automáticamente, por favor revisá tus ventanas emergentes bloqueadas.
                    </p>
                    <button
                      onClick={handleClose}
                      className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors cursor-pointer"
                    >
                      Volver a la Web
                    </button>
                  </motion.div>
                ) : (
                  /* --- Pasos del Formulario --- */
                  <form onSubmit={handleSubmit(onSubmit)} className="h-full flex flex-col justify-between">
                    <AnimatePresence initial={false} custom={direction} mode="wait">
                      {step === 1 && (
                        /* --- PASO 1: Tipo de Proyecto --- */
                        <motion.div
                          key="step1"
                          custom={direction}
                          variants={stepVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{ duration: 0.25 }}
                          className="flex flex-col gap-5"
                        >
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#00F2FE]">Paso 1 de 3</span>
                            <h3 className="text-xl sm:text-2xl font-black text-white mt-1 tracking-tight">¿Qué tipo de proyecto vamos a crear?</h3>
                            <p className="text-xs text-neutral-400 font-light mt-1">Seleccioná la categoría que mejor describa tu necesidad.</p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-2">
                            {PROJECT_TYPES.map((type) => {
                              const isSelected = selectedProjectType === type.id;
                              const Icon = type.icon;
                              return (
                                <button
                                  key={type.id}
                                  type="button"
                                  onClick={() => {
                                    setValue('projectType', type.id, { shouldValidate: true });
                                    // Limpiar el presupuesto para evitar incompatibilidades entre tipos de proyectos
                                    setValue('budget', '', { shouldValidate: false });
                                  }}
                                  className={`flex flex-col text-left p-4 rounded-2xl border transition-all duration-300 hover:scale-[1.01] cursor-pointer ${
                                    isSelected
                                      ? 'bg-[#00F2FE]/5 border-[#00F2FE] shadow-[0_0_15px_rgba(0,242,254,0.15)]'
                                      : 'bg-neutral-900/40 border-neutral-800 hover:border-neutral-700/60'
                                  }`}
                                >
                                  <Icon className={`h-6 w-6 mb-2 transition-colors ${isSelected ? 'text-[#00F2FE]' : 'text-neutral-400'}`} />
                                  <span className="text-sm font-bold text-white">{type.label}</span>
                                  <span className="text-[11px] text-neutral-400 font-light mt-1 leading-snug">{type.desc}</span>
                                </button>
                              );
                            })}
                          </div>
                          {errors.projectType && (
                            <span className="text-xs text-red-400 font-medium">{errors.projectType.message}</span>
                          )}
                        </motion.div>
                      )}

                      {step === 2 && (
                        /* --- PASO 2: Presupuesto y Plazos --- */
                        <motion.div
                          key="step2"
                          custom={direction}
                          variants={stepVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{ duration: 0.25 }}
                          className="flex flex-col gap-6"
                        >
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#00F2FE]">Paso 2 de 3</span>
                            <h3 className="text-xl sm:text-2xl font-black text-white mt-1 tracking-tight">Presupuesto y Tiempos</h3>
                            <p className="text-xs text-neutral-400 font-light mt-1">Definí los tiempos requeridos y los rangos presupuestarios según tu proyecto.</p>
                          </div>

                          <div className="flex flex-col gap-4">
                            {/* Rango de Presupuesto */}
                            <div className="flex flex-col gap-2.5">
                              <label className="text-xs font-bold text-neutral-200 uppercase tracking-wide">Inversión Estimada</label>
                              <div className={isCustomProjectType ? "grid grid-cols-1 gap-2" : "grid grid-cols-2 gap-2"}>
                                {budgetRanges.map((range) => {
                                  const isSelected = selectedBudget === range.id;
                                  return (
                                    <button
                                      key={range.id}
                                      type="button"
                                      onClick={() => setValue('budget', range.id, { shouldValidate: true })}
                                      className={`py-3 px-4 rounded-xl border text-xs font-bold text-center transition-all duration-300 cursor-pointer ${
                                        isSelected
                                          ? 'bg-[#00F2FE]/5 border-[#00F2FE] text-white shadow-[0_0_12px_rgba(0,242,254,0.12)]'
                                          : 'bg-neutral-900/40 border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
                                      }`}
                                    >
                                      {range.label}
                                    </button>
                                  );
                                })}
                              </div>
                              {errors.budget && (
                                <span className="text-xs text-red-400 font-medium">{errors.budget.message}</span>
                              )}
                            </div>

                            {/* Plazo del Proyecto */}
                            <div className="flex flex-col gap-2.5 mt-2">
                              <label className="text-xs font-bold text-neutral-200 uppercase tracking-wide">Plazo de entrega requerido</label>
                              <div className="flex flex-col gap-2">
                                {TIMELINES.map((time) => {
                                  const isSelected = selectedTimeline === time.id;
                                  return (
                                    <button
                                      key={time.id}
                                      type="button"
                                      onClick={() => setValue('timeline', time.id, { shouldValidate: true })}
                                      className={`py-3 px-4 rounded-xl border text-xs font-bold text-left transition-all duration-300 flex items-center justify-between cursor-pointer ${
                                        isSelected
                                          ? 'bg-[#00F2FE]/5 border-[#00F2FE] text-white shadow-[0_0_12px_rgba(0,242,254,0.12)]'
                                          : 'bg-neutral-900/40 border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
                                      }`}
                                    >
                                      <span>{time.label}</span>
                                      {isSelected && <span className="h-2 w-2 rounded-full bg-[#00F2FE] shadow-[0_0_6px_#00F2FE]" />}
                                    </button>
                                  );
                                })}
                              </div>
                              {errors.timeline && (
                                <span className="text-xs text-red-400 font-medium">{errors.timeline.message}</span>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {step === 3 && (
                        /* --- PASO 3: Datos de Contacto y Descripción --- */
                        <motion.div
                          key="step3"
                          custom={direction}
                          variants={stepVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{ duration: 0.25 }}
                          className="flex flex-col gap-4"
                        >
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#00F2FE]">Paso 3 de 3</span>
                            <h3 className="text-xl sm:text-2xl font-black text-white mt-1 tracking-tight">Detalles y Datos de Contacto</h3>
                            <p className="text-xs text-neutral-400 font-light mt-1">Completá tu información para enviar y abrir tu cotización en WhatsApp.</p>
                          </div>

                          <div className="flex flex-col gap-3.5">
                            {/* Descripción del Proyecto */}
                            <div className="flex flex-col gap-1.5">
                              <label htmlFor="features" className="text-[10px] font-bold text-neutral-300 uppercase tracking-wider">¿Qué funcionalidades o alcance tenés en mente?</label>
                              <textarea
                                id="features"
                                rows={3}
                                placeholder="Ej: Necesitamos una web app para gestión de turnos con inicio de sesión, notificaciones automáticas y pasarela de pago Stripe..."
                                {...register('features')}
                                className="w-full bg-neutral-900/40 border border-neutral-800 rounded-xl p-3.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#00F2FE] focus:ring-1 focus:ring-[#00F2FE] transition-all resize-none font-light leading-relaxed"
                              />
                              {errors.features && (
                                <span className="text-[11px] text-red-400 font-medium">{errors.features.message}</span>
                              )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                              {/* Nombre */}
                              <div className="flex flex-col gap-1.5">
                                <label htmlFor="name" className="text-[10px] font-bold text-neutral-300 uppercase tracking-wider">Tu Nombre</label>
                                <input
                                  id="name"
                                  type="text"
                                  placeholder="Ej: Joaquin"
                                  {...register('name')}
                                  className="bg-neutral-900/40 border border-neutral-800 rounded-xl px-3.5 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#00F2FE] focus:ring-1 focus:ring-[#00F2FE] transition-all font-light"
                                />
                                {errors.name && (
                                  <span className="text-[11px] text-red-400 font-medium">{errors.name.message}</span>
                                )}
                              </div>

                              {/* Email */}
                              <div className="flex flex-col gap-1.5">
                                <label htmlFor="email" className="text-[10px] font-bold text-neutral-300 uppercase tracking-wider">Correo Electrónico</label>
                                <input
                                  id="email"
                                  type="email"
                                  placeholder="Ej: juan@empresa.com"
                                  {...register('email')}
                                  className="bg-neutral-900/40 border border-neutral-800 rounded-xl px-3.5 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#00F2FE] focus:ring-1 focus:ring-[#00F2FE] transition-all font-light"
                                />
                                {errors.email && (
                                  <span className="text-[11px] text-red-400 font-medium">{errors.email.message}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Botonera de Control */}
                    <div className="flex items-center justify-between border-t border-neutral-900/50 pt-5 mt-6 gap-3">
                      {step > 1 ? (
                        <button
                          key="back-btn"
                          type="button"
                          onClick={handlePrevStep}
                          disabled={isSubmitting}
                          className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-white border border-neutral-850 hover:bg-neutral-900/30 transition-all cursor-pointer disabled:opacity-50"
                        >
                          Atrás
                        </button>
                      ) : (
                        <div key="empty-div" />
                      )}

                      {step < 3 ? (
                        <button
                          key="next-btn"
                          type="button"
                          onClick={handleNextStep}
                          className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-neutral-950 bg-white hover:bg-neutral-100 transition-all cursor-pointer"
                        >
                          Siguiente
                        </button>
                      ) : (
                        <button
                          key="submit-btn"
                          type="submit"
                          disabled={isSubmitting}
                          className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#00F2FE] to-[#2F4BC0] hover:shadow-[0_0_20px_rgba(0,242,254,0.4)] disabled:hover:shadow-none transition-all cursor-pointer flex items-center gap-2 disabled:opacity-75"
                        >
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              Abriendo WhatsApp...
                            </>
                          ) : (
                            'Enviar Solicitud'
                          )}
                        </button>
                      )}
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
