import React, { useState } from 'react';
import { Terminal, ShieldCheck, ShieldAlert, Play, CheckCircle2, Server, Cpu } from 'lucide-react';

export default function DisciplineEngineer() {
  const [selectedSnippet, setSelectedSnippet] = useState(0);
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditResult, setAuditResult] = useState(null);

  const snippets = [
    {
      name: "Secure SQL Parameterized Query",
      category: "Backend DB",
      code: `// Secure Postgres Query with Parameterized Arguments
export async function fetchUserById(db, userId) {
  if (!userId || typeof userId !== 'string') {
    throw new TypeError('Invalid user ID provided');
  }
  const query = 'SELECT id, username, email, role FROM users WHERE id = $1 AND active = true';
  const { rows } = await db.query(query, [userId]);
  return rows[0] || null;
}`,
      vulnerabilities: []
    },
    {
      name: "Vulnerable String Concatenation SQL",
      category: "Security Vulnerability",
      code: `// DANGER: Unsanitized input concatenation
export async function searchProducts(db, userInput) {
  // Vulnerable to SQL Injection!
  const query = "SELECT * FROM products WHERE name LIKE '%" + userInput + "%'";
  return await db.query(query);
}`,
      vulnerabilities: [
        { type: "CRITICAL", rule: "CWE-89: SQL Injection", line: 4, desc: "Raw string concatenation in SQL query. Sanitize with parameterized arguments." }
      ]
    },
    {
      name: "Hardcoded API Key & Insecure Storage",
      category: "Secrets Risk",
      code: `// Hardcoded production key in source control
const AWS_SECRET_KEY = "AKIAIOSFODNN7EXAMPLE_SECRET_KEY_12345";

export function uploadToS3(data) {
  // Missing persistent environment configuration!
  return s3.putObject({ Key: 'data.json', Body: data, SecretKey: AWS_SECRET_KEY });
}`,
      vulnerabilities: [
        { type: "HIGH", rule: "CWE-798: Hardcoded Credentials", line: 2, desc: "Secret key exposed in code. Use process.env persistent environment variable." }
      ]
    }
  ];

  const currentSnippet = snippets[selectedSnippet];

  const runSecurityAudit = () => {
    setIsAuditing(true);
    setAuditResult(null);
    setTimeout(() => {
      setIsAuditing(false);
      setAuditResult({
        scannedLines: currentSnippet.code.split('\n').length,
        vulnerabilities: currentSnippet.vulnerabilities,
        status: currentSnippet.vulnerabilities.length === 0 ? "PASSED" : "FAILED"
      });
    }, 700);
  };

  return (
    <div className="glass-panel" style={{ padding: '32px', marginBottom: '32px' }}>
      <div style={{ marginBottom: '24px' }}>
        <span className="tag tag-emerald" style={{ marginBottom: '8px', display: 'inline-block' }}>DISCIPLINE 03</span>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 700 }}>
          The Engineer: <span className="gradient-text-emerald">Technical Execution & Security First</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '4px' }}>
          Automated static security analysis, environment persistence checks, and empirical verification loops.
        </p>
      </div>

      <div className="grid-2">
        {/* Left Column: Code Selector & Editor */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
            {snippets.map((snip, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedSnippet(idx);
                  setAuditResult(null);
                }}
                style={{
                  background: selectedSnippet === idx ? 'rgba(52, 211, 153, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                  border: selectedSnippet === idx ? '1px solid var(--accent-emerald)' : '1px solid var(--border-subtle)',
                  color: selectedSnippet === idx ? 'var(--text-main)' : 'var(--text-muted)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '6px 12px',
                  fontSize: '0.78rem',
                  cursor: 'pointer'
                }}
              >
                {snip.name}
              </button>
            ))}
          </div>

          <div style={{
            background: '#04060a',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-sm)',
            padding: '16px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.82rem',
            lineHeight: 1.5,
            color: '#e2e8f0',
            overflowX: 'auto',
            flex: 1
          }}>
            <pre>{currentSnippet.code}</pre>
          </div>

          <button
            onClick={runSecurityAudit}
            disabled={isAuditing}
            style={{
              marginTop: '12px',
              background: 'linear-gradient(135deg, var(--accent-emerald) 0%, #059669 100%)',
              color: '#041d14',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              padding: '10px 18px',
              fontWeight: 700,
              cursor: isAuditing ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            {isAuditing ? <Cpu className="animate-spin" size={16} /> : <Play size={16} />}
            <span>{isAuditing ? 'Running Security Audit...' : 'Run Automatic Security Review'}</span>
          </button>
        </div>

        {/* Right Column: Verification Results */}
        <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '20px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={18} style={{ color: 'var(--accent-emerald)' }} />
              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Security Audit & Verification Loop</span>
            </div>
            <span className="tag tag-emerald">CWE / OWASP Rules</span>
          </div>

          {!auditResult ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)', textAlign: 'center', padding: '30px 20px' }}>
              <Terminal size={32} style={{ marginBottom: '12px', opacity: 0.5 }} />
              <p style={{ fontSize: '0.88rem' }}>Select a snippet and click "Run Automatic Security Review" to inspect static logic for vulnerabilities.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
              <div style={{ 
                background: auditResult.status === 'PASSED' ? 'rgba(52, 211, 153, 0.1)' : 'rgba(244, 63, 94, 0.1)',
                border: auditResult.status === 'PASSED' ? '1px solid rgba(52, 211, 153, 0.3)' : '1px solid rgba(244, 63, 94, 0.3)',
                padding: '12px 16px',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {auditResult.status === 'PASSED' ? <CheckCircle2 size={18} style={{ color: 'var(--accent-emerald)' }} /> : <ShieldAlert size={18} style={{ color: 'var(--accent-rose)' }} />}
                  <span style={{ fontWeight: 700, color: auditResult.status === 'PASSED' ? 'var(--accent-emerald)' : 'var(--accent-rose)' }}>
                    AUDIT {auditResult.status}
                  </span>
                </div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Scanned {auditResult.scannedLines} Lines
                </span>
              </div>

              {auditResult.vulnerabilities.length === 0 ? (
                <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ color: 'var(--accent-emerald)', fontWeight: 600, fontSize: '0.85rem', marginBottom: '4px' }}>
                    Zero Vulnerabilities Detected
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    Code strictly adheres to parameterized inputs, persistent environment handling, and security-first engineering guidelines.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {auditResult.vulnerabilities.map((v, i) => (
                    <div key={i} style={{ background: 'rgba(244, 63, 94, 0.08)', border: '1px solid rgba(244, 63, 94, 0.25)', padding: '12px', borderRadius: 'var(--radius-sm)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-rose)' }}>[{v.type}] {v.rule}</span>
                        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>Line {v.line}</span>
                      </div>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-main)' }}>{v.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* 4-Stage Verification Loop Indicators */}
              <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '8px' }}>VERIFICATION CHECKS:</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', fontSize: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-emerald)' }}>
                    <CheckCircle2 size={12} /> Static Review: OK
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-emerald)' }}>
                    <CheckCircle2 size={12} /> Tests Suite: OK
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-emerald)' }}>
                    <CheckCircle2 size={12} /> Env Persistence: OK
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-emerald)' }}>
                    <CheckCircle2 size={12} /> Build Smoke Test: OK
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
