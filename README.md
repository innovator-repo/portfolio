# Portfolio

Personal portfolio site, live at https://innovator-repo.github.io/portfolio/

## Stack

- Astro 6, static output
- Vanilla JavaScript for the interactions (`src/scripts/site.js`); no framework runtime
- Plain CSS (`src/styles/site.css`)

## Editing content

All copy and data live in `src/data/site.js`. Edit that file; the page in `src/pages/index.astro` renders from it.

## Scripts

- `npm run dev` starts the dev server
- `npm run build` builds to `dist/`
- `npm run preview` serves the production build locally

## Layout

```
src/data/site.js        all content: roles, projects, solutions, AI section, stats
src/pages/index.astro   the single page, rendered from site.js
src/styles/site.css     all styles; light by default, dark via data-skin
src/scripts/site.js     scroll depth, reveals, tilt, demo console, theme toggle
public/                 static assets
```

## Deployment

`.github/workflows/deploy.yml` builds on every push and pull request. Pushes to `main` (and manual runs) publish `dist/` to the `gh-pages` branch. If the site is not being served, set Settings > Pages > Deploy from branch > `gh-pages` / root.

## Design notes

Light, Apple-inspired design: large type, soft depth, glass navigation and a scroll-driven 3D product window. A dark mode is one click away.