import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  const navItems = [
    { path: '/projects', label: 'Work' },
    { path: '/examples', label: 'Examples' },
    { path: '/about', label: 'About' },
    { path: '/inquire', label: 'Inquire' },
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(250, 250, 250, 0.9)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '70px'
      }}>
        {/* Brand Logo */}
        <Link to="/" style={{ textDecoration: 'none', color: 'var(--text-primary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.02em' }}>
              Ryan Ritzenthaler
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>/ Full-Stack Developer</span>
          </div>
        </Link>

        {/* Rolling Hover Nav Items */}
        <nav style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
          {navItems.map(item => {
            const isActive = location.pathname === item.path;

            return (
              <Link 
                key={item.path} 
                to={item.path} 
                style={{ textDecoration: 'none' }}
              >
                <div className="nav-roll-button">
                  <div className="nav-roll-inner">
                    <div style={{
                      color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                      fontSize: '0.92rem',
                      fontWeight: isActive ? 600 : 400
                    }}>
                      {item.label}
                    </div>
                    <div style={{
                      color: 'var(--text-primary)',
                      fontSize: '0.92rem',
                      fontWeight: 600
                    }}>
                      {item.label}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
