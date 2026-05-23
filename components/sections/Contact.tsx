'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Mail, Send, Hourglass, MapPin, ChevronDown } from 'lucide-react';

// Esquema de validación estricta con Zod en español
const contactSchema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres' }),
  email: z.string().email({ message: 'Ingresa un correo electrónico válido' }),
  projectType: z.enum(['Landing Page', 'E-commerce', 'SaaS', 'Otro'], {
    message: 'Por favor, selecciona un tipo de proyecto',
  }),
  message: z.string().min(10, { message: 'El mensaje debe tener al menos 10 caracteres' }),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Configuración de react-hook-form con el resolver de Zod
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const projectType = watch('projectType');

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // Simulación de llamada a API (1.5 segundos)
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Datos enviados:', data);
      setIsSuccess(true);
      reset();
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } }
  };

  return (
    <section id="contacto" className="relative bg-neutral-950 px-6 py-28 overflow-hidden border-t border-neutral-900 select-none">
      {/* Luces de fondo decorativas (Glow Effects) */}
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[130px] pointer-events-none"
        aria-hidden="true"
      />
      <div 
        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[130px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Bento Grid Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Columna Izquierda: Tarjeta Unificada de Información (Info Unificada - lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col h-full">
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              whileHover={{ y: -4, borderColor: 'rgba(99, 102, 241, 0.25)' }}
              className="relative p-8 rounded-3xl bg-neutral-900/30 border border-neutral-900 backdrop-blur-xl transition-all duration-300 overflow-hidden flex flex-col justify-between h-full gap-8 min-h-[450px]"
            >
              <div className="absolute -right-10 -top-10 w-36 h-36 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />
              <div className="absolute -left-10 -bottom-10 w-44 h-44 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />
              
              {/* Bloque Superior: Título, Email y Ubicación */}
              <div className="space-y-6 relative z-10">
                {/* Título de impacto */}
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-neutral-50">
                  Hablemos de tu{' '}
                  <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-500 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-scroll">
                    próximo proyecto
                  </span>
                </h2>
                
                {/* Sección de email */}
                <div className="space-y-2 pt-4 border-t border-neutral-900/60">
                  <span className="text-[10px] text-neutral-500 tracking-widest font-extrabold block">EMAIL</span>
                  <a 
                    href="mailto:joaquin.apesteguia.tech@gmail.com"
                    className="inline-flex items-center gap-3 py-1 hover:text-sky-400 transition-colors group/link w-fit"
                  >
                    <Mail className="w-4 h-4 text-indigo-400 flex-shrink-0 group-hover/link:text-sky-400 group-hover/link:scale-110 transition-all" />
                    <span className="text-xs sm:text-sm font-semibold text-neutral-200 break-all select-all group-hover/link:text-sky-400 transition-colors">
                      joaquin.apesteguia.tech@gmail.com
                    </span>
                  </a>
                </div>

                {/* Ubicación */}
                <div className="flex items-center gap-3 pt-2">
                  <MapPin className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-neutral-350">
                    CABA, Buenos Aires, Argentina
                  </span>
                </div>
              </div>
              
              {/* Bloque Inferior: Compromiso de Respuesta */}
              <div className="space-y-4 pt-6 border-t border-neutral-900/60 relative z-10">
                {/* Bloque de Tiempo y Reloj integrados orgánicamente sin sub-cajas */}
                <div className="flex items-center gap-2.5">
                  <span className="text-3xl font-black bg-gradient-to-r from-indigo-300 to-purple-400 bg-clip-text text-transparent font-mono tracking-tighter filter drop-shadow-[0_0_15px_rgba(99,102,241,0.25)]">
                    24h
                  </span>
                  
                  {/* Reloj de arena animado */}
                  <motion.div
                    animate={{ rotate: [0, 180, 180] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: 'loop',
                      ease: 'easeInOut',
                      times: [0, 0.5, 1]
                    }}
                    className="text-purple-400 flex items-center justify-center"
                  >
                    <Hourglass className="w-5 h-5" />
                  </motion.div>
                </div>
                
                <div className="space-y-1.5">
                  <h3 className="text-[10px] font-extrabold text-neutral-300 uppercase tracking-widest leading-relaxed">
                    COMPROMISO DE RESPUESTA RÁPIDO
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
                    Garantizamos un feedback ágil, directo y personalizado. Tu consulta será analizada y respondida a la brevedad.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Columna Derecha: Tarjeta del Formulario (Formulario Bento - lg:col-span-7) */}
          <div className="lg:col-span-7 h-full">
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              whileHover={{ y: -4, borderColor: 'rgba(99, 102, 241, 0.25)' }}
              className="relative h-full p-8 rounded-3xl bg-neutral-900/40 border border-neutral-900 backdrop-blur-xl transition-all duration-300 shadow-[0_0_50px_rgba(99,102,241,0.03)] overflow-hidden flex flex-col justify-center min-h-[500px]"
            >
              <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />
              
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  /* Formulario de Entrada */
                  <motion.form
                    key="contact-form"
                    onSubmit={handleSubmit(onSubmit)}
                    initial={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
                    className="space-y-6"
                  >
                    {/* Campo Nombre */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs sm:text-sm font-semibold text-neutral-300 flex items-center gap-1.5">
                        Nombre completo <span className="text-indigo-400">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        disabled={isSubmitting}
                        placeholder="Ej. Joaquin Peralta"
                        {...register('name')}
                        className={`w-full px-4 py-3.5 rounded-xl bg-neutral-950/70 border ${
                          errors.name 
                            ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/20' 
                            : 'border-neutral-800/80 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30'
                        } text-neutral-100 placeholder-neutral-600 focus:outline-none transition-all duration-200 text-sm focus:shadow-[0_0_15px_rgba(99,102,241,0.15)]`}
                      />
                      {errors.name && (
                        <motion.p 
                          initial={{ opacity: 0, y: -5 }} 
                          animate={{ opacity: 1, y: 0 }} 
                          className="text-xs text-red-400 font-medium pl-1 mt-1"
                        >
                          {errors.name.message}
                        </motion.p>
                      )}
                    </div>

                    {/* Campo Email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs sm:text-sm font-semibold text-neutral-300 flex items-center gap-1.5">
                        Correo electrónico <span className="text-indigo-400">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        disabled={isSubmitting}
                        placeholder="tuemail@ejemplo.com"
                        {...register('email')}
                        className={`w-full px-4 py-3.5 rounded-xl bg-neutral-950/70 border ${
                          errors.email 
                            ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/20' 
                            : 'border-neutral-800/80 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30'
                        } text-neutral-100 placeholder-neutral-600 focus:outline-none transition-all duration-200 text-sm focus:shadow-[0_0_15px_rgba(99,102,241,0.15)]`}
                      />
                      {errors.email && (
                        <motion.p 
                          initial={{ opacity: 0, y: -5 }} 
                          animate={{ opacity: 1, y: 0 }} 
                          className="text-xs text-red-400 font-medium pl-1 mt-1"
                        >
                          {errors.email.message}
                        </motion.p>
                      )}
                    </div>

                    {/* Selector de Tipo de Proyecto */}
                    <div className="space-y-2">
                      <label className="text-xs sm:text-sm font-semibold text-neutral-300 flex items-center gap-1.5">
                        Tipo de proyecto <span className="text-indigo-400">*</span>
                      </label>
                      
                      <input type="hidden" {...register('projectType')} />

                      <div className="relative">
                        <button
                          type="button"
                          id="projectType-btn"
                          disabled={isSubmitting}
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl bg-neutral-900/60 border ${
                            errors.projectType 
                              ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/20' 
                              : 'border-neutral-800/80 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30'
                          } text-neutral-100 focus:outline-none transition-all duration-200 text-sm cursor-pointer focus:shadow-[0_0_15px_rgba(99,102,241,0.15)]`}
                        >
                          <span className={projectType ? 'text-neutral-100 font-medium' : 'text-neutral-500'}>
                            {projectType || 'Selecciona una opción'}
                          </span>
                          <motion.div
                            animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                            transition={{ duration: 0.2, ease: 'easeInOut' }}
                            className="text-neutral-500"
                          >
                            <ChevronDown className="w-4 h-4" />
                          </motion.div>
                        </button>

                        {/* Menú Desplegable (Popover Options) */}
                        <AnimatePresence>
                          {isDropdownOpen && (
                            <>
                              {/* Backdrop invisible para cerrar al hacer clic afuera */}
                              <div 
                                className="fixed inset-0 z-40 cursor-default" 
                                onClick={() => setIsDropdownOpen(false)}
                              />
                              <motion.ul
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                transition={{ duration: 0.15, ease: 'easeOut' }}
                                className="absolute z-50 w-full mt-2 rounded-xl bg-neutral-950/95 border border-neutral-800 backdrop-blur-md shadow-2xl overflow-hidden py-1.5"
                              >
                                {['Landing Page', 'E-commerce', 'SaaS', 'Otro'].map((option) => (
                                  <li key={option}>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setValue('projectType', option as any, { shouldValidate: true });
                                        setIsDropdownOpen(false);
                                      }}
                                      className={`w-full text-left px-4 py-3 text-sm transition-colors duration-150 cursor-pointer ${
                                        projectType === option
                                          ? 'bg-indigo-600/15 text-indigo-400 font-semibold'
                                          : 'text-neutral-300 hover:bg-indigo-600/10 hover:text-white'
                                      }`}
                                    >
                                      {option}
                                    </button>
                                  </li>
                                ))}
                              </motion.ul>
                            </>
                          )}
                        </AnimatePresence>
                      </div>
                      {errors.projectType && (
                        <motion.p 
                          initial={{ opacity: 0, y: -5 }} 
                          animate={{ opacity: 1, y: 0 }} 
                          className="text-xs text-red-400 font-medium pl-1 mt-1"
                        >
                          {errors.projectType.message}
                        </motion.p>
                      )}
                    </div>

                    {/* Campo Mensaje */}
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-xs sm:text-sm font-semibold text-neutral-300 flex items-center gap-1.5">
                        Detalles del proyecto <span className="text-indigo-400">*</span>
                      </label>
                      <textarea
                        id="message"
                        disabled={isSubmitting}
                        rows={4}
                        placeholder="Cuéntanos un poco sobre tu idea, objetivos y plazos estimados..."
                        {...register('message')}
                        className={`w-full px-4 py-3.5 rounded-xl bg-neutral-950/70 border ${
                          errors.message 
                            ? 'border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500/20' 
                            : 'border-neutral-800/80 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30'
                        } text-neutral-100 placeholder-neutral-600 focus:outline-none transition-all duration-200 text-sm resize-none focus:shadow-[0_0_15px_rgba(99,102,241,0.15)]`}
                      />
                      {errors.message && (
                        <motion.p 
                          initial={{ opacity: 0, y: -5 }} 
                          animate={{ opacity: 1, y: 0 }} 
                          className="text-xs text-red-400 font-medium pl-1 mt-1"
                        >
                          {errors.message.message}
                        </motion.p>
                      )}
                    </div>

                    {/* Botón de Envío */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-600 hover:from-indigo-600 hover:via-violet-600 hover:to-purple-700 text-white font-semibold text-sm sm:text-base tracking-wide transition-all shadow-md shadow-indigo-500/10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Procesando consulta...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Enviar mensaje
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                ) : (
                  /* Mensaje de Éxito */
                  <motion.div
                    key="success-message"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 120, damping: 15 }}
                    className="flex flex-col justify-center items-center text-center space-y-6 py-10"
                  >
                    {/* Checkmark SVG animado */}
                    <div className="h-16 w-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                      <motion.svg
                        className="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <motion.path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </motion.svg>
                    </div>

                    <div className="space-y-2 max-w-sm">
                      <h3 className="text-2xl font-bold text-neutral-100">
                        ¡Mensaje Enviado!
                      </h3>
                      <p className="text-sm text-neutral-400 leading-relaxed font-light">
                        Tu consulta se procesó correctamente. Nos pondremos en contacto contigo a la brevedad. ¡Gracias por confiar en nosotros!
                      </p>
                    </div>

                    <motion.button
                      onClick={() => setIsSuccess(false)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors text-xs font-semibold cursor-pointer"
                    >
                      Enviar otro mensaje
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
