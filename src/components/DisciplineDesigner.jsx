import React, { useState, useEffect, useRef } from 'react';
import { BarChart3, Palette, Download, RefreshCw, Eye } from 'lucide-react';

export default function DisciplineDesigner() {
  const [chartType, setChartType] = useState('bar');
  const [palette, setPalette] = useState('cyan');
  const [dataPointsCount, setDataPointsCount] = useState(12);
  const canvasRef = useRef(null);

  const palettes = {
    cyan: { primary: '#38bdf8', secondary: '#818cf8', bg: 'rgba(56, 189, 248, 0.15)' },
    emerald: { primary: '#34d399', secondary: '#059669', bg: 'rgba(52, 211, 153, 0.15)' },
    amber: { primary: '#fbbf24', secondary: '#f97316', bg: 'rgba(251, 191, 36, 0.15)' },
    purple: { primary: '#c084fc', secondary: '#f43f5e', bg: 'rgba(192, 132, 252, 0.15)' }
  };

  const activeColors = palettes[palette];

  // Draw chart on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.parentElement.clientWidth || 500;
    const height = canvas.height = 240;

    ctx.clearRect(0, 0, width, height);

    // Background Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Generate Deterministic Data Series based on count
    const data = Array.from({ length: dataPointsCount }, (_, i) => {
      return Math.sin(i * 0.8) * 40 + Math.cos(i * 0.4) * 30 + 100;
    });

    if (chartType === 'bar') {
      const barWidth = (width - 40) / dataPointsCount;
      data.forEach((val, i) => {
        const barHeight = (val / 180) * (height - 60);
        const x = 20 + i * barWidth;
        const y = height - 30 - barHeight;

        // Gradient fill
        const grad = ctx.createLinearGradient(0, y, 0, height - 30);
        grad.addColorStop(0, activeColors.primary);
        grad.addColorStop(1, activeColors.secondary);

        ctx.fillStyle = grad;
        ctx.fillRect(x + 4, y, barWidth - 8, barHeight);

        // Value dots
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(x + barWidth / 2, y, 3, 0, Math.PI * 2);
        ctx.fill();
      });
    } else if (chartType === 'line') {
      ctx.beginPath();
      ctx.strokeStyle = activeColors.primary;
      ctx.lineWidth = 3;
      const step = (width - 40) / (dataPointsCount - 1);

      data.forEach((val, i) => {
        const x = 20 + i * step;
        const y = height - 30 - (val / 180) * (height - 60);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Draw glowing area under line
      ctx.lineTo(width - 20, height - 30);
      ctx.lineTo(20, height - 30);
      ctx.closePath();
      const fillGrad = ctx.createLinearGradient(0, 0, 0, height);
      fillGrad.addColorStop(0, activeColors.bg);
      fillGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = fillGrad;
      ctx.fill();

      // Data Points
      data.forEach((val, i) => {
        const x = 20 + i * step;
        const y = height - 30 - (val / 180) * (height - 60);
        ctx.fillStyle = activeColors.primary;
        ctx.shadowColor = activeColors.primary;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    } else if (chartType === 'scatter') {
      const step = (width - 40) / (dataPointsCount - 1);
      data.forEach((val, i) => {
        const x = 20 + i * step;
        const y = height - 30 - (val / 180) * (height - 60);
        
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.beginPath();
        ctx.moveTo(x, height - 30);
        ctx.lineTo(x, y);
        ctx.stroke();

        ctx.fillStyle = i % 2 === 0 ? activeColors.primary : activeColors.secondary;
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    }

  }, [chartType, palette, dataPointsCount]);

  return (
    <div className="glass-panel" style={{ padding: '32px', marginBottom: '32px' }}>
      <div style={{ marginBottom: '24px' }}>
        <span className="tag tag-amber" style={{ marginBottom: '8px', display: 'inline-block' }}>DISCIPLINE 04</span>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 700 }}>
          The Designer: <span className="gradient-text-amber">Visual & Data Communication</span>
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '4px' }}>
          Unified aesthetic system, accessible color contrast, and multi-format visualization engine (Canvas/SVG/JSON).
        </p>
      </div>

      <div className="grid-2">
        {/* Left Column: Visualization Controls */}
        <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '24px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
              Visualization Chart Mode:
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['bar', 'line', 'scatter'].map(t => (
                <button
                  key={t}
                  onClick={() => setChartType(t)}
                  style={{
                    flex: 1,
                    background: chartType === t ? 'rgba(251, 191, 36, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                    border: chartType === t ? '1px solid var(--accent-amber)' : '1px solid var(--border-subtle)',
                    color: chartType === t ? 'var(--text-main)' : 'var(--text-muted)',
                    padding: '8px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textTransform: 'uppercase'
                  }}
                >
                  {t} Chart
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
              Harmonious Palette System:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
              {Object.keys(palettes).map(p => (
                <button
                  key={p}
                  onClick={() => setPalette(p)}
                  style={{
                    background: palette === p ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0,0,0,0.2)',
                    border: palette === p ? `2px solid ${palettes[p].primary}` : '1px solid var(--border-subtle)',
                    padding: '8px',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    color: '#fff',
                    fontSize: '0.75rem',
                    textTransform: 'capitalize'
                  }}
                >
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: palettes[p].primary }}></span>
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
              <span>Data Resolution (Points):</span>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-amber)' }}>{dataPointsCount} series</span>
            </div>
            <input
              type="range"
              min="6"
              max="24"
              value={dataPointsCount}
              onChange={(e) => setDataPointsCount(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-amber)' }}
            />
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', display: 'flex', gap: '8px' }}>
            <button className="btn-secondary" style={{ flex: 1, fontSize: '0.8rem', padding: '8px' }}>
              <Download size={14} /> Export SVG
            </button>
            <button className="btn-secondary" style={{ flex: 1, fontSize: '0.8rem', padding: '8px' }}>
              <Eye size={14} /> JSON Schema
            </button>
          </div>
        </div>

        {/* Right Column: Canvas Render View */}
        <div style={{ background: '#04060a', borderRadius: 'var(--radius-sm)', padding: '20px', border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BarChart3 size={18} style={{ color: activeColors.primary }} />
              <span style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                CANVAS TELEMETRY VISUALIZER (60 FPS)
              </span>
            </div>
            <span className="tag tag-amber">{chartType.toUpperCase()} MODE</span>
          </div>

          <div style={{ flex: 1, position: 'relative', width: '100%', minHeight: '220px' }}>
            <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
