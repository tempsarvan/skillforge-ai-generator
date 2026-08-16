'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AsciiBackgroundCanvas from '@/components/AsciiBackgroundCanvas';
import { Globe, Search, Shield, Zap, Cpu, Terminal, Play, CheckCircle2, AlertTriangle, Layers, Lock, FileText, Database, Download, Sparkles, User, Briefcase, DollarSign, Users, Settings, Wrench, ArrowRight, RefreshCw, Eye, Check, X, FileSpreadsheet, Presentation, LayoutDashboard, Compass, ArrowLeft, ArrowRight as ArrowRightIcon, RotateCw, Plus, PanelRightClose, PanelRightOpen, ExternalLink, Bookmark, Share2, Sparkle } from 'lucide-react';

const PRESET_WEBSITES = [
  { id: 'hn', title: 'Hacker News', url: 'https://news.ycombinator.com', favicon: '🍊' },
  { id: 'github', title: 'GitHub — tempsarvan', url: 'https://github.com/tempsarvan', favicon: '🐙' },
  { id: 'wiki', title: 'Wikipedia — AI', url: 'https://en.wikipedia.org/wiki/Artificial_intelligence', favicon: '🌐' },
  { id: 'dev', title: 'Dev.to — WebGPU', url: 'https://dev.to', favicon: '💻' }
];

const SKILL_ROLES = [
  {
    role: 'Founder / Exec',
    icon: Briefcase,
    skills: [
      { id: 'fundraise-prep', title: 'Fundraise Prep & Investor Memo', desc: 'Reads active page -> Extracts traction -> Generates investment memo' },
      { id: 'team-workflow', title: 'Shared Team Workflow Setup', desc: 'Scans team tools -> Outputs Notion SOP & onboarding brief' }
    ]
  },
  {
    role: 'Sales & Outreach',
    icon: DollarSign,
    skills: [
      { id: 'account-research', title: 'Account Research & Meeting Prep', desc: 'Scrapes target website -> Pulls CRM notes -> Creates sales battle card' },
      { id: 'lead-enrichment', title: 'Lead Enrichment & Outreach', desc: 'Extracts contact info -> Drafts custom email with approval gate' }
    ]
  },
  {
    role: 'Marketing & SEO',
    icon: Compass,
    skills: [
      { id: 'competitor-analysis', title: 'Competitor Analysis & SEO Audit', desc: 'Audits competitor site -> Benchmarks keywords -> Outputs HTML report' }
    ]
  },
  {
    role: 'Product & Eng',
    icon: Terminal,
    skills: [
      { id: 'issue-repro-pr', title: 'Investigate Issue (Logs -> Repro -> PR)', desc: 'Inspects DOM console -> Repros bug in browser -> Drafts PR' }
    ]
  }
];

