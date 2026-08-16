'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import AsciiBackgroundCanvas from '@/components/AsciiBackgroundCanvas';
import { Globe, Search, Shield, Zap, Cpu, Terminal, Play, CheckCircle2, AlertTriangle, Layers, Lock, FileText, Database, Download, Sparkles, User, Briefcase, DollarSign, Users, Settings, Wrench, ArrowRight, RefreshCw, Eye, Check, X, FileSpreadsheet, Presentation, LayoutDashboard, Compass } from 'lucide-react';

const MODEL_PROVIDERS = [
  { id: 'claude', name: 'Claude 3.5 Sonnet', provider: 'Anthropic', costPer1k: '$0.003', icon: Cpu, isLocal: false },
  { id: 'gemini', name: 'Gemini 1.5 Pro', provider: 'Google AI', costPer1k: '$0.00125', icon: Sparkles, isLocal: false },
  { id: 'gpt4', name: 'GPT-4o', provider: 'OpenAI', costPer1k: '$0.0025', icon: Zap, isLocal: false },
  { id: 'ollama', name: 'Llama 3 (Local Ollama)', provider: 'Local Machine', costPer1k: '$0.000 (Free)', icon: Terminal, isLocal: true }
];

const MCP_CONNECTORS = [
  { id: 'gmail', name: 'Gmail', status: 'connected', category: 'Email', icon: '✉️' },
  { id: 'gcal', name: 'Google Calendar', status: 'connected', category: 'Calendar', icon: '📅' },
  { id: 'gdrive', name: 'Google Drive / Docs / Sheets', status: 'connected', category: 'Storage', icon: '📁' },
  { id: 'github', name: 'GitHub', status: 'connected', category: 'Dev', icon: '🐙' },
  { id: 'slack', name: 'Slack', status: 'connected', category: 'Messaging', icon: '💬' },
  { id: 'notion', name: 'Notion', status: 'connected', category: 'Knowledge', icon: '📝' },
  { id: 'linear', name: 'Linear', status: 'connected', category: 'Issues', icon: '📐' },
  { id: 'crm', name: 'HubSpot / Salesforce CRM', status: 'connected', category: 'Sales', icon: '📊' }
];

const SKILL_ROLES = [
  {
    role: 'Founder / Exec',
    icon: Briefcase,
    skills: [
      { id: 'fundraise-prep', title: 'Fundraise Preparation & Investor Memo', desc: 'Read pitch deck & financials -> Generate investment memo & Q&A brief' },
      { id: 'team-workflow', title: 'Shared Team Workflow Setup', desc: 'Map tools & roles -> Generate team SOP document and Notion hub' }
    ]
  },
  {
    role: 'Sales',
    icon: DollarSign,
    skills: [
      { id: 'account-research', title: 'Account Research & Meeting Prep', desc: 'Read target website -> Pull CRM history -> Generate sales deck & battle card' },
      { id: 'pipeline-review', title: 'Pipeline Review & Personalized Outreach', desc: 'Enrich lead list -> Draft custom email outreach with approval gate' }
    ]
  },
  {
    role: 'Recruiting',
    icon: Users,
    skills: [
      { id: 'candidate-sourcing', title: 'Candidate Sourcing & JD Screening', desc: 'Read JD -> Extract candidate profiles -> Output comparison dataset' }
    ]
  },
  {
    role: 'Operations',
    icon: Settings,
    skills: [
      { id: 'inbox-zero', title: 'Inbox Zero & Meeting Debrief', desc: 'Scan unread emails -> Transcribe meeting -> Draft follow-ups' }
    ]
  },
  {
    role: 'Marketing',
    icon: Compass,
    skills: [
      { id: 'competitor-analysis', title: 'Competitor Analysis & SEO Audit', desc: 'Crawl competitor sites -> Benchmark SEO -> Generate HTML audit report' }
    ]
  },
  {
    role: 'Product & Eng',
    icon: Terminal,
    skills: [
      { id: 'issue-repro-pr', title: 'Investigate App Issue (Logs -> Repro -> PR)', desc: 'Read error log -> Repro issue in browser -> Draft fix PR' }
    ]
  },
  {
    role: 'Research / VC',
    icon: Database,
    skills: [
      { id: 'market-map-deck', title: 'Startup Market Map & Pitch Deck', desc: 'Crawl key startups -> Extract structured dataset -> Output slide deck' }
    ]
  }
];

