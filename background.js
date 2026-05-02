// Canopy Ruler - Background Service Worker
// Clean, non-minified code

const CONTEXT_MENU_ID = 'canopy-ruler-inspect';

// Track which tab has the side panel open
var panelTabId = null;

// Set side panel behavior
function initSidePanel() {
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: false }).catch(function() {});
}

// Initialize on install
chrome.runtime.onInstalled.addListener(function() {
    initSidePanel();
    chrome.contextMenus.removeAll(function() {
        chrome.contextMenus.create({
            id: CONTEXT_MENU_ID,
            title: 'Inspect with Canopy Ruler',
            contexts: ['page', 'frame']
        });
    });
});

// Initialize on browser startup
chrome.runtime.onStartup.addListener(function() {
    initSidePanel();
});

// Also call it now in case extension was just reloaded
initSidePanel();

// Track tab changes to close panel when switching tabs
chrome.tabs.onActivated.addListener(function(activeInfo) {
    if (panelTabId !== null && panelTabId !== activeInfo.tabId) {
        // User switched to a different tab, close the panel on the previous tab
        sendToTab(panelTabId, { action: 'stopInspecting' });
        panelTabId = null;
    }
});

// Handle tab updates (navigation) - close panel if tab navigates away
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (panelTabId === tabId && changeInfo.status === 'loading') {
        // Tab is loading a new page, close the panel
        sendToTab(tabId, { action: 'stopInspecting' });
        panelTabId = null;
    }
});

// Handle context menu click
chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === CONTEXT_MENU_ID) {
        activateTab(tab.id);
    }
});

// Handle action click (toolbar icon)
chrome.action.onClicked.addListener(function(tab) {
    activateTab(tab.id);
});

// Handle keyboard commands
chrome.commands.onCommand.addListener(function(command, tab) {
    if (command === '_execute_action') {
        activateTab(tab.id);
    }
    if (command === 'select_child') {
        sendToTab(tab.id, { action: 'selectChild' });
    }
    if (command === 'select_parent') {
        sendToTab(tab.id, { action: 'selectParent' });
    }
});

// Activate tab - shows dock but does NOT open panel automatically
function activateTab(tabId) {
    sendToTab(tabId, { action: 'showDock' });
}

// Handle messages from content scripts and side panel
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    var tabId = sender.tab && sender.tab.id;

    if (tabId) {
        if (msg.action === 'openSidePanel') {
            panelTabId = tabId;
            chrome.sidePanel.open({ tabId: tabId }).catch(function(err) {
                console.error('[Canopy Ruler] Failed to open panel:', err);
            });
            return false;
        }
        
        if (msg.action === 'closeSidePanel') {
            // Chrome MV3 doesn't have a direct API to close the side panel
            // But we can tell the panel to clear itself and show empty state
            if (panelTabId === tabId) {
                panelTabId = null;
            }
            chrome.runtime.sendMessage({ action: 'panelClose' }).catch(function() {});
            return false;
        }
        
        if (msg.action === 'captureScreenshot') {
            captureAndDownloadScreenshot(tabId);
            return false;
        }

        if (msg.action === 'downloadFont') {
            downloadFontFile(msg.url, msg.filename);
            return false;
        }

        if (msg.action === 'fetchServerHeaders') {
            fetchServerHeaders(msg.url, sendResponse);
            return true;
        }

        // Panel closed by user (Chrome's built-in X or window.close)
        if (msg.action === 'panelClosedByUser') {
            if (panelTabId !== null) {
                sendToTab(panelTabId, { action: 'panelClosedByUser' });
            }
            panelTabId = null;
            return false;
        }
    }

    if (msg.target === 'background' && tabId) {
        if (msg.action === 'analyzePage') {
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                func: analyzePage
            }).then(function(results) {
                sendResponse(results[0] && results[0].result);
            }).catch(function() { 
                sendResponse(null); 
            });
            return true;
        }
    }
});

// Download font file using Chrome downloads API
function downloadFontFile(url, filename) {
    var ext = url.split('.').pop().split('?')[0].split('#')[0];
    if (!ext || ext.length > 5) ext = 'woff2';
    chrome.downloads.download({
        url: url,
        filename: filename + '.' + ext,
        saveAs: false
    }, function(downloadId) {
        if (chrome.runtime.lastError) {
            console.error('[Canopy Ruler] Font download error:', chrome.runtime.lastError.message);
        }
    });
}

// Capture screenshot and download
function captureAndDownloadScreenshot(tabId) {
    // captureVisibleTab needs windowId, not tabId
    // Get the tab info first to find its window
    chrome.tabs.get(tabId, function(tab) {
        if (chrome.runtime.lastError) {
            console.error('[Canopy Ruler] Cannot get tab:', chrome.runtime.lastError.message);
            return;
        }
        
        var windowId = tab.windowId;
        
        chrome.tabs.captureVisibleTab(windowId, { format: 'png' }, function(dataUrl) {
            if (chrome.runtime.lastError) {
                console.error('[Canopy Ruler] Screenshot error:', chrome.runtime.lastError.message);
                return;
            }
            
            // Generate filename with timestamp
            var now = new Date();
            var timestamp = now.getFullYear() + '-' + 
                           String(now.getMonth() + 1).padStart(2, '0') + '-' +
                           String(now.getDate()).padStart(2, '0') + '_' +
                           String(now.getHours()).padStart(2, '0') + '-' +
                           String(now.getMinutes()).padStart(2, '0') + '-' +
                           String(now.getSeconds()).padStart(2, '0');
            var filename = 'canopy-screenshot-' + timestamp + '.png';
            
            // Download the screenshot
            chrome.downloads.download({
                url: dataUrl,
                filename: filename,
                saveAs: false
            }, function(downloadId) {
                if (chrome.runtime.lastError) {
                    console.error('[Canopy Ruler] Download error:', chrome.runtime.lastError.message);
                } else {
                    console.log('[Canopy Ruler] Screenshot downloaded:', filename);
                }
            });
        });
    });
}

