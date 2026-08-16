'use client';

import React, { useState } from 'react';
import { Cpu, Server, Zap, CheckCircle2, ArrowRight, Play } from 'lucide-react';
import { submitInquiryAction } from '@/app/actions';

export default function NextAppInspector() {
  const [activeTab, setActiveTab] = useState('api');
  const [apiResponse, setApiResponse] = useState(null);
  const [serverActionResponse, setServerActionResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const testApiRoute = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/benchmark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes: 50000 })
      });
      const data = await res.json();
      setApiResponse(data);
    } catch (err) {
      setApiResponse({ error: 'Failed to connect to Next.js API route' });
    }
    setLoading(false);
  };

  const testServerAction = async () => {
    setLoading(true);
    const fd = new FormData();
    fd.append('name', 'Developer Tester');
    fd.append('email', 'test@nextjs.dev');
    fd.append('details', 'Testing Next.js Server Action invocation');

    const result = await submitInquiryAction(fd);
    setServerActionResponse(result);
    setLoading(false);
  };

  return (
    <section id="next-inspector" style={{ paddingTop: '40px', paddingBottom: '60px', position: 'relative', zIndex: 1 }}>
      <div className="container">
        
        <div style={{ marginBottom: '32px' }}>
          <div className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
            NEXT.JS APP ROUTER ARCHITECTURE
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 600 }}>Next.js Server & Client Inspector</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '4px' }}>
            Live interactive boundary tester executing Next.js Server Actions and Edge API Routes.
          </p>
        </div>

        <div className="grid-2">
          {/* Controls Panel */}
          <div className="card" style={{ background: '#050507', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setActiveTab('api')}
                className={`pill mono ${activeTab === 'api' ? 'active' : ''}`}
                style={{ flex: 1, padding: '8px' }}
              >
                Next.js API Route (/api/benchmark)
              </button>
              <button
                onClick={() => setActiveTab('action')}
                className={`pill mono ${activeTab === 'action' ? 'active' : ''}`}
                style={{ flex: 1, padding: '8px' }}
              >
                Next.js Server Action (&apos;use server&apos;)
              </button>
            </div>

            {activeTab === 'api' ? (
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>
                  Next.js App Router Route Handler
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
                  Invokes <code className="mono">POST /api/benchmark</code> directly on the Next.js server runtime, executing server-side telemetry calculations.
                </p>

                <button
                  onClick={testApiRoute}
                  disabled={loading}
                  className="btn-clean"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <Play size={16} />
                  <span>{loading ? 'Executing Route...' : 'Trigger POST /api/benchmark'}</span>
                </button>
              </div>
            ) : (
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>
                  Next.js Server Action Handler
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
                  Executes <code className="mono">submitInquiryAction()</code> directly on the server without manual REST boilerplate.
                </p>

                <button
                  onClick={testServerAction}
                  disabled={loading}
                  className="btn-clean"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <Zap size={16} />
                  <span>{loading ? 'Executing Action...' : 'Trigger Server Action'}</span>
                </button>
              </div>
            )}
          </div>

          {/* Response Console */}
          <div className="card" style={{ background: '#040507', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
              <span style={{ color: 'var(--text-muted)' }}>NEXT.JS SERVER RESPONSE CONSOLE</span>
              <span style={{ color: '#10b981' }}>200 OK</span>
            </div>

            <pre style={{ lineHeight: 1.5, color: '#e4e4e7', overflowX: 'auto', flex: 1 }}>
{activeTab === 'api'
  ? (apiResponse ? JSON.stringify(apiResponse, null, 2) : '// Click "Trigger POST /api/benchmark" to test Next.js API Route')
  : (serverActionResponse ? JSON.stringify(serverActionResponse, null, 2) : '// Click "Trigger Server Action" to test Next.js Server Action')}
            </pre>
          </div>
        </div>

      </div>
    </section>
  );
}
