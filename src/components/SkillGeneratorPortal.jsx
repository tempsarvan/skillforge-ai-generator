'use client';

import React, { useState } from 'react';
import { Sparkles, ArrowUpRight, Cpu, Zap, Shield, Layers, Terminal, Activity, Rocket } from 'lucide-react';
import AsciiLoadingPortal from '@/components/AsciiLoadingPortal';

export default function SkillGeneratorPortal() {
  const [isLoadingPortal, setIsLoadingPortal] = useState(false);

  const handleLaunchPortal = (e) => {
    e.preventDefault();
    setIsLoadingPortal(true);
  };

  return (
    <>
      {isLoadingPortal && <AsciiLoadingPortal targetUrl="/generator" />}

      <section id="skill-generator-tool" style={{ padding: '60px 0', position: 'relative', zIndex: 1 }}>
        <div className="container">
          
          <div className="liquid-glass-card" style={{ padding: '48px 40px', background: 'rgba(12, 12, 18, 0.75)' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '36px', alignItems: 'center' }}>
              
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                  <span className="pill mono glow-pulse" style={{ background: 'rgba(0, 255, 136, 0.14)', color: '#00ff88', borderColor: 'rgba(0, 255, 136, 0.35)' }}>
                    <Sparkles size={12} style={{ display: 'inline', marginRight: '4px' }} />
                    Standalone Studio Application
                  </span>
                  <span className="mono" style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    SkillForge v2.0
                  </span>
                </div>

                <h2 className="refractive-heading" style={{ fontSize: '2.6rem', fontWeight: 800, lineHeight: 1.12, marginBottom: '12px' }}>
                  SkillForge AI — Universal Skill Definition Studio
                </h2>

                <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.65, maxWidth: '640px', marginBottom: '28px' }}>
                  Step into the standalone studio website to generate token-minified, neural-backpropagation enabled <code style={{ color: '#00ff88' }}>SKILL.md</code> files for Gemini, Claude, GPT-4, Antigravity, or Cursor Agents.
                </p>

                {/* Engine Pills */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
                  <span className="mono" style={{ fontSize: '0.76rem', color: 'var(--text-primary)', background: 'rgba(255,255,255,0.06)', padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--border)' }}>
                    ✦ Gemini 1.5 Pro
                  </span>
                  <span className="mono" style={{ fontSize: '0.76rem', color: 'var(--text-primary)', background: 'rgba(255,255,255,0.06)', padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--border)' }}>
                    ✳ Claude 3.5 Sonnet
                  </span>
                  <span className="mono" style={{ fontSize: '0.76rem', color: 'var(--text-primary)', background: 'rgba(255,255,255,0.06)', padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--border)' }}>
                    ⁕ GPT-4o / o3-mini
                  </span>
                  <span className="mono" style={{ fontSize: '0.76rem', color: 'var(--text-primary)', background: 'rgba(255,255,255,0.06)', padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--border)' }}>
                    ⚛ Google Antigravity
                  </span>
                </div>

                {/* Gateway CTA Button */}
                <a
                  href="/generator"
                  onClick={handleLaunchPortal}
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
                  <Rocket size={18} />
                  <span>ENTER SKILLFORGE GENERATOR PORTAL</span>
                  <ArrowUpRight size={18} />
                </a>
              </div>

              {/* Right Side Stats & ASCII Neural Wave Card */}
              <div style={{ background: '#040406', border: '1px solid rgba(0, 255, 136, 0.3)', borderRadius: 'var(--radius-md)', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="mono">
                  <span style={{ fontSize: '0.78rem', color: '#00ff88', fontWeight: 600 }}>
                    QUANTUM PORTAL STATS
                  </span>
                  <span className="glow-pulse" style={{ fontSize: '0.74rem', color: '#10b981' }}>
                    ● ONLINE
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }} className="mono">
                  <div style={{ background: 'rgba(255,255,255,0.04)', padding: '10px', borderRadius: '6px' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Token Savings</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#00ff88' }}>-65%</div>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.04)', padding: '10px', borderRadius: '6px' }}>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Worker Slots</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#818cf8' }}>15 Agents</div>
                  </div>
                </div>

                <div style={{ background: 'rgba(0, 255, 136, 0.05)', border: '1px border rgba(0, 255, 136, 0.2)', padding: '12px', borderRadius: '6px', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#00ff88', lineHeight: 1.4 }}>
                  <pre style={{ margin: 0 }}>
{` [PORTAL STREAM]
  S_i ===> (P_j) ===> A_k
  Loss L = Σ(w_r*Reg)-Σ(w_i*Imp)
  ΔW = 0.10 * |-0.75| = +0.075`}
                  </pre>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>
    </>
  );
}
