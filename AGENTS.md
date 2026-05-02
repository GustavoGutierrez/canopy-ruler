# Canopy Ruler — Agent Instructions

## Quickstart
No build step. No package manager. No tests. Load directly:
1. Open `chrome://extensions/`, enable Developer mode
2. Click **Load unpacked**, select this folder
3. After edits: click the reload icon on the extension card
4. Test on real pages (static sites, SPAs, content-heavy pages)
5. Check DevTools console — `[Canopy Ruler]` prefixes all log output

## JavaScript conventions (rigid)

**ES5 only.** No transpiler — the code runs directly in the browser. Always use:
- `var` instead of `let`/`const`
- `function() {}` instead of arrow functions (`() => {}`)
- No template literals (use `'string ' + var`)
- No `class`, no destructuring, no `async/await`
- 4-space indentation in JS files

If you add new code, match the existing style exactly.

## Architecture: communication patterns

Three actors, each in its own context:

| Component | File | Runs in |
|-----------|------|---------|
| Background (service worker) | `background.js` (338 lines) | Extension worker |
| Content script | `scripts/content.js` (~4600 lines) | Every tab |
| Side panel | `sidepanel/panel.js` (1154 lines) | Side panel window |

**Message flow:**
- **Background → Content**: `chrome.tabs.sendMessage(tabId, msg)` — dispatching commands from toolbar click, shortcuts, context menu. If content script isn't loaded, background auto-injects it via `chrome.scripting.executeScript`.
- **Content → Background**: `chrome.runtime.sendMessage(msg)` via `safeSendMessage()` — for opening/closing side panel, capturing screenshots, downloading fonts, fetching server headers for technology detection.
- **Content → Panel** (and reverse): Relay through background. Panel listens on `chrome.runtime.onMessage` (background acts as message bus).
- **Background → Panel**: Uses `chrome.sidePanel.open()` for the panel tab, and closes by sending `{ action: 'panelClose' }`. When the user closes the panel via Chrome's built-in X button, a `beforeunload` event sends `panelClosedByUser` through the background to notify the content script.
- **Server Headers**: Content script requests `{ action: 'fetchServerHeaders', url }` from background, which performs a HEAD request and returns HTTP response headers for server-side technology detection.

The content script does the heavy lifting: dock UI, rulers, inspection, X-Ray, grid, eyedropper, WhatFont, draw & annotate, breakpoints, responsive mode, find element, viewport info. It is a single large file — read before editing.

The side panel handles presentation: element details, page analysis, color palette, meta tags, technologies, head tags, resources, about tab, and settings.

## Bilingual i18n (NOT Chrome's system)

The `_locales/en/messages.json` and `_locales/es/messages.json` are **only used for the extension name and description** in Chrome Web Store (manifest references `__MSG_EXT_NAME__` etc.).

All **UI strings** use a custom system in each JS file:
```js
var _lang = 'en';
var _messages = {
    'dock.panel': { en: 'Toggle Side Panel', es: 'Alternar Panel Lateral' },
    // ...
};

function t(key) {
    var msg = _messages[key];
    if (!msg) return key;
    return msg[_lang] || msg.en || key;
}
```

Both `content.js` and `panel.js` each maintain their own `_messages` dictionary. Language persists via `chrome.storage.local` key `canopyLang` (`'en'` or `'es'`). When adding new UI strings, add entries to BOTH files.

## SVGs are inline, not loaded from disk

The `images/icons/` directory contains Phosphor Icon SVG files, but the DOM is built entirely with inline SVG markup. In `content.js`, the `getPhosphorIcon(name)` function returns raw SVG strings. In `sidepanel/index.html`, all SVG paths are hardcoded inline. If you need a new icon, embed it directly — do not use `<img src>` for icons.

Flag SVGs (`usa.svg`, `colombia.svg`) are loaded via `chrome.runtime.getURL()` since they need to be in `web_accessible_resources`.

## Theme: Forest Green

CSS custom properties in `sidepanel/styles.css` define light and dark variants (`prefers-color-scheme`). The content script's dock uses hardcoded hex values inline. Key colors:
- `#134611` (Forest Black) — dark backgrounds
- `#3e8914` (Forest Green) — primary accents
- `#3da35d` (Jungle) — hover states
- `#96e072` (Light Green) — accent text
- `#e8fccf` (Frosted Mint) — light backgrounds

## Keyboard shortcuts

| Shortcut | Scope | Action |
|----------|-------|--------|
| `Alt+Shift+S` | Manifest command | Activate dock |
| `Alt+Up` | Manifest command | Select parent element |
| `Alt+Down` | Manifest command | Select child element |
| `Backspace` / `Delete` | Content script listener | Remove selected ruler |
| `Escape` | Content script listener | Exit current tool |
| `Enter` | Content script listener | Confirm find element search |

These are defined in `manifest.json` under `"commands"` and handled in `background.js` `chrome.commands.onCommand`.

## Packaging

```bash
bash package.sh   # creates dist/canopy-ruler-v{VERSION}.zip
```
Requires `node` (reads version from `manifest.json`). Production files only: excludes `dist/`, `docs/`, `.github/`, `README.md`, etc. CI triggers on `v*` tags, runs `package.sh`, and attaches the zip to a GitHub Release.

## Version bump — all locations

When bumping the version, update ALL of these:

| File | Line/Pattern | Notes |
|------|-------------|-------|
| `manifest.json` | `"version": "X.Y.Z"` | **Source of truth.** `package.sh` and `about-version` read from here. |
| `README.md` | `badge/version-X.Y.Z` | Badge URL in the shields.io image |
| `sidepanel/index.html` | `vX.Y.Z` (fallback) | Hardcoded fallback. The actual display reads from `chrome.runtime.getManifest().version` at runtime. |

The side panel About tab reads the version dynamically from `chrome.runtime.getManifest().version`, so after changing `manifest.json` and reloading the extension, the panel will show the correct version automatically.

## Manifest permissions

- Required: `scripting`, `activeTab`, `contextMenus`, `commands`, `storage`, `sidePanel`, `downloads`
- Optional: `clipboardWrite`
- Content script matches all URLs, runs at `document_end`
- Only `images/usa.svg` and `images/colombia.svg` are web-accessible

When adding features that need new permissions, add required ones and keep `clipboardWrite` as optional.

## Phosphor Icons

If you need a new icon, get it from https://phosphoricons.com. Use the `regular` weight, 20px for dock, 16px for panel. Embed the SVG path inline into `getPhosphorIcon()` in `content.js` or directly into `index.html`. Always:
- `viewBox="0 0 256 256"`
- `fill="currentColor"` (inherits theme color)
- Don't modify the `d` paths

---
See `README.md` for feature documentation and `CONTRIBUTING.md` for contribution guidelines.
