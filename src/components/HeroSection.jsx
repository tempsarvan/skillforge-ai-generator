'use client';

import React from 'react';
import { ArrowUpRight, Cpu, Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <section style={{ paddingTop: '80px', paddingBottom: '60px' }}>
      <div className="container" style={{ maxWidth: '860px' }}>
        <div className="pill mono" style={{ display: 'inline-block', marginBottom: '20px' }}>
          <Sparkles size={14} style={{ display: 'inline', marginRight: '4px' }} />
          Next.js 16 App Router + Server Actions
        </div>

        <h1 className="refractive-heading" style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)', fontWeight: 600, lineHeight: 1.12, marginBottom: '24px' }}>
          Architecting Next.js App Router & <span className="serif-italic">high-throughput compute</span>.
        </h1>

        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '680px', marginBottom: '36px' }}>
          I bridge computer science research, Next.js Server Actions, Edge API routes, WebGPU graphics, and AST security auditing.
        </p>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <a href="#skill-generator-tool" className="btn-clean" style={{ background: '#6366f1', color: '#fff' }}>
            <Sparkles size={16} />
            <span>Launch AI Skill Generator</span>
          </a>
          <a href="#works" className="btn-ghost">
            <span>View Selected Works</span>
            <ArrowUpRight size={16} />
          </a>
          <a href="#next-inspector" className="btn-ghost">
            <Cpu size={16} />
            <span>Next.js Inspector</span>
          </a>
        </div>
      </div>
    </section>
  );
}
