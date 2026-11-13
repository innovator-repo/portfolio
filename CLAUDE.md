# Portfolio (`innovator-repo/portfolio`)

Personal portfolio site built with Astro 6, vanilla JavaScript, and plain CSS showcasing Salesforce architecture, cloud systems, and native software engineering.

## Architecture & Layout

- **`src/data/site.js`**: Central data store containing all copy, roles, projects, credentials, and skill taxonomies. Edit here to update content.
- **`src/pages/index.astro`**: The single page. All sections are rendered here from `site.js` data.
- **`src/scripts/site.js`**: Framework-free vanilla JS: scroll-driven 3D hero window, section reveals, card tilt and glare, count-ups, interactive Transaction Inspector demo, schedule switches, light/dark toggle (persisted in `localStorage`).
- **`src/styles/site.css`**: Plain CSS with custom properties. Light Apple-style theme by default, dark via `html[data-skin=dark]`.
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
- **Accessibility & Performance**: Maintain zero framework runtime overhead, ensure animations respect `prefers-reduced-motion`, and keep tilt effects disabled on touch devices.
