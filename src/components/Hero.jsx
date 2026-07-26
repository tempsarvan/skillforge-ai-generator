import React from 'react';
import { ArrowUpRight, Terminal, Sparkles } from 'lucide-react';
import RefractiveText from './RefractiveText';

export default function Hero() {
  return (
    <section style={{ paddingTop: '80px', paddingBottom: '60px', position: 'relative', zIndex: 1 }}>
      <div className="container">
        
        <div style={{ maxWidth: '860px' }}>
          
          <div style={{ marginBottom: '20px' }}>
            <span className="pill mono" style={{ fontSize: '0.8rem' }}>
              <Sparkles size={14} style={{ color: '#fafafa', marginRight: '4px' }} />
              Hover text for dynamic light refraction
            </span>
          </div>

          <div style={{ marginBottom: '28px' }}>
            <RefractiveText as="h1" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', fontWeight: 600, lineHeight: 1.12 }}>
              Architecting high-throughput distributed systems & real-time compute.
            </RefractiveText>
          </div>

          <p style={{ 
            fontSize: '1.2rem', 
            color: 'var(--text-secondary)', 
            lineHeight: 1.7, 
            maxWidth: '680px',
            marginBottom: '36px' 
          }}>
            I bridge computer science research, low-latency systems engineering, security auditing, and humanized data communication. Focused on building software that is fast, resilient, and visually captivating.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <button 
              className="btn-clean"
              onClick={() => {
                const el = document.getElementById('works');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>View Selected Works</span>
              <ArrowUpRight size={16} />
            </button>

            <button 
              className="btn-ghost"
              onClick={() => {
                const el = document.getElementById('sandbox');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Terminal size={16} />
              <span>Launch Interactive Sandbox</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
