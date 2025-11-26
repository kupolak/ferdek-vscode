# Building and Testing the Ferdek VS Code Extension

## Prerequisites

- Node.js 14.x or higher
- npm 6.x or higher
- VS Code 1.84.0 or higher

## Installation

### 1. Clone the repository

```bash
cd /path/to/ferdek/vscode-ferdek
```

### 2. Install dependencies

```bash
npm install
```

### 3. Compile TypeScript

```bash
npm run compile
```

## Development

### Watch mode for development

```bash
npm run watch
```

This will continuously compile TypeScript files as you make changes.

### Testing the extension locally

1. Press `F5` in VS Code to open the Extension Development Host
2. A new VS Code window will open with the extension loaded
3. Open a `.ferdek` file to test

### Code style

The project uses ESLint for code linting:

```bash
npm run lint
```

## Building the extension package

### Generate VSIX package

```bash
npm run vscode:prepublish
```

Then install the VSIX extension in VS Code:

1. Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)
2. Click on "..." menu
3. Select "Install from VSIX..."
4. Choose the generated `.vsix` file

## Publishing to VS Code Marketplace

1. Install `vsce`:
   ```bash
   npm install -g vsce
   ```

2. Get a Personal Access Token from [VS Code Marketplace](https://marketplace.visualstudio.com/manage/publishers/)

3. Publish:
   ```bash
   vsce publish
   ```

## Project Structure

```
vscode-ferdek/
├── src/
│   └── extension.ts          # Main extension code
├── syntaxes/
│   └── ferdek.tmLanguage.json # Syntax highlighting
├── snippets/
│   └── ferdek.json           # Code snippets
├── language-configuration.json # Language settings
├── package.json              # Extension manifest
├── tsconfig.json             # TypeScript configuration
├── .eslintrc.json            # ESLint configuration
└── README.md                 # Documentation
```

## Features

### Commands

- `ferdek.runFile` - Run the current Ferdek file
  - Shortcut: Ctrl+Shift+F5
  
- `ferdek.compileFile` - Compile to C
  - Shortcut: Ctrl+Shift+C

### IntelliSense

- Hover information for keywords
- Code completion for language constructs
- Quick documentation

## Troubleshooting

### Extension not loading

1. Check VS Code version (must be 1.84.0 or higher)
2. Verify all dependencies are installed: `npm install`
3. Check the Extension Development Host console for errors

### Commands not working

1. Ensure Ferdek interpreter/compiler are installed
2. Check Settings for correct executable paths:
   - `ferdek.executable` - Path to ferdek interpreter
   - `ferdek.compilerExecutable` - Path to ferdecc compiler
3. Verify the files are executable

### Syntax highlighting not showing

1. Reload VS Code window
2. Check that `.ferdek` files are recognized
3. Verify `ferdek.tmLanguage.json` is correctly formatted

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT
