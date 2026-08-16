'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ThreeCanvas from '@/components/ThreeCanvas';
import { Laptop, Monitor, Download, ShieldCheck, Sparkles, Lock, Zap, Cpu, Terminal, ArrowRight, CheckCircle2, Globe, Cpu as CpuIcon, Box, FileCode } from 'lucide-react';

export default function OlymWebGatePage() {
  const [macArchitecture, setMacArchitecture] = useState('m5'); // 'm5', 'silicon', 'intel', 'universal'
  const [packageFormat, setPackageFormat] = useState('dmg'); // 'dmg', 'app', 'script'

  const macDownloadLinks = {
    dmg: {
      m5: '/downloads/Olym-Browser-v1.0.0-macOS-AppleM5.dmg',
      silicon: '/downloads/Olym-Browser-v1.0.0-macOS-AppleSilicon.dmg',
      intel: '/downloads/Olym-Browser-v1.0.0-macOS-Intel.dmg',
      universal: '/downloads/Olym-Browser-v1.0.0-macOS-Universal.dmg'
    },
    app: {
      m5: '/downloads/Olym-Browser-v1.0.0-macOS-AppleM5.app.zip',
      silicon: '/downloads/Olym-Browser-v1.0.0-macOS-AppleSilicon.app.zip',
      intel: '/downloads/Olym-Browser-v1.0.0-macOS-Intel.app.zip',
      universal: '/downloads/Olym-Browser-v1.0.0-macOS-Universal.app.zip'
    },
    script: {
      m5: '/downloads/install-olym-mac.sh',
      silicon: '/downloads/install-olym-mac.sh',
      intel: '/downloads/install-olym-mac.sh',
      universal: '/downloads/install-olym-mac.sh'
    }
  };

  const activeDownloadFile = macDownloadLinks[packageFormat][macArchitecture];

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
              Native Desktop Application — Direct Download
            </span>
          </div>

          <h1 className="refractive-heading" style={{ fontSize: '3.4rem', fontWeight: 800, lineHeight: 1.08, marginBottom: '16px' }}>
            Download Olym Browser (.dmg & .app)
          </h1>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: 1.65 }}>
            Select your preferred macOS installer format (.dmg installer disk image or standalone .app bundle) and chip architecture.
          </p>
        </div>

        {/* Multi-Platform Download Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '48px' }}>
          
          {/* macOS Download Card with DMG/APP Selector */}
          <div className="liquid-glass-card" style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid rgba(0, 255, 136, 0.35)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
                <div style={{ background: 'rgba(0, 255, 136, 0.15)', padding: '12px', borderRadius: '12px', color: '#00ff88' }}>
                  <Laptop size={28} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>macOS Installer & App</h3>
                  <div className="mono" style={{ fontSize: '0.78rem', color: '#00ff88' }}>Select Format & Architecture</div>
                </div>
              </div>

              {/* 1. Format Choice Selector (.dmg vs .app vs install.sh) */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }} className="mono">
                  1. Select Package Format:
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setPackageFormat('dmg')}
                    className={`pill mono ${packageFormat === 'dmg' ? 'active' : ''}`}
                    style={{ flex: 1, padding: '8px', fontSize: '0.76rem', justifyContent: 'center' }}
                  >
                    <Box size={14} />
                    <span>.DMG Disk Image</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPackageFormat('app')}
                    className={`pill mono ${packageFormat === 'app' ? 'active' : ''}`}
                    style={{ flex: 1, padding: '8px', fontSize: '0.76rem', justifyContent: 'center' }}
                  >
                    <Laptop size={14} />
                    <span>.APP Bundle</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPackageFormat('script')}
                    className={`pill mono ${packageFormat === 'script' ? 'active' : ''}`}
                    style={{ flex: 1, padding: '8px', fontSize: '0.76rem', justifyContent: 'center' }}
                  >
                    <FileCode size={14} />
                    <span>install.sh</span>
                  </button>
                </div>
              </div>

              {/* 2. Architecture Chip Selector */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }} className="mono">
                  2. Select macOS Processor Chip:
                </label>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setMacArchitecture('m5')}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: macArchitecture === 'm5' ? '1px solid #00ff88' : '1px solid var(--border)',
                      background: macArchitecture === 'm5' ? 'rgba(0, 255, 136, 0.15)' : 'rgba(255,255,255,0.03)',
                      color: macArchitecture === 'm5' ? '#fff' : 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.85rem',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CpuIcon size={16} style={{ color: macArchitecture === 'm5' ? '#00ff88' : 'var(--text-muted)' }} />
                      <span style={{ fontWeight: 600 }}>Apple M5 Series (M5, Pro, Max, Ultra)</span>
                    </div>
                    <span className="mono" style={{ fontSize: '0.7rem', color: '#00ff88' }}>⚡ Next-Gen</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMacArchitecture('silicon')}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: macArchitecture === 'silicon' ? '1px solid #00ff88' : '1px solid var(--border)',
                      background: macArchitecture === 'silicon' ? 'rgba(0, 255, 136, 0.15)' : 'rgba(255,255,255,0.03)',
                      color: macArchitecture === 'silicon' ? '#fff' : 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.85rem',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CpuIcon size={16} style={{ color: macArchitecture === 'silicon' ? '#00ff88' : 'var(--text-muted)' }} />
                      <span style={{ fontWeight: 600 }}>Apple Silicon (M1, M2, M3, M4)</span>
                    </div>
                    <span className="mono" style={{ fontSize: '0.7rem', color: '#00ff88' }}>Arm64</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMacArchitecture('intel')}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: macArchitecture === 'intel' ? '1px solid #00ff88' : '1px solid var(--border)',
                      background: macArchitecture === 'intel' ? 'rgba(0, 255, 136, 0.15)' : 'rgba(255,255,255,0.03)',
                      color: macArchitecture === 'intel' ? '#fff' : 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.85rem',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CpuIcon size={16} style={{ color: macArchitecture === 'intel' ? '#00ff88' : 'var(--text-muted)' }} />
                      <span style={{ fontWeight: 600 }}>Intel Processor (x86_64)</span>
                    </div>
                    <span className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Intel 64-bit</span>
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '24px' }} className="mono">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={14} style={{ color: '#00ff88' }} />
                  <span>Target: {activeDownloadFile.split('/').pop()}</span>
                </div>
              </div>
            </div>

            {/* Download Button */}
            <a
              href={activeDownloadFile}
              download
              className="btn-clean"
              style={{
                background: '#00ff88',
                color: '#000',
                padding: '14px 24px',
                fontSize: '0.98rem',
                fontWeight: 700,
                justifyContent: 'center',
                boxShadow: '0 0 20px rgba(0, 255, 136, 0.3)'
              }}
            >
              <Download size={18} />
              <span>Download {packageFormat.toUpperCase()} ({macArchitecture.toUpperCase()})</span>
            </a>
          </div>

          {/* Windows Download Card */}
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
              href="/downloads/Olym-Browser-v1.0.0-Windows-Setup.exe"
              download
              className="btn-clean"
              style={{
                background: '#6366f1',
                color: '#fff',
                padding: '14px 24px',
                fontSize: '0.98rem',
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
