'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AsciiBackgroundCanvas from '@/components/AsciiBackgroundCanvas';
import { Cpu, Terminal, Download, Sparkles, Layers, Shield, Zap, Monitor, Laptop, Globe, Eye, Play, ArrowRight, Check, Activity, Search, RefreshCw, Layers3, ExternalLink } from 'lucide-react';

export default function OmniForgeSection() {
  const [activeTab, setActiveTab] = useState('browser'); // 'browser', 'desktop', 'skills'
  const [browserUrl, setBrowserUrl] = useState('https://news.ycombinator.com');
  const [isAgentRunning, setIsAgentRunning] = useState(false);
  const [agentLogs, setAgentLogs] = useState([
    'OmniForge Strawberry Browser Engine Initialized.',
    'Chromium Headless Process Spawned (Port 9222).'
  ]);

  const runBrowserAgentTask = () => {
    setIsAgentRunning(true);
    const taskLogs = [
      `Navigating Chromium agent to ${browserUrl}...`,
      'DOM Tree Parsed: 142 interactive nodes identified.',
      'Executing AI Sub-Agent research & data extraction...',
      'Accessibility Audit: 100% WCAG AAA Compliant.',
      'Task Completed Successfully! Report saved to memory.'
    ];

    taskLogs.forEach((log, i) => {
      setTimeout(() => {
        setAgentLogs(prev => [...prev, log]);
        if (i === taskLogs.length - 1) setIsAgentRunning(false);
      }, (i + 1) * 600);
    });
  };

  return (
    <div style={{ position: 'relative', background: '#060608', minHeight: '100vh', display: 'flex', flexDirection: 'column', color: '#fafafa' }}>
      
      {/* 3D ASCII Parallax Canvas */}
      <AsciiBackgroundCanvas />

      {/* Header */}
      <header className="mac-terminal-bar" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div className="mac-dots">
            <span className="mac-dot red"></span>
            <span className="mac-dot yellow"></span>
            <span className="mac-dot green"></span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="mono" style={{ fontSize: '0.86rem', fontWeight: 700, color: '#fff' }}>
              OmniForge AI App
            </span>
            <span className="human-annotation">
              {/* DESKTOP & WEB AGENT PLATFORM */}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link href="/generator" className="btn-ghost" style={{ fontSize: '0.78rem', padding: '5px 12px' }}>
            SkillForge Generator →
          </Link>
          <Link href="/" className="btn-ghost" style={{ fontSize: '0.78rem', padding: '5px 12px' }}>
            ← Return to App
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <div style={{ flex: 1, padding: '36px 24px', maxWidth: '1440px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
        
        {/* Product Hero */}
        <div style={{ marginBottom: '36px', textAlign: 'center', maxWidth: '860px', margin: '0 auto 36px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <span className="pill mono glow-pulse" style={{ background: 'rgba(0, 255, 136, 0.14)', color: '#00ff88', borderColor: 'rgba(0, 255, 136, 0.35)' }}>
              <Sparkles size={12} style={{ display: 'inline', marginRight: '4px' }} />
              The Autonomous AI Agent Operating System
            </span>
          </div>

          <h1 className="refractive-heading" style={{ fontSize: '3.2rem', fontWeight: 800, lineHeight: 1.1 }}>
            OmniForge — Launch AI Skills & Autonomous Web Agents
          </h1>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '12px', lineHeight: 1.6 }}>
            Run multi-agent teams on your desktop or directly in the browser. Powered by an integrated <strong>Strawberry Chromium Browser Agent</strong> that navigates, inspects, and automates web workflows for you.
          </p>

          {/* Download Buttons Bar */}
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', marginTop: '28px', flexWrap: 'wrap' }}>
            <a
              href="#download-desktop"
              className="btn-clean"
              style={{ background: '#00ff88', color: '#000', padding: '12px 24px', fontWeight: 700 }}
            >
              <Laptop size={18} />
              <span>Download for macOS (Silicon & Intel)</span>
            </a>
            <a
              href="#download-desktop"
              className="btn-clean"
              style={{ background: '#6366f1', color: '#fff', padding: '12px 24px', fontWeight: 700 }}
            >
              <Monitor size={18} />
              <span>Download for Windows 10/11</span>
            </a>
          </div>
        </div>

        {/* Strawberry Browser Agent Live Web Demo */}
        <div className="liquid-glass-card" style={{ padding: '24px', marginBottom: '40px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Globe size={20} style={{ color: '#00ff88' }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#fff' }}>
                  Strawberry Chromium Browser Agent (Live Web Edition)
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Autonomous browser sub-agent operating with direct Chromium DOM & network access
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <span className="pill mono" style={{ background: 'rgba(0, 255, 136, 0.12)', color: '#00ff88' }}>
                Chromium v126 Active
              </span>
            </div>
          </div>

          {/* Split-Screen Browser & Agent Console */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '20px', minHeight: '480px' }}>
            
            {/* Left: Mock Browser View */}
            <div style={{ background: '#09090d', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', display: 'flex', flexDirection: 'column' }}>
              {/* Browser Address Bar */}
              <div style={{ background: '#121217', padding: '10px 14px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <span className="mac-dot red"></span>
                  <span className="mac-dot yellow"></span>
                  <span className="mac-dot green"></span>
                </div>

                <div style={{ flex: 1, background: '#060608', border: '1px solid var(--border)', padding: '6px 12px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#a1a1aa' }} className="mono">
                  <Search size={14} />
                  <input
                    type="text"
                    value={browserUrl}
                    onChange={(e) => setBrowserUrl(e.target.value)}
                    style={{ background: 'transparent', border: 'none', color: '#fff', width: '100%', outline: 'none' }}
                  />
                </div>

                <button
                  onClick={runBrowserAgentTask}
                  disabled={isAgentRunning}
                  className="btn-clean"
                  style={{ padding: '6px 14px', fontSize: '0.78rem', background: '#00ff88', color: '#000' }}
                >
                  <Play size={12} />
                  <span>{isAgentRunning ? 'Agent Running...' : 'Execute Agent Task'}</span>
                </button>
              </div>

              {/* Browser View Canvas / Content */}
              <div style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#040406', color: 'var(--text-secondary)' }}>
                <Globe size={48} style={{ color: '#00ff88', marginBottom: '16px', opacity: 0.8 }} className="glow-pulse" />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#fff', marginBottom: '8px' }}>
                  Strawberry Chromium View: {browserUrl}
                </h3>
                <p style={{ fontSize: '0.9rem', maxWidth: '460px', textAlign: 'center', lineHeight: 1.5 }}>
                  The OmniForge sub-agent interacts directly with this web page — clicking elements, filling inputs, and parsing network payloads autonomously.
                </p>
              </div>
            </div>

            {/* Right: Agent Stream Console */}
            <div style={{ background: '#040406', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '16px', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '8px', marginBottom: '12px', color: '#00ff88', fontWeight: 600 }}>
                <span>[ STRAWBERRY AGENT LOGS ]</span>
                <span className="glow-pulse">● LIVE STREAM</span>
              </div>

              <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', color: '#a1a1aa' }}>
                {agentLogs.map((log, idx) => (
                  <div key={idx} style={{ color: idx === agentLogs.length - 1 ? '#00ff88' : '#a1a1aa' }}>
                    &gt; {log}
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Download Matrix Section */}
        <div id="download-desktop" className="liquid-glass-card" style={{ padding: '36px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>
            Download Everything from OmniForge Home App
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '28px', maxWidth: '640px' }}>
            Get the full desktop application to host custom skills, manage local sub-agents, and launch autonomous browser tasks.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            {/* macOS Card */}
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <Laptop size={24} style={{ color: '#00ff88' }} />
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>macOS Application</h3>
                  <div className="mono" style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Universal Binary (.dmg / .zip)</div>
                </div>
              </div>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
                Optimized for <strong>Apple Silicon (M1, M2, M3, M4)</strong> and <strong>Intel 64-bit chips</strong>. Includes native Strawberry Chromium runtime.
              </p>

              <button className="btn-clean" style={{ background: '#00ff88', color: '#000', width: '100%', justifyContent: 'center' }}>
                <Download size={16} />
                <span>Download OmniForge for macOS</span>
              </button>
            </div>

            {/* Windows Card */}
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <Monitor size={24} style={{ color: '#818cf8' }} />
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>Windows Application</h3>
                  <div className="mono" style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>Windows 10 / 11 (.exe / .msi)</div>
                </div>
              </div>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
                Supports <strong>Windows 10 & 11 (x64 / ARM64)</strong>. Direct Chromium WebGPU acceleration and local skill execution.
              </p>

              <button className="btn-clean" style={{ background: '#6366f1', color: '#fff', width: '100%', justifyContent: 'center' }}>
                <Download size={16} />
                <span>Download OmniForge for Windows</span>
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
