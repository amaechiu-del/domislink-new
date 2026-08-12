# VS Code Development Setup Guide

## Quick Start

1. **Install Recommended Extensions**
   - Open VS Code
   - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
   - Type "Extensions: Show Recommended Extensions"
   - Click "Install All" for workspace recommendations

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development**
   ```bash
   npm run dev
   ```

## VS Code Configuration

This project includes optimized VS Code settings for React/TypeScript development.

### Automatic Features

✅ **Format on Save** - Code automatically formatted with Prettier
✅ **ESLint Auto-fix** - Linting errors fixed on save
✅ **Import Organization** - Imports sorted automatically
✅ **IntelliSense** - Smart code completion for TypeScript, React, and Tailwind
✅ **Path Aliases** - `@/` resolves to `src/` directory

### Debugging

#### Debug Current File
1. Open a TypeScript/JavaScript file
2. Press F5
3. Select "Debug Vite Server"

#### Debug in Chrome
1. Start dev server: `npm run dev`
2. Press F5
3. Select "Launch Chrome (Dev Server)"
4. Set breakpoints in your code
5. Use Debug Console for interactive debugging

#### Debug Configuration
Available debug configurations in `.vscode/launch.json`:
- **Launch Chrome (Dev Server)** - Debug app in Chrome
- **Debug Vite Server** - Debug Vite dev server
- **Attach to Chrome** - Attach to running Chrome instance
- **Full Stack Debug** - Debug both server and client

### Tasks

Press `Ctrl+Shift+B` to run build tasks:
- **npm: build** - Build for production (default)
- **npm: dev** - Start development server
- **npm: lint** - Run ESLint
- **npm: format** - Format all files
- **Lint and Build** - Run linter then build

### Keyboard Shortcuts

| Action | Windows/Linux | Mac |
|--------|---------------|-----|
| Format Document | `Shift+Alt+F` | `Shift+Option+F` |
| Quick Fix | `Ctrl+.` | `Cmd+.` |
| Go to Definition | `F12` | `F12` |
| Find All References | `Shift+F12` | `Shift+F12` |
| Rename Symbol | `F2` | `F2` |
| Show Command Palette | `Ctrl+Shift+P` | `Cmd+Shift+P` |
| Toggle Terminal | `` Ctrl+` `` | `` Cmd+` `` |
| Run Build Task | `Ctrl+Shift+B` | `Cmd+Shift+B` |

## Code Quality Tools

### ESLint
Automatically catches common errors and enforces code style.

**Manual Commands:**
```bash
npm run lint        # Check for errors
npm run lint:fix    # Fix auto-fixable errors
```

**Rules:**
- React Hooks rules enforced
- TypeScript best practices
- Console.log warnings (use console.warn or console.error)
- Unused variables warnings

### Prettier
Formats code consistently across the project.

**Manual Commands:**
```bash
npm run format       # Format all files
npm run format:check # Check if files are formatted
```

**Configuration:**
- Single quotes
- No semicolons
- 2-space indentation
- 80 character line width
- LF line endings

### TypeScript
Strong type checking for better code quality.

**Manual Commands:**
```bash
npm run type-check   # Check types without emitting files
```

**Configuration:**
- Strict mode enabled
- Path aliases: `@/*` → `src/*`
- JSX preserved for Vite

## Project Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Check code with ESLint |
| `npm run lint:fix` | Fix ESLint errors automatically |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check if code is formatted |
| `npm run type-check` | Check TypeScript types |
| `npm run validate` | Run lint, type-check, and build |
| `npm run clean` | Clean build artifacts |

## File Organization

```
domislink-new/
├── .vscode/              # VS Code workspace settings
│   ├── settings.json     # Editor settings
│   ├── launch.json       # Debug configurations
│   ├── tasks.json        # Build tasks
│   └── extensions.json   # Recommended extensions
├── src/
│   ├── components/       # React components
│   ├── pages/           # Page components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility libraries
│   ├── utils/           # Helper functions
│   └── main.tsx         # Application entry point
├── public/              # Static assets
├── dist/                # Build output (git ignored)
├── eslint.config.js     # ESLint configuration
├── .prettierrc          # Prettier configuration
├── tsconfig.json        # TypeScript configuration
├── vite.config.js       # Vite configuration
└── package.json         # Dependencies and scripts
```

## Common Workflows

### Adding a New Component

1. Create component file in `src/components/`
2. Use snippet: Type `rafce` and press Tab (with ES7 snippets extension)
3. Import and use in your page
4. Format will happen automatically on save

### Fixing Linting Errors

1. Open Problems panel: `Ctrl+Shift+M`
2. Click on error to jump to location
3. Use Quick Fix: `Ctrl+.`
4. Or run: `npm run lint:fix`

### Debugging Runtime Errors

1. Set breakpoints by clicking left of line numbers
2. Press F5 to start debugging
3. Use Debug Console for evaluating expressions
4. Step through code with toolbar buttons

### Optimizing Imports

1. Place cursor on unused import
2. Press `Ctrl+.` for Quick Fix
3. Select "Remove unused import"
4. Or let it auto-fix on save

## Git Integration

VS Code includes Git features:
- **Source Control Panel**: View changes, stage, commit
- **Diff View**: See file changes inline
- **Merge Conflict Resolution**: Built-in tools
- **Commit Message Templates**: Follow conventional commits

## Tailwind CSS IntelliSense

With the Tailwind CSS extension:
- **Autocomplete**: Class name suggestions
- **Hover Preview**: See CSS for classes
- **Linting**: Invalid class warnings
- **Color Preview**: See colors inline

## Troubleshooting

### Extensions Not Working
1. Reload window: `Ctrl+Shift+P` → "Reload Window"
2. Check extension is enabled
3. Verify extension compatibility with VS Code version

### Format on Save Not Working
1. Check VS Code settings: `editor.formatOnSave` should be true
2. Verify Prettier is set as default formatter
3. Check file type is supported (JS, TS, TSX, JSON, CSS)

### ESLint Not Running
1. Check ESLint extension is installed and enabled
2. Verify `eslint.config.js` exists
3. Check ESLint output panel for errors
4. Restart VS Code

### IntelliSense Not Working
1. Ensure TypeScript language service is running
2. Check `tsconfig.json` includes your files
3. Reload window: `Ctrl+Shift+P` → "Reload Window"
4. Delete node_modules and reinstall: `npm install`

### Debugging Not Starting
1. Verify dev server is running for Chrome debug
2. Check port 5173 is not in use
3. Review launch.json configuration
4. Check Chrome/Node.js is installed

## Best Practices

1. **Save Frequently** - Auto-formatting applies on save
2. **Check Problems Panel** - Fix issues as they appear
3. **Use Git** - Commit frequently with meaningful messages
4. **Run Validation** - Before pushing: `npm run validate`
5. **Keep Dependencies Updated** - Check monthly: `npm outdated`
6. **Write Clean Code** - Let tooling help you maintain quality

## Additional Resources

- [VS Code Docs](https://code.visualstudio.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

**Questions?** Check the project README or open an issue on GitHub.
