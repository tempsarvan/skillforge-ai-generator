#!/bin/bash
# Olym Browser Gatekeeper & Malware Warning Fix Script for macOS M5

echo "🛡️ Clearing macOS Gatekeeper Quarantine attribute for Olym Browser..."
sudo xattr -cr /Applications/Olym-Browser.app 2>/dev/null || xattr -cr ./Olym-Browser.app 2>/dev/null

echo "✅ Quarantine cleared! Launching Olym Browser for Apple M5..."
open /Applications/Olym-Browser.app 2>/dev/null || open ./Olym-Browser.app
