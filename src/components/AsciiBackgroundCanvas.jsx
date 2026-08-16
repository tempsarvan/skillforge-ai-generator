'use client';

import React, { useEffect, useRef } from 'react';

const INFINITY_ASCII_CHARS = ['∞', '8', 'λ', 'Σ', 'Δ', 'W', 'η', 'σ', '@', '#', '$', '%', '*', '+', '⚡', '✦'];

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

    // Mouse coordinates
    let mouseX = width / 2;
    let mouseY = height / 2;
    let isMouseActive = false;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseActive = true;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Scroll position
    let scrollY = window.scrollY;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll);

    // --- 3D SPINNING ASCII INFINITY SYMBOL PHYSICS NODES ---
    const nodeCount = 220; // Number of points along the lemniscate curve
    const scale = Math.min(width, height) * 0.38; // Size of the infinity symbol

    const nodes = Array.from({ length: nodeCount }, (_, i) => {
      const t = (i / nodeCount) * Math.PI * 2;
      return {
        t,
        x: width / 2,
        y: height / 2,
        vx: 0,
        vy: 0,
        char: INFINITY_ASCII_CHARS[i % INFINITY_ASCII_CHARS.length],
        flipTimer: Math.floor(Math.random() * 100),
        collided: false
      };
    });

    let angleX = 0;
    let angleY = 0;
    let angleZ = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Continuous 3D rotation angles
      angleX += 0.008;
      angleY += 0.012;
      angleZ += 0.005;

      const centerX = width / 2;
      const centerY = height / 2;

      // Radial mouse spotlight background
      const radGrad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 600);
      radGrad.addColorStop(0, 'rgba(0, 255, 136, 0.12)');
      radGrad.addColorStop(0.4, 'rgba(99, 102, 241, 0.04)');
      radGrad.addColorStop(1, 'rgba(4, 4, 6, 0.96)');
      ctx.fillStyle = radGrad;
      ctx.fillRect(0, 0, width, height);

      const sinX = Math.sin(angleX), cosX = Math.cos(angleX);
      const sinY = Math.sin(angleY), cosY = Math.cos(angleY);
      const sinZ = Math.sin(angleZ), cosZ = Math.cos(angleZ);

      // --- CALCULATE 3D LEMNISCATE (INFINITY ∞) GEOMETRY ---
      const renderedNodes = nodes.map(node => {
        const t = node.t;
        const denom = 1 + Math.sin(t) * Math.sin(t);
        
        // Base 3D Lemniscate of Bernoulli equations
        let x0 = (scale * Math.cos(t)) / denom;
        let y0 = (scale * Math.sin(t) * Math.cos(t)) / denom;
        let z0 = (scale * 0.4 * Math.sin(2 * t));

        // 3D Rotation Matrix (Yaw, Pitch, Roll)
        // Rotate Y
        let x1 = x0 * cosY + z0 * sinY;
        let y1 = y0;
        let z1 = -x0 * sinY + z0 * cosY;

        // Rotate X
        let x2 = x1;
        let y2 = y1 * cosX - z1 * sinX;
        let z2 = y1 * sinX + z1 * cosX;

        // Rotate Z
        let x3 = x2 * cosZ - y2 * sinZ;
        let y3 = x2 * sinZ + y2 * cosZ;
        let z3 = z2;

        // Target Home Position on Screen
        const targetX = centerX + x3;
        const targetY = (centerY + y3) - (scrollY * 0.25);
        const depthFactor = (z3 + scale) / (scale * 2); // 0 (far) -> 1 (near)

        // --- CURSOR COLLISION PHYSICS ENGINE ---
        const dx = node.x - mouseX;
        const dy = node.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const collisionRadius = 150; // Threshold radius for collision

        let isColliding = false;

        if (dist < collisionRadius && dist > 0) {
          isColliding = true;
          const force = (collisionRadius - dist) / collisionRadius;
          const angle = Math.atan2(dy, dx);
          
          // Impulse repulsion away from cursor
          node.vx += Math.cos(angle) * force * 6.5;
          node.vy += Math.sin(angle) * force * 6.5;
        }

        // Spring restoration force back to target 3D infinity curve position
        const springK = 0.14;
        const damping = 0.80;

        node.vx += (targetX - node.x) * springK;
        node.vy += (targetY - node.y) * springK;

        node.vx *= damping;
        node.vy *= damping;

        node.x += node.vx;
        node.y += node.vy;

        // Character flip animation
        node.flipTimer++;
        if (node.flipTimer > 90) {
          node.char = INFINITY_ASCII_CHARS[Math.floor(Math.random() * INFINITY_ASCII_CHARS.length)];
          node.flipTimer = 0;
        }

        return {
          ...node,
          depthFactor,
          isColliding,
          speed: Math.sqrt(node.vx * node.vx + node.vy * node.vy)
        };
      });

      // --- DRAW CONNECTING ASCII NEURAL RIBBON LINES ---
      for (let i = 0; i < renderedNodes.length; i++) {
        const p1 = renderedNodes[i];
        const p2 = renderedNodes[(i + 1) % renderedNodes.length];

        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 80) {
          const alpha = (1 - dist / 80) * 0.35 * p1.depthFactor;
          ctx.strokeStyle = p1.isColliding || p2.isColliding
            ? `rgba(0, 255, 136, ${alpha * 1.5})`
            : `rgba(99, 102, 241, ${alpha})`;
          ctx.lineWidth = p1.depthFactor * 1.8 + 0.5;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }

      // --- DRAW 3D ASCII INFINITY GLYPHS ---
      renderedNodes.forEach(node => {
        const fontSize = Math.floor(node.depthFactor * 12 + 12); // Dynamic font size based on Z-depth
        ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

        let alpha = Math.max(0.2, node.depthFactor * 0.85);
        let color = `rgba(255, 255, 255, ${alpha})`;

        // Collision ignition glow
        if (node.isColliding || node.speed > 2.0) {
          color = '#00ff88'; // Electric green ignition on collision
          ctx.shadowColor = '#00ff88';
          ctx.shadowBlur = 12;
        } else if (node.depthFactor > 0.6) {
          color = `rgba(129, 140, 248, ${alpha})`; // Indigo glow for front curve
          ctx.shadowBlur = 0;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fillStyle = color;
        ctx.fillText(node.char, node.x, node.y);
      });

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
      aria-label="Full-screen Spinning 3D ASCII Infinity Symbol Background with Cursor Collision Physics"
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
