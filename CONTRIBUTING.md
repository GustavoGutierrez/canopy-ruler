# Contributing to Canopy Ruler

Thanks for your interest in contributing! Whether it's a bug report, feature request, or pull request — all contributions are welcome.

## Getting Started

1. **Fork** the repository on GitHub
2. **Clone** your fork locally
   ```bash
   git clone https://github.com/your-username/canopy-ruler.git
   cd canopy-ruler
   ```
3. **Load the extension** in Chrome:
   - Open `chrome://extensions/`
   - Enable **Developer mode**
   - Click **Load unpacked** and select the `canopy-ruler/` folder
4. **Reload** the extension after code changes (click the refresh icon on the extension card)

## Development Guidelines

### Code Style
- **Vanilla JavaScript** only — no frameworks, no build tools
- Use `var` for variables (ES5 compatibility, no transpiler)
- Follow the existing patterns in `scripts/content.js` and `sidepanel/panel.js`
- Use 4-space indentation
- Write comments in the style already used in the codebase

### Making Changes
1. Create a branch for your feature or fix:
   ```bash
   git checkout -b feature/my-feature
   ```
2. Make your changes
3. Test by reloading the extension in `chrome://extensions/`
4. Test on a real website (not just a blank page)
5. Check the browser console for errors

### Before Submitting
- Verify your code doesn't break existing functionality
- Check against different pages (static sites, SPAs, heavy pages)
- Make sure both English and Spanish UI text is updated if you add new strings

## Pull Request Process
1. Push your branch and open a PR against `main`
2. Describe what your PR does and why
3. Reference any related issues

## Reporting Bugs
Open an issue with:
- Chrome version
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if helpful

## Adding New Features
Before coding a large feature, open an issue to discuss the approach. This avoids wasted effort if the design needs adjustment.

---

Thank you for helping make Canopy Ruler better!
