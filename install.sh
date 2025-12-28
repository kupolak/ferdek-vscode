#!/bin/bash

# Install script for Ferdek VS Code Extension

set -e

echo "Installing Ferdek VS Code Extension..."
echo ""

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install Node.js and npm first."
    exit 1
fi

echo "✓ npm found"
echo ""

# Navigate to extension directory
cd "$(dirname "$0")"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo ""
echo "🔨 Compiling TypeScript..."
npm run compile

echo ""
echo "📦 Building VSIX package..."
# Install vsce if not already installed
if ! command -v vsce &> /dev/null; then
    echo "Installing vsce (VS Code Extension Manager)..."
    npm install -g @vscode/vsce
fi

# Build the .vsix package
vsce package

echo ""
echo "✅ Installation complete!"
echo ""
echo "📦 VSIX package created! Look for ferdek-*.vsix file in this directory."
echo ""
echo "To install the extension:"
echo "1. Open VS Code"
echo "2. Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)"
echo "3. Click the '...' menu → Install from VSIX..."
echo "4. Select the generated .vsix file"
echo ""
echo "To publish to marketplace:"
echo "- vsce publish"
echo ""
echo "Or for development:"
echo "- Press F5 to start Extension Development Host"
echo "- Use 'npm run watch' for auto-compilation during development"
