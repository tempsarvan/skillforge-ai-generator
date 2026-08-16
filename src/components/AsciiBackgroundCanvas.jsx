'use client';

import React, { useEffect, useRef } from 'react';

const ASCII_GLYPHS = ['λ', 'Σ', 'Δ', 'W', 'η', 'σ', 'α', 'β', 'γ', '0', '1', '@', '#', '$', '%', '*', '+', '=', '~', '!', '░', '▒', '▓', '█', '✦', '⚡', '►'];

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

    // Mouse coordinates with smooth liquid inertia easing
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

    // Grid settings for Wall-to-Wall Dense ASCII Background
    const fontSize = 14;
    const fontWidth = 10;
    const fontHeight = 16;
    
    // 3D Spinning ASCII Cube state
    let cubeAngleA = 0;
    let cubeAngleB = 0;

    // Stream drops for digital rain columns
    const columns = Math.ceil(width / fontWidth) + 10;
    const rows = Math.ceil(height / fontHeight) + 10;
    const drops = Array.from({ length: columns }, () => Math.floor(Math.random() * -50));

    // Persistent ASCII matrix grid
    const asciiGrid = Array.from({ length: rows }, () =>
      Array.from({ length: columns }, () => ({
        char: ASCII_GLYPHS[Math.floor(Math.random() * ASCII_GLYPHS.length)],
        flipTimer: Math.floor(Math.random() * 100),
        depth: Math.random() * 0.3 + 0.05
      }))
    );

    let frameCount = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      frameCount++;
      cubeAngleA += 0.02;
      cubeAngleB += 0.015;

      // Interpolate mouse movement
      currentMouseX += (targetMouseX - currentMouseX) * 0.08;
      currentMouseY += (targetMouseY - currentMouseY) * 0.08;

      const mouseOffsetX = (currentMouseX - width / 2) * 0.08;
      const mouseOffsetY = (currentMouseY - height / 2) * 0.08;

      // Radial mouse spotlight background
      const radGrad = ctx.createRadialGradient(
        currentMouseX, currentMouseY, 0,
        currentMouseX, currentMouseY, 700
      );
      radGrad.addColorStop(0, 'rgba(0, 255, 136, 0.14)');
      radGrad.addColorStop(0.4, 'rgba(99, 102, 241, 0.06)');
      radGrad.addColorStop(1, 'rgba(4, 4, 6, 0.95)');
      ctx.fillStyle = radGrad;
      ctx.fillRect(0, 0, width, height);

      // --- DENSE ANIMATED ASCII MATRIX GRID ---
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
          const cell = asciiGrid[r][c];

          // Character flip animation
          cell.flipTimer++;
          if (cell.flipTimer > 120) {
            cell.char = ASCII_GLYPHS[Math.floor(Math.random() * ASCII_GLYPHS.length)];
            cell.flipTimer = 0;
          }

          // Compute position with 3D Parallax & Scroll
          const x = c * fontWidth + mouseOffsetX * cell.depth;
          const y = (r * fontHeight - (scrollY * 0.25)) + mouseOffsetY * cell.depth;

          // Wrap scroll bounds
          const wrappedY = ((y % height) + height) % height;

          // Distance to cursor spotlight
          const dx = x - currentMouseX;
          const dy = wrappedY - currentMouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let alpha = 0.18;
          let color = `rgba(255, 255, 255, ${alpha})`;

          if (dist < 260) {
            const glow = (1 - dist / 260);
            alpha = 0.2 + glow * 0.75;
            color = `rgba(0, 255, 136, ${alpha})`; // Electric green highlight
          } else if (dist < 450) {
            const glow = (1 - dist / 450);
            alpha = 0.18 + glow * 0.4;
            color = `rgba(129, 140, 248, ${alpha})`; // Indigo highlight
          }

          // Digital Rain stream drops highlight
          if (drops[c] === r) {
            color = '#ffffff';
            ctx.shadowColor = '#00ff88';
            ctx.shadowBlur = 8;
          } else {
            ctx.shadowBlur = 0;
          }

          ctx.fillStyle = color;
          ctx.fillText(cell.char, x, wrappedY);
        }
      }

      // Update Digital Rain columns
      for (let i = 0; i < drops.length; i++) {
        if (frameCount % 3 === 0) {
          drops[i]++;
          if (drops[i] * fontHeight > height && Math.random() > 0.95) {
            drops[i] = 0;
          }
        }
      }

      // --- 3D SPINNING ASCII CUBE IN BACKGROUND ---
      const cubeWidth = 8;
      const distanceFromCam = 22;
      const K1 = 18;
      const cx = width * 0.75 + mouseOffsetX * 0.2;
      const cy = height * 0.4 + mouseOffsetY * 0.2;

      const sinA = Math.sin(cubeAngleA), cosA = Math.cos(cubeAngleA);
      const sinB = Math.sin(cubeAngleB), cosB = Math.cos(cubeAngleB);

      ctx.fillStyle = 'rgba(0, 255, 136, 0.4)';
      ctx.font = '12px "JetBrains Mono", monospace';

      for (let x = -cubeWidth; x < cubeWidth; x += 1.8) {
        for (let y = -cubeWidth; y < cubeWidth; y += 1.8) {
          // Rotate points in 3D
          const rx = x * cosB - y * sinB;
          const ry = x * sinB + y * cosB;
          const rz = cubeWidth;

          const ry2 = ry * cosA - rz * sinA;
          const rz2 = ry * sinA + rz * cosA;

          const ooz = 1 / (rz2 + distanceFromCam);
          const px = Math.floor(cx + K1 * ooz * rx * 1.8);
          const py = Math.floor(cy + K1 * ooz * ry2);

          ctx.fillText('#', px, py);
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
      aria-label="Full-screen Animated ASCII Matrix Background Canvas"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.95
      }}
    />
  );
}
