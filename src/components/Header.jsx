import React, { useState } from 'react';

export default function Header({ activeSection, setActiveSection }) {
  const [hoveredNav, setHoveredNav] = useState(null);

  const navItems = [
    { id: 'works', label: 'Work' },
    { id: 'services', label: 'Services' },
    { id: 'sandbox', label: 'Sandbox' },
    { id: 'notes', label: 'Notes' },
    { id: 'inquire', label: 'Inquire' },
  ];

  const handleNavClick = (id) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(9, 9, 11, 0.88)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px'
      }}>
        {/* Name & Title */}
        <div 
          onClick={() => {
            setActiveSection('works');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        >
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: '#fafafa',
            color: '#09090b',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: '0.85rem'
          }}>
            S
          </div>
          <div>
            <span style={{ fontWeight: 600, fontSize: '0.95rem', letterSpacing: '-0.02em' }}>Sarvan</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginLeft: '8px' }}>/ Systems Architect</span>
          </div>
        </div>

        {/* Rolling Hover Nav Items (Ryan Ritzenthaler Inspo) */}
        <nav style={{ display: 'flex', gap: '28px' }}>
          {navItems.map(item => {
            const isHovered = hoveredNav === item.id;
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                onMouseEnter={() => setHoveredNav(item.id)}
                onMouseLeave={() => setHoveredNav(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  position: 'relative',
                  overflow: 'hidden',
                  height: '20px',
                  lineHeight: '20px',
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                <div style={{
                  transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: isHovered ? 'translateY(-20px)' : 'translateY(0)'
                }}>
                  <div style={{
                    color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                    fontSize: '0.88rem',
                    fontWeight: isActive ? 600 : 400
                  }}>
                    {item.label}
                  </div>
                  <div style={{
                    color: '#fafafa',
                    fontSize: '0.88rem',
                    fontWeight: 600
                  }}>
                    {item.label}
                  </div>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Live Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <span className="status-dot"></span>
          <span>Available for Consults</span>
        </div>
      </div>
    </header>
  );
}
