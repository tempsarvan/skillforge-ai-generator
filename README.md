# Systems Architecture & Engineering Portfolio

A high-performance technical portfolio and architectural showcase built with **Vite, React, and Vanilla Modern CSS**. Demonstrates multi-disciplinary software engineering, low-latency distributed systems, WebGPU graphics compute, static security analysis, and responsive data communication.

---

## Workspace Structure

```
portfolio/
├── index.html                 # Root HTML entry with Google Fonts & SEO tags
├── package.json               # Root dependencies & build scripts
├── src/                       # Main Portfolio App
│   ├── App.jsx                # Layout orchestration & smooth scrolling
│   ├── index.css              # Obsidian dark theme & CSS design system
│   ├── components/
│   │   ├── Header.jsx         # Sticky glass navigation & text roll hover
│   │   ├── Hero.jsx           # Editorial hero & headline
│   │   ├── RefractiveText.jsx # Mouse-tracking text refraction & 3D tilt
│   │   ├── TiltCard.jsx       # 3D glass spotlight tilt wrapper
│   │   ├── BackgroundCanvas.js# Ambient responsive cursor mesh
│   │   ├── ProjectsGallery.jsx# Interactive case studies & shader demo
│   │   ├── ProjectDrawer.jsx  # Slide-out case study detail drawer
│   │   ├── ServicesBreakdown.jsx # Core service breakdown cards
│   │   ├── ArchitectureGenerator.jsx # Interactive spec builder
│   │   ├── InteractiveSandbox.jsx   # Architectural CLI simulator
│   │   ├── ArchitectureNotes.jsx    # Essays & technical syntheses
│   │   ├── InquireSection.jsx       # Interactive inquiry contact form
│   │   └── Footer.jsx         # Categorized link footer
└── ritzenthaler-clone/        # Subfolder Clone of ryanritzenthaler.com
    ├── package.json           # Subfolder dependencies (React Router DOM)
    └── src/
        ├── App.jsx            # Multi-page client router
        ├── pages/             # Home, Projects, Examples, About, Inquire
        └── components/        # Header & Footer with roll navigation
```

---

## Key Features

1. **Mouse Refractive Typography**: Interactive radial light refraction beam tracking mouse cursor coordinates over headlines.
2. **3D Spotlight Card Tilt**: Perspective tilt cards with glass glare beams on hover.
3. **GPU Canvas Shader**: Real-time 60 FPS vector physics canvas rendering 100k simulated particles.
4. **AST Security Audit Sandbox**: Live static analysis scanning for SQL injection concatenation and exposed credentials.
5. **Architecture Blueprint Generator**: Interactive builder tool for selecting system components and generating Markdown specs.
6. **Subfolder Website Copy (`ritzenthaler-clone`)**: Dedicated full client-side router copy of [ryanritzenthaler.com](https://www.ryanritzenthaler.com/) with rolling text navigation.

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation & Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/portfolio.git
   cd portfolio
   ```

2. **Install Root Portfolio Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Root Development Server**:
   ```bash
   npm run dev
   ```

4. **Build Root for Production**:
   ```bash
   npm run build
   ```

---

### Running the Subfolder Clone (`ritzenthaler-clone`)

1. Navigate to the subfolder:
   ```bash
   cd ritzenthaler-clone
   ```

2. Install dependencies & launch:
   ```bash
   npm install
   npm run dev
   ```

---

## License

MIT © Sarvan. All rights reserved.
