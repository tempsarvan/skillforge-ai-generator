import React, { useState, useEffect, useRef } from 'react';
import { Search, BookOpen, GitBranch, ShieldAlert, CheckCircle, ExternalLink, RefreshCw } from 'lucide-react';

export default function DisciplineScout() {
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(0);
  const canvasRef = useRef(null);

  const researchTopics = [
    {
      title: "Distributed State Consistency vs Eventual Availability",
      category: "Systems Architecture",
      sources: ["Lamport (1978)", "Brewer CAP Theorem (2000)", "Calvin Protocol (2012)"],
      conflict: "Traditional RDBMS strictly enforce ACID at high latency costs, whereas AP systems sacrifice strict consistency for fault tolerance.",
      synthesis: "Modern hybrid Raft-backed deterministic execution allows sub-millisecond local consistency with global eventual replication.",
      nodes: [
        { id: 1, label: "CAP Theorem", x: 120, y: 80, type: "theory" },
        { id: 2, label: "Raft Consensus", x: 260, y: 60, type: "protocol" },
        { id: 3, label: "Calvin Engine", x: 380, y: 120, type: "engine" },
        { id: 4, label: "Deterministic Exec", x: 240, y: 160, type: "synthesis" }
      ]
    },
    {
      title: "Browser Graphics: WebGPU vs WebGL Canvas Benchmarks",
      category: "Graphics & Viz",
      sources: ["W3C WebGPU Spec", "Khronos WebGL 2.0", "GPU Compute Shaders (2025)"],
      conflict: "WebGL requires high CPU overhead for draw calls; WebGPU optimizes hardware parallelism but requires pipeline state explicit configuration.",
      synthesis: "WebGPU compute shaders enable 10x vertex rendering throughput for complex 3D particle data pipelines with minimal main thread jank.",
      nodes: [
        { id: 1, label: "WebGL 2.0", x: 100, y: 100, type: "legacy" },
        { id: 2, label: "WebGPU Compute", x: 280, y: 70, type: "modern" },
        { id: 3, label: "WGSL Shaders", x: 360, y: 150, type: "shader" },
        { id: 4, label: "60 FPS 1M Particles", x: 200, y: 180, type: "synthesis" }
      ]
    },
    {
      title: "CSS View Transitions & Scroll-Driven Motion",
      category: "Web Performance",
      sources: ["W3C CSS Scroll Snap 2", "Chrome DevTools CWV LCP/INP (2025)"],
      conflict: "JavaScript scroll listeners cause layout thrashing and main thread blocking during fast flick scrolling.",
      synthesis: "Off-thread CSS view-timeline() combined with IntersectionObserver fallbacks achieves smooth 120fps motion without polyfill bloat.",
      nodes: [
        { id: 1, label: "JS Scroll Listeners", x: 110, y: 120, type: "legacy" },
        { id: 2, label: "CSS view-timeline()", x: 270, y: 70, type: "modern" },
        { id: 3, label: "Compositor Thread", x: 370, y: 130, type: "engine" },
        { id: 4, label: "Zero INP Jank", x: 210, y: 180, type: "synthesis" }
      ]
    }
  ];

  const currentTopic = researchTopics[selectedTopicIndex];

  // Draw Interactive Knowledge Graph on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.parentElement.clientWidth || 500;
    const height = canvas.height = 240;

    ctx.clearRect(0, 0, width, height);

    // Draw background grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    const nodes = currentTopic.nodes;

    // Draw connections between nodes
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.stroke();
      }
    }
    ctx.setLineDash([]);

    // Draw Nodes
    nodes.forEach(node => {
      ctx.fillStyle = node.type === 'synthesis' ? '#34d399' : node.type === 'modern' ? '#38bdf8' : '#c084fc';
      ctx.shadowColor = ctx.fillStyle;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(node.x, node.y, 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 0;
      ctx.fillStyle = '#f8fafc';
      ctx.font = '12px JetBrains Mono, monospace';
      ctx.fillText(node.label, node.x + 14, node.y + 4);
    });

  }, [selectedTopicIndex]);

  return (
    <div className="glass-panel" style={{ padding: '32px', marginBottom: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <span className="tag tag-cyan" style={{ marginBottom: '8px', display: 'inline-block' }}>DISCIPLINE 01</span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700 }}>
            The Scout: <span className="gradient-text-cyan">Research & Information Synthesis</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '4px' }}>
            Multi-source fact checking, paper breakdown, and conflicting technical view synthesis before architectural design.
          </p>
        </div>

        {/* Topic Switcher Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {researchTopics.map((t, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedTopicIndex(idx)}
              style={{
                background: selectedTopicIndex === idx ? 'rgba(56, 189, 248, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                border: selectedTopicIndex === idx ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                color: selectedTopicIndex === idx ? 'var(--text-main)' : 'var(--text-muted)',
                borderRadius: 'var(--radius-sm)',
                padding: '6px 14px',
                fontSize: '0.8rem',
                fontWeight: 500,
                cursor: 'pointer'
              }}
            >
              {t.category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid-2">
        {/* Left Column: Facts & Conflict Synthesis */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '20px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '6px' }}>
              RESEARCH TOPIC
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '12px' }}>
              {currentTopic.title}
            </h3>

            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
              <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>Citations & Fact-Check Sources:</span>
              <ul style={{ paddingLeft: '18px', marginTop: '6px', lineHeight: 1.5 }}>
                {currentTopic.sources.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          </div>

          <div style={{ background: 'rgba(244, 63, 94, 0.05)', border: '1px solid rgba(244, 63, 94, 0.2)', padding: '16px', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-rose)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px' }}>
              <ShieldAlert size={16} />
              <span>Identified Technical Conflict:</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {currentTopic.conflict}
            </p>
          </div>

          <div style={{ background: 'rgba(52, 211, 153, 0.05)', border: '1px solid rgba(52, 211, 153, 0.2)', padding: '16px', borderRadius: 'var(--radius-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-emerald)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '6px' }}>
              <CheckCircle size={16} />
              <span>Synthesized Verdict:</span>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', fontWeight: 500 }}>
              {currentTopic.synthesis}
            </p>
          </div>
        </div>

        {/* Right Column: Knowledge Node Graph */}
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div style={{ background: 'rgba(0, 0, 0, 0.4)', borderRadius: 'var(--radius-sm)', padding: '16px', border: '1px solid var(--border-subtle)', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                KNOWLEDGE CLUSTER GRAPH (CANVAS)
              </span>
              <span className="tag tag-cyan">Live Topology</span>
            </div>
            <div style={{ flex: 1, position: 'relative', width: '100%', minHeight: '220px' }}>
              <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
