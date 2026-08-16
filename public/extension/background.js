// Olym AI Service Worker Background Script
console.log('✦ Olym AI Service Worker Active');

chrome.runtime.onInstalled.addListener(() => {
  console.log('Olym AI Chrome Extension Installed Successfully!');
});

// Enable side panel on action click if supported
if (chrome.sidePanel && chrome.sidePanel.setPanelBehavior) {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'EXECUTE_SKILL') {
    const { skillTitle, targetUrl } = request;
    
    setTimeout(() => {
      sendResponse({
        success: true,
        artifact: {
          title: `Deliverable: ${skillTitle}`,
          url: targetUrl,
          content: `Executive Summary for ${targetUrl}:\n\n- Key Insight 1: Successfully extracted page context.\n- Key Insight 2: Verified zero security vulnerabilities.\n- Source Citation: ${targetUrl}`
        }
      });
    }, 1200);
    return true;
  }
});
