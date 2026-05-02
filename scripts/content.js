// Canopy Ruler - Content Script
// Full-featured element inspector with floating dock, rulers, screenshot, and eyedropper

(function() {
    'use strict';

    // ===== I18N =====
    var _lang = 'en';
    var _messages = {
        // Dock buttons
        'dock.panel':       { en: 'Side Panel',                     es: 'Panel Lateral' },
        'dock.inspect':     { en: 'Inspect (Alt+Shift+S)',        es: 'Inspeccionar (Alt+Shift+S)' },
        'dock.find':        { en: 'Find Element',                 es: 'Buscar Elemento' },
        'dock.xray':        { en: 'X-Ray Mode',                   es: 'Modo Rayos X' },
        'dock.ruler':       { en: 'Add Ruler',                    es: 'Añadir Regla' },
        'dock.distance':    { en: 'Measure Distance',             es: 'Medir Distancia' },
        'dock.pagerulers':  { en: 'Page Rulers',                  es: 'Reglas de Página' },
        'dock.grid':        { en: 'Grid Overlay',                 es: 'Cuadrícula' },
        'dock.draw':        { en: 'Draw & Annotate',               es: 'Dibujar y Anotar' },
        'dock.eyedropper':  { en: 'Color Picker',                 es: 'Selector de Color' },
        'dock.screenshot':  { en: 'Screenshot',                   es: 'Captura de Pantalla' },
        'dock.viewport':    { en: 'Viewport Info',                es: 'Info de Viewport' },
        'dock.whatfont':    { en: 'WhatFont',                     es: 'WhatFont' },
        'dock.breakpoints': { en: 'CSS Breakpoints',              es: 'Breakpoints CSS' },
        'dock.responsive':  { en: 'Responsive Design',            es: 'Diseño Responsive' },
        'dock.close':       { en: 'Close Canopy Ruler',             es: 'Cerrar Canopy Ruler' },
        'dock.lang':        { en: 'Switch to Spanish',            es: 'Cambiar a Inglés' },

        // Toasts
        'toast.ruler.added':      { en: 'Ruler added. Click and drag.',            es: 'Regla añadida. Clic y arrastra.' },
        'toast.ruler.remove':     { en: 'Click a ruler to select it. Press Backspace or Delete to remove.', es: 'Clic en regla para seleccionar. Backspace o Supr para eliminar.' },
        'toast.ruler.removed':    { en: 'Ruler removed.',                           es: 'Regla eliminada.' },
        'toast.distance.click':   { en: 'Click two elements to measure distance.', es: 'Clic en dos elementos para medir.' },
        'toast.color.copied':     { en: 'Color copied: ',                           es: 'Color copiado: ' },
        'toast.inspecting':       { en: 'Inspecting... Select an element.',         es: 'Inspeccionando... Selecciona un elemento.' },
        'toast.eyedropper':       { en: 'Pick a color from the page.',              es: 'Selecciona un color de la página.' },
        'toast.page.rulers':      { en: 'Page rulers active.',                      es: 'Reglas de página activas.' },
        'toast.grid':             { en: 'Grid overlay active.',                      es: 'Cuadrícula activa.' },
        'toast.screenshot':       { en: 'Screenshot captured!',                     es: '¡Captura realizada!' },
        'toast.font.notfound':    { en: 'Font file not found. Downloaded CSS info instead.', es: 'Fuente no encontrada. Se descargó info CSS.' },
        'toast.font.downloading': { en: 'Downloading font file...',                 es: 'Descargando archivo de fuente...' },
        'toast.font.copied':      { en: 'Font info copied to clipboard',            es: 'Info de fuente copiada' },
        'toast.failed':           { en: 'Failed to copy',                           es: 'Error al copiar' },
        'toast.viewport':         { en: 'Viewport info active. Click again to close.', es: 'Info de viewport activa. Clic de nuevo para cerrar.' },
        'toast.breakpoints':      { en: 'CSS Breakpoints active.',                  es: 'Breakpoints CSS activos.' },
        'toast.responsive':       { en: 'Responsive mode active.',                  es: 'Modo responsive activo.' },
        'toast.find':             { en: 'Type a CSS selector and press Enter.',     es: 'Escribe un selector CSS y presiona Enter.' },
        'toast.deleted':          { en: 'Element deleted.',                          es: 'Elemento eliminado.' },

        // Draw mode
        'draw.rect':     { en: 'Rectangle',        es: 'Recuadro' },
        'draw.line':     { en: 'Line',             es: 'Línea' },
        'draw.arrow':    { en: 'Arrow',            es: 'Flecha' },
        'draw.text':     { en: 'Text / Sticky Note', es: 'Texto / Nota adhesiva' },
        'draw.laser':    { en: 'Laser Pointer',    es: 'Puntero Láser' },
        'draw.undo':     { en: 'Undo',             es: 'Deshacer' },
        'draw.clear':    { en: 'Clear All',        es: 'Limpiar Todo' },
        'draw.done':     { en: 'Finish Drawing',   es: 'Terminar Dibujo' },
        'draw.color':    { en: 'Color',            es: 'Color' },
        'draw.stroke':   { en: 'Stroke Width',     es: 'Grosor' },
        'draw.fill':     { en: 'Fill Opacity',     es: 'Opacidad de Relleno' },
        'draw.activate': { en: 'Draw: Select a tool and color, then draw on the page', es: 'Dibujo: Selecciona herramienta y color, luego dibuja en la página' },
        'draw.marker':   { en: 'Highlighter / Marker', es: 'Marcador / Resaltador' },

        // WhatFont
        'whatfont.exit':      { en: 'Exit WhatFont', es: 'Salir de WhatFont' },
        'whatfont.activated': { en: 'WhatFont: Hover over text to identify font. Click to pin details.', es: 'WhatFont: Pasa el cursor sobre texto. Clic para fijar detalles.' },
        'whatfont.family':    { en: 'Family', es: 'Familia' },
        'whatfont.style':     { en: 'Style', es: 'Estilo' },
        'whatfont.weight':    { en: 'Weight', es: 'Peso' },
        'whatfont.color':     { en: 'Color', es: 'Color' },
        'whatfont.size':      { en: 'Size', es: 'Tamaño' },
        'whatfont.lineheight':{ en: 'Line Height', es: 'Interlineado' },
        'whatfont.download':  { en: 'Download font file', es: 'Descargar fuente' },
        'whatfont.copy':      { en: 'Copy font info', es: 'Copiar info de fuente' },
        'whatfont.close':     { en: 'Close', es: 'Cerrar' },

        // Float panel
        'float.tag':   { en: 'Tag', es: 'Etiqueta' },
        'float.id':    { en: 'ID', es: 'ID' },
        'float.class': { en: 'Class', es: 'Clase' },
        'float.size':  { en: 'Size', es: 'Tamaño' },

        // Viewport
        'viewport.window':   { en: 'Window', es: 'Ventana' },
        'viewport.document': { en: 'Document', es: 'Documento' },
        'viewport.screen':   { en: 'Screen', es: 'Pantalla' },
        'viewport.dpr':      { en: 'DPR', es: 'DPR' },
        'viewport.colorDepth': { en: 'Color Depth', es: 'Prof. de Color' },
        'viewport.orientation': { en: 'Orientation', es: 'Orientación' },
        'viewport.breakpoint': { en: 'Breakpoint', es: 'Breakpoint' },

        // Page analysis
        'page.colors.loading': { en: 'Analyzing colors...', es: 'Analizando colores...' },
        'page.colors.none':    { en: 'No colors detected', es: 'No se detectaron colores' },

        // X-Ray
        'xray.outline': { en: 'Elements outlined', es: 'Elementos delineados' },

        // Breakpoints
        'breakpoints.label': { en: 'Breakpoints active. Press Esc to exit.', es: 'Breakpoints activos. Presiona Esc para salir.' },

        // Screenshot
        'screenshot.downloading': { en: 'Downloading screenshot...', es: 'Descargando captura...' },

        // Image download
        'resources.downloading': { en: 'Downloading image...', es: 'Descargando imagen...' },
        'resources.download.error': { en: 'Error downloading', es: 'Error al descargar' },
    };

    function t(key) {
        var msg = _messages[key];
        if (!msg) return key;
        return msg[_lang] || msg.en || key;
    }

    function setLang(lang) {
        _lang = lang;
        try { chrome.storage.local.set({ canopyLang: lang }); } catch(e) {}
        updateDockButtons();
    }

    function getLang() {
        return _lang;
    }

    // Load saved language
    try {
        chrome.storage.local.get(['canopyLang'], function(result) {
            if (result.canopyLang && (result.canopyLang === 'en' || result.canopyLang === 'es')) {
                _lang = result.canopyLang;
            }
            updateDockButtons();
        });
    } catch(e) {}

    // State
    var isInspecting = false;
    var selectedEl = null;
    var hoveredEl = null;
    var overlay = null;
    var floatPanel = null;
    var dock = null;
    var xrayMode = false;
    var rulers = [];
    var isRulerMode = false;
    var isDistanceMode = false;
    var isEyedropperMode = false;
    var distanceStartEl = null;
    var distanceLine = null;
    var distanceLabel = null;
    var isGridMode = false;
    var gridOverlay = null;
    var isPageRulersMode = false;
    var pageRulersH = null;
    var pageRulersV = null;
    var panelOpen = false;
    var isBreakpointsMode = false;
    var breakpointsOverlay = null;
    var isResponsiveMode = false;
    var responsiveOverlay = null;
    var responsiveIframe = null;
    var isFindMode = false;
    var findOverlay = null;
    var findHighlights = [];
    var isViewportMode = false;
    var viewportOverlay = null;
    var viewportUpdateInterval = null;
    var isWhatFontMode = false;
    var whatFontTooltip = null;
    var whatFontPopovers = [];
    var isDrawMode = false;
    var drawOverlay = null;
    var drawToolbar = null;
    var drawShape = 'rect'; // 'rect', 'line', 'arrow'
    var drawColor = '#ff0000';
    var drawStrokeWidth = 3;
    var drawFillOpacity = 0.2;
    var drawStartX = 0;
    var drawStartY = 0;
    var drawCurrent = null;
    var drawShapes = [];
    var drawLaser = null;
    var drawMarkerPoints = [];

    function log(msg) {
        console.log('[Canopy Ruler]', msg);
    }

    function safeSendMessage(message) {
        try {
            if (chrome && chrome.runtime && chrome.runtime.sendMessage) {
                chrome.runtime.sendMessage(message, function() {
                    if (chrome.runtime.lastError) {
                        // Silently ignore extension context invalidated errors
                        return;
                    }
                });
            }
        } catch (e) {
            // Extension context invalidated or other error, silently ignore
        }
    }

    function init() {
        log('Initializing...');
        if (!document.body) {
            setTimeout(init, 100);
            return;
        }
        createOverlay();
        createFloatPanel();
        createDock();
        setupListeners();
        log('Ready. Press Alt+Shift+S to activate.');
    }

    function setupListeners() {
        document.addEventListener('mouseover', onHover, true);
        document.addEventListener('mouseout', onHoverOut, true);
        document.addEventListener('click', onClick, true);
        document.addEventListener('keydown', onKeyDown, true);
        document.addEventListener('mousemove', onMouseMove, true);
        document.addEventListener('mousedown', onMouseDown, true);
        document.addEventListener('mouseup', onMouseUp, true);
        
        // Close panel when switching tabs or navigating away
        document.addEventListener('visibilitychange', function() {
            if (document.hidden && panelOpen) {
                panelOpen = false;
                safeSendMessage({ action: 'closeSidePanel' });
                updateDockButtons();
            }
        });
        
        window.addEventListener('beforeunload', function() {
            if (panelOpen) {
                panelOpen = false;
                safeSendMessage({ action: 'closeSidePanel' });
            }
        });
        
        chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
            if (msg.action === 'startInspecting') {
                // Activate inspection if not already active
                if (!isInspecting) {
                    toggleInspect();
                }
            }
            if (msg.action === 'stopInspecting') {
                // Deactivate inspection if active
                if (isInspecting) {
                    toggleInspect();
                }
                clearAll();
                panelOpen = false;
                safeSendMessage({ action: 'closeSidePanel' });
            }
            if (msg.action === 'toggleXRay') {
                toggleXRay();
            }
            if (msg.action === 'showDock') {
                showDock();
                showToast('Canopy Ruler activated');
            }
            if (msg.action === 'selectChild') {
                if (selectedEl && selectedEl.children.length > 0) {
                    selectElement(selectedEl.children[0]);
                }
            }
            if (msg.action === 'selectParent') {
                if (selectedEl && selectedEl.parentElement && selectedEl.parentElement !== document.body) {
                    selectElement(selectedEl.parentElement);
                }
            }
            if (msg.action === 'getPageInfo') {
                getPageInfo(function(pageInfo) {
                    sendResponse(pageInfo);
                });
                return true;
            }
            if (msg.action === 'deleteElement') {
                if (selectedEl) {
                    selectedEl.remove();
                    selectedEl = null;
                    clearOverlay();
                    hideFloatPanel();
                    sendToPanel(null);
                    showToast('Element deleted');
                }
            }
            if (msg.action === 'panelClosedByUser') {
                panelOpen = false;
                updateDockButtons();
            }
        });
    }

    // ===== PHOSPHOR ICONS =====
    function getPhosphorIcon(name) {
        var icons = {
            'sidebar': '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM40,152H56a8,8,0,0,0,0-16H40V120H56a8,8,0,0,0,0-16H40V88H56a8,8,0,0,0,0-16H40V56H80V200H40Zm176,48H96V56H216V200Z"/></svg>',
            'cursor-click': '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M88,24V16a8,8,0,0,1,16,0v8a8,8,0,0,1-16,0ZM16,104h8a8,8,0,0,0,0-16H16a8,8,0,0,0,0,16ZM124.42,39.16a8,8,0,0,0,10.74-3.58l8-16a8,8,0,0,0-14.31-7.16l-8,16A8,8,0,0,0,124.42,39.16Zm-96,81.69-16,8a8,8,0,0,0,7.16,14.31l16-8a8,8,0,1,0-7.16-14.31ZM219.31,184a16,16,0,0,1,0,22.63l-12.68,12.68a16,16,0,0,1-22.63,0L132.7,168,115,214.09c0,.1-.08.21-.13.32a15.83,15.83,0,0,1-14.6,9.59l-.79,0a15.83,15.83,0,0,1-14.41-11L32.8,52.92A16,16,0,0,1,52.92,32.8L213,85.07a16,16,0,0,1,1.41,29.8l-.32.13L168,132.69ZM208,195.31,156.69,144h0a16,16,0,0,1,4.93-26l.32-.14,45.95-17.64L48,48l52.2,159.86,17.65-46c0-.11.08-.22.13-.33a16,16,0,0,1,11.69-9.34,16.72,16.72,0,0,1,3-.28,16,16,0,0,1,11.3,4.69L195.31,208Z"/></svg>',
            'ruler': '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M235.32,73.37,182.63,20.69a16,16,0,0,0-22.63,0L20.68,160a16,16,0,0,0,0,22.63l52.69,52.68a16,16,0,0,0,22.63,0L235.32,96A16,16,0,0,0,235.32,73.37ZM84.68,224,32,171.31l32-32,26.34,26.35a8,8,0,0,0,11.32-11.32L75.31,128,96,107.31l26.34,26.35a8,8,0,0,0,11.32-11.32L107.31,96,128,75.31l26.34,26.35a8,8,0,0,0,11.32-11.32L139.31,64l32-32L224,84.69Z"/></svg>',
            'arrows-distance': '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M136,40V216a8,8,0,0,1-16,0V40a8,8,0,0,1,16,0ZM96,120H35.31l18.35-18.34A8,8,0,0,0,42.34,90.34l-32,32a8,8,0,0,0,0,11.32l32,32a8,8,0,0,0,11.32-11.32L35.31,136H96a8,8,0,0,0,0-16Zm149.66,2.34-32-32a8,8,0,0,0-11.32,11.32L220.69,120H160a8,8,0,0,0,0,16h60.69l-18.35,18.34a8,8,0,0,0,11.32,11.32l32-32A8,8,0,0,0,245.66,122.34Z"/></svg>',
            'eye': '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"/></svg>',
            'grid-four': '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M200,40H56A16,16,0,0,0,40,56V200a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V56A16,16,0,0,0,200,40Zm0,80H136V56h64ZM120,56v64H56V56ZM56,136h64v64H56Zm144,64H136V136h64v64Z"/></svg>',
            'camera': '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M208,56H180.28L166.65,35.56A8,8,0,0,0,160,32H96a8,8,0,0,0-6.65,3.56L75.71,56H48A24,24,0,0,0,24,80V192a24,24,0,0,0,24,24H208a24,24,0,0,0,24-24V80A24,24,0,0,0,208,56Zm8,136a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V80a8,8,0,0,1,8-8H80a8,8,0,0,0,6.66-3.56L100.28,48h55.43l13.63,20.44A8,8,0,0,0,176,72h32a8,8,0,0,1,8,8ZM128,88a44,44,0,1,0,44,44A44.05,44.05,0,0,0,128,88Zm0,72a28,28,0,1,1,28-28A28,28,0,0,1,128,160Z"/></svg>',
            'eyedropper': '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M224,67.3a35.79,35.79,0,0,0-11.26-25.66c-14-13.28-36.72-12.78-50.62,1.13L142.8,62.2a24,24,0,0,0-33.14.77l-9,9a16,16,0,0,0,0,22.64l2,2.06-51,51a39.75,39.75,0,0,0-10.53,38l-8,18.41A13.68,13.68,0,0,0,36,219.3a15.92,15.92,0,0,0,17.71,3.35L71.23,215a39.89,39.89,0,0,0,37.06-10.75l51-51,2.06,2.06a16,16,0,0,0,22.62,0l9-9a24,24,0,0,0,.74-33.18l19.75-19.87A35.75,35.75,0,0,0,224,67.3ZM97,193a24,24,0,0,1-24,6,8,8,0,0,0-5.55.31l-18.1,7.91L57,189.41a8,8,0,0,0,.25-5.75A23.88,23.88,0,0,1,63,159l51-51,33.94,34ZM202.13,82l-25.37,25.52a8,8,0,0,0,0,11.3l4.89,4.89a8,8,0,0,1,0,11.32l-9,9L112,83.26l9-9a8,8,0,0,1,11.31,0l4.89,4.89a8,8,0,0,0,11.33,0l24.94-25.09c7.81-7.82,20.5-8.18,28.29-.81a20,20,0,0,1,.39,28.7Z"/></svg>',
            'pencil-ruler': '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M208,32H160a16,16,0,0,0-16,16V208a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H160V176h24a8,8,0,0,0,0-16H160V136h24a8,8,0,0,0,0-16H160V96h24a8,8,0,0,0,0-16H160V48h48V208ZM77.66,26.34a8,8,0,0,0-11.32,0l-32,32A8,8,0,0,0,32,64V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V64a8,8,0,0,0-2.34-5.66ZM48,176V80H64v96ZM80,80H96v96H80ZM72,43.31,92.69,64H51.31ZM48,208V192H96v16Z"/></svg>',
            'devices': '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M224,72H208V64a24,24,0,0,0-24-24H40A24,24,0,0,0,16,64v96a24,24,0,0,0,24,24H152v8a24,24,0,0,0,24,24h48a24,24,0,0,0,24-24V96A24,24,0,0,0,224,72ZM40,168a8,8,0,0,1-8-8V64a8,8,0,0,1,8-8H184a8,8,0,0,1,8,8v8H176a24,24,0,0,0-24,24v72Zm192,24a8,8,0,0,1-8,8H176a8,8,0,0,1-8-8V96a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8Zm-96,16a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h40A8,8,0,0,1,136,208Zm80-96a8,8,0,0,1-8,8H192a8,8,0,0,1,0-16h16A8,8,0,0,1,216,112Z"/></svg>',
            'monitor': '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M216,40H40A16,16,0,0,0,24,56V176a16,16,0,0,0,16,16H96v24H80a8,8,0,0,0,0,16h96a8,8,0,0,0,0-16H160V192h56a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,136H40V56H216V176Z"/></svg>',
            'magnifying-glass': '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"/></svg>',
            'x': '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"/></svg>',
            'copy': '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M216,32H88a8,8,0,0,0-8,8V80H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H168a8,8,0,0,0,8-8V176h40a8,8,0,0,0,8-8V40A8,8,0,0,0,216,32ZM160,208H48V96H160Zm48-48H176V88a8,8,0,0,0-8-8H96V48H208Z"/></svg>',
            'viewport': '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,160H40V56H216V200ZM80,184a8,8,0,0,1,0-16h96a8,8,0,0,1,0,16Z"/></svg>',
            'text-t': '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M64,56V200a8,8,0,0,0,16,0V136h56v64a8,8,0,0,0,16,0V56a8,8,0,0,0-8-8H72A8,8,0,0,0,64,56Zm16,8h56v56H80Z"/></svg>',
            'download': '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M213.66,122.34l-80,80a8,8,0,0,1-11.32,0l-80-80a8,8,0,0,1,11.32-11.32L120,180.69V40a8,8,0,0,1,16,0V180.69l66.34-69.67a8,8,0,0,1,11.32,11.32ZM216,200H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"/></svg>',
            'globe': '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM101.63,168h52.74C149.08,188.48,138.84,204.87,128,215.61,117.16,204.87,106.92,188.48,101.63,168ZM98.71,152C95.29,137.17,94,122.56,94,128s1.29,9.17,4.71,24Zm58.58,0h-58.58c3.42-14.83,4.71-29.44,4.71-24s-1.29-9.17-4.71-24Zm-56-16C97.87,120.83,96,107.83,96,96a32,32,0,0,1,64,0c0,11.83-1.87,24.83-5.29,40ZM40,128a87.62,87.62,0,0,1,3.33-24H81.3c-3.37,7.72-5.3,16.17-5.3,24s1.93,16.28,5.3,24H43.33A87.62,87.62,0,0,1,40,128Zm76.69,56C98.91,174.49,85,163.22,73.18,148H52.4A87.86,87.86,0,0,0,116.69,184ZM128,216a87.89,87.89,0,0,0,55.6-20H146.6C158.42,207.93,143.49,213.79,128,216Zm55.6-36H146.6c8.08-10.55,13.84-22.2,17.13-32.63A87.53,87.53,0,0,0,140.22,104h41.08c4.14,7.27,6.7,15.38,6.7,24a47.8,47.8,0,0,1-4.4,20ZM183.6,88H140.22a87.53,87.53,0,0,0,23.51-43.37C152.76,55.66,141.17,71.51,134.7,88h-13.4C109.84,51.31,121.27,43.55,128,40c6.73,3.55,18.16,11.31,6.7,48Zm19.42,60h37.96a87.86,87.86,0,0,0,0-40H203c3.37,7.72,5.3,16.17,5.3,24A47.8,47.8,0,0,1,203,148Z"/></svg>',
            'pencil-line': '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31l83.67-83.66,3.48,13.9-36.8,36.79a8,8,0,0,0,11.31,11.32l40-40a8,8,0,0,0,2.11-7.6l-6.9-27.61L227.32,96A16,16,0,0,0,227.32,73.37ZM192,108.69,147.32,64l24-24L216,84.69Z"/></svg>',
            'square': '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208V208Z"/></svg>',
            'line-segment': '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M214.64,86.62l-128,128a8,8,0,0,1-11.32,0l-48-48a8,8,0,0,1,11.32-11.32L81,197.66,203.32,75.3a8,8,0,0,1,11.32,11.32Z"/></svg>',
            'arrow-right': '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"/></svg>',
            'text-t': '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M208,56V88a8,8,0,0,1-16,0V64H136V192h24a8,8,0,0,1,0,16H96a8,8,0,0,1,0-16h24V64H64V88a8,8,0,0,1-16,0V56a8,8,0,0,1,8-8H200A8,8,0,0,1,208,56Z"/></svg>',
            'arrow-arc-left': '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M232,184a8,8,0,0,1-16,0A88,88,0,0,0,67.47,120.16l26.19,26.18a8,8,0,0,1-11.32,11.32l-40-40a8,8,0,0,1,0-11.32l40-40a8,8,0,0,1,11.32,11.32L67.47,103.84A104,104,0,0,1,232,184Z"/></svg>',
            'trash': '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"/></svg>',
            'check': '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"/></svg>',
            'minus': '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128Z"/></svg>',
            'laser-pointer': '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 1000 1000" fill="currentColor"><path d="M168.68 915.68A41.76 41.76 0 0 1 139 903.37L96.63 861a42 42 0 0 1 0-59.44L486.82 411.4a42 42 0 0 1 59.44 0l42.34 42.34a42.09 42.09 0 0 1 0 59.44L198.4 903.37a41.75 41.75 0 0 1-29.72 12.31m-7.09-34.93a10.06 10.06 0 0 0 14.19 0L566 490.55a10 10 0 0 0 0-14.19L523.64 434a10 10 0 0 0-14.19 0l-390.2 390.22a10.06 10.06 0 0 0 0 14.19z"/><path d="M556.12 459.88a16 16 0 0 1-11.32-27.31l214.84-214.83a16 16 0 1 1 22.62 22.62L567.43 455.2a16 16 0 0 1-11.31 4.68m-26.9 106.05a16 16 0 0 1-11.32-4.68l-79.15-79.15a16 16 0 0 1 22.63-22.63l79.15 79.15a16 16 0 0 1-11.31 27.31M234.82 861a16 16 0 0 1-11.31-4.68l-79.15-79.15A16 16 0 0 1 167 754.53l79.15 79.15A16 16 0 0 1 234.82 861m77.03-156.52a16 16 0 0 1-11.31-27.31L361.73 616a16 16 0 1 1 22.62 22.62l-61.19 61.2a16 16 0 0 1-11.31 4.66M816.4 199.6a16 16 0 0 1-11.31-27.32l43-43a16 16 0 0 1 22.63 22.63l-43 43a15.94 15.94 0 0 1-11.32 4.69m83.92 55.76H839.5a16 16 0 0 1 0-32h60.82a16 16 0 0 1 0 32m-40.91 98.77a15.92 15.92 0 0 1-11.31-4.69l-43-43a16 16 0 1 1 22.63-22.62l43 43a16 16 0 0 1-11.32 27.31M704.88 199.6a15.92 15.92 0 0 1-11.31-4.69l-43-43a16 16 0 1 1 22.62-22.63l43 43a16 16 0 0 1-11.31 27.32m55.76-23.1a16 16 0 0 1-16-16V99.68a16 16 0 1 1 32 0v60.82a16 16 0 0 1-16 16"/></svg>',
            'highlighter': '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M253.66,106.34a8,8,0,0,0-11.32,0L192,156.69,107.31,72l50.35-50.34a8,8,0,1,0-11.32-11.32L96,60.69A16,16,0,0,0,93.18,79.5L72,100.69a16,16,0,0,0,0,22.62L76.69,128,18.34,186.34a8,8,0,0,0,3.13,13.25l72,24A7.88,7.88,0,0,0,96,224a8,8,0,0,0,5.66-2.34L136,187.31l4.69,4.69a16,16,0,0,0,22.62,0l21.19-21.18A16,16,0,0,0,203.31,168l50.35-50.34A8,8,0,0,0,253.66,106.34ZM93.84,206.85l-55-18.35L88,139.31,124.69,176ZM152,180.69,83.31,112,104,91.31,172.69,160Z"/></svg>'
        };
        return icons[name] || '';
    }

    function getFlagIcon() {
        var flag = _lang === 'en' ? 'colombia' : 'usa';
        var url = chrome.runtime.getURL('images/' + flag + '.svg');
        return '<img src="' + url + '" width="20" height="20" style="border-radius:50%;object-fit:cover;" alt="">';
    }

    // ===== DOCK =====
    function createDock() {
        if (dock) return;
        dock = document.createElement('div');
        dock.id = 'canopy-dock';
        dock.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);z-index:2147483647;' +
            'display:flex;gap:4px;padding:6px;background:#134611;border-radius:12px;' +
            'box-shadow:0 4px 20px rgba(0,0,0,0.4);border:1px solid #3e8914;';
        
        var tools = [
            { id: 'dock-panel', icon: getPhosphorIcon('sidebar'), titleKey: 'dock.panel', action: togglePanel, group: 'nav' },
            { id: 'dock-inspect', icon: getPhosphorIcon('cursor-click'), titleKey: 'dock.inspect', action: toggleInspect, group: 'inspect' },
            { id: 'dock-find', icon: getPhosphorIcon('magnifying-glass'), titleKey: 'dock.find', action: toggleFind, group: 'inspect' },
            { id: 'dock-xray', icon: getPhosphorIcon('eye'), titleKey: 'dock.xray', action: toggleXRay, group: 'inspect' },
            { id: 'dock-ruler', icon: getPhosphorIcon('pencil-ruler'), titleKey: 'dock.ruler', action: toggleRulerMode, group: 'measure' },
            { id: 'dock-distance', icon: getPhosphorIcon('arrows-distance'), titleKey: 'dock.distance', action: toggleDistanceMode, group: 'measure' },
            { id: 'dock-page-rulers', icon: getPhosphorIcon('ruler'), titleKey: 'dock.pagerulers', action: togglePageRulers, group: 'measure' },
            { id: 'dock-grid', icon: getPhosphorIcon('grid-four'), titleKey: 'dock.grid', action: toggleGrid, group: 'measure' },
            { id: 'dock-eyedropper', icon: getPhosphorIcon('eyedropper'), titleKey: 'dock.eyedropper', action: toggleEyedropper, group: 'tools' },
            { id: 'dock-screenshot', icon: getPhosphorIcon('camera'), titleKey: 'dock.screenshot', action: takeScreenshot, group: 'tools' },
            { id: 'dock-draw', icon: getPhosphorIcon('pencil-line'), titleKey: 'dock.draw', action: toggleDrawMode, group: 'tools' },
            { id: 'dock-viewport', icon: getPhosphorIcon('viewport'), titleKey: 'dock.viewport', action: toggleViewportInfo, group: 'tools' },
            { id: 'dock-whatfont', icon: getPhosphorIcon('text-t'), titleKey: 'dock.whatfont', action: toggleWhatFont, group: 'tools' },
            { id: 'dock-breakpoints', icon: getPhosphorIcon('devices'), titleKey: 'dock.breakpoints', action: toggleBreakpoints, group: 'layout' },
            { id: 'dock-responsive', icon: getPhosphorIcon('monitor'), titleKey: 'dock.responsive', action: toggleResponsive, group: 'layout' },
            { id: 'dock-lang', icon: getFlagIcon(), titleKey: 'dock.lang', action: function() { setLang(_lang === 'en' ? 'es' : 'en'); }, group: 'lang' },
            { id: 'dock-close', icon: getPhosphorIcon('x'), titleKey: 'dock.close', action: closeExtension, group: 'close' }
        ];
        
        var lastGroup = null;
        
        tools.forEach(function(tool) {
            // Add separator between groups
            if (lastGroup && lastGroup !== tool.group) {
                var separator = document.createElement('div');
                separator.style.cssText = 'width:1px;height:24px;background:rgba(150,224,114,0.3);align-self:center;margin:0 2px;';
                dock.appendChild(separator);
            }
            lastGroup = tool.group;
            
            var btn = document.createElement('button');
            btn.id = tool.id;
            btn.style.cssText = 'width:36px;height:36px;border:none;border-radius:8px;background:transparent;' +
                'color:#96e072;cursor:pointer;display:flex;align-items:center;justify-content:center;' +
                'transition:all 0.2s;position:relative;';
            btn.innerHTML = tool.icon;
            btn.title = t(tool.titleKey);
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                tool.action();
            });
            btn.addEventListener('mouseenter', function() {
                this.style.background = '#3e8914';
                this.style.color = '#fff';
            });
            btn.addEventListener('mouseleave', function() {
                if (!this.classList.contains('active')) {
                    this.style.background = 'transparent';
                    this.style.color = '#96e072';
                }
            });
            dock.appendChild(btn);
        });
        
        document.body.appendChild(dock);
        dock.style.display = 'none';
    }

    function showDock() {
        if (dock) dock.style.display = 'flex';
    }

    function hideDock() {
        if (dock) dock.style.display = 'none';
    }

    // ===== PANEL TOGGLE =====
    function togglePanel() {
        panelOpen = !panelOpen;
        if (panelOpen) {
            safeSendMessage({ action: 'openSidePanel' });
        } else {
            // Chrome MV3 doesn't have a direct API to close the side panel
            // But we can tell the panel to clear itself and show empty state
            safeSendMessage({ action: 'closeSidePanel' });
        }
        updateDockButtons();
    }

    // ===== SCREENSHOT =====
    function takeScreenshot() {
        showToast('Capturing screenshot...');
        
        // Save original display values
        var dockDisplay = dock ? dock.style.display : null;
        var toolbarDisplay = drawToolbar ? drawToolbar.style.display : null;
        var laserDisplay = drawLaser ? drawLaser.style.display : null;
        
        // Hide UI elements for clean screenshot
        if (dock) dock.style.display = 'none';
        if (drawToolbar) drawToolbar.style.display = 'none';
        if (drawLaser) drawLaser.style.display = 'none';
        
        // Delay capture to ensure DOM is updated
        setTimeout(function() {
            safeSendMessage({ action: 'captureScreenshot' });
            
            // Restore UI after capture
            setTimeout(function() {
                if (dock && dockDisplay !== 'none') dock.style.display = dockDisplay;
                if (drawToolbar && toolbarDisplay !== 'none') drawToolbar.style.display = toolbarDisplay;
                if (drawLaser && laserDisplay !== 'none') drawLaser.style.display = laserDisplay;
            }, 500);
        }, 100);
    }

    // ===== EYEDROPPER =====
    function toggleEyedropper() {
        if (isEyedropperMode) {
            // Already active, deactivate
            deactivateAllTools();
        } else {
            // Activate eyedropper
            deactivateAllTools();
            isEyedropperMode = true;
            showDock();
            showToast('Click anywhere to pick color');
            document.body.style.cursor = 'crosshair';
        }
        updateDockButtons();
    }

    var eyedropperPreview = null;

    function showEyedropperPreview(x, y, color) {
        removeEyedropperPreview();
        
        // Ensure color is a valid hex
        if (!color || color === 'transparent') {
            color = '#808080';
        }
        if (color.charAt(0) !== '#') {
            color = '#' + color;
        }
        // Truncate to RRGGBB if RGBA hex
        if (color.length > 7) {
            color = color.substring(0, 7);
        }
        
        eyedropperPreview = document.createElement('div');
        eyedropperPreview.style.cssText = 'position:fixed;z-index:2147483649;pointer-events:none;' +
            'left:' + (x + 15) + 'px;top:' + (y + 15) + 'px;' +
            'background:#134611;color:#96e072;padding:8px 12px;border-radius:8px;' +
            'font-size:13px;font-family:monospace;border:2px solid ' + color + ';' +
            'box-shadow:0 4px 12px rgba(0,0,0,0.3);';
        
        eyedropperPreview.innerHTML = '<div style="background:#fff;border-radius:5px;padding:2px;margin-bottom:6px;display:inline-block;">' +
            '<div style="width:28px;height:28px;background:' + color + ';border-radius:3px;border:1px solid rgba(0,0,0,0.2);"></div></div>' +
            '<div style="font-weight:600;">' + color + '</div>' +
            '<div style="font-size:10px;opacity:0.7;margin-top:2px;">Copied to clipboard</div>';
        
        document.body.appendChild(eyedropperPreview);
        
        // Auto remove after 2 seconds
        setTimeout(removeEyedropperPreview, 2000);
    }

    function removeEyedropperPreview() {
        if (eyedropperPreview) {
            eyedropperPreview.remove();
            eyedropperPreview = null;
        }
    }

    function pickColor(e) {
        if (!isEyedropperMode) return;
        
        e.preventDefault();
        e.stopPropagation();
        
        // Use html2canvas-like approach: capture the area around the click
        var x = e.clientX;
        var y = e.clientY;
        
        // Create a small canvas to capture the pixel
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        canvas.width = 1;
        canvas.height = 1;
        
        // Try to use EyeDropper API first (Chrome 95+)
        if (window.EyeDropper) {
            var eyeDropper = new EyeDropper();
            eyeDropper.open().then(function(result) {
                var color = result.sRGBHex;
                copyToClipboard(color);
                showEyedropperPreview(x, y, color);
                showToast('Color copied: ' + color);
            }).catch(function(err) {
                console.log('EyeDropper cancelled or failed:', err);
                // Fallback to canvas method
                fallbackPickColor(x, y);
            });
        } else {
            fallbackPickColor(x, y);
        }
    }

    function fallbackPickColor(x, y) {
        // Create a canvas and draw the page
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Convert page to canvas using SVG foreignObject
        var svgData = '<svg xmlns="http://www.w3.org/2000/svg" width="' + canvas.width + '" height="' + canvas.height + '">' +
            '<foreignObject width="100%" height="100%">' +
            '<div xmlns="http://www.w3.org/1999/xhtml">' +
            document.documentElement.outerHTML +
            '</div></foreignObject></svg>';
        
        var img = new Image();
        img.onload = function() {
            ctx.drawImage(img, 0, 0);
            var pixel = ctx.getImageData(x, y, 1, 1).data;
            var color = rgbToHex('rgb(' + pixel[0] + ', ' + pixel[1] + ', ' + pixel[2] + ')');
            
            copyToClipboard(color);
            showEyedropperPreview(x, y, color);
            showToast('Color copied: ' + color);
        };
        img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    }

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).catch(function() {
            var textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        });
    }

    // ===== RULER CLEANUP =====
    function clearRulers() {
        rulers.forEach(function(ruler) {
            if (ruler && ruler.parentNode) {
                ruler.parentNode.removeChild(ruler);
            }
        });
        rulers = [];
    }

    // ===== TOOL MANAGEMENT =====
    function deactivateAllTools() {
        // Deactivate main tools
        isInspecting = false;
        isRulerMode = false;
        isDistanceMode = false;
        isEyedropperMode = false;
        isFindMode = false;
        isViewportMode = false;
        isDrawMode = false;
        
        // Deactivate WhatFont
        deactivateWhatFont();
        
        // Reset tool-specific state
        selectedEl = null;
        hoveredEl = null;
        distanceStartEl = null;
        rulerStart = null;
        if (tempRuler) {
            tempRuler.remove();
            tempRuler = null;
        }
        
        // Clean up UI
        clearOverlay();
        clearDistanceLines();
        hideFloatPanel();
        removeEyedropperPreview();
        clearRulers();
        hideBreakpoints();
        hideFindOverlay();
        hideViewportInfo();
        // Draw mode cleanup
        isDrawMode = false;
        if (drawOverlay) { drawOverlay.remove(); drawOverlay = null; }
        if (drawToolbar) { drawToolbar.remove(); drawToolbar = null; }
        drawShapes.forEach(function(s) { if (s.el) s.el.remove(); });
        drawShapes = [];
        drawCurrent = null;
        document.body.style.cursor = '';
        sendToPanel(null);
        
        // Close panel if open
        if (panelOpen) {
            panelOpen = false;
            safeSendMessage({ action: 'closeSidePanel' });
        }
    }

    // ===== INSPECT MODE =====
    function toggleInspect() {
        if (isInspecting) {
            // Already active, deactivate
            deactivateAllTools();
        } else {
            // Activate inspect
            deactivateAllTools();
            isInspecting = true;
            showDock();
            showToast('Click on any element to inspect');
        }
        updateDockButtons();
    }

    // ===== FIND ELEMENT MODE =====
    function toggleFind() {
        if (isFindMode) {
            isFindMode = false;
            hideFindOverlay();
            deactivateAllTools();
        } else {
            deactivateAllTools();
            isFindMode = true;
            showDock();
            showFindOverlay();
            showToast('Type a CSS selector to find element');
        }
        updateDockButtons();
    }

    function showFindOverlay() {
        if (findOverlay) return;

        findOverlay = document.createElement('div');
        findOverlay.id = 'canopy-find-overlay';
        findOverlay.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);' +
            'z-index:2147483647;background:#134611;border:2px solid #3e8914;' +
            'border-radius:12px;padding:16px 20px;box-shadow:0 8px 32px rgba(0,0,0,0.5);' +
            'display:flex;flex-direction:column;gap:10px;min-width:320px;';

        var label = document.createElement('label');
        label.textContent = 'Selector CSS';
        label.style.cssText = 'color:#96e072;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;';
        findOverlay.appendChild(label);

        var inputContainer = document.createElement('div');
        inputContainer.style.cssText = 'display:flex;gap:8px;align-items:center;';

        var input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Ej: #id, .class, div > span';
        input.style.cssText = 'flex:1;background:#0d2e0d;color:#96e072;border:1px solid #3e8914;' +
            'padding:10px 12px;border-radius:6px;font-size:14px;font-family:monospace;' +
            'outline:none;transition:border-color 0.2s;';
        input.addEventListener('focus', function() { this.style.borderColor = '#96e072'; });
        input.addEventListener('blur', function() { this.style.borderColor = '#3e8914'; });
        input.addEventListener('input', function() {
            highlightElement(this.value);
        });
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                toggleFind();
            }
        });
        inputContainer.appendChild(input);

        var closeBtn = document.createElement('button');
        closeBtn.innerHTML = '&#10005;';
        closeBtn.style.cssText = 'width:32px;height:32px;background:#3e8914;color:#fff;border:none;' +
            'border-radius:6px;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;';
        closeBtn.title = 'Close';
        closeBtn.addEventListener('click', function() {
            toggleFind();
        });
        inputContainer.appendChild(closeBtn);

        findOverlay.appendChild(inputContainer);

        var statusLabel = document.createElement('div');
        statusLabel.id = 'canopy-find-status';
        statusLabel.style.cssText = 'color:#96e072;font-size:12px;font-family:monospace;min-height:18px;';
        statusLabel.textContent = 'Type a selector to highlight';
        findOverlay.appendChild(statusLabel);

        document.body.appendChild(findOverlay);

        // Focus input
        setTimeout(function() { input.focus(); }, 100);
    }

    function hideFindOverlay() {
        if (findOverlay) {
            findOverlay.remove();
            findOverlay = null;
        }
        findHighlights.forEach(function(hl) { hl.remove(); });
        findHighlights = [];
    }

    function highlightElement(selector) {
        findHighlights.forEach(function(hl) { hl.remove(); });
        findHighlights = [];

        var statusLabel = document.getElementById('canopy-find-status');

        if (!selector || !selector.trim()) {
            if (statusLabel) statusLabel.textContent = 'Type a selector to highlight';
            return;
        }

        try {
            var elements = document.querySelectorAll(selector.trim());
            if (elements.length === 0) {
                if (statusLabel) statusLabel.textContent = 'No elements found for: ' + selector;
                return;
            }

            elements.forEach(function(element, index) {
                var rect = element.getBoundingClientRect();
                var highlight = document.createElement('div');
                highlight.style.cssText = 'position:fixed;z-index:2147483646;pointer-events:none;' +
                    'left:' + rect.left + 'px;top:' + rect.top + 'px;' +
                    'width:' + rect.width + 'px;height:' + rect.height + 'px;' +
                    'background:rgba(150, 224, 114, 0.3);border:3px solid #96e072;' +
                    'border-radius:4px;box-shadow:0 0 20px rgba(150,224,114,0.5);' +
                    'transition:all 0.2s ease;';
                
                // Add number badge for multiple elements
                if (elements.length > 1) {
                    var badge = document.createElement('div');
                    badge.textContent = (index + 1);
                    badge.style.cssText = 'position:absolute;top:-10px;left:-10px;' +
                        'background:#3e8914;color:#fff;width:20px;height:20px;' +
                        'border-radius:50%;display:flex;align-items:center;justify-content:center;' +
                        'font-size:11px;font-weight:700;z-index:2147483647;';
                    highlight.appendChild(badge);
                }
                
                document.body.appendChild(highlight);
                findHighlights.push(highlight);
            });

            // Scroll to first element
            elements[0].scrollIntoView({ behavior: 'smooth', block: 'center' });

            if (statusLabel) {
                var firstEl = elements[0];
                var rect = firstEl.getBoundingClientRect();
                statusLabel.textContent = 'Found ' + elements.length + ' element' + 
                    (elements.length > 1 ? 's' : '') + ': ' + firstEl.tagName.toLowerCase() +
                    (firstEl.id ? '#' + firstEl.id : '') +
                    ' (' + Math.round(rect.width) + 'x' + Math.round(rect.height) + ')';
            }
        } catch (e) {
            if (statusLabel) statusLabel.textContent = 'Invalid selector: ' + e.message;
        }
    }

    // ===== RULER MODE =====
    function toggleRulerMode() {
        if (isRulerMode) {
            // Already active, deactivate
            deactivateAllTools();
        } else {
            // Activate ruler
            deactivateAllTools();
            isRulerMode = true;
            showDock();
            showToast('Click and drag to create ruler');
            document.body.style.cursor = 'crosshair';
        }
        updateDockButtons();
    }

    var rulerStart = null;
    var tempRuler = null;

    function createRuler(startX, startY, endX, endY) {
        var ruler = document.createElement('div');
        ruler.className = 'canopy-ruler';
        
        var dx = endX - startX;
        var dy = endY - startY;
        var length = Math.sqrt(dx * dx + dy * dy);
        var angle = Math.atan2(dy, dx) * 180 / Math.PI;
        
        ruler.style.cssText = 'position:fixed;z-index:2147483646;pointer-events:none;' +
            'height:2px;background:#ff3333;transform-origin:left center;' +
            'left:' + startX + 'px;top:' + startY + 'px;' +
            'width:' + length + 'px;transform:rotate(' + angle + 'deg);';
        
        var label = document.createElement('div');
        label.style.cssText = 'position:absolute;top:-20px;left:50%;transform:translateX(-50%);' +
            'background:#134611;color:#fff;padding:2px 6px;border-radius:3px;font-size:11px;white-space:nowrap;';
        label.textContent = Math.round(length) + 'px';
        ruler.appendChild(label);
        
        overlay.appendChild(ruler);
        rulers.push(ruler);
        
        return ruler;
    }

    // ===== DISTANCE MODE =====
    function toggleDistanceMode() {
        if (isDistanceMode) {
            // Already active, deactivate
            deactivateAllTools();
        } else {
            // Activate distance
            deactivateAllTools();
            isDistanceMode = true;
            showDock();
            showToast('Click first element, then second to measure distance');
        }
        updateDockButtons();
    }

    function measureDistance(el1, el2) {
        var rect1 = el1.getBoundingClientRect();
        var rect2 = el2.getBoundingClientRect();
        
        var center1 = {
            x: rect1.left + rect1.width / 2,
            y: rect1.top + rect1.height / 2
        };
        var center2 = {
            x: rect2.left + rect2.width / 2,
            y: rect2.top + rect2.height / 2
        };
        
        var dx = center2.x - center1.x;
        var dy = center2.y - center1.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distanceLine) distanceLine.remove();
        distanceLine = document.createElement('div');
        var angle = Math.atan2(dy, dx) * 180 / Math.PI;
        distanceLine.style.cssText = 'position:fixed;z-index:2147483646;pointer-events:none;' +
            'height:2px;background:#3e8914;transform-origin:left center;' +
            'left:' + center1.x + 'px;top:' + center1.y + 'px;' +
            'width:' + distance + 'px;transform:rotate(' + angle + 'deg);';
        
        if (distanceLabel) distanceLabel.remove();
        distanceLabel = document.createElement('div');
        distanceLabel.style.cssText = 'position:fixed;z-index:2147483647;pointer-events:none;' +
            'background:#134611;color:#96e072;padding:4px 8px;border-radius:4px;font-size:12px;' +
            'left:' + ((center1.x + center2.x) / 2) + 'px;top:' + ((center1.y + center2.y) / 2) + 'px;' +
            'transform:translate(-50%,-50%);border:1px solid #3e8914;';
        distanceLabel.innerHTML = '<strong>' + Math.round(distance) + 'px</strong><br>' +
            '<span style="font-size:10px;opacity:0.8">H: ' + Math.round(Math.abs(dx)) + ' | V: ' + Math.round(Math.abs(dy)) + '</span>';
        
        overlay.appendChild(distanceLine);
        overlay.appendChild(distanceLabel);
        
        showToast('Distance: ' + Math.round(distance) + 'px');
    }

    // ===== X-RAY MODE =====
    function toggleXRay() {
        if (xrayMode) {
            // Already active, deactivate
            xrayMode = false;
            clearXRayOutlines();
        } else {
            // Activate xray
            xrayMode = true;
            showDock();
            showAllElementOutlines();
        }
        updateDockButtons();
    }

    function showAllElementOutlines() {
        if (!overlay) return;
        clearXRayOutlines();
        
        var allElements = document.querySelectorAll('body *');
        allElements.forEach(function(el) {
            if (isExtensionElement(el)) return;
            var rect = el.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) return;
            
            var outline = document.createElement('div');
            outline.className = 'canopy-xray-outline';
            outline.style.cssText = 'position:absolute;left:' + rect.left + 'px;top:' + rect.top + 'px;' +
                'width:' + rect.width + 'px;height:' + rect.height + 'px;' +
                'border:1px solid rgba(62,137,20,0.3);pointer-events:none;z-index:2147483645;';
            overlay.appendChild(outline);
        });
    }

    function clearXRayOutlines() {
        if (!overlay) return;
        var outlines = overlay.querySelectorAll('.canopy-xray-outline');
        outlines.forEach(function(o) { o.remove(); });
    }

    // ===== GRID MODE =====
    function toggleGrid() {
        if (isGridMode) {
            // Already active, deactivate
            isGridMode = false;
            hideGrid();
        } else {
            // Activate grid
            isGridMode = true;
            showDock();
            showGrid();
        }
        updateDockButtons();
    }

    function showGrid() {
        if (!gridOverlay) {
            gridOverlay = document.createElement('div');
            gridOverlay.id = 'canopy-grid';
            gridOverlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;' +
                'pointer-events:none;z-index:2147483644;' +
                'background-image:linear-gradient(to right, rgba(62,137,20,0.1) 1px, transparent 1px),' +
                'linear-gradient(to bottom, rgba(62,137,20,0.1) 1px, transparent 1px);' +
                'background-size:50px 50px;';
            document.body.appendChild(gridOverlay);
        }
        gridOverlay.style.display = 'block';
    }

    function hideGrid() {
        if (gridOverlay) gridOverlay.style.display = 'none';
    }

    // ===== CSS BREAKPOINTS =====
    function toggleBreakpoints() {
        if (isBreakpointsMode) {
            isBreakpointsMode = false;
            hideBreakpoints();
        } else {
            isBreakpointsMode = true;
            showDock();
            showBreakpoints();
            showToast('CSS breakpoints shown');
        }
        updateDockButtons();
    }

    function detectBreakpoints() {
        var breakpoints = new Set();
        
        // Common responsive breakpoints
        var commonBreakpoints = [320, 480, 640, 768, 1024, 1280, 1440, 1536, 1920];
        commonBreakpoints.forEach(function(bp) { breakpoints.add(bp); });
        
        // Scan stylesheets for media queries
        try {
            for (var i = 0; i < document.styleSheets.length; i++) {
                var sheet = document.styleSheets[i];
                try {
                    var rules = sheet.cssRules || sheet.rules;
                    if (!rules) continue;
                    
                    for (var j = 0; j < rules.length; j++) {
                        var rule = rules[j];
                        if (rule.type === CSSRule.MEDIA_RULE) {
                            var mediaText = rule.media.mediaText;
                            // Extract pixel values from media queries
                            var matches = mediaText.match(/(\d+)(?:px)?/g);
                            if (matches) {
                                matches.forEach(function(match) {
                                    var val = parseInt(match);
                                    if (val > 100 && val < 5000) {
                                        breakpoints.add(val);
                                    }
                                });
                            }
                        }
                    }
                } catch (e) {
                    // Cross-origin stylesheet, skip
                }
            }
        } catch (e) {
            console.log('[Canopy Ruler] Error scanning breakpoints:', e);
        }
        
        return Array.from(breakpoints).sort(function(a, b) { return a - b; });
    }

    function showBreakpoints() {
        hideBreakpoints();
        
        var breakpoints = detectBreakpoints();
        if (breakpoints.length === 0) {
            showToast('No breakpoints detected');
            return;
        }
        
        breakpointsOverlay = document.createElement('div');
        breakpointsOverlay.id = 'canopy-breakpoints';
        breakpointsOverlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;' +
            'pointer-events:none;z-index:2147483645;';
        
        breakpoints.forEach(function(bp) {
            var line = document.createElement('div');
            line.style.cssText = 'position:absolute;top:0;left:' + bp + 'px;' +
                'width:1px;height:100%;' +
                'border-left:2px dashed rgba(150, 224, 114, 0.6);' +
                'pointer-events:none;';
            
            var label = document.createElement('div');
            label.style.cssText = 'position:absolute;top:10px;left:' + (bp + 6) + 'px;' +
                'background:rgba(19, 70, 17, 0.9);color:#96e072;' +
                'padding:4px 8px;font-size:11px;font-family:monospace;' +
                'border-radius:4px;white-space:nowrap;' +
                'border:1px solid #3e8914;pointer-events:none;';
            label.textContent = bp + 'px';
            
            breakpointsOverlay.appendChild(line);
            breakpointsOverlay.appendChild(label);
        });
        
        document.body.appendChild(breakpointsOverlay);
    }

    function hideBreakpoints() {
        if (breakpointsOverlay) {
            breakpointsOverlay.remove();
            breakpointsOverlay = null;
        }
    }

    // ===== RESPONSIVE DESIGN TOOL =====
    function toggleResponsive() {
        if (isResponsiveMode) {
            isResponsiveMode = false;
            hideResponsive();
            showDock();
        } else {
            isResponsiveMode = true;
            showDock();
            showResponsive();
            showToast('Responsive mode enabled');
        }
        updateDockButtons();
    }

    function showResponsive() {
        if (responsiveOverlay) return;

        var currentUrl = window.location.href;

        responsiveOverlay = document.createElement('div');
        responsiveOverlay.id = 'canopy-responsive-overlay';
        responsiveOverlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;' +
            'z-index:2147483646;background-color:#1a1a1a;' +
            'background-image:radial-gradient(circle, #333 1px, transparent 1px);' +
            'background-size:20px 20px;' +
            'display:flex;flex-direction:column;align-items:center;';

        // Top bar
        var topBar = document.createElement('div');
        topBar.className = 'canopy-responsive-topbar';
        topBar.style.cssText = 'display:flex;align-items:center;gap:12px;padding:10px 16px;' +
            'background:#134611;border-bottom:2px solid #3e8914;width:100%;' +
            'justify-content:center;box-sizing:border-box;flex-shrink:0;';

        // Device select
        var deviceSelect = document.createElement('select');
        deviceSelect.className = 'canopy-responsive-select';
        deviceSelect.style.cssText = 'background:#0d2e0d;color:#96e072;border:1px solid #3e8914;' +
            'padding:6px 10px;border-radius:6px;font-size:13px;cursor:pointer;';
        
        var devices = [
            { value: 'iphone-17-pro-max', label: 'iPhone 15/16/17 Pro Max (430×932)', w: 430, h: 932 },
            { value: 'iphone-17-pro', label: 'iPhone 15/16/17 Pro (393×852)', w: 393, h: 852 },
            { value: 'iphone-17-plus', label: 'iPhone 15/16/17 Plus (430×932)', w: 430, h: 932 },
            { value: 'iphone-17', label: 'iPhone 15/16 (393×852)', w: 393, h: 852 },
            { value: 'iphone-se', label: 'iPhone SE 3rd gen (375×667)', w: 375, h: 667 },
            { value: 'iphone-12-13-mini', label: 'iPhone 12/13 mini (375×812)', w: 375, h: 812 },
            { value: 'iphone-12-13-14', label: 'iPhone 12/13/14 (390×844)', w: 390, h: 844 },
            { value: 'iphone-14-pro', label: 'iPhone 14 Pro (393×852)', w: 393, h: 852 },
            { value: 'iphone-14-pro-max', label: 'iPhone 14 Pro Max (430×932)', w: 430, h: 932 },
            { group: 'Samsung' },
            { value: 'galaxy-s25-ultra', label: 'Galaxy S24/S25 Ultra (412×915)', w: 412, h: 915 },
            { value: 'galaxy-s24-s25', label: 'Galaxy S24/S25 (360×800)', w: 360, h: 800 },
            { value: 'galaxy-s23-s24-s25', label: 'Galaxy S23/S24/S25 (360×780)', w: 360, h: 780 },
            { value: 'galaxy-s25-plus', label: 'Galaxy S25+ (480×1040)', w: 480, h: 1040 },
            { value: 'galaxy-a54', label: 'Galaxy A54 (412×915)', w: 412, h: 915 },
            { group: 'Pixel' },
            { value: 'pixel-9-pro', label: 'Pixel 8/9 Pro (412×892)', w: 412, h: 892 },
            { value: 'pixel-9', label: 'Pixel 9 (412×915)', w: 412, h: 915 },
            { value: 'pixel-9-pro-xl', label: 'Pixel 9 Pro XL (448×997)', w: 448, h: 997 },
            { group: 'Android' },
            { value: 'android-medium', label: 'Android Medium (360×800)', w: 360, h: 800 },
            { value: 'android-small', label: 'Android Small (360×640)', w: 360, h: 640 },
            { value: 'android-large', label: 'Android Large (414×896)', w: 414, h: 896 },
            { group: 'iPad' },
            { value: 'ipad-mini', label: 'iPad Mini (768×1024)', w: 768, h: 1024 },
            { value: 'ipad-air', label: 'iPad Air (820×1180)', w: 820, h: 1180 },
            { value: 'ipad-pro-11', label: 'iPad Pro 11" (834×1194)', w: 834, h: 1194 },
            { value: 'ipad-pro-12-9', label: 'iPad Pro 12.9" (1024×1366)', w: 1024, h: 1366 },
            { group: 'Tablets' },
            { value: 'galaxy-tab', label: 'Galaxy Tab (800×1280)', w: 800, h: 1280 },
            { value: 'android-tablet', label: 'Android Tablet (768×1024)', w: 768, h: 1024 },
            { group: 'Desktop' },
            { value: 'desktop-1280x720', label: 'Desktop 1280x720', w: 1280, h: 720 },
            { value: 'desktop-1366x768', label: 'Desktop 1366x768', w: 1366, h: 768 },
            { value: 'desktop-1536x864', label: 'Desktop 1536x864', w: 1536, h: 864 },
            { value: 'desktop-1920x1080', label: 'Desktop 1920x1080', w: 1920, h: 1080 },
            { value: 'desktop-2560x1440', label: 'Desktop 2560x1440', w: 2560, h: 1440 },
            { value: 'desktop-4k', label: 'Desktop 4K (3840×2160)', w: 3840, h: 2160 },
            { group: 'Other' },
            { value: 'custom', label: 'Custom', w: 375, h: 667 }
        ];

        devices.forEach(function(device) {
            if (device.group) {
                var group = document.createElement('optgroup');
                group.label = device.group;
                deviceSelect.appendChild(group);
            } else {
                var option = document.createElement('option');
                option.value = device.value;
                option.textContent = device.label;
                option.dataset.w = device.w;
                option.dataset.h = device.h;
                deviceSelect.appendChild(option);
            }
        });

        deviceSelect.addEventListener('change', function() {
            var selected = this.options[this.selectedIndex];
            if (selected.dataset.w && selected.dataset.h) {
                widthInput.value = selected.dataset.w;
                heightInput.value = selected.dataset.h;
                updateIframeSize();
            }
        });

        topBar.appendChild(deviceSelect);

        // W input
        var wLabel = document.createElement('span');
        wLabel.textContent = 'W:';
        wLabel.style.cssText = 'color:#96e072;font-size:13px;';
        topBar.appendChild(wLabel);

        var widthInput = document.createElement('input');
        widthInput.type = 'number';
        widthInput.value = '430';
        widthInput.style.cssText = 'width:60px;background:#0d2e0d;color:#96e072;border:1px solid #3e8914;' +
            'padding:5px 8px;border-radius:4px;font-size:13px;text-align:center;';
        widthInput.addEventListener('change', updateIframeSize);
        topBar.appendChild(widthInput);

        // H input
        var hLabel = document.createElement('span');
        hLabel.textContent = 'H:';
        hLabel.style.cssText = 'color:#96e072;font-size:13px;';
        topBar.appendChild(hLabel);

        var heightInput = document.createElement('input');
        heightInput.type = 'number';
        heightInput.value = '932';
        heightInput.style.cssText = 'width:60px;background:#0d2e0d;color:#96e072;border:1px solid #3e8914;' +
            'padding:5px 8px;border-radius:4px;font-size:13px;text-align:center;';
        heightInput.addEventListener('change', updateIframeSize);
        topBar.appendChild(heightInput);

        // Zoom select
        var zoomSelect = document.createElement('select');
        zoomSelect.style.cssText = 'background:#0d2e0d;color:#96e072;border:1px solid #3e8914;' +
            'padding:6px 10px;border-radius:6px;font-size:13px;cursor:pointer;';
        [50, 75, 100, 125, 150, 200].forEach(function(z) {
            var option = document.createElement('option');
            option.value = z;
            option.textContent = z + '%';
            if (z === 100) option.selected = true;
            zoomSelect.appendChild(option);
        });
        zoomSelect.addEventListener('change', updateIframeSize);
        topBar.appendChild(zoomSelect);

        // Rotate button
        var rotateBtn = document.createElement('button');
        rotateBtn.innerHTML = '&#8634;';
        rotateBtn.style.cssText = 'width:32px;height:32px;background:#3e8914;color:#fff;border:none;' +
            'border-radius:6px;cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;';
        rotateBtn.title = 'Rotate device';
        rotateBtn.addEventListener('click', function() {
            var w = widthInput.value;
            widthInput.value = heightInput.value;
            heightInput.value = w;
            updateIframeSize();
        });
        topBar.appendChild(rotateBtn);

        responsiveOverlay.appendChild(topBar);

        // Content area
        var contentArea = document.createElement('div');
        contentArea.className = 'canopy-responsive-content-area';
        contentArea.style.cssText = 'flex:1;width:100%;display:flex;align-items:center;justify-content:center;' +
            'overflow:auto;padding:20px;box-sizing:border-box;';

        // Iframe container
        var iframeContainer = document.createElement('div');
        iframeContainer.className = 'canopy-iframe-container';
        iframeContainer.style.cssText = 'background:#fff;box-shadow:0 8px 32px rgba(0,0,0,0.5);' +
            'border-radius:8px;overflow:hidden;transition:width 0.3s,height 0.3s;';

        // Iframe
        responsiveIframe = document.createElement('iframe');
        responsiveIframe.src = currentUrl;
        responsiveIframe.name = 'canopy-ruler-responsive-iframe';
        responsiveIframe.style.cssText = 'width:100%;height:100%;border:none;display:block;';
        responsiveIframe.setAttribute('data-canopy-ruler-target', 'true');
        responsiveIframe.setAttribute('sandbox', 'allow-same-origin allow-scripts allow-forms allow-popups allow-modals');

        iframeContainer.appendChild(responsiveIframe);
        contentArea.appendChild(iframeContainer);
        responsiveOverlay.appendChild(contentArea);

        document.body.appendChild(responsiveOverlay);

        function updateIframeSize() {
            var w = parseInt(widthInput.value) || 430;
            var h = parseInt(heightInput.value) || 932;
            var zoom = parseInt(zoomSelect.value) || 100;
            var scale = zoom / 100;

            iframeContainer.style.width = w + 'px';
            iframeContainer.style.height = h + 'px';
            iframeContainer.style.transform = 'scale(' + scale + ')';
            iframeContainer.style.transformOrigin = 'center center';
        }

        // Initialize size
        updateIframeSize();
    }

    function hideResponsive() {
        if (responsiveOverlay) {
            responsiveOverlay.remove();
            responsiveOverlay = null;
            responsiveIframe = null;
        }
    }

    // ===== VIEWPORT INFO =====
    function toggleViewportInfo() {
        if (isViewportMode) {
            isViewportMode = false;
            hideViewportInfo();
        } else {
            deactivateAllTools();
            isViewportMode = true;
            showDock();
            showViewportInfo();
            showToast(t('toast.viewport'));
        }
        updateDockButtons();
    }

    // ===== WHATFONT =====
    function toggleWhatFont() {
        if (isWhatFontMode) {
            deactivateWhatFont();
        } else {
            deactivateAllTools();
            isWhatFontMode = true;
            showDock();
            showWhatFontExitButton();
            showToast(t('whatfont.activated'));
            document.body.style.cursor = 'help';
        }
        updateDockButtons();
    }

    function deactivateWhatFont() {
        isWhatFontMode = false;
        hideWhatFontTooltip();
        hideWhatFontExitButton();
        closeAllWhatFontPopovers();
        document.body.style.cursor = '';
    }

    var whatFontExitBtn = null;

    function showWhatFontExitButton() {
        if (whatFontExitBtn) return;
        whatFontExitBtn = document.createElement('div');
        whatFontExitBtn.id = 'canopy-whatfont-exit';
        whatFontExitBtn.style.cssText = 'position:fixed;top:16px;right:16px;z-index:2147483647;';
        
        var btn = document.createElement('button');
        btn.textContent = t('whatfont.exit');
        btn.style.cssText = 'background:rgba(19,70,17,0.85);backdrop-filter:blur(10px);color:#e8fccf;' +
            'border:1px solid #3e8914;border-radius:8px;padding:6px 14px;font-size:13px;' +
            'font-family:-apple-system,BlinkMacSystemFont,sans-serif;cursor:pointer;' +
            'box-shadow:0 4px 12px rgba(0,0,0,0.3);transition:all 0.2s;';
        btn.addEventListener('mouseenter', function() {
            this.style.background = '#3e8914';
            this.style.color = '#fff';
        });
        btn.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(19,70,17,0.85)';
            this.style.color = '#e8fccf';
        });
        btn.addEventListener('click', function() {
            toggleWhatFont();
        });
        
        whatFontExitBtn.appendChild(btn);
        document.body.appendChild(whatFontExitBtn);
    }

    function hideWhatFontExitButton() {
        if (whatFontExitBtn) {
            whatFontExitBtn.remove();
            whatFontExitBtn = null;
        }
    }

    function showWhatFontTooltip(el, x, y) {
        if (!isWhatFontMode) return;
        
        var computed = window.getComputedStyle(el);
        var fontFamily = computed.fontFamily.split(',')[0].replace(/['"]/g, '');
        var fontWeight = computed.fontWeight;
        var fontSize = computed.fontSize;
        
        if (!whatFontTooltip) {
            whatFontTooltip = document.createElement('div');
            whatFontTooltip.id = 'canopy-whatfont-tooltip';
            whatFontTooltip.style.cssText = 'position:fixed;z-index:2147483647;pointer-events:none;' +
                'background:rgba(19,70,17,0.95);backdrop-filter:blur(8px);color:#e8fccf;' +
                'padding:8px 14px;border-radius:8px;font-size:13px;font-family:monospace;' +
                'border:1px solid #3e8914;box-shadow:0 4px 16px rgba(0,0,0,0.4);' +
                'white-space:nowrap;transition:opacity 0.15s;';
            document.body.appendChild(whatFontTooltip);
        }
        
        whatFontTooltip.innerHTML = '<span style="font-weight:600;">' + escapeHtml(fontFamily) + '</span>' +
            ' <span style="opacity:0.7;font-size:11px;">' + fontWeight + ' · ' + fontSize + '</span>';
        
        // Position tooltip near cursor
        var tooltipWidth = 250;
        var px = x + 15;
        var py = y + 15;
        
        if (px + tooltipWidth > window.innerWidth - 10) {
            px = x - tooltipWidth - 10;
        }
        if (py + 40 > window.innerHeight - 10) {
            py = y - 50;
        }
        
        whatFontTooltip.style.left = px + 'px';
        whatFontTooltip.style.top = py + 'px';
        whatFontTooltip.style.display = 'block';
        whatFontTooltip.style.opacity = '1';
    }

    function hideWhatFontTooltip() {
        if (whatFontTooltip) {
            whatFontTooltip.style.display = 'none';
        }
    }

    function normalizeFontName(name) {
        return name.replace(/['"]/g, '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    }

    function extractFontUrlsFromSrc(srcValue) {
        var urls = [];
        var regex = /url\(['"]?([^'"()]+)['"]?\)/g;
        var match;
        while ((match = regex.exec(srcValue)) !== null) {
            var url = match[1];
            if (url && url.indexOf('data:') !== 0) {
                urls.push(url);
            }
        }
        return urls;
    }

    function resolveUrl(relativeUrl, baseUrl) {
        try {
            return new URL(relativeUrl, baseUrl).href;
        } catch (e) {
            return relativeUrl;
        }
    }

    function parseFontFaceRules(cssText, normalizedTarget, baseUrl) {
        var fontFaceRegex = /@font-face\s*\{([^}]+)\}/g;
        var match;
        while ((match = fontFaceRegex.exec(cssText)) !== null) {
            var block = match[1];
            var familyMatch = /font-family\s*:\s*([^;]+)/i.exec(block);
            if (familyMatch && normalizeFontName(familyMatch[1]) === normalizedTarget) {
                var srcMatch = /src\s*:\s*([^;]+)/i.exec(block);
                if (srcMatch) {
                    var urls = extractFontUrlsFromSrc(srcMatch[1]);
                    if (urls.length > 0) {
                        return resolveUrl(urls[0], baseUrl);
                    }
                }
            }
        }
        return null;
    }

    function findFontFileUrl(targetFontFamily) {
        var normalizedTarget = normalizeFontName(targetFontFamily);
        if (!normalizedTarget) return null;

        // Strategy 1: Scan document.styleSheets for @font-face rules
        try {
            var sheets = document.styleSheets;
            for (var i = 0; i < sheets.length; i++) {
                try {
                    var rules = sheets[i].cssRules || sheets[i].rules;
                    if (!rules) continue;
                    for (var j = 0; j < rules.length; j++) {
                        var rule = rules[j];
                        if (rule.type === CSSRule.FONT_FACE_RULE) {
                            var ruleFamily = rule.style.getPropertyValue('font-family');
                            if (normalizeFontName(ruleFamily) === normalizedTarget) {
                                var src = rule.style.getPropertyValue('src');
                                var urls = extractFontUrlsFromSrc(src);
                                if (urls.length > 0) return urls[0];
                            }
                        }
                    }
                } catch (e) {
                    // Cross-origin stylesheet, skip
                    continue;
                }
            }
        } catch (e) {
            // Cannot access stylesheets at all
        }

        // Strategy 2: Scan <link rel="preload" as="font"> tags
        var preloadLinks = document.querySelectorAll('link[rel="preload"][as="font"], link[rel="preload"][as="font"][type]');
        for (var k = 0; k < preloadLinks.length; k++) {
            var href = preloadLinks[k].getAttribute('href');
            if (!href) continue;
            var hrefNormalized = normalizeFontName(href);
            if (hrefNormalized.indexOf(normalizedTarget) !== -1 || normalizedTarget.indexOf(hrefNormalized) !== -1) {
                return resolveUrl(href, document.baseURI);
            }
        }

        return null;
    }

    function findFontFileUrlAsync(targetFontFamily, callback) {
        var normalizedTarget = normalizeFontName(targetFontFamily);
        if (!normalizedTarget) { callback(null); return; }

        // Fetch cross-origin stylesheets and parse @font-face rules
        var styleLinks = document.querySelectorAll('link[rel="stylesheet"]');
        var pending = styleLinks.length;
        if (pending === 0) { callback(null); return; }

        var found = false;

        for (var i = 0; i < styleLinks.length; i++) {
            var href = styleLinks[i].href;
            if (!href) { pending--; continue; }

            fetchFontCssAndParse(href, normalizedTarget, function(result) {
                if (!found && result) {
                    found = true;
                    callback(result);
                }
                pending--;
                if (pending === 0 && !found) {
                    callback(null);
                }
            });
        }
    }

    function fetchFontCssAndParse(href, normalizedTarget, callback) {
        fetch(href, { mode: 'cors', credentials: 'omit' })
            .then(function(response) {
                if (!response.ok) { callback(null); return; }
                return response.text();
            })
            .then(function(cssText) {
                if (!cssText) { callback(null); return; }
                var result = parseFontFaceRules(cssText, normalizedTarget, href);
                callback(result || null);
            })
            .catch(function() {
                callback(null);
            });
    }

    function downloadFontFile(url, filename) {
        safeSendMessage({
            action: 'downloadFont',
            url: url,
            filename: filename
        });
        showToast(t('toast.font.downloading'));
    }

    function createWhatFontPopover(el, x, y) {
        if (!isWhatFontMode) return;
        
        var computed = window.getComputedStyle(el);
        var fontFamily = computed.fontFamily;
        var fontFamilyFirst = fontFamily.split(',')[0].replace(/['"]/g, '');
        var fontWeight = computed.fontWeight;
        var fontStyle = computed.fontStyle;
        var fontSize = computed.fontSize;
        var lineHeight = computed.lineHeight;
        var color = computed.color;
        var colorHex = rgbToHex(color);
        
        // Create popover
        var popover = document.createElement('div');
        popover.className = 'canopy-whatfont-popover';
        popover.style.cssText = 'position:fixed;z-index:2147483647;display:block;' +
            'background:rgba(19,70,17,0.95);backdrop-filter:blur(12px);color:#e8fccf;' +
            'border:1px solid #3e8914;border-radius:12px;padding:16px;' +
            'box-shadow:0 8px 32px rgba(0,0,0,0.5);font-family:-apple-system,BlinkMacSystemFont,sans-serif;' +
            'width:340px;max-width:calc(100vw - 40px);';
        
        // Header with font name, copy button and close button
        var header = document.createElement('div');
        header.style.cssText = 'display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;';
        
        var title = document.createElement('div');
        title.style.cssText = 'font-size:16px;font-weight:600;color:#fff;flex:1;word-break:break-word;';
        title.textContent = fontFamilyFirst + ' - ' + fontWeight;
        
        var copyBtn = document.createElement('button');
        copyBtn.innerHTML = getPhosphorIcon('copy');
        copyBtn.style.cssText = 'width:24px;height:24px;background:transparent;border:none;color:#96e072;' +
            'cursor:pointer;display:flex;align-items:center;justify-content:center;margin-left:4px;';
        copyBtn.title = t('whatfont.copy');
        copyBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            var copyText = 'Font: ' + fontFamilyFirst + ' (' + fontWeight + ')\n' +
                'Family: ' + fontFamily + '\n' +
                'Style: ' + fontStyle + '\n' +
                'Weight: ' + fontWeight + '\n' +
                'Color: ' + colorHex + '\n' +
                'Size: ' + fontSize + '\n' +
                'Line Height: ' + lineHeight;
            navigator.clipboard.writeText(copyText).then(function() {
                showToast(t('toast.font.copied'));
            }).catch(function(err) {
                console.error('Failed to copy:', err);
                showToast(t('toast.failed'));
            });
        });
        
        var downloadBtn = document.createElement('button');
        downloadBtn.innerHTML = getPhosphorIcon('download');
        downloadBtn.style.cssText = 'width:24px;height:24px;background:transparent;border:none;color:#96e072;' +
            'cursor:pointer;display:flex;align-items:center;justify-content:center;margin-left:4px;';
        downloadBtn.title = t('whatfont.download');
        downloadBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            var safeName = fontFamilyFirst.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, '');
            var fontUrl = findFontFileUrl(fontFamilyFirst);

            if (fontUrl) {
                downloadFontFile(fontUrl, safeName);
            } else {
                // Try async: fetch cross-origin stylesheets and parse @font-face rules
                findFontFileUrlAsync(fontFamilyFirst, function(asyncUrl) {
                    if (asyncUrl) {
                        downloadFontFile(asyncUrl, safeName);
                    } else {
                        // Final fallback: CSS info text
                        var fontInfo = '/* Font: ' + fontFamilyFirst + ' */\n' +
                            '/* Weight: ' + fontWeight + ' */\n' +
                            '/* Style: ' + fontStyle + ' */\n' +
                            '/* Size: ' + fontSize + ' */\n' +
                            '/* Line Height: ' + lineHeight + ' */\n' +
                            '/* Color: ' + colorHex + ' */\n\n' +
                            'font-family: ' + fontFamily + ';\n' +
                            'font-weight: ' + fontWeight + ';\n' +
                            'font-style: ' + fontStyle + ';\n' +
                            'font-size: ' + fontSize + ';\n' +
                            'line-height: ' + lineHeight + ';\n' +
                            'color: ' + colorHex + ';';

                        var blob = new Blob([fontInfo], { type: 'text/css' });
                        var url = URL.createObjectURL(blob);
                        var link = document.createElement('a');
                        link.href = url;
                        link.download = safeName + '.css';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        URL.revokeObjectURL(url);
                        showToast('Font file not found. Downloaded CSS info instead.');
                    }
                });
            }
        });
        
        var closeBtn = document.createElement('button');
        closeBtn.innerHTML = getPhosphorIcon('x');
        closeBtn.style.cssText = 'width:24px;height:24px;background:transparent;border:none;color:#96e072;' +
            'cursor:pointer;display:flex;align-items:center;justify-content:center;margin-left:4px;';
        closeBtn.title = t('whatfont.close');
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            popover.remove();
        });
        
        header.appendChild(title);
        header.appendChild(copyBtn);
        header.appendChild(downloadBtn);
        header.appendChild(closeBtn);
        popover.appendChild(header);
        
        // Font Family section
        var familySection = document.createElement('div');
        familySection.style.cssText = 'margin-bottom:12px;padding:10px;background:rgba(62,137,20,0.15);border-radius:8px;';
        
        var familyLabel = document.createElement('div');
        familyLabel.style.cssText = 'font-size:11px;text-transform:uppercase;letter-spacing:0.05em;color:#96e072;margin-bottom:4px;';
        familyLabel.textContent = t('whatfont.family');

        var familyValue = document.createElement('div');
        familyValue.style.cssText = 'font-size:13px;color:#e8fccf;word-break:break-all;';
        familyValue.innerHTML = formatFontFamily(fontFamily);

        familySection.appendChild(familyLabel);
        familySection.appendChild(familyValue);
        popover.appendChild(familySection);
        
        // Grid: Style, Weight, Color
        var grid = document.createElement('div');
        grid.style.cssText = 'display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:12px;';
        
        grid.appendChild(createWhatFontDetail(t('whatfont.style'), fontStyle));
        grid.appendChild(createWhatFontDetail(t('whatfont.weight'), fontWeight));
        
        // Color with swatch
        var colorItem = createWhatFontDetail(t('whatfont.color'), '');
        var colorRow = document.createElement('div');
        colorRow.style.cssText = 'display:flex;align-items:center;gap:6px;';
        
        var swatch = document.createElement('div');
        swatch.style.cssText = 'width:16px;height:16px;border-radius:3px;border:1px solid rgba(255,255,255,0.3);flex-shrink:0;';
        swatch.style.backgroundColor = colorHex;
        
        var colorText = document.createElement('span');
        colorText.style.cssText = 'font-size:12px;font-family:monospace;word-break:break-all;';
        colorText.textContent = colorHex;
        
        colorRow.appendChild(swatch);
        colorRow.appendChild(colorText);
        colorItem.querySelector('.wf-detail-value').innerHTML = '';
        colorItem.querySelector('.wf-detail-value').appendChild(colorRow);
        grid.appendChild(colorItem);
        
        popover.appendChild(grid);
        
        // Size and Line Height
        var grid2 = document.createElement('div');
        grid2.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px;';
        grid2.appendChild(createWhatFontDetail(t('whatfont.size'), fontSize));
        grid2.appendChild(createWhatFontDetail(t('whatfont.lineheight'), lineHeight));
        popover.appendChild(grid2);
        
        // Font preview
        var preview = document.createElement('div');
        preview.id = 'canopy-whatfont-preview-' + Date.now();
        preview.style.cssText = 'padding:12px;background:rgba(0,0,0,0.2);border-radius:8px;' +
            'font-size:18px;color:#fff;overflow-x:auto;white-space:nowrap;' +
            'scrollbar-width:thin;' +
            'scrollbar-color:rgba(150,224,114,0.4) transparent;';
        preview.style.fontFamily = fontFamily;
        preview.style.fontWeight = fontWeight;
        preview.style.fontStyle = fontStyle;
        preview.textContent = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz';
        popover.appendChild(preview);
        
        // Add custom scrollbar styles
        var scrollbarStyle = document.createElement('style');
        scrollbarStyle.textContent = '#' + preview.id + '::-webkit-scrollbar { height: 6px; } ' +
            '#' + preview.id + '::-webkit-scrollbar-track { background: transparent; } ' +
            '#' + preview.id + '::-webkit-scrollbar-thumb { background: rgba(150,224,114,0.4); border-radius: 3px; } ' +
            '#' + preview.id + '::-webkit-scrollbar-thumb:hover { background: rgba(150,224,114,0.7); }';
        document.head.appendChild(scrollbarStyle);
        
        // Position popover
        var popoverHeight = 300;
        var px = x + 15;
        var py = y + 15;
        
        if (px + 360 > window.innerWidth - 10) {
            px = x - 360;
        }
        if (py + popoverHeight > window.innerHeight - 10) {
            py = y - popoverHeight - 10;
        }
        if (px < 10) px = 10;
        if (py < 10) py = 10;
        
        popover.style.left = px + 'px';
        popover.style.top = py + 'px';
        
        document.body.appendChild(popover);
        whatFontPopovers.push(popover);
    }

    function createWhatFontDetail(label, value) {
        var item = document.createElement('div');
        item.style.cssText = 'min-width:0;';
        
        var labelEl = document.createElement('div');
        labelEl.style.cssText = 'font-size:11px;text-transform:uppercase;letter-spacing:0.05em;color:#96e072;margin-bottom:3px;';
        labelEl.textContent = label;
        
        var valueEl = document.createElement('div');
        valueEl.className = 'wf-detail-value';
        valueEl.style.cssText = 'font-size:13px;color:#fff;word-break:break-all;';
        valueEl.textContent = value;
        
        item.appendChild(labelEl);
        item.appendChild(valueEl);
        return item;
    }

    function formatFontFamily(family) {
        return family.split(',').map(function(f) {
            var name = f.trim();
            var isQuoted = name.startsWith('"') || name.startsWith("'");
            var cleanName = name.replace(/['"]/g, '');
            if (isQuoted) {
                return '<span style="color:#e8fccf;">"' + escapeHtml(cleanName) + '"</span>';
            } else {
                return '<span style="color:#96e072;">' + escapeHtml(cleanName) + '</span>';
            }
        }).join('<span style="color:#3e8914;">, </span>');
    }

    function closeAllWhatFontPopovers() {
        whatFontPopovers.forEach(function(p) {
            if (p && p.parentNode) p.remove();
        });
        whatFontPopovers = [];
    }

    function escapeHtml(text) {
        if (!text) return '';
        var div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function showViewportInfo() {
        hideViewportInfo();

        viewportOverlay = document.createElement('div');
        viewportOverlay.id = 'canopy-viewport-overlay';
        viewportOverlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;' +
            'z-index:2147483646;background:rgba(19, 70, 17, 0.95);' +
            'display:flex;flex-direction:column;align-items:center;justify-content:center;' +
            'backdrop-filter:blur(10px);' +
            'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;';

        // Close button
        var closeBtn = document.createElement('button');
        closeBtn.innerHTML = getPhosphorIcon('x');
        closeBtn.style.cssText = 'position:absolute;top:20px;right:20px;width:40px;height:40px;' +
            'background:rgba(62,137,20,0.3);border:1px solid #3e8914;border-radius:10px;' +
            'color:#96e072;cursor:pointer;display:flex;align-items:center;justify-content:center;' +
            'transition:all 0.2s;';
        closeBtn.addEventListener('mouseenter', function() {
            this.style.background = '#3e8914';
            this.style.color = '#fff';
        });
        closeBtn.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(62,137,20,0.3)';
            this.style.color = '#96e072';
        });
        closeBtn.addEventListener('click', toggleViewportInfo);
        viewportOverlay.appendChild(closeBtn);

        // Content container
        var content = document.createElement('div');
        content.id = 'canopy-viewport-content';
        content.style.cssText = 'text-align:center;max-width:600px;padding:40px;';

        // Title
        var title = document.createElement('h2');
        title.style.cssText = 'font-size:24px;font-weight:700;color:#96e072;margin:0 0 30px 0;' +
            'letter-spacing:-0.5px;';
        title.textContent = 'Your viewport size is:';
        content.appendChild(title);

        // Viewport size display
        var sizeDisplay = document.createElement('div');
        sizeDisplay.id = 'canopy-viewport-size';
        sizeDisplay.style.cssText = 'font-size:64px;font-weight:800;color:#fff;margin:0 0 30px 0;' +
            'font-family:monospace;letter-spacing:-2px;line-height:1;';
        content.appendChild(sizeDisplay);

        // Divider
        var divider = document.createElement('div');
        divider.style.cssText = 'width:100%;height:2px;background:rgba(150,224,114,0.3);margin:0 0 30px 0;';
        content.appendChild(divider);

        // Info grid
        var infoGrid = document.createElement('div');
        infoGrid.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:20px;text-align:left;';

        // DPR
        var dprItem = createInfoItem('Device Pixel Ratio', 'canopy-viewport-dpr');
        infoGrid.appendChild(dprItem);

        // Screen Size
        var screenItem = createInfoItem('Screen Size', 'canopy-viewport-screen');
        infoGrid.appendChild(screenItem);

        // Window Size
        var windowItem = createInfoItem('Window Size', 'canopy-viewport-window');
        infoGrid.appendChild(windowItem);

        // Document Size
        var docItem = createInfoItem('Document Size', 'canopy-viewport-doc');
        infoGrid.appendChild(docItem);

        // Orientation
        var orientItem = createInfoItem('Orientation', 'canopy-viewport-orient');
        infoGrid.appendChild(orientItem);

        // Color Depth
        var colorItem = createInfoItem('Color Depth', 'canopy-viewport-color');
        infoGrid.appendChild(colorItem);

        content.appendChild(infoGrid);

        // Breakpoint info
        var breakpointInfo = document.createElement('div');
        breakpointInfo.id = 'canopy-viewport-breakpoint';
        breakpointInfo.style.cssText = 'margin-top:30px;padding:15px 25px;' +
            'background:rgba(62,137,20,0.2);border:1px solid #3e8914;border-radius:10px;' +
            'font-size:14px;color:#96e072;font-weight:600;';
        content.appendChild(breakpointInfo);

        viewportOverlay.appendChild(content);
        document.body.appendChild(viewportOverlay);

        // Initial update
        updateViewportInfo();

        // Start updating
        viewportUpdateInterval = setInterval(updateViewportInfo, 100);

        // Also update on resize
        window.addEventListener('resize', updateViewportInfo);
    }

    function createInfoItem(label, id) {
        var item = document.createElement('div');
        item.style.cssText = 'padding:15px;background:rgba(62,137,20,0.15);border:1px solid rgba(62,137,20,0.3);' +
            'border-radius:8px;';

        var labelEl = document.createElement('div');
        labelEl.style.cssText = 'font-size:11px;text-transform:uppercase;letter-spacing:0.5px;' +
            'color:rgba(150,224,114,0.7);margin-bottom:6px;';
        labelEl.textContent = label;
        item.appendChild(labelEl);

        var valueEl = document.createElement('div');
        valueEl.id = id;
        valueEl.style.cssText = 'font-size:18px;font-weight:700;color:#fff;font-family:monospace;';
        item.appendChild(valueEl);

        return item;
    }

    function updateViewportInfo() {
        if (!viewportOverlay) return;

        var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        var vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

        var sizeDisplay = document.getElementById('canopy-viewport-size');
        if (sizeDisplay) {
            sizeDisplay.innerHTML = vw + '<span style="font-size:32px;color:#96e072;">px</span> × ' +
                vh + '<span style="font-size:32px;color:#96e072;">px</span>';
        }

        var dprEl = document.getElementById('canopy-viewport-dpr');
        if (dprEl) dprEl.textContent = (window.devicePixelRatio || 1).toFixed(2);

        var screenEl = document.getElementById('canopy-viewport-screen');
        if (screenEl) {
            screenEl.textContent = (window.screen.width || 0) + 'px × ' + (window.screen.height || 0) + 'px';
        }

        var windowEl = document.getElementById('canopy-viewport-window');
        if (windowEl) {
            windowEl.textContent = (window.outerWidth || 0) + 'px × ' + (window.outerHeight || 0) + 'px';
        }

        var docEl = document.getElementById('canopy-viewport-doc');
        if (docEl) {
            docEl.textContent = (document.documentElement.scrollWidth || 0) + 'px × ' +
                (document.documentElement.scrollHeight || 0) + 'px';
        }

        var orientEl = document.getElementById('canopy-viewport-orient');
        if (orientEl) {
            var orientation = screen.orientation ? screen.orientation.type : (vw > vh ? 'landscape' : 'portrait');
            orientEl.textContent = orientation;
        }

        var colorEl = document.getElementById('canopy-viewport-color');
        if (colorEl) {
            colorEl.textContent = (window.screen.colorDepth || 24) + '-bit';
        }

        var breakpointEl = document.getElementById('canopy-viewport-breakpoint');
        if (breakpointEl) {
            var bp = detectCurrentBreakpoint(vw);
            breakpointEl.textContent = 'Current breakpoint: ' + bp.name + ' (≥' + bp.min + 'px)';
        }
    }

    function detectCurrentBreakpoint(width) {
        var breakpoints = [
            { name: 'xs', min: 0 },
            { name: 'sm', min: 640 },
            { name: 'md', min: 768 },
            { name: 'lg', min: 1024 },
            { name: 'xl', min: 1280 },
            { name: '2xl', min: 1536 }
        ];

        var current = breakpoints[0];
        for (var i = 0; i < breakpoints.length; i++) {
            if (width >= breakpoints[i].min) {
                current = breakpoints[i];
            }
        }
        return current;
    }

    function hideViewportInfo() {
        if (viewportOverlay) {
            viewportOverlay.remove();
            viewportOverlay = null;
        }
        if (viewportUpdateInterval) {
            clearInterval(viewportUpdateInterval);
            viewportUpdateInterval = null;
        }
        window.removeEventListener('resize', updateViewportInfo);
    }

    // ===== PAGE RULERS =====
    function togglePageRulers() {
        if (isPageRulersMode) {
            // Already active, deactivate
            isPageRulersMode = false;
            hidePageRulers();
        } else {
            // Activate page rulers
            isPageRulersMode = true;
            showDock();
            showPageRulers();
            showToast('Page rulers enabled');
        }
        updateDockButtons();
    }

    function showPageRulers() {
        var rulerSize = 20;
        var tickColor = '#3e8914';
        var textColor = '#96e072';
        var bgColor = '#134611';

        // Create horizontal ruler
        if (!pageRulersH) {
            pageRulersH = document.createElement('div');
            pageRulersH.id = 'canopy-page-ruler-h';
            pageRulersH.style.cssText = 'position:fixed;top:0;left:' + rulerSize + 'px;right:0;height:' + rulerSize + 'px;' +
                'background:' + bgColor + ';border-bottom:1px solid ' + tickColor + ';' +
                'z-index:2147483643;pointer-events:none;overflow:hidden;';
            
            // Add ticks
            var hContent = '';
            var maxW = Math.max(window.innerWidth, document.documentElement.scrollWidth);
            for (var i = 0; i < maxW; i += 10) {
                var isMajor = i % 100 === 0;
                var isMedium = i % 50 === 0;
                var height = isMajor ? rulerSize : (isMedium ? 12 : 6);
                hContent += '<div style="position:absolute;left:' + i + 'px;bottom:0;width:1px;height:' + height + 'px;background:' + tickColor + ';"></div>';
                if (isMajor) {
                    hContent += '<div style="position:absolute;left:' + (i + 3) + 'px;top:2px;font-size:9px;color:' + textColor + ';font-family:monospace;">' + i + '</div>';
                }
            }
            pageRulersH.innerHTML = hContent;
            document.body.appendChild(pageRulersH);
        }

        // Create vertical ruler
        if (!pageRulersV) {
            pageRulersV = document.createElement('div');
            pageRulersV.id = 'canopy-page-ruler-v';
            pageRulersV.style.cssText = 'position:fixed;top:' + rulerSize + 'px;left:0;bottom:0;width:' + rulerSize + 'px;' +
                'background:' + bgColor + ';border-right:1px solid ' + tickColor + ';' +
                'z-index:2147483643;pointer-events:none;overflow:hidden;';
            
            // Add ticks
            var vContent = '';
            var maxH = Math.max(window.innerHeight, document.documentElement.scrollHeight);
            for (var j = 0; j < maxH; j += 10) {
                var isMajorV = j % 100 === 0;
                var isMediumV = j % 50 === 0;
                var width = isMajorV ? rulerSize : (isMediumV ? 12 : 6);
                vContent += '<div style="position:absolute;top:' + j + 'px;right:0;width:' + width + 'px;height:1px;background:' + tickColor + ';"></div>';
                if (isMajorV) {
                    vContent += '<div style="position:absolute;top:' + (j + 3) + 'px;left:2px;font-size:9px;color:' + textColor + ';font-family:monospace;writing-mode:vertical-rl;">' + j + '</div>';
                }
            }
            pageRulersV.innerHTML = vContent;
            document.body.appendChild(pageRulersV);
        }

        pageRulersH.style.display = 'block';
        pageRulersV.style.display = 'block';
    }

    function hidePageRulers() {
        if (pageRulersH) pageRulersH.style.display = 'none';
        if (pageRulersV) pageRulersV.style.display = 'none';
    }

    function removePageRulers() {
        if (pageRulersH) {
            pageRulersH.remove();
            pageRulersH = null;
        }
        if (pageRulersV) {
            pageRulersV.remove();
            pageRulersV = null;
        }
    }

    // ===== CLEAR ALL =====
    function clearAll() {
        // Deactivate all tools
        deactivateAllTools();
        
        // Also deactivate secondary tools
        xrayMode = false;
        isGridMode = false;
        isPageRulersMode = false;
        isBreakpointsMode = false;
        isResponsiveMode = false;
        isFindMode = false;
        
        // Clean up all UI elements
        hideGrid();
        hidePageRulers();
        hideBreakpoints();
        hideResponsive();
        hideFindOverlay();
        clearXRayOutlines();
        clearRulers();
        if (drawOverlay) { drawOverlay.remove(); drawOverlay = null; }
        if (drawToolbar) { drawToolbar.remove(); drawToolbar = null; }
        drawCurrent = null;
        drawShapes = [];
        if (distanceLine) { distanceLine.remove(); distanceLine = null; }
        if (distanceLabel) { distanceLabel.remove(); distanceLabel = null; }
        clearDistanceLines();
        
        updateDockButtons();
    }

    // ===== CLOSE EXTENSION =====
    function closeExtension() {
        // First clear all tools and UI
        clearAll();
        
        // Close the panel
        panelOpen = false;
        safeSendMessage({ action: 'closeSidePanel' });
        
        // Hide the dock
        hideDock();
        
        // Remove all canopy elements from the page
        if (overlay) {
            overlay.remove();
            overlay = null;
        }
        if (floatPanel) {
            floatPanel.remove();
            floatPanel = null;
        }
        if (gridOverlay) {
            gridOverlay.remove();
            gridOverlay = null;
        }
        if (breakpointsOverlay) {
            breakpointsOverlay.remove();
            breakpointsOverlay = null;
        }
        if (responsiveOverlay) {
            responsiveOverlay.remove();
            responsiveOverlay = null;
            responsiveIframe = null;
        }
        if (findOverlay) {
            findOverlay.remove();
            findOverlay = null;
        }
        findHighlights.forEach(function(hl) { hl.remove(); });
        findHighlights = [];
        
        // Clean up WhatFont
        deactivateWhatFont();
        
        // Reset all state
        isInspecting = false;
        isRulerMode = false;
        isDistanceMode = false;
        isEyedropperMode = false;
        isGridMode = false;
        isPageRulersMode = false;
        isBreakpointsMode = false;
        isResponsiveMode = false;
        isFindMode = false;
        isWhatFontMode = false;
        xrayMode = false;
        panelOpen = false;
        selectedEl = null;
        hoveredEl = null;
        distanceStartEl = null;
        rulerStart = null;
        
        // Remove event listeners
        document.removeEventListener('mouseover', onHover, true);
        document.removeEventListener('mouseout', onHoverOut, true);
        document.removeEventListener('click', onClick, true);
        document.removeEventListener('keydown', onKeyDown, true);
        
        // Reset cursor
        document.body.style.cursor = '';
        
        showToast('Canopy Ruler closed');
    }

    // ===== DOCK BUTTON STATES =====
    function updateDockButtons() {
        if (!dock) return;
        
        var buttons = {
            'dock-panel': panelOpen,
            'dock-inspect': isInspecting,
            'dock-find': isFindMode,
            'dock-ruler': isRulerMode,
            'dock-distance': isDistanceMode,
            'dock-eyedropper': isEyedropperMode,
            'dock-page-rulers': isPageRulersMode,
            'dock-xray': xrayMode,
            'dock-grid': isGridMode,
            'dock-breakpoints': isBreakpointsMode,
            'dock-responsive': isResponsiveMode,
            'dock-viewport': isViewportMode,
            'dock-whatfont': isWhatFontMode,
            'dock-draw': isDrawMode
        };

        var tooltipKeys = {
            'dock-panel': 'dock.panel',
            'dock-inspect': 'dock.inspect',
            'dock-find': 'dock.find',
            'dock-xray': 'dock.xray',
            'dock-ruler': 'dock.ruler',
            'dock-distance': 'dock.distance',
            'dock-page-rulers': 'dock.pagerulers',
            'dock-grid': 'dock.grid',
            'dock-eyedropper': 'dock.eyedropper',
            'dock-screenshot': 'dock.screenshot',
            'dock-viewport': 'dock.viewport',
            'dock-whatfont': 'dock.whatfont',
            'dock-draw': 'dock.draw',
            'dock-breakpoints': 'dock.breakpoints',
            'dock-responsive': 'dock.responsive',
            'dock-lang': 'dock.lang',
            'dock-close': 'dock.close'
        };
        
        for (var id in buttons) {
            var btn = document.getElementById(id);
            if (btn) {
                if (buttons[id]) {
                    btn.style.background = '#3e8914';
                    btn.style.color = '#fff';
                    btn.classList.add('active');
                } else {
                    btn.style.background = 'transparent';
                    btn.style.color = '#96e072';
                    btn.classList.remove('active');
                }
            }
        }

        // Refresh tooltips for all dock buttons including toggle and close
        for (var tid in tooltipKeys) {
            var tbtn = document.getElementById(tid);
            if (tbtn) tbtn.title = t(tooltipKeys[tid]);
        }

        // Refresh flag icon
        var langBtn = document.getElementById('dock-lang');
        if (langBtn) langBtn.innerHTML = getFlagIcon();
    }

    // ===== OVERLAY & FLOAT PANEL =====
    function createOverlay() {
        if (overlay) return;
        overlay = document.createElement('div');
        overlay.id = 'canopy-overlay';
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:2147483640;margin:0;padding:0;border:none;background:transparent;';
        document.body.appendChild(overlay);
    }

    function createFloatPanel() {
        if (floatPanel) return;
        floatPanel = document.createElement('div');
        floatPanel.id = 'canopy-float';
        floatPanel.style.cssText = 'position:fixed;z-index:2147483648;background:#134611;color:white;padding:12px;border-radius:8px;font-family:-apple-system,BlinkMacSystemFont,sans-serif;font-size:12px;box-shadow:0 4px 20px rgba(0,0,0,0.3);pointer-events:none;display:none;min-width:200px;max-width:280px;';
        document.body.appendChild(floatPanel);
    }

    // ===== EVENT HANDLERS =====
    function onMouseDown(e) {
        if (isDrawMode) {
            onDrawMouseDown(e);
            return;
        }
    }

    function onMouseUp(e) {
        if (isDrawMode) {
            onDrawMouseUp(e);
            return;
        }
    }

    function onMouseMove(e) {
        // Draw mode takes priority
        if (isDrawMode) {
            onDrawMouseMove(e);
            return;
        }
        if (isRulerMode && rulerStart && e.buttons === 1) {
            if (tempRuler) tempRuler.remove();
            tempRuler = createRuler(rulerStart.x, rulerStart.y, e.clientX, e.clientY);
            tempRuler.style.pointerEvents = 'none';
        }
        
        // Update float panel position to follow cursor during inspection
        if (isInspecting && hoveredEl && floatPanel && floatPanel.style.display === 'block') {
            updateFloatPanelPosition(e.clientX, e.clientY);
        }
        
        // WhatFont tooltip follows cursor
        if (isWhatFontMode && !isExtensionElement(e.target) && !isWhatFontPopoverElement(e.target)) {
            var target = e.target;
            // Find closest text element
            while (target && target !== document.body && !target.textContent.trim()) {
                target = target.parentElement;
            }
            if (target && target !== document.body) {
                showWhatFontTooltip(target, e.clientX, e.clientY);
            } else {
                hideWhatFontTooltip();
            }
        }
    }
    
    function updateFloatPanelPosition(x, y) {
        if (!floatPanel) return;
        
        var pw = 280;
        var ph = 350;
        var offset = 20;
        
        var px = x + offset;
        var py = y + offset;
        
        if (px + pw > window.innerWidth - 10) {
            px = x - pw - offset;
        }
        
        if (py + ph > window.innerHeight - 10) {
            py = y - ph - offset;
        }
        
        if (px < 10) px = 10;
        if (py < 10) py = 10;
        
        if (px + pw > window.innerWidth - 10) {
            px = window.innerWidth - pw - 10;
        }
        
        floatPanel.style.left = px + 'px';
        floatPanel.style.top = py + 'px';
    }

    function onHover(e) {
        if (!isInspecting) return;
        if (isExtensionElement(e.target)) return;

        hoveredEl = e.target;
        showHighlight(hoveredEl, 'hover');
        showFloatPanel(hoveredEl, e.clientX, e.clientY);
        
        // Show distance lines if there's a selected element
        if (selectedEl && selectedEl !== hoveredEl) {
            showDistanceLines(selectedEl, hoveredEl);
        }
    }

    function onHoverOut(e) {
        if (!isInspecting || !hoveredEl) return;
        if (isExtensionElement(e.target)) return;

        if (hoveredEl !== selectedEl) {
            removeHighlight(hoveredEl);
        }
        if (!selectedEl) {
            hideFloatPanel();
        }
        
        // Clear distance lines
        var existingLines = overlay.querySelectorAll('.canopy-distance-line, .canopy-distance-label, .canopy-distance-extension');
        existingLines.forEach(function(line) { line.remove(); });
        
        hoveredEl = null;
    }

    function onClick(e) {
        if (isExtensionElement(e.target)) return;

        // Eyedropper mode
        if (isEyedropperMode) {
            pickColor(e);
            return;
        }

        // Ruler mode
        if (isRulerMode) {
            e.preventDefault();
            e.stopPropagation();
            
            if (!rulerStart) {
                rulerStart = { x: e.clientX, y: e.clientY };
            } else {
                if (tempRuler) tempRuler.remove();
                createRuler(rulerStart.x, rulerStart.y, e.clientX, e.clientY);
                rulerStart = null;
                tempRuler = null;
            }
            return;
        }

        // Distance mode
        if (isDistanceMode) {
            e.preventDefault();
            e.stopPropagation();
            
            if (!distanceStartEl) {
                distanceStartEl = e.target;
                showHighlight(e.target, 'selected');
                showToast('Now click second element');
            } else {
                if (distanceStartEl !== e.target) {
                    measureDistance(distanceStartEl, e.target);
                }
                distanceStartEl = null;
            }
            return;
        }

        // WhatFont mode
        if (isWhatFontMode) {
            // Don't process clicks inside WhatFont popovers
            if (isWhatFontPopoverElement(e.target)) return;
            
            e.preventDefault();
            e.stopPropagation();
            
            var target = e.target;
            // Find closest text element
            while (target && target !== document.body && !target.textContent.trim()) {
                target = target.parentElement;
            }
            if (target && target !== document.body) {
                createWhatFontPopover(target, e.clientX, e.clientY);
            }
            return;
        }

        // Inspect mode
        if (!isInspecting) return;

        e.preventDefault();
        e.stopPropagation();

        if (selectedEl === e.target) {
            selectedEl = null;
            clearOverlay();
            clearDistanceLines();
            hideFloatPanel();
            sendToPanel(null);
            return;
        }

        selectElement(e.target);
    }

    function selectElement(el) {
        selectedEl = el;
        clearOverlay();
        showHighlight(el, 'selected');
        var rect = el.getBoundingClientRect();
        showFloatPanel(el, rect.left + rect.width / 2, rect.top);
        sendToPanel(el);
    }

    function onKeyDown(e) {
        if (e.key === 'Escape') {
            if (isRulerMode && rulerStart) {
                rulerStart = null;
                if (tempRuler) tempRuler.remove();
                tempRuler = null;
            } else if (isDistanceMode && distanceStartEl) {
                distanceStartEl = null;
                clearOverlay();
            } else {
                clearAll();
            }
        }
    }

    // ===== HIGHLIGHT FUNCTIONS =====
    function showHighlight(el, type) {
        if (!el || el === document.documentElement || !overlay) return;
        removeHighlight(el);

        var rect = el.getBoundingClientRect();
        var hl = document.createElement('div');
        hl.className = 'ruler-hl ' + type;
        hl.dataset.id = getElId(el);

        var color = type === 'selected' ? '#ff3333' : '#3e8914';
        var border = type === 'hover' ? '2px dashed ' + color : '3px solid ' + color;
        var bg = type === 'selected' ? 'rgba(255,51,51,0.15)' : 'rgba(62,137,20,0.15)';

        hl.style.cssText = 'position:absolute;left:' + rect.left + 'px;top:' + rect.top + 'px;width:' + rect.width + 'px;height:' + rect.height + 'px;border:' + border + ';background:' + bg + ';pointer-events:none;box-sizing:border-box;';

        overlay.appendChild(hl);

        if (type === 'selected') {
            showElementInfo(el, rect);
            showSelectedDashedLines(rect);
        }
    }

    // ===== SELECTED ELEMENT DASHED LINES =====
    function showSelectedDashedLines(rect) {
        // Remove existing dashed lines
        var existingDashed = overlay.querySelectorAll('.canopy-selected-dashed');
        existingDashed.forEach(function(line) { line.remove(); });
        
        // Create dashed lines extending from the selected element edges
        var dashedStyle = 'border-top:1px dashed rgba(255,255,255,0.4);pointer-events:none;z-index:2147483645;';
        
        // Top dashed line - extends full width of viewport
        var topLine = document.createElement('div');
        topLine.className = 'canopy-selected-dashed';
        topLine.style.cssText = 'position:fixed;left:0;top:' + rect.top + 'px;width:100%;height:0;' + dashedStyle;
        overlay.appendChild(topLine);
        
        // Bottom dashed line - extends full width of viewport
        var bottomLine = document.createElement('div');
        bottomLine.className = 'canopy-selected-dashed';
        bottomLine.style.cssText = 'position:fixed;left:0;top:' + rect.bottom + 'px;width:100%;height:0;' + dashedStyle;
        overlay.appendChild(bottomLine);
        
        // Left dashed line - extends full height of viewport
        var leftLine = document.createElement('div');
        leftLine.className = 'canopy-selected-dashed';
        leftLine.style.cssText = 'position:fixed;left:' + rect.left + 'px;top:0;width:0;height:100%;border-left:1px dashed rgba(255,255,255,0.4);pointer-events:none;z-index:2147483645;';
        overlay.appendChild(leftLine);
        
        // Right dashed line - extends full height of viewport
        var rightLine = document.createElement('div');
        rightLine.className = 'canopy-selected-dashed';
        rightLine.style.cssText = 'position:fixed;left:' + rect.right + 'px;top:0;width:0;height:100%;border-left:1px dashed rgba(255,255,255,0.4);pointer-events:none;z-index:2147483645;';
        overlay.appendChild(rightLine);
    }

    function showElementInfo(el, rect) {
        var tag = document.createElement('div');
        tag.style.cssText = 'position:absolute;left:' + rect.left + 'px;top:' + (rect.top - 24) + 'px;background:#3e8914;color:white;padding:2px 8px;font-size:10px;font-weight:700;border-radius:3px 3px 0 0;pointer-events:none;z-index:2147483647;';
        tag.textContent = el.tagName.toLowerCase();
        overlay.appendChild(tag);

        var dim = document.createElement('div');
        dim.style.cssText = 'position:absolute;left:' + (rect.left + rect.width / 2) + 'px;top:' + (rect.top - 24) + 'px;background:#134611;color:white;padding:2px 6px;font-size:11px;font-weight:600;border-radius:3px;transform:translateX(-50%);pointer-events:none;z-index:2147483647;';
        dim.textContent = Math.round(rect.width) + ' x ' + Math.round(rect.height);
        overlay.appendChild(dim);
    }

    function removeHighlight(el) {
        if (!overlay || !el) return;
        var id = getElId(el);
        var hl = overlay.querySelector('[data-id="' + id + '"]');
        if (hl) hl.remove();
    }

    function clearOverlay() {
        if (overlay) {
            var keep = overlay.querySelectorAll('.canopy-ruler, .canopy-xray-outline');
            var keepMap = new Map();
            keep.forEach(function(el) { keepMap.set(el, true); });
            
            var children = Array.from(overlay.children);
            children.forEach(function(child) {
                if (!keepMap.has(child)) {
                    child.remove();
                }
            });
        }
    }
    
    function clearDistanceLines() {
        if (overlay) {
            var lines = overlay.querySelectorAll('.canopy-distance-line, .canopy-distance-label, .canopy-distance-extension');
            lines.forEach(function(line) { line.remove(); });
        }
    }

    function getElId(el) {
        if (!el.dataset.rulerId) {
            el.dataset.rulerId = 'r-' + Math.random().toString(36).substr(2, 9);
        }
        return el.dataset.rulerId;
    }

    // ===== DISTANCE LINES =====
    function showDistanceLines(selectedEl, hoveredEl) {
        // Remove existing distance lines
        var existingLines = overlay.querySelectorAll('.canopy-distance-line, .canopy-distance-label, .canopy-distance-extension');
        existingLines.forEach(function(line) { line.remove(); });
        
        if (!selectedEl || !hoveredEl || selectedEl === hoveredEl) return;
        
        var rect1 = selectedEl.getBoundingClientRect();
        var rect2 = hoveredEl.getBoundingClientRect();
        
        // Calculate distances between outer edges
        var distances = [];
        
        // Vertical distances
        if (rect2.bottom <= rect1.top) {
            // hovered is above selected
            distances.push({
                type: 'vertical',
                value: rect1.top - rect2.bottom,
                x: Math.max(rect1.left, rect2.left) + Math.min(rect1.width, rect2.width) / 2,
                y1: rect2.bottom,
                y2: rect1.top,
                labelY: rect2.bottom + (rect1.top - rect2.bottom) / 2
            });
        } else if (rect1.bottom <= rect2.top) {
            // hovered is below selected
            distances.push({
                type: 'vertical',
                value: rect2.top - rect1.bottom,
                x: Math.max(rect1.left, rect2.left) + Math.min(rect1.width, rect2.width) / 2,
                y1: rect1.bottom,
                y2: rect2.top,
                labelY: rect1.bottom + (rect2.top - rect1.bottom) / 2
            });
        }
        
        // Horizontal distances
        if (rect2.right <= rect1.left) {
            // hovered is to the left of selected
            distances.push({
                type: 'horizontal',
                value: rect1.left - rect2.right,
                y: Math.max(rect1.top, rect2.top) + Math.min(rect1.height, rect2.height) / 2,
                x1: rect2.right,
                x2: rect1.left,
                labelX: rect2.right + (rect1.left - rect2.right) / 2
            });
        } else if (rect1.right <= rect2.left) {
            // hovered is to the right of selected
            distances.push({
                type: 'horizontal',
                value: rect2.left - rect1.right,
                y: Math.max(rect1.top, rect2.top) + Math.min(rect1.height, rect2.height) / 2,
                x1: rect1.right,
                x2: rect2.left,
                labelX: rect1.right + (rect2.left - rect1.right) / 2
            });
        }
        
        // Also show distance if they overlap in one axis but not the other
        // Overlap in X, show vertical distance
        if (rect1.left < rect2.right && rect2.left < rect1.right) {
            if (rect2.bottom <= rect1.top) {
                distances.push({
                    type: 'vertical',
                    value: rect1.top - rect2.bottom,
                    x: (Math.max(rect1.left, rect2.left) + Math.min(rect1.right, rect2.right)) / 2,
                    y1: rect2.bottom,
                    y2: rect1.top,
                    labelY: rect2.bottom + (rect1.top - rect2.bottom) / 2
                });
            } else if (rect1.bottom <= rect2.top) {
                distances.push({
                    type: 'vertical',
                    value: rect2.top - rect1.bottom,
                    x: (Math.max(rect1.left, rect2.left) + Math.min(rect1.right, rect2.right)) / 2,
                    y1: rect1.bottom,
                    y2: rect2.top,
                    labelY: rect1.bottom + (rect2.top - rect1.bottom) / 2
                });
            }
        }
        
        // Overlap in Y, show horizontal distance
        if (rect1.top < rect2.bottom && rect2.top < rect1.bottom) {
            if (rect2.right <= rect1.left) {
                distances.push({
                    type: 'horizontal',
                    value: rect1.left - rect2.right,
                    y: (Math.max(rect1.top, rect2.top) + Math.min(rect1.bottom, rect2.bottom)) / 2,
                    x1: rect2.right,
                    x2: rect1.left,
                    labelX: rect2.right + (rect1.left - rect2.right) / 2
                });
            } else if (rect1.right <= rect2.left) {
                distances.push({
                    type: 'horizontal',
                    value: rect2.left - rect1.right,
                    y: (Math.max(rect1.top, rect2.top) + Math.min(rect1.bottom, rect2.bottom)) / 2,
                    x1: rect1.right,
                    x2: rect2.left,
                    labelX: rect1.right + (rect2.left - rect1.right) / 2
                });
            }
        }
        
        distances.forEach(function(dist) {
            if (dist.type === 'vertical') {
                // Draw vertical line
                var line = document.createElement('div');
                line.className = 'canopy-distance-line';
                line.style.cssText = 'position:fixed;z-index:2147483646;pointer-events:none;' +
                    'left:' + dist.x + 'px;top:' + dist.y1 + 'px;' +
                    'width:1px;height:' + (dist.y2 - dist.y1) + 'px;' +
                    'background:#2196F3;';
                overlay.appendChild(line);
                
                // Draw extension lines at top and bottom
                var ext1 = document.createElement('div');
                ext1.className = 'canopy-distance-extension';
                ext1.style.cssText = 'position:fixed;z-index:2147483646;pointer-events:none;' +
                    'left:' + (dist.x - 4) + 'px;top:' + dist.y1 + 'px;' +
                    'width:9px;height:1px;background:#2196F3;';
                overlay.appendChild(ext1);
                
                var ext2 = document.createElement('div');
                ext2.className = 'canopy-distance-extension';
                ext2.style.cssText = 'position:fixed;z-index:2147483646;pointer-events:none;' +
                    'left:' + (dist.x - 4) + 'px;top:' + dist.y2 + 'px;' +
                    'width:9px;height:1px;background:#2196F3;';
                overlay.appendChild(ext2);
                
                // Draw label
                var label = document.createElement('div');
                label.className = 'canopy-distance-label';
                label.style.cssText = 'position:fixed;z-index:2147483647;pointer-events:none;' +
                    'left:' + (dist.x + 8) + 'px;top:' + dist.labelY + 'px;' +
                    'transform:translateY(-50%);' +
                    'background:#2196F3;color:white;padding:2px 6px;font-size:11px;font-weight:600;' +
                    'border-radius:3px;white-space:nowrap;';
                label.textContent = Math.round(dist.value) + 'px';
                overlay.appendChild(label);
            } else {
                // Draw horizontal line
                var line = document.createElement('div');
                line.className = 'canopy-distance-line';
                line.style.cssText = 'position:fixed;z-index:2147483646;pointer-events:none;' +
                    'left:' + dist.x1 + 'px;top:' + dist.y + 'px;' +
                    'width:' + (dist.x2 - dist.x1) + 'px;height:1px;' +
                    'background:#2196F3;';
                overlay.appendChild(line);
                
                // Draw extension lines at left and right
                var ext1 = document.createElement('div');
                ext1.className = 'canopy-distance-extension';
                ext1.style.cssText = 'position:fixed;z-index:2147483646;pointer-events:none;' +
                    'left:' + dist.x1 + 'px;top:' + (dist.y - 4) + 'px;' +
                    'width:1px;height:9px;background:#2196F3;';
                overlay.appendChild(ext1);
                
                var ext2 = document.createElement('div');
                ext2.className = 'canopy-distance-extension';
                ext2.style.cssText = 'position:fixed;z-index:2147483646;pointer-events:none;' +
                    'left:' + dist.x2 + 'px;top:' + (dist.y - 4) + 'px;' +
                    'width:1px;height:9px;background:#2196F3;';
                overlay.appendChild(ext2);
                
                // Draw label
                var label = document.createElement('div');
                label.className = 'canopy-distance-label';
                label.style.cssText = 'position:fixed;z-index:2147483647;pointer-events:none;' +
                    'left:' + dist.labelX + 'px;top:' + (dist.y + 8) + 'px;' +
                    'transform:translateX(-50%);' +
                    'background:#2196F3;color:white;padding:2px 6px;font-size:11px;font-weight:600;' +
                    'border-radius:3px;white-space:nowrap;';
                label.textContent = Math.round(dist.value) + 'px';
                overlay.appendChild(label);
            }
        });
    }

    // ===== FLOAT PANEL =====
    function showFloatPanel(el, x, y) {
        if (!el || !floatPanel) return;

        var computed = window.getComputedStyle(el);
        var rect = el.getBoundingClientRect();
        
        // Calculate contrast ratio
        var contrast = calculateContrast(computed.color, computed.backgroundColor);
        
        var html = '<div style="font-weight:700;font-size:14px;margin-bottom:8px;padding-bottom:8px;border-bottom:1px solid rgba(255,255,255,0.2);">';
        html += el.tagName.toLowerCase();
        if (el.id) html += ' #' + el.id;
        html += '</div>';

        // Modelo de Caja (Box Model)
        html += '<div style="margin-bottom:10px;">';
        html += '<div style="font-size:10px;text-transform:uppercase;letter-spacing:0.05em;color:rgba(255,255,255,0.6);margin-bottom:4px;">Modelo de Caja</div>';
        html += '<div style="display:flex;justify-content:space-between;margin:2px 0;font-size:12px;"><span style="color:rgba(255,255,255,0.85);">width</span><span style="color:#e8fccf;font-weight:600;font-family:monospace;">' + Math.round(rect.width) + 'px</span></div>';
        html += '<div style="display:flex;justify-content:space-between;margin:2px 0;font-size:12px;"><span style="color:rgba(255,255,255,0.85);">height</span><span style="color:#e8fccf;font-weight:600;font-family:monospace;">' + Math.round(rect.height) + 'px</span></div>';
        html += '<div style="display:flex;justify-content:space-between;margin:2px 0;font-size:12px;"><span style="color:rgba(255,255,255,0.85);">display</span><span style="color:#e8fccf;font-weight:600;font-family:monospace;">' + computed.display + '</span></div>';
        html += '<div style="display:flex;justify-content:space-between;margin:2px 0;font-size:12px;"><span style="color:rgba(255,255,255,0.85);">box-sizing</span><span style="color:#e8fccf;font-weight:600;font-family:monospace;">' + computed.boxSizing + '</span></div>';
        html += '</div>';

        // Apariencia (Appearance)
        html += '<div style="margin-bottom:10px;">';
        html += '<div style="font-size:10px;text-transform:uppercase;letter-spacing:0.05em;color:rgba(255,255,255,0.6);margin-bottom:4px;">Apariencia</div>';
        var colorHex = rgbToHex(computed.color);
        html += '<div style="display:flex;justify-content:space-between;margin:2px 0;font-size:12px;align-items:center;"><span style="color:rgba(255,255,255,0.85);">color</span><span style="display:flex;align-items:center;gap:4px;"><span style="display:inline-block;width:12px;height:12px;background:' + colorHex + ';border:1px solid rgba(255,255,255,0.5);border-radius:2px;"></span><span style="color:#e8fccf;font-weight:600;font-family:monospace;">' + colorHex + '</span></span></div>';
        html += '</div>';

        // Texto (Typography)
        html += '<div style="margin-bottom:10px;">';
        html += '<div style="font-size:10px;text-transform:uppercase;letter-spacing:0.05em;color:rgba(255,255,255,0.6);margin-bottom:4px;">Texto</div>';
        html += '<div style="display:flex;justify-content:space-between;margin:2px 0;font-size:12px;"><span style="color:rgba(255,255,255,0.85);">font-family</span><span style="color:#e8fccf;font-weight:600;font-family:monospace;">' + computed.fontFamily.split(',')[0].replace(/['"]/g, '') + '</span></div>';
        html += '<div style="display:flex;justify-content:space-between;margin:2px 0;font-size:12px;"><span style="color:rgba(255,255,255,0.85);">font-size</span><span style="color:#e8fccf;font-weight:600;font-family:monospace;">' + computed.fontSize + '</span></div>';
        html += '<div style="display:flex;justify-content:space-between;margin:2px 0;font-size:12px;"><span style="color:rgba(255,255,255,0.85);">font-weight</span><span style="color:#e8fccf;font-weight:600;font-family:monospace;">' + computed.fontWeight + '</span></div>';
        html += '<div style="display:flex;justify-content:space-between;margin:2px 0;font-size:12px;"><span style="color:rgba(255,255,255,0.85);">line-height</span><span style="color:#e8fccf;font-weight:600;font-family:monospace;">' + computed.lineHeight + '</span></div>';
        html += '<div style="display:flex;justify-content:space-between;margin:2px 0;font-size:12px;"><span style="color:rgba(255,255,255,0.85);">text-align</span><span style="color:#e8fccf;font-weight:600;font-family:monospace;">' + computed.textAlign + '</span></div>';
        html += '</div>';

        // Accesibilidad (Accessibility)
        if (contrast) {
            html += '<div style="margin-bottom:4px;">';
            html += '<div style="font-size:10px;text-transform:uppercase;letter-spacing:0.05em;color:rgba(255,255,255,0.6);margin-bottom:4px;">Accesibilidad</div>';
            var contrastClass = contrast.ratio >= 7 ? 'AAA' : (contrast.ratio >= 4.5 ? 'AA' : 'Fail');
            var contrastColor = contrast.ratio >= 4.5 ? '#4CAF50' : '#f44336';
            html += '<div style="display:flex;justify-content:space-between;margin:2px 0;font-size:12px;align-items:center;"><span style="color:rgba(255,255,255,0.85);">contrast</span><span style="display:flex;align-items:center;gap:4px;"><span style="color:rgba(255,255,255,0.6);font-size:10px;">Aa</span><span style="color:' + contrastColor + ';font-weight:600;font-family:monospace;">' + contrast.ratio.toFixed(2) + ' ' + contrastClass + '</span></span></div>';
            html += '</div>';
        }

        floatPanel.innerHTML = html;
        floatPanel.style.maxWidth = '280px';
        floatPanel.style.minWidth = '220px';

        // Calcular dimensiones del panel
        var pw = 280;
        var ph = 350; // Altura aproximada del panel
        var offset = 20; // Distancia desde el cursor
        
        // Por defecto: a la derecha y debajo del cursor
        var px = x + offset;
        var py = y + offset;
        
        // Si no cabe a la derecha, poner a la izquierda
        if (px + pw > window.innerWidth - 10) {
            px = x - pw - offset;
        }
        
        // Si no cabe abajo, poner arriba
        if (py + ph > window.innerHeight - 10) {
            py = y - ph - offset;
        }
        
        // Asegurar que no se salga por la izquierda
        if (px < 10) px = 10;
        
        // Asegurar que no se salga por arriba
        if (py < 10) py = 10;
        
        // Asegurar que no se salga por la derecha (si es muy estrecho)
        if (px + pw > window.innerWidth - 10) {
            px = window.innerWidth - pw - 10;
        }

        floatPanel.style.left = px + 'px';
        floatPanel.style.top = py + 'px';
        floatPanel.style.display = 'block';
    }
    
    // Calculate contrast ratio between two colors
    function calculateContrast(color1, color2) {
        try {
            var rgb1 = parseRGB(color1);
            var rgb2 = parseRGB(color2);
            
            if (!rgb1 || !rgb2) return null;
            
            var lum1 = getLuminance(rgb1);
            var lum2 = getLuminance(rgb2);
            
            var ratio = (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
            
            return { ratio: ratio };
        } catch (e) {
            return null;
        }
    }
    
    function parseRGB(color) {
        if (!color || color === 'transparent' || color === 'rgba(0, 0, 0, 0)') return null;
        
        // Parse rgb(r, g, b) or rgba(r, g, b, a)
        var match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (match) {
            return {
                r: parseInt(match[1]),
                g: parseInt(match[2]),
                b: parseInt(match[3])
            };
        }
        return null;
    }
    
    function getLuminance(rgb) {
        var rsRGB = rgb.r / 255;
        var gsRGB = rgb.g / 255;
        var bsRGB = rgb.b / 255;
        
        var r = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
        var g = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
        var b = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);
        
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    }

    function hideFloatPanel() {
        if (floatPanel) floatPanel.style.display = 'none';
    }

    // ===== PANEL COMMUNICATION =====
    function getElementImages(el) {
        var images = [];
        var seen = new Set();
        
        function addImage(src, type, alt) {
            if (!src || seen.has(src)) return;
            seen.add(src);
            images.push({
                src: src,
                type: type || 'img',
                alt: alt || ''
            });
        }

        function svgToDataUri(svgEl) {
            try {
                var svgData = new XMLSerializer().serializeToString(svgEl);
                if (svgData.length > 500000) return null; // Too large for data URI
                return 'data:image/svg+xml,' + encodeURIComponent(svgData);
            } catch (e) {
                return null;
            }
        }
        
        // Si el elemento es una imagen
        if (el.tagName === 'IMG') {
            addImage(el.src, 'img', el.alt);
        }
        
        // Si es un SVG
        if (el.tagName === 'SVG') {
            var dataUri = svgToDataUri(el);
            if (dataUri) addImage(dataUri, 'svg', 'SVG');
        }
        
        // Buscar imágenes dentro del elemento
        var imgs = el.querySelectorAll('img');
        imgs.forEach(function(img) {
            addImage(img.src, 'img', img.alt);
        });
        
        // Buscar SVGs dentro
        var svgs = el.querySelectorAll('svg');
        svgs.forEach(function(svg) {
            var dataUri = svgToDataUri(svg);
            if (dataUri) addImage(dataUri, 'svg', 'SVG');
        });
        
        // Buscar background-image
        var allElements = el.querySelectorAll('*');
        allElements.forEach(function(elem) {
            var style = window.getComputedStyle(elem);
            var bgImage = style.backgroundImage;
            if (bgImage && bgImage !== 'none') {
                var match = bgImage.match(/url\(["']?([^"')]+)["']?\)/);
                if (match) {
                    addImage(match[1], 'bg', 'Background');
                }
            }
        });
        
        // También verificar el propio elemento
        var elStyle = window.getComputedStyle(el);
        var elBgImage = elStyle.backgroundImage;
        if (elBgImage && elBgImage !== 'none') {
            var match = elBgImage.match(/url\(["']?([^"')]+)["']?\)/);
            if (match) {
                addImage(match[1], 'bg', 'Background');
            }
        }
        
        return images;
    }

    function sendToPanel(el) {
        var info = null;
        if (el) {
            var computed = window.getComputedStyle(el);
            var rect = el.getBoundingClientRect();
            var images = getElementImages(el);
            
            info = {
                tagName: el.tagName.toLowerCase(),
                id: el.id || null,
                classes: typeof el.className === 'string' ? el.className : '',
                selector: generateSelector(el),
                width: Math.round(rect.width),
                height: Math.round(rect.height),
                left: Math.round(rect.left),
                top: Math.round(rect.top),
                margin: {
                    top: parseFloat(computed.marginTop) || 0,
                    right: parseFloat(computed.marginRight) || 0,
                    bottom: parseFloat(computed.marginBottom) || 0,
                    left: parseFloat(computed.marginLeft) || 0
                },
                padding: {
                    top: parseFloat(computed.paddingTop) || 0,
                    right: parseFloat(computed.paddingRight) || 0,
                    bottom: parseFloat(computed.paddingBottom) || 0,
                    left: parseFloat(computed.paddingLeft) || 0
                },
                border: {
                    top: parseFloat(computed.borderTopWidth) || 0,
                    right: parseFloat(computed.borderRightWidth) || 0,
                    bottom: parseFloat(computed.borderBottomWidth) || 0,
                    left: parseFloat(computed.borderLeftWidth) || 0
                },
                styles: {
                    display: computed.display,
                    position: computed.position,
                    overflow: computed.overflow,
                    backgroundColor: computed.backgroundColor,
                    color: computed.color,
                    fontFamily: computed.fontFamily,
                    fontSize: computed.fontSize,
                    fontWeight: computed.fontWeight,
                    lineHeight: computed.lineHeight,
                    textAlign: computed.textAlign,
                    boxSizing: computed.boxSizing
                },
                colors: {
                    hex: rgbToHex(computed.backgroundColor),
                    textHex: rgbToHex(computed.color)
                },
                hasParent: !!(el.parentElement && el.parentElement !== document.body),
                hasChildren: el.children.length > 0,
                images: images,
                outerHTML: el.outerHTML
            };
        }
        safeSendMessage({ action: 'elementSelected', element: info });
    }

    // ===== PAGE INFO =====
    function getPageColors() {
        var colors = {};
        
        function addColor(hex) {
            if (hex && hex.length >= 4 && hex.length <= 9 && hex !== 'transparent' && hex !== 'inherit') {
                var normalized = normalizeHex(hex);
                if (normalized) colors[normalized] = true;
            }
        }

        // Extract from all elements (skip extension elements)
        var all = document.querySelectorAll('*');
        for (var i = 0; i < all.length; i++) {
            // Skip elements that belong to this extension
            if (all[i].id && all[i].id.indexOf('canopy-') === 0) continue;
            if (typeof all[i].className === 'string' && all[i].className.indexOf('canopy-') !== -1) continue;
            // Walk up to check if any ancestor is an extension element
            var parent = all[i].parentElement;
            var isExtChild = false;
            while (parent) {
                if ((parent.id && parent.id.indexOf('canopy-') === 0) ||
                    (typeof parent.className === 'string' && parent.className.indexOf('canopy-') !== -1)) {
                    isExtChild = true;
                    break;
                }
                parent = parent.parentElement;
            }
            if (isExtChild) continue;

            try {
                var cs = window.getComputedStyle(all[i]);
                addColor(rgbToHex(cs.color));
                addColor(rgbToHex(cs.backgroundColor));
                addColor(rgbToHex(cs.borderTopColor));
                addColor(rgbToHex(cs.borderRightColor));
                addColor(rgbToHex(cs.borderBottomColor));
                addColor(rgbToHex(cs.borderLeftColor));
                addColor(rgbToHex(cs.outlineColor));
                addColor(rgbToHex(cs.textDecorationColor));
            } catch (e) { continue; }
        }

        // Extract CSS custom properties from :root
        try {
            var rootStyles = window.getComputedStyle(document.documentElement);
            // Common color-related custom properties
            var customPropPatterns = [
                /--[\w-]*color[\w-]*/i,
                /--[\w-]*background[\w-]*/i,
                /--[\w-]*border[\w-]*/i,
                /--[\w-]*accent[\w-]*/i,
                /--[\w-]*brand[\w-]*/i,
                /--[\w-]*primary[\w-]*/i,
                /--[\w-]*secondary[\w-]*/i,
                /--[\w-]*success[\w-]*/i,
                /--[\w-]*warning[\w-]*/i,
                /--[\w-]*danger[\w-]*/i,
                /--[\w-]*error[\w-]*/i,
                /--[\w-]*info[\w-]*/i,
                /--[\w-]*muted[\w-]*/i
            ];
            for (var p = 0; p < rootStyles.length; p++) {
                var prop = rootStyles[p];
                var matches = false;
                for (var m = 0; m < customPropPatterns.length; m++) {
                    if (customPropPatterns[m].test(prop)) { matches = true; break; }
                }
                if (matches) {
                    addColor(rgbToHex(rootStyles.getPropertyValue(prop)));
                }
            }
        } catch (e) {}

        // Convert to array and sort by HSL for visual appeal
        var colorList = Object.keys(colors).map(function(hex) {
            var hsl = hexToHSL(hex);
            return { hex: hex, hsl: hsl };
        });

        // Sort: group by hue bands, then by lightness
        colorList.sort(function(a, b) {
            var hueA = Math.round(a.hsl.h / 30) * 30;
            var hueB = Math.round(b.hsl.h / 30) * 30;
            if (hueA !== hueB) return hueA - hueB;
            if (a.hsl.s !== b.hsl.s) return b.hsl.s - a.hsl.s;
            return a.hsl.l - b.hsl.l;
        });

        return colorList.map(function(c) { return c.hex; });
    }

    function normalizeHex(color) {
        if (!color) return null;
        color = color.trim();
        if (color === 'transparent' || color === 'inherit' || color === 'initial') return null;
        if (color.indexOf('rgba') === 0 && color.indexOf('rgba(0, 0, 0, 0)') !== -1) return null;
        if (color.indexOf('#') === 0) {
            if (color.length === 4) {
                return '#' + color[1] + color[1] + color[2] + color[2] + color[3] + color[3];
            }
            if (color.length === 5) {
                return '#' + color[1] + color[1] + color[2] + color[2] + color[3] + color[3] + color[4] + color[4];
            }
            return color.toUpperCase();
        }
        return color.toUpperCase();
    }

    function hexToHSL(hex) {
        var r = 0, g = 0, b = 0;
        hex = hex.replace('#', '');
        if (hex.length === 3) {
            r = parseInt(hex[0] + hex[0], 16);
            g = parseInt(hex[1] + hex[1], 16);
            b = parseInt(hex[2] + hex[2], 16);
        } else if (hex.length === 6) {
            r = parseInt(hex.substring(0, 2), 16);
            g = parseInt(hex.substring(2, 4), 16);
            b = parseInt(hex.substring(4, 6), 16);
        } else if (hex.length === 8) {
            r = parseInt(hex.substring(0, 2), 16);
            g = parseInt(hex.substring(2, 4), 16);
            b = parseInt(hex.substring(4, 6), 16);
        } else {
            return { h: 0, s: 0, l: 0 };
        }
        r /= 255; g /= 255; b /= 255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h = 0, s = 0, l = (max + min) / 2;
        if (max !== min) {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
                case g: h = ((b - r) / d + 2) / 6; break;
                case b: h = ((r - g) / d + 4) / 6; break;
            }
        }
        return { h: h * 360, s: s * 100, l: l * 100 };
    }

    function getPageInfo(callback) {
        var metaTags = [];
        var headTags = [];
        var technologies = detectTechnologies();

        // Title
        var title = document.title || 'Sin título';

        // Description
        var description = '';
        var descMeta = document.querySelector('meta[name="description"]');
        if (descMeta) description = descMeta.getAttribute('content') || '';

        // URL
        var url = window.location.href;

        // Meta tags
        var metaElements = document.querySelectorAll('head meta');
        metaElements.forEach(function(meta) {
            var name = meta.getAttribute('name') || meta.getAttribute('property') || '';
            var content = meta.getAttribute('content') || '';
            if (name && content) {
                metaTags.push({ name: name, value: content });
            }
        });

        // Head tags
        var linkElements = document.querySelectorAll('head link');
        linkElements.forEach(function(link) {
            var rel = link.getAttribute('rel') || '';
            var href = link.getAttribute('href') || '';
            if (rel && href) {
                headTags.push({ name: 'link:' + rel, value: href });
            }
        });

        // Canonical
        var canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) {
            headTags.push({ name: 'canonical', value: canonical.getAttribute('href') || '' });
        }

        var result = {
            title: title,
            description: description,
            url: url,
            metaTags: metaTags,
            headTags: headTags,
            technologies: technologies,
            colors: getPageColors()
        };

        // Fetch server headers asynchronously via background
        var called = false;
        function finish() {
            if (!called) { called = true; if (callback) callback(result); }
        }

        try {
            chrome.runtime.sendMessage({ action: 'fetchServerHeaders', url: url }, function(serverInfo) {
                if (!chrome.runtime.lastError && serverInfo && serverInfo.headers) {
                    detectServerTechnologies(result.technologies, serverInfo.headers, url);
                }
                finish();
            });
        } catch(e) {
            finish();
        }

        // Fallback: if no response in 3 seconds, return without server info
        setTimeout(finish, 3000);
    }

    function detectServerTechnologies(technologies, headers, url) {
        function addS(cat, name) {
            if (!technologies[cat]) technologies[cat] = [];
            if (technologies[cat].indexOf(name) === -1) {
                technologies[cat].push(name);
            }
        }

        // Server header — web server
        var server = headers['server'] || '';
        if (server) {
            var serverLower = server.toLowerCase();
            if (serverLower.indexOf('nginx') !== -1) {
                var nginxVer = (server.match(/nginx\/([\d.]+)/i) || [])[1] || '';
                addS('Servidor Web', 'Nginx' + (nginxVer ? ' ' + nginxVer : ''));
                addS('Proxy reverso', 'Nginx' + (nginxVer ? ' ' + nginxVer : ''));
            }
            if (serverLower.indexOf('litespeed') !== -1) {
                addS('Servidor Web', 'LiteSpeed');
            }
            if (serverLower.indexOf('apache') !== -1) {
                var apacheVer = (server.match(/apache\/([\d.]+)/i) || [])[1] || '';
                addS('Servidor Web', 'Apache' + (apacheVer ? ' ' + apacheVer : ''));
            }
            if (serverLower.indexOf('cloudflare') !== -1) {
                addS('CDN', 'Cloudflare');
            }
            if (serverLower.indexOf('hostinger') !== -1) {
                addS('Alojamiento', 'Hostinger');
            }
        }

        // X-Powered-By — backend language/framework
        var poweredBy = headers['x-powered-by'] || '';
        if (poweredBy) {
            var phpMatch = poweredBy.match(/PHP\/([\d.]+)/i);
            if (phpMatch) {
                addS('Lenguajes de Programación', 'PHP ' + phpMatch[1]);
            } else if (poweredBy.toLowerCase().indexOf('php') !== -1) {
                addS('Lenguajes de Programación', 'PHP');
            }
            if (poweredBy.toLowerCase().indexOf('express') !== -1) {
                addS('Framework Web', 'Express');
                addS('Servidor Web', 'Express');
            }
            if (poweredBy.toLowerCase().indexOf('node') !== -1 || poweredBy.toLowerCase().indexOf('node.js') !== -1) {
                addS('Lenguajes de Programación', 'Node.js');
            }
        }

        // LiteSpeed cache header
        if (headers['x-litespeed-cache'] || headers['x-lsadc-cache']) {
            addS('Servidor Web', 'LiteSpeed');
        }

        // Hostinger
        if (headers['x-hostinger'] || headers['hostinger'] || headers['x-hpanel'] ||
            (server && server.toLowerCase().indexOf('hostinger') !== -1)) {
            addS('Alojamiento', 'Hostinger');
        }

        // PHP session cookie
        var setCookie = headers['set-cookie'] || '';
        if (setCookie.toLowerCase().indexOf('phpsessid') !== -1) {
            addS('Lenguajes de Programación', 'PHP');
        }

        // Cloudflare via headers
        if (headers['cf-ray'] || headers['cf-cache-status']) {
            addS('CDN', 'Cloudflare');
        }

        // Netlify
        if (headers['x-nf-request-id'] || headers['server'] && headers['server'].toLowerCase().indexOf('netlify') !== -1) {
            addS('CDN', 'Netlify');
        }

        // Vercel
        if (headers['x-vercel-id'] || headers['x-vercel-cache'] || headers['x-vercel-ip-country']) {
            addS('CDN', 'Vercel');
        }

        // Link header for preconnect/preload hints
        var linkHeader = headers['link'] || '';
        if (linkHeader) {
            // Priority hints (e.g., rel=preload)
            if (linkHeader.indexOf('rel=preload') !== -1 || linkHeader.indexOf('rel=preconnect') !== -1) {
                addS('Rendimiento', 'Priority Hints');
            }
        }

        // Extract PHP version from X-Powered-By if not already added
        if (poweredBy && !phpMatch) {
            var phpVerMatch = poweredBy.match(/PHP\/([\d.]+)/i);
            if (phpVerMatch) {
                addS('Lenguajes de Programación', 'PHP ' + phpVerMatch[1]);
            }
        }
    }

    function detectTechnologies() {
        var categories = {};
        // headHtml: only <head> — intentional tech choices (scripts, links, meta)
        var headHtml = (document.head && document.head.innerHTML) || '';
        // html: full document — only use for DOM structure markers, NOT text matching
        var html = document.documentElement.innerHTML;
        var scripts = Array.from(document.querySelectorAll('script[src]')).map(function(s) {
            return s.src.toLowerCase();
        });
        var links = Array.from(document.querySelectorAll('link[href]')).map(function(l) {
            return l.href.toLowerCase();
        });
        
        function add(category, name) {
            if (!categories[category]) categories[category] = [];
            if (categories[category].indexOf(name) === -1) {
                categories[category].push(name);
            }
        }

        function scriptHas(pattern) {
            return scripts.some(function(s) { return s.indexOf(pattern) !== -1; });
        }

        function linkHas(pattern) {
            return links.some(function(l) { return l.indexOf(pattern) !== -1; });
        }

        function headHas(pattern) {
            // Match only within <head> — intentional tech choices, not body content
            return headHtml.indexOf(pattern) !== -1;
        }

        function metaHas(name, contentPattern) {
            var el = document.querySelector('meta[name="' + name + '"][content*="' + contentPattern + '"]');
            return !!el;
        }

        function inlineJsonHas(key) {
            var jsonScripts = document.querySelectorAll('script[type="application/json"], script[data-page]');
            for (var i = 0; i < jsonScripts.length; i++) {
                if (jsonScripts[i].textContent.indexOf('"' + key + '"') !== -1) {
                    return true;
                }
            }
            return false;
        }

        // ===== Widget (Búsqueda / Search widgets) =====
        // Algolia: detect only from script URLs, link preconnect, and inline JSON — NOT body text
        var hasAlgolia = scriptHas('algolia') || linkHas('algolia') ||
            inlineJsonHas('algolia') || inlineJsonHas('docsearch') ||
            headHas('algolia');
        var hasDocsearch = scriptHas('docsearch') || document.querySelector('[id*="docsearch"]') ||
            document.querySelector('link[href*="docsearch"]');

        if (hasAlgolia) {
            add('Motor de Búsqueda', 'Algolia');
        }
        if (hasDocsearch) {
            add('Widget', 'Algolia DocSearch');
        }

        // ===== Analítica =====
        if (headHas('googletagmanager') || scriptHas('googletagmanager') || scriptHas('gtag')) {
            add('Analítica', 'Google Analytics');
            // GA4 — detected by measurement ID pattern G-XXXXXXXXXX
            if (scriptHas('gtag/js?id=G-') || headHas('gtag/js?id=G-') || html.indexOf('gtag/js?id=G-') !== -1) {
                add('Analítica', 'GA4');
            }
        }
        if (scriptHas('google-analytics') || headHas('google-analytics')) {
            add('Analítica', 'Google Analytics');
        }
        if (headHas('fbq(') || scriptHas('connect.facebook.net')) {
            add('Analítica', 'Facebook Pixel');
        }
        if (scriptHas('hotjar') || headHas('hotjar')) {
            add('Analítica', 'Hotjar');
        }
        if (scriptHas('intercom') || headHas('intercom')) {
            add('Analítica', 'Intercom');
        }
        if (scriptHas('clarity') || headHas('clarity')) {
            add('Analítica', 'Microsoft Clarity');
        }
        if (scriptHas('mixpanel') || headHas('mixpanel')) {
            add('Analítica', 'Mixpanel');
        }
        if (scriptHas('amplitude') || headHas('amplitude')) {
            add('Analítica', 'Amplitude');
        }
        if (scriptHas('kissmetrics')) {
            add('Analítica', 'Kissmetrics');
        }
        if (scriptHas('mouseflow')) {
            add('Analítica', 'Mouseflow');
        }
        if (scriptHas('fullstory')) {
            add('Analítica', 'FullStory');
        }
        if (scriptHas('usefathom') || headHas('usefathom')) {
            add('Analítica', 'Fathom');
        }
        if (scriptHas('posthog') || headHas('posthog')) {
            add('Analítica', 'PostHog');
        }

        // ===== Gestores de Etiquetas =====
        if (headHas('googletagmanager') || scriptHas('googletagmanager')) {
            add('Gestores de Etiquetas', 'Google Tag Manager');
        }
        if (scriptHas('tealium') || headHas('tealium')) {
            add('Gestores de Etiquetas', 'Tealium');
        }
        if (headHas('adobetm') || headHas('launch.dynamic') || scriptHas('adobedtm') || scriptHas('adobetm')) {
            add('Gestores de Etiquetas', 'Adobe Launch');
        }
        if (scriptHas('cdn.segment') || scriptHas('/segment') || headHas('segment.com')) {
            add('Gestores de Etiquetas', 'Segment');
        }

        // ===== Framework JavaScript =====
        if (html.indexOf('data-reactroot') !== -1 || html.indexOf('data-reactid') !== -1 ||
            html.indexOf('__REACT_DEVTOOLS_GLOBAL_HOOK__') !== -1 ||
            scriptHas('/react-dom') || scriptHas('/react.production') || scriptHas('/react.development')) {
            add('Framework JavaScript', 'React');
        }
        if (html.indexOf('__VUE__') !== -1 || html.indexOf('data-v-') !== -1 ||
            scriptHas('/vue.') || scriptHas('/vue@') || scriptHas('vue.global')) {
            add('Framework JavaScript', 'Vue.js');
        }
        if (html.indexOf('ng-version=') !== -1 || html.indexOf('ng-app=') !== -1 || html.indexOf('ng-controller=') !== -1 ||
            document.querySelector('[ng-app]') || document.querySelector('[data-ng-app]') ||
            scriptHas('/angular') || scriptHas('angular.min') || scriptHas('@angular')) {
            add('Framework JavaScript', 'Angular');
        }
        if (html.indexOf('__next') !== -1 || scriptHas('/_next/') || scriptHas('next/dist')) {
            var nextVersion = '';
            // Try to extract version from __NEXT_DATA__ script tag
            var nextData = document.getElementById('__NEXT_DATA__');
            if (nextData) {
                try {
                    var data = JSON.parse(nextData.textContent);
                    if (data && data.nextVersion) nextVersion = data.nextVersion;
                } catch(e) {}
            }
            // Fallback: try to read version from build manifest path or meta
            if (!nextVersion) {
                var buildScript = document.querySelector('script[src*="/_next/static/"][src*="_ssgManifest"]');
                if (buildScript) {
                    var m = buildScript.src.match(/\/_next\/static\/([^/]+)\//);
                    // This gives the build ID, not version — skip
                }
            }
            add('Framework JavaScript', 'Next.js' + (nextVersion ? ' ' + nextVersion : ''));
        }
        if (html.indexOf('__nuxt') !== -1 || scriptHas('nuxt')) {
            add('Framework JavaScript', 'Nuxt.js');
        }
        if (html.indexOf('__svelte') !== -1 || html.indexOf('svelte-') !== -1 || html.indexOf('data-sveltekit') !== -1 ||
            html.indexOf('<!--svelte') !== -1 || scriptHas('svelte')) {
            add('Framework JavaScript', 'Svelte');
        }
        if (html.indexOf('ember.js') !== -1 || html.indexOf('data-ember-') !== -1 || html.indexOf('ember-application') !== -1 ||
            scriptHas('ember.js') || scriptHas('emberjs') || scriptHas('/ember/')) {
            add('Framework JavaScript', 'Ember.js');
        }
        if (scriptHas('backbone')) {
            add('Librerías JavaScript', 'Backbone.js');
        }
        if (html.indexOf('alpinejs') !== -1 || scriptHas('alpine')) {
            add('Framework JavaScript', 'Alpine.js');
        }
        if (html.indexOf('data-astro-') !== -1 || html.indexOf('astro-island') !== -1 || html.indexOf('data-astro-cid') !== -1 ||
            scriptHas('/_astro/') || document.querySelector('astro-island')) {
            add('Framework JavaScript', 'Astro');
            add('Generador de sitios estáticos', 'Astro');
        }
        if (scriptHas('gatsby') || html.indexOf('___GATSBY') !== -1) {
            add('Framework JavaScript', 'Gatsby');
        }
        if (scriptHas('preact') || html.indexOf('__PREACT__') !== -1) {
            add('Framework JavaScript', 'Preact');
        }
        if (html.indexOf('solid-js') !== -1 || html.indexOf('_$HY') !== -1 || scriptHas('solid')) {
            add('Framework JavaScript', 'Solid.js');
        }
        if (scriptHas('qwik') || html.indexOf('qwikevents') !== -1 || html.indexOf('qwikloader') !== -1) {
            add('Framework JavaScript', 'Qwik');
        }
        if (scriptHas('@remix-run') || scriptHas('/remix/') || html.indexOf('__remixContext') !== -1 || html.indexOf('__remixManifest') !== -1) {
            add('Framework JavaScript', 'Remix');
        }
        // Inertia.js — script tag or data-inertia attributes
        if (scriptHas('inertia') || scriptHas('@inertiajs') ||
            html.indexOf('data-inertia') !== -1 || document.querySelector('[data-inertia]')) {
            add('Framework JavaScript', 'Inertia.js');
        }
        // Angular version detection
        var angularRoot = document.querySelector('[ng-version]');
        if (angularRoot) {
            var ngVersion = angularRoot.getAttribute('ng-version') || '';
            if (ngVersion) {
                add('Framework JavaScript', 'Angular ' + ngVersion);
            }
        }
        // VitePress — static site generator built on Vite + Vue
        if (metaHas('generator', 'VitePress') || headHas('VitePress') || html.indexOf('vitepress-theme') !== -1) {
            add('Generador de sitios estáticos', 'VitePress');
        }
        // Vite — build tool (only if not already detected via VitePress)
        if (scriptHas('/@vite') || scriptHas('vite/client') || (scriptHas('vite') && !metaHas('generator', 'VitePress'))) {
            add('Miscelánea', 'Vite');
        }

        // ===== Librerías JavaScript =====
        if (typeof jQuery !== 'undefined' || scriptHas('jquery')) {
            var jqVersion = '';
            if (typeof jQuery !== 'undefined' && jQuery.fn && jQuery.fn.jquery) {
                jqVersion = ' ' + jQuery.fn.jquery;
            }
            add('Librerías JavaScript', 'jQuery' + jqVersion);
        }
        if (scriptHas('lodash')) {
            add('Librerías JavaScript', 'Lodash');
        }
        if (scriptHas('moment')) {
            add('Librerías JavaScript', 'Moment.js');
        }
        if (scriptHas('d3.js') || scriptHas('d3.min') || scriptHas('d3.v')) {
            add('Librerías JavaScript', 'D3.js');
        }
        if (scriptHas('chart.js') || scriptHas('chartjs') || scriptHas('/chart')) {
            add('Librerías JavaScript', 'Chart.js');
        }
        if (scriptHas('three.js') || scriptHas('three.min')) {
            add('Librerías JavaScript', 'Three.js');
        }
        if (scriptHas('gsap')) {
            add('Librerías JavaScript', 'GSAP');
        }
        if (scriptHas('axios')) {
            add('Librerías JavaScript', 'Axios');
        }
        if (scriptHas('swiper')) {
            add('Librerías JavaScript', 'Swiper');
        }
        // Framer Motion — only match the specific package, not generic "framer" or "motion"
        if (scriptHas('framer-motion') || html.indexOf('framer-motion') !== -1) {
            add('Librerías JavaScript', 'Framer Motion');
        }
        if (scriptHas('prism') || scriptHas('prismjs')) {
            add('Librerías JavaScript', 'Prism.js');
        }
        if (scriptHas('highlight') || scriptHas('highlightjs') || scriptHas('hljs')) {
            add('Librerías JavaScript', 'Highlight.js');
        }
        if (scriptHas('anime') || scriptHas('animejs')) {
            add('Librerías JavaScript', 'Anime.js');
        }
        if (scriptHas('dayjs')) {
            add('Librerías JavaScript', 'Day.js');
        }
        if (scriptHas('date-fns')) {
            add('Librerías JavaScript', 'date-fns');
        }
        if (scriptHas('rxjs')) {
            add('Librerías JavaScript', 'RxJS');
        }
        if (scriptHas('socket.io') || scriptHas('socketio')) {
            add('Librerías JavaScript', 'Socket.IO');
        }
        if (scriptHas('core-js') || scriptHas('corejs')) {
            var corejsVer = '';
            var corejsMatch = html.match(/core-js[^?]*\?ver=([\d.]+)/);
            if (corejsMatch) corejsVer = ' ' + corejsMatch[1];
            add('Librerías JavaScript', 'core-js' + corejsVer);
        }
        if (scriptHas('zone.js') || scriptHas('zonejs')) {
            add('Librerías JavaScript', 'Zone.js');
        }
        if (scriptHas('immutable') || scriptHas('immutablejs')) {
            add('Librerías JavaScript', 'Immutable.js');
        }
        if (scriptHas('xstate')) {
            add('Librerías JavaScript', 'XState');
        }
        if (scriptHas('i18next') || scriptHas('i18n')) {
            add('Librerías JavaScript', 'i18next');
        }
        if (scriptHas('owl.carousel') || scriptHas('owlcarousel')) {
            add('Librerías JavaScript', 'OWL Carousel');
        }
        if (scriptHas('lit-html') || scriptHas('lit-element') || scriptHas('/lit/') ||
            html.indexOf('lit-html') !== -1 || html.indexOf('lit-element') !== -1) {
            if (scriptHas('lit-html') || html.indexOf('lit-html') !== -1) {
                add('Librerías JavaScript', 'lit-html');
            }
            if (scriptHas('lit-element') || html.indexOf('lit-element') !== -1) {
                add('Librerías JavaScript', 'lit-element');
            }
        }
        // Popper (not Popper.js for brevity)
        if (scriptHas('popper') || scriptHas('popperjs')) {
            add('Librerías JavaScript', 'Popper');
        }
        if (scriptHas('masonry') || scriptHas('masonry-layout')) {
            add('Librerías JavaScript', 'Masonry');
        }
        if (scriptHas('jquery-migrate') || scriptHas('jquery.migrate')) {
            var jqmVer = '';
            var jqmMatch = html.match(/jquery-migrate(?:\.min)?\.js\?ver=([\d.]+)/);
            if (jqmMatch) jqmVer = ' ' + jqmMatch[1];
            add('Librerías JavaScript', 'jQuery Migrate' + jqmVer);
        }
        if (scriptHas('isotope') || scriptHas('isotope-layout')) {
            add('Librerías JavaScript', 'Isotope');
        }

        // ===== UI Frameworks =====
        if (scriptHas('bootstrap') || document.querySelector('link[href*="bootstrap"]')) {
            var bsVer = '';
            var bsMatch = html.match(/bootstrap(?:\.min)?\.(?:css|js)\?ver=([\d.]+)/);
            if (bsMatch) bsVer = ' ' + bsMatch[1];
            else {
                bsMatch = html.match(/bootstrap\/([\d.]+)\//);
                if (bsMatch) bsVer = ' ' + bsMatch[1];
            }
            add('UI Frameworks', 'Bootstrap' + bsVer);
        }
        if (document.querySelector('link[href*="tailwind"]') || html.indexOf('tailwind') !== -1) {
            add('UI Frameworks', 'Tailwind CSS');
        }
        if (document.querySelector('link[href*="font-awesome"]') || document.querySelector('link[href*="fontawesome"]')) {
            add('UI Frameworks', 'Font Awesome');
        }
        if (document.querySelector('link[href*="materialize"]') || scriptHas('materialize')) {
            add('UI Frameworks', 'Materialize');
        }
        if (document.querySelector('link[href*="bulma"]')) {
            add('UI Frameworks', 'Bulma');
        }
        if (document.querySelector('link[href*="semantic-ui"]') || document.querySelector('link[href*="semanticui"]')) {
            add('UI Frameworks', 'Semantic UI');
        }
        if (document.querySelector('link[href*="antd"]') || scriptHas('antd')) {
            add('UI Frameworks', 'Ant Design');
        }
        if (document.querySelector('link[href*="chakra"]') || scriptHas('chakra')) {
            add('UI Frameworks', 'Chakra UI');
        }
        if (html.indexOf('n-config-provider') !== -1 || html.indexOf('n-popover') !== -1 || scriptHas('naive') || scriptHas('naive-ui')) {
            add('UI Frameworks', 'Naive UI');
        }
        if (html.indexOf('v-menu') !== -1 || html.indexOf('v-btn') !== -1 || scriptHas('vuetify')) {
            add('UI Frameworks', 'Vuetify');
        }
        if (html.indexOf('data-mui') !== -1 || scriptHas('mui/material') || scriptHas('@mui')) {
            add('UI Frameworks', 'MUI (Material UI)');
        }

        // ===== CDN =====
        if (scriptHas('cloudflareinsights') || html.indexOf('data-cf-beacon') !== -1) {
            add('CDN', 'Cloudflare');
        }
        // Cloudflare Turnstile (separate from CDN)
        if (html.indexOf('turnstile') !== -1 || scriptHas('turnstile') || scriptHas('challenges.cloudflare') ||
            inlineJsonHas('turnstileSiteKey') || inlineJsonHas('turnstile')) {
            add('Seguridad', 'Cloudflare Turnstile');
        }
        if (metaHas('generator', 'Vercel') || scriptHas('vercel') || linkHas('vercel')) {
            add('CDN', 'Vercel');
        }
        if (scriptHas('netlify') || linkHas('netlify') || headHas('netlify') ||
            typeof window.__netlify !== 'undefined' || html.indexOf('netlify-') !== -1) {
            add('CDN', 'Netlify');
        }
        if (scriptHas('aws') || scriptHas('amazonaws') || scriptHas('cloudfront') ||
            linkHas('amazonaws') || linkHas('cloudfront') ||
            html.indexOf('s3.amazonaws.com') !== -1 || html.indexOf('cloudfront.net') !== -1) {
            add('CDN', 'AWS');
            if (scriptHas('cloudfront') || linkHas('cloudfront') || html.indexOf('cloudfront.net') !== -1) {
                add('CDN', 'Amazon CloudFront');
            }
        }
        if (scriptHas('firebase')) {
            add('CDN', 'Firebase');
        }
        if (scriptHas('supabase')) {
            add('CDN', 'Supabase');
        }
        if (scriptHas('jsdelivr') || scriptHas('jsdelvr')) {
            add('CDN', 'jsDelivr');
        }
        if (scriptHas('unpkg.com')) {
            add('CDN', 'Unpkg');
        }
        if (scriptHas('cdnjs')) {
            add('CDN', 'CDNJS');
        }
        // Google APIs — only CDN-hosted libraries, not fonts.googleapis.com
        if (scriptHas('ajax.googleapis.com') || scriptHas('storage.googleapis.com') ||
            scriptHas('apis.google.com/js/')) {
            add('CDN', 'Google APIs');
        }
        // Bunny CDN / Fonts
        if (scriptHas('bunny.net') || linkHas('bunny.net') || headHas('bunny.net') ||
            document.querySelector('link[href*="bunny.net"]')) {
            add('CDN', 'Bunny');
            if (linkHas('fonts.bunny') || headHas('fonts.bunny') || document.querySelector('link[href*="fonts.bunny"]')) {
                add('Tipografía', 'Bunny Fonts');
            }
        }

        // ===== Framework Web / CMS =====
        if (html.indexOf('wp-content') !== -1 || html.indexOf('wp-includes') !== -1 || metaHas('generator', 'WordPress')) {
            add('Framework Web / CMS', 'WordPress');
            // WordPress version from CSS/JS ?ver= parameter
            var wpVerMatch = html.match(/wp-includes\/[^?]+\?ver=([\d.]+)/);
            if (wpVerMatch) {
                add('Framework Web / CMS', 'WordPress ' + wpVerMatch[1]);
            }
            // WooCommerce
            if (html.indexOf('wp-content/plugins/woocommerce') !== -1 || linkHas('woocommerce') || scriptHas('woocommerce')) {
                var wcVerMatch = html.match(/woocommerce[^?]+\?ver=([\d.]+)/);
                add('Plugins de WordPress', 'WooCommerce' + (wcVerMatch ? ' ' + wcVerMatch[1] : ''));
            }
            // Contact Form 7
            if (html.indexOf('wp-content/plugins/contact-form-7') !== -1 || linkHas('contact-form-7') || scriptHas('contact-form-7')) {
                var cf7VerMatch = html.match(/contact-form-7[^?]+\?ver=([\d.]+)/);
                add('Plugins de WordPress', 'Contact Form 7' + (cf7VerMatch ? ' ' + cf7VerMatch[1] : ''));
            }
            // Yoast SEO
            if (html.indexOf('yoast') !== -1 || html.indexOf('wordpress-seo') !== -1 || linkHas('wordpress-seo') || scriptHas('wordpress-seo')) {
                add('Plugins de WordPress', 'Yoast SEO');
            }
            // Ultimate GDPR / Cookie consent
            if (html.indexOf('ct-ultimate-gdpr') !== -1 || linkHas('ct-ultimate-gdpr') || scriptHas('ct-ultimate-gdpr')) {
                add('Plugins de WordPress', 'Ultimate GDPR & CCPA');
            }
        }
        if (metaHas('generator', 'Shopify') || scriptHas('shopify') || linkHas('shopify')) {
            add('Framework Web / CMS', 'Shopify');
        }
        if (metaHas('generator', 'Wix') || scriptHas('wix') || linkHas('wix.com')) {
            add('Framework Web / CMS', 'Wix');
        }
        if (metaHas('generator', 'Squarespace') || scriptHas('squarespace') || linkHas('squarespace')) {
            add('Framework Web / CMS', 'Squarespace');
        }
        if (metaHas('generator', 'Drupal') || scriptHas('drupal') || linkHas('drupal')) {
            add('Framework Web / CMS', 'Drupal');
        }
        if (metaHas('generator', 'Joomla') || scriptHas('joomla') || linkHas('joomla')) {
            add('Framework Web / CMS', 'Joomla');
        }
        if (metaHas('generator', 'Magento') || scriptHas('magento') || linkHas('magento')) {
            add('Framework Web / CMS', 'Magento');
        }
        // Ghost CMS — only match ghost.org domain or meta generator
        if (scriptHas('ghost.org') || linkHas('ghost.org') || metaHas('generator', 'Ghost')) {
            add('Framework Web / CMS', 'Ghost');
        }

        // ===== Servicios Web =====
        if (scriptHas('stripe') || linkHas('stripe') || headHas('stripe')) {
            add('Servicios Web', 'Stripe');
        }
        if (scriptHas('paypal')) {
            add('Servicios Web', 'PayPal');
        }
        // YouTube — only if there's an actual embedded player
        if (scriptHas('youtube.com/embed') || scriptHas('youtube.com/player') ||
            document.querySelector('iframe[src*="youtube.com"]')) {
            add('Servicios Web', 'YouTube');
        }
        if (scriptHas('vimeo') || document.querySelector('iframe[src*="vimeo"]')) {
            add('Servicios Web', 'Vimeo');
        }
        // Google Maps — only actual Maps API scripts, not embedded iframes or text mentions
        if (scriptHas('maps.googleapis.com/maps/api') || scriptHas('maps.google.com/maps') ||
            document.querySelector('script[src*="maps.googleapis.com/maps"]')) {
            add('Servicios Web', 'Google Maps');
        }
        if (scriptHas('recaptcha') || scriptHas('google.com/recaptcha') || headHas('recaptcha')) {
            add('Servicios Web', 'reCAPTCHA');
        }
        // Mailchimp — only actual Mailchimp API/forms, not widget plugins
        if (scriptHas('mailchimp.com') || scriptHas('chimpstatic.com') || scriptHas('mc-validate') ||
            scriptHas('mailchimp-woocommerce') || (linkHas('mailchimp') && linkHas('list-manage'))) {
            add('Servicios Web', 'Mailchimp');
        }

        // ===== Automatización de Marketing =====
        if (scriptHas('hubspot') || scriptHas('hs-scripts') || scriptHas('hsforms') ||
            linkHas('hubspot') || inlineJsonHas('hubspot')) {
            add('Automatización de Marketing', 'HubSpot');
        }

        // ===== Plataforma de datos de clientes (CDP) =====
        if (scriptHas('rudderstack') || scriptHas('rudderlabs') || scriptHas('rudderanalytics') ||
            linkHas('rudderlabs') || inlineJsonHas('rudderstack') || inlineJsonHas('rudder')) {
            add('Plataforma de datos de clientes', 'Rudderstack');
        }
        if (scriptHas('mparticle') || headHas('mparticle')) {
            add('Plataforma de datos de clientes', 'mParticle');
        }

        // ===== Lenguajes de Programación (backend indicators) =====
        // PHP — only if real server-side indicators exist
        if (scriptHas('.php') || html.indexOf('csrf-token') !== -1 ||
            document.querySelector('meta[name="csrf-token"]') ||
            scriptHas('wp-content') || scriptHas('wp-includes') ||
            metaHas('generator', 'WordPress') || metaHas('generator', 'Drupal') ||
            metaHas('generator', 'Joomla')) {
            add('Lenguajes de Programación', 'PHP');
        }
        if (metaHas('generator', 'Rails') || html.indexOf('data-turbolinks') !== -1 || scriptHas('rubyonrails')) {
            add('Lenguajes de Programación', 'Ruby on Rails');
        }
        if (html.indexOf('csrfmiddlewaretoken') !== -1 || scriptHas('django') || metaHas('generator', 'Django')) {
            add('Lenguajes de Programación', 'Django');
        }
        if (html.indexOf('__VIEWSTATE') !== -1 || html.indexOf('__RequestVerificationToken') !== -1 || html.indexOf('__EVENTVALIDATION') !== -1) {
            add('Lenguajes de Programación', 'ASP.NET');
        }
        if (html.indexOf('csrf_token') !== -1 || scriptHas('flask')) {
            add('Lenguajes de Programación', 'Python (Flask)');
        }
        if (html.indexOf('jinja2') !== -1 || html.indexOf('__jinja') !== -1) {
            add('Lenguajes de Programación', 'Python (Jinja2)');
        }
        // Node.js — from bundler/build tool presence
        if (scriptHas('__webpack') || scriptHas('/webpack') || scriptHas('vite') || headHas('webpack')) {
            add('Lenguajes de Programación', 'Node.js');
        }
        if (scriptHas('expressjs') || scriptHas('/express/') || scriptHas('express.min')) {
            add('Lenguajes de Programación', 'Express.js');
        }
        if (scriptHas('koa') || scriptHas('koajs')) {
            add('Lenguajes de Programación', 'Koa.js');
        }
        if (scriptHas('fastify')) {
            add('Lenguajes de Programación', 'Fastify');
        }
        if (scriptHas('nest') || scriptHas('nestjs') || headHas('nestjs')) {
            add('Lenguajes de Programación', 'NestJS');
        }
        if (scriptHas('golang') || scriptHas('wasm_exec.js')) {
            add('Lenguajes de Programación', 'Go');
        }
        // Laravel — only from scripts or meta, not body text mentions
        if (scriptHas('laravel') || linkHas('laravel') || metaHas('generator', 'Laravel') ||
            scriptHas('laravel.com/build/')) {
            add('Lenguajes de Programación', 'Laravel');
        }
        if (scriptHas('symfony') || metaHas('generator', 'Symfony')) {
            add('Lenguajes de Programación', 'Symfony');
        }
        if (scriptHas('codeigniter') || metaHas('generator', 'CodeIgniter')) {
            add('Lenguajes de Programación', 'CodeIgniter');
        }

        // TypeScript — detected via Angular (ng-version), source maps, or framework indicators
        if (document.querySelector('[ng-version]') ||
            scriptHas('.ts') && (scriptHas('typescript') || scriptHas('sourcemap')) ||
            html.indexOf('__esModule') !== -1 && (html.indexOf('ng-version') !== -1 || html.indexOf('angular') !== -1)) {
            add('Lenguajes de Programación', 'TypeScript');
        }

        // ===== Tipografía =====
        if (document.querySelector('link[href*="fonts.googleapis.com"]')) {
            add('Tipografía', 'Google Font API');
        }
        if (document.querySelector('link[href*="fonts.typekit.net"]') || headHas('typekit')) {
            add('Tipografía', 'Adobe Fonts');
        }
        if (document.querySelector('link[href*="fonts.bunny.net"]') || linkHas('fonts.bunny')) {
            add('Tipografía', 'Bunny Fonts');
        }

        // ===== Miscelánea =====
        // PWA
        if (document.querySelector('link[rel="manifest"]') ||
            document.querySelector('meta[name="apple-mobile-web-app-capable"]') ||
            document.querySelector('meta[name="theme-color"]') ||
            document.querySelector('meta[name="mobile-web-app-capable"]') ||
            document.querySelector('link[rel="apple-touch-icon"]')) {
            add('Miscelánea', 'PWA');
        }
        // Open Graph
        var ogTags = document.querySelectorAll('meta[property^="og:"]');
        if (ogTags.length > 0) {
            add('Miscelánea', 'Open Graph');
        }
        // Twitter Cards
        var twitterTags = document.querySelectorAll('meta[name^="twitter:"]');
        if (twitterTags.length > 0) {
            add('Miscelánea', 'Twitter Cards');
        }
        // RSS
        if (document.querySelector('link[type="application/rss+xml"]') ||
            document.querySelector('link[href$=".rss"]') ||
            document.querySelector('link[href$="rss.xml"]') ||
            headHas('application/rss+xml')) {
            add('Miscelánea', 'RSS');
        }
        // Tailwind CSS — detect via CDN link, class names, or config comment
        if (document.querySelector('link[href*="tailwind"]') ||
            (html.indexOf('tailwind') !== -1 || html.indexOf('tailwindcss') !== -1) ||
            // Heuristic: Tailwind utility classes pattern (e.g., bg-gray-100, text-sm, flex)
            (html.indexOf('bg-gray-') !== -1 || html.indexOf('text-gray-') !== -1 || html.indexOf('dark:bg-') !== -1) &&
            !html.indexOf('bootstrap')) {
            add('UI Frameworks', 'Tailwind CSS');
        }

        return categories;
    }

    function generateSelector(el) {
        if (el.id) return '#' + el.id;
        var selector = el.tagName.toLowerCase();
        if (el.className && typeof el.className === 'string') {
            var classes = el.className.trim().split(/\s+/).filter(function(c) { return c; });
            if (classes.length > 0) {
                selector += '.' + classes[0];
            }
        }
        return selector;
    }

    function rgbToHex(rgb) {
        if (!rgb || rgb === 'rgba(0, 0, 0, 0)' || rgb === 'transparent') return 'transparent';
        if (rgb.startsWith('#')) return rgb;
        var m = rgb.match(/\d+/g);
        if (!m || m.length < 3) return rgb;
        return '#' + ((1 << 24) + (parseInt(m[0]) << 16) + (parseInt(m[1]) << 8) + parseInt(m[2])).toString(16).slice(1).toUpperCase();
    }

    // ===== DRAW MODE =====
    function toggleDrawMode() {
        if (isDrawMode) {
            deactivateDrawMode();
        } else {
            deactivateAllTools();
            isDrawMode = true;
            showDock();
            createDrawOverlay();
            createDrawToolbar();
            showToast(t('draw.activate'));
        }
        updateDockButtons();
    }

    function deactivateDrawMode() {
        isDrawMode = false;
        if (drawOverlay) { drawOverlay.remove(); drawOverlay = null; }
        if (drawToolbar) { drawToolbar.remove(); drawToolbar = null; }
        hideDrawLaser();
        if (drawLaser) { drawLaser.remove(); drawLaser = null; }
        // Remove all shapes (including text sticky notes)
        drawShapes.forEach(function(s) { if (s.el) s.el.remove(); });
        drawShapes = [];
        drawCurrent = null;
        document.body.style.cursor = '';
    }

    function createDrawOverlay() {
        if (drawOverlay) return;
        drawOverlay = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        drawOverlay.setAttribute('id', 'canopy-draw-overlay');
        drawOverlay.setAttribute('width', '100%');
        drawOverlay.setAttribute('height', '100%');
        drawOverlay.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:2147483646;pointer-events:none;';
        drawOverlay.innerHTML = '<defs><marker id="canopy-arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="' + drawColor + '"/></marker></defs><g id="canopy-draw-shapes"></g>';
        document.body.appendChild(drawOverlay);
    }

    function createDrawToolbar() {
        // Remove existing toolbar if recreating
        if (drawToolbar && drawToolbar.parentNode) {
            drawToolbar.remove();
            drawToolbar = null;
        }
        drawToolbar = document.createElement('div');
        drawToolbar.id = 'canopy-draw-toolbar';
        drawToolbar.style.cssText = 'position:fixed;top:16px;left:50%;transform:translateX(-50%);z-index:2147483647;' +
            'display:flex;gap:4px;padding:6px 10px;background:rgba(19,70,17,0.92);border-radius:12px;' +
            'box-shadow:0 4px 20px rgba(0,0,0,0.4);border:1px solid #3e8914;align-items:center;flex-wrap:nowrap;' +
            'font-family:-apple-system,BlinkMacSystemFont,sans-serif;font-size:12px;color:#e8fccf;white-space:nowrap;';

        // Shape buttons
        var shapeIconMap = { rect: 'square', line: 'minus', arrow: 'arrow-right', text: 'text-t', laser: 'laser-pointer', marker: 'highlighter' };
        var shapeKeyMap = { rect: 'draw.rect', line: 'draw.line', arrow: 'draw.arrow', text: 'draw.text', laser: 'draw.laser', marker: 'draw.marker' };
        var shapes = ['rect', 'line', 'arrow', 'text', 'marker', 'laser'];

        var shapeGroup = document.createElement('div');
        shapeGroup.style.cssText = 'display:flex;gap:3px;';

        shapes.forEach(function(sid) {
            var btn = document.createElement('button');
            var icon = getPhosphorIcon(shapeIconMap[sid]);
            btn.innerHTML = icon;
            btn.title = t(shapeKeyMap[sid]);
            btn.style.cssText = 'width:28px;height:28px;display:flex;align-items:center;justify-content:center;' +
                'background:' + (drawShape === sid ? '#3e8914' : 'rgba(255,255,255,0.1)') + ';' +
                'color:#e8fccf;border:1px solid ' + (drawShape === sid ? '#96e072' : '#3e8914') + ';' +
                'border-radius:6px;cursor:pointer;padding:3px;flex-shrink:0;';
            btn.addEventListener('click', function() {
                drawShape = sid;
                if (sid === 'laser') {
                    showDrawLaser();
                } else {
                    hideDrawLaser();
                }
                createDrawToolbar();
            });
            shapeGroup.appendChild(btn);
        });
        drawToolbar.appendChild(shapeGroup);

        // Separator
        var sep1 = document.createElement('div');
        sep1.style.cssText = 'width:1px;height:20px;background:rgba(150,224,114,0.3);margin:0 3px;flex-shrink:0;';
        drawToolbar.appendChild(sep1);

        // Color buttons
        var colors = ['#ff0000', '#ff6600', '#ffcc00', '#00cc00', '#0066ff', '#9900cc', '#ffffff', '#000000'];
        var colorGroup = document.createElement('div');
        colorGroup.style.cssText = 'display:flex;gap:4px;align-items:center;';

        colors.forEach(function(c) {
            var swatch = document.createElement('button');
            swatch.style.cssText = 'width:16px;height:16px;border-radius:50%;background:' + c + ';' +
                'border:2px solid ' + (drawColor === c ? '#96e072' : 'rgba(255,255,255,0.3)') + ';' +
                'cursor:pointer;padding:0;flex-shrink:0;';
            swatch.title = c;
            swatch.addEventListener('click', function() {
                drawColor = c;
                createDrawToolbar(); // recreate to update active state
            });
            colorGroup.appendChild(swatch);
        });
        drawToolbar.appendChild(colorGroup);

        // Separator
        var sep2 = document.createElement('div');
        sep2.style.cssText = 'width:1px;height:20px;background:rgba(150,224,114,0.3);margin:0 3px;flex-shrink:0;';
        drawToolbar.appendChild(sep2);

        // Stroke width
        var widthLabel = document.createElement('span');
        widthLabel.textContent = t('draw.stroke') + ':';
        widthLabel.style.cssText = 'font-size:10px;margin-right:1px;flex-shrink:0;';
        drawToolbar.appendChild(widthLabel);

        var widths = [1, 3, 5, 8];
        widths.forEach(function(w) {
            var wBtn = document.createElement('button');
            wBtn.textContent = w;
            wBtn.style.cssText = 'background:' + (drawStrokeWidth === w ? '#3e8914' : 'rgba(255,255,255,0.1)') + ';' +
                'color:#e8fccf;border:1px solid ' + (drawStrokeWidth === w ? '#96e072' : '#3e8914') + ';' +
                'border-radius:4px;padding:2px 5px;cursor:pointer;font-size:11px;min-width:22px;flex-shrink:0;';
            wBtn.addEventListener('click', function() {
                drawStrokeWidth = w;
                createDrawToolbar();
            });
            drawToolbar.appendChild(wBtn);
        });

        // Separator
        var sep3 = document.createElement('div');
        sep3.style.cssText = 'width:1px;height:20px;background:rgba(150,224,114,0.3);margin:0 3px;flex-shrink:0;';
        drawToolbar.appendChild(sep3);

        // Fill opacity (only for rect)
        if (drawShape === 'rect') {
            var fillLabel = document.createElement('span');
            fillLabel.textContent = t('draw.fill') + ':';
            fillLabel.style.cssText = 'font-size:10px;margin-right:1px;flex-shrink:0;';
            drawToolbar.appendChild(fillLabel);

            var opacities = [0, 0.2, 0.5];
            opacities.forEach(function(o) {
                var oBtn = document.createElement('button');
                oBtn.textContent = o === 0 ? '0%' : (o * 100) + '%';
                oBtn.style.cssText = 'background:' + (drawFillOpacity === o ? '#3e8914' : 'rgba(255,255,255,0.1)') + ';' +
                    'color:#e8fccf;border:1px solid ' + (drawFillOpacity === o ? '#96e072' : '#3e8914') + ';' +
                    'border-radius:4px;padding:1px 4px;cursor:pointer;font-size:10px;min-width:22px;flex-shrink:0;';
                oBtn.addEventListener('click', function() {
                    drawFillOpacity = o;
                    createDrawToolbar();
                });
                drawToolbar.appendChild(oBtn);
            });

            var sep4 = document.createElement('div');
            sep4.style.cssText = 'width:1px;height:20px;background:rgba(150,224,114,0.3);margin:0 3px;flex-shrink:0;';
            drawToolbar.appendChild(sep4);
        }

        // Action buttons
        var undoBtn = document.createElement('button');
        undoBtn.innerHTML = getPhosphorIcon('arrow-arc-left');
        undoBtn.title = t('draw.undo');
        undoBtn.style.cssText = 'width:28px;height:28px;display:flex;align-items:center;justify-content:center;' +
            'background:rgba(255,255,255,0.1);color:#e8fccf;border:1px solid #3e8914;' +
            'border-radius:6px;cursor:pointer;padding:3px;flex-shrink:0;';
        undoBtn.addEventListener('click', function() {
            if (drawShapes.length > 0) {
                var removed = drawShapes.pop();
                if (removed && removed.el) removed.el.remove();
            }
        });
        drawToolbar.appendChild(undoBtn);

        var clearBtn = document.createElement('button');
        clearBtn.innerHTML = getPhosphorIcon('trash');
        clearBtn.title = t('draw.clear');
        clearBtn.style.cssText = 'width:28px;height:28px;display:flex;align-items:center;justify-content:center;' +
            'background:rgba(255,255,255,0.1);color:#ff6666;border:1px solid #ff4444;' +
            'border-radius:6px;cursor:pointer;padding:3px;flex-shrink:0;';
        clearBtn.addEventListener('click', function() {
            drawShapes.forEach(function(s) { if (s.el) s.el.remove(); });
            drawShapes = [];
        });
        drawToolbar.appendChild(clearBtn);

        var exitBtn = document.createElement('button');
        exitBtn.innerHTML = getPhosphorIcon('x');
        exitBtn.title = t('draw.done');
        exitBtn.style.cssText = 'width:28px;height:28px;display:flex;align-items:center;justify-content:center;' +
            'background:#3e8914;color:#fff;border:1px solid #96e072;' +
            'border-radius:6px;cursor:pointer;padding:3px;flex-shrink:0;';
        exitBtn.addEventListener('click', function() {
            toggleDrawMode();
        });
        drawToolbar.appendChild(exitBtn);

        // Append toolbar
        document.body.appendChild(drawToolbar);
    }

    // Mouse handlers for drawing
    function onDrawMouseDown(e) {
        if (!isDrawMode) return;
        if (e.button !== 0) return;
        if (isExtensionElement(e.target)) return;

        // Marker mode: start free-form drawing
        if (drawShape === 'marker') {
            e.preventDefault();
            e.stopPropagation();
            drawMarkerPoints = [];
            drawMarkerPoints.push({ x: e.clientX, y: e.clientY });
            drawCurrent = null;
            document.body.style.cursor = 'crosshair';
            return;
        }

        // Laser pointer mode: nothing on mousedown, just show laser
        if (drawShape === 'laser') {
            showDrawLaser();
            return;
        }

        // Text mode: click to place a sticky note
        if (drawShape === 'text') {
            e.preventDefault();
            e.stopPropagation();
            createStickyNote(e.clientX, e.clientY);
            return;
        }

        e.preventDefault();
        e.stopPropagation();

        drawStartX = e.clientX;
        drawStartY = e.clientY;
        drawCurrent = null;

        document.body.style.cursor = 'crosshair';
    }

    function createStickyNote(x, y) {
        var wrapper = document.createElement('div');
        wrapper.className = 'canopy-sticky-note';
        wrapper.style.cssText = 'position:fixed;left:' + x + 'px;top:' + y + 'px;z-index:2147483647;' +
            'background:#fffde7;border:2px solid #f9a825;border-radius:8px;padding:8px 12px;' +
            'box-shadow:0 4px 16px rgba(0,0,0,0.25);max-width:250px;min-width:120px;' +
            'font-family:-apple-system,BlinkMacSystemFont,sans-serif;font-size:13px;cursor:default;';

        // Prevent click from propagating to draw handlers
        wrapper.addEventListener('mousedown', function(ev) {
            ev.stopPropagation();
        });

        // Color indicator and controls (draggable)
        var header = document.createElement('div');
        header.style.cssText = 'display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;';
        
        var colorDot = document.createElement('div');
        colorDot.style.cssText = 'width:12px;height:12px;border-radius:50%;background:' + drawColor + ';flex-shrink:0;cursor:grab;';
        colorDot.title = 'Arrastrar para mover';
        header.appendChild(colorDot);

        // Dragging logic
        var isDragging = false;
        var dragStartX = 0;
        var dragStartY = 0;
        var origLeft = 0;
        var origTop = 0;

        colorDot.addEventListener('mousedown', function(ev) {
            ev.stopPropagation();
            ev.preventDefault();
            isDragging = true;
            dragStartX = ev.clientX;
            dragStartY = ev.clientY;
            origLeft = wrapper.offsetLeft;
            origTop = wrapper.offsetTop;
            colorDot.style.cursor = 'grabbing';
            wrapper.style.transition = 'none';
        });

        document.addEventListener('mousemove', function(ev) {
            if (!isDragging) return;
            var dx = ev.clientX - dragStartX;
            var dy = ev.clientY - dragStartY;
            wrapper.style.left = (origLeft + dx) + 'px';
            wrapper.style.top = (origTop + dy) + 'px';
        });

        document.addEventListener('mouseup', function() {
            if (isDragging) {
                isDragging = false;
                colorDot.style.cursor = 'grab';
                wrapper.style.transition = '';
            }
        });

        var closeBtn = document.createElement('button');
        closeBtn.innerHTML = getPhosphorIcon('x');
        closeBtn.style.cssText = 'background:none;border:none;cursor:pointer;color:#999;padding:0;width:16px;height:16px;';
        closeBtn.title = 'Eliminar nota';
        closeBtn.addEventListener('click', function(ev) {
            ev.stopPropagation();
            ev.preventDefault();
            wrapper.remove();
            for (var i = drawShapes.length - 1; i >= 0; i--) {
                if (drawShapes[i].el === wrapper) {
                    drawShapes.splice(i, 1);
                    break;
                }
            }
        });
        closeBtn.addEventListener('mousedown', function(ev) {
            ev.stopPropagation();
            ev.preventDefault();
        });
        header.appendChild(closeBtn);
        wrapper.appendChild(header);

        // Editable text area
        var textEl = document.createElement('div');
        textEl.contentEditable = true;
        textEl.style.cssText = 'outline:none;min-height:24px;color:#333;line-height:1.4;word-wrap:break-word;';
        textEl.textContent = 'Escribe aquí...';
        textEl.addEventListener('focus', function() {
            if (textEl.textContent === 'Escribe aquí...') {
                textEl.textContent = '';
            }
        });
        textEl.addEventListener('blur', function() {
            if (textEl.textContent.trim() === '') {
                textEl.textContent = 'Escribe aquí...';
            }
        });
        textEl.addEventListener('mousedown', function(ev) {
            if (!isDragging) ev.stopPropagation();
        });
        wrapper.appendChild(textEl);

        document.body.appendChild(wrapper);
        
        // Auto-focus and select text
        setTimeout(function() {
            textEl.focus();
            var sel = window.getSelection();
            var range = document.createRange();
            range.selectNodeContents(textEl);
            sel.removeAllRanges();
            sel.addRange(range);
        }, 50);

        drawShapes.push({ el: wrapper, type: 'text' });
    }

    // ===== LASER POINTER =====
    function showDrawLaser() {
        if (!drawLaser) {
            drawLaser = document.createElement('div');
            drawLaser.id = 'canopy-draw-laser';
            drawLaser.style.cssText = 'position:fixed;z-index:2147483647;pointer-events:none;' +
                'width:24px;height:24px;border-radius:50%;' +
                'background:radial-gradient(circle, rgba(255,0,0,0.95) 0%, rgba(255,0,0,0.5) 35%, rgba(255,0,0,0) 70%);' +
                'box-shadow:0 0 25px rgba(255,0,0,0.7), 0 0 50px rgba(255,0,0,0.3);' +
                'transform:translate(-50%,-50%);will-change:left,top;';
            document.body.appendChild(drawLaser);
        }
        drawLaser.style.display = 'block';
        document.body.style.cursor = 'none';
    }

    function hideDrawLaser() {
        if (drawLaser) drawLaser.style.display = 'none';
        if (isDrawMode) document.body.style.cursor = 'crosshair';
        else document.body.style.cursor = '';
    }

    function updateDrawLaser(x, y) {
        if (drawLaser && drawLaser.style.display !== 'none') {
            drawLaser.style.left = x + 'px';
            drawLaser.style.top = y + 'px';
        }
    }

    function onDrawMouseMove(e) {
        // Laser pointer tracking (always active when laser mode)
        if (isDrawMode && drawShape === 'laser') {
            updateDrawLaser(e.clientX, e.clientY);
            return;
        }
        // Marker free-form drawing
        if (isDrawMode && drawShape === 'marker' && drawMarkerPoints.length > 0) {
            drawMarkerPoints.push({ x: e.clientX, y: e.clientY });
            // Remove previous preview
            if (drawCurrent && drawCurrent.parentNode) drawCurrent.remove();
            // Build preview path
            var d = 'M';
            for (var i = 0; i < drawMarkerPoints.length; i++) {
                d += (i === 0 ? '' : 'L') + drawMarkerPoints[i].x + ' ' + drawMarkerPoints[i].y;
            }
            drawCurrent = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            drawCurrent.setAttribute('d', d);
            drawCurrent.setAttribute('fill', 'none');
            drawCurrent.setAttribute('stroke', drawColor);
            drawCurrent.setAttribute('stroke-width', drawStrokeWidth * 3);
            drawCurrent.setAttribute('stroke-linecap', 'round');
            drawCurrent.setAttribute('stroke-linejoin', 'round');
            drawCurrent.setAttribute('opacity', '0.4');
            drawCurrent.style.cssText = 'pointer-events:none;';
            var shapesGroup = drawOverlay.querySelector('#canopy-draw-shapes');
            if (shapesGroup) shapesGroup.appendChild(drawCurrent);
            return;
        }
        if (!isDrawMode || drawStartX === 0) return;
        if (!drawCurrent && Math.abs(e.clientX - drawStartX) < 3 && Math.abs(e.clientY - drawStartY) < 3) return;

        // Remove previous preview
        if (drawCurrent && drawCurrent.parentNode) drawCurrent.remove();

        var x1 = drawStartX;
        var y1 = drawStartY;
        var x2 = e.clientX;
        var y2 = e.clientY;

        var shapesGroup = drawOverlay.querySelector('#canopy-draw-shapes');

        if (drawShape === 'rect') {
            var rx = Math.min(x1, x2);
            var ry = Math.min(y1, y2);
            var rw = Math.abs(x2 - x1);
            var rh = Math.abs(y2 - y1);

            drawCurrent = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            drawCurrent.setAttribute('x', rx);
            drawCurrent.setAttribute('y', ry);
            drawCurrent.setAttribute('width', rw);
            drawCurrent.setAttribute('height', rh);
            drawCurrent.setAttribute('stroke', drawColor);
            drawCurrent.setAttribute('stroke-width', drawStrokeWidth);
            drawCurrent.setAttribute('fill', drawColor);
            drawCurrent.setAttribute('fill-opacity', drawFillOpacity);
            drawCurrent.style.cssText = 'pointer-events:none;';
            shapesGroup.appendChild(drawCurrent);
        } else if (drawShape === 'line' || drawShape === 'arrow') {
            drawCurrent = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            drawCurrent.setAttribute('x1', x1);
            drawCurrent.setAttribute('y1', y1);
            drawCurrent.setAttribute('x2', x2);
            drawCurrent.setAttribute('y2', y2);
            drawCurrent.setAttribute('stroke', drawColor);
            drawCurrent.setAttribute('stroke-width', drawStrokeWidth);
            drawCurrent.setAttribute('stroke-linecap', 'round');
            drawCurrent.style.cssText = 'pointer-events:none;';
            if (drawShape === 'arrow') {
                // Update shared preview marker color
                var prevMarker = drawOverlay.querySelector('#canopy-arrowhead polygon');
                if (prevMarker) prevMarker.setAttribute('fill', drawColor);
                drawCurrent.setAttribute('marker-end', 'url(#canopy-arrowhead)');
            }
            shapesGroup.appendChild(drawCurrent);
        }
    }

    function onDrawMouseUp(e) {
        if (!isDrawMode) return;

        // Finalize marker free-form drawing
        if (drawShape === 'marker' && drawCurrent && drawMarkerPoints.length > 1) {
            drawCurrent.style.cssText = '';
            drawCurrent.setAttribute('data-canopy-draw', 'true');
            drawCurrent.setAttribute('opacity', '0.35');
            drawShapes.push({ el: drawCurrent, type: 'marker' });
            drawCurrent = null;
            drawMarkerPoints = [];
            document.body.style.cursor = '';
            return;
        }
        // Reset marker if no valid drawing
        if (drawShape === 'marker') {
            drawMarkerPoints = [];
            if (drawCurrent && drawCurrent.parentNode) drawCurrent.remove();
            drawCurrent = null;
            document.body.style.cursor = '';
            return;
        }

        if (!drawCurrent) { drawStartX = 0; drawStartY = 0; return; }

        // Finalize the shape
        drawCurrent.style.cssText = '';
        drawCurrent.setAttribute('data-canopy-draw', 'true');

        // For arrows, create a unique marker so color changes don't affect existing arrows
        if (drawShape === 'arrow') {
            var arrowId = 'canopy-arrow-' + drawShapes.length;
            var defs = drawOverlay.querySelector('defs');
            var marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
            marker.setAttribute('id', arrowId);
            marker.setAttribute('markerWidth', '10');
            marker.setAttribute('markerHeight', '7');
            marker.setAttribute('refX', '9');
            marker.setAttribute('refY', '3.5');
            marker.setAttribute('orient', 'auto');
            var poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
            poly.setAttribute('points', '0 0, 10 3.5, 0 7');
            poly.setAttribute('fill', drawColor);
            marker.appendChild(poly);
            defs.appendChild(marker);
            drawCurrent.setAttribute('marker-end', 'url(#' + arrowId + ')');
        }

        drawShapes.push({ el: drawCurrent, type: drawShape });

        drawCurrent = null;
        drawStartX = 0;
        drawStartY = 0;
        document.body.style.cursor = '';
    }

    // ===== UTILITY =====
    function isExtensionElement(el) {
        return el === overlay || 
               (overlay && overlay.contains(el)) || 
               el === floatPanel || 
               (floatPanel && floatPanel.contains(el)) ||
               el === dock ||
               (dock && dock.contains(el)) ||
               el === gridOverlay ||
               (gridOverlay && gridOverlay.contains(el)) ||
               el === eyedropperPreview ||
               (eyedropperPreview && eyedropperPreview.contains(el)) ||
               el === pageRulersH ||
               el === pageRulersV ||
               el === whatFontTooltip ||
               (whatFontTooltip && whatFontTooltip.contains(el)) ||
               el === whatFontExitBtn ||
               (whatFontExitBtn && whatFontExitBtn.contains(el));
    }

    function isWhatFontPopoverElement(el) {
        for (var i = 0; i < whatFontPopovers.length; i++) {
            if (whatFontPopovers[i] === el || (whatFontPopovers[i] && whatFontPopovers[i].contains(el))) {
                return true;
            }
        }
        return false;
    }

    function showToast(message) {
        var toast = document.getElementById('canopy-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'canopy-toast';
            toast.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#134611;color:white;padding:8px 16px;border-radius:20px;font-size:12px;z-index:2147483649;pointer-events:none;border:1px solid #3e8914;';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.style.display = 'block';
        clearTimeout(toast.hideTimer);
        toast.hideTimer = setTimeout(function() {
            toast.style.display = 'none';
        }, 2000);
    }

    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();