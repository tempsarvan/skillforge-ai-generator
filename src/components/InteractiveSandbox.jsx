import React, { useState } from 'react';
import { Terminal, Play, CornerDownLeft, Sparkles, Shield, Layers } from 'lucide-react';
import RefractiveText from './RefractiveText';

export default function InteractiveSandbox() {
  const [commandInput, setCommandInput] = useState('bench --nodes 50000');
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'input', text: 'help' },
    { type: 'output', text: 'Available architectural CLI commands:\n  1. bench --nodes <count>      : Measure system throughput & latency bounds\n  2. security --scan            : Execute static AST security verification\n  3. humanize --clean           : Strip synthetic AI fluff from technical text' }
  ]);

  const handleRunCommand = (cmdText) => {
    const query = (cmdText || commandInput).trim().toLowerCase();
    if (!query) return;

    let responseText = '';

    if (query.startsWith('bench')) {
      responseText = `[OMNISCIENCE BENCHMARK RESULT]\nTarget Nodes       : 50,000 Concurrent Streams\nMax Throughput     : 124,500 RPS\n99th Pct Latency   : 14.2 ms\nMemory Overhead    : 34.2 MB (Zero Leak Detected)\nVerdict            : OPTIMAL (Sub-15ms SLA Maintained)`;
    } else if (query.startsWith('security')) {
      responseText = `[AST SECURITY SCAN COMPLETE]\nFiles Analyzed     : 28 Modules\nOWASP / CWE Rules  : 14 Rules Evaluated\nVulnerabilities    : 0 Critical, 0 High, 0 Medium\nStatus             : PASSED (100% Parameterized Inputs)`;
    } else if (query.startsWith('humanize')) {
      responseText = `[HUMANIZER TRANSFORMER]\nRAW INPUT  : "In conclusion, it is important to note that microservices..."\nPOLISHED   : "Microservices enable independent deployment cycles across domain teams."\nREDUCTION  : 52% Word Count Reduction | High Density Authoritative Tone`;
    } else {
      responseText = `Command not recognized: "${query}". Type "help" or select a preset command above.`;
    }

    setTerminalHistory(prev => [
      ...prev,
      { type: 'input', text: query },
      { type: 'output', text: responseText }
    ]);

    if (!cmdText) setCommandInput('');
  };

  return (
    <section id="sandbox" style={{ paddingTop: '40px', paddingBottom: '60px', position: 'relative', zIndex: 1 }}>
      <div className="container">
        
        <div style={{ marginBottom: '32px' }}>
          <div className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
            02 / INTERACTIVE SANDBOX
          </div>
          <RefractiveText as="h2" style={{ fontSize: '2rem', fontWeight: 600 }}>
            Architectural CLI Simulator
          </RefractiveText>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '4px' }}>
            Test performance benchmarking, static security scans, and text humanization directly in the terminal interface.
          </p>
        </div>

        {/* Preset Button Row */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <button
            onClick={() => handleRunCommand('bench --nodes 50000')}
            className="pill mono"
          >
            bench --nodes 50000
          </button>
          <button
            onClick={() => handleRunCommand('security --scan')}
            className="pill mono"
          >
            security --scan
          </button>
          <button
            onClick={() => handleRunCommand('humanize --clean')}
            className="pill mono"
          >
            humanize --clean
          </button>
        </div>

        {/* Terminal Window */}
        <div className="card-clean" style={{ background: '#050507', padding: '24px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }}></span>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#eab308' }}></span>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e' }}></span>
            <span style={{ marginLeft: '12px', color: 'var(--text-muted)', fontSize: '0.78rem' }}>omniscience-cli v2.4.0 — zsh</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '280px', overflowY: 'auto', marginBottom: '20px' }}>
            {terminalHistory.map((item, idx) => (
              <div key={idx}>
                {item.type === 'input' ? (
                  <div style={{ color: '#fafafa', display: 'flex', gap: '8px' }}>
                    <span style={{ color: '#10b981' }}>sarvan@arch:~$</span>
                    <span>{item.text}</span>
                  </div>
                ) : (
                  <div style={{ color: '#a1a1aa', whiteSpace: 'pre-wrap', marginLeft: '16px', marginTop: '4px', lineHeight: 1.5 }}>
                    {item.text}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Terminal Input Prompt */}
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleRunCommand();
            }}
            style={{ display: 'flex', gap: '8px', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '12px' }}
          >
            <span style={{ color: '#10b981' }}>sarvan@arch:~$</span>
            <input
              type="text"
              value={commandInput}
              onChange={(e) => setCommandInput(e.target.value)}
              placeholder="Type command ('bench', 'security', 'humanize', 'help')..."
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                color: '#fafafa',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            />
            <button type="submit" style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
              <CornerDownLeft size={16} />
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
