# Deploy to GitHub Pages

Live site: **https://aswin603.github.io/aswin-portfolio/**

## One-time setup on GitHub

1. **Create the repo** (if you haven’t):  
   https://github.com/new → name: `aswin-portfolio` → Create repository.

2. **Connect and push** (from your project folder):
   ```bash
   git remote add origin https://github.com/aswin603/aswin-portfolio.git
   git add .
   git commit -m "Portfolio ready for GitHub Pages"
   git branch -M main
   git push -u origin main
   ```

3. **Enable Pages**
   - Repo → **Settings** → **Pages** (under Code and automation).
   - **Build and deployment** → **Source**: **Deploy from a branch**.
   - **Branch**: select **gh-pages** (appears after the first workflow run).
   - **Folder**: **/ (root)** → **Save**.

4. **First deploy**  
   After you push `main`, the **Deploy to GitHub Pages** workflow runs and creates/updates the `gh-pages` branch.  
   If **gh-pages** doesn’t show in the branch list yet, go to **Actions** → **Deploy to GitHub Pages** → **Run workflow** → **Run workflow**, then wait for it to finish and set **Settings → Pages** as above.

Your site will be at **https://aswin603.github.io/aswin-portfolio/** (can take 1–2 minutes after deploy).

## What’s already set in this repo

- **Vite** `base: '/aswin-portfolio/'` in `vite.config.js` so assets and routes work on GitHub Pages.
- **Videos** in Hero and Tech Stack use the base URL so they load on the live site.
- **Workflow** `.github/workflows/deploy-gh-pages.yml`: on every push to `main` it builds and pushes `dist/` to the `gh-pages` branch.
