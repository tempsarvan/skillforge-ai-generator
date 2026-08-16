# ⚡ OmniForge Developer Studio

> **The Ultimate Open-Source Agentic AI Developer Studio, Deep Web Scraper & Git IDE Workspace**

OmniForge is an ultra-premium, studio-grade Developer Environment designed for high-velocity software engineering, multi-agent AI orchestration, deep website asset scraping, and direct Git repository management.

---

## 🌟 Key Features

### 1. 🛠️ Full-Featured Web & Desktop IDE
- **Monaco-Grade Code Editor**: Syntax-highlighted code editor with live file tree exploration and multi-tab editing.
- **Git Control Studio**: Direct `git clone`, `git pull`, `git commit`, `git push`, and branch management interface.
- **Terminal Output Log**: Live process execution terminal for real-time diagnostics.

### 2. 🕸️ Universal Deep Web Scraper & AST Extractor
- **Full Asset Scraping**: One-click extraction of HTML payload, linked `.js` scripts, `.css` stylesheets, and media assets.
- **AST & API Endpoint Parser**: Automatically maps REST endpoints, WebSockets URLs, and GraphQL schemas referenced in JavaScript.
- **Tailwind & CSS Token Extraction**: Parses color palettes, typography tokens, and border radii into Tailwind CSS utilities.
- **Export Scraped Bundle**: Download complete website payload as a structured `.json` or `.zip` bundle.

### 3. 🧩 Integrated Olym AI Chrome Extension (Manifest V3)
- Embedded Side Panel companion for Google Chrome, Brave, Arc, and Edge.
- Live DOM parsing and local-first privacy.

### 4. 🤖 Multi-LLM Reasoning Engine Studio
- Supports **Gemini 1.5 Flash / Pro**, **Claude 3.5 Sonnet**, **GPT-4o**, and **Offline Local Ollama (Llama 3)**.
- Automated code refactoring to React 19 Server Components.
- AST security auditing for XSS, secret leaks, and promise rejections.

---

## 📦 Native Desktop Installers (macOS & Windows 10+)

OmniForge is packaged natively for macOS and Windows with 120 FPS hardware acceleration and local CDP browser control:

- **macOS Apple M5 Series**: `public/downloads/OmniForge-v1.0.0-macOS-AppleM5.dmg`
- **macOS Apple Silicon (M1, M2, M3, M4)**: `public/downloads/OmniForge-v1.0.0-macOS-AppleSilicon.dmg`
- **macOS Intel Processor (x86_64)**: `public/downloads/OmniForge-v1.0.0-macOS-Intel.dmg`
- **macOS Universal Binary**: `public/downloads/OmniForge-v1.0.0-macOS-Universal.dmg`
- **Windows 10 & 11 Setup**: `public/downloads/OmniForge-v1.0.0-Windows-Setup.exe`

---

## 🚀 Quick Start

### Running Locally
```bash
# Install dependencies
npm install

# Launch local development studio
npm run dev
```
Open [http://localhost:3001/omniforge](http://localhost:3001/omniforge) in your browser.

### Packaging Desktop Apps
```bash
# Package macOS DMG & APP bundles
node scripts/build-omniforge-installers.js

# Package Windows Setup Installer
node scripts/build-windows-app.js
```

---

## 📄 License
MIT © OmniForge Open Source Team
