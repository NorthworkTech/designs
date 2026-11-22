# Northdraft Studios

The official website for **Northdraft Studios** — a graphic design studio
offering logos, print, presentations, websites, and physical products.

A clean, editorial single-page site built with **React + Vite**,
deployed on **Cloudflare Pages** at **designs.northwork.app**.

## Tech stack

- [React 18](https://react.dev/)
- [Vite 6](https://vitejs.dev/) (dev server + build)
- Plain CSS (design tokens in `:root`), no UI framework

## Project structure

| Path | Purpose |
|------|---------|
| `index.html` | Vite entry HTML |
| `src/main.jsx` | App bootstrap |
| `src/App.jsx` | Page sections (Nav, Hero, Services, Products, Reviews, FAQ, Contact, Footer) |
| `src/styles.css` | Styling and responsive layout |
| `public/logo.svg` | Brand logo + favicon (placeholder — swap for the real Northdraft Studios logo) |
| `public/_redirects` | Cloudflare Pages SPA fallback |

## Local development

```bash
npm install
npm run dev      # start dev server at http://localhost:5173
```

## Production build

```bash
npm run build    # outputs static site to dist/
npm run preview  # preview the built site locally
```

## Deploy to Cloudflare Pages

**Git-based (recommended, continuous deploy):**

1. In the [Cloudflare dashboard](https://dash.cloudflare.com/) → **Workers & Pages → Create → Pages → Connect to Git**.
2. Pick the `bighappysmiley/designs` repo and this branch.
3. Build settings:
   - **Framework preset:** Vite (or None)
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. **Save and Deploy.** Every push redeploys. `public/_redirects` handles SPA routing.
5. **Custom domain:** project → **Custom domains → Set up a domain** → `designs.northwork.app`
   (Cloudflare adds the DNS record automatically if `northwork.app` is on this account).

**CLI (optional):**

```bash
npm install -g wrangler
npm run build
wrangler pages deploy dist --project-name=northwork
```

## Content sections

- **Hero** — brand intro and primary call to action
- **Services** — list + live preview (Logos, Posters & Flyers, Presentations, Websites, Business Cards & Stickers)
- **Products** — physical product offering (the only "Get a Quote")
- **Reviews** — client testimonial
- **FAQ** — common questions (with FAQ structured data)
- **Contact** — message form (opens an email draft) plus Dribbble, email, phone

## Editing

Service copy lives in the `SERVICES` array in `src/App.jsx`. Brand colors and
spacing are CSS custom properties at the top of `src/styles.css` (`:root`).
