# Azix by Axis: website (React)

React 18 + Vite. One page, no backend. The 3D phones and monitor use three.js and load on demand,
so the page paints first. If WebGL isn't available the flat screenshots are shown instead.

## Run it
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve dist/ locally
```

## Deploy on Vercel
`vercel.json` is already set up (Vite preset, `dist` output, long caching for images, video and built assets).

- **Dashboard:** push this folder to a Git repo, then Vercel > Add New > Project > import it. Defaults work.
- **CLI:** `npx vercel` for a preview, `npx vercel --prod` for production.
- **Domain:** Project > Settings > Domains.

## Structure
```
index.html            page head, meta tags, fonts
src/main.jsx          entry
src/App.jsx           page: assembles the sections
src/styles.css        all styles
src/components/
  Header, Hero        top bar; headline + 3D devices
  Feature             a text + phones section (layout: '', 'flip', 'stack')
  Modules, Insights   module cards; insights dashboard
  DesktopTabs         desktop screenshots with tabs
  Promo               autoplay preview strip + full-screen player
  Sections            problem, how it works, audit, growth, contact, footer
  Text, Devices3D     animated headings / labels; the 3D canvas wrapper
src/hooks/            useInView, useReveal, useNarrow
src/three/devices.js  the 3D scenes (phone, monitor, presets)
public/               screenshots, promo video (landscape + portrait), favicon
```

## Editing content
- Section copy lives in the components (`Modules.jsx` for the module cards, `Sections.jsx` for the rest, `App.jsx` for the phone sections).
- Contact details are in `Sections.jsx` (`CONTACTS`).
- Screens use sample data.

## Before going live
- Fonts load from Google Fonts (see `index.html`). Self-host them if you want no third-party request.
- Add `<link rel="canonical">` and a `sitemap.xml` once the domain is known.
- three.js is pinned to 0.128.0 on purpose (the 3D code uses its API). Don't upgrade without testing.
