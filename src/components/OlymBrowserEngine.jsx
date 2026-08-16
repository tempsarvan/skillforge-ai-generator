'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Globe, Search, Shield, Zap, Cpu, Terminal, Play, CheckCircle2, AlertTriangle, Layers, Lock, FileText, Database, Download, Sparkles, User, Briefcase, DollarSign, Users, Settings, Wrench, ArrowRight, RefreshCw, Eye, Check, X, FileSpreadsheet, Presentation, LayoutDashboard, Compass, ArrowLeft, ArrowRight as ArrowRightIcon, RotateCw, Plus, PanelRightClose, PanelRightOpen, ExternalLink, Bookmark, Share2, Sparkle, ShieldCheck, Key, BookOpen, Layers3 } from 'lucide-react';

const SHORTCUTS = [
  { id: 'hn', title: 'Hacker News', url: 'https://news.ycombinator.com', icon: '🍊' },
  { id: 'github', title: 'GitHub', url: 'https://github.com/tempsarvan', icon: '🐙' },
  { id: 'wiki', title: 'Wikipedia', url: 'https://en.wikipedia.org', icon: '🌐' },
  { id: 'ph', title: 'Product Hunt', url: 'https://producthunt.com', icon: '😸' },
  { id: 'dev', title: 'Dev.to', url: 'https://dev.to', icon: '💻' },
  { id: 'twitter', title: 'X / Twitter', url: 'https://x.com', icon: '🐦' }
];

