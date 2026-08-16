'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import ThreeCanvas from '@/components/ThreeCanvas';
import HeroSection from '@/components/HeroSection';
import StudentBioSection from '@/components/StudentBioSection';
import OlymBrowserPortal from '@/components/OlymBrowserPortal';
import SkillGeneratorPortal from '@/components/SkillGeneratorPortal';
import GitHubProjectsSection from '@/components/GitHubProjectsSection';
import WorksSection from '@/components/WorksSection';
import NextAppInspector from '@/components/NextAppInspector';
import InquireSection from '@/components/InquireSection';

export default function Home() {
  const [securityScanned, setSecurityScanned] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [preselectedService, setPreselectedService] = useState('');
  const [inquireStatus, setInquireStatus] = useState(null);

  const canvasRef = useRef(null);

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
    <div style={{ position: 'relative', minHeight: '100vh', scrollBehavior: 'smooth' }}>
      {/* Three.js 3D Torus Mesh Background */}
      <ThreeCanvas />

      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(9, 9, 11, 0.88)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#fafafa', color: '#09090b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem' }}>
              S
            </div>
            <div>
              <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>Sarvan</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginLeft: '8px' }}>/ Student Developer & AI Systems Architect</span>
            </div>
          </div>

          <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <a href="#bio" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.88rem' }}>Bio</a>
            <Link href="/olym" style={{ color: '#00ff88', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 600 }}>Olym Browser</Link>
            <a href="#skill-generator-tool" style={{ color: '#818cf8', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 600 }}>Skill Studio</a>
            <a href="#github-repos" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.88rem' }}>GitHub Repos</a>
            <Link href="/omniforge" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.88rem' }}>OmniForge App</Link>
            <a href="#inquire" style={{ color: '#fafafa', textDecoration: 'none', fontSize: '0.88rem', fontWeight: 600 }}>Inquire</a>
          </nav>
        </div>
      </header>

      <main style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection />

        <div className="section-divider"></div>

        {/* Student Bio Section */}
        <StudentBioSection />

        <div className="section-divider"></div>

        {/* Olym Browser Companion Portal Section */}
        <OlymBrowserPortal />

        <div className="section-divider"></div>

        {/* AI Skill Studio Portal */}
        <SkillGeneratorPortal />

        <div className="section-divider"></div>

        {/* Open Source GitHub Repositories Section */}
        <GitHubProjectsSection />

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
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Student Developer & Creator of Olym AI Browser</div>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            © 2026 Sarvan. Built with Next.js 15 & React 19.
          </div>
        </div>
      </footer>
    </div>
  );
}
