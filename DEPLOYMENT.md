# Deployment Guide

This document provides a comprehensive guide for deploying the DomisLink application to various environments.

## Pre-Deployment Checklist

### 1. Code Quality
- [ ] All ESLint errors fixed (`npm run lint`)
- [ ] Code formatted with Prettier (`npm run format`)
- [ ] TypeScript type checks pass (`npm run type-check`)
- [ ] No console.log statements (except console.warn/error)
- [ ] No commented-out code

### 2. Build Verification
- [ ] Production build succeeds (`npm run build`)
- [ ] Build artifacts in `dist/` folder are optimized
- [ ] Check bundle sizes are reasonable
- [ ] Verify source maps are disabled in production

### 3. Environment Configuration
- [ ] Environment variables configured
- [ ] API endpoints updated for production
- [ ] Third-party service keys configured
- [ ] Database connection strings verified

### 4. Security
- [ ] No secrets in code
- [ ] Dependencies audited (`npm audit`)
- [ ] HTTPS enabled
- [ ] CORS properly configured
- [ ] CSP headers configured

### 5. Performance
- [ ] Images optimized
- [ ] Code splitting implemented
- [ ] Lazy loading for routes
- [ ] Caching strategies in place

## Deployment Options

### Option 1: Vercel Deployment (Recommended)

Vercel provides the easiest deployment experience for Vite/React applications.

#### Setup:
1. Install Vercel CLI (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel --prod
   ```

#### Configuration:
The project includes a `vercel.json` file with proper configuration. Vercel will automatically:
- Build the project using `npm run build`
- Deploy the `dist` folder
- Set up HTTPS
- Provide a custom domain

#### Environment Variables:
Set environment variables in Vercel dashboard:
- Go to Project Settings → Environment Variables
- Add your variables (e.g., API keys, endpoints)

### Option 2: Netlify Deployment

#### Manual Deployment:
1. Build the project:
   ```bash
   npm run build
   ```

2. Drag and drop the `dist` folder to Netlify dashboard

#### Netlify CLI:
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist
```

### Option 3: GitHub Pages

For static hosting on GitHub Pages:

1. Update `vite.config.js` with base path:
   ```javascript
   export default defineConfig({
     base: '/repository-name/',
     // ... rest of config
   })
   ```

2. Build and deploy:
   ```bash
   npm run build
   gh-pages -d dist
   ```

### Option 4: Docker Deployment

Build and run with Docker:

```bash
# Build image
docker build -t domislink-app .

# Run container
docker run -p 80:80 domislink-app
```

### Option 5: Traditional Hosting (Apache/Nginx)

1. Build the project:
   ```bash
   npm run build
   ```

2. Upload `dist` folder contents to your web server

3. Configure server to serve SPA:

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

**Apache Configuration (.htaccess):**
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## VS Code Development Setup

### Required Extensions
The project includes recommended extensions in `.vscode/extensions.json`:
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- Path Intellisense
- ES7+ React/Redux/React-Native snippets

### Development Workflow

1. **Start Development Server:**
   ```bash
   npm run dev
   ```
   - Server runs on http://localhost:5173
   - Hot Module Replacement (HMR) enabled
   - Automatic browser refresh

2. **Debug in VS Code:**
   - Press F5 or use Debug panel
   - Select "Launch Chrome (Dev Server)"
   - Set breakpoints in your code
   - Use VS Code debug console

3. **Run Tasks:**
   - Press `Ctrl+Shift+B` (or `Cmd+Shift+B` on Mac)
   - Select from available tasks:
     - Build
     - Lint
     - Format
     - Type Check

4. **Format on Save:**
   - Files automatically format when saved
   - ESLint fixes applied automatically
   - Imports organized

## Automated CI/CD

The project includes GitHub Actions workflow (`.github/workflows/ci-cd.yml`) that:
- Runs on every push and pull request
- Installs dependencies
- Runs linting and type checking
- Builds the application
- Runs security audit
- Deploys to Vercel on main branch (if configured)

### Setting Up GitHub Actions

1. Add secrets to GitHub repository:
   - `VERCEL_TOKEN`: From Vercel account settings
   - `VERCEL_ORG_ID`: From Vercel project settings
   - `VERCEL_PROJECT_ID`: From Vercel project settings

2. Enable GitHub Actions in repository settings

## Monitoring and Maintenance

### Post-Deployment

1. **Verify Deployment:**
   - [ ] Application loads correctly
   - [ ] All routes work
   - [ ] Assets load properly
   - [ ] API calls succeed
   - [ ] Authentication works

2. **Performance Monitoring:**
   - Use Vercel Analytics (if using Vercel)
   - Set up Google Analytics
   - Monitor Lighthouse scores
   - Track Core Web Vitals

3. **Error Tracking:**
   - Set up Sentry or similar
   - Monitor console errors
   - Track failed API calls

### Regular Maintenance

- **Weekly:** Check dependency updates (`npm outdated`)
- **Monthly:** Security audit (`npm audit`)
- **Quarterly:** Review and optimize bundle size
- **As needed:** Update Node.js and npm versions

## Troubleshooting

### Build Fails
1. Clear cache: `npm run clean`
2. Reinstall dependencies: `rm -rf node_modules package-lock.json && npm install`
3. Check Node version: `node --version` (should be 18+)

### Linting Errors
1. Auto-fix: `npm run lint:fix`
2. Format code: `npm run format`
3. Check ESLint config: `eslint.config.js`

### Type Errors
1. Run type check: `npm run type-check`
2. Check `tsconfig.json` settings
3. Verify TypeScript version compatibility

## Support and Resources

- **Documentation:** See project README.md
- **Issues:** Report on GitHub Issues
- **Vite Docs:** https://vitejs.dev
- **React Docs:** https://react.dev
- **Deployment:** Contact DevOps team

---

**Last Updated:** February 2026
**Maintained By:** DomisLink Development Team
