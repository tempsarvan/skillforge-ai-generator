import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ExternalLink } from 'lucide-react';

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const allProjects = [
    {
      title: 'CDA National',
      category: 'Brick and Mortar',
      status: 'Completed: Apr 2026',
      tech: ['NextJS', 'Tailwind CSS', 'Prismic CMS', 'Hubspot API'],
      url: 'https://cdanational.com'
    },
    {
      title: 'Symmetry Sauna',
      category: 'E-Commerce / B2C',
      status: 'Ongoing',
      tech: ['NextJS', 'Tailwind CSS', 'Prismic CMS', 'Shopify Headless'],
      url: 'https://symmetrysauna.com'
    },
    {
      title: 'Curio Interactive Inc.',
      category: 'E-Commerce / B2C',
      status: 'Ongoing',
      tech: ['NextJS', 'Sanity CMS', 'TypeScript', 'Shopify'],
      url: 'https://heycurio.com'
    },
    {
      title: 'Andre Architecture',
      category: 'Service Business',
      status: 'Completed: Apr 2025',
      tech: ['Awwwards HM', 'NextJS', 'Prismic CMS', 'Hubspot API'],
      url: 'https://andrearchitecture.com'
    },
    {
      title: 'Porrada',
      category: 'E-Commerce / B2C',
      status: 'Completed: Mar 2026',
      tech: ['NextJS', 'Tailwind CSS', 'Prismic CMS', 'Shopify API'],
      url: 'https://porradanutra.com'
    },
    {
      title: 'MyMagicHealer',
      category: 'E-Commerce / B2C',
      status: 'Completed: Mar 2026',
      tech: ['Shopify', 'NextJS', 'Custom Shopify App', 'Shopify API'],
      url: 'https://mymagichealer.com'
    },
    {
      title: 'Viventium',
      category: 'Service Business',
      status: 'Completed: Feb 2026',
      tech: ['Hubspot', 'Software'],
      url: 'https://viventium.com'
    },
    {
      title: 'APOC Store',
      category: 'E-Commerce / B2C',
      status: 'Completed: Jan 2026',
      tech: ['Shopify', 'Performance Audit', 'Fashion'],
      url: 'https://apoc-store.com'
    },
    {
      title: 'Leap Health',
      category: 'Service Business',
      status: 'Completed: Dec 2025',
      tech: ['NextJS', 'Tailwind CSS', 'Prismic CMS'],
      url: 'https://leaphealth.com'
    },
    {
      title: 'Monarch MD - Dr. Jessica Ritch',
      category: 'Service Business',
      status: 'Completed: Dec 2025',
      tech: ['NextJS', 'Tailwind CSS', "Women's Healthcare"]
    },
    {
      title: 'Monarch MD - Dr. Karyn Eilber',
      category: 'Service Business',
      status: 'Completed: Dec 2025',
      tech: ['NextJS', 'Tailwind CSS', "Women's Healthcare"]
    },
    {
      title: 'West Art Lancaster',
      category: 'E-Commerce / B2C',
      status: 'Completed: Nov 2025',
      tech: ['NextJS', 'Tailwind CSS', 'Shopify API']
    },
    {
      title: 'Sexy Plate Sexy Space',
      category: 'E-Commerce / B2C',
      status: 'Completed: Nov 2025',
      tech: ['Shopify', 'Klaviyo']
    },
    {
      title: 'Symmetry Studio',
      category: 'Brick and Mortar',
      status: 'Completed: Oct 2025',
      tech: ['NextJS', 'Tailwind CSS', 'Prismic CMS']
    },
    {
      title: 'Steadfast LA',
      category: 'Other',
      status: 'Completed: Feb 2025',
      tech: ['NextJS', 'Prismic CMS', 'Mailchimp API']
    },
    {
      title: 'Relevent Football Partners',
      category: 'Service Business',
      status: 'Completed: May 2024',
      tech: ['NextJS', 'Tailwind CSS', 'Prismic CMS']
    },
    {
      title: 'Good Times Production',
      category: 'Service Business',
      status: 'Completed: May 2024',
      tech: ['NextJS', 'Prismic CMS', 'Mailchimp API']
    }
  ];

  const filtered = activeCategory === 'ALL' 
    ? allProjects 
    : allProjects.filter(p => p.category === activeCategory);

  return (
    <div style={{ paddingTop: '60px', paddingBottom: '80px' }}>
      <div className="container">
        
        <div style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2.8rem', fontWeight: 600, marginBottom: '12px' }}>Work</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
            A collection of web applications, custom Shopify stores, and digital solutions.
          </p>
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '40px', flexWrap: 'wrap' }}>
          {['ALL', 'E-Commerce / B2C', 'Service Business', 'Brick and Mortar', 'Other'].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`pill ${activeCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid-2">
          {filtered.map((p, idx) => (
            <div key={idx} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span className="pill" style={{ fontSize: '0.78rem' }}>{p.category}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{p.status}</span>
                </div>

                <h3 style={{ fontSize: '1.4rem', fontWeight: 600, marginBottom: '12px' }}>
                  {p.title}
                </h3>
              </div>

              <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {p.tech.map((t, i) => (
                    <span key={i} style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', background: 'var(--bg-subtle)', padding: '2px 8px', borderRadius: '4px' }}>
                      {t}
                    </span>
                  ))}
                </div>

                {p.url && (
                  <a href={p.url} target="_blank" rel="noreferrer" className="btn-link" style={{ fontSize: '0.8rem' }}>
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
