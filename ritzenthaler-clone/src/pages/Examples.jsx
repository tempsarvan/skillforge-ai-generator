import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function Examples() {
  const cohorts = [
    {
      title: 'Custom Online Stores',
      desc: 'These websites were either built directly on Shopify, or built using its tech (Headless NextJS + Shopify API). A headless approach makes sites faster, more flexible, and provides significantly better SEO.',
      tech: ['NextJS', 'Shopify API', 'Tailwind CSS', 'Klaviyo API'],
      examples: [
        { name: 'Curio', url: 'https://heycurio.com' },
        { name: 'MyMagicHealer', url: 'https://mymagichealer.com' },
        { name: 'Porrada', url: 'https://porradanutra.com' },
        { name: 'CBMD', url: 'https://cbmd.com' }
      ]
    },
    {
      title: 'Custom Software',
      desc: 'Websites where the client needed custom business software. An example being Symmetry Gallery, where users create/save inspiration boards that auto-generate a PDF sent directly to Symmetry admin.',
      tech: ['NextJS', 'Postgres / Supabase', 'TypeScript', 'Node.js'],
      examples: [
        { name: 'Symmetry Gallery', url: 'https://symmetrysauna.com/gallery' },
        { name: 'Porrada Affiliate Platform', url: 'https://porradanutra.com' }
      ]
    },
    {
      title: 'Custom CMS Websites',
      desc: 'Websites built using NextJS and Prismic or Sanity CMS. Allows clients to edit site content, publish blog posts, and manage pages without needing a developer for every edit.',
      tech: ['NextJS', 'Prismic CMS', 'Sanity CMS', 'Vercel'],
      examples: [
        { name: 'Good Times Production', url: 'https://itsgoodtimes.com' },
        { name: 'Andre Architecture', url: 'https://andrearchitecture.com' },
        { name: 'Leap Health', url: 'https://leaphealth.com' }
      ]
    },
    {
      title: 'Integrated Websites',
      desc: 'Websites that are highly customizable but also integrate with third-party software like Hubspot, Mailchimp, or Google Sheets API.',
      tech: ['NextJS', 'Prismic CMS', 'Hubspot API', 'Google Sheets API'],
      examples: [
        { name: 'Symmetry Sauna & Studio', url: 'https://symmetrysauna.com' },
        { name: 'CDA National', url: 'https://cdanational.com' }
      ]
    }
  ];

  return (
    <div style={{ paddingTop: '60px', paddingBottom: '80px' }}>
      <div className="container">
        
        <div style={{ maxWidth: '720px', marginBottom: '60px' }}>
          <h1 style={{ fontSize: '2.8rem', fontWeight: 600, marginBottom: '12px' }}>Examples</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>
            Interactive examples from real projects. A closer look at the kind of work I do and how it comes together.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
          {cohorts.map((c, idx) => (
            <div key={idx} className="card">
              <h2 style={{ fontSize: '1.6rem', fontWeight: 600, marginBottom: '12px' }}>
                {c.title}
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '24px', maxWidth: '820px' }}>
                {c.desc}
              </p>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
                {c.tech.map((t, i) => (
                  <span key={i} className="pill" style={{ cursor: 'default' }}>{t}</span>
                ))}
              </div>

              <div style={{ paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px', fontWeight: 600 }}>
                  EXAMPLES IN THIS COHORT:
                </div>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {c.examples.map((ex, i) => (
                    <a
                      key={i}
                      href={ex.url}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-dark"
                      style={{ fontSize: '0.85rem', padding: '8px 16px' }}
                    >
                      <span>{ex.name}</span>
                      <ArrowUpRight size={14} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
