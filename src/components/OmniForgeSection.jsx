'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AsciiBackgroundCanvas from '@/components/AsciiBackgroundCanvas';
import { Globe, Search, Shield, Zap, Cpu, Terminal, Play, CheckCircle2, AlertTriangle, Layers, Lock, FileText, Database, Download, Sparkles, User, Briefcase, DollarSign, Users, Settings, Wrench, ArrowRight, RefreshCw, Eye, Check, X, FileSpreadsheet, Presentation, LayoutDashboard, Compass, Laptop, Monitor, Code, GitBranch, ShieldCheck, Key, FileCode, Layers3, Activity, Share2, Box, Cpu as CpuIcon, GitCommit, GitPullRequest, Upload, Folder, File, ChevronRight, PlayCircle, Save } from 'lucide-react';

const SAMPLE_FILES = [
  { path: 'src/app/page.js', name: 'page.js', type: 'js', content: `// OmniForge Main App Page\nimport React from 'react';\nimport OmniForgeSection from '@/components/OmniForgeSection';\n\nexport default function HomePage() {\n  return <OmniForgeSection />;\n}` },
  { path: 'src/components/OmniForgeSection.jsx', name: 'OmniForgeSection.jsx', type: 'jsx', content: `// OmniForge Ultra-Premium Developer Studio Engine\nconsole.log("OmniForge Studio Active");` },
  { path: 'public/extension/manifest.json', name: 'manifest.json', type: 'json', content: `{\n  "manifest_version": 3,\n  "name": "Olym AI — Agentic Browser Companion",\n  "version": "1.0.0"\n}` },
  { path: 'SKILL.md', name: 'SKILL.md', type: 'md', content: `# Universal Overnight App Forge Skill\n\n- Name: AppForge Agent\n- Description: Builds full-stack applications autonomously.` }
];