export default function OlymBrowserEngine() {
  // Tabs State
  const [tabs, setTabs] = useState([
    { id: '1', title: 'New Tab', url: 'olym://home', favicon: '✦', isHome: true },
    { id: '2', title: 'Hacker News', url: 'https://news.ycombinator.com', favicon: '🍊', isHome: false }
  ]);
  const [activeTabId, setActiveTabId] = useState('1');
  const [inputUrl, setInputUrl] = useState('olym://home');
  const [activeTargetUrl, setActiveTargetUrl] = useState('olym://home');
  
  // Workspaces State
  const [activeWorkspace, setActiveWorkspace] = useState('Personal'); // 'Personal', 'Work', 'Research'

  // Shield / Ad Blocker Stats (Brave Shield / Trademark style, 100% Free)
  const [shieldEnabled, setShieldEnabled] = useState(true);
  const [vpnEnabled, setVpnEnabled] = useState(true);
  const [blockedAdsCount] = useState(24190);
  const [dataSavedMB] = useState(340);

  // Sidebar AI Companion Toggle (Clean Arc/Dia Style)
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarMode, setSidebarMode] = useState('assistant');

  // Reader Mode Toggle
  const [readerMode, setReaderMode] = useState(false);

  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];

  const handleSelectTab = (tab) => {
    setActiveTabId(tab.id);
    setInputUrl(tab.url);
    setActiveTargetUrl(tab.url);
  };

  const handleNavigate = (e) => {
    if (e) e.preventDefault();
    let formattedUrl = inputUrl.trim();

    if (formattedUrl === 'olym://home' || formattedUrl === 'home' || formattedUrl === '') {
      formattedUrl = 'olym://home';
    } else if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://') && !formattedUrl.startsWith('olym://')) {
      formattedUrl = 'https://' + formattedUrl;
    }

    setInputUrl(formattedUrl);
    setActiveTargetUrl(formattedUrl);

    setTabs(prev => prev.map(t => t.id === activeTabId ? {
      ...t,
      url: formattedUrl,
      title: formattedUrl === 'olym://home' ? 'New Tab' : formattedUrl.replace('https://', '').split('/')[0],
      isHome: formattedUrl === 'olym://home',
      favicon: formattedUrl === 'olym://home' ? '✦' : '🌐'
    } : t));
  };

  const handleAddTab = () => {
    const newId = String(Date.now());
    const newTab = { id: newId, title: 'New Tab', url: 'olym://home', favicon: '✦', isHome: true };
    setTabs(prev => [...prev, newTab]);
    setActiveTabId(newId);
    setInputUrl('olym://home');
    setActiveTargetUrl('olym://home');
  };

  const handleCloseTab = (tabId, e) => {
    e.stopPropagation();
    if (tabs.length === 1) return;
    const filtered = tabs.filter(t => t.id !== tabId);
    setTabs(filtered);
    if (activeTabId === tabId) {
      setActiveTabId(filtered[0].id);
      setInputUrl(filtered[0].url);
      setActiveTargetUrl(filtered[0].url);
    }
  };

  const proxiedIframeSrc = activeTargetUrl.startsWith('olym://')
    ? null
    : `/api/proxy?url=${encodeURIComponent(activeTargetUrl)}`;

  return (
    <div style={{ position: 'relative', background: '#f4f4f5', height: '100vh', display: 'flex', flexDirection: 'column', color: '#18181b', fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif', overflow: 'hidden' }}>
      
      {/* 1. CLEAN MODERN BROWSER SHELL HEADER */}
      <header style={{ background: '#ffffff', borderBottom: '1px solid #e4e4e7', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        
        {/* Row 1: macOS Window Controls & Clean Tab Strip */}
        <div style={{ display: 'flex', alignItems: 'center', height: '40px', padding: '0 14px', gap: '12px', background: '#fafafa', borderBottom: '1px solid #f4f4f5' }}>
          {/* macOS window controls */}
          <div className="mac-dots" style={{ marginRight: '8px' }}>
            <span className="mac-dot red"></span>
            <span className="mac-dot yellow"></span>
            <span className="mac-dot green"></span>
          </div>

          {/* Workspaces Switcher */}
          <div style={{ display: 'flex', background: '#e4e4e7', padding: '2px', borderRadius: '6px', gap: '2px', marginRight: '8px' }}>
            {['Personal', 'Work', 'Research'].map(ws => (
              <button
                key={ws}
                onClick={() => setActiveWorkspace(ws)}
                style={{
                  background: activeWorkspace === ws ? '#ffffff' : 'transparent',
                  color: activeWorkspace === ws ? '#18181b' : '#71717a',
                  border: 'none',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {ws}
              </button>
            ))}
          </div>

          {/* Clean Tab Strip */}
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
                    borderRadius: '6px',
                    background: isActive ? '#ffffff' : 'transparent',
                    boxShadow: isActive ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                    border: isActive ? '1px solid #e4e4e7' : '1px solid transparent',
                    color: isActive ? '#18181b' : '#71717a',
                    fontSize: '0.8rem',
                    fontWeight: isActive ? 600 : 400,
                    cursor: 'pointer',
                    maxWidth: '200px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span>{tab.favicon}</span>
                  <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>{tab.title}</span>
                  <button
                    onClick={(e) => handleCloseTab(tab.id, e)}
                    style={{ background: 'none', border: 'none', color: '#a1a1aa', cursor: 'pointer', padding: 0, display: 'flex' }}
                  >
                    <X size={12} />
                  </button>
                </div>
              );
            })}

            <button
              onClick={handleAddTab}
              style={{ background: 'none', border: 'none', color: '#71717a', cursor: 'pointer', padding: '6px 10px', borderRadius: '4px' }}
              title="New Tab"
            >
              <Plus size={14} />
            </button>
          </div>

          <Link href="/" style={{ color: '#71717a', textDecoration: 'none', fontSize: '0.78rem', fontWeight: 500 }}>
            ← Portfolio
          </Link>
        </div>

        {/* Row 2: Omnibox Navigation & Trademark Shields */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '8px 16px', gap: '12px', background: '#ffffff' }}>
          
          {/* Navigation Controls */}
          <div style={{ display: 'flex', gap: '4px' }}>
            <button style={{ background: 'none', border: 'none', color: '#71717a', cursor: 'pointer', padding: '6px', borderRadius: '4px' }}>
              <ArrowLeft size={16} />
            </button>
            <button style={{ background: 'none', border: 'none', color: '#71717a', cursor: 'pointer', padding: '6px', borderRadius: '4px' }}>
              <ArrowRightIcon size={16} />
            </button>
            <button onClick={handleNavigate} style={{ background: 'none', border: 'none', color: '#71717a', cursor: 'pointer', padding: '6px', borderRadius: '4px' }}>
              <RotateCw size={16} />
            </button>
          </div>

          {/* Clean Omnibox Address Input Bar */}
          <form onSubmit={handleNavigate} style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            <div style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              background: '#f4f4f5',
              border: '1px solid #e4e4e7',
              borderRadius: '8px',
              padding: '6px 14px',
              gap: '10px'
            }}>
              <Lock size={14} style={{ color: '#10b981' }} />
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                style={{ flex: 1, background: 'transparent', border: 'none', color: '#18181b', fontSize: '0.86rem', outline: 'none' }}
                placeholder="Search or enter web address..."
              />
              
              {/* Trademark Ad Blocker Shield Badge (Brave Shield Style - 100% Free) */}
              <button
                type="button"
                onClick={() => setShieldEnabled(!shieldEnabled)}
                style={{
                  background: shieldEnabled ? 'rgba(16, 185, 129, 0.12)' : '#e4e4e7',
                  color: shieldEnabled ? '#10b981' : '#71717a',
                  border: 'none',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <ShieldCheck size={12} />
                <span>{shieldEnabled ? `${blockedAdsCount.toLocaleString()} Blocked` : 'Shield Off'}</span>
              </button>

              {/* Encrypted VPN Tunnel Toggle */}
              <button
                type="button"
                onClick={() => setVpnEnabled(!vpnEnabled)}
                style={{
                  background: vpnEnabled ? 'rgba(99, 102, 241, 0.12)' : '#e4e4e7',
                  color: vpnEnabled ? '#6366f1' : '#71717a',
                  border: 'none',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {vpnEnabled ? '🔒 VPN Active' : 'VPN Off'}
              </button>
            </div>
          </form>

          {/* Reader Mode Toggle */}
          <button
            onClick={() => setReaderMode(!readerMode)}
            style={{
              background: readerMode ? '#18181b' : 'transparent',
              color: readerMode ? '#ffffff' : '#71717a',
              border: '1px solid #e4e4e7',
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <BookOpen size={14} />
            <span>Reader</span>
          </button>

          {/* AI Sidebar Toggle Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: sidebarOpen ? '#18181b' : '#ffffff',
              color: sidebarOpen ? '#ffffff' : '#18181b',
              border: '1px solid #e4e4e7',
              padding: '6px 14px',
              borderRadius: '6px',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Sparkles size={14} />
            <span>Olym AI</span>
          </button>
        </div>

      </header>

      {/* 2. MAIN BROWSER VIEWPORT & CLEAN NEW TAB HOME SCREEN */}
      <div style={{ flex: 1, display: 'flex', position: 'relative', overflow: 'hidden' }}>
        
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#ffffff', position: 'relative' }}>
          
          {/* A. NEW TAB HOME SCREEN */}
          {activeTargetUrl === 'olym://home' ? (
            <div style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', maxWidth: '960px', margin: '0 auto', width: '100%' }}>
              
              {/* Logo & Clean Greeting */}
              <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#f4f4f5', padding: '6px 14px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 600, color: '#18181b', marginBottom: '16px' }}>
                  <Sparkles size={14} style={{ color: '#10b981' }} />
                  <span>Olym Browser — Open-Source & Privacy First</span>
                </div>
                <h1 style={{ fontSize: '2.8rem', fontWeight: 800, color: '#18181b', letterSpacing: '-0.02em', marginBottom: '8px' }}>
                  Good Afternoon, Sarvan
                </h1>
                <p style={{ color: '#71717a', fontSize: '1.05rem' }}>
                  What would you like to build or research today?
                </p>
              </div>

              {/* Large Search Bar */}
              <form onSubmit={handleNavigate} style={{ width: '100%', maxWidth: '640px', marginBottom: '40px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: '#ffffff',
                  border: '1px solid #e4e4e7',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.06)',
                  borderRadius: '14px',
                  padding: '12px 20px',
                  gap: '12px'
                }}>
                  <Search size={18} style={{ color: '#71717a' }} />
                  <input
                    type="text"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    placeholder="Search Google, DuckDuckGo, or enter URL..."
                    style={{ flex: 1, background: 'transparent', border: 'none', fontSize: '1rem', color: '#18181b', outline: 'none' }}
                  />
                  <button type="submit" style={{ background: '#18181b', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '0.84rem', fontWeight: 600, cursor: 'pointer' }}>
                    Search
                  </button>
                </div>
              </form>

              {/* Shortcut Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px', width: '100%', maxWidth: '640px', marginBottom: '40px' }}>
                {SHORTCUTS.map(sc => (
                  <div
                    key={sc.id}
                    onClick={() => {
                      setInputUrl(sc.url);
                      setActiveTargetUrl(sc.url);
                    }}
                    style={{
                      background: '#fafafa',
                      border: '1px solid #e4e4e7',
                      borderRadius: '12px',
                      padding: '16px 12px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <span style={{ fontSize: '1.6rem' }}>{sc.icon}</span>
                    <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#18181b' }}>{sc.title}</span>
                  </div>
                ))}
              </div>

              {/* Trademark Shield Stats Widget */}
              <div style={{ background: '#fafafa', border: '1px solid #e4e4e7', borderRadius: '12px', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '640px' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ShieldCheck size={16} />
                    <span>OLYM PRIVACY SHIELD ACTIVE</span>
                  </div>
                  <div style={{ fontSize: '0.84rem', color: '#71717a', marginTop: '2px' }}>
                    Ads, trackers, and telemetry blocked locally in your browser.
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '20px', textAlign: 'right' }}>
                  <div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#18181b' }}>{blockedAdsCount.toLocaleString()}</div>
                    <div style={{ fontSize: '0.72rem', color: '#71717a' }}>Trackers Blocked</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#6366f1' }}>{dataSavedMB} MB</div>
                    <div style={{ fontSize: '0.72rem', color: '#71717a' }}>Data Saved</div>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            /* B. PROXIED LIVE WEB VIEWPORT */
            <div style={{ flex: 1, position: 'relative', background: '#ffffff' }}>
              <iframe
                src={proxiedIframeSrc}
                title="Olym Clean Web Viewport"
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  background: '#ffffff'
                }}
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
              />
            </div>
          )}

        </div>

        {/* RIGHT: CLEAN ARC / DIA STYLE AI COMPANION SIDEBAR */}
        {sidebarOpen && (
          <aside style={{
            width: '380px',
            background: '#ffffff',
            borderLeft: '1px solid #e4e4e7',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            zIndex: 10
          }}>
            
            {/* Clean Sidebar Header */}
            <div style={{ padding: '16px', borderBottom: '1px solid #e4e4e7', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#18181b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={16} style={{ color: '#10b981' }} />
                <span>Olym AI Companion</span>
              </div>

              <div style={{ display: 'flex', gap: '4px' }}>
                <button onClick={() => setSidebarMode('assistant')} style={{ background: sidebarMode === 'assistant' ? '#f4f4f5' : 'transparent', border: 'none', padding: '4px 8px', borderRadius: '4px', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}>
                  Chat
                </button>
                <button onClick={() => setSidebarMode('skills')} style={{ background: sidebarMode === 'skills' ? '#f4f4f5' : 'transparent', border: 'none', padding: '4px 8px', borderRadius: '4px', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}>
                  Skills
                </button>
              </div>
            </div>

            {/* Sidebar Body */}
            <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ background: '#f4f4f5', padding: '12px', borderRadius: '8px', fontSize: '0.84rem', color: '#18181b', lineHeight: 1.5 }}>
                👋 Hi Sarvan! I am Olym AI. I monitor active web pages, execute role skills, and protect your privacy locally.
              </div>

              <div style={{ background: '#fafafa', border: '1px solid #e4e4e7', padding: '12px', borderRadius: '8px', fontSize: '0.8rem', color: '#71717a' }}>
                Active Target: <strong>{activeTargetUrl}</strong>
              </div>
            </div>

          </aside>
        )}

      </div>

    </div>
  );
}
