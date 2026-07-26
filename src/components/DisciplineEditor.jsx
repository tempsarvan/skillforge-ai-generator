import React, { useState } from 'react';
import { Edit3, Sparkles, CheckCircle2, Zap, ArrowRight } from 'lucide-react';

export default function DisciplineEditor() {
  const [sampleIndex, setSampleIndex] = useState(0);

  const samples = [
    {
      label: "Technical Architecture Report",
      robotic: "In conclusion, it is crucial to understand that implementing a microservices architecture can potentially offer numerous beneficial advantages. Furthermore, it is important to note that microservices allow teams to deploy independently, which ultimately enhances productivity.",
      humanized: "Microservices enable independent deployment cycles across domain teams. By decoupling service boundaries around bounded contexts, teams accelerate release frequency without sacrificing core system stability."
    },
    {
      label: "API Integration Documentation",
      robotic: "Additionally, in order to make a request to the API, you must first ensure that you have acquired an authorization token. As previously mentioned, it is imperative to include this token in the header of every single request.",
      humanized: "Pass your bearer token in the `Authorization` header (`Bearer <token>`) for all authenticated endpoints. Unauthenticated requests return `401 Unauthorized`."
    },
    {
      label: "Performance Optimization Summary",
      robotic: "Overall, after careful analysis and comprehensive investigation, we have determined that reducing image file sizes is paramount. By optimizing images, page load speeds will undoubtedly improve significantly.",
      humanized: "Optimizing LCP hero assets reduces initial payload by 640KB, trimming page load latency from 2.4s to 680ms."
    }
  ];

  const currentSample = samples[sampleIndex];

  return (
    <div className="glass-panel" style={{ padding: '32px', marginBottom: '32px' }}>
      <div style={{ marginBottom: '24px' }}>
        <span className="tag tag-rose" style={{ marginBottom: '8px', display: 'inline-block' }}>DISCIPLINE 05</span>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 700 }}>
          The Editor: <span className="gradient-text-purple">Humanized Content & Fluff Elimination</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '4px' }}>
          Stripping away synthetic AI-isms ("In conclusion", "Furthermore", repetitive lists) to deliver authoritative, highly dense technical prose.
        </p>
      </div>

      {/* Preset Selector */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {samples.map((s, idx) => (
          <button
            key={idx}
            onClick={() => setSampleIndex(idx)}
            style={{
              background: sampleIndex === idx ? 'rgba(244, 63, 94, 0.15)' : 'rgba(255, 255, 255, 0.04)',
              border: sampleIndex === idx ? '1px solid var(--accent-rose)' : '1px solid var(--border-subtle)',
              color: sampleIndex === idx ? 'var(--text-main)' : 'var(--text-muted)',
              borderRadius: 'var(--radius-sm)',
              padding: '6px 14px',
              fontSize: '0.8rem',
              fontWeight: 500,
              cursor: 'pointer'
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="grid-2">
        {/* Robotic AI Output */}
        <div style={{ background: 'rgba(244, 63, 94, 0.05)', border: '1px solid rgba(244, 63, 94, 0.2)', padding: '20px', borderRadius: 'var(--radius-sm)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-rose)', letterSpacing: '0.05em' }}>
              BEFORE: SYNTHETIC / FLUFF-HEAVY TEXT
            </span>
            <span className="tag tag-rose">AI-isms Detected</span>
          </div>

          <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6, flex: 1, fontStyle: 'italic' }}>
            "{currentSample.robotic}"
          </p>

          <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(244, 63, 94, 0.15)', fontSize: '0.78rem', color: 'var(--accent-rose)' }}>
            Detected: Overused transitions, redundant filler phrases, passive voice.
          </div>
        </div>

        {/* Humanized Omniscience Output */}
        <div style={{ background: 'rgba(52, 211, 153, 0.05)', border: '1px solid rgba(52, 211, 153, 0.25)', padding: '20px', borderRadius: 'var(--radius-sm)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-emerald)', letterSpacing: '0.05em' }}>
              AFTER: OMNISCIENCE HUMANIZED POLISH
            </span>
            <span className="tag tag-emerald">High Density</span>
          </div>

          <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: 1.6, flex: 1, fontWeight: 500 }}>
            "{currentSample.humanized}"
          </p>

          <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(52, 211, 153, 0.15)', fontSize: '0.78rem', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle2 size={14} /> 48% Word Count Reduction | Direct Technical Precision
          </div>
        </div>
      </div>
    </div>
  );
}
