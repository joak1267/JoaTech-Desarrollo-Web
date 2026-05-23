export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  type: 'landing' | 'ecommerce' | 'webapp';
  budgetRangeId: 'landing_low' | 'landing_high' | 'ecommerce_low' | 'ecommerce_high' | 'webapp_low' | 'webapp_high';
  budgetText: string;
  contactUrl: string;
  demoUrl: string;
}

export const projectsData: Project[] = [
  {
    id: '1',
    title: 'Landing Page Ultra-Rápida de Conversión',
    description: 'Sitio web corporativo de una sola página optimizado para velocidad de carga crítica y captación de leads. Estructura responsive, integración de analíticas de marketing y SEO técnico impecable.',
    tags: ['React', 'Tailwind CSS v4', 'Framer Motion', 'SEO Optimizador'],
    type: 'landing',
    budgetRangeId: 'landing_low',
    budgetText: '$150 - $200 USD',
    contactUrl: 'mailto:soyto.joaquin2206@gmail.com?subject=Consulta%20sobre%20Landing%20Page%20Ultra-R%C3%A1pida',
    demoUrl: 'https://speed-landing.joatech.com'
  },
  {
    id: '2',
    title: 'Landing Page Premium con Experiencia 3D/WebGL',
    description: 'Landing page interactiva de alto impacto visual con shaders personalizados de WebGL, animaciones cinemáticas y experiencias inmersivas 3D que elevan la presencia digital de cualquier marca.',
    tags: ['Three.js', 'Next.js', 'WebGL', 'Framer Motion', 'TypeScript'],
    type: 'landing',
    budgetRangeId: 'landing_high',
    budgetText: '$200 - $400 USD',
    contactUrl: 'mailto:soyto.joaquin2206@gmail.com?subject=Consulta%20sobre%20Landing%20Page%20Premium%203D',
    demoUrl: 'https://3d-webgl.joatech.com'
  },
  {
    id: '3',
    title: 'E-Commerce Express y Autogestionable',
    description: 'Tienda en línea de alto rendimiento diseñada para una puesta en marcha rápida. Incluye catálogo dinámico de productos, carrito de compras persistente en navegador y checkout directo a WhatsApp de ventas.',
    tags: ['Next.js', 'Tailwind CSS v4', 'WhatsApp Checkout', 'Framer Motion'],
    type: 'ecommerce',
    budgetRangeId: 'ecommerce_low',
    budgetText: '$350 - $400 USD',
    contactUrl: 'mailto:soyto.joaquin2206@gmail.com?subject=Consulta%20sobre%20E-Commerce%20Express',
    demoUrl: 'https://express-shop.joatech.com'
  },
  {
    id: '4',
    title: 'Plataforma E-Commerce Corporativa Completa',
    description: 'Tienda virtual robusta con pasarelas de pago automáticas integradas (MercadoPago/Stripe). Cuenta con panel de control de inventario, procesamiento de facturas y control de estados de orden de compra.',
    tags: ['Next.js', 'PostgreSQL', 'Stripe', 'Zod', 'Dashboard Admin'],
    type: 'ecommerce',
    budgetRangeId: 'ecommerce_high',
    budgetText: '$400 - $800 USD',
    contactUrl: 'mailto:soyto.joaquin2206@gmail.com?subject=Consulta%20sobre%20E-Commerce%20Corporativo',
    demoUrl: 'https://corp-commerce.joatech.com'
  },
  {
    id: '5',
    title: 'Sistema de Turnos y Gestión de Clientes',
    description: 'Aplicación web interactiva para la administración y reserva automática de citas en tiempo real. Cuenta con envío de correos automatizados, control de horarios y un panel intuitivo para el prestador.',
    tags: ['React', 'Supabase', 'Tailwind CSS v4', 'Zod', 'Email Automations'],
    type: 'webapp',
    budgetRangeId: 'webapp_low',
    budgetText: '$500 - $700 USD',
    contactUrl: 'mailto:soyto.joaquin2206@gmail.com?subject=Consulta%20sobre%20Sistema%20de%20Turnos',
    demoUrl: 'https://scheduler.joatech.com'
  },
  {
    id: '6',
    title: 'Plataforma SaaS & Dashboard de Métricas',
    description: 'Panel interactivo multiusuario de analítica avanzada y control de métricas. Soporta gestión de roles de acceso, generación de reportes personalizables en PDF, gráficos dinámicos y cobro recurrente.',
    tags: ['Next.js', 'Recharts', 'Prisma', 'Stripe Subscriptions', 'TypeScript'],
    type: 'webapp',
    budgetRangeId: 'webapp_high',
    budgetText: '$700 - $1200 USD',
    contactUrl: 'mailto:soyto.joaquin2206@gmail.com?subject=Consulta%20sobre%20Plataforma%20SaaS',
    demoUrl: 'https://saas-dashboard.joatech.com'
  }
];
