'use client';

import React, { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import AsciiBackgroundCanvas from '@/components/AsciiBackgroundCanvas';
import { Cpu, Terminal, Copy, Download, Check, Sparkles, Sliders, Shield, Zap, Layers, RefreshCw, FileText, ArrowRight, Save, Play, Activity, Share2, Code, Calculator, Eye, Award, SlidersHorizontal, TerminalSquare, Box, Radio, CheckCircle, Flame, Droplet } from 'lucide-react';

const AI_ENGINES = [
  { id: 'gemini', name: 'Gemini 1.5 Pro / Flash', badge: 'Google AI', icon: Sparkles, asciiName: 'GEMINI-1.5' },
  { id: 'claude', name: 'Claude 3.5 Sonnet / Opus', badge: 'Anthropic', icon: Cpu, asciiName: 'CLAUDE-3.5' },
  { id: 'gpt4', name: 'GPT-4o / o3-mini', badge: 'OpenAI', icon: Zap, asciiName: 'GPT-4O' },
  { id: 'antigravity', name: 'Google Antigravity (AGY)', badge: 'Autonomous AGY', icon: Layers, asciiName: 'ANTIGRAVITY-AGY' },
  { id: 'cursor', name: 'Cursor / Windsurf Agent', badge: 'IDE Assistant', icon: Code, asciiName: 'CURSOR-WINDSURF' },
  { id: 'custom', name: 'Custom LLM Framework', badge: 'Open Source', icon: Terminal, asciiName: 'CUSTOM-LLM' }
];

const SKILL_TEMPLATES = [
  {
    id: 'overnight-app-forge',
    title: 'Overnight App Forge',
    category: 'Neural Refactoring',
    desc: 'Unattended neural improvement loop with loss evaluation & backpropagation edge weight updates.',
    icon: Sparkles
  },
  {
    id: 'security-ast-auditor',
    title: 'Security & AST Guard',
    category: 'Security & Verification',
    desc: 'Static analysis pipeline detecting SQL injection, unhandled promise rejections, and secret leakage.',
    icon: Shield
  },
  {
    id: 'a11y-auto-remediator',
    title: 'A11y Auto-Remediator',
    category: 'Accessibility & ARIA',
    desc: 'WCAG 2.1 AAA automated audit fixing contrast, focus states, and screen reader labels.',
    icon: Eye
  },
  {
    id: 'perf-bundle-pruner',
    title: 'Performance & Bundle Pruner',
    category: 'Performance Optimization',
    desc: 'Tree-shaking, dead code elimination, dynamic imports, and LCP/INP render timing boost.',
    icon: Zap
  },
  {
    id: 'multi-agent-orchestrator',
    title: 'Multi-Agent Orchestrator',
    category: 'Agent Swarm Protocol',
    desc: 'Leader-follower fanout protocol distributing tasks across 15 domain sub-agents in parallel.',
    icon: Layers
  }
];

export default function StandaloneSkillForge() {
  const [selectedEngine, setSelectedEngine] = useState(AI_ENGINES[0]);
  const [selectedTemplate, setSelectedTemplate] = useState(SKILL_TEMPLATES[0]);
  const [customTitle, setCustomTitle] = useState('Overnight App Forge');
  const [customGoal, setCustomGoal] = useState('Autonomously optimize code quality, UI layout, accessibility, and bundle performance.');
  const [maxAgents, setMaxAgents] = useState(15);
  const [learningRate, setLearningRate] = useState(0.1);
  const [compressionMode, setCompressionMode] = useState('ultra'); // 'ultra', 'balanced'
  
  const [copied, setCopied] = useState(false);
  const [savedStatus, setSavedStatus] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Parallax mouse tilt coordinates
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, rx: 0, ry: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const rx = ((clientY - innerHeight / 2) / (innerHeight / 2)) * -5;
    const ry = ((clientX - innerWidth / 2) / (innerWidth / 2)) * 5;
    setMousePos({ x: clientX, y: clientY, rx, ry });
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setCustomTitle(template.title);
    setCustomGoal(template.desc);
  };

  // Generate Token-Optimized SKILL.md
  const generatedSkillMd = useMemo(() => {
    const sanitizedId = customTitle.toLowerCase().replace(/[^a-z0-9_-]/g, '-');
    const isUltra = compressionMode === 'ultra';

    if (isUltra) {
      return `---
name: ${sanitizedId}
description: >
  Token-minified ${selectedEngine.name} protocol for ${customTitle}.
  Evaluates delta loss L=Σ(w_r*Reg)-Σ(w_i*Imp) on isolated branch checkpoints.
  Updates edge weights matrix W via backprop ΔW=η*|L|. Coordinates ${maxAgents} sub-agents.
---

# ${customTitle} — ${selectedEngine.name} Protocol

## 0. Hard Gates & Branch Isolation
- Branch: \`git checkout -b forge/\${timestamp}\`
- Protected: \`.env\`, secrets, prod configs, data-dropping migrations.
- Baseline: capture S_0=[S_lint, S_type, S_test, S_a11y, S_perf] normalized to [0,1]. Write to \`report/baseline.json\`. Initialize \`weights.json\` W_0=1.0.

## 1. Task Fan-Out (${maxAgents} Sub-Agents)
Distribute disjoint files across domain agents:
1.Arch 2.Dead-Code 3.Readability 4.Tests 5.Types 6.Perf 7.Sec 8.UI-Layout 9.Tokens 10.A11y 11.Responsive 12.Motion 13.Copy 14.Docs 15.Lead

## 2. Neural Improvement Loop (Cycle k)
For target t:
1. **Forward Pass**: P_j=σ(Σ W_ij*(1-S_i)), A_k=Σ W_jk*P_j*Conf_k. Execute top action A_k on checkpoint.
2. **Evaluate Loss**: L = Σ(w_m*Reg_m) - Σ(w_m*Imp_m).
   - If L < 0 & no regression -> KEEP checkpoint.
   - Else -> REVERT (\`git reset --hard\`).
3. **Backprop Update**: ΔW = ${learningRate} * |L|.
   - KEEP: W_{new} = W_{old} + ΔW
   - REVERT: W_{new} = W_{old} - ΔW
   - Decay: γ=0.95 on attempted paths to prevent looping.

## 3. Merge & Verify
Merge kept checkpoints. Run full verification. Gate: merged scores >= baseline. Otherwise bisect & revert.

## 4. Report
Write \`report/summary.md\` (delta table, wins, failed ideas log) and save updated \`weights.json\`.`;
    }

    return `---
name: ${sanitizedId}
description: >
  Balanced ${selectedEngine.name} skill for ${customTitle}. Continuously evaluates target code,
  applies modular edits in isolation, measures score deltas, and updates weights.json memory via backpropagation.
---

# ${customTitle} (${selectedEngine.name})

You are an autonomous engineering lead powered by **${selectedEngine.name}**. Your goal: leave the application measurably better without breaking existing features.

## Operating Principles
1. Never mutate main directly; work on branch \`forge/run\`.
2. Checkpoint every accepted change. Revert regressions immediately.
3. Keep changes only if Loss L < 0.

## Execution Steps
1. **Phase 0 (Setup)**: Run baseline tests, linters, build checks. Write initial metrics to \`report/baseline.json\`. Initialize \`weights.json\` (weights = 1.0).
2. **Phase 1 (Fan-Out)**: Allocate backlog across ${maxAgents} domain sub-agents.
3. **Phase 2 (Neural Loop)**: Forward pass selects action $A_k$. Evaluate Loss $L = \\sum w_r \\cdot \\text{Reg} - \\sum w_i \\cdot \\text{Imp}$. Update weights $\\Delta W = ${learningRate} \\cdot |L|$.
4. **Phase 3 (Merge)**: Verify merged score >= baseline.
5. **Phase 4 (Report)**: Generate \`report/summary.md\`.`;
  }, [selectedEngine, customTitle, maxAgents, learningRate, compressionMode]);

  // Token Metrics
  const tokenMetrics = useMemo(() => {
    const chars = generatedSkillMd.length;
    const estTokens = Math.round(chars / 4);
    const rawVerboseTokens = 1050; // Baseline uncompressed prompt tokens
    const tokensSaved = Math.max(0, rawVerboseTokens - estTokens);
    const savingsPercent = Math.round((tokensSaved / rawVerboseTokens) * 100);

    return { chars, estTokens, rawVerboseTokens, tokensSaved, savingsPercent };
  }, [generatedSkillMd]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedSkillMd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedSkillMd], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${customTitle.toLowerCase().replace(/[^a-z0-9_-]/g, '-')}-SKILL.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDeployToWorkspace = async () => {
    setIsSaving(true);
    setSavedStatus(null);
    try {
      const res = await fetch('/api/save-skill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skillName: customTitle,
          skillContent: generatedSkillMd
        })
      });
      const data = await res.json();
      setSavedStatus(data);
    } catch (err) {
      setSavedStatus({ success: false, error: err.message });
    }
    setIsSaving(false);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        background: '#060608',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden'
      }}
    >
      {/* FULL-SCREEN ANIMATED ASCII MATRIX PARALLAX CANVAS BACKGROUND */}
      <AsciiBackgroundCanvas />

      {/* Top Liquid Glass macOS Header */}
      <header className="mac-terminal-bar" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div className="mac-dots">
            <span className="mac-dot red"></span>
            <span className="mac-dot yellow"></span>
            <span className="mac-dot green"></span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="mono" style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff' }}>
              SkillForge Studio
            </span>
            <span className="human-annotation">
              <TerminalSquare size={12} style={{ color: '#00ff88' }} />
              {/* ANIMATED FULL-SCREEN ASCII BACKGROUND */}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div className="mono" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#00ff88' }}>
            <Activity size={12} />
            <span>Target: {selectedEngine.name}</span>
          </div>

          <div className="mono" style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            Tokens Saved: <strong style={{ color: '#00ff88' }}>{tokenMetrics.savingsPercent}%</strong>
          </div>

          <Link href="/" className="btn-ghost" style={{ fontSize: '0.78rem', padding: '5px 12px' }}>
            ← Return to App
          </Link>
        </div>
      </header>

      {/* Main Studio Container */}
      <div style={{ flex: 1, padding: '36px 24px', maxWidth: '1440px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
        
        {/* Studio Hero Section */}
        <div style={{ marginBottom: '36px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span className="pill mono" style={{ background: 'rgba(0, 255, 136, 0.14)', color: '#00ff88', borderColor: 'rgba(0, 255, 136, 0.35)' }}>
              <Sparkles size={12} style={{ display: 'inline', marginRight: '4px' }} />
              Full-Screen Animated 3D ASCII Parallax Matrix
            </span>
            <span className="mono" style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Universal LLM Engine
            </span>
          </div>

          <h1 className="refractive-heading" style={{ fontSize: '3rem', fontWeight: 800, lineHeight: 1.1 }}>
            Algorithmic AI Skill Definition Studio
          </h1>

          <p style={{ color: 'var(--text-secondary)', fontSize: '1.08rem', marginTop: '10px', maxWidth: '800px', lineHeight: 1.6 }}>
            Synthesize token-minified, neural backpropagation-enabled <code style={{ color: '#00ff88' }}>SKILL.md</code> specifications directly over a live, full-screen 3D ASCII matrix background canvas.
          </p>
        </div>

        {/* Studio Workspace Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '28px', alignItems: 'start' }}>
          
          {/* LEFT SIDEBAR: Controls & Engine Selectors in Liquid Glass */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Engine Selector Cards */}
            <div className="liquid-glass-card" style={{ padding: '20px' }}>
              <div className="mono" style={{ fontSize: '0.78rem', color: '#00ff88', fontWeight: 600, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Cpu size={14} />
                <span>1. TARGET AI AGENT ENGINE</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {AI_ENGINES.map(eng => {
                  const IconComp = eng.icon;
                  const isSelected = selectedEngine.id === eng.id;
                  return (
                    <button
                      key={eng.id}
                      onClick={() => setSelectedEngine(eng)}
                      className={`btn-ghost ${isSelected ? 'active' : ''}`}
                      style={{
                        padding: '10px',
                        fontSize: '0.78rem',
                        justifyContent: 'flex-start',
                        background: isSelected ? 'rgba(0, 255, 136, 0.15)' : 'transparent',
                        borderColor: isSelected ? '#00ff88' : 'var(--border)',
                        color: isSelected ? '#fff' : 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <IconComp size={14} style={{ color: isSelected ? '#00ff88' : 'var(--text-muted)' }} />
                      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{eng.name.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Template Selector Cards */}
            <div className="liquid-glass-card" style={{ padding: '20px' }}>
              <div className="mono" style={{ fontSize: '0.78rem', color: '#00ff88', fontWeight: 600, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Layers size={14} />
                <span>2. SELECT SKILL TEMPLATE</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {SKILL_TEMPLATES.map(tmpl => {
                  const IconComp = tmpl.icon;
                  const isSelected = selectedTemplate.id === tmpl.id;
                  return (
                    <div
                      key={tmpl.id}
                      onClick={() => handleTemplateSelect(tmpl)}
                      style={{
                        padding: '12px',
                        borderRadius: 'var(--radius-sm)',
                        border: isSelected ? '1px solid #00ff88' : '1px solid var(--border)',
                        background: isSelected ? 'rgba(0, 255, 136, 0.1)' : 'rgba(18, 18, 26, 0.5)',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, fontSize: '0.86rem', color: isSelected ? '#fff' : 'var(--text-primary)' }}>
                          <IconComp size={14} style={{ color: isSelected ? '#00ff88' : 'var(--text-muted)' }} />
                          <span>{tmpl.title}</span>
                        </div>
                        <span className="mono" style={{ fontSize: '0.68rem', color: isSelected ? '#00ff88' : 'var(--text-muted)' }}>
                          {tmpl.category}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', lineHeight: 1.35 }}>
                        {tmpl.desc}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Parameters & Tuning Card */}
            <div className="liquid-glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="mono" style={{ fontSize: '0.78rem', color: '#00ff88', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <SlidersHorizontal size={14} />
                <span>3. NEURAL PARAMETERS</span>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  Custom Skill Title:
                </label>
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  style={{
                    width: '100%',
                    background: 'rgba(6, 6, 8, 0.8)',
                    border: '1px solid var(--border)',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    color: '#fff',
                    fontSize: '0.85rem'
                  }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Domain Worker Sub-Agents:</span>
                  <span className="mono" style={{ color: '#00ff88', fontWeight: 600 }}>{maxAgents} agents</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  value={maxAgents}
                  onChange={(e) => setMaxAgents(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#00ff88' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '6px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Backprop Learning Rate ($\eta$):</span>
                  <span className="mono" style={{ color: '#38bdf8', fontWeight: 600 }}>{learningRate}</span>
                </div>
                <input
                  type="range"
                  min="0.01"
                  max="0.5"
                  step="0.01"
                  value={learningRate}
                  onChange={(e) => setLearningRate(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#38bdf8' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  Token Compression Strategy:
                </label>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    onClick={() => setCompressionMode('ultra')}
                    className={`pill mono ${compressionMode === 'ultra' ? 'active' : ''}`}
                    style={{ flex: 1, padding: '6px', fontSize: '0.74rem', textAlign: 'center' }}
                  >
                    ⚡ Ultra Math
                  </button>
                  <button
                    onClick={() => setCompressionMode('balanced')}
                    className={`pill mono ${compressionMode === 'balanced' ? 'active' : ''}`}
                    style={{ flex: 1, padding: '6px', fontSize: '0.74rem', textAlign: 'center' }}
                  >
                    ⚖️ Balanced
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT WORKSPACE: 3D Parallax Liquid Glass Workspace */}
          <div
            ref={cardRef}
            className="liquid-glass-card"
            style={{
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '740px',
              transform: `perspective(1000px) rotateX(${mousePos.rx}deg) rotateY(${mousePos.ry}deg)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            
            {/* macOS Chrome Header inside Liquid Glass */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid var(--border)', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div className="mac-dots">
                  <span className="mac-dot red"></span>
                  <span className="mac-dot yellow"></span>
                  <span className="mac-dot green"></span>
                </div>
                <span className="mono" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff', marginLeft: '6px' }}>
                  {customTitle.toLowerCase().replace(/[^a-z0-9_-]/g, '-')}/SKILL.md
                </span>
              </div>

              {/* Action Toolbar */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={handleCopy} className="btn-ghost" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
                  {copied ? <Check size={14} style={{ color: '#00ff88' }} /> : <Copy size={14} />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
                <button onClick={handleDownload} className="btn-ghost" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
                  <Download size={14} />
                  <span>Download</span>
                </button>
                <button
                  onClick={handleDeployToWorkspace}
                  disabled={isSaving}
                  className="btn-clean"
                  style={{ fontSize: '0.8rem', padding: '6px 14px', background: '#00ff88', color: '#000' }}
                >
                  <Save size={14} />
                  <span>{isSaving ? 'Deploying...' : 'Deploy Skill'}</span>
                </button>
              </div>
            </div>

            {/* Notification message when deployed */}
            {savedStatus && (
              <div style={{
                marginBottom: '16px',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                background: savedStatus.success ? 'rgba(0, 255, 136, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                border: savedStatus.success ? '1px solid rgba(0, 255, 136, 0.4)' : '1px solid rgba(239, 68, 68, 0.4)',
                color: savedStatus.success ? '#00ff88' : '#ef4444',
                fontSize: '0.85rem'
              }}>
                {savedStatus.success ? `✓ ${savedStatus.message}` : `✕ Error: ${savedStatus.error}`}
              </div>
            )}

            {/* SKILL.md Code Output */}
            <div style={{
              flex: 1,
              background: 'rgba(4, 4, 6, 0.85)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              padding: '24px',
              overflowX: 'auto',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.86rem',
              lineHeight: 1.65,
              color: '#e4e4e7',
              whiteSpace: 'pre-wrap'
            }}>
              {generatedSkillMd}
            </div>

            {/* Sub-footer details */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border)', fontSize: '0.78rem', color: 'var(--text-muted)' }} className="mono">
              <div>Engine: <span style={{ color: '#fff' }}>{selectedEngine.name}</span></div>
              <div>Sub-Agents: <span style={{ color: '#00ff88' }}>{maxAgents} domain slots</span></div>
              <div>Specification: <span style={{ color: '#38bdf8' }}>Standard SKILL.md</span></div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
