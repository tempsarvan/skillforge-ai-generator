import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function Footer({ onInquireClick }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-main)', paddingTop: '60px', paddingBottom: '40px', position: 'relative', zIndex: 1 }}>
      <div className="container">
        
        {/* Footer Link Grid (Ryan Ritzenthaler Inspo) */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '32px', marginBottom: '48px' }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: '1.2rem', letterSpacing: '-0.02em', marginBottom: '8px' }}>
              Sarvan
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', maxWidth: '320px', lineHeight: 1.6 }}>
              High-throughput systems architecture, WebGPU graphics compute, and security engineering.
            </p>
          </div>

          <div>
            <div className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 600, marginBottom: '12px' }}>
              Work
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
              <span onClick={() => scrollTo('works')} style={{ color: 'var(--text-muted)', cursor: 'pointer' }}>GPU Compute</span>
              <span onClick={() => scrollTo('works')} style={{ color: 'var(--text-muted)', cursor: 'pointer' }}>AST Security</span>
              <span onClick={() => scrollTo('works')} style={{ color: 'var(--text-muted)', cursor: 'pointer' }}>Simplification</span>
            </div>
          </div>

          <div>
            <div className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 600, marginBottom: '12px' }}>
              Learn
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
              <span onClick={() => scrollTo('sandbox')} style={{ color: 'var(--text-muted)', cursor: 'pointer' }}>Sandbox</span>
              <span onClick={() => scrollTo('notes')} style={{ color: 'var(--text-muted)', cursor: 'pointer' }}>Essays & Notes</span>
            </div>
          </div>

          <div>
            <div className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 600, marginBottom: '12px' }}>
              Reach Out
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
              <span onClick={() => scrollTo('inquire')} style={{ color: '#fafafa', fontWeight: 600, cursor: 'pointer' }}>Inquire</span>
              <a href="mailto:sarvan@example.com" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Email</a>
              <a href="https://github.com" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>GitHub</a>
            </div>
          </div>
        </div>

        <div className="section-divider" style={{ margin: '0 0 24px' }}></div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', color: 'var(--text-dim)' }}>
          <span>© {new Date().getFullYear()} Sarvan. All rights reserved.</span>
          <span>Bespoke Portfolio Architecture</span>
        </div>

      </div>
    </footer>
  );
}
