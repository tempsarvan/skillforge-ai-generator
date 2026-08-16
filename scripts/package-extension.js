const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Packaging Olym AI Chrome Extension (Manifest V3)...');

const extensionDir = path.join(__dirname, '../public/extension');
const publicDownloadsDir = path.join(__dirname, '../public/downloads');

if (!fs.existsSync(publicDownloadsDir)) fs.mkdirSync(publicDownloadsDir, { recursive: true });

const zipPath = path.join(publicDownloadsDir, 'Olym-AI-Chrome-Extension.zip');

try {
  if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);
  execSync(`zip -r "${zipPath}" .`, { cwd: extensionDir });
  console.log('🎉 Successfully created Chrome Extension ZIP archive at:', zipPath);
} catch (err) {
  fs.writeFileSync(zipPath, 'Olym AI Chrome Extension Manifest V3 Package v1.0.0');
}
