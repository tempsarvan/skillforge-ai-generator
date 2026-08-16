'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import AsciiBackgroundCanvas from '@/components/AsciiBackgroundCanvas';
import { Globe, Search, Shield, Zap, Cpu, Terminal as TerminalIcon, Play, CheckCircle2, AlertTriangle, Layers, Lock, FileText, Database, Download, Sparkles, User, Briefcase, DollarSign, Users, Settings, Wrench, ArrowRight, RefreshCw, Eye, Check, X, FileSpreadsheet, Presentation, LayoutDashboard, Compass, Laptop, Monitor, Code, GitBranch, ShieldCheck, Key, FileCode, Layers3, Activity, Share2, Box, Cpu as CpuIcon, GitCommit, GitPullRequest, Upload, Folder, File, ChevronRight, PlayCircle, Save, Sliders } from 'lucide-react';

const PREBUILT_PIPELINES = [
  {
    id: 'pipe1',
    name: '🕸️ Scrape & Refactor to React 19',
    steps: ['Fetch DOM Payload', 'Parse AST Syntax Tree', 'Refactor HTML/JS -> React 19', 'Generate TypeScript Definitions'],
    status: 'ready'
  },
  {
    id: 'pipe2',
    name: '🔒 AST Security Audit & Vulnerability Scan',
    steps: ['Scan Hardcoded API Keys', 'Inspect XSS Input Vectors', 'Audit CSP Headers', 'Generate Security Report'],
    status: 'ready'
  },
  {
    id: 'pipe3',
    name: '🚀 Full CI/CD Build & Push to GitHub',
    steps: ['Execute ESLint Linter', 'Run Production Build', 'Git Commit Worktree', 'Push to origin main'],
    status: 'ready'
  }
];

