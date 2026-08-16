import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
  }

  try {
    let validUrl = targetUrl;
    if (!validUrl.startsWith('http://') && !validUrl.startsWith('https://')) {
      validUrl = 'https://' + validUrl;
    }

    const response = await fetch(validUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9'
      },
      redirect: 'follow'
    });

    const contentType = response.headers.get('content-type') || 'text/html';

    // If HTML content, strip restrictive X-Frame-Options & CSP headers and inject base tag for relative links
    if (contentType.includes('text/html')) {
      let htmlText = await response.text();
      const origin = new URL(validUrl).origin;

      // Inject <base href="..."> so relative scripts, styles, and form actions resolve properly
      const baseTag = `<head><base href="${validUrl}">`;
      htmlText = htmlText.replace(/<head>/i, baseTag);

      // Create response with stripped framing restrictions
      const headers = new Headers();
      headers.set('Content-Type', 'text/html; charset=utf-8');
      headers.set('Access-Control-Allow-Origin', '*');
      // Intentionally NOT setting X-Frame-Options or Content-Security-Policy to allow full embedding & login

      return new NextResponse(htmlText, { status: 200, headers });
    }

    // For images, CSS, JS and other subresources, proxy directly
    const buffer = await response.arrayBuffer();
    const headers = new Headers();
    headers.set('Content-Type', contentType);
    headers.set('Access-Control-Allow-Origin', '*');

    return new NextResponse(buffer, { status: response.status, headers });

  } catch (error) {
    return NextResponse.json(
      { error: `Chromium Proxy Error: ${error.message}` },
      { status: 500 }
    );
  }
}
