# Branden Labrador — Portfolio

A static, privacy-conscious professional portfolio focused on enterprise SaaS support, production systems, data, software, and applied AI work.

## Preview locally

Because the site uses plain HTML, CSS, and JavaScript, it can be opened directly or served with any static web server.

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Validate

```bash
npm test
```

The validation script checks required page structure and local asset references. The site is intentionally buildless and compatible with GitHub Pages.

## Deployment

The production site is served from the `main` branch through GitHub Pages. The redesign is developed on `portfolio-redesign` and should be reviewed before it is merged into `main`.

## Project structure

- `index.html` — page content, metadata, and semantic structure
- `css/style.css` — design system, themes, responsive behavior, and motion preferences
- `index.js` — theme, navigation, reveal behavior, and case-study dialogs
- `assets/portfolio/` — project imagery and social-sharing preview
- `scripts/validate.mjs` — lightweight build validation
