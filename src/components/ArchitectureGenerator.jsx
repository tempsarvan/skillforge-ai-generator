import React, { useState } from 'react';
import { Sliders, Download, Check, Sparkles, Copy } from 'lucide-react';
import RefractiveText from './RefractiveText';
import TiltCard from './TiltCard';

export default function ArchitectureGenerator({ onInquireClick }) {
  const availableModules = [
    { id: 'raft', name: 'Raft Consensus State Machine', rps: '+45,000 RPS', category: 'Distributed' },
    { id: 'webgpu', name: 'WebGPU 100k Vector Compute Shaders', rps: '120 FPS Target', category: 'Graphics' },
    { id: 'security', name: 'AST Static Security Verification Guard', rps: '0 Vulnerabilities', category: 'Security' },
    { id: 'simplification', name: 'Automated Code Complexity Reduction Pass', rps: '-60% LOC', category: 'Refactoring' },
    { id: 'mtls', name: 'Zero-Trust OAuth2 & mTLS Gateway', rps: 'Sub-5ms Auth', category: 'Security' },
    { id: 'cwv', name: 'CSS View-Timeline 100/100 CWV Engine', rps: 'Zero INP Jank', category: 'Web Perf' }
  ];

  const [selectedIds, setSelectedIds] = useState(['raft', 'webgpu', 'security']);
  const [copied, setCopied] = useState(false);

  const toggleModule = (id) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 1) {
        setSelectedIds(selectedIds.filter(m => m !== id));
      }
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const selectedModules = availableModules.filter(m => selectedIds.includes(m.id));

  // Compute Spec Summary
  const specMarkdown = `# OMNISCIENCE ARCHITECTURE BLUEPRINT SPECIFICATION
Generated: ${new Date().toISOString().split('T')[0]}

## Selected System Modules
${selectedModules.map(m => `- [x] ${m.name} (${m.category} :: ${m.rps})`).join('\n')}

## SLA & Infrastructure Guidelines
- Target Concurrency : 50,000+ Concurrent Nodes
- Execution SLA     : Sub-15ms 99th Percentile Latency
- Security Guarantee : 100% Parameterized AST Analyzed Inputs
- Deployment Stack   : Rust / Go Microservices + Vite Web Application

Prepared by Sarvan — Systems Architect & Strategist`;

  const copySpec = () => {
    navigator.clipboard.writeText(specMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section id="generator" style={{ paddingTop: '40px', paddingBottom: '60px', position: 'relative', zIndex: 1 }}>
      <div className="container">
        
        <div style={{ marginBottom: '36px' }}>
          <div className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
            04 / INTERACTIVE BUILDER (RYAN RITZENTHALER INSPO)
          </div>
          <RefractiveText as="h2" style={{ fontSize: '2rem', fontWeight: 600 }}>
            Architecture Blueprint Generator
          </RefractiveText>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '4px' }}>
            Select system modules to generate a custom technical blueprint specification for your build.
          </p>
        </div>

        <div className="grid-2">
          {/* Module Selector List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
              Select System Components:
            </div>
            
            {availableModules.map(mod => {
              const isSelected = selectedIds.includes(mod.id);
              return (
                <div
                  key={mod.id}
                  onClick={() => toggleModule(mod.id)}
                  style={{
                    background: isSelected ? 'var(--bg-card-hover)' : 'var(--bg-card)',
                    border: isSelected ? '1px solid var(--border-strong)' : '1px solid var(--border)',
                    padding: '16px 20px',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '4px',
                      border: isSelected ? 'none' : '1px solid var(--border-strong)',
                      background: isSelected ? '#fafafa' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#09090b'
                    }}>
                      {isSelected && <Check size={14} />}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {mod.name}
                      </div>
                      <div className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {mod.category}
                      </div>
                    </div>
                  </div>

                  <span className="mono" style={{ fontSize: '0.78rem', color: '#10b981', background: 'var(--bg-subtle)', padding: '2px 8px', borderRadius: '4px' }}>
                    {mod.rps}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Generated Blueprint Spec Console */}
          <div style={{ background: '#050507', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '24px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={16} style={{ color: '#fafafa' }} />
                <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                  GENERATED BLUEPRINT SPEC
                </span>
              </div>

              <button
                onClick={copySpec}
                className="btn-ghost"
                style={{ fontSize: '0.75rem', padding: '4px 10px' }}
              >
                <Copy size={12} />
                <span>{copied ? 'Copied!' : 'Copy Spec'}</span>
              </button>
            </div>

            <div style={{
              flex: 1,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              color: '#e4e4e7',
              lineHeight: 1.6,
              whiteSpace: 'pre-wrap',
              overflowY: 'auto',
              maxHeight: '260px',
              marginBottom: '20px'
            }}>
              {specMarkdown}
            </div>

            <button
              onClick={() => onInquireClick(`Custom Blueprint Spec (${selectedModules.length} Modules)`)}
              className="btn-clean"
              style={{ justifyContent: 'center' }}
            >
              <span>Submit Spec with Inquiry</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