// Fetch server headers from a URL
function fetchServerHeaders(url, sendResponse) {
    fetch(url, { method: 'HEAD', redirect: 'follow' })
        .then(function(resp) {
            var headers = {};
            resp.headers.forEach(function(val, key) {
                headers[key.toLowerCase()] = val;
            });
            sendResponse({ headers: headers, status: resp.status });
        })
        .catch(function(err) {
            console.error('[Canopy Ruler] Failed to fetch headers:', err);
            sendResponse({ headers: {}, error: err.message });
        });
}

// Send message to content script with error handling
function sendToTab(tabId, msg) {
    chrome.tabs.sendMessage(tabId, msg, function(res) {
        if (chrome.runtime.lastError) {
            // Content script not loaded, inject it
            if (chrome.runtime.lastError.message.includes('Receiving end does not exist')) {
                injectContentScript(tabId, msg);
            } else {
                console.log('[Canopy Ruler]', chrome.runtime.lastError.message);
            }
        }
    });
}

// Inject content script into tab
function injectContentScript(tabId, msg) {
    chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['scripts/content.js']
    }).then(function() {
        // Retry sending message after injection
        setTimeout(function() {
            chrome.tabs.sendMessage(tabId, msg);
        }, 100);
    }).catch(function(err) {
        console.error('[Canopy Ruler] Failed to inject content script:', err);
    });
}

// Analyze page function - injected into page
function analyzePage() {
    function getTechnologies() {
        var techs = [];
        var html = document.documentElement.outerHTML.toLowerCase();
        
        // Frameworks
        if (window.React || window.react || html.includes('react')) techs.push({ name: 'React', confidence: 'high' });
        if (window.Vue || window.vue || html.includes('vue.js')) techs.push({ name: 'Vue.js', confidence: 'high' });
        if (window.angular || html.includes('angular')) techs.push({ name: 'Angular', confidence: 'high' });
        if (window.jQuery || html.includes('jquery')) techs.push({ name: 'jQuery', confidence: 'high' });
        if (window.Bootstrap || html.includes('bootstrap')) techs.push({ name: 'Bootstrap', confidence: 'high' });
        if (html.includes('tailwind')) techs.push({ name: 'Tailwind CSS', confidence: 'high' });
        if (html.includes('wordpress')) techs.push({ name: 'WordPress', confidence: 'high' });
        if (window.Next || html.includes('next.js')) techs.push({ name: 'Next.js', confidence: 'high' });
        if (window.Nuxt || html.includes('nuxt')) techs.push({ name: 'Nuxt.js', confidence: 'high' });
        if (window.Svelte || html.includes('svelte')) techs.push({ name: 'Svelte', confidence: 'high' });
        
        // Libraries
        if (window._ || html.includes('lodash')) techs.push({ name: 'Lodash', confidence: 'medium' });
        if (window.axios || html.includes('axios')) techs.push({ name: 'Axios', confidence: 'medium' });
        if (window.Chart || html.includes('chart.js')) techs.push({ name: 'Chart.js', confidence: 'medium' });
        if (window.anime || html.includes('anime.js')) techs.push({ name: 'Anime.js', confidence: 'medium' });
        
        // CMS
        if (html.includes('shopify')) techs.push({ name: 'Shopify', confidence: 'high' });
        if (html.includes('wix')) techs.push({ name: 'Wix', confidence: 'high' });
        if (html.includes('squarespace')) techs.push({ name: 'Squarespace', confidence: 'high' });
        
        return techs;
    }

    function getFonts() {
        var fonts = [];
        var seen = {};
        var elements = document.querySelectorAll('*');
        
        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            var f = window.getComputedStyle(el).fontFamily;
            var fontList = f.split(',');
            
            for (var j = 0; j < fontList.length; j++) {
                var font = fontList[j].trim().replace(/['"]/g, '');
                if (font && !seen[font] && 
                    !['inherit', 'serif', 'sans-serif', 'monospace', 'cursive', 'fantasy', '-apple-system', 'blinkmacsystemfont', 'segoe ui'].includes(font.toLowerCase())) {
                    seen[font] = true;
                    fonts.push(font);
                }
            }
        }
        
        return fonts.slice(0, 20);
    }

    function getMetaTags() {
        var meta = {};
        var tags = document.querySelectorAll('meta');
        
        for (var i = 0; i < tags.length; i++) {
            var tag = tags[i];
            var name = tag.getAttribute('name') || tag.getAttribute('property');
            var content = tag.getAttribute('content');
            if (name && content) {
                meta[name] = content;
            }
        }
        
        return meta;
    }

    return {
        title: document.title,
        url: window.location.href,
        viewport: { 
            width: window.innerWidth, 
            height: window.innerHeight 
        },
        screen: {
            width: window.screen.width,
            height: window.screen.height,
            colorDepth: window.screen.colorDepth
        },
        technologies: getTechnologies(),
        fonts: getFonts(),
        meta: getMetaTags(),
        doctype: document.doctype ? document.doctype.name : 'unknown',
        documentMode: document.compatMode,
        language: document.documentElement.lang || 'unknown'
    };
}