'use client';

import React from 'react';
import Link from 'next/link';
import ThreeCanvas from '@/components/ThreeCanvas';
import { Download, Sparkles, Lock, Globe, ShieldCheck, AlertTriangle } from 'lucide-react';

export default function OlymWebGatePage() {
  return (
    <div style={{ position: 'relative', background: '#060608', minHeight: '100vh', display: 'flex', flexDirection: 'column', color: '#fafafa' }}>
      
      {/* 3D Torus Mesh Background Canvas */}
      <ThreeCanvas />

      {/* Navigation Header */}
      <header className="mac-terminal-bar" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div className="mac-dots">
            <span className="mac-dot red"></span>
            <span className="mac-dot yellow"></span>
            <span className="mac-dot green"></span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="mono" style={{ fontSize: '0.86rem', fontWeight: 800, color: '#fff' }}>
              Olym AI — Cloudflare Web Edition
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link href="/omniforge" className="btn-ghost" style={{ fontSize: '0.78rem', padding: '5px 12px' }}>
            OmniForge Studio →
          </Link>
          <Link href="/" className="btn-ghost" style={{ fontSize: '0.78rem', padding: '5px 12px' }}>
            ← Return to Portfolio
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <div style={{ flex: 1, padding: '48px 24px', maxWidth: '960px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        
        {/* Header Hero */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <span className="pill mono" style={{ background: 'rgba(239, 68, 68, 0.14)', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.35)' }}>
              <Lock size={12} style={{ display: 'inline', marginRight: '4px' }} />
              Downloads Disabled by Administrator
            </span>
          </div>

          <h1 className="refractive-heading" style={{ fontSize: '3.4rem', fontWeight: 800, lineHeight: 1.08, marginBottom: '16px' }}>
            Olym AI Cloud Subdomain Portal
          </h1>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: 1.65, maxWidth: '780px', margin: '0 auto' }}>
            Olym AI runs live in your browser via our Cloudflare Subdomain edge proxy. Local file downloads are permanently disabled.
          </p>
        </div>

        {/* Extension Card with Disabled Download Button */}
        <div className="liquid-glass-card" style={{ padding: '40px', marginBottom: '32px', border: '1px solid rgba(239, 68, 68, 0.35)' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ background: 'rgba(239, 68, 68, 0.15)', padding: '14px', borderRadius: '14px', color: '#ef4444' }}>
              <Globe size={32} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff' }}>Olym AI Cloud Engine</h2>
              <div className="mono" style={{ fontSize: '0.82rem', color: '#ef4444' }}>Cloudflare Edge Worker Deployment Active</div>
            </div>
          </div>

          {/* Disabled Download Button */}
          <button
            disabled={true}
            className="btn-clean"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              color: '#8e8e93',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '16px 28px',
              fontSize: '1.05rem',
              fontWeight: 800,
              justifyContent: 'center',
              cursor: 'not-allowed',
              opacity: 0.6,
              marginBottom: '24px',
              width: '100%'
            }}
          >
            <Lock size={20} />
            <span>Downloads Disabled (Cloudflare Subdomain Only)</span>
          </button>

          <div style={{ background: 'rgba(0, 0, 0, 0.6)', border: '1px solid var(--border)', borderRadius: '8px', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444', fontWeight: 700, fontSize: '0.9rem', marginBottom: '6px' }}>
              <AlertTriangle size={18} />
              <span>Public Downloads Restricted</span>
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              All installer binaries (.dmg, .exe, .zip) have been locked by administrator policy. Use the live web environment at <a href="https://omniforge-studio.workers.dev" target="_blank" rel="noopener noreferrer" style={{ color: '#00ff88', textDecoration: 'underline' }}>omniforge-studio.workers.dev</a>.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
