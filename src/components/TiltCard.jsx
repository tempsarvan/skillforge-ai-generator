import React, { useState, useRef } from 'react';

export default function TiltCard({ children, className = '', style = {}, onClick }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, x: 50, y: 50, isHovered: false });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    const rx = (y / rect.height - 0.5) * -10; // max 5deg tilt
    const ry = (x / rect.width - 0.5) * 10;

    setTilt({
      rx,
      ry,
      x: xPercent,
      y: yPercent,
      isHovered: true
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0, x: 50, y: 50, isHovered: false });
  };

  return (
    <div
      ref={cardRef}
      className={`card-clean ${className}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease',
        transform: tilt.isHovered
          ? `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateY(-2px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)',
        borderColor: tilt.isHovered ? 'var(--border-strong)' : 'var(--border)',
        ...style
      }}
    >
      {/* Dynamic Refractive Spotlight Light Beam Overlay */}
      {tilt.isHovered && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 2,
            background: `radial-gradient(circle 350px at ${tilt.x}% ${tilt.y}%, rgba(255, 255, 255, 0.07) 0%, rgba(99, 102, 241, 0.03) 50%, transparent 80%)`,
            transition: 'opacity 0.2s ease'
          }}
        />
      )}
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
}
