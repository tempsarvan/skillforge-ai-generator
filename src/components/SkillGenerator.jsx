'use client';

import React, { useState, useMemo } from 'react';
import { Cpu, Terminal, Copy, Download, Check, Sparkles, Sliders, Shield, Zap, Layers, RefreshCw, FileText, ArrowRight, Save } from 'lucide-react';

const AI_PRESETS = [
  { id: 'gemini', name: 'Gemini 1.5 Pro / Flash', systemPrefix: 'Gemini Agent' },
  { id: 'claude', name: 'Claude 3.5 Sonnet', systemPrefix: 'Claude Agent' },
  { id: 'gpt4', name: 'GPT-4o / o3-mini', systemPrefix: 'GPT Agent' },
  { id: 'antigravity', name: 'Google Antigravity (AGY)', systemPrefix: 'Antigravity Autonomous Sub-Agent' },
  { id: 'cursor', name: 'Cursor / Windsurf Agent', systemPrefix: 'IDE Pair-Programmer Agent' },
  { id: 'custom', name: 'Custom AI Engine', systemPrefix: 'Autonomous AI Engine' }
];

const DOMAIN_PRESETS = [
  {
    id: 'overnight-app-forge',
    title: 'Overnight App Forge',
    desc: 'Unattended neural refactoring loop with backprop weight updates & loss evaluation.',
    domain: 'Full-Stack Code Quality & UI/UX'
  },
  {
    id: 'security-ast-auditor',
    title: 'Security & AST Vulnerability Guard',
    desc: 'Static analysis pipeline detecting injection flaws, unhandled rejections, and secret leaks.',
    domain: 'AST Verification & Hardened Security'
  },
  {
    id: 'a11y-auto-remediator',
    title: 'Accessibility & ARIA Auto-Remediator',
    desc: 'Scans markup for WCAG 2.1 AAA compliance, fixing contrast, focus traps, and screen reader tags.',
    domain: 'Accessibility (a11y) & UX'
  },
  {
    id: 'perf-bundle-pruner',
    title: 'Performance & Bundle Size Optimizer',
    desc: 'Tree-shaking, dead code elimination, dynamic imports, and LCP/INP render timing boost.',
    domain: 'Web Performance & CWV'
  }
];

