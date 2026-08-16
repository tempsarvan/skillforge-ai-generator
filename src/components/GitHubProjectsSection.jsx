'use client';

import React from 'react';
import { ArrowUpRight, Code, GitFork, Star, Terminal, Layers, HeartHandshake, ShieldCheck } from 'lucide-react';

const REPOSITORIES = [
  {
    name: 'skillforge-ai-generator',
    fullName: 'tempsarvan/skillforge-ai-generator',
    desc: 'Universal AI Skill Definition Studio with token minification, neural backpropagation memory, and 3D ASCII Parallax Canvas.',
    url: 'https://github.com/tempsarvan/skillforge-ai-generator',
    tech: ['Next.js 15', 'React 19', 'ASCII Engine', 'SKILL.md'],
    stars: 12,
    forks: 3
  },
  {
    name: 'connect',
    fullName: 'tempsarvan/connect',
    desc: 'High-throughput communication & connectivity platform with real-time web socket synchronization.',
    url: 'https://github.com/tempsarvan/connect',
    tech: ['TypeScript', 'Node.js', 'WebSockets', 'Tailwind'],
    stars: 8,
    forks: 2
  },
  {
    name: 'haven-wellness-app',
    fullName: 'tempsarvan/haven-wellness-app',
    desc: 'Wellness and health intelligence platform built with modern reactive web frameworks and data visualization.',
    url: 'https://github.com/tempsarvan/haven-wellness-app',
    tech: ['React', 'Health API', 'Chart.js', 'CSS Modules'],
    stars: 15,
    forks: 4
  },
  {
    name: 'durum',
    fullName: 'tempsarvan/durum',
    desc: 'High-performance application architecture & modular engine foundation.',
    url: 'https://github.com/tempsarvan/durum',
    tech: ['JavaScript', 'System Architecture', 'CLI Tooling'],
    stars: 6,
    forks: 1
  }
];

export default function GitHubProjectsSection() {
  return (
    <section id="github-repos" style={{ padding: '60px 0', position: 'relative', zIndex: 1 }}>
      <div className="container">
        
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="pill mono" style={{ background: 'rgba(0, 255, 136, 0.14)', color: '#00ff88', borderColor: 'rgba(0, 255, 136, 0.35)' }}>
              <Code size={12} style={{ display: 'inline', marginRight: '4px' }} />
              Open Source GitHub Repositories
            </span>
            <span className="mono" style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              @tempsarvan
            </span>
          </div>

          <h2 className="refractive-heading" style={{ fontSize: '2.6rem', fontWeight: 800, lineHeight: 1.12 }}>
            Featured Software & Repositories
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginTop: '6px', maxWidth: '680px' }}>
            Explore my public GitHub codebases built for high throughput, AI orchestration, and production engineering.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {REPOSITORIES.map(repo => (
            <div key={repo.name} className="liquid-glass-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div className="mono" style={{ fontSize: '0.8rem', color: '#00ff88', fontWeight: 600 }}>
                    {repo.fullName}
                  </div>
                  <a href={repo.url} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ padding: '4px 10px', fontSize: '0.76rem' }}>
                    <span>Repo</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>

                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>
                  {repo.name}
                </h3>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '20px' }}>
                  {repo.desc}
                </p>
              </div>

              <div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                  {repo.tech.map(t => (
                    <span key={t} className="mono" style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.05)', padding: '3px 8px', borderRadius: '4px', border: '1px solid var(--border)', color: 'var(--text-primary)' }}>
                      {t}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '16px', fontSize: '0.8rem', color: 'var(--text-muted)' }} className="mono">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Star size={14} style={{ color: '#f59e0b' }} />
                    <span>{repo.stars} stars</span>
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <GitFork size={14} style={{ color: '#818cf8' }} />
                    <span>{repo.forks} forks</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