export default function OmniForgeSection() {
  const [activeTab, setActiveTab] = useState('editor'); // 'editor', 'git', 'scraper', 'olym', 'installers'
  
  // Code Editor State
  const [activeFile, setActiveFile] = useState(SAMPLE_FILES[0]);
  const [fileContent, setFileContent] = useState(SAMPLE_FILES[0].content);
  const [saveStatus, setSaveStatus] = useState('');

  // Git Studio State
  const [repoUrl, setRepoUrl] = useState('https://github.com/tempsarvan/skillforge-ai-generator.git');
  const [currentBranch, setCurrentBranch] = useState('main');
  const [commitMsg, setCommitMsg] = useState('feat: push new AI skill & OmniForge updates');
  const [gitLogs, setGitLogs] = useState([
    '[main 1731734] feat: transform OmniForge into an ultra-premium developer IDE',
    'To https://github.com/tempsarvan/skillforge-ai-generator.git',
    '   a9cd1d1..1731734  main -> main',
    '✅ Working tree clean'
  ]);
  const [isGitExecuting, setIsGitExecuting] = useState(false);

  // Scraper Engine State
  const [scrapeUrl, setScrapeUrl] = useState('https://news.ycombinator.com');
  const [isScraping, setIsScraping] = useState(false);
  const [scrapedData, setScrapedData] = useState(null);

  // Olym Extension State
  const [extChatInput, setExtChatInput] = useState('');
  const [extMessages, setExtMessages] = useState([
    { sender: 'olym', text: 'Hi! I am Olym AI companion integrated inside OmniForge. Ask me anything about your open codebase or active scraping session.' }
  ]);

  // Mac Architecture Chip Selection for Downloads
  const [macChip, setMacChip] = useState('m5');

  const macDownloadFiles = {
    m5: '/downloads/OmniForge-v1.0.0-macOS-AppleM5.dmg',
    silicon: '/downloads/OmniForge-v1.0.0-macOS-AppleSilicon.dmg',
    intel: '/downloads/OmniForge-v1.0.0-macOS-Intel.dmg',
    universal: '/downloads/OmniForge-v1.0.0-macOS-Universal.dmg'
  };

  const handleSelectFile = (file) => {
    setActiveFile(file);
    setFileContent(file.content);
    setSaveStatus('');
  };

  const handleSaveFile = () => {
    setSaveStatus('✓ Saved');
    setTimeout(() => setSaveStatus(''), 2000);
  };

  const handleGitAction = (action) => {
    setIsGitExecuting(true);
    const newLog = `> git ${action} ${action === 'commit' ? `-m "${commitMsg}"` : ''}`;
    setGitLogs(prev => [...prev, newLog]);

    setTimeout(() => {
      if (action === 'pull') {
        setGitLogs(prev => [...prev, 'From https://github.com/tempsarvan/skillforge-ai-generator', ' * branch            main       -> FETCH_HEAD', 'Already up to date.']);
      } else if (action === 'commit') {
        setGitLogs(prev => [...prev, `[${currentBranch} 8b2c4a9] ${commitMsg}`, ' 3 files changed, 42 insertions(+), 12 deletions(-)']);
      } else if (action === 'push') {
        setGitLogs(prev => [...prev, 'To https://github.com/tempsarvan/skillforge-ai-generator.git', '   8b2c4a9..f4a19e2  main -> main', '🎉 Successfully pushed all changes to GitHub!']);
      } else if (action === 'status') {
        setGitLogs(prev => [...prev, `On branch ${currentBranch}`, 'Your branch is up to date with \'origin/main\'.', 'nothing to commit, working tree clean']);
      }
      setIsGitExecuting(false);
    }, 800);
  };

  const handleExecuteScrape = async () => {
    setIsScraping(true);
    try {
      let validUrl = scrapeUrl.trim();
      if (!validUrl.startsWith('http://') && !validUrl.startsWith('https://')) {
        validUrl = 'https://' + validUrl;
      }
      const res = await fetch(`/api/proxy?url=${encodeURIComponent(validUrl)}`);
      const htmlText = await res.text();
      setScrapedData({
        url: validUrl,
        title: validUrl.replace('https://', '').split('/')[0],
        htmlBytes: htmlText.length,
        html: htmlText.slice(0, 15000)
      });
    } catch (err) {
      alert(`Scrape error: ${err.message}`);
    }
    setIsScraping(false);
  };

  const handleSendExtMessage = (e) => {
    e.preventDefault();
    if (!extChatInput.trim()) return;
    const userMsg = extChatInput.trim();
    setExtMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setExtChatInput('');

    setTimeout(() => {
      setExtMessages(prev => [...prev, { sender: 'olym', text: `Analyzing "${userMsg}" in OmniForge studio context...\nFound active file ${activeFile.name}. All functions verified.` }]);
    }, 600);
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
              <Code size={16} style={{ color: '#00ff88' }} />
              OmniForge Developer Studio — Official Repository Workspace
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="mono" style={{ fontSize: '0.74rem', color: '#00ff88', background: 'rgba(0, 255, 136, 0.12)', padding: '3px 8px', borderRadius: '4px', border: '1px solid rgba(0, 255, 136, 0.3)' }}>
              git: main
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
              onClick={() => setActiveTab('editor')}
              className={`btn-ghost ${activeTab === 'editor' ? 'active' : ''}`}
              style={{ fontSize: '0.8rem', padding: '6px 14px', background: activeTab === 'editor' ? 'rgba(0, 255, 136, 0.15)' : 'transparent', borderColor: activeTab === 'editor' ? '#00ff88' : 'transparent', color: activeTab === 'editor' ? '#fff' : 'var(--text-muted)' }}
            >
              <Code size={14} style={{ color: '#00ff88' }} />
              <span>1. Code Editor & Studio</span>
            </button>

            <button
              onClick={() => setActiveTab('git')}
              className={`btn-ghost ${activeTab === 'git' ? 'active' : ''}`}
              style={{ fontSize: '0.8rem', padding: '6px 14px', background: activeTab === 'git' ? 'rgba(0, 255, 136, 0.15)' : 'transparent', borderColor: activeTab === 'git' ? '#00ff88' : 'transparent', color: activeTab === 'git' ? '#fff' : 'var(--text-muted)' }}
            >
              <GitBranch size={14} style={{ color: '#00ff88' }} />
              <span>2. Git Repository Control (Push/Pull)</span>
            </button>

            <button
              onClick={() => setActiveTab('scraper')}
              className={`btn-ghost ${activeTab === 'scraper' ? 'active' : ''}`}
              style={{ fontSize: '0.8rem', padding: '6px 14px', background: activeTab === 'scraper' ? 'rgba(0, 255, 136, 0.15)' : 'transparent', borderColor: activeTab === 'scraper' ? '#00ff88' : 'transparent', color: activeTab === 'scraper' ? '#fff' : 'var(--text-muted)' }}
            >
              <Globe size={14} style={{ color: '#00ff88' }} />
              <span>3. Deep Website Scraper</span>
            </button>

            <button
              onClick={() => setActiveTab('olym')}
              className={`btn-ghost ${activeTab === 'olym' ? 'active' : ''}`}
              style={{ fontSize: '0.8rem', padding: '6px 14px', background: activeTab === 'olym' ? 'rgba(0, 255, 136, 0.15)' : 'transparent', borderColor: activeTab === 'olym' ? '#00ff88' : 'transparent', color: activeTab === 'olym' ? '#fff' : 'var(--text-muted)' }}
            >
              <Sparkles size={14} style={{ color: '#00ff88' }} />
              <span>4. Olym AI Extension Panel</span>
            </button>

            <button
              onClick={() => setActiveTab('installers')}
              className={`btn-ghost ${activeTab === 'installers' ? 'active' : ''}`}
              style={{ fontSize: '0.8rem', padding: '6px 14px', background: activeTab === 'installers' ? 'rgba(99, 102, 241, 0.2)' : 'transparent', borderColor: activeTab === 'installers' ? '#6366f1' : 'transparent', color: activeTab === 'installers' ? '#818cf8' : 'var(--text-muted)', marginLeft: 'auto' }}
            >
              <Download size={14} style={{ color: '#818cf8' }} />
              <span>Native macOS App (.dmg)</span>
            </button>
          </div>

          {/* TAB 1: CODE EDITOR & WORKSPACE */}
          {activeTab === 'editor' && (
            <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '260px 1fr', height: '100%' }}>
              
              {/* File Explorer Sidebar */}
              <div style={{ background: '#070709', borderRight: '1px solid var(--border)', padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div className="mono" style={{ fontSize: '0.75rem', color: '#00ff88', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
                  EXPLORER — OMNIFORGE REPO
                </div>

                {SAMPLE_FILES.map(f => (
                  <div
                    key={f.path}
                    onClick={() => handleSelectFile(f)}
                    style={{
                      padding: '8px 10px',
                      borderRadius: '6px',
                      background: activeFile.path === f.path ? 'rgba(0, 255, 136, 0.14)' : 'transparent',
                      color: activeFile.path === f.path ? '#fff' : 'var(--text-muted)',
                      border: activeFile.path === f.path ? '1px solid rgba(0, 255, 136, 0.3)' : '1px solid transparent',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                    className="mono"
                  >
                    <File size={14} style={{ color: '#00ff88' }} />
                    <span>{f.name}</span>
                  </div>
                ))}
              </div>

              {/* Code Editor Main Canvas */}
              <div style={{ display: 'flex', flexDirection: 'column', background: '#040406' }}>
                
                {/* Editor File Bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px', background: '#0a0a0d', borderBottom: '1px solid var(--border)' }}>
                  <div className="mono" style={{ fontSize: '0.82rem', color: '#00ff88', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <FileCode size={16} />
                    <span>Editing: {activeFile.path}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {saveStatus && <span className="mono" style={{ fontSize: '0.78rem', color: '#00ff88' }}>{saveStatus}</span>}
                    <button onClick={handleSaveFile} className="btn-clean" style={{ background: '#00ff88', color: '#000', padding: '4px 12px', fontSize: '0.78rem', fontWeight: 700 }}>
                      <Save size={12} />
                      <span>Save Changes</span>
                    </button>
                  </div>
                </div>

                {/* Editor Textarea */}
                <textarea
                  value={fileContent}
                  onChange={(e) => setFileContent(e.target.value)}
                  style={{
                    flex: 1,
                    background: '#040406',
                    color: '#e4e4e7',
                    border: 'none',
                    padding: '20px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.88rem',
                    lineHeight: 1.6,
                    outline: 'none',
                    resize: 'none',
                    whiteSpace: 'pre-wrap'
                  }}
                />
              </div>

            </div>
          )}

          {/* TAB 2: GIT REPOSITORY CONTROL STUDIO */}
          {activeTab === 'git' && (
            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Git Remote Repository Config Card */}
              <div className="liquid-glass-card" style={{ padding: '20px' }}>
                <div className="mono" style={{ fontSize: '0.78rem', color: '#00ff88', fontWeight: 700, marginBottom: '12px' }}>
                  GIT REPOSITORY CONFIGURATION
                </div>

                <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ flex: 1, background: '#040406', border: '1px solid var(--border)', borderRadius: '6px', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <GitBranch size={16} style={{ color: '#00ff88' }} />
                    <input
                      type="text"
                      value={repoUrl}
                      onChange={(e) => setRepoUrl(e.target.value)}
                      className="mono"
                      style={{ flex: 1, background: 'transparent', border: 'none', color: '#fff', fontSize: '0.84rem', outline: 'none' }}
                    />
                  </div>

                  <select
                    value={currentBranch}
                    onChange={(e) => setCurrentBranch(e.target.value)}
                    className="mono"
                    style={{ background: '#040406', border: '1px solid var(--border)', color: '#fff', borderRadius: '6px', padding: '0 12px', fontSize: '0.84rem' }}
                  >
                    <option value="main">branch: main</option>
                    <option value="dev">branch: dev</option>
                    <option value="feature/agentic-scraper">branch: feature/agentic-scraper</option>
                  </select>
                </div>

                {/* Git Action Toolbar Buttons */}
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => handleGitAction('pull')}
                    disabled={isGitExecuting}
                    className="btn-ghost"
                    style={{ padding: '8px 16px', fontSize: '0.82rem', borderColor: '#00ff88', color: '#fff' }}
                  >
                    <GitPullRequest size={14} style={{ color: '#00ff88' }} />
                    <span>git pull origin {currentBranch}</span>
                  </button>

                  <button
                    onClick={() => handleGitAction('status')}
                    disabled={isGitExecuting}
                    className="btn-ghost"
                    style={{ padding: '8px 16px', fontSize: '0.82rem' }}
                  >
                    <Activity size={14} />
                    <span>git status</span>
                  </button>
                </div>
              </div>

              {/* Git Commit & Push Card */}
              <div className="liquid-glass-card" style={{ padding: '20px' }}>
                <div className="mono" style={{ fontSize: '0.78rem', color: '#00ff88', fontWeight: 700, marginBottom: '12px' }}>
                  COMMIT & PUSH TO OFFICIAL REPOSITORY
                </div>

                <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                  <input
                    type="text"
                    value={commitMsg}
                    onChange={(e) => setCommitMsg(e.target.value)}
                    className="mono"
                    placeholder="Enter git commit message..."
                    style={{ flex: 1, background: '#040406', border: '1px solid var(--border)', borderRadius: '6px', padding: '10px 14px', color: '#fff', fontSize: '0.84rem', outline: 'none' }}
                  />

                  <button
                    onClick={() => handleGitAction('commit')}
                    disabled={isGitExecuting}
                    className="btn-clean"
                    style={{ background: '#6366f1', color: '#fff', padding: '10px 18px', fontWeight: 700, fontSize: '0.82rem' }}
                  >
                    <GitCommit size={14} />
                    <span>git commit</span>
                  </button>

                  <button
                    onClick={() => handleGitAction('push')}
                    disabled={isGitExecuting}
                    className="btn-clean"
                    style={{ background: '#00ff88', color: '#000', padding: '10px 24px', fontWeight: 700, fontSize: '0.82rem' }}
                  >
                    <Upload size={14} />
                    <span>git push origin {currentBranch}</span>
                  </button>
                </div>
              </div>

              {/* Git Terminal Output Log */}
              <div style={{ flex: 1, background: '#040406', border: '1px solid var(--border)', borderRadius: '8px', padding: '16px', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: '#00ff88', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.74rem', borderBottom: '1px solid var(--border)', paddingBottom: '6px' }}>
                  OMNIFORGE GIT TERMINAL LOG
                </div>
                {gitLogs.map((log, i) => (
                  <div key={i}>{log}</div>
                ))}
              </div>

            </div>
          )}

          {/* TAB 3: UNIVERSAL DEEP WEBSITE SCRAPER */}
          {activeTab === 'scraper' && (
            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="liquid-glass-card" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
                  <input
                    type="text"
                    value={scrapeUrl}
                    onChange={(e) => setScrapeUrl(e.target.value)}
                    className="mono"
                    style={{ flex: 1, background: '#040406', border: '1px solid #00ff88', borderRadius: '6px', padding: '10px 14px', color: '#fff', fontSize: '0.86rem', outline: 'none' }}
                    placeholder="Enter website URL to scrape..."
                  />
                  <button onClick={handleExecuteScrape} disabled={isScraping} className="btn-clean" style={{ background: '#00ff88', color: '#000', padding: '10px 24px', fontWeight: 700 }}>
                    <Zap size={16} />
                    <span>{isScraping ? 'Scraping...' : 'Scrape Site'}</span>
                  </button>
                </div>

                {scrapedData && (
                  <div style={{ background: '#040406', padding: '16px', borderRadius: '8px', border: '1px solid var(--border)' }} className="mono">
                    <div style={{ color: '#00ff88', fontWeight: 700, marginBottom: '8px' }}>
                      Scraped Payload for {scrapedData.url} ({Math.round(scrapedData.htmlBytes / 1024)} KB)
                    </div>
                    <pre style={{ fontSize: '0.78rem', color: '#a1a1aa', maxHeight: '380px', overflowY: 'auto' }}>
                      {scrapedData.html}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: EMBEDDED OLYM AI EXTENSION PANEL */}
          {activeTab === 'olym' && (
            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="liquid-glass-card" style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div className="mono" style={{ fontSize: '0.84rem', color: '#00ff88', fontWeight: 700, marginBottom: '12px' }}>
                  ✦ OLYM AI EXTENSION COMPANION PANEL
                </div>

                <div style={{ flex: 1, background: '#040406', border: '1px solid var(--border)', borderRadius: '8px', padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '14px' }}>
                  {extMessages.map((m, i) => (
                    <div key={i} style={{ alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start', background: m.sender === 'user' ? 'rgba(0, 255, 136, 0.15)' : 'rgba(255, 255, 255, 0.05)', color: m.sender === 'user' ? '#00ff88' : '#fff', padding: '10px 14px', borderRadius: '8px', fontSize: '0.84rem', maxWidth: '80%' }}>
                      {m.text}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendExtMessage} style={{ display: 'flex', gap: '10px' }}>
                  <input
                    type="text"
                    value={extChatInput}
                    onChange={(e) => setExtChatInput(e.target.value)}
                    placeholder="Ask Olym AI about your codebase or scraping session..."
                    style={{ flex: 1, background: '#040406', border: '1px solid var(--border)', borderRadius: '6px', padding: '10px 14px', color: '#fff', fontSize: '0.84rem', outline: 'none' }}
                  />
                  <button type="submit" className="btn-clean" style={{ background: '#00ff88', color: '#000', padding: '10px 20px', fontWeight: 700 }}>
                    Send
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 5: NATIVE MACOS APP INSTALLERS */}
          {activeTab === 'installers' && (
            <div style={{ padding: '36px', flex: 1 }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
                Download OmniForge Desktop App (.dmg / .exe)
              </h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                Native desktop application packaging supporting macOS Apple M5, Silicon M1-M4, Intel, and Windows 10+.
              </p>

              <a
                href={macDownloadFiles[macChip]}
                download
                className="btn-clean"
                style={{ background: '#00ff88', color: '#000', padding: '14px 28px', fontWeight: 800, display: 'inline-flex' }}
              >
                <Download size={18} />
                <span>Download OmniForge for macOS (.dmg)</span>
              </a>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
