import React from 'react';
import { ArrowUpRight, Cpu, Layers, ShieldCheck, Zap, Code2 } from 'lucide-react';
import RefractiveText from './RefractiveText';
import TiltCard from './TiltCard';

export default function ServicesBreakdown({ onInquireClick }) {
  const services = [
    {
      title: "Systems & Distributed Architecture",
      desc: "Custom high-throughput backend services, deterministic Raft consensus state machines, and microservice architectures built for sub-15ms SLAs.",
      tags: ["Raft Consensus", "Rust", "Go", "Postgres"],
      icon: Cpu
    },
    {
      title: "WebGPU & Interactive Compute Engines",
      desc: "Offloading vector graphics, 3D particles, and embedding calculations to browser GPU shaders (WGSL) with zero main-thread layout jank.",
      tags: ["WebGPU", "WGSL Shaders", "Canvas 2D", "D3"],
      icon: Zap
    },
    {
      title: "AST Security Audit & Verification",
      desc: "Automated static analysis pipelines detecting SQL injection, hardcoded credentials, and promise rejections prior to production deployment.",
      tags: ["OWASP Rules", "AST Analysis", "CWE Compliance"],
      icon: ShieldCheck
    },
    {
      title: "High-Performance Web Engineering",
      desc: "Next.js & Vite web applications optimized for 100/100 Core Web Vitals, sub-600ms LCP loads, and smooth 120 FPS CSS view-timeline motion.",
      tags: ["React", "Vite", "CSS Motion", "CWV Optimization"],
      icon: Layers
    }
  ];

  return (
    <section id="services" style={{ paddingTop: '40px', paddingBottom: '60px', position: 'relative', zIndex: 1 }}>
      <div className="container">
        
        <div style={{ marginBottom: '40px' }}>
          <div className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
            02 / CORE SERVICES
          </div>
          <RefractiveText as="h2" style={{ fontSize: '2rem', fontWeight: 600 }}>
            What I Build & Deliver
          </RefractiveText>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '4px' }}>
            From high-throughput backends to GPU compute shaders and security audits.
          </p>
        </div>

        <div className="grid-2">
          {services.map((s, idx) => {
            const Icon = s.icon;
            return (
              <TiltCard key={idx} style={{ padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-primary)'
                    }}>
                      <Icon size={18} />
                    </div>
                    <button 
                      onClick={() => onInquireClick(s.title)}
                      className="btn-ghost"
                      style={{ fontSize: '0.78rem', padding: '4px 10px' }}
                    >
                      <span>Inquire</span>
                      <ArrowUpRight size={12} />
                    </button>
                  </div>

                  <RefractiveText as="h3" style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '10px' }}>
                    {s.title}
                  </RefractiveText>

                  <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
                    {s.desc}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
                  {s.tags.map((t, i) => (
                    <span key={i} className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'var(--bg-subtle)', padding: '2px 8px', borderRadius: '4px' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </TiltCard>
            );
          })}
        </div>

      </div>
    </section>
  );
}
