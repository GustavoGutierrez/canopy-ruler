#!/usr/bin/env bash
set -euo pipefail

# Canopy Ruler — Package for Chrome Web Store
# Creates a production-ready zip with only the files needed by the extension.

ROOT="$(cd "$(dirname "$0")" && pwd)"
DIST="$ROOT/dist"
VERSION=$(node -e "process.stdout.write(JSON.parse(require('fs').readFileSync('$ROOT/manifest.json','utf8')).version)")
ZIP="$DIST/canopy-ruler-v${VERSION}.zip"

echo "=== Packaging Canopy Ruler v${VERSION} ==="

# Clean and recreate dist
rm -rf "$DIST"
mkdir -p "$DIST"

# Files and directories to include in the extension package
INCLUDE=(
    manifest.json
    background.js
    scripts/
    sidepanel/
    images/
    _locales/
    LICENSE
)

echo "Including:"
for item in "${INCLUDE[@]}"; do
    echo "  $item"
done

# Create the zip with only the listed files
cd "$ROOT"
zip -r "$ZIP" "${INCLUDE[@]}" -x "*.DS_Store" -x "*/.gitkeep" -x "*/Thumbs.db"

echo ""
echo "=== Done ==="
echo "Package: $ZIP"
ls -lh "$ZIP"
