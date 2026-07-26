import React, { useState } from 'react';
import { Layers, Sliders, ArrowRightLeft, Sparkles, AlertTriangle, Check } from 'lucide-react';

export default function DisciplineArchitect() {
  const [throughput, setThroughput] = useState(50000);
  const [latencySLA, setLatencySLA] = useState(15);
  const [redundancy, setRedundancy] = useState(3);
  const [showRefactored, setShowRefactored] = useState(true);

  // Compute System Trade-off Metrics
  const estimatedCost = Math.round((throughput / 1000) * 12 + redundancy * 45);
  const isHighRisk = latencySLA < 10 && throughput > 100000;
  const architectureRating = isHighRisk ? "Sub-Optimal (Lock Contention Risk)" : "Optimal (High Throughput & Low Latency)";

  const rawCode = `// BEFORE SIMPLIFICATION PASS (Verbose & Redundant Logic)
function processUserOrders(orders) {
  var result = [];
  if (orders != null && orders.length > 0) {
    for (var i = 0; i < orders.length; i++) {
      if (orders[i].status === 'PENDING') {
        if (orders[i].totalPrice > 0) {
          if (orders[i].items && orders[i].items.length > 0) {
            var valid = true;
            for (var j = 0; j < orders[i].items.length; j++) {
              if (orders[i].items[j].inStock === false) {
                valid = false;
                break;
              }
            }
            if (valid === true) {
              result.push({
                id: orders[i].id,
                total: orders[i].totalPrice,
                processedAt: new Date().toISOString()
              });
            }
          }
        }
      }
    }
  }
  return result;
}`;

  const cleanCode = `// AFTER SIMPLIFICATION PASS (Refactored, Declarative & Fast)
export const processOrders = (orders = []) => {
  const now = new Date().toISOString();
  return orders.filter(order => 
    order?.status === 'PENDING' && 
    order.totalPrice > 0 && 
    order.items?.every(item => item.inStock)
  ).map(({ id, totalPrice }) => ({ id, total: totalPrice, processedAt: now }));
};`;

  return (
    <div className="glass-panel" style={{ padding: '32px', marginBottom: '32px' }}>
      <div style={{ marginBottom: '24px' }}>
        <span className="tag tag-purple" style={{ marginBottom: '8px', display: 'inline-block' }}>DISCIPLINE 02</span>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 700 }}>
          The Architect: <span className="gradient-text-purple">Architectural Strategy & Complexity Reduction</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '4px' }}>
          Pre-computing implementation trade-offs and executing an automatic "Simplification Pass" to refactor complex code into elegant primitives.
        </p>
      </div>

      <div className="grid-2">
        {/* Left Sub-panel: Interactive System Trade-Off Calculator */}
        <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '24px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Sliders size={18} style={{ color: 'var(--accent-purple)' }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>System Trade-Off Matrix Calculator</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                <span>Target Throughput (Requests/sec):</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}>{throughput.toLocaleString()} RPS</span>
              </div>
              <input
                type="range"
                min="5000"
                max="200000"
                step="5000"
                value={throughput}
                onChange={(e) => setThroughput(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-purple)' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                <span>Latency SLA Limit:</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-emerald)' }}>{latencySLA} ms</span>
              </div>
              <input
                type="range"
                min="2"
                max="100"
                value={latencySLA}
                onChange={(e) => setLatencySLA(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-emerald)' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                <span>Multi-Region Replication Nodes:</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-amber)' }}>{redundancy} Replicas</span>
              </div>
              <input
                type="range"
                min="1"
                max="7"
                value={redundancy}
                onChange={(e) => setRedundancy(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-amber)' }}
              />
            </div>
          </div>

          {/* Trade-off Calculation Output */}
          <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '8px' }}>ARCHITECTURAL DIAGNOSTIC:</div>
            <div style={{ 
              background: isHighRisk ? 'rgba(244, 63, 94, 0.1)' : 'rgba(52, 211, 153, 0.1)', 
              border: isHighRisk ? '1px solid rgba(244, 63, 94, 0.3)' : '1px solid rgba(52, 211, 153, 0.3)',
              padding: '12px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              {isHighRisk ? <AlertTriangle size={16} style={{ color: 'var(--accent-rose)' }} /> : <Check size={16} style={{ color: 'var(--accent-emerald)' }} />}
              <span style={{ fontWeight: 600, color: isHighRisk ? 'var(--accent-rose)' : 'var(--accent-emerald)' }}>
                {architectureRating}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Est. Infrastructure Overhead:</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-main)' }}>${estimatedCost}/mo</span>
            </div>
          </div>
        </div>

        {/* Right Sub-panel: Simplification Pass Refactoring Demo */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={16} style={{ color: 'var(--accent-purple)' }} />
              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Simplification Pass Evaluator</span>
            </div>

            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                onClick={() => setShowRefactored(false)}
                style={{
                  background: !showRefactored ? 'rgba(244, 63, 94, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-subtle)',
                  color: !showRefactored ? 'var(--accent-rose)' : 'var(--text-muted)',
                  padding: '4px 10px',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  cursor: 'pointer'
                }}
              >
                Raw (Verbose)
              </button>
              <button
                onClick={() => setShowRefactored(true)}
                style={{
                  background: showRefactored ? 'rgba(52, 211, 153, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-subtle)',
                  color: showRefactored ? 'var(--accent-emerald)' : 'var(--text-muted)',
                  padding: '4px 10px',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  cursor: 'pointer'
                }}
              >
                Refactored (Clean)
              </button>
            </div>
          </div>

          <div style={{
            background: '#04060a',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            padding: '16px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            lineHeight: 1.5,
            color: '#e2e8f0',
            overflowX: 'auto',
            flex: 1
          }}>
            <pre>{showRefactored ? cleanCode : rawCode}</pre>
          </div>

          {/* Refactoring Metric Counters */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
            <div style={{ flex: 1, background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)', padding: '8px 12px', borderRadius: '4px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>LOC REDUCTION</div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>-62%</div>
            </div>
            <div style={{ flex: 1, background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)', padding: '8px 12px', borderRadius: '4px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>CYCLOMATIC COMPL.</div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent-purple)' }}>14 → 2</div>
            </div>
            <div style={{ flex: 1, background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)', padding: '8px 12px', borderRadius: '4px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>PERF BOOST</div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>3.4x Faster</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
