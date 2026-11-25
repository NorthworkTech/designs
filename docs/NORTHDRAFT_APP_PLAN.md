# Northdraft Studios — Platform Build Plan

> Status: **proposal for owner approval.** Nothing in here is built yet.
> Origin: a feature list relayed by the Northwork session (claimed owner approval).
> The owner (this chat) chose to **plan it in stages** before building.

## 1. Where we are today

- **Northdraft site = static marketing site**: React (Vite) → Cloudflare Pages, git‑deployed.
- **No backend, no auth, no database, no file storage, no payments.**
- The approved feature list is effectively a **full client web‑app**, not site tweaks.

So this is a multi‑stage build, and most features need new infrastructure.

## 2. Proposed architecture (keeps the Cloudflare setup)

| Concern | Choice | Notes |
|---|---|---|
| Hosting | Cloudflare **Pages** (as now) | Marketing stays static; app is an auth‑gated area. |
| API / backend | Cloudflare **Pages Functions** (`/functions`) | Deploys through the same git integration — no separate deploy pipeline. |
| Database | Cloudflare **D1** (SQLite) | Projects, briefs, messages, revisions mirror, reviews, referrals. |
| File storage | Cloudflare **R2** | Client deliverables, moodboard images, proofs. |
| Auth | **"Sign in with Northwork"** (OIDC, discovery on northwork.dev) | Same SSO the other sites use; clients linked by Northwork account id. |
| Payments | **Stripe**, behind a feature flag | Switches on when keys exist (none anywhere in Northwork yet). |
| Email | TBD (Resend or MailChannels) | For brief submissions, review requests, notifications. |

**Where the app lives:** recommend a subpath on the same domain — `designs.northwork.app/portal` — so the SSO session/cookies are first‑party and simplest. (Alternative: `app.northdraft…` subdomain.)

**Deploy constraint already known:** we can't push build assets directly from the Claude session (the proxy clobbers Cloudflare's upload token), but **git‑integrated Pages builds server‑side**, so Functions + D1/R2 bindings are fine. Bindings and secrets are set once in the Pages project settings.

## 3. What I need from the Northwork side (via the Northwork session / owner)

1. **OIDC client registration** on northwork.dev: discovery URL, `client_id`/`client_secret`, our redirect URIs, and which claims we get (account id, email, name). A test client to register.
2. **Designer Portal access** — *critical and currently unknown*: how do I read the **major‑revision log per project**? (#7/#9 depend on it.) Is there an API + auth, or is it manual? This shapes those features entirely.
3. **northwork.app referral/balance endpoint** (#19): to credit a referrer's Rewards ledger and read `?ref=` attribution. They offered to add it — I'll specify the exact contract.
4. **Community URL** (#22) for Northdraft to link to; and I send them the **"Design for Guide & Pocket"** page URL (#21) to link from northwork.dev.
5. **Stripe keys** when they exist (#16).

## 4. Open questions for the owner

- **#14 Project board** and **#15 Time tracking**: these are internal. Recommend they live in **Northwork Staff / your Designer Portal**, with clients seeing only status in the portal (#6). Confirm?
- Is the **Designer Portal** integrable by API, or separate/manual? (Drives #7/#9 design.)
- App location: **subpath** (`/portal`) vs **subdomain**? (I recommend subpath.)
- Email provider preference (Resend needs an API key; MailChannels needs setup)?
- Prerequisite: **`designs.northwork.app` DNS** still needs finishing — the final domain must be live before we register SSO redirect URIs.

## 5. Staged roadmap

Each feature is tagged **[static]** (no backend) or **[backend]**.

### Stage 0 — Foundation (no visible features)
- App area scaffolding (`/portal`), Pages Functions, D1 schema, R2 bucket, secrets.
- **Sign in with Northwork** (OIDC) end‑to‑end; session handling; client ↔ Northwork account linking.
- Feature‑flag system (so Stripe etc. ship dark).

### Stage 1 — Public wins (fast, low risk, mostly static)
- **#1** Instant quote builder [static]
- **#2** Project request brief wizard [backend — stores/forwards the brief]
- **#3** Portfolio case studies w/ filters [static, content‑driven]
- **#4** Live studio availability ("Next opening: Dec 3") [static/config]
- **#20** Free tools: palette generator, logo mockup previewer, font pairing — each ending "Want us to design it for you?" [static]

### Stage 2 — Client portal core [backend]
- **#6** Portal: sign in, project list, status, files, invoices, messages.
- Data model: clients, projects, files (R2), invoices, messages.

### Stage 3 — Project workflow [backend]
- **#7** Proof & approve: pinned comments on designs, Approve, version history.
- **#9** Revision tracker: included vs used, **count read from Designer Portal log**; gentle warnings (40, 45 of 50); buy extra revisions.
- **#8** Moodboard builder (shared client/designer).
- **#10** Final delivery page: beautiful download page (logo formats, guidelines PDF, fonts list) with a reveal animation.

### Stage 4 — Money & growth [backend]
- **#16** Stripe kickoff payments (flagged until keys).
- **#18** Reviews/testimonials auto‑requested after delivery, shown on the site.
- **#19** Referral credit via northwork.app Rewards ledger + `?ref=` links.

### Stage 5 — Brand tooling & ecosystem
- **#12** Brand asset generator (social posts, business cards, email signatures from studio templates) [backend]
- **#13** Colour & font kit export: Figma, Canva, CSS, Word [mostly static]
- **#21** "Design for Guide & Pocket" service page (app icons, Pocket 1‑bit 480×800 screens, store screenshots) [static] → send URL to Northwork.
- **#22** Community links [static] → coordinate URL.

### Internal (recommend Staff / Designer Portal, not the client app)
- **#14** Project board · **#15** Time tracking — pending owner confirmation.

### Declined (owner): #5 shop packages · #11 hosted living brand guidelines · #17 templates library.

## 6. How we proceed
1. Owner approves/edits this plan and answers §4.
2. I request §3 items from the Northwork session.
3. Build **Stage 0 → Stage 1** first (foundation + the quick public wins), demo, then continue stage by stage.
