const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Building Native macOS Application Bundle & DMG Installer for Olym Browser...');

const distDir = path.join(__dirname, '../dist');
const appDir = path.join(distDir, 'Olym-Browser.app');
const contentsDir = path.join(appDir, 'Contents');
const macOSDir = path.join(contentsDir, 'MacOS');
const resourcesDir = path.join(contentsDir, 'Resources');

// Ensure output directories exist
if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });
if (fs.existsSync(appDir)) fs.rmSync(appDir, { recursive: true, force: true });

fs.mkdirSync(macOSDir, { recursive: true });
fs.mkdirSync(resourcesDir, { recursive: true });

// 1. Write Info.plist
const infoPlist = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleDevelopmentRegion</key>
    <string>en</string>
    <key>CFBundleDisplayName</key>
    <string>Olym AI Web Browser</string>
    <key>CFBundleExecutable</key>
    <string>Olym-Browser</string>
    <key>CFBundleIconFile</key>
    <string>AppIcon</string>
    <key>CFBundleIdentifier</key>
    <string>com.olym.browser</string>
    <key>CFBundleInfoDictionaryVersion</key>
    <string>6.0</string>
    <key>CFBundleName</key>
    <string>Olym Browser</string>
    <key>CFBundlePackageType</key>
    <string>APPL</string>
    <key>CFBundleShortVersionString</key>
    <string>1.0.0</string>
    <key>CFBundleVersion</key>
    <string>1</string>
    <key>LSMinimumSystemVersion</key>
    <string>11.0</string>
    <key>NSHighResolutionCapable</key>
    <true/>
</dict>
</plist>
`;

fs.writeFileSync(path.join(contentsDir, 'Info.plist'), infoPlist);

// 2. Write MacOS Executable Launcher Script
const launcherScript = `#!/bin/bash
# Olym Native macOS Application Launcher
# Launches native Chromium environment targeting Olym Browser engine

URL="http://localhost:3001/olym"

# Detect installed Chromium or Google Chrome on macOS
if [ -d "/Applications/Google Chrome.app" ]; then
    open -a "/Applications/Google Chrome.app" --args --app="$URL" --user-data-dir="$HOME/Library/Application Support/OlymBrowserProfile"
elif [ -d "/Applications/Chromium.app" ]; then
    open -a "/Applications/Chromium.app" --args --app="$URL" --user-data-dir="$HOME/Library/Application Support/OlymBrowserProfile"
else
    open "$URL"
fi
`;

const launcherPath = path.join(macOSDir, 'Olym-Browser');
fs.writeFileSync(launcherPath, launcherScript);
fs.chmodSync(launcherPath, '755');

console.log('✅ Created macOS Application Bundle at:', appDir);

// 3. Create DMG Installer if running on macOS
try {
  const dmgPath = path.join(distDir, 'Olym-Browser-v1.0.0-macOS-Universal.dmg');
  if (fs.existsSync(dmgPath)) fs.unlinkSync(dmgPath);

  console.log('📦 Packaging macOS DMG Installer using hdiutil...');
  execSync(`hdiutil create -volname "Olym-Browser-Installer" -srcfolder "${appDir}" -ov -format UDZO "${dmgPath}"`);
  console.log('🎉 Successfully created macOS DMG Installer at:', dmgPath);
} catch (err) {
  console.log('⚠️ Note: hdiutil DMG packaging available on macOS host system.');
}
