'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ThreeCanvas from '@/components/ThreeCanvas';
import { Laptop, Download, ShieldCheck, Sparkles, Lock, Cpu, CheckCircle2, Terminal, AlertTriangle, ShieldAlert } from 'lucide-react';

export default function OlymWebGatePage() {
  const [packageFormat, setPackageFormat] = useState('dmg'); // 'dmg', 'app', 'script'

  const m5Downloads = {
    dmg: '/downloads/Olym-Browser-v1.0.0-macOS-AppleM5.dmg',
    app: '/downloads/Olym-Browser-M5.app.zip',
    script: '/downloads/fix-gatekeeper-m5.sh'
  };

  const activeDownloadFile = m5Downloads[packageFormat];

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
              Olym AI Web Browser — Apple M5 Series Native Edition
            </span>
            <span className="human-annotation">
              {/* APPLE M5 CHIP EXCLUSIVE */}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link href="/generator" className="btn-ghost" style={{ fontSize: '0.78rem', padding: '5px 12px' }}>
            SkillForge Studio →
          </Link>
          <Link href="/" className="btn-ghost" style={{ fontSize: '0.78rem', padding: '5px 12px' }}>
            ← Return to Portfolio
          </Link>
        </div>
      </header>

      {/* Main Download Gate Container */}
      <div style={{ flex: 1, padding: '48px 24px', maxWidth: '960px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        
        {/* Header Hero */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <span className="pill mono glow-pulse" style={{ background: 'rgba(0, 255, 136, 0.14)', color: '#00ff88', borderColor: 'rgba(0, 255, 136, 0.35)' }}>
              <Cpu size={12} style={{ display: 'inline', marginRight: '4px' }} />
              Exclusive Target: Apple M5 Series Chips (M5, Pro, Max, Ultra)
            </span>
          </div>

          <h1 className="refractive-heading" style={{ fontSize: '3.4rem', fontWeight: 800, lineHeight: 1.08, marginBottom: '16px' }}>
            Download Olym Browser (Apple M5 Edition)
          </h1>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: 1.65, maxWidth: '780px', margin: '0 auto' }}>
            Optimized purely for Apple M5 Architecture. Runs with native hardware WebGPU execution, unblocked Chromium CDP control, and zero telemetry.
          </p>
        </div>

        {/* Apple M5 Series Exclusive Card */}
        <div className="liquid-glass-card" style={{ padding: '40px', marginBottom: '32px', border: '1px solid rgba(0, 255, 136, 0.4)' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ background: 'rgba(0, 255, 136, 0.15)', padding: '14px', borderRadius: '14px', color: '#00ff88' }}>
              <Laptop size={32} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff' }}>Olym Browser for Apple M5 Chips</h2>
              <div className="mono" style={{ fontSize: '0.82rem', color: '#00ff88' }}>Apple M5, M5 Pro, M5 Max, M5 Ultra • Arm64 Native</div>
            </div>
          </div>

          {/* Package Format Choice */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '10px' }} className="mono">
              Select Package Format:
            </label>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
              <button
                type="button"
                onClick={() => setPackageFormat('dmg')}
                className={`pill mono ${packageFormat === 'dmg' ? 'active' : ''}`}
                style={{ padding: '10px', fontSize: '0.8rem', justifyContent: 'center' }}
              >
                📦 .DMG Installer Disk Image
              </button>
              <button
                type="button"
                onClick={() => setPackageFormat('app')}
                className={`pill mono ${packageFormat === 'app' ? 'active' : ''}`}
                style={{ padding: '10px', fontSize: '0.8rem', justifyContent: 'center' }}
              >
                🚀 .APP Standalone Bundle
              </button>
              <button
                type="button"
                onClick={() => setPackageFormat('script')}
                className={`pill mono ${packageFormat === 'script' ? 'active' : ''}`}
                style={{ padding: '10px', fontSize: '0.8rem', justifyContent: 'center' }}
              >
                🛡️ Gatekeeper Fix Script
              </button>
            </div>
          </div>

          {/* Download CTA Button */}
          <a
            href={activeDownloadFile}
            download
            className="btn-clean"
            style={{
              background: '#00ff88',
              color: '#000',
              padding: '16px 28px',
              fontSize: '1.05rem',
              fontWeight: 800,
              justifyContent: 'center',
              boxShadow: '0 0 24px rgba(0, 255, 136, 0.4)',
              marginBottom: '28px'
            }}
          >
            <Download size={20} />
            <span>Download Olym for Apple M5 ({packageFormat.toUpperCase()})</span>
          </a>

          {/* macOS Gatekeeper Malware Warning Clearance Instructions */}
          <div style={{ background: 'rgba(0, 0, 0, 0.6)', border: '1px solid rgba(245, 158, 11, 0.4)', borderRadius: '8px', padding: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f59e0b', fontWeight: 700, fontSize: '0.9rem', marginBottom: '8px' }}>
              <ShieldAlert size={18} />
              <span>How to bypass macOS Gatekeeper &quot;Malware / Unidentified Developer&quot; Warning</span>
            </div>

            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '10px' }}>
              Because Olym is a custom local build without a paid Apple Developer ID, macOS Gatekeeper may display a warning on open. Run this 1-step command in Terminal to verify and clear quarantine instantly:
            </p>

            <div style={{ background: '#040406', padding: '10px 14px', borderRadius: '6px', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: '#00ff88', border: '1px solid var(--border)' }}>
              <code>xattr -cr /Applications/Olym-Browser.app</code>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
