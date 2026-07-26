import React, { useState, useEffect, useRef } from 'react';
import { Shield, Zap, Layers, Terminal, ArrowUpRight } from 'lucide-react';
import RefractiveText from './RefractiveText';
import TiltCard from './TiltCard';
import ProjectDrawer from './ProjectDrawer';

export default function ProjectsGallery({ onInquireClick }) {
  const canvasRef = useRef(null);
  const [activeCodeTab, setActiveCodeTab] = useState('after');
  const [securityScanned, setSecurityScanned] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [activeDrawerProject, setActiveDrawerProject] = useState(null);

  // Canvas particle physics simulation for WebGPU/Graphics project card
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const width = canvas.width = canvas.parentElement.clientWidth || 450;
    const height = canvas.height = 200;

    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: Math.random() * 2 + 1
    }));

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Grid background
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Draw particle connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 70) {
            ctx.strokeStyle = `rgba(250, 250, 250, ${0.25 * (1 - dist / 70)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update & Draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.fillStyle = '#fafafa';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (canvas) canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleScanClick = (e) => {
    e.stopPropagation();
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setSecurityScanned(true);
    }, 600);
  };

  const project1Data = {
    title: "Real-Time GPU Particle Compute Engine",
    category: "Graphics & GPU Compute",
    description: "Custom WebGPU compute pipeline offloading vector particle physics to GPU shaders. Achieves 120 FPS rendering across 100,000 active nodes with zero main-thread layout thrashing.",
    metrics: "120 FPS Target • 100k Vectors",
    tags: ["WebGPU", "WGSL Shaders", "Canvas 2D", "D3"]
  };

  const project2Data = {
    title: "AST Security Audit & Verification Engine",
    category: "Security & Verification",
    description: "Static analysis pipeline detecting SQL injection concatenation, unhandled promise rejections, and hardcoded secrets prior to deployment. Integrates seamlessly into CI pipelines.",
    metrics: "0 Vulnerabilities • AST Analysis",
    tags: ["AST Analysis", "Static Guard", "CWE Rules", "OWASP"]
  };

  const project3Data = {
    title: "Automated Complexity Reduction Transformer",
    category: "Refactoring & Strategy",
    description: "Refactoring algorithm that strips away deep nested loops, redundant checks, and cyclomatic bloat while preserving exact API execution contracts.",
    metrics: "-60% LOC Reduction • 3.4x Execution Speedup",
    tags: ["Simplification Pass", "AST Transformation", "Clean Code"]
  };

  return (
    <section id="works" style={{ paddingTop: '40px', paddingBottom: '60px', position: 'relative', zIndex: 1 }}>
      <div className="container">
        
        <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
              01 / ENGINEERING SHOWCASE
            </div>
            <RefractiveText as="h2" style={{ fontSize: '2rem', fontWeight: 600 }}>
              Selected Architectural Works
            </RefractiveText>
          </div>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Click any project to inspect full case study drawer
          </div>
        </div>

        {/* Works Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          
          {/* Project 1: WebGPU Compute & Particles */}
          <TiltCard 
            style={{ padding: '32px', cursor: 'pointer' }}
            onClick={() => setActiveDrawerProject(project1Data)}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <span className="pill mono">Graphics & GPU Compute</span>
                  <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>WebGPU / WGSL Shaders</span>
                </div>
                
                <RefractiveText as="h3" style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '12px' }}>
                  {project1Data.title}
                </RefractiveText>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '20px' }}>
                  {project1Data.description}
                </p>

                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-primary)', background: 'var(--bg-subtle)', padding: '4px 10px', borderRadius: '4px', border: '1px solid var(--border)' }}>
                    120 FPS Target
                  </span>
                  <span className="btn-ghost" style={{ fontSize: '0.78rem', padding: '4px 10px' }}>
                    <span>Inspect Case Study</span>
                    <ArrowUpRight size={12} />
                  </span>
                </div>
              </div>

              <div style={{ background: '#050507', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '16px', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>LIVE CANVAS (MOVE MOUSE)</span>
                  <span className="status-dot"></span>
                </div>
                <div style={{ width: '100%', height: '200px', position: 'relative' }}>
                  <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
                </div>
              </div>
            </div>
          </TiltCard>

          {/* Project 2: Security & Static Code Analysis */}
          <TiltCard 
            style={{ padding: '32px', cursor: 'pointer' }}
            onClick={() => setActiveDrawerProject(project2Data)}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <span className="pill mono">Security & Verification</span>
                  <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>AST Analysis / Static Guard</span>
                </div>

                <RefractiveText as="h3" style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '12px' }}>
                  {project2Data.title}
                </RefractiveText>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '20px' }}>
                  {project2Data.description}
                </p>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <button 
                    onClick={handleScanClick} 
                    className="btn-ghost" 
                    style={{ fontSize: '0.82rem', padding: '6px 14px' }}
                  >
                    <Shield size={14} />
                    <span>{isScanning ? 'Scanning AST...' : securityScanned ? 'Audit Passed (0 Vulnerabilities)' : 'Run Live Security Audit'}</span>
                  </button>
                </div>
              </div>

              <div style={{ background: '#050507', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '16px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#e4e4e7' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                  <span style={{ color: 'var(--text-muted)' }}>inspect_query.ts</span>
                  <span style={{ color: securityScanned ? '#10b981' : 'var(--text-muted)' }}>
                    {securityScanned ? '✓ SECURE' : 'PENDING AUDIT'}
                  </span>
                </div>
                <pre style={{ lineHeight: 1.5, color: '#a1a1aa' }}>
{`export async function getRecord(db, id) {
  // Parameterized query protection
  const sql = 'SELECT * FROM records WHERE id = $1';
  return await db.query(sql, [id]);
}`}
                </pre>
              </div>
            </div>
          </TiltCard>

          {/* Project 3: Complexity Reduction Pass */}
          <TiltCard 
            style={{ padding: '32px', cursor: 'pointer' }}
            onClick={() => setActiveDrawerProject(project3Data)}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <span className="pill mono">Refactoring & Strategy</span>
                  <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Simplification Pass</span>
                </div>

                <RefractiveText as="h3" style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '12px' }}>
                  {project3Data.title}
                </RefractiveText>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '20px' }}>
                  {project3Data.description}
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveCodeTab('before');
                    }}
                    style={{
                      background: activeCodeTab === 'before' ? 'rgba(255,255,255,0.1)' : 'transparent',
                      border: '1px solid var(--border)',
                      color: activeCodeTab === 'before' ? '#fff' : 'var(--text-muted)',
                      padding: '4px 12px',
                      borderRadius: '4px',
                      fontSize: '0.78rem',
                      cursor: 'pointer'
                    }}
                  >
                    Raw Verbose
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveCodeTab('after');
                    }}
                    style={{
                      background: activeCodeTab === 'after' ? 'rgba(255,255,255,0.1)' : 'transparent',
                      border: '1px solid var(--border)',
                      color: activeCodeTab === 'after' ? '#fff' : 'var(--text-muted)',
                      padding: '4px 12px',
                      borderRadius: '4px',
                      fontSize: '0.78rem',
                      cursor: 'pointer'
                    }}
                  >
                    Clean Refactored (-60% LOC)
                  </button>
                </div>
              </div>

              <div style={{ background: '#050507', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '16px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#e4e4e7' }}>
                <pre style={{ lineHeight: 1.5, color: activeCodeTab === 'after' ? '#10b981' : '#f43f5e' }}>
{activeCodeTab === 'after'
? `// Declarative & High-Speed
export const processItems = (items = []) => 
  items.filter(i => i.valid && i.stock > 0)
       .map(({ id, price }) => ({ id, total: price }));`
: `// Verbose Loop & Deep Nesting
function processItems(items) {
  var out = [];
  if (items && items.length) {
    for (var i=0; i<items.length; i++) {
      if (items[i].valid === true) {
        if (items[i].stock > 0) {
          out.push({ id: items[i].id, total: items[i].price });
        }
      }
    }
  }
  return out;
}`}
                </pre>
              </div>
            </div>
          </TiltCard>

        </div>

        {/* Slide-out Case Study Drawer Modal */}
        <ProjectDrawer
          project={activeDrawerProject}
          onClose={() => setActiveDrawerProject(null)}
          onInquireClick={onInquireClick}
        />

      </div>
    </section>
  );
}
