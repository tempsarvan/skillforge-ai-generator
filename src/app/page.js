'use client';

import React, { useState, useEffect, useRef } from 'react';
import NextAppInspector from '@/components/NextAppInspector';
import SkillGenerator from '@/components/SkillGenerator';
import HeroSection from '@/components/HeroSection';
import WorksSection from '@/components/WorksSection';
import InquireSection from '@/components/InquireSection';

export default function Home() {
  const [securityScanned, setSecurityScanned] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [preselectedService, setPreselectedService] = useState('');
  const [inquireStatus, setInquireStatus] = useState(null);

  const canvasRef = useRef(null);
  const bgCanvasRef = useRef(null);

  // Background particle mesh
  useEffect(() => {
    const canvas = bgCanvasRef.current;
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

    const nodes = Array.from({ length: 30 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.5 + 0.5
    }));

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const grad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 400);
      grad.addColorStop(0, 'rgba(99, 102, 241, 0.05)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.07 * (1 - dist / 110)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // WebGPU Card Particle simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const width = canvas.width = canvas.parentElement.clientWidth || 400;
    const height = canvas.height = 180;

    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: Math.random() * 2 + 1
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 60) {
            ctx.strokeStyle = `rgba(250, 250, 250, ${0.2 * (1 - dist / 60)})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.fillStyle = '#fafafa';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleScanClick = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setSecurityScanned(true);
    }, 600);
  };

  const handleInquireSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const name = form.name.value;
    const details = form.details.value;

    try {
      const res = await fetch('/api/inquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, details, services: [preselectedService || 'Next.js App Router'] })
      });
      const data = await res.json();
      setInquireStatus(data);
    } catch (err) {
      setInquireStatus({ success: false, message: 'Submission error' });
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <canvas ref={bgCanvasRef} aria-label="Interactive particle background animation canvas" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }} />

      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(9, 9, 11, 0.88)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#fafafa', color: '#09090b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem' }}>
              S
            </div>
            <div>
              <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>Sarvan</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginLeft: '8px' }}>/ Next.js Architect</span>
            </div>
          </div>

          <nav style={{ display: 'flex', gap: '24px' }}>
            <a href="#skill-generator-tool" style={{ color: '#818cf8', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 600 }}>AI Skill Generator</a>
            <a href="#works" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.88rem' }}>Work</a>
            <a href="#next-inspector" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.88rem' }}>Next.js Inspector</a>
            <a href="#inquire" style={{ color: '#fafafa', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 600 }}>Inquire</a>
          </nav>
        </div>
      </header>

      <main style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection />

        <div className="section-divider"></div>

        <SkillGenerator />

        <div className="section-divider"></div>

        <WorksSection
          canvasRef={canvasRef}
          securityScanned={securityScanned}
          isScanning={isScanning}
          handleScanClick={handleScanClick}
        />

        <div className="section-divider"></div>

        <NextAppInspector />

        <div className="section-divider"></div>

        <InquireSection
          inquireStatus={inquireStatus}
          handleInquireSubmit={handleInquireSubmit}
        />
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '40px 0', background: 'var(--bg-main)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: '1rem' }}>Sarvan</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Next.js 15 App Router Architecture</div>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            © 2026 Sarvan. Built with Next.js & React 19.
          </div>
        </div>
      </footer>
    </div>
  );
}
