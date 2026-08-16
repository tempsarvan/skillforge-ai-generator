'use client';

import React from 'react';
import Link from 'next/link';
import ThreeCanvas from '@/components/ThreeCanvas';
import { Laptop, Monitor, Download, ShieldCheck, Sparkles, Lock, Zap, Cpu, Terminal, ArrowRight, CheckCircle2, Globe } from 'lucide-react';

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
              Olym AI Web Browser — Native Desktop Engine
            </span>
            <span className="human-annotation">
              {/* NATIVE DESKTOP INSTALLER ONLY */}
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
      <div style={{ flex: 1, padding: '48px 24px', maxWidth: '1200px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        
        {/* Header Hero */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 48px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <span className="pill mono glow-pulse" style={{ background: 'rgba(0, 255, 136, 0.14)', color: '#00ff88', borderColor: 'rgba(0, 255, 136, 0.35)' }}>
              <Lock size={12} style={{ display: 'inline', marginRight: '4px' }} />
              Native Desktop Application — Web Preview Gated
            </span>
          </div>

          <h1 className="refractive-heading" style={{ fontSize: '3.4rem', fontWeight: 800, lineHeight: 1.08, marginBottom: '16px' }}>
            Download Olym Browser for macOS & Windows
          </h1>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: 1.65 }}>
            To guarantee 100% privacy, unblocked Chromium CDP control, and local AI model execution, Olym runs exclusively as a native desktop application.
          </p>
        </div>

        {/* Multi-Platform Download Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '48px' }}>
          
          {/* macOS Download Card (Silicon & Intel) */}
          <div className="liquid-glass-card" style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid rgba(0, 255, 136, 0.35)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                <div style={{ background: 'rgba(0, 255, 136, 0.15)', padding: '12px', borderRadius: '12px', color: '#00ff88' }}>
                  <Laptop size={28} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>macOS Installer</h3>
                  <div className="mono" style={{ fontSize: '0.78rem', color: '#00ff88' }}>Universal Binary (.dmg / .app)</div>
                </div>
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.96rem', lineHeight: 1.6, marginBottom: '24px' }}>
                Native macOS build supporting <strong>Apple Silicon (M1, M2, M3, M4)</strong> and <strong>Intel 64-bit processors</strong>. Includes native Chromium CDP runtime and local Ollama Llama-3 integration.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '28px' }} className="mono">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={14} style={{ color: '#00ff88' }} />
                  <span>Supports macOS Big Sur 11.0 to macOS Sequoia 15+</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={14} style={{ color: '#00ff88' }} />
                  <span>Apple Silicon M1/M2/M3/M4 & Intel x86_64</span>
                </div>
              </div>
            </div>

            <a
              href="/dist/Olym-Browser-v1.0.0-macOS-Universal.dmg"
              download
              className="btn-clean"
              style={{
                background: '#00ff88',
                color: '#000',
                padding: '14px 24px',
                fontSize: '1rem',
                fontWeight: 700,
                justifyContent: 'center',
                boxShadow: '0 0 20px rgba(0, 255, 136, 0.3)'
              }}
            >
              <Download size={18} />
              <span>Download Olym for macOS (.dmg)</span>
            </a>
          </div>

          {/* Windows Download Card (Windows 10/11) */}
          <div className="liquid-glass-card" style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid rgba(99, 102, 241, 0.35)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                <div style={{ background: 'rgba(99, 102, 241, 0.15)', padding: '12px', borderRadius: '12px', color: '#818cf8' }}>
                  <Monitor size={28} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>Windows Installer</h3>
                  <div className="mono" style={{ fontSize: '0.78rem', color: '#818cf8' }}>Windows 10 & 11 (.exe / .msi)</div>
                </div>
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.96rem', lineHeight: 1.6, marginBottom: '24px' }}>
                Native Windows installer built for <strong>Windows 10 and Windows 11 (x64 / ARM64)</strong>. Features hardware-accelerated WebGPU graphics and local encrypted key storage.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '28px' }} className="mono">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={14} style={{ color: '#818cf8' }} />
                  <span>Supports Windows 10 (Build 19041+) & Windows 11</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={14} style={{ color: '#818cf8' }} />
                  <span>x64 64-bit & ARM64 Architecture</span>
                </div>
              </div>
            </div>

            <a
              href="/dist/Olym-Browser-v1.0.0-Windows-Setup.exe"
              download
              className="btn-clean"
              style={{
                background: '#6366f1',
                color: '#fff',
                padding: '14px 24px',
                fontSize: '1rem',
                fontWeight: 700,
                justifyContent: 'center',
                boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)'
              }}
            >
              <Download size={18} />
              <span>Download Olym for Windows (.exe)</span>
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}
