'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function InquireSection({ inquireStatus, handleInquireSubmit }) {
  return (
    <section id="inquire" style={{ padding: '40px 0 80px' }}>
      <div className="container">
        <div className="card" style={{ background: '#050507', padding: '48px' }}>
          <div style={{ maxWidth: '640px', marginBottom: '32px' }}>
            <div className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
              02 / NEXT.JS INQUIRY FORM
            </div>
            <h2 className="refractive-heading" style={{ fontSize: '2.2rem', fontWeight: 600, marginBottom: '12px' }}>
              Inquire — Let&apos;s Build!
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
              Have a Next.js project or architecture challenge in mind? Tell me what you&apos;re building.
            </p>
          </div>

          {inquireStatus ? (
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '20px', borderRadius: 'var(--radius-sm)' }}>
              <div style={{ color: '#10b981', fontWeight: 600, fontSize: '1rem', marginBottom: '4px' }}>
                ✓ Next.js Server Response: {inquireStatus.message}
              </div>
              <div className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Inquiry ID: {inquireStatus.inquiryId} • Server: {inquireStatus.server}
              </div>
            </div>
          ) : (
            <form onSubmit={handleInquireSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label htmlFor="inquire-name" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                    Your Name
                  </label>
                  <input id="inquire-name" name="name" type="text" required placeholder="Alex Morgan" style={{ width: '100%', background: 'var(--bg-main)', border: '1px solid var(--border)', padding: '12px', borderRadius: 'var(--radius-sm)', color: '#fff' }} />
                </div>
                <div>
                  <label htmlFor="inquire-email" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                    Email Address
                  </label>
                  <input id="inquire-email" name="email" type="email" required placeholder="alex@company.com" style={{ width: '100%', background: 'var(--bg-main)', border: '1px solid var(--border)', padding: '12px', borderRadius: 'var(--radius-sm)', color: '#fff' }} />
                </div>
              </div>

              <div>
                <label htmlFor="inquire-details" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                  Project Details
                </label>
                <textarea id="inquire-details" name="details" rows={4} required placeholder="Tell me about your site goals, Next.js requirements, and timeline..." style={{ width: '100%', background: 'var(--bg-main)', border: '1px solid var(--border)', padding: '12px', borderRadius: 'var(--radius-sm)', color: '#fff' }} />
              </div>

              <button type="submit" className="btn-clean" style={{ width: 'fit-content', padding: '12px 28px' }} aria-label="Submit inquiry form">
                <span>Submit via Next.js API</span>
                <ArrowUpRight size={16} />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
