'use client';

import React, { useEffect, useRef } from 'react';

interface FloatingLinesProps {
  lineCount?: number;
  animationSpeed?: number;
  enableTop?: boolean;
  enableMiddle?: boolean;
  enableBottom?: boolean;
  colors?: string[];
  bendRadius?: number;
  bendStrength?: number;
  mouseDamping?: number;
  parallaxStrength?: number;
}

export default function FloatingLines({
  lineCount = 6,
  animationSpeed = 1.5,
  enableTop = true,
  enableMiddle = true,
  enableBottom = true,
  colors = ['#E945F5', '#2F4BC0', '#E945F5'],
  bendRadius = 5,         // Radius parameter for Gaussian influence
  bendStrength = -0.8,     // Repelling elastic strength
  mouseDamping = 0.06,    // Damping coefficient for cursor interpolation
  parallaxStrength = 0.2,   // Parallax multiplier
}: FloatingLinesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const targetMouseRef = useRef({ x: 0, y: 0 });
  const currentMouseRef = useRef({ x: 0, y: 0 });
  const hasMovedRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    // Hex to RGB parser helper
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 233, g: 69, b: 245 }; // Default to #E945F5
    };

    // Interpolates between hex colors based on factor (0 to 1)
    const interpolateColor = (color1: string, color2: string, factor: number) => {
      const rgb1 = hexToRgb(color1);
      const rgb2 = hexToRgb(color2);
      const r = Math.round(rgb1.r + (rgb2.r - rgb1.r) * factor);
      const g = Math.round(rgb1.g + (rgb2.g - rgb1.g) * factor);
      const b = Math.round(rgb1.b + (rgb2.b - rgb1.b) * factor);
      return `${r}, ${g}, ${b}`;
    };

    // Gets line RGB color interpolated along the color array
    const getLineRGB = (factor: number) => {
      if (colors.length < 2) return '233, 69, 245';
      if (colors.length === 2) {
        return interpolateColor(colors[0], colors[1], factor);
      }
      if (factor < 0.5) {
        return interpolateColor(colors[0], colors[1], factor * 2);
      } else {
        return interpolateColor(colors[1], colors[2], (factor - 0.5) * 2);
      }
    };

    const resizeCanvas = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      if (!hasMovedRef.current) {
        const initX = rect.width / 2;
        const initY = rect.height / 2;
        targetMouseRef.current = { x: initX, y: initY };
        currentMouseRef.current = { x: initX, y: initY };
      }
    };

    resizeCanvas();

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      hasMovedRef.current = true;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const drawWave = (
      baseY: number,
      lineIndex: number,
      totalLines: number,
      amplitude: number,
      frequency: number,
      time: number
    ) => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Independent initial phase and configuration for interwoven lines
      const phaseOffset = lineIndex * (Math.PI / totalLines) * 2.2;
      const lineFreq = frequency * (0.85 + (lineIndex % 3) * 0.15);
      const lineAmp = amplitude * (0.75 + (lineIndex % 2) * 0.35);
      const speedFactor = 0.9 + (lineIndex % 4) * 0.08;

      const t = totalLines > 1 ? lineIndex / (totalLines - 1) : 0.5;
      const rgb = getLineRGB(t);

      // Line thickness styling (3px to 5px)
      const lineWidth = 3.0 + (lineIndex / totalLines) * 2.0;
      ctx.lineWidth = lineWidth;

      // Glow and Blend Mode Settings
      ctx.shadowBlur = 25;
      ctx.shadowColor = '#E945F5';
      ctx.globalCompositeOperation = 'screen';

      ctx.beginPath();
      
      const mouse = currentMouseRef.current;
      const centerX = width / 2;
      const centerY = height / 2;

      // Parallax calculations (shift wave baseline coordinates)
      const parallaxOffsetX = ((mouse.x - centerX) / centerX) * parallaxStrength * 80;
      const parallaxOffsetY = ((mouse.y - centerY) / centerY) * parallaxStrength * 40;

      // Calculate control points for Catmull-Rom spline interpolation
      const pointsCount = 7;
      const step = width / (pointsCount - 1);
      const pts: { x: number; y: number }[] = [];

      // Generate points from index -1 to pointsCount (virtual bounds included)
      for (let i = -1; i <= pointsCount; i++) {
        const x = i * step;
        const shiftedX = x + parallaxOffsetX;

        // Vector calculations for hover physics
        const dx = x - mouse.x;
        const dy = baseY - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Convert bendRadius parameter to pixel scale (e.g. 5 -> 250px)
        const pixelRadius = bendRadius * 50;
        const influence = Math.exp(-(dist * dist) / (2 * pixelRadius * pixelRadius));

        // Physics: Elastic hover alters local amplitude & frequency (creating sinuous whip distortion)
        const localAmplitude = lineAmp * (1.0 + influence * bendStrength * 0.9);
        const localPhase = phaseOffset + (dx / 90) * influence * 3.0;

        // Dynamic time-based wave formula
        const angle = shiftedX * lineFreq + time * speedFactor + localPhase;
        let y = (baseY + parallaxOffsetY) + Math.sin(angle) * localAmplitude;

        // Secondary organic wave multiplier
        y += Math.cos(shiftedX * (lineFreq * 0.35) - time * 0.65 * speedFactor + phaseOffset) * (lineAmp * 0.28);

        // Vertical physical repulsing displacement
        y += (mouse.y - y) * influence * bendStrength * 0.45;

        pts.push({ x, y });
      }

      // Draw interwoven cubic Bezier segments using Catmull-Rom control points
      ctx.moveTo(pts[1].x, pts[1].y);
      for (let idx = 1; idx < pts.length - 2; idx++) {
        const p0 = pts[idx - 1];
        const p1 = pts[idx];
        const p2 = pts[idx + 1];
        const p3 = pts[idx + 2];

        // Direct Bezier control points for smooth C1 boundary transition
        const cp1_x = p1.x + step / 3;
        const cp1_y = p1.y + (p2.y - p0.y) / 6;

        const cp2_x = p2.x - step / 3;
        const cp2_y = p2.y - (p3.y - p1.y) / 6;

        ctx.bezierCurveTo(cp1_x, cp1_y, cp2_x, cp2_y, p2.x, p2.y);
      }

      ctx.strokeStyle = `rgba(${rgb}, ${0.4 - (lineIndex * 0.025)})`;
      ctx.stroke();
    };

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      
      // Dynamic temporal calculation based on performance clock and user-defined speed
      const time = performance.now() * 0.001 * animationSpeed;

      // Mouse damping interpolation (0.06)
      const mouse = currentMouseRef.current;
      const target = targetMouseRef.current;
      mouse.x += (target.x - mouse.x) * mouseDamping;
      mouse.y += (target.y - mouse.y) * mouseDamping;

      ctx.clearRect(0, 0, rect.width, rect.height);

      if (enableTop) {
        const baseY = rect.height * 0.22;
        for (let i = 0; i < lineCount; i++) {
          drawWave(baseY, i, lineCount, 38, 0.0022, time);
        }
      }

      if (enableMiddle) {
        const baseY = rect.height * 0.5;
        for (let i = 0; i < lineCount; i++) {
          drawWave(baseY, i, lineCount, 52, 0.0016, time);
        }
      }

      if (enableBottom) {
        const baseY = rect.height * 0.78;
        for (let i = 0; i < lineCount; i++) {
          drawWave(baseY, i, lineCount, 32, 0.0028, time);
        }
      }

      // Reset composite operation to avoid affecting other components
      ctx.globalCompositeOperation = 'source-over';
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [lineCount, animationSpeed, enableTop, enableMiddle, enableBottom, colors, bendRadius, bendStrength, mouseDamping, parallaxStrength]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full block blur-[1px] brightness-125 pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
