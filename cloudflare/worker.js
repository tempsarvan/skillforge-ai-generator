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

    // Proxy request to Next.js origin server
    try {
      const response = await fetch(request);
      return response;
    } catch (err) {
      return new Response(`Cloudflare Worker Edge Proxy Active for ${url.hostname}`, {
        headers: { 'Content-Type': 'text/html' }
      });
    }
  }
};

export default workerHandler;
