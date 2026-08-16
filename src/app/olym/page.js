'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import ThreeCanvas from '@/components/ThreeCanvas';
import { Laptop, Monitor, Download, ShieldCheck, Sparkles, Lock, Zap, Cpu, Terminal, ArrowRight, CheckCircle2, Globe, Cpu as CpuIcon } from 'lucide-react';

export default function OlymWebGatePage() {
  const [macArchitecture, setMacArchitecture] = useState('m5'); // 'm5', 'silicon', 'intel', 'universal'

  const macDownloadLinks = {
    m5: {
      file: '/downloads/Olym-Browser-v1.0.0-macOS-AppleM5.dmg',
      label: 'Apple M5 Series (M5, M5 Pro, M5 Max, M5 Ultra)',
      badge: 'Next-Gen M5 Native'
    },
    silicon: {
      file: '/downloads/Olym-Browser-v1.0.0-macOS-AppleSilicon.dmg',
      label: 'Apple Silicon (M1, M2, M3, M4)',
      badge: 'Arm64 Native'
    },
    intel: {
      file: '/downloads/Olym-Browser-v1.0.0-macOS-Intel.dmg',
      label: 'Intel Processor (x86_64)',
      badge: 'Intel 64-bit'
    },
    universal: {
      file: '/downloads/Olym-Browser-v1.0.0-macOS-Universal.dmg',
      label: 'Universal macOS Binary',
      badge: 'All Macs'
    }
  };

  const activeMacConfig = macDownloadLinks[macArchitecture];

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
            Download Olym Browser for macOS & Windows
          </h1>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: 1.65 }}>
            To guarantee 100% local privacy, unblocked Chromium CDP control, and hardware WebGPU acceleration, Olym runs as a native desktop application.
          </p>
        </div>

        {/* Multi-Platform Download Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '48px' }}>
          
          {/* macOS Download Card with Apple M5 & Silicon Chip Selector */}
          <div className="liquid-glass-card" style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid rgba(0, 255, 136, 0.35)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                <div style={{ background: 'rgba(0, 255, 136, 0.15)', padding: '12px', borderRadius: '12px', color: '#00ff88' }}>
                  <Laptop size={28} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>macOS Installer</h3>
                  <div className="mono" style={{ fontSize: '0.78rem', color: '#00ff88' }}>Choose Chip Architecture</div>
                </div>
              </div>

              {/* Architecture Chip Selector Radio Buttons */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }} className="mono">
                  Select macOS Processor Chip:
                </label>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  
                  {/* Apple M5 Series Choice */}
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
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CpuIcon size={16} style={{ color: macArchitecture === 'm5' ? '#00ff88' : 'var(--text-muted)' }} />
                      <span style={{ fontWeight: 600 }}>Apple M5 Series (M5, M5 Pro, M5 Max, M5 Ultra)</span>
                    </div>
                    <span className="mono" style={{ fontSize: '0.7rem', color: '#00ff88', background: 'rgba(0, 255, 136, 0.12)', padding: '2px 6px', borderRadius: '4px' }}>⚡ Next-Gen</span>
                  </button>

                  {/* Apple M1-M4 Choice */}
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
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CpuIcon size={16} style={{ color: macArchitecture === 'silicon' ? '#00ff88' : 'var(--text-muted)' }} />
                      <span style={{ fontWeight: 600 }}>Apple Silicon (M1, M2, M3, M4)</span>
                    </div>
                    <span className="mono" style={{ fontSize: '0.7rem', color: '#00ff88', background: 'rgba(0, 255, 136, 0.12)', padding: '2px 6px', borderRadius: '4px' }}>Arm64</span>
                  </button>

                  {/* Intel Choice */}
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
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CpuIcon size={16} style={{ color: macArchitecture === 'intel' ? '#00ff88' : 'var(--text-muted)' }} />
                      <span style={{ fontWeight: 600 }}>Intel Processor (Core i5 / i7 / i9 / Xeon)</span>
                    </div>
                    <span className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>x86_64</span>
                  </button>

                  {/* Universal Choice */}
                  <button
                    type="button"
                    onClick={() => setMacArchitecture('universal')}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: macArchitecture === 'universal' ? '1px solid #00ff88' : '1px solid var(--border)',
                      background: macArchitecture === 'universal' ? 'rgba(0, 255, 136, 0.15)' : 'rgba(255,255,255,0.03)',
                      color: macArchitecture === 'universal' ? '#fff' : 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Globe size={16} style={{ color: macArchitecture === 'universal' ? '#00ff88' : 'var(--text-muted)' }} />
                      <span style={{ fontWeight: 600 }}>Universal Installer (All Macs)</span>
                    </div>
                    <span className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Combined</span>
                  </button>

                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '24px' }} className="mono">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={14} style={{ color: '#00ff88' }} />
                  <span>Selected: {activeMacConfig.label} ({activeMacConfig.badge})</span>
                </div>
              </div>
            </div>

            {/* Verified Download Button pointing to public/downloads/ */}
            <a
              href={activeMacConfig.file}
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
              <span>Download {activeMacConfig.label.split(' ')[0]} {activeMacConfig.label.split(' ')[1]} DMG</span>
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

            {/* Verified Download Button pointing to public/downloads/ */}
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
