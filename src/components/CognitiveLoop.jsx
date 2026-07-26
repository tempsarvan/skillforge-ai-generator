import React, { useState } from 'react';
import { Workflow, Play, CheckCircle2, Search, Layers, Terminal, Sparkles } from 'lucide-react';

export default function CognitiveLoop() {
  const [activeStep, setActiveStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const steps = [
    {
      step: "01. ANALYZE",
      title: "Scout & Requirement Discovery",
      icon: Search,
      color: "var(--accent-cyan)",
      desc: "Scans context, fact-checks facts against literature, determines whether technical info is current, and identifies architectural boundaries."
    },
    {
      step: "02. PLAN",
      title: "Pre-computation Roadmap",
      icon: Layers,
      color: "var(--accent-purple)",
      desc: "Generates implementation steps, weighs system trade-offs (RPS vs Latency SLA), predicts bottlenecks, and designs component schemas."
    },
    {
      step: "03. EXECUTE",
      title: "Secure Engineering Execution",
      icon: Terminal,
      color: "var(--accent-emerald)",
      desc: "Executes code changes under security-first principles, parameterizes inputs, sets up persistent environment configs, and runs verification loops."
    },
    {
      step: "04. REFINE",
      title: "Simplification & Humanize Pass",
      icon: Sparkles,
      color: "var(--accent-amber)",
      desc: "Filters out redundant code (Simplification Pass) and strips away synthetic AI fluff ('In conclusion') to produce authoritative, high-density results."
    }
  ];

  const triggerSimulation = () => {
    setIsProcessing(true);
    setActiveStep(0);
    
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current < steps.length) {
        setActiveStep(current);
      } else {
        clearInterval(interval);
        setIsProcessing(false);
      }
    }, 800);
  };

  return (
    <section id="cognitive-loop" style={{ padding: '40px 0 60px' }}>
      <div className="container">
        
        <div className="glass-panel" style={{ padding: '36px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
            <div>
              <span className="tag tag-purple" style={{ marginBottom: '8px', display: 'inline-block' }}>COGNITIVE PROCESS</span>
              <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>
                The Omniscience <span className="gradient-text-purple">Internal Workflow Loop</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '4px' }}>
                Every request passes through an automated 4-stage reasoning pipeline.
              </p>
            </div>

            <button
              onClick={triggerSimulation}
              disabled={isProcessing}
              className="btn-primary"
              style={{ padding: '10px 20px', fontSize: '0.88rem' }}
            >
              <Play size={16} className={isProcessing ? "animate-spin" : ""} />
              <span>{isProcessing ? "Executing Cognitive Loop..." : "Simulate Live Reasoning Loop"}</span>
            </button>
          </div>

          {/* 4 Steps Horizontal Track */}
          <div className="grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {steps.map((st, idx) => {
              const Icon = st.icon;
              const isActive = activeStep === idx;
              const isPast = activeStep > idx;

              return (
                <div
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  style={{
                    background: isActive ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.25)',
                    border: isActive ? `2px solid ${st.color}` : isPast ? '1px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
                    padding: '20px',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: isActive ? `0 0 20px ${st.color}25` : 'none'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: st.color, fontWeight: 700 }}>
                      {st.step}
                    </span>
                    {isPast ? (
                      <CheckCircle2 size={16} style={{ color: 'var(--accent-emerald)' }} />
                    ) : (
                      <Icon size={18} style={{ color: isActive ? st.color : 'var(--text-dim)' }} />
                    )}
                  </div>

                  <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '8px' }}>
                    {st.title}
                  </h3>

                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    {st.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Active Step Console Stream */}
          <div style={{ marginTop: '24px', background: '#04060a', border: '1px solid var(--border-subtle)', padding: '16px 20px', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="pulse-indicator"></span>
            <span>
              <span style={{ color: steps[activeStep].color, fontWeight: 700 }}>[{steps[activeStep].step}]</span> {steps[activeStep].desc}
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
