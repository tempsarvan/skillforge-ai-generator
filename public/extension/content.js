// Olym AI Content Script — Deep Site Scraper & Asset Extractor Engine
console.log('✦ Olym AI Deep Site Scraper Active');

// Extract all HTML, linked CSS, JS scripts, and media assets
async function scrapeCompleteWebsite() {
  const pageUrl = window.location.href;
  const pageTitle = document.title || 'Untitled Page';

  // 1. Full HTML Source Code
  const fullHtml = document.documentElement.outerHTML;

  // 2. Extract All Scripts (Inline & External JS)
  const scripts = [];
  const scriptTags = Array.from(document.querySelectorAll('script'));

  for (let i = 0; i < Math.min(scriptTags.length, 30); i++) {
    const s = scriptTags[i];
    const src = s.src;
    if (src) {
      try {
        const res = await fetch(src, { mode: 'cors' });
        if (res.ok) {
          const code = await res.text();
          scripts.push({ type: 'external', url: src, name: src.split('/').pop() || `script_${i}.js`, content: code.slice(0, 50000) });
        } else {
          scripts.push({ type: 'external', url: src, name: src.split('/').pop() || `script_${i}.js`, content: `// Failed to fetch: HTTP ${res.status}` });
        }
      } catch (err) {
        scripts.push({ type: 'external', url: src, name: src.split('/').pop() || `script_${i}.js`, content: `// External asset: ${src}` });
      }
    } else if (s.innerText.trim()) {
      scripts.push({ type: 'inline', name: `inline_script_${i}.js`, content: s.innerText.trim().slice(0, 50000) });
    }
  }

  // 3. Extract All Stylesheets (Inline CSS & External CSS)
  const styles = [];
  const linkTags = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
  const styleTags = Array.from(document.querySelectorAll('style'));

  for (let i = 0; i < Math.min(linkTags.length, 20); i++) {
    const l = linkTags[i];
    const href = l.href;
    if (href) {
      try {
        const res = await fetch(href, { mode: 'cors' });
        if (res.ok) {
          const cssCode = await res.text();
          styles.push({ type: 'external', url: href, name: href.split('/').pop() || `style_${i}.css`, content: cssCode.slice(0, 50000) });
        } else {
          styles.push({ type: 'external', url: href, name: href.split('/').pop() || `style_${i}.css`, content: `/* Failed to fetch: HTTP ${res.status} */` });
        }
      } catch (err) {
        styles.push({ type: 'external', url: href, name: href.split('/').pop() || `style_${i}.css`, content: `/* Linked CSS: ${href} */` });
      }
    }
  }

  styleTags.forEach((st, i) => {
    if (st.innerText.trim()) {
      styles.push({ type: 'inline', name: `inline_style_${i}.css`, content: st.innerText.trim().slice(0, 50000) });
    }
  });

  // 4. Extract Images & Media Assets
  const assets = Array.from(document.querySelectorAll('img, svg, video, audio')).slice(0, 40).map((el, i) => {
    const src = el.src || el.getAttribute('href') || (el.tagName === 'SVG' ? 'Inline SVG' : '');
    return {
      tagName: el.tagName.toLowerCase(),
      name: src.split('/').pop() || `asset_${i}`,
      src: src
    };
  });

  return {
    url: pageUrl,
    title: pageTitle,
    scrapedAt: new Date().toISOString(),
    stats: {
      htmlBytes: fullHtml.length,
      jsFilesCount: scripts.length,
      cssFilesCount: styles.length,
      mediaAssetsCount: assets.length
    },
    html: fullHtml.slice(0, 80000),
    scripts,
    styles,
    assets
  };
}

// Listen for scrape messages from extension popup/sidepanel
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'SCRAPE_FULL_WEBSITE') {
    scrapeCompleteWebsite().then(siteData => {
      sendResponse({ success: true, siteData });
    }).catch(err => {
      sendResponse({ success: false, error: err.message });
    });
    return true;
  }
});