export default function OlymBrowserEngine() {
  const [selectedModel, setSelectedModel] = useState(MODEL_PROVIDERS[0]);
  const [activeRole, setActiveRole] = useState(SKILL_ROLES[0]);
  const [selectedSkill, setSelectedSkill] = useState(SKILL_ROLES[0].skills[0]);
  
  const [browserUrl, setBrowserUrl] = useState('https://news.ycombinator.com');
  const [pageMarkdown, setPageMarkdown] = useState('# Hacker News\n- [1] OpenBerry: Open-Source Agentic Browser Companion\n- [2] Next.js 15 App Router & Server Actions Guide\n- [3] WebGPU Shaders Engine Benchmark');
  
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [executionLogs, setExecutionLogs] = useState([]);
  
  // Human Approval Modal State
  const [showApprovalGate, setShowApprovalGate] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  // Artifact View Tab
  const [artifactTab, setArtifactTab] = useState('report'); // 'report', 'deck', 'csv', 'memory'
  const [generatedArtifact, setGeneratedArtifact] = useState(null);

  // Token & Cost Estimation
  const costEstimate = useMemo(() => {
    const estTokens = 850;
    return {
      tokens: estTokens,
      cost: selectedModel.isLocal ? '$0.000 (Free Local Model)' : '$0.0025'
    };
  }, [selectedModel]);

  const runSkillExecution = () => {
    setIsRunning(true);
    setCurrentStep(1);
    setExecutionLogs([
      `[Planner] Loaded Skill: ${selectedSkill.title}`,
      `[Context] Captured active page as Markdown (${pageMarkdown.length} bytes)`,
      `[Provider] Route execution to ${selectedModel.name}`
    ]);

    setTimeout(() => {
      setCurrentStep(2);
      setExecutionLogs(prev => [
        ...prev,
        '[MCP Connectors] Connected to Gmail, Google Drive, Notion, and GitHub',
        '[Tool Call] Fetching competitor data & team history via MCP...'
      ]);
    }, 800);

    setTimeout(() => {
      setCurrentStep(3);
      setExecutionLogs(prev => [
        ...prev,
        '[Verifier] Output validated against schema.json',
        '[Artifact Generator] Synthesizing prose report, slide deck & CSV dataset...'
      ]);

      setGeneratedArtifact({
        title: `Deliverable: ${selectedSkill.title}`,
        sources: [browserUrl, 'Google Drive/Q3_Financials.pdf', 'Notion/Team_SOP'],
        content: `Executive Summary for ${selectedSkill.title}:\n\n- Key Insight 1: Market competition has increased by 14% year-over-year.\n- Key Insight 2: Opportunity identified in autonomous agent browser companions.\n- Source Citation: ${browserUrl}`
      });

      // Trigger Human-in-the-Loop Approval Gate for external write!
      setPendingAction({
        type: 'Outward-Facing Action',
        target: 'Gmail / CRM Update',
        details: `Send follow-up email and update CRM pipeline for ${selectedSkill.title}`,
        diff: `+ TO: investor@firm.com\n+ SUBJECT: Re: ${selectedSkill.title}\n+ BODY: Attached is our structured investment brief and market map deck.`
      });
      setShowApprovalGate(true);
      setIsRunning(false);
    }, 1600);
  };

  const handleApproveAction = () => {
    setExecutionLogs(prev => [
      ...prev,
      '[Human Approval] ✅ User confirmed action!',
      '[External Write] Email sent & CRM pipeline updated successfully.'
    ]);
    setShowApprovalGate(false);
    setPendingAction(null);
  };

  const handleRejectAction = () => {
    setExecutionLogs(prev => [
      ...prev,
      '[Human Approval] 🛑 User rejected action. External write cancelled safely.'
    ]);
    setShowApprovalGate(false);
    setPendingAction(null);
  };

  return (
    <div style={{ position: 'relative', background: '#060608', minHeight: '100vh', display: 'flex', flexDirection: 'column', color: '#fafafa' }}>
      
      {/* 3D ASCII Canvas Background */}
      <AsciiBackgroundCanvas />

      {/* Human Approval Gate Modal */}
      {showApprovalGate && pendingAction && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(16px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }}>
          <div className="liquid-glass-card" style={{ maxWidth: '600px', width: '100%', padding: '28px', border: '1px solid rgba(245, 158, 11, 0.5)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#f59e0b', marginBottom: '14px', fontWeight: 700, fontSize: '1.1rem' }}>
              <AlertTriangle size={20} />
              <span>Human-in-the-Loop Approval Required</span>
            </div>

            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.5 }}>
              OpenBerry is ready to perform an external write. Please review the proposed action and approve or cancel:
            </p>

            <div style={{ background: '#040406', border: '1px solid var(--border)', padding: '14px', borderRadius: '6px', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', marginBottom: '20px', color: '#00ff88' }}>
              <div style={{ fontWeight: 600, color: '#fff', marginBottom: '6px' }}>Target: {pendingAction.target}</div>
              <div style={{ color: 'var(--text-muted)', marginBottom: '10px' }}>{pendingAction.details}</div>
              <pre style={{ margin: 0, color: '#00ff88', whiteSpace: 'pre-wrap' }}>
                {pendingAction.diff}
              </pre>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button onClick={handleRejectAction} className="btn-ghost" style={{ padding: '8px 18px', color: '#ef4444', borderColor: 'rgba(239,68,68,0.4)' }}>
                <X size={16} />
                <span>Reject & Cancel</span>
              </button>
              <button onClick={handleApproveAction} className="btn-clean" style={{ padding: '8px 20px', background: '#00ff88', color: '#000', fontWeight: 700 }}>
                <Check size={16} />
                <span>Approve & Execute Write</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header Bar */}
      <header className="mac-terminal-bar" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div className="mac-dots">
            <span className="mac-dot red"></span>
            <span className="mac-dot yellow"></span>
            <span className="mac-dot green"></span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="mono" style={{ fontSize: '0.9rem', fontWeight: 800, color: '#fff' }}>
              Olym Browser Companion (OpenBerry Engine)
            </span>
            <span className="human-annotation">
              {/* LOCAL-FIRST & PRIVACY ENFORCED */}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link href="/generator" className="btn-ghost" style={{ fontSize: '0.78rem', padding: '5px 12px' }}>
            SkillForge Studio →
          </Link>
          <Link href="/" className="btn-ghost" style={{ fontSize: '0.78rem', padding: '5px 12px' }}>
            ← Return to App
          </Link>
        </div>
      </header>

      {/* Main Studio Container */}
      <div style={{ flex: 1, padding: '28px', maxWidth: '1520px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
        
        {/* Top Control Strip */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 className="refractive-heading" style={{ fontSize: '2.4rem', fontWeight: 800, lineHeight: 1.1 }}>
              Olym — Agentic Browser Companion
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '4px' }}>
              Open-source, local-first AI companion executing end-to-end knowledge work skills with MCP tool connectors.
            </p>
          </div>

          {/* Model Switcher & Cost Estimator */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              {MODEL_PROVIDERS.map(m => (
                <button
                  key={m.id}
                  onClick={() => setSelectedModel(m)}
                  className={`btn-ghost ${selectedModel.id === m.id ? 'active' : ''}`}
                  style={{
                    fontSize: '0.76rem',
                    padding: '6px 12px',
                    background: selectedModel.id === m.id ? 'rgba(0, 255, 136, 0.15)' : 'transparent',
                    borderColor: selectedModel.id === m.id ? '#00ff88' : 'var(--border)',
                    color: selectedModel.id === m.id ? '#fff' : 'var(--text-muted)'
                  }}
                >
                  <span>{m.name}</span>
                </button>
              ))}
            </div>

            <div className="mono" style={{ fontSize: '0.76rem', background: 'rgba(0,0,0,0.5)', padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--border)', color: '#00ff88' }}>
              Est. Cost: <strong>{costEstimate.cost}</strong>
            </div>
          </div>
        </div>

        {/* Main Workspace Layout (3 Columns) */}
        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr 380px', gap: '20px', alignItems: 'start' }}>
          
          {/* COLUMN 1: Role-Based Launch Skill Library */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Roles Navigation */}
            <div className="liquid-glass-card" style={{ padding: '16px' }}>
              <div className="mono" style={{ fontSize: '0.76rem', color: '#00ff88', fontWeight: 600, marginBottom: '12px' }}>
                1. SELECT ROLE CATALOG
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {SKILL_ROLES.map(r => {
                  const IconComp = r.icon;
                  const isSelected = activeRole.role === r.role;
                  return (
                    <button
                      key={r.role}
                      onClick={() => {
                        setActiveRole(r);
                        setSelectedSkill(r.skills[0]);
                      }}
                      className={`btn-ghost ${isSelected ? 'active' : ''}`}
                      style={{
                        padding: '8px 10px',
                        fontSize: '0.78rem',
                        justifyContent: 'flex-start',
                        background: isSelected ? 'rgba(0, 255, 136, 0.12)' : 'transparent',
                        borderColor: isSelected ? '#00ff88' : 'var(--border)',
                        color: isSelected ? '#fff' : 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <IconComp size={14} style={{ color: isSelected ? '#00ff88' : 'var(--text-muted)' }} />
                      <span>{r.role}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Skills List */}
            <div className="liquid-glass-card" style={{ padding: '16px' }}>
              <div className="mono" style={{ fontSize: '0.76rem', color: '#00ff88', fontWeight: 600, marginBottom: '12px' }}>
                2. SKILLS FOR {activeRole.role.toUpperCase()}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {activeRole.skills.map(s => {
                  const isSelected = selectedSkill.id === s.id;
                  return (
                    <div
                      key={s.id}
                      onClick={() => setSelectedSkill(s)}
                      style={{
                        padding: '10px 12px',
                        borderRadius: 'var(--radius-sm)',
                        border: isSelected ? '1px solid #00ff88' : '1px solid var(--border)',
                        background: isSelected ? 'rgba(0, 255, 136, 0.1)' : 'rgba(18, 18, 26, 0.5)',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ fontWeight: 600, fontSize: '0.84rem', color: isSelected ? '#fff' : 'var(--text-primary)', marginBottom: '4px' }}>
                        {s.title}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', lineHeight: 1.35 }}>
                        {s.desc}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* MCP Connectors Drawer */}
            <div className="liquid-glass-card" style={{ padding: '16px' }}>
              <div className="mono" style={{ fontSize: '0.76rem', color: '#00ff88', fontWeight: 600, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Layers size={14} />
                <span>3. MCP TOOL CONNECTORS</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                {MCP_CONNECTORS.map(conn => (
                  <div
                    key={conn.id}
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid var(--border)',
                      borderRadius: '4px',
                      padding: '6px 8px',
                      fontSize: '0.72rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                    className="mono"
                  >
                    <span>{conn.icon}</span>
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: '#fff' }}>{conn.name.split(' ')[0]}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* COLUMN 2: Browser Frame & Active Execution Workspace */}
          <div className="liquid-glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', minHeight: '680px' }}>
            
            {/* Browser Address Bar Chrome */}
            <div style={{ background: '#0a0a0e', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Globe size={16} style={{ color: '#00ff88' }} />
              <input
                type="text"
                value={browserUrl}
                onChange={(e) => setBrowserUrl(e.target.value)}
                style={{ flex: 1, background: 'transparent', border: 'none', color: '#fff', fontSize: '0.85rem', outline: 'none' }}
                className="mono"
              />

              <button
                onClick={runSkillExecution}
                disabled={isRunning}
                className="btn-clean"
                style={{ padding: '6px 16px', fontSize: '0.78rem', background: '#00ff88', color: '#000', fontWeight: 700 }}
              >
                <Play size={12} />
                <span>{isRunning ? 'Executing...' : 'Run Skill'}</span>
              </button>
            </div>

            {/* Active Context Markdown View */}
            <div style={{ flex: 1, background: '#040406', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
                <span className="mono" style={{ fontSize: '0.78rem', color: '#00ff88', fontWeight: 600 }}>
                  ACTIVE PAGE CONTEXT (MARKDOWN EXTRACTOR)
                </span>
                <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  Readiness: 100% Parsed
                </span>
              </div>

              <div style={{ flex: 1, fontFamily: 'var(--font-mono)', fontSize: '0.84rem', color: '#e4e4e7', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                {pageMarkdown}
              </div>

              {/* Execution Progress Bar */}
              {isRunning && (
                <div style={{ background: 'rgba(0, 255, 136, 0.1)', border: '1px solid rgba(0, 255, 136, 0.3)', padding: '12px', borderRadius: '6px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <RefreshCw size={16} className="glow-pulse" style={{ color: '#00ff88' }} />
                  <div style={{ fontSize: '0.82rem', color: '#00ff88' }} className="mono">
                    Step {currentStep}/3: {currentStep === 1 ? 'Reading Page & Context' : currentStep === 2 ? 'Pulling Tool Data via MCP' : 'Generating Artifact & Citation'}
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* COLUMN 3: Artifact Deliverables & Execution Logs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Execution Log Stream */}
            <div className="liquid-glass-card" style={{ padding: '16px', minHeight: '240px', display: 'flex', flexDirection: 'column' }}>
              <div className="mono" style={{ fontSize: '0.76rem', color: '#00ff88', fontWeight: 600, marginBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
                <span>[ AGENT RUNTIME LOGS ]</span>
                <span className="glow-pulse">● LIVE</span>
              </div>

              <div style={{ flex: 1, background: '#040406', border: '1px solid var(--border)', borderRadius: '4px', padding: '10px', fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-secondary)', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {executionLogs.length === 0 ? (
                  <div style={{ color: 'var(--text-muted)' }}>Select a Skill and click &quot;Run Skill&quot; to start.</div>
                ) : (
                  executionLogs.map((log, idx) => (
                    <div key={idx} style={{ color: idx === executionLogs.length - 1 ? '#00ff88' : '#a1a1aa' }}>
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Generated Artifact Deliverables */}
            <div className="liquid-glass-card" style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span className="mono" style={{ fontSize: '0.76rem', color: '#00ff88', fontWeight: 600 }}>
                  FINISHED DELIVERABLE
                </span>

                <div style={{ display: 'flex', gap: '4px' }}>
                  <button onClick={() => setArtifactTab('report')} className={`pill mono ${artifactTab === 'report' ? 'active' : ''}`} style={{ fontSize: '0.68rem', padding: '2px 6px' }}>
                    <FileText size={10} />
                  </button>
                  <button onClick={() => setArtifactTab('deck')} className={`pill mono ${artifactTab === 'deck' ? 'active' : ''}`} style={{ fontSize: '0.68rem', padding: '2px 6px' }}>
                    <Presentation size={10} />
                  </button>
                  <button onClick={() => setArtifactTab('csv')} className={`pill mono ${artifactTab === 'csv' ? 'active' : ''}`} style={{ fontSize: '0.68rem', padding: '2px 6px' }}>
                    <FileSpreadsheet size={10} />
                  </button>
                </div>
              </div>

              <div style={{ flex: 1, background: '#040406', border: '1px solid var(--border)', borderRadius: '4px', padding: '12px', fontSize: '0.8rem', color: '#fff', overflowY: 'auto' }}>
                {generatedArtifact ? (
                  <div>
                    <div style={{ fontWeight: 700, color: '#00ff88', marginBottom: '8px' }}>{generatedArtifact.title}</div>
                    <pre style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: '0.76rem', whiteSpace: 'pre-wrap', color: '#e4e4e7', lineHeight: 1.5 }}>
                      {generatedArtifact.content}
                    </pre>

                    <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid var(--border)', fontSize: '0.72rem', color: 'var(--text-muted)' }} className="mono">
                      <div>Sources Cited:</div>
                      {generatedArtifact.sources.map(src => (
                        <div key={src} style={{ color: '#818cf8' }}>• {src}</div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                    Artifact will render here after execution (Reports, Decks, Datasets with sources cited).
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
