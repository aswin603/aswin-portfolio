# Aswin K B – Portfolio (React)

Portfolio site built with **React** and **Vite**.

## Setup

```bash
npm install
```

Place your `chipbg.mp4` video in the `public` folder so the Tech Stack section background works. If the file is missing, the section still renders; only the background video will be absent.

## Run locally

```bash
npm run dev
```

## Build for production

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Structure

- `src/App.jsx` – Main app: theme, mobile menu, scroll observer, timeline logic
- `src/components/` – Header, Hero, About, Skills, TechStack, Projects, Experience, Contact, Footer
- `src/hooks/useTheme.js` – Dark/light theme with `localStorage` and system preference
- `src/index.css` – Global styles (variables, layout, sections)

All behavior from the original HTML/CSS/JS version (theme toggle, mobile menu, scroll animations, timeline fill) is preserved.
