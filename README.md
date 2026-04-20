# Portfolio — local development

Pure HTML/CSS/JS. No build step, no bundler, no framework install. Just serve the folder.

## Requirements
- Any static file server (because ES modules & babel inline JSX require `http://` — `file://` won't work)
- A modern browser (Chrome, Firefox, Safari, Edge)

## Run it locally

Pick one of these — whatever you have:

### Option 1 — Node (npx, no install)
```bash
cd path/to/portfolio
npx serve .
# or
npx http-server . -p 3000
```

### Option 2 — Python (comes with macOS / Linux)
```bash
cd path/to/portfolio
python3 -m http.server 3000
```

### Option 3 — VS Code
Install the **Live Server** extension, right-click `Portfolio.html` → *Open with Live Server*.

### Option 4 — PHP / any other static server
```bash
php -S localhost:3000
```

Then open **http://localhost:3000/Portfolio.html**.

## Project structure
```
Portfolio.html          # entry point — layout, styles, chrome, theme, cursor
src/
  animations.js         # canvas bg + scroll progress + parallax + magnetic + scramble + counters
  data.jsx              # CV content (single source of truth)
  hero.jsx              # terminal-CLI hero that types itself
  experience.jsx        # index-style experience timeline
  sections.jsx          # about / skills / contact
  main.jsx              # React mounts + smooth-scroll
assets/
  Nikola-Cehic-CV.pdf
```

## Editing content
All CV content lives in **`src/data.jsx`**. Edit there, save, refresh.

## Notes
- React + Babel load from unpkg CDN. For fully offline, download `react.development.js`, `react-dom.development.js`, and `@babel/standalone/babel.min.js` into `vendor/` and rewrite the script tags in `Portfolio.html`.
- No trackers, no analytics, no build. Deploy by copying the folder to any static host (Vercel, Netlify, Cloudflare Pages, GitHub Pages, S3).

## Deploy
```bash
# Vercel
npx vercel --prod

# Netlify
npx netlify deploy --prod --dir=.

# GitHub Pages
# Push to a repo, enable Pages on the main branch root
```

Entry file is `Portfolio.html` — rename to `index.html` if your host insists on it.
