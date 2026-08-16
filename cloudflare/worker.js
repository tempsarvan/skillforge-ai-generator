// Cloudflare Workers Edge Router for OmniForge Subdomain (studio.omniforge.dev)
const workerHandler = {
  async fetch(request) {
    const url = new URL(request.url);

    // Block any direct download attempts under /downloads/
    if (url.pathname.startsWith('/downloads/')) {
      return new Response(JSON.stringify({
        error: 'Downloads Permanently Disabled',
        message: 'Public binary downloads have been disabled by administrator policy on studio.omniforge.dev.',
        status: 403
      }), {
        status: 403,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    // Return live HTML Studio response
    return new Response(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>OmniForge Developer Studio — Cloudflare Edge</title>
  <style>
    :root { --bg: #060608; --card: #0c0c10; --border: #27272a; --accent: #00ff88; --text: #fafafa; --muted: #a1a1aa; }
    body { margin: 0; background: var(--bg); color: var(--text); font-family: system-ui, -apple-system, sans-serif; display: flex; flex-direction: column; min-height: 100vh; }
    header { background: rgba(12,12,16,0.9); border-bottom: 1px solid var(--border); padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; }
    .badge { background: rgba(0,255,136,0.15); color: var(--accent); border: 1px solid rgba(0,255,136,0.3); padding: 4px 10px; borderRadius: 20px; font-size: 0.78rem; font-family: monospace; font-weight: 600; }
    .container { max-width: 900px; margin: 60px auto; padding: 0 24px; text-align: center; }
    h1 { font-size: 3rem; font-weight: 800; margin-bottom: 16px; letter-spacing: -0.02em; }
    p { color: var(--muted); font-size: 1.1rem; line-height: 1.6; max-width: 680px; margin: 0 auto 32px; }
    .card { background: var(--card); border: 1px solid var(--border); border-radius: 14px; padding: 32px; text-align: left; font-family: monospace; margin-bottom: 24px; }
    .status-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid var(--border); font-size: 0.9rem; }
    .status-row:last-child { border-bottom: none; }
    .green { color: var(--accent); }
    .red { color: #ef4444; }
    .btn { display: inline-flex; align-items: center; gap: 8px; background: var(--accent); color: #000; padding: 12px 24px; border-radius: 8px; font-weight: 700; text-decoration: none; font-size: 0.95rem; }
  </style>
</head>
<body>
  <header>
    <div style="display:flex; align-items:center; gap:12px;">
      <div style="width:12px; height:12px; border-radius:50%; background:var(--accent);"></div>
      <strong style="font-size:1rem;">OmniForge Developer Studio</strong>
    </div>
    <span class="badge">CLOUDFLARE EDGE ACTIVE</span>
  </header>
  <div class="container">
    <span class="badge">🌐 OFFICIAL CLOUDFLARE WORKERS DOMAIN</span>
    <h1>OmniForge Edge Engine Live</h1>
    <p>The autonomous developer studio, website scraper, and Git automator pipeline is deployed live on Cloudflare Workers edge nodes worldwide.</p>
    <div class="card">
      <div class="status-row"><span>Deployment Target</span><span class="green">Cloudflare Workers Edge Network</span></div>
      <div class="status-row"><span>Domain Active</span><span class="green">${url.hostname}</span></div>
      <div class="status-row"><span>Edge Response SLA</span><span class="green">&lt; 10ms</span></div>
      <div class="status-row"><span>Public Binary Downloads</span><span class="red">DISABLED (Admin Security Policy)</span></div>
      <div class="status-row"><span>Git Synchronization</span><span class="green">github.com/tempsarvan/omniforge</span></div>
    </div>
    <a href="https://github.com/tempsarvan/skillforge-ai-generator" target="_blank" class="btn">View Official GitHub Repository →</a>
  </div>
</body>
</html>`, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  }
};

export default workerHandler;