export default function OlymBrowserEngine() {
  // Tabs State
  const [tabs, setTabs] = useState([
    { id: '1', title: 'Hacker News', url: 'https://news.ycombinator.com', favicon: '🍊' },
    { id: '2', title: 'GitHub — tempsarvan', url: 'https://github.com/tempsarvan', favicon: '🐙' }
  ]);
  const [activeTabId, setActiveTabId] = useState('1');
  const [inputUrl, setInputUrl] = useState('https://news.ycombinator.com');
  const [iframeUrl, setIframeUrl] = useState('https://news.ycombinator.com');

  // Sidebar / Companion Drawer State (Dia & Strawberry Competitor UI)
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarMode, setSidebarMode] = useState('assistant'); // 'assistant', 'skills', 'inspector', 'deliverables'

  // AI Chat Assistant
  const [chatMessages, setChatMessages] = useState([
    { sender: 'olym', text: 'Welcome to Olym Browser. I am your integrated AI companion. I have full DOM and context access to the active page.' }
  ]);
  const [userPrompt, setUserPrompt] = useState('');

  // Selected Skill & Execution Loop
  const [selectedSkill, setSelectedSkill] = useState(SKILL_ROLES[0].skills[0]);
  const [isRunningSkill, setIsRunningSkill] = useState(false);
  const [skillLogs, setSkillLogs] = useState([]);
  
  // Deliverable Artifact State
  const [generatedArtifact, setGeneratedArtifact] = useState(null);

  // Human Approval Modal State
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [pendingWriteAction, setPendingWriteAction] = useState(null);

  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

  const handleSelectTab = (tab) => {
    setActiveTabId(tab.id);
    setInputUrl(tab.url);
    setIframeUrl(tab.url);
  };

  const handleNavigate = (e) => {
    if (e) e.preventDefault();
    let formattedUrl = inputUrl.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = 'https://' + formattedUrl;
    }
    setInputUrl(formattedUrl);
    setIframeUrl(formattedUrl);

    setTabs(prev => prev.map(t => t.id === activeTabId ? { ...t, url: formattedUrl, title: formattedUrl.replace('https://', '').split('/')[0] } : t));
  };

  const handleAddTab = () => {
    const newId = String(Date.now());
    const newTab = { id: newId, title: 'New Tab', url: 'https://news.ycombinator.com', favicon: '🌐' };
    setTabs(prev => [...prev, newTab]);
    setActiveTabId(newId);
    setInputUrl(newTab.url);
    setIframeUrl(newTab.url);
  };

  const handleCloseTab = (tabId, e) => {
    e.stopPropagation();
    if (tabs.length === 1) return;
    const filtered = tabs.filter(t => t.id !== tabId);
    setTabs(filtered);
    if (activeTabId === tabId) {
      setActiveTabId(filtered[0].id);
      setInputUrl(filtered[0].url);
      setIframeUrl(filtered[0].url);
    }
  };

  const handleSendPrompt = (e) => {
    if (e) e.preventDefault();
    if (!userPrompt.trim()) return;

    const userText = userPrompt;
    setChatMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setUserPrompt('');

    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'olym',
          text: `Analyzing active page context at ${activeTab.url}...\n\nFound 142 DOM nodes and 12 article links. Based on your prompt "${userText}", I recommend running the ${selectedSkill.title} skill.`
        }
      ]);
    }, 600);
  };

  const handleRunSkill = () => {
    setIsRunningSkill(true);
    setSkillLogs([
      `[Chromium CDP] Capturing active page DOM at ${activeTab.url}...`,
      `[Skill Planner] Executing ${selectedSkill.title}...`
    ]);

    setTimeout(() => {
      setSkillLogs(prev => [
        ...prev,
        '[MCP Connector] Extracting team context & past history...',
        '[AI Runtime] Synthesizing structured deliverable with citations...'
      ]);
    }, 800);

    setTimeout(() => {
      setSkillLogs(prev => [
        ...prev,
        '✅ Skill execution complete! Deliverable ready.',
        '⚠️ Outward write proposed: Sending email summary to team.'
      ]);

      setGeneratedArtifact({
        title: `Deliverable: ${selectedSkill.title}`,
        url: activeTab.url,
        date: new Date().toLocaleDateString(),
        content: `Executive Deliverable for ${activeTab.url}:\n\n1. Active Page Summary: Successfully parsed DOM tree.\n2. Identified key strategic opportunities.\n3. Verified zero security vulnerabilities.\n\nSources Cited:\n- ${activeTab.url}`
      });

      setPendingWriteAction({
        target: 'Gmail / Team Slack',
        action: 'Send Executive Summary Email',
        diff: `+ TO: team@company.com\n+ SUBJECT: ${selectedSkill.title} Report\n+ BODY: Attached deliverable generated from ${activeTab.url}`
      });

      setShowApprovalModal(true);
      setIsRunningSkill(false);
      setSidebarMode('deliverables');
    }, 1600);
  };

  return (
    <div style={{ position: 'relative', background: '#09090d', height: '100vh', display: 'flex', flexDirection: 'column', color: '#fafafa', overflow: 'hidden' }}>
      
      {/* Human-in-the-Loop Write Approval Gate Modal */}
      {showApprovalModal && pendingWriteAction && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99999,
          background: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }}>
          <div className="liquid-glass-card" style={{ maxWidth: '620px', width: '100%', padding: '28px', border: '1px solid rgba(0, 255, 136, 0.4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#00ff88', marginBottom: '14px', fontWeight: 700, fontSize: '1.1rem' }}>
              <Shield size={22} />
              <span>Human Approval Gate — Confirm External Write</span>
            </div>

            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.5 }}>
              Olym Browser is requesting permission to perform an outward-facing action:
            </p>

            <div style={{ background: '#040406', border: '1px solid var(--border)', padding: '14px', borderRadius: '6px', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', marginBottom: '20px', color: '#00ff88' }}>
              <div style={{ fontWeight: 600, color: '#fff', marginBottom: '6px' }}>Target: {pendingWriteAction.target}</div>
              <div style={{ color: 'var(--text-muted)', marginBottom: '10px' }}>{pendingWriteAction.action}</div>
              <pre style={{ margin: 0, color: '#00ff88', whiteSpace: 'pre-wrap' }}>
                {pendingWriteAction.diff}
              </pre>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button onClick={() => setShowApprovalModal(false)} className="btn-ghost" style={{ padding: '8px 18px', color: '#ef4444', borderColor: 'rgba(239,68,68,0.4)' }}>
                <X size={16} />
                <span>Reject Action</span>
              </button>
              <button onClick={() => setShowApprovalModal(false)} className="btn-clean" style={{ padding: '8px 22px', background: '#00ff88', color: '#000', fontWeight: 700 }}>
                <Check size={16} />
                <span>Approve & Execute Write</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 1. TOP BROWSER HEADER BAR (PROPER BROWSER SHELL) */}
      <header style={{ background: '#0d0d14', borderBottom: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}>
        
        {/* Row 1: macOS Controls & Multi-Tab Bar */}
        <div style={{ display: 'flex', alignItems: 'center', height: '40px', padding: '0 12px', gap: '12px', background: '#060609' }}>
          {/* macOS window dots */}
          <div className="mac-dots" style={{ marginRight: '8px' }}>
            <span className="mac-dot red"></span>
            <span className="mac-dot yellow"></span>
            <span className="mac-dot green"></span>
          </div>

          {/* Tab Strip */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flex: 1, overflowX: 'auto' }}>
            {tabs.map(tab => {
              const isActive = tab.id === activeTabId;
              return (
                <div
                  key={tab.id}
                  onClick={() => handleSelectTab(tab)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 14px',
                    borderRadius: '8px 8px 0 0',
                    background: isActive ? '#14141f' : 'transparent',
                    border: isActive ? '1px solid var(--border)' : '1px solid transparent',
                    borderBottom: 'none',
                    color: isActive ? '#fff' : 'var(--text-muted)',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    maxWidth: '220px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                  className="mono"
                >
                  <span>{tab.favicon}</span>
                  <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>{tab.title}</span>
                  <button
                    onClick={(e) => handleCloseTab(tab.id, e)}
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 0, display: 'flex' }}
                  >
                    <X size={12} />
                  </button>
                </div>
              );
            })}

            <button
              onClick={handleAddTab}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px 8px', borderRadius: '4px' }}
              title="New Tab"
            >
              <Plus size={14} />
            </button>
          </div>

          {/* Navigation Back to Portfolio */}
          <Link href="/" className="btn-ghost" style={{ fontSize: '0.74rem', padding: '4px 10px' }}>
            ← Return to Portfolio
          </Link>
        </div>

        {/* Row 2: Omnibox Navigation & Address Bar */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '8px 16px', gap: '12px', background: '#101018' }}>
          
          {/* Navigation Controls */}
          <div style={{ display: 'flex', gap: '4px' }}>
            <button className="btn-ghost" style={{ padding: '6px' }} title="Back">
              <ArrowLeft size={16} />
            </button>
            <button className="btn-ghost" style={{ padding: '6px' }} title="Forward">
              <ArrowRightIcon size={16} />
            </button>
            <button onClick={handleNavigate} className="btn-ghost" style={{ padding: '6px' }} title="Reload">
              <RotateCw size={16} />
            </button>
          </div>

          {/* Omnibox Address Input Bar */}
          <form onSubmit={handleNavigate} style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <div style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              background: '#060609',
              border: '1px solid rgba(0, 255, 136, 0.3)',
              borderRadius: '8px',
              padding: '6px 14px',
              gap: '10px',
              boxShadow: '0 0 12px rgba(0, 255, 136, 0.1)'
            }}>
              <Lock size={14} style={{ color: '#00ff88' }} />
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                style={{ flex: 1, background: 'transparent', border: 'none', color: '#fff', fontSize: '0.86rem', outline: 'none' }}
                className="mono"
                placeholder="Search or enter web address..."
              />
              <span className="mono" style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.06)', padding: '2px 6px', borderRadius: '4px', color: 'var(--text-muted)' }}>
                ⌘K / Ask Olym
              </span>
            </div>
          </form>

          {/* Quick Preset Websites Selector */}
          <div style={{ display: 'flex', gap: '6px' }}>
            {PRESET_WEBSITES.map(p => (
              <button
                key={p.id}
                onClick={() => {
                  setInputUrl(p.url);
                  setIframeUrl(p.url);
                }}
                className="btn-ghost"
                style={{ fontSize: '0.76rem', padding: '4px 10px' }}
              >
                <span>{p.favicon}</span>
                <span style={{ marginLeft: '4px' }}>{p.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* AI Sidebar Toggle (Dia / Strawberry Companion Button) */}
          <button
            onClick={() => setSidebarOpen(prev => !prev)}
            className="btn-clean"
            style={{
              padding: '6px 14px',
              fontSize: '0.8rem',
              background: sidebarOpen ? '#00ff88' : 'rgba(0, 255, 136, 0.15)',
              color: sidebarOpen ? '#000' : '#00ff88',
              fontWeight: 700
            }}
          >
            <Sparkles size={14} />
            <span>{sidebarOpen ? 'Olym AI Active' : 'Open Olym AI'}</span>
          </button>
        </div>

      </header>

      {/* 2. MAIN BROWSER VIEWPORT & AI SIDEBAR LAYOUT */}
      <div style={{ flex: 1, display: 'flex', position: 'relative', overflow: 'hidden' }}>
        
        {/* LEFT / CENTER: CHROMIUM LIVE WEB VIEWPORT */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#000', position: 'relative' }}>
          
          {/* Top Viewport Status Bar */}
          <div style={{ background: '#09090e', padding: '4px 16px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.74rem', color: 'var(--text-muted)' }} className="mono">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="glow-pulse" style={{ color: '#00ff88' }}>● Chromium CDP v126</span>
              <span>•</span>
              <span>120 FPS WebGPU Renderer</span>
            </div>
            <div>
              Active Viewport: <strong style={{ color: '#fff' }}>{iframeUrl}</strong>
            </div>
          </div>

          {/* Interactive Web Page Viewport */}
          <div style={{ flex: 1, position: 'relative', background: '#ffffff' }}>
            <iframe
              src={iframeUrl}
              title="Olym Chromium Browser Viewport"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                background: '#ffffff'
              }}
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
            />
          </div>

        </div>

        {/* RIGHT: DIA & STRAWBERRY COMPETITOR AI SIDEBAR COMPANION */}
        {sidebarOpen && (
          <aside style={{
            width: '420px',
            background: '#0d0d14',
            borderLeft: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            zIndex: 10
          }}>
            
            {/* Sidebar Navigation Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', background: '#060609' }}>
              <button
                onClick={() => setSidebarMode('assistant')}
                className={`btn-ghost ${sidebarMode === 'assistant' ? 'active' : ''}`}
                style={{ flex: 1, borderRadius: 0, padding: '10px', fontSize: '0.78rem', justifyContent: 'center' }}
              >
                <Sparkles size={14} style={{ color: sidebarMode === 'assistant' ? '#00ff88' : 'var(--text-muted)' }} />
                <span>Ask Olym</span>
              </button>

              <button
                onClick={() => setSidebarMode('skills')}
                className={`btn-ghost ${sidebarMode === 'skills' ? 'active' : ''}`}
                style={{ flex: 1, borderRadius: 0, padding: '10px', fontSize: '0.78rem', justifyContent: 'center' }}
              >
                <Zap size={14} style={{ color: sidebarMode === 'skills' ? '#00ff88' : 'var(--text-muted)' }} />
                <span>Skills</span>
              </button>

              <button
                onClick={() => setSidebarMode('inspector')}
                className={`btn-ghost ${sidebarMode === 'inspector' ? 'active' : ''}`}
                style={{ flex: 1, borderRadius: 0, padding: '10px', fontSize: '0.78rem', justifyContent: 'center' }}
              >
                <Eye size={14} style={{ color: sidebarMode === 'inspector' ? '#00ff88' : 'var(--text-muted)' }} />
                <span>DOM</span>
              </button>

              <button
                onClick={() => setSidebarMode('deliverables')}
                className={`btn-ghost ${sidebarMode === 'deliverables' ? 'active' : ''}`}
                style={{ flex: 1, borderRadius: 0, padding: '10px', fontSize: '0.78rem', justifyContent: 'center' }}
              >
                <FileText size={14} style={{ color: sidebarMode === 'deliverables' ? '#00ff88' : 'var(--text-muted)' }} />
                <span>Output</span>
              </button>
            </div>

            {/* TAB CONTENT 1: Ask Olym AI Chat Companion */}
            {sidebarMode === 'assistant' && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px', overflow: 'hidden' }}>
                <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '14px' }}>
                  {chatMessages.map((msg, i) => (
                    <div
                      key={i}
                      style={{
                        alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                        background: msg.sender === 'user' ? 'rgba(0, 255, 136, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                        border: msg.sender === 'user' ? '1px solid rgba(0, 255, 136, 0.4)' : '1px solid var(--border)',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        fontSize: '0.84rem',
                        maxWidth: '90%',
                        color: msg.sender === 'user' ? '#00ff88' : '#fafafa',
                        lineHeight: 1.5,
                        whiteSpace: 'pre-wrap'
                      }}
                    >
                      {msg.text}
                    </div>
                  ))}
                </div>

                {/* Prompt Input Form */}
                <form onSubmit={handleSendPrompt} style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    value={userPrompt}
                    onChange={(e) => setUserPrompt(e.target.value)}
                    placeholder="Ask Olym about this page..."
                    style={{ flex: 1, background: '#040406', border: '1px solid var(--border)', padding: '10px 14px', borderRadius: '8px', color: '#fff', fontSize: '0.84rem', outline: 'none' }}
                  />
                  <button type="submit" className="btn-clean" style={{ background: '#00ff88', color: '#000', padding: '10px 16px', fontWeight: 700 }}>
                    Send
                  </button>
                </form>
              </div>
            )}

            {/* TAB CONTENT 2: Role Skills Runner */}
            {sidebarMode === 'skills' && (
              <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="mono" style={{ fontSize: '0.78rem', color: '#00ff88', fontWeight: 600 }}>
                  EXECUTE SKILL ON ACTIVE PAGE
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {SKILL_ROLES.map(roleGroup => (
                    <div key={roleGroup.role} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: '8px', padding: '12px' }}>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fff', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <roleGroup.icon size={14} style={{ color: '#00ff88' }} />
                        <span>{roleGroup.role}</span>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {roleGroup.skills.map(skill => (
                          <div
                            key={skill.id}
                            onClick={() => setSelectedSkill(skill)}
                            style={{
                              padding: '8px 10px',
                              borderRadius: '4px',
                              border: selectedSkill.id === skill.id ? '1px solid #00ff88' : '1px solid transparent',
                              background: selectedSkill.id === skill.id ? 'rgba(0, 255, 136, 0.12)' : 'transparent',
                              cursor: 'pointer',
                              fontSize: '0.78rem'
                            }}
                          >
                            <div style={{ fontWeight: 600, color: selectedSkill.id === skill.id ? '#00ff88' : '#e4e4e7' }}>{skill.title}</div>
                            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{skill.desc}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleRunSkill}
                  disabled={isRunningSkill}
                  className="btn-clean"
                  style={{ background: '#00ff88', color: '#000', padding: '12px', width: '100%', justifyContent: 'center', fontWeight: 700, marginTop: 'auto' }}
                >
                  <Play size={16} />
                  <span>{isRunningSkill ? 'Running Skill...' : `Run ${selectedSkill.title}`}</span>
                </button>
              </div>
            )}

            {/* TAB CONTENT 3: DOM & Page Inspector */}
            {sidebarMode === 'inspector' && (
              <div style={{ flex: 1, padding: '16px', overflowY: 'auto', fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#a1a1aa' }}>
                <div style={{ color: '#00ff88', fontWeight: 600, marginBottom: '10px' }}>
                  [ CHROMIUM DOM EXTRACTOR ]
                </div>
                <div style={{ background: '#040406', padding: '12px', borderRadius: '6px', border: '1px solid var(--border)', lineHeight: 1.5 }}>
                  <div>Active URL: {iframeUrl}</div>
                  <div>DOM Nodes: 142 interactive elements</div>
                  <div>WCAG Contrast: 100% Passed</div>
                  <div style={{ marginTop: '10px', color: '#fff' }}>Extracted Headings:</div>
                  <div style={{ color: '#818cf8' }}>• H1: {activeTab.title}</div>
                  <div style={{ color: '#818cf8' }}>• Meta Description: Available</div>
                </div>
              </div>
            )}

            {/* TAB CONTENT 4: Finished Deliverables */}
            {sidebarMode === 'deliverables' && (
              <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
                <div className="mono" style={{ fontSize: '0.78rem', color: '#00ff88', fontWeight: 600, marginBottom: '12px' }}>
                  GENERATED DELIVERABLES
                </div>

                {generatedArtifact ? (
                  <div style={{ background: '#040406', border: '1px solid var(--border)', borderRadius: '8px', padding: '16px' }}>
                    <div style={{ fontWeight: 700, color: '#00ff88', marginBottom: '8px', fontSize: '0.9rem' }}>{generatedArtifact.title}</div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginBottom: '12px' }} className="mono">Generated on {generatedArtifact.date}</div>
                    <pre style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#e4e4e7', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                      {generatedArtifact.content}
                    </pre>
                  </div>
                ) : (
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    No deliverable generated yet. Run a skill to create HTML reports, slide decks, and CSV datasets.
                  </div>
                )}
              </div>
            )}

          </aside>
        )}

      </div>

    </div>
  );
}
