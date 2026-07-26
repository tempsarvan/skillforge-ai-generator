import React, { useState, useRef } from 'react';

export default function RefractiveText({ 
  children, 
  as: Component = 'h2', 
  className = '', 
  style = {},
  serifSubtext = ''
}) {
  const textRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50, rx: 0, ry: 0 });

  const handleMouseMove = (e) => {
    if (!textRef.current) return;
    const rect = textRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    const rx = (x / rect.width - 0.5) * 2; // -1 to 1
    const ry = (y / rect.height - 0.5) * 2; // -1 to 1

    setMousePos({
      x: xPercent,
      y: yPercent,
      rx,
      ry
    });
  };

  const combinedStyle = {
    position: 'relative',
    display: 'inline-block',
    cursor: 'pointer',
    transition: 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1), text-shadow 0.15s ease',
    transform: isHovered 
      ? `perspective(800px) rotateX(${mousePos.ry * -8}deg) rotateY(${mousePos.rx * 8}deg) scale(1.015)`
      : 'none',
    background: isHovered 
      ? `radial-gradient(circle 220px at ${mousePos.x}% ${mousePos.y}%, #ffffff 0%, #e4e4e7 35%, #818cf8 70%, #38bdf8 100%)`
      : 'linear-gradient(180deg, #ffffff 0%, #a1a1aa 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: isHovered
      ? `${mousePos.rx * 10}px ${mousePos.ry * 10}px 18px rgba(255, 255, 255, 0.35), ${mousePos.rx * -8}px ${mousePos.ry * -8}px 14px rgba(99, 102, 241, 0.35)`
      : 'none',
    ...style
  };

  return (
    <Component
      ref={textRef}
      className={`refractive-text ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: 50, y: 50, rx: 0, ry: 0 });
      }}
      onMouseMove={handleMouseMove}
      style={combinedStyle}
    >
      {children}
    </Component>
  );
}
