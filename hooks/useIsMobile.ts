import { useState, useEffect } from 'react';

/**
 * Hook to detect if the current device is a mobile device, a tablet, 
 * or a low-end performance machine where intensive WebGL shaders should be disabled.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      if (typeof window === 'undefined') return;

      const isMobileBreakpoint = window.innerWidth < 768;
      const isMobileUA = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      
      // Check for low-end hardware (less than 4 CPU cores) combined with touch support
      const isLowHardware = navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency < 4;
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isLowPerfDevice = isLowHardware && isTouchDevice;

      setIsMobile(isMobileBreakpoint || isMobileUA || isLowPerfDevice);
    };

    // Run check initially
    checkDevice();

    // Listen to window resizing to dynamically update layout if needed
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return isMobile;
}
