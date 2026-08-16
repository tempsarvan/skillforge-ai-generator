'use client';

import React, { useEffect, useRef } from 'react';

export default function ThreeCanvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = document.createElement('canvas');
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    let animId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // 3D Geometric Mesh Simulation (Three.js style 3D Torus Knot Projection)
    let rotationX = 0;
    let rotationY = 0;

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Generate 3D Torus Knot Points
    const pointsCount = 180;
    const torusPoints = Array.from({ length: pointsCount }, (_, i) => {
      const u = (i / pointsCount) * Math.PI * 4;
      const p = 2;
      const q = 3;

      const r = 0.5 + 0.3 * Math.cos(q * u);
      const x = r * Math.cos(p * u);
      const y = r * Math.sin(p * u);
      const z = 0.3 * Math.sin(q * u);

      return { x, y, z };
    });

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      rotationX += 0.006;
      rotationY += 0.008;

      const mouseFactorX = (mouseX - width / 2) * 0.0003;
      const mouseFactorY = (mouseY - height / 2) * 0.0003;

      const sinX = Math.sin(rotationX + mouseFactorY);
      const cosX = Math.cos(rotationX + mouseFactorY);
      const sinY = Math.sin(rotationY + mouseFactorX);
      const cosY = Math.cos(rotationY + mouseFactorX);

      const scale = Math.min(width, height) * 0.32;
      const centerX = width / 2;
      const centerY = height / 2;

      // Draw connecting 3D wireframe mesh
      const projected = torusPoints.map(pt => {
        // Rotate Y
        let x1 = pt.x * cosY + pt.z * sinY;
        let y1 = pt.y;
        let z1 = -pt.x * sinY + pt.z * cosY;

        // Rotate X
        let x2 = x1;
        let y2 = y1 * cosX - z1 * sinX;
        let z2 = y1 * sinX + z1 * cosX;

        const depth = (z2 + 1) / 2;
        const px = centerX + x2 * scale;
        const py = centerY + y2 * scale;

        return { px, py, depth };
      });

      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        const p2 = projected[(i + 1) % projected.length];

        const alpha = Math.max(0.08, p1.depth * 0.4);
        ctx.strokeStyle = `rgba(0, 255, 136, ${alpha})`;
        ctx.lineWidth = p1.depth * 1.5 + 0.5;

        ctx.beginPath();
        ctx.moveTo(p1.px, p1.py);
        ctx.lineTo(p2.px, p2.py);
        ctx.stroke();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (container.contains(canvas)) {
        container.removeChild(canvas);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.85
      }}
    />
  );
}
