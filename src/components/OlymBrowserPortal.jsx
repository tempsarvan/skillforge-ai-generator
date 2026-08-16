'use client';

import React from 'react';
import Link from 'next/link';
import { Globe, Sparkles, Shield, Cpu, ArrowUpRight, Terminal, Layers, CheckCircle2, Lock, FileSpreadsheet, Presentation } from 'lucide-react';

export default function OlymBrowserPortal() {
  return (
    <section id="olym-browser" style={{ padding: '60px 0', position: 'relative', zIndex: 1 }}>
      <div className="container">
        
        <div className="liquid-glass-card" style={{ padding: '48px 40px', background: 'rgba(10, 10, 16, 0.85)', border: '1px solid rgba(0, 255, 136, 0.3)' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: '36px', alignItems: 'center' }}>
            
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <span className="pill mono glow-pulse" style={{ background: 'rgba(0, 255, 136, 0.14)', color: '#00ff88', borderColor: 'rgba(0, 255, 136, 0.35)' }}>
                  <Globe size={12} style={{ display: 'inline', marginRight: '4px' }} />
                  Full Browser Release: Olym v1.0
                </span>
                <span className="mono" style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  OpenBerry Architecture
                </span>
              </div>

              <h2 className="refractive-heading" style={{ fontSize: '2.6rem', fontWeight: 800, lineHeight: 1.12, marginBottom: '12px' }}>
                Olym — Open-Source Agentic Browser Companion
              </h2>

              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.65, maxWidth: '640px', marginBottom: '24px' }}>
                Lives in the browser and executes repeatable knowledge-work skills end-to-end. Reads active pages as Markdown, connects via MCP to Gmail, Drive, GitHub, Notion, and Slack, and produces reviewable deliverables with human approval gates.
              </p>

              {/* Roles Badge List */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
                <span className="mono" style={{ fontSize: '0.74rem', background: 'rgba(255,255,255,0.05)', padding: '5px 10px', borderRadius: '4px', border: '1px solid var(--border)', color: '#fff' }}>
                  👔 Founder / Exec
                </span>
                <span className="mono" style={{ fontSize: '0.74rem', background: 'rgba(255,255,255,0.05)', padding: '5px 10px', borderRadius: '4px', border: '1px solid var(--border)', color: '#fff' }}>
                  💼 Sales & Pipeline
                </span>
                <span className="mono" style={{ fontSize: '0.74rem', background: 'rgba(255,255,255,0.05)', padding: '5px 10px', borderRadius: '4px', border: '1px solid var(--border)', color: '#fff' }}>
                  👥 Recruiting & JDs
                </span>
                <span className="mono" style={{ fontSize: '0.74rem', background: 'rgba(255,255,255,0.05)', padding: '5px 10px', borderRadius: '4px', border: '1px solid var(--border)', color: '#fff' }}>
                  ⚙️ Operations & Inbox
                </span>
                <span className="mono" style={{ fontSize: '0.74rem', background: 'rgba(255,255,255,0.05)', padding: '5px 10px', borderRadius: '4px', border: '1px solid var(--border)', color: '#fff' }}>
                  📊 Research & VC Decks
                </span>
              </div>

              {/* CTA Button */}
              <Link
                href="/olym"
                className="btn-clean"
                style={{
                  background: '#00ff88',
                  color: '#000',
                  padding: '14px 32px',
                  fontSize: '1rem',
                  fontWeight: 700,
                  borderRadius: '8px',
                  boxShadow: '0 0 24px rgba(0, 255, 136, 0.35)'
                }}
              >
                <Globe size={18} />
                <span>LAUNCH OLYM BROWSER COMPANION</span>
                <ArrowUpRight size={18} />
              </Link>
            </div>

            {/* Right Card: Principles & Parity Matrix */}
            <div style={{ background: '#040406', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="mono" style={{ fontSize: '0.78rem', color: '#00ff88', fontWeight: 600 }}>
                OPENBERRY NON-NEGOTIABLE PRINCIPLES
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={14} style={{ color: '#00ff88' }} />
                  <span><strong>Context-First</strong>: Reads active DOM & markdown before acting</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={14} style={{ color: '#00ff88' }} />
                  <span><strong>Fact Citation</strong>: Cites sources in every generated report</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={14} style={{ color: '#00ff88' }} />
                  <span><strong>Approval Gate</strong>: Every external write requires confirm</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={14} style={{ color: '#00ff88' }} />
                  <span><strong>Local-First & Offline</strong>: Run Llama 3 via Ollama locally</span>
                </div>
              </div>

              <div style={{ background: 'rgba(0, 255, 136, 0.06)', padding: '12px', borderRadius: '6px', fontSize: '0.76rem', fontFamily: 'var(--font-mono)', color: '#00ff88' }}>
                <div>MCP Connectors: Gmail • Drive • Slack • GitHub • Notion • Linear • CRM</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
