import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-main)', paddingTop: '60px', paddingBottom: '40px' }}>
      <div className="container">
        
        {/* Footer Link Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '32px', marginBottom: '48px' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.2rem', letterSpacing: '-0.02em', marginBottom: '8px' }}>
              Ryan Ritzenthaler
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '320px', lineHeight: 1.6 }}>
              Full-Stack Web Developer specializing in building high-performance e-commerce stores, custom software, and digital experiences.
            </p>
          </div>

          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 600, marginBottom: '12px' }}>
              Work
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem' }}>
              <Link to="/projects" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Curio</Link>
              <Link to="/projects" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Symmetry Sauna</Link>
              <Link to="/projects" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>CDA National</Link>
              <Link to="/projects" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Andre Architecture</Link>
              <Link to="/projects" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Porrada</Link>
              <Link to="/projects" style={{ color: 'var(--text-primary)', fontWeight: 600, textDecoration: 'none' }}>+ More Projects</Link>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 600, marginBottom: '12px' }}>
              Learn
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem' }}>
              <Link to="/about" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>About me</Link>
              <Link to="/examples" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Examples</Link>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 600, marginBottom: '12px' }}>
              Reach Out
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem' }}>
              <Link to="/inquire" style={{ color: 'var(--text-primary)', fontWeight: 600, textDecoration: 'none' }}>Inquire</Link>
              <a href="mailto:ryan@ryanritzenthaler.com" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span>Email</span>
                <ArrowUpRight size={12} />
              </a>
            </div>
          </div>
        </div>

        <div className="section-divider" style={{ margin: '0 0 24px' }}></div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <span>© {new Date().getFullYear()} Ritzenthaler Web Development LLC. All rights reserved.</span>
          <span>Designed & Built with Next.js & Vite</span>
        </div>

      </div>
    </footer>
  );
}
