# Portfolio (`innovator-repo/portfolio`)

Personal portfolio site built with Astro 6, vanilla JavaScript, and plain CSS showcasing Salesforce architecture, cloud systems, and native software engineering.

## Architecture & Layout

- **`src/data/site.js`**: Central data store containing all copy, roles, projects, credentials, and skill taxonomies. Edit here to update content.
- **`src/pages/index.astro`**: Main page shell importing modular Astro sections.
- **`src/components/`**: Clean UI sections (`Hero.astro`, `Experience.astro`, `Work.astro`, `Skills.astro`, `Credentials.astro`, `Contact.astro`, `DevConsole.astro`).
- **`src/scripts/`**: Framework-free vanilla JS:
  - `app.js`: Navigation state, section reveal animations, scroll progress.
  - `hero.js`: Interactive canvas-based Salesforce org skills graph.
- **`src/styles/`**: Plain CSS with CSS custom properties (`tokens.css`, `global.css`). Dark aurora theme with semantic skill categories.
- **`public/`**: Static public assets (favicons, sitemap, robots.txt).

## Development & Build Commands

```sh
npm run dev        # Starts local development server with hot reload
npm run build      # Builds static site to dist/
npm run preview    # Locally previews production build from dist/
```

## Token Hygiene & Operating Rules

- **Excluded Paths**: Never read or search `dist/`, `.astro/`, or `node_modules/`. All source logic lives inside `src/`.
- **Content Updates**: Keep edits surgical inside `src/data/site.js` when modifying projects, roles, skills, or personal descriptions.
- **Accessibility & Performance**: Maintain zero framework runtime overhead, ensure CSS animations respect `prefers-reduced-motion`, and preserve lightweight canvas lifecycle pausing when offscreen.
