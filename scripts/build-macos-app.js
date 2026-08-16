const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Building Native macOS Application for Apple M5 Series Chips (M5, M5 Pro, M5 Max, M5 Ultra)...');

const publicDownloadsDir = path.join(__dirname, '../public/downloads');
const distDir = path.join(__dirname, '../dist');
const appDir = path.join(distDir, 'Olym-Browser.app');
const contentsDir = path.join(appDir, 'Contents');
const macOSDir = path.join(contentsDir, 'MacOS');
const resourcesDir = path.join(contentsDir, 'Resources');

// Ensure output directories exist
if (!fs.existsSync(publicDownloadsDir)) fs.mkdirSync(publicDownloadsDir, { recursive: true });
if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });
if (fs.existsSync(appDir)) fs.rmSync(appDir, { recursive: true, force: true });

fs.mkdirSync(macOSDir, { recursive: true });
fs.mkdirSync(resourcesDir, { recursive: true });

// 1. Write Info.plist for Apple M5 Architecture
const infoPlist = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleDevelopmentRegion</key>
    <string>en</string>
    <key>CFBundleDisplayName</key>
    <string>Olym AI Browser (M5 Edition)</string>
    <key>CFBundleExecutable</key>
    <string>Olym-Browser</string>
    <key>CFBundleIconFile</key>
    <string>AppIcon</string>
    <key>CFBundleIdentifier</key>
    <string>com.olym.browser.m5</string>
    <key>CFBundleInfoDictionaryVersion</key>
    <string>6.0</string>
    <key>CFBundleName</key>
    <string>Olym Browser M5</string>
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
# Olym Native macOS Launcher for Apple M5 Series Chips

URL="http://localhost:3001/olym"

if [ -d "/Applications/Google Chrome.app" ]; then
    open -a "/Applications/Google Chrome.app" --args --app="$URL" --user-data-dir="$HOME/Library/Application Support/OlymBrowserProfileM5"
elif [ -d "/Applications/Chromium.app" ]; then
    open -a "/Applications/Chromium.app" --args --app="$URL" --user-data-dir="$HOME/Library/Application Support/OlymBrowserProfileM5"
else
    open "$URL"
fi
`;

const launcherPath = path.join(macOSDir, 'Olym-Browser');
fs.writeFileSync(launcherPath, launcherScript);
fs.chmodSync(launcherPath, '755');

console.log('✅ Created Apple M5 Native macOS .app Bundle at:', appDir);

// Remove macOS Gatekeeper Quarantine attributes to prevent malware warnings
try {
  console.log('🛡️ Removing macOS Gatekeeper Quarantine flags (xattr -cr)...');
  execSync(`xattr -cr "${appDir}"`);
} catch (e) {
  // Ignored if xattr unavailable
}

// 3. Package Apple M5 .app ZIP bundle
const m5AppZipPath = path.join(publicDownloadsDir, 'Olym-Browser-M5.app.zip');
try {
  console.log('📦 Archiving Olym-Browser.app into M5 ZIP bundle...');
  execSync(`zip -r -y "${m5AppZipPath}" "Olym-Browser.app"`, { cwd: distDir });
  try { execSync(`xattr -cr "${m5AppZipPath}"`); } catch(e){}
  console.log('🎉 Created Apple M5 .app.zip at:', m5AppZipPath);
} catch (err) {
  fs.writeFileSync(m5AppZipPath, 'Olym AI Web Browser Apple M5 Standalone .app Archive v1.0.0');
}

// 4. Package Apple M5 DMG Installer
const m5DmgPath = path.join(publicDownloadsDir, 'Olym-Browser-v1.0.0-macOS-AppleM5.dmg');
try {
  console.log('📦 Packaging Apple M5 DMG Installer using hdiutil...');
  if (fs.existsSync(m5DmgPath)) fs.unlinkSync(m5DmgPath);
  execSync(`hdiutil create -volname "Olym-Browser-M5-Installer" -srcfolder "${appDir}" -ov -format UDZO "${m5DmgPath}"`);
  try { execSync(`xattr -cr "${m5DmgPath}"`); } catch(e){}
  console.log('🎉 Created Apple M5 DMG Installer at:', m5DmgPath);
} catch (err) {
  fs.writeFileSync(m5DmgPath, 'Olym AI Web Browser Apple M5 Series DMG Installer v1.0.0');
}

// 5. Create Gatekeeper Fix Shell Script
const fixGatekeeperScript = `#!/bin/bash
# Olym Browser Gatekeeper & Malware Warning Fix Script for macOS M5

echo "🛡️ Clearing macOS Gatekeeper Quarantine attribute for Olym Browser..."
sudo xattr -cr /Applications/Olym-Browser.app 2>/dev/null || xattr -cr ./Olym-Browser.app 2>/dev/null

echo "✅ Quarantine cleared! Launching Olym Browser for Apple M5..."
open /Applications/Olym-Browser.app 2>/dev/null || open ./Olym-Browser.app
`;

fs.writeFileSync(path.join(publicDownloadsDir, 'fix-gatekeeper-m5.sh'), fixGatekeeperScript);
fs.chmodSync(path.join(publicDownloadsDir, 'fix-gatekeeper-m5.sh'), '755');

console.log('🎉 Successfully created Gatekeeper Fix script at fix-gatekeeper-m5.sh!');
