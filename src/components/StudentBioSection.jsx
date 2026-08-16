'use client';

import React from 'react';
import { Sparkles, Code2, Cpu, Terminal, BookOpen, Rocket, Award, CheckCircle2, Shield, Zap } from 'lucide-react';

export default function StudentBioSection() {
  return (
    <section id="bio" style={{ padding: '60px 0', position: 'relative', zIndex: 1 }}>
      <div className="container">
        
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="pill mono" style={{ background: 'rgba(0, 255, 136, 0.14)', color: '#00ff88', borderColor: 'rgba(0, 255, 136, 0.35)' }}>
              <BookOpen size={12} style={{ display: 'inline', marginRight: '4px' }} />
              Student & High-Output Architect
            </span>
            <span className="mono" style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              {/* HAND-CRAFTED PROFILE */}
            </span>
          </div>

          <h2 className="refractive-heading" style={{ fontSize: '2.6rem', fontWeight: 800, lineHeight: 1.12 }}>
            About Sarvan — High-Output Student Engineering
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '32px', alignItems: 'start' }}>
          
          {/* Left Main Bio Card */}
          <div className="liquid-glass-card" style={{ padding: '36px' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }}>
              Student by Day, High-Throughput Architect by Night
            </h3>

            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '20px' }}>
              I am a computer science student with a relentless obsession for building software that pushes the boundaries of performance and autonomous systems. Despite balancing my academic studies, I produce a prolific volume of applications, AI agent frameworks, WebGPU compute engines, and production Next.js 16 systems.
            </p>

            <p style={{ color: 'var(--text-secondary)', fontSize: '1.02rem', lineHeight: 1.7, marginBottom: '28px' }}>
              My engineering philosophy revolves around <strong>extreme token efficiency, deterministic loss evaluation, and uncompromised aesthetic excellence</strong>. Whether it&apos;s crafting 3D ASCII parallax canvas backgrounds or training neural reasoning loops to refactor applications overnight, I treat code as a craft and a marvel.
            </p>

            {/* Aspiration Highlights */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: '#00ff88', fontSize: '0.9rem', marginBottom: '4px' }}>
                  <Rocket size={16} />
                  <span>Current Aspirations</span>
                </div>
                <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  Pioneering autonomous AI agent operating systems, WebGPU graphics pipelines, and zero-overhead devtools.
                </div>
              </div>

              <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: '#818cf8', fontSize: '0.9rem', marginBottom: '4px' }}>
                  <Terminal size={16} />
                  <span>Engineering Stack</span>
                </div>
                <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  Next.js 16 App Router, React 19, WebGPU WGSL Shaders, Node.js, Python, Tailwind, AST Analysis & Docker.
                </div>
              </div>
            </div>

          </div>

          {/* Right Stats & Badge Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="liquid-glass-card" style={{ padding: '28px' }}>
              <div className="mono" style={{ fontSize: '0.78rem', color: '#00ff88', fontWeight: 600, marginBottom: '16px' }}>
                SARVAN // METRICS & OUTPUT
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }} className="mono">
                <div style={{ background: 'rgba(0, 0, 0, 0.5)', padding: '14px', borderRadius: '6px' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Status</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#00ff88' }}>CS Student</div>
                </div>

                <div style={{ background: 'rgba(0, 0, 0, 0.5)', padding: '14px', borderRadius: '6px' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Output Rate</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#818cf8' }}>Prolific</div>
                </div>

                <div style={{ background: 'rgba(0, 0, 0, 0.5)', padding: '14px', borderRadius: '6px' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>AI Skills Built</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#00ff88' }}>6 Skills</div>
                </div>

                <div style={{ background: 'rgba(0, 0, 0, 0.5)', padding: '14px', borderRadius: '6px' }}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>GPU Target</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#38bdf8' }}>120 FPS</div>
                </div>
              </div>
            </div>

            {/* Quote Card */}
            <div className="liquid-glass-card" style={{ padding: '24px', background: 'rgba(0, 255, 136, 0.05)', border: '1px solid rgba(0, 255, 136, 0.3)' }}>
              <div className="serif-italic" style={{ fontSize: '1rem', color: '#f4f4f0', lineHeight: 1.6 }}>
                &ldquo;Creation is not limited by age or background. When you design with discipline and mathematics, every application becomes a marvel.&rdquo;
              </div>
              <div className="mono" style={{ fontSize: '0.78rem', color: '#00ff88', marginTop: '12px', fontWeight: 600 }}>
                — Sarvan
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
