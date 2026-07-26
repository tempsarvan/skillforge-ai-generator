import React, { useState } from 'react';
import { BookOpen, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import RefractiveText from './RefractiveText';
import TiltCard from './TiltCard';

export default function ArchitectureNotes() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const notes = [
    {
      title: "Deterministic Event-Driven Replication Under High Concurrency",
      date: "July 2026",
      readTime: "6 min read",
      category: "Distributed Systems",
      summary: "How deterministic state machines backed by Raft consensus eliminate multi-leader write locks while maintaining strict sub-15ms local latency SLAs.",
      content: `When scaling event-driven architectures across multi-region clusters, traditional eventual consistency models introduce read-after-write anomalies. By implementing deterministic execution sequencing—where all consensus nodes execute state transitions in identical total order—we remove distributed locks entirely.

Key architectural takeaways:
1. Sequencer nodes assign monotonically increasing 64-bit timestamps before raft replication.
2. Worker nodes process transactions strictly by sequence number, enabling lock-free local parallel memory execution.
3. Benchmarks show a 4.2x throughput increase over traditional distributed 2-Phase Commit protocols.`
    },
    {
      title: "WebGPU Compute Pipelines for Multidimensional Vector Visuals",
      date: "June 2026",
      readTime: "8 min read",
      category: "Graphics Compute",
      summary: "Offloading 100,000 particle physics vectors from JavaScript main thread to WGSL shaders on browser GPU compositor threads.",
      content: `Browser user interface jank occurs when heavy data calculations block the main thread layout loop. WebGPU introduces explicit compute shaders (WGSL) that allow high-volume vector math to run natively on the GPU hardware.

Key execution principles:
- Memory Buffers: Shared ArrayBuffers stream vector coordinates directly to GPU memory once per frame.
- Zero CPU Overhead: Main JS thread only dispatches compute passes without calculating individual node collisions.`
    },
    {
      title: "The Engineering of Authoritative Technical Communication",
      date: "May 2026",
      readTime: "5 min read",
      category: "Technical Synthesis",
      summary: "Stripping synthetic AI boilerplate ('In conclusion', 'Furthermore') to write sharp, dense, human-centric technical documentation.",
      content: `LLM-generated prose tends to suffer from repetitive transition phrases, passive voice, and padded bullet lists. High-impact technical communication demands extreme clarity:

- Lead with exact numbers and metrics.
- Eliminate filler phrases ('It is important to note that').
- Prefer active verbs ('Trims LCP latency' instead of 'It will help make the page load faster').`
    }
  ];

  return (
    <section id="notes" style={{ paddingTop: '40px', paddingBottom: '60px', position: 'relative', zIndex: 1 }}>
      <div className="container">
        
        <div style={{ marginBottom: '32px' }}>
          <div className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
            03 / ARCHITECTURAL NOTES
          </div>
          <RefractiveText as="h2" style={{ fontSize: '2rem', fontWeight: 600 }}>
            Essays & System Syntheses
          </RefractiveText>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '4px' }}>
            Deep dives on distributed systems, web graphics, and technical writing.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {notes.map((n, idx) => {
            const isExpanded = expandedIndex === idx;
            return (
              <TiltCard 
                key={idx} 
                style={{ padding: '24px', cursor: 'pointer' }}
                onClick={() => setExpandedIndex(isExpanded ? null : idx)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span className="pill mono">{n.category}</span>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{n.date} • {n.readTime}</span>
                  </div>
                  {isExpanded ? <ChevronUp size={18} style={{ color: 'var(--text-muted)' }} /> : <ChevronDown size={18} style={{ color: 'var(--text-muted)' }} />}
                </div>

                <RefractiveText as="h3" style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '8px', marginBottom: '8px' }}>
                  {n.title}
                </RefractiveText>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                  {n.summary}
                </p>

                {isExpanded && (
                  <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border)', color: 'var(--text-primary)', fontSize: '0.95rem', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                    {n.content}
                  </div>
                )}
              </TiltCard>
            );
          })}
        </div>

      </div>
    </section>
  );
}
