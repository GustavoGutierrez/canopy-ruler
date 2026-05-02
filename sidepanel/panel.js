// Canopy Ruler - Side Panel Controller
// Clean, non-minified code with full functionality

(function() {
    'use strict';

    // ===== I18N =====
    var _lang = 'en';
    var _messages = {
        // Tabs
        'tab.element':  { en: 'Element',  es: 'Elemento' },
        'tab.page':     { en: 'Page',     es: 'Página' },
        'tab.about':    { en: 'About',    es: 'Acerca de' },
        'tab.settings': { en: 'Settings', es: 'Ajustes' },

        // Actions
        'action.inspect':    { en: 'Inspect Element',     es: 'Inspeccionar Elemento' },
        'action.xray':       { en: 'X-Ray Mode',          es: 'Modo Rayos X' },
        'action.copy':       { en: 'Copy CSS',            es: 'Copiar CSS' },
        'action.copySelector': { en: 'Copy Selector',     es: 'Copiar Selector' },
        'action.copyHTML':   { en: 'Copy HTML',           es: 'Copiar HTML' },
        'action.delete':     { en: 'Delete Element',      es: 'Eliminar Elemento' },
        'action.exportCSV':  { en: 'Export CSV',          es: 'Exportar CSV' },
        'action.copyPalette':{ en: 'Copy All Colors',     es: 'Copiar Paleta' },
        'action.downloadAll':{ en: 'Download All',        es: 'Descargar Todo' },

        // Sections
        'section.overview':     { en: 'Overview',       es: 'Vista General' },
        'section.dimensions':   { en: 'Dimensions',     es: 'Dimensiones' },
        'section.position':     { en: 'Position',       es: 'Posición' },
        'section.layout':       { en: 'Layout',         es: 'Layout' },
        'section.colors':       { en: 'Colors',         es: 'Colores' },
        'section.typography':   { en: 'Typography',     es: 'Tipografía' },
        'section.boxmodel':     { en: 'Box Model',      es: 'Modelo de Caja' },
        'section.resources':    { en: 'Resources',      es: 'Recursos' },
        'section.selector':     { en: 'Selector',       es: 'Selector' },
        'section.styles':       { en: 'Styles',         es: 'Estilos' },
        'section.meta':         { en: 'Meta Tags & SEO',es: 'Meta Tags y SEO' },
        'section.technologies': { en: 'Technologies',   es: 'Tecnologías Detectadas' },
        'section.headtags':     { en: 'Head Tags',      es: 'Etiquetas del Head' },
        'section.palette':      { en: 'Color Palette',  es: 'Paleta de Colores' },

        // Labels
        'label.title':       { en: 'Title',       es: 'Título' },
        'label.description': { en: 'Description', es: 'Descripción' },
        'label.url':         { en: 'URL',          es: 'URL' },
        'label.margin':      { en: 'Margin',       es: 'Margen' },
        'label.border':      { en: 'Border',       es: 'Borde' },
        'label.padding':     { en: 'Padding',      es: 'Relleno' },
        'label.content':     { en: 'Content',      es: 'Contenido' },
        'label.width':       { en: 'Width',        es: 'Ancho' },
        'label.height':      { en: 'Height',       es: 'Alto' },
        'label.left':        { en: 'Left',         es: 'Izquierda' },
        'label.top':         { en: 'Top',          es: 'Arriba' },
        'label.background':  { en: 'Background',   es: 'Fondo' },
        'label.textColor':   { en: 'Text Color',   es: 'Color de Texto' },
        'label.display':     { en: 'Display',      es: 'Display' },
        'label.position':    { en: 'Position',     es: 'Position' },
        'label.overflow':    { en: 'Overflow',     es: 'Overflow' },
        'label.fontFamily':  { en: 'Font Family',  es: 'Familia' },
        'label.fontSize':    { en: 'Font Size',    es: 'Tamaño' },
        'label.fontWeight':  { en: 'Font Weight',  es: 'Peso' },
        'label.lineHeight':  { en: 'Line Height',  es: 'Interlineado' },
        'label.textAlign':   { en: 'Text Align',   es: 'Alineación' },
        'label.boxSizing':   { en: 'Box Sizing',   es: 'Box Sizing' },
        'label.noElement':   { en: 'No element selected', es: 'Ningún elemento seleccionado' },
        'label.selectHint':  { en: 'Click the inspect button or use Alt+Shift+S to start', es: 'Clic en inspeccionar o usa Alt+Shift+S' },

        // Technologies
        'tech.analyzing':   { en: 'Analyzing...', es: 'Analizando...' },
        'tech.none':        { en: 'No technologies detected', es: 'No se detectaron tecnologías' },

        // Head tags
        'headtags.loading': { en: 'Loading...', es: 'Cargando...' },
        'headtags.none':    { en: 'No additional tags found', es: 'No se encontraron etiquetas adicionales' },

        // Meta tags
        'meta.none': { en: 'No meta tags found', es: 'No se encontraron meta tags' },

        // Colors palette
        'palette.loading': { en: 'Analyzing colors...', es: 'Analizando colores...' },
        'palette.none':    { en: 'No colors detected', es: 'No se detectaron colores' },

        // Toasts
        'toast.copied':      { en: 'Copied!', es: '¡Copiado!' },
        'toast.cssCopied':   { en: 'CSS copied to clipboard', es: 'CSS copiado al portapapeles' },
        'toast.selectorCopied': { en: 'Selector copied', es: 'Selector copiado' },
        'toast.htmlCopied':  { en: 'HTML copied to clipboard', es: 'HTML copiado al portapapeles' },
        'toast.elementDeleted': { en: 'Element deleted', es: 'Elemento eliminado' },
        'toast.downloading': { en: 'Downloading...', es: 'Descargando...' },
        'toast.downloadError': { en: 'Error downloading', es: 'Error al descargar' },
        'toast.csvExported': { en: 'CSV exported successfully', es: 'CSV exportado correctamente' },
        'toast.noData':      { en: 'No data available', es: 'No hay datos disponibles' },
        'toast.noTech':      { en: 'No technologies detected', es: 'No se detectaron tecnologías' },
        'toast.noColors':    { en: 'No colors to copy', es: 'No hay colores para copiar' },
        'toast.paletteCopied': { en: 'Palette copied', es: 'Paleta copiada' },
        'toast.copyError':   { en: 'Error copying palette', es: 'Error al copiar la paleta' },
        'toast.panelClose':  { en: 'Panel closed. Select an element to inspect.', es: 'Panel cerrado. Selecciona un elemento.' },

        // Language
        'lang.switch':  { en: 'ES', es: 'EN' },
        'lang.tooltip': { en: 'Switch to Spanish', es: 'Cambiar a Inglés' },
    };

    function t(key) {
        var msg = _messages[key];
        if (!msg) return key;
        return msg[_lang] || msg.en || key;
    }

    function setPanelLang(lang) {
        _lang = lang;
        try { chrome.storage.local.set({ canopyLang: lang }); } catch(e) {}
        refreshAllText();
    }

    // Load saved language
    try {
        chrome.storage.local.get(['canopyLang'], function(result) {
            if (result.canopyLang && (result.canopyLang === 'en' || result.canopyLang === 'es')) {
                _lang = result.canopyLang;
            }
            refreshAllText();
        });
    } catch(e) {
        refreshAllText();
    }

    function refreshAllText() {
        updateTabButtons();
        updateHeaderText();
        updateSectionLabels();
        updateActionButtons();
        updatePageLabels();
        updateLangButton();
    }

    function updateLangButton() {
        var btn = document.getElementById('btn-lang');
        var flag = document.getElementById('btn-lang-flag');
        if (btn) btn.title = t('lang.tooltip');
        if (flag) flag.src = _lang === 'en' ? '../images/colombia.svg' : '../images/usa.svg';
    }

    var _sectionLabelMap = {
        'section-title-overview':     'section.overview',
        'section-title-dimensions':   'section.dimensions',
        'section-title-position':     'section.position',
        'section-title-layout':       'section.layout',
        'section-title-colors':       'section.colors',
        'section-title-typography':   'section.typography',
        'section-title-boxmodel':     'section.boxmodel',
        'section-title-resources':    'section.resources',
        'section-title-selector':     'section.selector',
        'section-title-styles':       'section.styles',
        'section-title-meta':         'section.meta',
        'section-title-technologies': 'section.technologies',
        'section-title-headtags':     'section.headtags',
        'section-title-palette':      'section.palette',
    };

    function updateSectionLabels() {
        Object.keys(_sectionLabelMap).forEach(function(id) {
            var el = document.getElementById(id);
            if (el) el.textContent = t(_sectionLabelMap[id]);
        });
    }

    function updateActionButtons() {
        var actions = {
            'btn-inspect': 'action.inspect',
            'btn-xray': 'action.xray',
            'btn-copy': 'action.copy',
            'btn-copy-selector': 'action.copySelector',
            'btn-copy-html': 'action.copyHTML',
            'btn-delete-element': 'action.delete',
            'btn-export-csv': 'action.exportCSV',
            'btn-copy-palette': 'action.copyPalette',
            'btn-download-all': 'action.downloadAll',
        };
        Object.keys(actions).forEach(function(id) {
            var el = document.getElementById(id);
            if (el) el.title = t(actions[id]);
        });
    }

    let currentElement = null;
    let xrayMode = false;
    let isInspecting = false;
    let isExtensionClosed = false;
    let activeTab = 'element';
    let currentPageInfo = null;

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        setupEventListeners();
        setupTabs();
        setupCopyableItems();
        updateUI();
    }

    function setupEventListeners() {
        // Listen for messages from content script
        chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
            if (request.action === 'elementSelected') {
                currentElement = request.element;
                isExtensionClosed = false;
                updateUI();
            }
            if (request.action === 'inspectingState') {
                isInspecting = request.isInspecting;
                updateInspectingState();
            }
            if (request.action === 'panelClose') {
                isExtensionClosed = true;
                currentElement = null;
                isInspecting = false;
                updateUI();
                updateInspectingState();
            }
        });

        // Inspect button
        const btnInspect = document.getElementById('btn-inspect');
        if (btnInspect) {
            btnInspect.addEventListener('click', function() {
                isInspecting = !isInspecting;
                if (isInspecting) {
                    sendToContent({ action: 'startInspecting' });
                } else {
                    sendToContent({ action: 'stopInspecting' });
                }
            });
        }

        // X-Ray toggle
        const btnXray = document.getElementById('btn-xray');
        if (btnXray) {
            btnXray.addEventListener('click', function() {
                xrayMode = !xrayMode;
                this.classList.toggle('active', xrayMode);
                sendToContent({ action: 'toggleXRay', enabled: xrayMode });
            });
        }

        // Copy CSS
        const btnCopy = document.getElementById('btn-copy');
        if (btnCopy) {
            btnCopy.addEventListener('click', function() {
                if (currentElement) {
                    copyToClipboard(generateCSS(currentElement));
                    showToast('CSS copied to clipboard');
                }
            });
        }

        // Copy selector
        const btnCopySelector = document.getElementById('btn-copy-selector');
        if (btnCopySelector) {
            btnCopySelector.addEventListener('click', function() {
                if (currentElement) {
                    copyToClipboard(currentElement.selector);
                    showToast('Selector copied');
                }
            });
        }

        // Copy HTML
        const btnCopyHTML = document.getElementById('btn-copy-html');
        if (btnCopyHTML) {
            btnCopyHTML.addEventListener('click', function() {
                if (currentElement && currentElement.outerHTML) {
                    copyToClipboard(currentElement.outerHTML);
                    showToast('HTML copied');
                }
            });
        }

        // Delete Element
        const btnDeleteElement = document.getElementById('btn-delete-element');
        if (btnDeleteElement) {
            btnDeleteElement.addEventListener('click', function() {
                if (currentElement && currentElement.selector) {
                    sendToContent({ action: 'deleteElement', selector: currentElement.selector });
                    currentElement = null;
                    updateUI();
                    showToast('Element deleted');
                }
            });
        }

        // Navigation buttons
        const btnParent = document.getElementById('btn-parent');
        const btnChild = document.getElementById('btn-child');
        
        if (btnParent) {
            btnParent.addEventListener('click', function() {
                sendToContent({ action: 'selectParent' });
            });
        }
        
        if (btnChild) {
            btnChild.addEventListener('click', function() {
                sendToContent({ action: 'selectChild' });
            });
        }

        // Download all resources button
        const btnDownloadAll = document.getElementById('btn-download-all');
        if (btnDownloadAll) {
            btnDownloadAll.addEventListener('click', function() {
                downloadAllImages();
            });
        }

        // Export technologies CSV button
        const btnExportCSV = document.getElementById('btn-export-csv');
        if (btnExportCSV) {
            btnExportCSV.addEventListener('click', function() {
                exportTechnologiesCSV();
            });
        }

        const btnCopyPalette = document.getElementById('btn-copy-palette');
        if (btnCopyPalette) {
            btnCopyPalette.addEventListener('click', function() {
                copyPalette();
            });
        }

        // Language switch button
        const btnLang = document.getElementById('btn-lang');
        if (btnLang) {
            btnLang.addEventListener('click', function() {
                var newLang = _lang === 'en' ? 'es' : 'en';
                setPanelLang(newLang);
            });
        }
    }

    function updateTabButtons() {
        var tabs = {
            'tab-element': 'tab.element',
            'tab-page': 'tab.page',
            'tab-about': 'tab.about',
        };
        Object.keys(tabs).forEach(function(id) {
            var el = document.getElementById(id);
            if (el) {
                var svg = el.querySelector('svg');
                var svgHtml = svg ? svg.outerHTML : '';
                el.innerHTML = svgHtml + ' ' + t(tabs[id]);
            }
        });
    }

    function updateHeaderText() {
        // Header is static SVG logo — nothing to translate
    }

    function updatePageLabels() {
        var labels = {
            'page-title': '',
            'page-description': '',
            'page-url': '',
        };
        // These are dynamic values from the page, not static labels
        // The label elements (Título, Descripción, URL) are handled by copyable-label class
        var labelEls = document.querySelectorAll('.copyable-label');
        var labelMap = {
            'Título': t('label.title'),
            'Title': t('label.title'),
            'Descripción': t('label.description'),
            'Description': t('label.description'),
            'URL': t('label.url'),
        };
        labelEls.forEach(function(el) {
            var txt = el.textContent.trim();
            if (labelMap[txt]) el.textContent = labelMap[txt];
        });
    }

    function setupTabs() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const tabId = this.dataset.tab;
                activeTab = tabId;

                // Update buttons
                tabButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                // Update content
                tabContents.forEach(c => c.classList.remove('active'));
                const targetContent = document.getElementById('tab-content-' + tabId);
                if (targetContent) {
                    targetContent.classList.add('active');
                }

                // Load page info if switching to page tab
                if (tabId === 'page') {
                    loadPageInfo();
                }
            });
        });
    }

    function setupCopyableItems() {
        document.addEventListener('click', function(e) {
            const btn = e.target.closest('.copyable-btn');
            if (btn) {
                const targetId = btn.dataset.target;
                const targetEl = document.getElementById(targetId);
                if (targetEl) {
                    copyToClipboard(targetEl.textContent);
                    showToast('Copiado al portapapeles');
                }
            }
        });
    }

    function loadPageInfo() {
        // Request page info from content script
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            if (tabs[0] && tabs[0].id) {
                chrome.tabs.sendMessage(tabs[0].id, { action: 'getPageInfo' }, function(response) {
                    if (chrome.runtime.lastError) {
                        console.log('[Canopy Ruler]', chrome.runtime.lastError.message);
                        return;
                    }
                    if (response) {
                        updatePageInfo(response);
                    }
                });
            }
        });
    }

    function updatePageInfo(info) {
        // Store page info for CSV export
        currentPageInfo = info;

        // Title
        const titleEl = document.getElementById('page-title');
        if (titleEl) titleEl.textContent = info.title || 'Sin título';

        // Description
        const descEl = document.getElementById('page-description');
        if (descEl) descEl.textContent = info.description || 'Sin descripción';

        // URL
        const urlEl = document.getElementById('page-url');
        if (urlEl) urlEl.textContent = info.url || '-';

        // Meta tags
        const metaContainer = document.getElementById('meta-tags-container');
        if (metaContainer && info.metaTags) {
            metaContainer.innerHTML = '';
            info.metaTags.forEach(tag => {
                const item = document.createElement('div');
                item.className = 'meta-tag-item';
                item.innerHTML = `
                    <span class="meta-tag-name">${escapeHtml(tag.name)}</span>
                    <span class="meta-tag-value">${escapeHtml(tag.value)}</span>
                `;
                metaContainer.appendChild(item);
            });
            if (info.metaTags.length === 0) {
                metaContainer.innerHTML = '<div class="meta-tag-item"><span class="meta-tag-value">No se encontraron meta tags</span></div>';
            }
        }

        // Technologies
        const techContainer = document.getElementById('technologies-container');
        if (techContainer && info.technologies) {
            techContainer.innerHTML = '';
            var categories = info.technologies;
            var catKeys = Object.keys(categories);

            if (catKeys.length > 0) {
                catKeys.forEach(function(cat) {
                    var groupEl = document.createElement('div');
                    groupEl.className = 'tech-group';

                    var header = document.createElement('div');
                    header.className = 'tech-group-header';
                    header.textContent = cat;
                    header.title = 'Clic para expandir/colapsar';
                    header.addEventListener('click', function() {
                        var body = this.nextElementSibling;
                        if (body) {
                            var isHidden = body.style.display === 'none';
                            body.style.display = isHidden ? 'flex' : 'none';
                            this.querySelector('.tech-group-arrow').textContent = isHidden ? '▾' : '▸';
                        }
                    });

                    var arrow = document.createElement('span');
                    arrow.className = 'tech-group-arrow';
                    arrow.textContent = '▾';
                    header.appendChild(arrow);

                    var body = document.createElement('div');
                    body.className = 'tech-group-body';

                    categories[cat].forEach(function(tech) {
                        var item = document.createElement('div');
                        item.className = 'tech-item detected';
                        item.textContent = tech;
                        body.appendChild(item);
                    });

                    groupEl.appendChild(header);
                    groupEl.appendChild(body);
                    techContainer.appendChild(groupEl);
                });
            } else {
                techContainer.innerHTML = '<div class="tech-item">No se detectaron tecnologías</div>';
            }
        }

        // Head tags
        const headContainer = document.getElementById('head-tags-container');
        if (headContainer && info.headTags) {
            headContainer.innerHTML = '';
            if (info.headTags.length > 0) {
                // Group head tags by type
                var groups = {};
                info.headTags.forEach(function(tag) {
                    var type = tag.name.split(':')[0] || 'other';
                    if (!groups[type]) groups[type] = [];
                    groups[type].push(tag);
                });

                Object.keys(groups).forEach(function(group) {
                    var groupEl = document.createElement('div');
                    groupEl.className = 'ht-group';

                    var header = document.createElement('div');
                    header.className = 'ht-group-header';
                    header.innerHTML = '<span class="ht-group-arrow">▾</span> ' + escapeHtml(group) + ' <span class="ht-group-count">(' + groups[group].length + ')</span>';
                    header.addEventListener('click', function() {
                        var body = this.nextElementSibling;
                        if (body) {
                            var isHidden = body.style.display === 'none';
                            body.style.display = isHidden ? 'flex' : 'none';
                            this.querySelector('.ht-group-arrow').textContent = isHidden ? '▾' : '▸';
                        }
                    });

                    var body = document.createElement('div');
                    body.className = 'ht-group-body';

                    groups[group].forEach(function(tag) {
                        var item = document.createElement('div');
                        item.className = 'head-tag-item';
                        var tagName = tag.name.includes(':') ? tag.name.split(':')[1] : tag.name;
                        item.innerHTML = '<span class="head-tag-name">' + escapeHtml(tagName) + '</span><span class="head-tag-value">' + escapeHtml(tag.value) + '</span>';
                        body.appendChild(item);
                    });

                    groupEl.appendChild(header);
                    groupEl.appendChild(body);
                    headContainer.appendChild(groupEl);
                });
            } else {
                headContainer.innerHTML = '<div class="head-tag-item"><span class="head-tag-value">No se encontraron etiquetas adicionales</span></div>';
            }
        }

        // Color palette
        const paletteContainer = document.getElementById('color-palette-container');
        if (paletteContainer && info.colors) {
            paletteContainer.innerHTML = '';
            if (info.colors.length > 0) {
                info.colors.forEach(function(hex) {
                    var swatch = document.createElement('div');
                    swatch.className = 'color-swatch';
                    swatch.style.backgroundColor = hex;
                    swatch.title = hex;
                    
                    // Determine text color for contrast
                    var rgb = hexToRgb(hex);
                    var luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
                    var textColor = luminance > 0.55 ? '#1a1a1a' : '#ffffff';
                    
                    var hexLabel = document.createElement('span');
                    hexLabel.className = 'swatch-hex';
                    hexLabel.textContent = hex;
                    hexLabel.style.color = textColor;
                    swatch.appendChild(hexLabel);
                    
                    var copiedOverlay = document.createElement('span');
                    copiedOverlay.className = 'swatch-copied';
                    copiedOverlay.textContent = '✓';
                    copiedOverlay.style.color = textColor;
                    swatch.appendChild(copiedOverlay);
                    
                    swatch.addEventListener('click', function(e) {
                        e.stopPropagation();
                        navigator.clipboard.writeText(hex).then(function() {
                            copiedOverlay.classList.add('show');
                            setTimeout(function() {
                                copiedOverlay.classList.remove('show');
                            }, 800);
                            showToast('Color ' + hex + ' copiado');
                        }).catch(function() {
                            showToast('Error al copiar');
                        });
                    });
                    
                    paletteContainer.appendChild(swatch);
                });
            } else {
                paletteContainer.innerHTML = '<div class="color-swatch loading">No se detectaron colores</div>';
            }
        }
    }

    function escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function hexToRgb(hex) {
        hex = hex.replace('#', '');
        if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        if (hex.length === 8) hex = hex.substring(0, 6);
        var r = parseInt(hex.substring(0, 2), 16);
        var g = parseInt(hex.substring(2, 4), 16);
        var b = parseInt(hex.substring(4, 6), 16);
        return { r: r, g: g, b: b };
    }

    function updateResources() {
        const resourcesSection = document.getElementById('resources-section');
        const resourcesGrid = document.getElementById('resources-grid');
        
        if (!resourcesSection || !resourcesGrid) return;
        
        if (!currentElement || !currentElement.images || currentElement.images.length === 0) {
            resourcesSection.style.display = 'none';
            return;
        }
        
        resourcesSection.style.display = 'block';
        resourcesGrid.innerHTML = '';
        
        currentElement.images.forEach(function(img, index) {
            const item = document.createElement('div');
            item.className = 'resource-item';
            item.title = img.alt || 'Imagen ' + (index + 1);
            
            const imgEl = document.createElement('img');
            imgEl.src = img.src;
            imgEl.alt = img.alt || '';
            imgEl.loading = 'lazy';
            imgEl.style.objectFit = 'contain';
            imgEl.style.padding = '4px';
            
            imgEl.addEventListener('error', function() {
                // Fallback: Phosphor file-svg icon
                imgEl.style.display = 'none';
                var placeholder = document.createElement('div');
                placeholder.style.cssText = 'display:flex;align-items:center;justify-content:center;width:100%;height:100%;color:var(--accent);padding:8px;';
                placeholder.innerHTML = '<svg width="100%" height="100%" viewBox="0 0 256 256" fill="currentColor"><path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM152,88V44l44,44ZM200,216H56V40h80V96a8,8,0,0,0,8,8h56V216ZM101.66,133.66l-26.34,26.34L94,178.34a8,8,0,0,1-11.32,11.32l-40-40a8,8,0,0,1,0-11.32l40-40a8,8,0,0,1,11.32,11.32L75.31,128l18.35,18.34a8,8,0,0,1,0,11.32l-40,40a8,8,0,0,1-11.32-11.32Zm96,3.37-40,40a8,8,0,0,1-11.32-11.32L164.69,128l-18.35-18.34a8,8,0,0,1,11.32-11.32l40,40A8,8,0,0,1,197.66,137.03Z"/></svg>';
                item.appendChild(placeholder);
            });
            
            item.appendChild(imgEl);
            
            const typeLabel = document.createElement('div');
            typeLabel.className = 'resource-type';
            typeLabel.textContent = img.type.toUpperCase();
            item.appendChild(typeLabel);
            
            item.addEventListener('click', function() {
                downloadImage(img.src, 'image-' + (index + 1));
            });
            
            resourcesGrid.appendChild(item);
        });
    }
    
    function downloadImage(url, filename) {
        try {
            const link = document.createElement('a');
            link.href = url;
            link.download = filename + (url.indexOf('data:image/svg') === 0 ? '.svg' : url.indexOf('data:image/') === 0 ? '.png' : '');
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            showToast('Descargando imagen...');
        } catch (e) {
            console.error('Error downloading image:', e);
            showToast('Error al descargar');
        }
    }
    
    function downloadAllImages() {
        if (!currentElement || !currentElement.images || currentElement.images.length === 0) {
            showToast('No hay imágenes para descargar');
            return;
        }
        
        currentElement.images.forEach(function(img, index) {
            setTimeout(function() {
                downloadImage(img.src, 'image-' + (index + 1));
            }, index * 300); // Delay entre descargas para evitar bloqueos
        });
        
        showToast('Descargando ' + currentElement.images.length + ' imágenes...');
    }

    function updateUI() {
        const emptyState = document.getElementById('empty-state');
        const elementInfo = document.getElementById('element-info');

        if (!emptyState || !elementInfo) return;

        if (!currentElement) {
            emptyState.classList.add('active');
            elementInfo.classList.remove('active');
            
            const emptyTitle = emptyState.querySelector('h3');
            const emptyDesc = emptyState.querySelector('p');
            if (emptyTitle && emptyDesc) {
                if (isExtensionClosed) {
                    emptyTitle.textContent = 'Extension Closed';
                    emptyDesc.textContent = 'Click the toolbar icon to reopen Canopy Ruler';
                    const shortcutsHint = emptyState.querySelector('.shortcuts-hint');
                    if (shortcutsHint) shortcutsHint.style.display = 'none';
                } else {
                    const shortcutsHint = emptyState.querySelector('.shortcuts-hint');
                    if (shortcutsHint) shortcutsHint.style.display = 'flex';
                    emptyTitle.textContent = 'No Element Selected';
                    emptyDesc.textContent = 'Click on any element on the page to inspect it';
                }
            }
            return;
        }

        emptyState.classList.remove('active');
        elementInfo.classList.add('active');

        // Update navigation buttons state
        const btnParent = document.getElementById('btn-parent');
        const btnChild = document.getElementById('btn-child');
        
        if (btnParent) {
            const hasParent = currentElement.hasParent === true;
            btnParent.disabled = !hasParent;
            btnParent.style.opacity = hasParent ? '1' : '0.3';
            btnParent.style.cursor = hasParent ? 'pointer' : 'not-allowed';
            btnParent.title = hasParent ? 'Select Parent (Alt+↑)' : 'No parent element available';
        }
        
        if (btnChild) {
            const hasChildren = currentElement.hasChildren === true;
            btnChild.disabled = !hasChildren;
            btnChild.style.opacity = hasChildren ? '1' : '0.3';
            btnChild.style.cursor = hasChildren ? 'pointer' : 'not-allowed';
            btnChild.title = hasChildren ? 'Select Child (Alt+↓)' : 'No child elements available';
        }

        // Update tag badge
        const elTag = document.getElementById('el-tag');
        if (elTag) elTag.textContent = currentElement.tagName || 'div';

        // Update size
        const elWidth = document.getElementById('el-width');
        const elHeight = document.getElementById('el-height');
        if (elWidth) elWidth.textContent = currentElement.width || 0;
        if (elHeight) elHeight.textContent = currentElement.height || 0;

        // Update position
        const elX = document.getElementById('el-x');
        const elY = document.getElementById('el-y');
        if (elX) elX.textContent = (currentElement.left || 0) + 'px';
        if (elY) elY.textContent = (currentElement.top || 0) + 'px';

        // Update box model
        updateBoxModel();

        // Update layout
        const elDisplay = document.getElementById('el-display');
        const elPosition = document.getElementById('el-position');
        if (elDisplay) elDisplay.textContent = (currentElement.styles && currentElement.styles.display) || 'block';
        if (elPosition) elPosition.textContent = (currentElement.styles && currentElement.styles.position) || 'static';

        // Update colors
        updateColors();

        // Update typography
        updateTypography();

        // Update selector
        const elSelector = document.getElementById('el-selector');
        if (elSelector) elSelector.textContent = currentElement.selector || 'div';

        // Update ID
        const elId = document.getElementById('el-id');
        if (elId) elId.textContent = currentElement.id || 'none';

        // Update Class
        const elClass = document.getElementById('el-class');
        if (elClass) elClass.textContent = currentElement.classes || 'none';

        // Update resources
        updateResources();
    }

    function updateBoxModel() {
        if (!currentElement) return;

        const setBoxValue = (id, value) => {
            const el = document.getElementById(id);
            if (el) el.textContent = value || '0';
        };

        // Margin values
        if (currentElement.margin) {
            const m = currentElement.margin;
            setBoxValue('bm-margin-top', Math.round(m.top || 0));
            setBoxValue('bm-margin-right', Math.round(m.right || 0));
            setBoxValue('bm-margin-bottom', Math.round(m.bottom || 0));
            setBoxValue('bm-margin-left', Math.round(m.left || 0));
        }

        // Border values
        if (currentElement.border) {
            const b = currentElement.border;
            setBoxValue('bm-border-top', Math.round(b.top || 0));
            setBoxValue('bm-border-right', Math.round(b.right || 0));
            setBoxValue('bm-border-bottom', Math.round(b.bottom || 0));
            setBoxValue('bm-border-left', Math.round(b.left || 0));
        }

        // Padding values
        if (currentElement.padding) {
            const p = currentElement.padding;
            setBoxValue('bm-padding-top', Math.round(p.top || 0));
            setBoxValue('bm-padding-right', Math.round(p.right || 0));
            setBoxValue('bm-padding-bottom', Math.round(p.bottom || 0));
            setBoxValue('bm-padding-left', Math.round(p.left || 0));
        }

        // Content dimensions
        setBoxValue('bm-content-width', currentElement.width || 0);
        setBoxValue('bm-content-height', currentElement.height || 0);

        // Box sizing
        const elBoxSizing = document.getElementById('el-box-sizing');
        if (elBoxSizing && currentElement.styles) {
            elBoxSizing.textContent = currentElement.styles.boxSizing || 'content-box';
        }
    }

    function updateColors() {
        if (!currentElement || !currentElement.colors) return;

        const bgColor = document.getElementById('el-bg-color');
        const bgValue = document.getElementById('el-bg-value');
        if (currentElement.colors.hex) {
            if (bgColor) bgColor.style.backgroundColor = currentElement.colors.hex;
            if (bgValue) bgValue.textContent = currentElement.colors.hex;
        } else {
            if (bgColor) bgColor.style.backgroundColor = 'transparent';
            if (bgValue) bgValue.textContent = 'transparent';
        }

        const textColor = document.getElementById('el-text-color');
        const textValue = document.getElementById('el-text-value');
        if (currentElement.colors.textHex) {
            if (textColor) textColor.style.backgroundColor = currentElement.colors.textHex;
            if (textValue) textValue.textContent = currentElement.colors.textHex;
        } else {
            if (textColor) textColor.style.backgroundColor = '#000000';
            if (textValue) textValue.textContent = '#000000';
        }
    }

    function updateTypography() {
        if (!currentElement || !currentElement.styles) return;

        const elFont = document.getElementById('el-font');
        const elFontSize = document.getElementById('el-font-size');
        const elFontWeight = document.getElementById('el-font-weight');

        if (elFont) elFont.textContent = currentElement.styles.fontFamily || 'inherit';
        if (elFontSize) elFontSize.textContent = currentElement.styles.fontSize || 'inherit';
        if (elFontWeight) elFontWeight.textContent = currentElement.styles.fontWeight || 'normal';
    }

    function updateInspectingState() {
        const btn = document.getElementById('btn-inspect');
        if (!btn) return;

        if (isInspecting) {
            btn.classList.add('active');
            btn.title = 'Stop Inspecting';
        } else {
            btn.classList.remove('active');
            btn.title = 'Start Inspecting';
        }
    }

    function sendToContent(message) {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            if (tabs[0] && tabs[0].id) {
                chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
                    if (chrome.runtime.lastError) {
                        console.log('[Canopy Ruler]', chrome.runtime.lastError.message);
                    }
                });
            }
        });
    }

    function generateCSS(element) {
        if (!element) return '';
        
        let css = element.selector + ' {\n';
        css += '  width: ' + (element.width || 0) + 'px;\n';
        css += '  height: ' + (element.height || 0) + 'px;\n';
        
        if (element.styles) {
            css += '  display: ' + (element.styles.display || 'block') + ';\n';
            css += '  position: ' + (element.styles.position || 'static') + ';\n';
            if (element.styles.fontFamily) css += '  font-family: ' + element.styles.fontFamily + ';\n';
            if (element.styles.fontSize) css += '  font-size: ' + element.styles.fontSize + ';\n';
            if (element.styles.fontWeight) css += '  font-weight: ' + element.styles.fontWeight + ';\n';
        }
        
        if (element.colors) {
            if (element.colors.hex && element.colors.hex !== 'transparent') {
                css += '  background-color: ' + element.colors.hex + ';\n';
            }
            if (element.colors.textHex && element.colors.textHex !== '#000000') {
                css += '  color: ' + element.colors.textHex + ';\n';
            }
        }
        
        css += '}';
        return css;
    }

    function copyToClipboard(text) {
        if (!text) return;
        
        navigator.clipboard.writeText(text).then(function() {
            // Success
        }).catch(function(err) {
            console.error('[Canopy Ruler] Failed to copy:', err);
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        });
    }

    function showToast(message) {
        const toast = document.getElementById('toast');
        if (!toast) return;
        
        toast.textContent = message;
        toast.classList.add('show');
        
        setTimeout(function() {
            toast.classList.remove('show');
        }, 2000);
    }

    function exportTechnologiesCSV() {
        if (!currentPageInfo) {
            showToast('No hay información de página disponible');
            return;
        }

        // Get all detected categories and technologies
        const technologies = currentPageInfo.technologies || {};
        const categories = Object.keys(technologies);

        if (categories.length === 0) {
            showToast('No se detectaron tecnologías');
            return;
        }

        // CSV Header with URL, Title, Description and detected categories
        let csvContent = 'URL\tTítulo\tDescripción';
        categories.forEach(function(cat) {
            csvContent += '\t' + cat;
        });
        csvContent += '\n';

        // Data row
        csvContent += (currentPageInfo.url || '') + '\t';
        csvContent += (currentPageInfo.title || '') + '\t';
        csvContent += (currentPageInfo.description || '').replace(/\n/g, ' ').replace(/\t/g, ' ');

        categories.forEach(function(cat) {
            const techs = technologies[cat] || [];
            csvContent += '\t' + techs.join(' ; ');
        });
        csvContent += '\n';

        // Create and download file
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        
        // Generate filename based on domain
        let filename = 'tecnologias';
        try {
            const urlObj = new URL(currentPageInfo.url || '');
            filename = urlObj.hostname.replace(/^www\./, '') + '_tecnologias';
        } catch (e) {
            filename = 'tecnologias_detectadas';
        }
        
        link.href = url;
        link.download = filename + '.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        showToast('CSV exportado correctamente');
    }

    function copyPalette() {
        if (!currentPageInfo || !currentPageInfo.colors || currentPageInfo.colors.length === 0) {
            showToast('No hay colores para copiar');
            return;
        }
        var palette = currentPageInfo.colors.join(', ');
        navigator.clipboard.writeText(palette).then(function() {
            showToast('Paleta copiada: ' + currentPageInfo.colors.length + ' colores');
        }).catch(function() {
            showToast('Error al copiar la paleta');
        });
    }
})();