import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ShoppingBag, Code2, Database, Layout, Wrench } from 'lucide-react';

export default function Home() {
  const services = [
    {
      title: 'Shopify Development',
      icon: ShoppingBag,
      desc: 'Custom Shopify stores built for speed, conversions, and growth so you can focus on what you do best, running your business.'
    },
    {
      title: 'NextJS Development',
      icon: Code2,
      desc: 'High-performance websites that load fast, rank well on Google, and look great on every device. Built with modern technology that scales as you grow.'
    },
    {
      title: 'Custom Software',
      icon: Database,
      desc: 'Custom software tailored to your business. Login portals, internal dashboards, booking systems, data tools, whatever you need to run more efficiently.'
    },
    {
      title: 'Custom CMS Websites',
      icon: Layout,
      desc: 'Websites you can actually update yourself. Built on modern content platforms so you can edit pages, publish blog posts, and manage content without calling a developer every time.'
    },
    {
      title: 'Web Maintenance',
      icon: Wrench,
      desc: "Ongoing support to keep your site fast, secure, and up to date. Bug fixes, performance improvements, and updates handled so you don't have to think about it."
    }
  ];

  const featuredProjects = [
    {
      title: 'CDA National',
      status: 'Completed: Apr 2026',
      tags: ['NextJS', 'Tailwind CSS', 'Prismic CMS', 'Hubspot API'],
      category: 'Brick and Mortar'
    },
    {
      title: 'Symmetry Sauna',
      status: 'Ongoing',
      tags: ['NextJS', 'Tailwind CSS', 'Prismic CMS', 'Shopify Headless'],
      category: 'E-Commerce / B2C'
    },
    {
      title: 'Curio Interactive Inc.',
      status: 'Ongoing',
      tags: ['NextJS', 'Sanity CMS', 'TypeScript', 'Shopify'],
      category: 'E-Commerce / B2C'
    },
    {
      title: 'Andre Architecture',
      status: 'Completed: Apr 2025',
      tags: ['Awwwards HM', 'NextJS', 'Prismic CMS', 'Hubspot API'],
      category: 'Service Business'
    },
    {
      title: 'Porrada',
      status: 'Completed: Mar 2026',
      tags: ['NextJS', 'Tailwind CSS', 'Prismic CMS', 'Shopify API'],
      category: 'E-Commerce / B2C'
    },
    {
      title: 'MyMagicHealer',
      status: 'Completed: Mar 2026',
      tags: ['Shopify', 'NextJS', 'Custom Shopify App', 'Shopify API'],
      category: 'E-Commerce / B2C'
    }
  ];

  return (
    <div style={{ paddingTop: '60px', paddingBottom: '80px' }}>
      <div className="container">
        
        {/* Intro Section */}
        <div style={{ maxWidth: '800px', marginBottom: '60px' }}>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: 600, lineHeight: 1.2, marginBottom: '24px' }}>
            Hello and welcome to my digital portfolio.
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '32px' }}>
            I'm a passionate full-stack web developer dedicated to building engaging web experiences. Explore my projects to see my capabilities. If you're interested in collaborating, feel free to <Link to="/inquire" style={{ color: 'var(--text-primary)', fontWeight: 600 }}>reach out here</Link>.
          </p>

          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '24px', borderRadius: 'var(--radius-md)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '8px' }}>What You’ll Find Below</h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              From the services I offer to the projects I’ve built—this portfolio is here to give you a clear picture of what I do and how I can help. Whether you're looking for a seamless Shopify integration, a dynamic CMS setup, or custom software—dive in and explore.
            </p>
          </div>
        </div>

        <div className="section-divider"></div>

        {/* Services Section */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{ maxWidth: '640px', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '12px' }}>Services</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Explore the range of services I offer below. Each designed to help your business grow, perform better, and stand out online.
            </p>
          </div>

          <div className="grid-2">
            {services.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div key={idx} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '8px',
                        background: 'var(--bg-subtle)',
                        border: '1px solid var(--border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-primary)'
                      }}>
                        <Icon size={18} />
                      </div>
                      <Link to="/inquire" className="btn-link" style={{ fontSize: '0.85rem' }}>
                        <span>Reach out</span>
                        <ArrowUpRight size={14} />
                      </Link>
                    </div>

                    <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '10px' }}>
                      {s.title}
                    </h3>

                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                      {s.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="section-divider"></div>

        {/* Featured Projects Grid */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h2 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '8px' }}>Featured Projects</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
                Recent work built for e-commerce brands, software platforms, and local businesses.
              </p>
            </div>

            <Link to="/projects" className="btn-dark">
              <span>View All Projects</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="grid-3">
            {featuredProjects.map((p, idx) => (
              <div key={idx} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span className="pill" style={{ fontSize: '0.78rem' }}>{p.category}</span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{p.status}</span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '12px' }}>
                    {p.title}
                  </h3>
                </div>

                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                  {p.tags.map((t, i) => (
                    <span key={i} style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', background: 'var(--bg-subtle)', padding: '2px 8px', borderRadius: '4px' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
