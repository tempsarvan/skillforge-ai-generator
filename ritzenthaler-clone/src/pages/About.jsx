import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function About() {
  const capabilities = [
    'Headless Shopify & E-Commerce Engineering',
    'NextJS & React High-Performance Web Applications',
    'Custom Software Portals & Internal Tools',
    'Prismic & Sanity Headless CMS Integrations',
    'Core Web Vitals & Search Engine Optimization (SEO)',
    'API Integrations (Hubspot, Klaviyo, Mailchimp)'
  ];

  return (
    <div style={{ paddingTop: '60px', paddingBottom: '80px' }}>
      <div className="container">
        
        <div style={{ maxWidth: '800px' }}>
          
          <h1 style={{ fontSize: '2.8rem', fontWeight: 600, marginBottom: '16px' }}>About Me</h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '40px' }}>
            Hi, I'm Ryan Ritzenthaler. I build custom websites, headless e-commerce stores, and software solutions for brands that want to move fast and scale cleanly.
          </p>

          <div className="card" style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '16px' }}>My Approach</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '16px' }}>
              I believe modern web development shouldn't be overcomplicated or locked down by legacy monolithic platforms. By utilizing a modern stack—NextJS for speed and SEO, Shopify for e-commerce reliability, and headless CMS platforms like Prismic or Sanity—I build websites that look exceptional, load fast, and are easy for clients to maintain.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7 }}>
              Whether you need a custom online store from scratch, software to streamline internal operations, or ongoing maintenance support, I handle the execution from end to end.
            </p>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '20px' }}>Core Capabilities</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              {capabilities.map((cap, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '16px', borderRadius: 'var(--radius-sm)' }}>
                  <CheckCircle2 size={18} style={{ color: 'var(--text-primary)' }} />
                  <span style={{ fontSize: '0.92rem', fontWeight: 500 }}>{cap}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <Link to="/inquire" className="btn-dark">
              <span>Let's Build Together</span>
              <ArrowUpRight size={16} />
            </Link>
            <Link to="/projects" className="pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '10px 20px', fontSize: '0.9rem' }}>
              <span>View Projects</span>
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
