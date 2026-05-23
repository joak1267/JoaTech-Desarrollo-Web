'use client';

import { useState, useRef, MouseEvent as ReactMouseEvent } from 'react';

/**
 * Hook personalizado para dar un efecto magnético a elementos interactivos.
 * Calcula la posición del cursor respecto al centro del elemento.
 *
 * @param strength El multiplicador de fuerza magnética (0.1 a 0.5 recomendado).
 */
export function useMagnetic(strength: number = 0.35) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: ReactMouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Calcular la posición relativa al centro del botón
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    
    setPosition({ x: x * strength, y: y * strength });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return {
    ref,
    position,
    handleMouseMove,
    handleMouseLeave,
  };
}
