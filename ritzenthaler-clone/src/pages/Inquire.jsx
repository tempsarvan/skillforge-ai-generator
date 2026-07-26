import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function Inquire() {
  const [selectedServices, setSelectedServices] = useState(['Shopify Development']);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', details: '' });

  const servicesPills = [
    'Shopify Development',
    'NextJS Development',
    'Custom Software',
    'Custom CMS Websites',
    'Web Maintenance'
  ];

  const toggleService = (s) => {
    if (selectedServices.includes(s)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter(item => item !== s));
      }
    } else {
      setSelectedServices([...selectedServices, s]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <div style={{ paddingTop: '60px', paddingBottom: '80px' }}>
      <div className="container">
        
        <div style={{ maxWidth: '680px' }}>
          
          <h1 style={{ fontSize: '2.8rem', fontWeight: 600, marginBottom: '16px' }}>Inquire</h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '40px' }}>
            Reach out with your project details and let's discuss how we can work together to bring your vision to life.
          </p>

          <div className="card">
            
            {submitted ? (
              <div style={{ padding: '32px 16px', textAlign: 'center' }}>
                <CheckCircle2 size={44} style={{ margin: '0 auto 16px', color: 'var(--text-primary)' }} />
                <h2 style={{ fontSize: '1.6rem', fontWeight: 600, marginBottom: '8px' }}>Inquiry Submitted</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
                  Thank you for reaching out! I'll review your project details and respond shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                <div>
                  <label style={{ fontSize: '0.9rem', fontWeight: 600, display: 'block', marginBottom: '12px' }}>
                    What services do you need help with?
                  </label>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {servicesPills.map(s => {
                      const active = selectedServices.includes(s);
                      return (
                        <button
                          type="button"
                          key={s}
                          onClick={() => toggleService(s)}
                          className={`pill ${active ? 'active' : ''}`}
                        >
                          {active ? '✓ ' : ''}{s}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid-2">
                  <div>
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Jane Smith"
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border)',
                        background: 'var(--bg-main)',
                        fontSize: '0.92rem',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="jane@company.com"
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border)',
                        background: 'var(--bg-main)',
                        fontSize: '0.92rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                    Project Details
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={form.details}
                    onChange={(e) => setForm({ ...form, details: e.target.value })}
                    placeholder="Tell me about your site goals, timeline, and any specific feature requirements..."
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border)',
                      background: 'var(--bg-main)',
                      fontSize: '0.92rem',
                      outline: 'none',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button type="submit" disabled={loading} className="btn-dark" style={{ padding: '12px 28px' }}>
                    <span>{loading ? 'Submitting...' : 'Submit Inquiry'}</span>
                    <ArrowUpRight size={16} />
                  </button>
                </div>

              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
