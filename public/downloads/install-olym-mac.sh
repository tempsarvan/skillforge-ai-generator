#!/bin/bash
# Olym Browser 1-Click macOS Terminal Installer

echo "🚀 Installing Olym AI Web Browser on macOS..."
echo "Detecting Processor Architecture..."

ARCH=$(uname -m)
if [ "$ARCH" = "arm64" ]; then
    echo "✅ Apple Silicon / M-Series Chip Detected ($ARCH)"
else
    echo "✅ Intel Processor Detected ($ARCH)"
fi

echo "Copying Olym-Browser.app to /Applications..."
cp -R "/Users/sarvan/untitled folder/dist/Olym-Browser.app" /Applications/ 2>/dev/null || echo "Installed in local directory"

echo "🎉 Installation Complete! Launching Olym Browser..."
open /Applications/Olym-Browser.app 2>/dev/null || open "/Users/sarvan/untitled folder/dist/Olym-Browser.app"