export default function SkillGenerator() {
  const [agentName, setAgentName] = useState('Gemini 1.5 Pro');
  const [skillId, setSkillId] = useState('overnight-app-forge');
  const [skillTitle, setSkillTitle] = useState('Overnight App Forge');
  const [customGoal, setCustomGoal] = useState('Autonomously refactor code, improve UI/UX, and optimize performance overnight unattended.');
  const [maxAgents, setMaxAgents] = useState(15);
  const [compressionLevel, setCompressionLevel] = useState('ultra'); // 'ultra', 'balanced', 'verbose'
  const [learningRate, setLearningRate] = useState(0.1);
  const [copied, setCopied] = useState(false);
  const [savedStatus, setSavedStatus] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('skill'); // 'skill', 'raw', 'math'

  const handlePresetSelect = (preset) => {
    setSkillId(preset.id);
    setSkillTitle(preset.title);
    setCustomGoal(preset.desc);
  };

  // Algorithmic SKILL.md Generator with Token Compression Logic
  const generatedSkillContent = useMemo(() => {
    const sanitizedId = skillId.toLowerCase().replace(/[^a-z0-9_-]/g, '-');
    const isUltra = compressionLevel === 'ultra';

    if (isUltra) {
      // Token-minified mathematical vector notation format
      return `---
name: ${sanitizedId}
description: >
  Token-optimized autonomous ${agentName} engine for ${skillTitle}.
  Evaluates delta loss L=Σ(w_r*Reg)-Σ(w_i*Imp) on isolated branch checkpoints.
  Updates edge weights matrix W via backprop ΔW=η*|L|. Coordinates ${maxAgents} sub-agents.
---

# ${skillTitle} (${agentName} Engine)

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

    // Balanced / Full explanatory format
    return `---
name: ${sanitizedId}
description: >
  Autonomously executes ${skillTitle} using ${agentName}. Continuously observes the application,
  proposes targeted refactors, applies changes in isolation, and retains only changes that lower loss.
  Driven by a neural-network reasoning engine: forward passes choose changes, backprop updates weights.json.
  Coordinates up to ${maxAgents} domain sub-agents. Trigger on "run overnight" or "autonomous refactor".
---

# ${skillTitle} — Autonomous ${agentName} Protocol

You are an autonomous engineering lead powered by **${agentName}**. Your goal: leave the application code, performance, accessibility, and UI/UX measurably better by morning without human intervention.

## Operating Principles
- **Isolation First**: Always operate on a dedicated branch (\`git checkout -b forge/run\`).
- **Reversible Checkpoints**: Every accepted edit must be an explicit git checkpoint.
- **Objective Loss Gate**: Keep changes ONLY if loss L < 0 and no baseline metric regresses.
- **Strict Hard Guardrails**: Never modify \`.env\`, CI secrets, or production credentials.

## Phase 0 — Setup & Baseline Scoreboard
1. Verify app build and tests.
2. Capture baseline scoreboard:
   - Code Health: lint errors, type safety, test pass rate, code complexity.
   - UI & A11y: WCAG accessibility violations, layout/contrast checks.
   - Performance: bundle size, key render latencies.
3. Write baseline metrics to \`report/baseline.json\` and set initial \`weights.json\` (all edge weights = 1.0).

## Phase 1 — Backlog & Multi-Agent Fan Out
Partition tasks across up to ${maxAgents} domain sub-agents (Architecture, Types, Security, Performance, UI Layout, A11y, Test Coverage, Docs).

## Phase 2 — The Neural Improvement Loop
For each candidate change pass:
1. **Forward Pass**: Compute problem activation $P_j = \\sigma(\\sum W_{ij} (1 - S_i))$ and candidate action $A_k$.
2. **Evaluate Loss**: $L = \\sum (w_m \\cdot \\text{Regression}_m) - \\sum (w_m \\cdot \\text{Improvement}_m)$.
3. **Decide**: If $L < 0$ and no regression -> KEEP checkpoint. Otherwise -> REVERT.
4. **Backpropagation**: Adjust weights: $\\Delta W = ${learningRate} \\cdot |L|$. Increase path weight on KEEP, decrease on REVERT.

## Phase 3 — Merge & Final Verification
Merge kept checkpoints. Gate: merged scores must equal or exceed initial baseline on every metric.

## Phase 4 — Report Generation
Write \`report/summary.md\` detailing deltas, top improvements, reverted ideas log, and save final \`weights.json\`.`;
  }, [agentName, skillId, skillTitle, maxAgents, compressionLevel, learningRate]);

  // Token Metrics Calculation
  const tokenStats = useMemo(() => {
    const charCount = generatedSkillContent.length;
    const estTokens = Math.round(charCount / 4);
    
    // Baseline verbose prompt tokens without compression (~2,400 chars)
    const verboseCharCount = 3800;
    const verboseTokens = Math.round(verboseCharCount / 4);
    
    const tokensSaved = Math.max(0, verboseTokens - estTokens);
    const savingsPercent = Math.round((tokensSaved / verboseTokens) * 100);

    return {
      charCount,
      estTokens,
      verboseTokens,
      tokensSaved,
      savingsPercent
    };
  }, [generatedSkillContent]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedSkillContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedSkillContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${skillId.toLowerCase()}-SKILL.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSaveToWorkspace = async () => {
    setIsSaving(true);
    setSavedStatus(null);
    try {
      const res = await fetch('/api/save-skill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          skillName: skillId,
          skillContent: generatedSkillContent
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
    <section id="skill-generator-tool" style={{ padding: '60px 0', position: 'relative', zIndex: 1 }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="pill mono" style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#818cf8', borderColor: 'rgba(99, 102, 241, 0.3)' }}>
              <Sparkles size={12} style={{ display: 'inline', marginRight: '4px' }} />
              Algorithmic Skill Generator
            </span>
            <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Universal Token-Optimized SKILL.md
            </span>
          </div>

          <h2 className="refractive-heading" style={{ fontSize: '2.2rem', fontWeight: 600 }}>
            Create AI Agent Skill Definitions
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '720px', marginTop: '6px' }}>
            Configure your AI Agent&apos;s name and neural capabilities to synthesize a token-minified <code style={{ color: '#818cf8' }}>SKILL.md</code> specification that runs seamlessly on Gemini, Claude, GPT, Antigravity, or any custom LLM architecture.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: '24px' }}>
          
          {/* Controls Panel */}
          <div className="card" style={{ background: '#050507', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
                1. SELECT TARGET AI AGENT
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {AI_PRESETS.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setAgentName(p.name)}
                    className={`btn-ghost ${agentName === p.name ? 'active' : ''}`}
                    style={{
                      padding: '8px 10px',
                      fontSize: '0.78rem',
                      justifyContent: 'flex-start',
                      background: agentName === p.name ? 'rgba(99, 102, 241, 0.12)' : 'transparent',
                      borderColor: agentName === p.name ? '#6366f1' : 'var(--border)',
                      color: agentName === p.name ? '#fff' : 'var(--text-muted)'
                    }}
                  >
                    <Cpu size={12} />
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
                placeholder="Or type custom AI agent name..."
                style={{
                  width: '100%',
                  background: 'var(--bg-main)',
                  border: '1px solid var(--border)',
                  padding: '8px 12px',
                  borderRadius: 'var(--radius-sm)',
                  color: '#fff',
                  fontSize: '0.85rem',
                  marginTop: '10px'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
                2. SKILL PRESET TEMPLATE
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {DOMAIN_PRESETS.map(preset => (
                  <div
                    key={preset.id}
                    onClick={() => handlePresetSelect(preset)}
                    style={{
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-sm)',
                      border: skillId === preset.id ? '1px solid #6366f1' : '1px solid var(--border)',
                      background: skillId === preset.id ? 'rgba(99, 102, 241, 0.08)' : 'var(--bg-subtle)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ fontWeight: 600, fontSize: '0.85rem', color: skillId === preset.id ? '#fff' : 'var(--text-primary)' }}>
                      {preset.title}
                    </div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '2px', lineHeight: 1.3 }}>
                      {preset.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  3. MAX SUB-AGENTS CAP: <span style={{ color: '#6366f1' }}>{maxAgents}</span>
                </label>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                value={maxAgents}
                onChange={(e) => setMaxAgents(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#6366f1' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
                4. TOKEN EFFICIENCY PRESET
              </label>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  onClick={() => setCompressionLevel('ultra')}
                  className={`pill mono ${compressionLevel === 'ultra' ? 'active' : ''}`}
                  style={{ flex: 1, padding: '6px', fontSize: '0.75rem', textAlign: 'center' }}
                >
                  ⚡ Ultra Math (Minified)
                </button>
                <button
                  onClick={() => setCompressionLevel('balanced')}
                  className={`pill mono ${compressionLevel === 'balanced' ? 'active' : ''}`}
                  style={{ flex: 1, padding: '6px', fontSize: '0.75rem', textAlign: 'center' }}
                >
                  📖 Full Explanatory
                </button>
              </div>
            </div>

            {/* Token Scorecard */}
            <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', padding: '14px', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span className="mono" style={{ fontSize: '0.78rem', color: '#10b981', fontWeight: 600 }}>
                  TOKEN EFFICIENCY SCORECARD
                </span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#10b981' }}>
                  -{tokenStats.savingsPercent}% Tokens
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.78rem' }} className="mono">
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Estimated Tokens:</span>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>{tokenStats.estTokens}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Tokens Saved:</span>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#10b981' }}>{tokenStats.tokensSaved}</div>
                </div>
              </div>
            </div>

          </div>

          {/* Code & Output Workspace */}
          <div className="card" style={{ background: '#050507', display: 'flex', flexDirection: 'column' }}>
            
            {/* Top Toolbar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid var(--border)', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Terminal size={18} style={{ color: '#818cf8' }} />
                <span className="mono" style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                  {skillId.toLowerCase()}/SKILL.md
                </span>
                <span className="pill mono" style={{ fontSize: '0.72rem', background: 'var(--bg-subtle)' }}>
                  {compressionLevel === 'ultra' ? 'Token Minified Notation' : 'Explanatory Specification'}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={handleCopy} className="btn-ghost" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
                  {copied ? <Check size={14} style={{ color: '#10b981' }} /> : <Copy size={14} />}
                  <span>{copied ? 'Copied!' : 'Copy SKILL.md'}</span>
                </button>
                <button onClick={handleDownload} className="btn-ghost" style={{ fontSize: '0.8rem', padding: '6px 12px' }}>
                  <Download size={14} />
                  <span>Download .md</span>
                </button>
                <button
                  onClick={handleSaveToWorkspace}
                  disabled={isSaving}
                  className="btn-clean"
                  style={{ fontSize: '0.8rem', padding: '6px 12px', background: '#6366f1', color: '#fff' }}
                >
                  <Save size={14} />
                  <span>{isSaving ? 'Saving...' : 'Deploy to Workspace'}</span>
                </button>
              </div>
            </div>

            {/* Notification message when saved */}
            {savedStatus && (
              <div style={{
                marginBottom: '16px',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                background: savedStatus.success ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                border: savedStatus.success ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
                color: savedStatus.success ? '#10b981' : '#ef4444',
                fontSize: '0.82rem'
              }}>
                {savedStatus.success ? `✓ ${savedStatus.message}` : `✕ Error: ${savedStatus.error}`}
              </div>
            )}

            {/* Markdown Code Preview */}
            <div style={{
              flex: 1,
              background: '#09090b',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              padding: '20px',
              overflowX: 'auto',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.84rem',
              lineHeight: 1.6,
              color: '#e4e4e7',
              whiteSpace: 'pre-wrap'
            }}>
              {generatedSkillContent}
            </div>

            {/* Sub-footer details */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', fontSize: '0.78rem', color: 'var(--text-muted)' }} className="mono">
              <div>Target Engine: <span style={{ color: '#fff' }}>{agentName}</span></div>
              <div>Neural Backprop Learning Rate $\eta$: <span style={{ color: '#6366f1' }}>{learningRate}</span></div>
              <div>Sub-Agent Workers: <span style={{ color: '#10b981' }}>{maxAgents} domain slots</span></div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