export default function OmniForgeSection() {
  const [activeTab, setActiveTab] = useState('terminal'); // 'terminal', 'automator', 'editor', 'git', 'scraper'
  
  // Terminal Shell State
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLogs, setTerminalLogs] = useState([
    { type: 'sys', text: '✦ OmniForge Terminal & Automator CLI v1.0.0' },
    { type: 'sys', text: 'Type "help" to list available commands (scrape, git, ai, build, automator, clear).' },
    { type: 'prompt', text: 'omniforge@studio:~$ status' },
    { type: 'out', text: '● OmniForge System Engine: ACTIVE (Apple M5 & WebGPU Hardware Accelerated)' }
  ]);
  const terminalEndRef = useRef(null);

  // Automator Pipeline State
  const [selectedPipeline, setSelectedPipeline] = useState(PREBUILT_PIPELINES[0]);
  const [isPipelineRunning, setIsPipelineRunning] = useState(false);
  const [pipelineLogs, setPipelineLogs] = useState([]);
  const [pipelineProgress, setPipelineProgress] = useState(0);

  // Auto-scroll terminal to bottom
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalLogs]);

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const cmd = terminalInput.trim();
    if (!cmd) return;

    const newLogs = [...terminalLogs, { type: 'prompt', text: `omniforge@studio:~$ ${cmd}` }];
    setTerminalInput('');

    const lower = cmd.toLowerCase();

    if (lower === 'clear') {
      setTerminalLogs([]);
      return;
    } else if (lower === 'help') {
      newLogs.push({
        type: 'out',
        text: `Available OmniForge CLI Commands:\n  - help                    List CLI commands\n  - status                  Check system & hardware status\n  - scrape <url>            Scrape website HTML, JS, CSS & APIs\n  - git pull | push | status Direct Git repository commands\n  - ai <prompt>             Run Gemini AI code reasoning engine\n  - build                   Run Next.js production build\n  - run <pipeline_id>       Execute automated pipeline\n  - clear                   Clear terminal log buffer`
      });
    } else if (lower === 'status') {
      newLogs.push({ type: 'out', text: '● OmniForge Engine: ACTIVE\n● Git Branch: main (up to date with origin/main)\n● Hardware: Apple M5 WebGPU Stream Enabled' });
    } else if (lower.startsWith('scrape')) {
      const url = cmd.split(' ')[1] || 'https://news.ycombinator.com';
      newLogs.push({ type: 'out', text: `⚡ Scraping site assets for ${url}...\n✓ HTML payload: 48 KB\n✓ Extracted 6 JS scripts & 4 CSS stylesheets\n✓ Found 18 API routes.` });
    } else if (lower.startsWith('git')) {
      newLogs.push({ type: 'out', text: `Executing git command: "${cmd}"...\nTo https://github.com/tempsarvan/skillforge-ai-generator.git\n   1731734..5f44239  main -> main\n🎉 Successfully synced with GitHub repository.` });
    } else if (lower.startsWith('ai')) {
      newLogs.push({ type: 'out', text: `✦ Gemini AI Reasoning Output:\nAnalyzed target codebase. Syntax tree clean, zero security vulnerabilities detected.` });
    } else if (lower === 'build') {
      newLogs.push({ type: 'out', text: '▲ Next.js 16.2.12 (Turbopack)\n✓ Compiled successfully in 1050ms\n✓ Generated static pages (11/11)\n✓ Finalized page optimization.' });
    } else {
      newLogs.push({ type: 'out', text: `Command not recognized: "${cmd}". Type "help" for command list.` });
    }

    setTerminalLogs(newLogs);
  };

  const handleRunPipeline = () => {
    setIsPipelineRunning(true);
    setPipelineProgress(0);
    setPipelineLogs([`🚀 Launching Automated Pipeline: "${selectedPipeline.name}"`]);

    let stepIndex = 0;
    const interval = setInterval(() => {
      if (stepIndex < selectedPipeline.steps.length) {
        const stepName = selectedPipeline.steps[stepIndex];
        setPipelineLogs(prev => [...prev, `[Step ${stepIndex + 1}/${selectedPipeline.steps.length}] Executing ${stepName}... ✓ Done`]);
        stepIndex++;
        setPipelineProgress(Math.round((stepIndex / selectedPipeline.steps.length) * 100));
      } else {
        clearInterval(interval);
        setPipelineLogs(prev => [...prev, '🎉 Pipeline Execution Completed Successfully! All deliverables generated and committed.']);
        setIsPipelineRunning(false);
      }
    }, 900);
  };

  return (
    <div style={{ position: 'relative', background: '#060608', minHeight: '100vh', display: 'flex', flexDirection: 'column', color: '#fafafa' }}>
      
      {/* 3D ASCII Parallax Canvas */}
      <AsciiBackgroundCanvas />

      {/* Simulated Native macOS App Desktop Frame */}
      <div style={{ padding: '16px 24px', flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
        
        {/* macOS Desktop Window Header */}
        <div style={{ background: 'rgba(24, 24, 27, 0.95)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '14px 14px 0 0', padding: '12px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backdropFilter: 'blur(20px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className="mac-dots">
              <span className="mac-dot red"></span>
              <span className="mac-dot yellow"></span>
              <span className="mac-dot green"></span>
            </div>
            <span className="mono" style={{ fontSize: '0.86rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TerminalIcon size={16} style={{ color: '#00ff88' }} />
              OmniForge CLI Terminal & Automator (Supercell & October Engine)
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="mono" style={{ fontSize: '0.74rem', color: '#00ff88', background: 'rgba(0, 255, 136, 0.12)', padding: '3px 8px', borderRadius: '4px', border: '1px solid rgba(0, 255, 136, 0.3)' }}>
              AUTOMATOR: ONLINE
            </span>
            <Link href="/" className="btn-ghost" style={{ fontSize: '0.76rem', padding: '4px 10px' }}>
              ← Exit Studio
            </Link>
          </div>
        </div>

        {/* Studio Inner Canvas */}
        <div style={{ background: 'rgba(10, 10, 14, 0.95)', border: '1px solid rgba(255,255,255,0.12)', borderTop: 'none', borderRadius: '0 0 14px 14px', flex: 1, display: 'flex', flexDirection: 'column', minHeight: '740px' }}>
          
          {/* Main Navigation Tab Bar */}
          <div style={{ display: 'flex', background: 'rgba(18, 18, 22, 0.9)', borderBottom: '1px solid var(--border)', padding: '6px 12px', gap: '6px' }}>
            
            <button
              onClick={() => setActiveTab('terminal')}
              className={`btn-ghost ${activeTab === 'terminal' ? 'active' : ''}`}
              style={{ fontSize: '0.8rem', padding: '6px 14px', background: activeTab === 'terminal' ? 'rgba(0, 255, 136, 0.15)' : 'transparent', borderColor: activeTab === 'terminal' ? '#00ff88' : 'transparent', color: activeTab === 'terminal' ? '#fff' : 'var(--text-muted)' }}
            >
              <TerminalIcon size={14} style={{ color: '#00ff88' }} />
              <span>1. CLI Terminal Console</span>
            </button>

            <button
              onClick={() => setActiveTab('automator')}
              className={`btn-ghost ${activeTab === 'automator' ? 'active' : ''}`}
              style={{ fontSize: '0.8rem', padding: '6px 14px', background: activeTab === 'automator' ? 'rgba(0, 255, 136, 0.15)' : 'transparent', borderColor: activeTab === 'automator' ? '#00ff88' : 'transparent', color: activeTab === 'automator' ? '#fff' : 'var(--text-muted)' }}
            >
              <Zap size={14} style={{ color: '#00ff88' }} />
              <span>2. Workflow Automator Engine</span>
            </button>

            <button
              onClick={() => setActiveTab('editor')}
              className={`btn-ghost ${activeTab === 'editor' ? 'active' : ''}`}
              style={{ fontSize: '0.8rem', padding: '6px 14px', background: activeTab === 'editor' ? 'rgba(0, 255, 136, 0.15)' : 'transparent', borderColor: activeTab === 'editor' ? '#00ff88' : 'transparent', color: activeTab === 'editor' ? '#fff' : 'var(--text-muted)' }}
            >
              <Code size={14} style={{ color: '#00ff88' }} />
              <span>3. Code Editor IDE</span>
            </button>

            <button
              onClick={() => setActiveTab('git')}
              className={`btn-ghost ${activeTab === 'git' ? 'active' : ''}`}
              style={{ fontSize: '0.8rem', padding: '6px 14px', background: activeTab === 'git' ? 'rgba(0, 255, 136, 0.15)' : 'transparent', borderColor: activeTab === 'git' ? '#00ff88' : 'transparent', color: activeTab === 'git' ? '#fff' : 'var(--text-muted)' }}
            >
              <GitBranch size={14} style={{ color: '#00ff88' }} />
              <span>4. Git Repo Studio</span>
            </button>

          </div>

          {/* TAB 1: INTERACTIVE CLI TERMINAL CONSOLE */}
          {activeTab === 'terminal' && (
            <div style={{ flex: 1, padding: '20px', background: '#040406', display: 'flex', flexDirection: 'column' }}>
              
              <div style={{ flex: 1, fontFamily: 'var(--font-mono)', fontSize: '0.86rem', color: '#00ff88', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', paddingBottom: '16px' }}>
                {terminalLogs.map((log, index) => (
                  <div key={index} style={{ color: log.type === 'prompt' ? '#818cf8' : log.type === 'sys' ? '#00ff88' : '#e4e4e7', whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
                    {log.text}
                  </div>
                ))}
                <div ref={terminalEndRef} />
              </div>

              {/* Terminal Command Input Form */}
              <form onSubmit={handleTerminalSubmit} style={{ display: 'flex', alignItems: 'center', background: '#09090d', border: '1px solid #00ff88', borderRadius: '6px', padding: '10px 14px', gap: '10px' }}>
                <span className="mono" style={{ color: '#00ff88', fontWeight: 700, fontSize: '0.88rem' }}>omniforge@studio:~$</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  className="mono"
                  placeholder="Type command ('help', 'scrape <url>', 'git push', 'ai <prompt>', 'build')..."
                  style={{ flex: 1, background: 'transparent', border: 'none', color: '#fff', fontSize: '0.88rem', outline: 'none' }}
                  autoFocus
                />
              </form>

            </div>
          )}

          {/* TAB 2: WORKFLOW AUTOMATOR ENGINE */}
          {activeTab === 'automator' && (
            <div style={{ flex: 1, padding: '24px', display: 'grid', gridTemplateColumns: '360px 1fr', gap: '24px' }}>
              
              {/* Prebuilt Pipeline Selection List */}
              <div className="liquid-glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div className="mono" style={{ fontSize: '0.8rem', color: '#00ff88', fontWeight: 700 }}>
                  AUTOMATED WORKFLOW PIPELINES
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {PREBUILT_PIPELINES.map(p => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPipeline(p)}
                      style={{
                        padding: '12px',
                        borderRadius: '8px',
                        border: selectedPipeline.id === p.id ? '1px solid #00ff88' : '1px solid var(--border)',
                        background: selectedPipeline.id === p.id ? 'rgba(0, 255, 136, 0.14)' : 'rgba(255,255,255,0.02)',
                        color: selectedPipeline.id === p.id ? '#fff' : 'var(--text-muted)',
                        textAlign: 'left',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ fontWeight: 700, fontSize: '0.86rem', color: selectedPipeline.id === p.id ? '#00ff88' : '#fff', marginBottom: '4px' }}>
                        {p.name}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }} className="mono">
                        {p.steps.length} Steps Sequence
                      </div>
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleRunPipeline}
                  disabled={isPipelineRunning}
                  className="btn-clean"
                  style={{ background: '#00ff88', color: '#000', padding: '14px', justifyContent: 'center', fontWeight: 800, marginTop: 'auto' }}
                >
                  <PlayCircle size={18} />
                  <span>{isPipelineRunning ? 'Automator Running...' : 'Execute Automated Pipeline'}</span>
                </button>
              </div>

              {/* Automator Execution Log & Progress Terminal */}
              <div className="liquid-glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div className="mono" style={{ fontSize: '0.88rem', fontWeight: 700, color: '#00ff88' }}>
                    AUTOMATOR PROCESS TERMINAL — {selectedPipeline.name}
                  </div>
                  <div className="mono" style={{ fontSize: '0.78rem', color: '#00ff88' }}>
                    Progress: {pipelineProgress}%
                  </div>
                </div>

                {/* Progress Bar */}
                <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden', marginBottom: '20px' }}>
                  <div style={{ width: `${pipelineProgress}%`, height: '100%', background: '#00ff88', transition: 'width 0.3s ease' }} />
                </div>

                {/* Logs Terminal */}
                <div style={{ flex: 1, background: '#040406', border: '1px solid var(--border)', borderRadius: '8px', padding: '18px', fontFamily: 'var(--font-mono)', fontSize: '0.84rem', color: '#00ff88', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', lineHeight: 1.6 }}>
                  {pipelineLogs.length > 0 ? (
                    pipelineLogs.map((log, i) => <div key={i}>{log}</div>)
                  ) : (
                    <div style={{ color: 'var(--text-muted)' }}>Click &quot;Execute Automated Pipeline&quot; to run automated workflow steps...</div>
                  )}
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: CODE EDITOR */}
          {activeTab === 'editor' && (
            <div style={{ flex: 1, padding: '24px', color: '#fff' }} className="mono">
              Code Editor Active. Use CLI Terminal or Automator for fast engineering tasks.
            </div>
          )}

          {/* TAB 4: GIT REPO STUDIO */}
          {activeTab === 'git' && (
            <div style={{ flex: 1, padding: '24px', color: '#fff' }} className="mono">
              Git Repo Studio Active. Connected to https://github.com/tempsarvan/skillforge-ai-generator.git.
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
