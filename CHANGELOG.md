# Change Log

All notable changes to the "vscode-ferdek" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [0.1.0] - 2025-11-26

### Added
- Initial release of Ferdek Language Support for VS Code
- Syntax highlighting for Ferdek language
- Code snippets for common patterns
  - Program structure
  - Variable and array declarations
  - Control flow (if/else, while loops)
  - Function definitions and calls
  - String operations (KANAPA module)
  - File I/O operations (KIBEL module)
  - Error handling (try/catch)
  - Module imports
- Language configuration
  - Comment recognition
  - Bracket pair matching
  - Code folding regions
- Commands
  - `ferdek.runFile` - Run Ferdek program (Ctrl+Shift+F5)
  - `ferdek.compileFile` - Compile to C (Ctrl+Shift+C)
- Features
  - Hover information for keywords
  - Intelligent code completion
  - IntelliSense support
- Settings
  - Path to Ferdek interpreter
  - Path to Ferdek compiler
  - Output channel visibility

### Features Planned
- [ ] Language Server Protocol (LSP) support
- [ ] Debugging support
- [ ] Integrated REPL
- [ ] Better error reporting
- [ ] Project templates
- [ ] Online documentation links
