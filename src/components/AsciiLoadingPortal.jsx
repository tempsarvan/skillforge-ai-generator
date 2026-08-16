'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Terminal, Activity, Check } from 'lucide-react';

const ASCII_BANNER_ART = `
  ____  _  ___ _     _     _____ ___  ____   ____ _____ 
 / ___|| |/ (_) |   | |   |  ___/ _ \\|  _ \\ / ___| ____|
 \\___ \\| ' /| | |   | |   | |_ | | | | |_) | |  _|  _|  
  ___) | . \\| | |___| |___|  _|| |_| |  _ <| |_| | |___ 
 |____/|_|\\_\\_|_____|_____|_|   \\___/|_| \\_\\\\____|_____|
`;

const INITIALIZATION_LOGS = [
  'Initializing Neural Memory Weights Matrix...',
  'Mounting 3D ASCII Parallax Background Engine...',
  'Allocating 15 Domain Sub-Agent Worker Slots...',
  'Calibrating Token-Minification Math Vectors...',
  'Quantum Portal Unlocked! Transporting...'
];

export default function AsciiLoadingPortal({ onComplete, targetUrl = '/generator' }) {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            if (onComplete) onComplete();
            else router.push(targetUrl);
          }, 300);
          return 100;
        }

        const next = prev + 5;
        if (next > 20 && logIndex < 1) setLogIndex(1);
        if (next > 45 && logIndex < 2) setLogIndex(2);
        if (next > 70 && logIndex < 3) setLogIndex(3);
        if (next > 90 && logIndex < 4) setLogIndex(4);
        return next;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [router, targetUrl, onComplete, logIndex]);

  const blockCount = Math.floor(progress / 5);
  const progressBarStr = '█'.repeat(blockCount) + '.'.repeat(20 - blockCount);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: '#040406',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      color: '#00ff88',
      fontFamily: '"JetBrains Mono", monospace'
    }}>
      
      {/* ASCII Art Banner */}
      <div className="glow-pulse" style={{ marginBottom: '24px', textShadow: '0 0 12px rgba(0, 255, 136, 0.6)' }}>
        <pre style={{ margin: 0, fontSize: 'clamp(0.55rem, 1.2vw, 0.82rem)', lineHeight: 1.15 }}>
          {ASCII_BANNER_ART}
        </pre>
      </div>

      <div style={{
        maxWidth: '560px',
        width: '100%',
        background: 'rgba(12, 12, 18, 0.85)',
        border: '1px solid rgba(0, 255, 136, 0.3)',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(0, 255, 136, 0.15)'
      }}>
        
        {/* Progress Bar Display */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', fontSize: '0.85rem' }}>
          <span style={{ color: '#fff', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity size={14} className="glow-pulse" style={{ color: '#00ff88' }} />
            <span>INITIALIZING QUANTUM PORTAL</span>
          </span>
          <span style={{ color: '#00ff88', fontWeight: 700 }}>{progress}%</span>
        </div>

        <div style={{
          background: '#000',
          padding: '10px 14px',
          borderRadius: '6px',
          border: '1px solid rgba(0, 255, 136, 0.2)',
          fontSize: '0.9rem',
          letterSpacing: '0.1em',
          color: '#00ff88',
          marginBottom: '16px',
          textAlign: 'center'
        }}>
          [{progressBarStr}]
        </div>

        {/* Live Stream Terminal Logs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
          {INITIALIZATION_LOGS.slice(0, logIndex + 1).map((log, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: idx === logIndex ? '#00ff88' : '#a1a1aa' }}>
              <span style={{ color: '#00ff88' }}>&gt;</span>
              <span>{log}</span>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
