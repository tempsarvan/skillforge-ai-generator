// Olym AI Content Script — Active Page DOM & Markdown Extractor
console.log('✦ Olym AI Content Script Active');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'EXTRACT_PAGE_CONTEXT') {
    const title = document.title || '';
    const url = window.location.href || '';
    const headings = Array.from(document.querySelectorAll('h1, h2, h3')).map(h => h.innerText.trim()).filter(Boolean);
    const bodyText = document.body ? document.body.innerText.slice(0, 4000) : '';

    sendResponse({
      title,
      url,
      headings,
      bodyText,
      nodeCount: document.querySelectorAll('*').length
    });
  }
  return true;
});
