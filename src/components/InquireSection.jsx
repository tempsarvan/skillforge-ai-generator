import React, { useState } from 'react';
import { Send, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import RefractiveText from './RefractiveText';

export default function InquireSection({ preselectedService }) {
  const [selectedServices, setSelectedServices] = useState(
    preselectedService ? [preselectedService] : ['Systems Architecture']
  );
  const [formData, setFormData] = useState({ name: '', email: '', details: '', budget: '$10k - $25k' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const availableServices = [
    'Systems Architecture',
    'WebGPU Compute',
    'AST Security Audit',
    'Performance Engineering',
    'Custom Software'
  ];

  const toggleService = (serv) => {
    if (selectedServices.includes(serv)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter(s => s !== serv));
      }
    } else {
      setSelectedServices([...selectedServices, serv]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <section id="inquire" style={{ paddingTop: '60px', paddingBottom: '80px', position: 'relative', zIndex: 1 }}>
      <div className="container">
        
        <div className="card-clean" style={{ padding: '48px', background: '#050507' }}>
          
          <div style={{ maxWidth: '640px', marginBottom: '36px' }}>
            <div className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
              05 / REACH OUT
            </div>

            <RefractiveText as="h2" style={{ fontSize: '2.4rem', fontWeight: 600, marginBottom: '12px' }}>
              Inquire — Let's Build!
            </RefractiveText>

            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Have a project or architectural challenge in mind? Tell me what you're building and let's figure out how we can work together to bring your vision to life.
            </p>
          </div>

          {isSubmitted ? (
            <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '32px', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
              <CheckCircle2 size={40} style={{ color: '#10b981', margin: '0 auto 16px' }} />
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '8px' }}>Inquiry Received!</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Thank you for reaching out. I'll review your project details and get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              
              {/* Service Pills Selector */}
              <div>
                <label style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '12px' }}>
                  What services are you looking for?
                </label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {availableServices.map(serv => {
                    const isSelected = selectedServices.includes(serv);
                    return (
                      <button
                        type="button"
                        key={serv}
                        onClick={() => toggleService(serv)}
                        className="pill mono"
                        style={{
                          background: isSelected ? '#fafafa' : 'var(--bg-subtle)',
                          color: isSelected ? '#09090b' : 'var(--text-secondary)',
                          borderColor: isSelected ? '#fafafa' : 'var(--border)',
                          fontWeight: isSelected ? 600 : 500
                        }}
                      >
                        {isSelected ? '✓ ' : ''}{serv}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Form Inputs Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Alex Morgan"
                    style={{
                      width: '100%',
                      background: 'var(--bg-main)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '12px 14px',
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    style={{
                      width: '100%',
                      background: 'var(--bg-main)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '12px 14px',
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                  Project Scope & Details
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="Tell me about your timeline, tech stack, and what you're aiming to build..."
                  style={{
                    width: '100%',
                    background: 'var(--bg-main)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '12px 14px',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-clean"
                  style={{ padding: '12px 28px' }}
                >
                  <span>{isSubmitting ? 'Sending Inquiry...' : 'Submit Inquiry'}</span>
                  <ArrowRight size={16} />
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}
