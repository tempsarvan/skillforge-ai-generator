'use client';

import React from 'react';
import { Shield } from 'lucide-react';

export default function WorksSection({ canvasRef, securityScanned, isScanning, handleScanClick }) {
  return (
    <section id="works" style={{ padding: '40px 0 60px' }}>
      <div className="container">
        <div style={{ marginBottom: '40px' }}>
          <div className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
            01 / ENGINEERING SHOWCASE
          </div>
          <h2 className="refractive-heading" style={{ fontSize: '2rem', fontWeight: 600 }}>
            Selected Architectural Works
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Card 1 */}
          <div className="card" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <span className="pill mono">Graphics & GPU Compute</span>
                <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>WebGPU / WGSL Shaders</span>
              </div>
              <h3 className="refractive-heading" style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '12px' }}>
                Real-Time GPU Particle Compute Engine
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '20px' }}>
                Custom WebGPU compute pipeline offloading vector particle physics to GPU shaders. Achieves 120 FPS rendering across 100,000 active nodes.
              </p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-primary)', background: 'var(--bg-subtle)', padding: '4px 10px', borderRadius: '4px', border: '1px solid var(--border)' }}>
                  120 FPS Target
                </span>
              </div>
            </div>

            <div style={{ background: '#050507', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: 'var(--text-muted)', fontSize: '0.75rem' }} className="mono">
                <span>LIVE CANVAS</span>
                <span style={{ color: '#10b981' }}>● ONLINE</span>
              </div>
              <canvas ref={canvasRef} aria-label="WebGPU particle compute demonstration canvas" style={{ width: '100%', height: '180px', display: 'block' }} />
            </div>
          </div>

          {/* Card 2 */}
          <div className="card" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <span className="pill mono">Security & Verification</span>
                <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>AST Analysis</span>
              </div>
              <h3 className="refractive-heading" style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '12px' }}>
                AST Security Audit & Verification Engine
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '20px' }}>
                Static analysis pipeline detecting SQL injection concatenation and unhandled promise rejections prior to deployment.
              </p>
              <button onClick={handleScanClick} className="btn-ghost" style={{ fontSize: '0.82rem' }} aria-label="Run live AST security audit">
                <Shield size={14} />
                <span>{isScanning ? 'Scanning AST...' : securityScanned ? 'Audit Passed (0 Vulnerabilities)' : 'Run Live Security Audit'}</span>
              </button>
            </div>

            <div style={{ background: '#050507', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '16px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                <span style={{ color: 'var(--text-muted)' }}>inspect_query.ts</span>
                <span style={{ color: securityScanned ? '#10b981' : 'var(--text-muted)' }}>
                  {securityScanned ? '✓ SECURE' : 'PENDING AUDIT'}
                </span>
              </div>
              <pre style={{ color: '#a1a1aa', lineHeight: 1.5 }}>
{`export async function getRecord(db, id) {
  // Parameterized query protection
  const sql = 'SELECT * FROM records WHERE id = $1';
  return await db.query(sql, [id]);
}`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
