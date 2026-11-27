<div align="center">

# Northdraft Studios

**The official website for Northdraft Studios — a graphic design studio for logos, brand identity, print, presentations, and websites.**

Part of the [Northwork](https://northwork.app) ecosystem · Live at **[designs.northwork.app](https://designs.northwork.app)**

Built with React · Vite · Cloudflare Pages

</div>

---

## Overview

A fast, editorial single-page application that doubles as a marketing site and a
lightweight client toolkit. Alongside the studio's services, it offers an instant
quote builder, a guided project-brief wizard, and a small suite of free design
tools — all static, with no tracking and no sign-up required.

## Features

- **Marketing site** — hero, services (interactive list with live previews),
  physical products, reviews, and an FAQ with structured data for search.
- **Instant quote builder** (`/quote`) — pick a service and options for a live
  estimate, then flow straight into a brief.
- **Project brief wizard** (`/start`) — a short, guided form that compiles a
  clean brief for the design team.
- **Free tools** (`/tools`) — colour palette generator, font pairing, logo
  mockup previewer, and a colour & font kit exporter (CSS, Figma, Canva, Word).
- **Design for Guide & Pocket** (`/guide-pocket`) — a dedicated service page for
  app icons, Pocket e-ink screens, and store screenshots.
- **Accessible & responsive** — semantic markup, keyboard support, and
  `prefers-reduced-motion` handling throughout.

## Tech stack

| | |
|---|---|
| **Framework** | [React 18](https://react.dev/) |
| **Build** | [Vite 6](https://vitejs.dev/) |
| **Routing** | [React Router 7](https://reactrouter.com/) |
| **Styling** | Hand-written CSS with design tokens in `:root` (no UI framework) |
| **Hosting** | [Cloudflare Pages](https://pages.cloudflare.com/) (continuous deploy) |

## Getting started

Requires **Node.js 20+**.

```bash
npm install      # install dependencies
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build → dist/
npm run preview  # preview the production build locally
```

## Project structure

```
designs/
├─ index.html              # Vite entry
├─ public/
│  ├─ logo.png             # brand mark (nav, favicon, OG)
│  ├─ og-image.png         # social share image
│  ├─ _redirects           # Cloudflare Pages SPA fallback
│  ├─ robots.txt
│  └─ sitemap.xml
└─ src/
   ├─ main.jsx             # app bootstrap + router
   ├─ App.jsx              # marketing home + route definitions
   ├─ styles.css           # design tokens + all styling
   └─ pages/
      ├─ QuoteBuilder.jsx  # /quote
      ├─ BriefWizard.jsx   # /start
      ├─ ToolsHub.jsx      # /tools
      ├─ GuidePocket.jsx   # /guide-pocket
      └─ tools/            # palette, font pairing, logo mockup, kit export
```

### Routes

| Path | Page |
|------|------|
| `/` | Marketing home |
| `/quote` | Instant quote builder |
| `/start` | Project brief wizard |
| `/tools` | Free tools hub |
| `/tools/palette` · `/tools/fonts` · `/tools/mockup` · `/tools/kit` | Individual tools |
| `/guide-pocket` | Design for Guide & Pocket |

## Deployment

The site deploys to **Cloudflare Pages** via Git integration — every push to the
production branch triggers a build and deploy.

**Build settings**

| Setting | Value |
|---|---|
| Framework preset | Vite |
| Build command | `npm run build` |
| Output directory | `dist` |

SPA routing is handled by `public/_redirects`. The custom domain
`designs.northwork.app` is managed in the Cloudflare Pages project settings.

## Configuration

Common edits, all in source — no CMS required:

| Change | Where |
|---|---|
| Services & copy | `SERVICES` in `src/App.jsx` |
| Quote pricing | `SERVICES` / `RUSH_MULTIPLIER` in `src/pages/QuoteBuilder.jsx` |
| Studio availability | `AVAILABILITY` in `src/App.jsx` |
| Case studies | `CASE_STUDIES` in `src/App.jsx` (section appears once populated) |
| Brand colours, type & spacing | design tokens under `:root` in `src/styles.css` |

## Brand

**Northdraft Studios** is the design studio within the **Northwork** ecosystem
([northwork.app](https://northwork.app)). The wordmark pairs a gradient wave
mark with an EB Garamond logotype; the product UI uses Bricolage Grotesque.

## Contributing

This is an internal Northwork project. If you're on the team:

1. Create a feature branch from the production branch.
2. Run `npm run build` and `npm run preview` to verify your change locally.
3. Open a pull request — Cloudflare Pages builds a preview deployment for every PR.

Keep changes consistent with the existing design tokens and component patterns,
and avoid adding UI dependencies unless there's a clear need.

## License

© Northdraft Studios / Northwork. All rights reserved.

This repository and its contents — including the Northdraft Studios name, logo,
and brand assets — are proprietary and provided for authorized use only. No part
may be copied, modified, distributed, or used to create derivative works without
prior written permission.

---

<div align="center">
<sub>© Northdraft Studios · Northwork</sub>
</div>
