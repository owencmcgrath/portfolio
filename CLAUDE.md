# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is Owen's personal portfolio website — a static site with no build tools, framework, or package manager. HTML and CSS files are served directly.

## Development

No build step required. Open any HTML file in a browser or use a local static server:

```bash
python3 -m http.server 8080
```

## Architecture

Each portfolio section lives in its own directory with a paired HTML + CSS file:

- `index.html` / `styles.css` — landing page (bio, navigation)
- `ethos/` — personal philosophy page
- `fnbo/` — FNBO internship pages (swe.html for 2025 SWE role, etl.html for 2024 ETL role)
- `mobs/` — Air Force-funded research group page
- `pattern/` — business analytics internship page
- `projects/` — personal projects showcase (with demo videos)
- `writings/` — long-form articles; each article gets its own subdirectory under `writings/`

Assets (images, videos) live in `assets/` subdirectories within each section.

## Conventions

- Each page uses `<base href="https://owencmcgrath.com/">` for absolute URL resolution — link `href` values should be root-relative (e.g., `writings/motm/`).
- JavaScript is minimal and limited to Intersection Observer for lazy-loading project demo videos.
- Styling uses Flexbox and CSS custom properties; no preprocessors.
- New writing articles follow the pattern: `writings/<slug>/<slug>.html` with a paired CSS file.
