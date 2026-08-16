// Olym AI Sidepanel Logic — Site Scraper & Gemini AI Connector
document.addEventListener('DOMContentLoaded', () => {

  // Navigation Tabs Switcher
  const tabScraper = document.getElementById('tabScraper');
  const tabAI = document.getElementById('tabAI');
  const tabKey = document.getElementById('tabKey');

  const viewScraper = document.getElementById('viewScraper');
  const viewAI = document.getElementById('viewAI');
  const viewKey = document.getElementById('viewKey');

  function switchTab(activeTab, activeView) {
    [tabScraper, tabAI, tabKey].forEach(t => t.classList.remove('active'));
    [viewScraper, viewAI, viewKey].forEach(v => v.style.display = 'none');

    activeTab.classList.add('active');
    activeView.style.display = 'flex';
  }

  tabScraper.addEventListener('click', () => switchTab(tabScraper, viewScraper));
  tabAI.addEventListener('click', () => switchTab(tabAI, viewAI));
  tabKey.addEventListener('click', () => switchTab(tabKey, viewKey));

  // Scraped Site Data Store
  let currentSiteData = null;

  // 1. SCRAPE WEBSITE
  const scrapeBtn = document.getElementById('scrapeBtn');
  const metricsGrid = document.getElementById('metricsGrid');
  const fileExplorerCard = document.getElementById('fileExplorerCard');
  const fileTree = document.getElementById('fileTree');
  const codeViewerCard = document.getElementById('codeViewerCard');
  const codeViewerTitle = document.getElementById('codeViewerTitle');
  const codeViewerText = document.getElementById('codeViewerText');

  scrapeBtn.addEventListener('click', async () => {
    scrapeBtn.innerText = '⚡ Scraping HTML, JS, CSS, Assets...';
    scrapeBtn.style.opacity = '0.7';

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab) {
      alert('No active tab found.');
      return;
    }

    chrome.tabs.sendMessage(tab.id, { action: 'SCRAPE_FULL_WEBSITE' }, (response) => {
      scrapeBtn.innerText = '⚡ Scrape Complete Website';
      scrapeBtn.style.opacity = '1';

      if (response && response.success && response.siteData) {
        currentSiteData = response.siteData;
        renderScrapeMetrics(currentSiteData);
        renderFileTree(currentSiteData);
      } else {
        alert('Could not scrape this page. Try refreshing the page first.');
      }
    });
  });

  function renderScrapeMetrics(data) {
    document.getElementById('mHtmlBytes').innerText = `${Math.round(data.stats.htmlBytes / 1024)} KB`;
    document.getElementById('mJsCount').innerText = `${data.stats.jsFilesCount} Files`;
    document.getElementById('mCssCount').innerText = `${data.stats.cssFilesCount} Files`;
    document.getElementById('mAssetCount').innerText = `${data.stats.mediaAssetsCount} Assets`;

    metricsGrid.style.display = 'grid';
  }

  function renderFileTree(data) {
    fileTree.innerHTML = '';

    // Add HTML item
    const htmlItem = document.createElement('div');
    htmlItem.className = 'file-item';
    htmlItem.innerHTML = `<span>📄 index.html</span><span>${Math.round(data.html.length / 1024)} KB</span>`;
    htmlItem.addEventListener('click', () => showCodePreview('index.html', data.html));
    fileTree.appendChild(htmlItem);

    // Add JS files
    data.scripts.forEach((s) => {
      const item = document.createElement('div');
      item.className = 'file-item';
      item.innerHTML = `<span>📜 ${s.name}</span><span>${s.type}</span>`;
      item.addEventListener('click', () => showCodePreview(s.name, s.content));
      fileTree.appendChild(item);
    });

    // Add CSS files
    data.styles.forEach((c) => {
      const item = document.createElement('div');
      item.className = 'file-item';
      item.innerHTML = `<span>🎨 ${c.name}</span><span>${c.type}</span>`;
      item.addEventListener('click', () => showCodePreview(c.name, c.content));
      fileTree.appendChild(item);
    });

    fileExplorerCard.style.display = 'block';
  }

  function showCodePreview(title, content) {
    codeViewerTitle.innerText = `Inspect: ${title}`;
    codeViewerText.innerText = content || '// Empty file content';
    codeViewerCard.style.display = 'block';
  }

  // 2. EXPORT JSON BUNDLE
  const exportJsonBtn = document.getElementById('exportJsonBtn');
  exportJsonBtn.addEventListener('click', () => {
    if (!currentSiteData) {
      alert('Scrape a website first before exporting!');
      return;
    }

    const blob = new Blob([JSON.stringify(currentSiteData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `scraped_${currentSiteData.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });

  // 3. GEMINI AI API CONNECTOR
  const apiKeyInput = document.getElementById('apiKeyInput');
  const saveKeyBtn = document.getElementById('saveKeyBtn');
  const keySavedMsg = document.getElementById('keySavedMsg');

  // Load saved API key
  chrome.storage.local.get(['geminiApiKey'], (res) => {
    if (res.geminiApiKey) {
      apiKeyInput.value = res.geminiApiKey;
    }
  });

  saveKeyBtn.addEventListener('click', () => {
    const val = apiKeyInput.value.trim();
    chrome.storage.local.set({ geminiApiKey: val }, () => {
      keySavedMsg.style.display = 'block';
      setTimeout(() => keySavedMsg.style.display = 'none', 2000);
    });
  });

  // Quick Tags
  const aiPromptInput = document.getElementById('aiPromptInput');
  document.getElementById('tagAudit').addEventListener('click', () => {
    aiPromptInput.value = 'Audit this scraped website for security vulnerabilities, unhandled promise rejections, and secret key leaks.';
  });
  document.getElementById('tagEndpoints').addEventListener('click', () => {
    aiPromptInput.value = 'Extract all REST API endpoints, WebSockets URLs, and backend routes referenced in the scraped JavaScript files.';
  });
  document.getElementById('tagTokens').addEventListener('click', () => {
    aiPromptInput.value = 'Extract all design tokens, color hex values, CSS variables, and font families used across the stylesheets.';
  });
  document.getElementById('tagRefactor').addEventListener('click', () => {
    aiPromptInput.value = 'Refactor the scraped frontend HTML and JS components into clean, modern React 19 components.';
  });

  // Run Gemini AI Analysis
  const runAiBtn = document.getElementById('runAiBtn');
  const aiOutputCard = document.getElementById('aiOutputCard');
  const aiOutputText = document.getElementById('aiOutputText');

  runAiBtn.addEventListener('click', async () => {
    const prompt = aiPromptInput.value.trim();
    if (!prompt) {
      alert('Please enter an AI prompt or click one of the quick tags!');
      return;
    }

    aiOutputCard.style.display = 'block';
    aiOutputText.innerText = '✦ Connecting to Gemini AI model...\nAnalyzing scraped codebase bundle...';

    chrome.storage.local.get(['geminiApiKey'], async (res) => {
      const apiKey = res.geminiApiKey || '';

      // Prepare context snippet from currentSiteData or fallback
      let contextSnippet = '';
      if (currentSiteData) {
        contextSnippet = `Target Website: ${currentSiteData.title} (${currentSiteData.url})\n\nScraped HTML:\n${currentSiteData.html.slice(0, 4000)}\n\nJS Files (${currentSiteData.scripts.length}):\n${currentSiteData.scripts.map(s => s.name).join(', ')}`;
      } else {
        contextSnippet = 'No site scraped yet. Analyzing prompt directly.';
      }

      if (!apiKey) {
        // Fallback analysis simulation if user hasn't input key yet
        setTimeout(() => {
          aiOutputText.innerText = `[Olym Local Engine - Demo Mode]\n\nAnalysis for "${prompt}":\n\n1. Target: ${currentSiteData ? currentSiteData.url : 'Active Page'}\n2. DOM Node Count: ${currentSiteData ? currentSiteData.stats.htmlBytes : 'N/A'} bytes\n3. Result: Found ${currentSiteData ? currentSiteData.scripts.length : 0} JS scripts and ${currentSiteData ? currentSiteData.styles.length : 0} CSS stylesheets.\n\nTip: Add your Gemini API key in the "API Key" tab to enable live cloud Gemini 1.5 Flash inference!`;
        }, 1000);
        return;
      }

      // Call Gemini 1.5 Flash API with user key
      try {
        const apiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are Olym AI, an elite software auditor. Analyzing scraped site context:\n${contextSnippet}\n\nUser Question/Instruction: ${prompt}`
              }]
            }]
          })
        });

        const data = await apiRes.json();
        if (data.candidates && data.candidates[0].content.parts[0].text) {
          aiOutputText.innerText = data.candidates[0].content.parts[0].text;
        } else {
          aiOutputText.innerText = `Gemini API Response:\n${JSON.stringify(data, null, 2)}`;
        }
      } catch (err) {
        aiOutputText.innerText = `Error calling Gemini API: ${err.message}`;
      }
    });
  });

});
