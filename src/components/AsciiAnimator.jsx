'use client';

import React, { useState, useEffect } from 'react';

// Real 3D Spinning ASCII Cube Math Engine
function renderAsciiCubeFrame(angleA, angleB) {
  const width = 44;
  const height = 18;
  const zBuffer = new Array(width * height).fill(0);
  const buffer = new Array(width * height).fill(' ');

  const cubeWidth = 10;
  const distanceFromCam = 26;
  const K1 = 22;

  function renderSurface(cubeX, cubeY, cubeZ, ch) {
    // Rotation matrices around X and Z axes
    const sinA = Math.sin(angleA), cosA = Math.cos(angleA);
    const sinB = Math.sin(angleB), cosB = Math.cos(angleB);

    const x = cubeX * cosB - cubeY * sinB;
    const y = cubeX * sinB + cubeY * cosB;
    const z = cubeZ;

    const y2 = y * cosA - z * sinA;
    const z2 = y * sinA + z * cosA;

    const ooz = 1 / (z2 + distanceFromCam);

    const xp = Math.floor(width / 2 + K1 * ooz * x * 1.8);
    const yp = Math.floor(height / 2 + K1 * ooz * y2);

    const idx = xp + yp * width;
    if (xp >= 0 && xp < width && yp >= 0 && yp < height) {
      if (ooz > zBuffer[idx]) {
        zBuffer[idx] = ooz;
        buffer[idx] = ch;
      }
    }
  }

  for (let x = -cubeWidth; x < cubeWidth; x += 1.2) {
    for (let y = -cubeWidth; y < cubeWidth; y += 1.2) {
      renderSurface(x, y, -cubeWidth, '#');
      renderSurface(cubeWidth, y, x, '$');
      renderSurface(-cubeWidth, y, -x, '~');
      renderSurface(-x, y, cubeWidth, '@');
      renderSurface(x, -cubeWidth, -y, '*');
      renderSurface(x, cubeWidth, y, '+');
    }
  }

  let result = '';
  for (let i = 0; i < height; i++) {
    result += buffer.slice(i * width, (i + 1) * width).join('') + '\n';
  }
  return result;
}

// Animated Neural Signal Waveform
function renderAsciiWaveFrame(frame) {
  const width = 48;
  const height = 8;
  let lines = [];

  for (let y = 0; y < height; y++) {
    let row = '';
    for (let x = 0; x < width; x++) {
      const sinVal = Math.sin((x * 0.2) + (frame * 0.15)) * 3 + 4;
      const dist = Math.abs(y - sinVal);
      if (dist < 0.6) row += '█';
      else if (dist < 1.2) row += '▓';
      else if (dist < 2.0) row += '▒';
      else if (dist < 2.8) row += '░';
      else row += ' ';
    }
    lines.push(row);
  }

  return lines.join('\n');
}

// Animated Neural Circuit Flow
function renderAsciiNeuralFlow(frame) {
  const p1 = (frame % 10);
  const p2 = ((frame + 3) % 10);
  const p3 = ((frame + 6) % 10);

  const dots1 = '.'.repeat(p1) + '►' + '.'.repeat(9 - p1);
  const dots2 = '.'.repeat(p2) + '►' + '.'.repeat(9 - p2);
  const dots3 = '.'.repeat(p3) + '►' + '.'.repeat(9 - p3);

  return `
 +==========================================================+
 |  [SIGNAL_IN] =====${dots1}=====> (NEURON_P1)                 |
 |  [METRICS_S] =====${dots2}=====> (NEURON_P2) ==> [ACTION_A]  |
 |  [BACKPROP_W] ====${dots3}=====> (LOSS_GATE)                 |
 +==========================================================+
 [ STATUS: BACKPROP ACTIVE // ΔW = +0.075 // LOSS = -0.75 ]
`;
}

export default function AsciiAnimator({ mode = 'cube', style = {} }) {
  const [frame, setFrame] = useState(0);
  const [angleA, setAngleA] = useState(0);
  const [angleB, setAngleB] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setFrame(f => f + 1);
      setAngleA(a => a + 0.05);
      setAngleB(b => b + 0.03);
    }, 50);

    return () => clearInterval(timer);
  }, []);

  let asciiOutput = '';
  if (mode === 'cube') {
    asciiOutput = renderAsciiCubeFrame(angleA, angleB);
  } else if (mode === 'wave') {
    asciiOutput = renderAsciiWaveFrame(frame);
  } else if (mode === 'flow') {
    asciiOutput = renderAsciiNeuralFlow(frame);
  }

  return (
    <div
      style={{
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: '0.74rem',
        lineHeight: 1.15,
        color: '#00ff88',
        background: '#040406',
        border: '1px solid rgba(0, 255, 136, 0.25)',
        borderRadius: '6px',
        padding: '14px',
        whiteSpace: 'pre',
        overflowX: 'auto',
        textShadow: '0 0 8px rgba(0, 255, 136, 0.4)',
        userSelect: 'none',
        ...style
      }}
    >
      {asciiOutput}
    </div>
  );
}
