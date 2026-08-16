'use client';

import React, { useEffect, useRef } from 'react';

// JCode-style ASCII density palette (from lowest density to highest density)
const JCODE_ASCII_DENSITY = [' ', '·', '.', ':', '-', '=', '+', '*', '#', '%', '@', '█'];

export default function AsciiBackgroundCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse coordinates with smooth interpolation
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;
    let currentMouseX = width / 2;
    let currentMouseY = height / 2;

    const handleMouseMove = (e) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Scroll position
    let scrollY = window.scrollY;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);

    // JCode ASCII Grid Config
    const fontSize = 13;
    const cellWidth = 11;
    const cellHeight = 16;

    let frame = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      frame++;

      // Smooth mouse interpolation
      currentMouseX += (targetMouseX - currentMouseX) * 0.08;
      currentMouseY += (targetMouseY - currentMouseY) * 0.08;

      const cols = Math.ceil(width / cellWidth) + 2;
      const rows = Math.ceil(height / cellHeight) + 2;

      // Radial mouse spotlight glow in background
      const radGrad = ctx.createRadialGradient(
        currentMouseX, currentMouseY, 0,
        currentMouseX, currentMouseY, 550
      );
      radGrad.addColorStop(0, 'rgba(0, 255, 136, 0.12)');
      radGrad.addColorStop(0.4, 'rgba(99, 102, 241, 0.04)');
      radGrad.addColorStop(1, 'rgba(6, 6, 8, 0.98)');
      ctx.fillStyle = radGrad;
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

      const t = frame * 0.035;

      // Render JCode ASCII Wave Grid
      for (let r = 0; r < rows; r++) {
        const y = r * cellHeight - (scrollY * 0.2);

        for (let c = 0; c < cols; c++) {
          const x = c * cellWidth;

          // JCode Sine/Cosine Fluid Wave Equation
          const v1 = Math.sin(c * 0.09 + t);
          const v2 = Math.cos(r * 0.07 + t * 0.8);
          const v3 = Math.sin((c + r) * 0.05 - t * 0.5);
          
          let wave = (v1 + v2 + v3) / 3; // [-1, 1]

          // Distance to mouse cursor for ripple excitation
          const dx = x - currentMouseX;
          const dy = y - currentMouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 220) {
            const mouseFactor = (1 - dist / 220);
            const ripple = Math.sin(dist * 0.08 - t * 3) * mouseFactor * 0.8;
            wave += ripple;
          }

          // Map normalized wave [-1, 1] -> density index [0, JCODE_ASCII_DENSITY.length - 1]
          const normWave = Math.max(0, Math.min(1, (wave + 1) / 2));
          const charIndex = Math.floor(normWave * (JCODE_ASCII_DENSITY.length - 1));
          const char = JCODE_ASCII_DENSITY[charIndex];

          if (char === ' ') continue;

          let alpha = 0.12 + normWave * 0.28;
          let color = `rgba(255, 255, 255, ${alpha})`;

          // Highlight cells near mouse
          if (dist < 200) {
            const glow = (1 - dist / 200);
            alpha = Math.min(1.0, alpha + glow * 0.6);
            if (charIndex > 7) {
              color = `rgba(0, 255, 136, ${alpha})`; // Electric green highlight
            } else {
              color = `rgba(129, 140, 248, ${alpha})`; // Indigo highlight
            }
          }

          ctx.fillStyle = color;
          ctx.fillText(char, x, y);
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-label="JCode-style Animated ASCII Wave Background Canvas"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.92
      }}
    />
  );
}
