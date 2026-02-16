# Deploy to GitHub Pages

Your site will be at **https://aswin603.github.io/aswin-portfolio/**.

## Option 1: Deploy with GitHub Actions (recommended)

This avoids the `spawn ENAMETOOLONG` error on Windows.

1. Push your code (including `.github/workflows/deploy-gh-pages.yml`) to GitHub.
2. In the repo: **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Every push to `main` will build and deploy. You can also run **Actions → Deploy to GitHub Pages → Run workflow** manually.

## Option 2: Deploy locally with `gh-pages`

If you get `Error: spawn ENAMETOOLONG`:

- Move the project to a **shorter path** (e.g. `C:\dev\aswin-portfolio`), then run:
  ```bash
  npm run build
  npm run deploy
  ```
- Or use Option 1 (GitHub Actions) so the deploy runs on GitHub’s servers.

## Vite config

`vite.config.js` already has `base: '/aswin-portfolio/'` so assets load correctly on GitHub Pages.
