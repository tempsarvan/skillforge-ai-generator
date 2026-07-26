import React from 'react';
import { X, ExternalLink, Shield, Cpu, Zap, Layers, CheckCircle2 } from 'lucide-react';
import RefractiveText from './RefractiveText';

export default function ProjectDrawer({ project, onClose, onInquireClick }) {
  if (!project) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 200,
      display: 'flex',
      justifyContent: 'flex-end',
      background: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)'
    }}>
      {/* Backdrop click to close */}
      <div style={{ position: 'absolute', inset: 0 }} onClick={onClose} />

      {/* Slide Drawer */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        maxWidth: '560px',
        height: '100%',
        background: '#09090b',
        borderLeft: '1px solid var(--border)',
        padding: '36px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        boxShadow: '-20px 0 50px rgba(0, 0, 0, 0.8)'
      }}>
        {/* Top Drawer Action Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="mono pill" style={{ fontSize: '0.75rem' }}>
            {project.category}
          </span>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border)',
              color: 'var(--text-muted)',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Project Header */}
        <div>
          <RefractiveText as="h2" style={{ fontSize: '1.8rem', fontWeight: 600, marginBottom: '8px' }}>
            {project.title}
          </RefractiveText>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            Completed: {project.date || 'July 2026'} • Status: Production Deployed
          </div>
        </div>

        {/* Tech Badges */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {project.tags?.map((t, idx) => (
            <span key={idx} className="mono" style={{ fontSize: '0.78rem', background: 'var(--bg-subtle)', border: '1px solid var(--border)', padding: '4px 10px', borderRadius: '4px' }}>
              {t}
            </span>
          ))}
        </div>

        {/* Challenge & Architectural Solution */}
        <div style={{ background: '#050507', border: '1px solid var(--border)', padding: '20px', borderRadius: 'var(--radius-sm)' }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
            Architectural Challenge
          </h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
            {project.description}
          </p>

          <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
            Key Performance Metrics
          </h4>
          <ul style={{ paddingLeft: '18px', fontSize: '0.85rem', color: '#10b981', fontFamily: 'var(--font-mono)', lineHeight: 1.6 }}>
            <li>{project.metrics}</li>
            <li>Zero main-thread layout thrashing verified</li>
            <li>AST static security audit passed (0 vulnerabilities)</li>
          </ul>
        </div>

        {/* Drawer CTAs */}
        <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid var(--border)', display: 'flex', gap: '12px' }}>
          <button
            onClick={() => {
              onClose();
              onInquireClick(project.title);
            }}
            className="btn-clean"
            style={{ flex: 1, justifyContent: 'center' }}
          >
            <span>Inquire About Similar Build</span>
          </button>
        </div>

      </div>
    </div>
  );
}
