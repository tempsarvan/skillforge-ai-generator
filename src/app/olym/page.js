'use client';

import React from 'react';
import Link from 'next/link';
import ThreeCanvas from '@/components/ThreeCanvas';
import { Download, Sparkles, Lock, Cpu, CheckCircle2, Globe, Layers, ArrowRight, ShieldCheck, TerminalSquare } from 'lucide-react';

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
              Olym AI — Chrome Extension (Manifest V3)
            </span>
            <span className="human-annotation">
              {/* BROWSER EXTENSION EDITION */}
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
              <Sparkles size={12} style={{ display: 'inline', marginRight: '4px' }} />
              Manifest V3 Chrome Extension Ready
            </span>
          </div>

          <h1 className="refractive-heading" style={{ fontSize: '3.4rem', fontWeight: 800, lineHeight: 1.08, marginBottom: '16px' }}>
            Olym AI Browser Companion Extension
          </h1>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: 1.65, maxWidth: '780px', margin: '0 auto' }}>
            Install Olym AI directly into Google Chrome, Brave, Arc, or Edge. Runs as a Side Panel companion with live DOM access and local privacy.
          </p>
        </div>

        {/* Extension Download Card */}
        <div className="liquid-glass-card" style={{ padding: '40px', marginBottom: '32px', border: '1px solid rgba(0, 255, 136, 0.4)' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <div style={{ background: 'rgba(0, 255, 136, 0.15)', padding: '14px', borderRadius: '14px', color: '#00ff88' }}>
              <Globe size={32} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff' }}>Olym AI Chrome Extension (.zip)</h2>
              <div className="mono" style={{ fontSize: '0.82rem', color: '#00ff88' }}>Supports Chrome, Brave, Arc, Edge • Manifest V3</div>
            </div>
          </div>

          {/* Download CTA Button */}
          <a
            href="/downloads/Olym-AI-Chrome-Extension.zip"
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
              marginBottom: '32px'
            }}
          >
            <Download size={20} />
            <span>Download Olym AI Extension (.zip)</span>
          </a>

          {/* 3-Step Extension Installation Guide */}
          <div style={{ background: 'rgba(0, 0, 0, 0.6)', border: '1px solid var(--border)', borderRadius: '8px', padding: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '16px' }} className="mono">
              ⚡ 3-Step Installation Guide:
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span className="mono" style={{ background: '#00ff88', color: '#000', width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.78rem', flexShrink: 0 }}>1</span>
                <div>
                  <strong>Download & Extract</strong>: Download <code style={{ color: '#00ff88' }}>Olym-AI-Chrome-Extension.zip</code> above and unzip the contents to your computer.
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span className="mono" style={{ background: '#00ff88', color: '#000', width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.78rem', flexShrink: 0 }}>2</span>
                <div>
                  <strong>Open Extensions Page</strong>: Open <code style={{ color: '#818cf8' }}>chrome://extensions</code> in Chrome, Brave, Arc, or Edge.
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span className="mono" style={{ background: '#00ff88', color: '#000', width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.78rem', flexShrink: 0 }}>3</span>
                <div>
                  <strong>Load Unpacked Extension</strong>: Toggle on <strong>Developer mode</strong> (top right), click <strong>Load unpacked</strong>, and select the extracted extension folder!
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
