<div align="center">

# ⚡ OMNIFORGE DEVELOPER STUDIO

**The Ultimate Open-Source Agentic AI Developer Studio, Deep Web Scraper, CLI Terminal & Git Automator**

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16.2.12-black.svg?logo=next.js)](https://nextjs.org/)
[![Chrome Extension](https://img.shields.io/badge/Manifest_V3-Chrome_Extension-blue.svg)](public/extension/)
[![macOS M5 Support](https://img.shields.io/badge/macOS-Apple_M5_%2F_Silicon_%2F_Intel-000000.svg?logo=apple)](scripts/build-macos-app.js)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen.svg)]()

---

[Overview](#-overview) • [Core Features](#-core-features) • [Architecture](#-architecture) • [CLI Terminal Reference](#-cli-terminal-command-reference) • [Installation](#-installation--setup) • [License](#-license)

</div>

---

## 🌟 Overview

**OmniForge Developer Studio** is an ultra-premium, open-source software engineering environment combining a **Supercell/October-inspired CLI terminal**, an **autonomous multi-step workflow automator**, a **universal deep website asset scraper**, an **integrated Manifest V3 Chrome Extension (Olym AI)**, and a **Monaco-grade Git Web IDE**.

Engineered for high-velocity full-stack developers, security auditors, and AI researchers, OmniForge turns complex knowledge-work workflows into single-click executable pipelines.

---

## ✨ Core Features

### 🖥️ 1. Interactive CLI Terminal Console (Supercell & October Style)
- **Real-Time Shell Environment**: Full command line prompt supporting live logs, command history, and system diagnostic readouts.
- **Built-in CLI Tooling**: Instant execution of `scrape`, `git pull`, `git push`, `git commit`, `ai`, `build`, and `status`.

### ⚡ 2. Autonomous Workflow Automator Engine
- **Multi-Step Pipeline Chains**: Execute complex engineering tasks in sequence:
  - **🕸️ Scrape & Refactor**: Extract site assets $\rightarrow$ parse AST tree $\rightarrow$ refactor HTML/JS to React 19 $\rightarrow$ emit TypeScript types.
  - **🔒 AST Security Audit**: Scan for exposed API keys $\rightarrow$ inspect XSS input vectors $\rightarrow$ audit CSP headers $\rightarrow$ output audit report.
  - **🚀 CI/CD Release Pipeline**: Execute Linter $\rightarrow$ compile production build $\rightarrow$ git commit worktree $\rightarrow$ push to GitHub.

### 🕸️ 3. Universal Deep Web Scraper & AST Extractor
- **Complete Asset Extraction**: One-click scraping of full HTML source code, linked `.js` scripts, `.css` stylesheets, inline code, and media assets.
- **API Route & Design Token Parser**: Automatically maps REST endpoints, WebSockets URLs, color palettes, and Tailwind CSS classes.
- **JSON & ZIP Export**: Download complete website payload as structured data.

### 💻 4. Code Editor IDE & Direct Git Studio
- **Multi-Tab Workspace**: Monaco-style editor supporting line numbers, syntax highlighting, and live file tree navigation.
- **Full Git Remote Control**: Direct `git pull`, `git commit`, `git push`, and `git status` integration with branch management (`main`, `dev`, `feature/*`).

### 🧩 5. Integrated Olym AI Chrome Extension (Manifest V3)
- **Side Panel Companion**: Lives directly inside Google Chrome, Brave, Arc, or Microsoft Edge with active DOM access and local-first privacy.

---

## 🏗️ Architecture

```
                                  ┌─────────────────────────────────────────┐
                                  │      OmniForge Developer Studio         │
                                  └────────────────────┬────────────────────┘
                                                       │
         ┌─────────────────────────────────────────────┼─────────────────────────────────────────────┐
         ▼                                             ▼                                             ▼
┌──────────────────┐                         ┌──────────────────┐                         ┌──────────────────┐
│ CLI Terminal &   │                         │  Universal Deep  │                         │ Integrated Olym  │
│ Automator Engine │                         │   Site Scraper   │                         │  Chrome Ext V3   │
└────────┬─────────┘                         └────────┬─────────┘                         └────────┬─────────┘
         │                                            │                                            │
         ▼                                            ▼                                            ▼
┌──────────────────┐                         ┌──────────────────┐                         ┌──────────────────┐
│ Multi-LLM AI     │                         │ AST & Endpoint   │                         │ Live Chrome DOM  │
│ Reasoning Core   │                         │ Parser Engine    │                         │ Side Panel       │
└────────┬─────────┘                         └────────┬─────────┘                         └────────┬─────────┘
         │                                            │                                            │
         └─────────────────────────────────────────────┼─────────────────────────────────────────────┘
                                                       │
                                                       ▼
                                     ┌──────────────────────────────────┐
                                     │  Official GitHub Remote Repo     │
                                     │  (tempsarvan/skillforge-ai-gen)  │
                                     └──────────────────────────────────┘
```

---

## 💻 CLI Terminal Command Reference

| Command | Arguments | Description | Example |
| :--- | :--- | :--- | :--- |
| `help` | — | Displays complete list of CLI commands | `help` |
| `status` | — | Checks system health, Git branch, and M5 GPU status | `status` |
| `scrape` | `<url>` | Scrapes HTML, JS, CSS, and API routes from URL | `scrape https://news.ycombinator.com` |
| `git` | `pull \| push \| status` | Executes Git repository actions | `git push origin main` |
| `ai` | `<prompt>` | Runs Gemini 1.5 Flash AI code reasoning engine | `ai Audit AST security vulnerabilities` |
| `build` | — | Runs Next.js production build verification | `build` |
| `clear` | — | Clears terminal log buffer | `clear` |

---

## 📦 Native Desktop Installers

OmniForge is packaged as a native desktop application supporting **macOS (Apple M5, Silicon M1–M4, Intel)** and **Windows 10/11**:

- **macOS Apple M5 Series**: [`public/downloads/OmniForge-v1.0.0-macOS-AppleM5.dmg`](public/downloads/OmniForge-v1.0.0-macOS-AppleM5.dmg)
- **macOS Apple Silicon (M1, M2, M3, M4)**: [`public/downloads/OmniForge-v1.0.0-macOS-AppleSilicon.dmg`](public/downloads/OmniForge-v1.0.0-macOS-AppleSilicon.dmg)
- **macOS Intel Processor**: [`public/downloads/OmniForge-v1.0.0-macOS-Intel.dmg`](public/downloads/OmniForge-v1.0.0-macOS-Intel.dmg)
- **macOS Universal Installer**: [`public/downloads/OmniForge-v1.0.0-macOS-Universal.dmg`](public/downloads/OmniForge-v1.0.0-macOS-Universal.dmg)
- **Windows 10 & 11 Setup**: [`public/downloads/OmniForge-v1.0.0-Windows-Setup.exe`](public/downloads/OmniForge-v1.0.0-Windows-Setup.exe)
- **Chrome Extension Package**: [`public/downloads/Olym-AI-Chrome-Extension.zip`](public/downloads/Olym-AI-Chrome-Extension.zip)

---

## 🚀 Installation & Setup

### 🌐 1. Live Cloudflare Domain Deployment
Access the live studio application directly online:
- **Cloudflare Workers Live Domain**: [https://omniforge-studio.workers.dev](https://omniforge-studio.workers.dev)
- **Custom Studio Subdomain**: [https://studio.omniforge.dev](https://studio.omniforge.dev)

### 💻 2. Running the Web Studio Locally
```bash
# Clone the official repository
git clone https://github.com/tempsarvan/omniforge.git
cd omniforge

# Install dependencies
npm install

# Launch local development server
npm run dev
```
Open [http://localhost:3001/omniforge](http://localhost:3001/omniforge) in your browser.

### 2. Packaging Desktop Installers
```bash
# Package macOS DMG & APP bundles
node scripts/build-omniforge-installers.js

# Package Windows Setup Installer
node scripts/build-windows-app.js

# Package Chrome Extension ZIP
node scripts/package-extension.js
```

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for details.

---

<div align="center">
  <sub>Built with ❤️ by the OmniForge Core Open Source Team</sub>
</div>
