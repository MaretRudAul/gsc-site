# Vanderbilt GSC Website

Docusaurus-based static site for the Vanderbilt Graduate Student Council.
Deployed on Vercel. Built with React + TypeScript + Markdown.

---

## Getting started

```bash
npm install
npm start        # dev server at localhost:3000
npm run build    # production build → ./build/
npm run serve    # preview the production build locally
```

---

## Project structure

```
gsc-site/
├── docusaurus.config.ts     # Site config: navbar, footer, announcement bar, plugins
├── sidebars.ts              # Sidebar definitions for docs sections
├── src/
│   ├── css/custom.css       # All custom styles (GSC design system)
│   └── pages/
│       ├── index.tsx        # Homepage (hero, quick actions, events, who we are)
│       ├── events.tsx       # Events page (upcoming + past events list)
│       └── contact.tsx      # Contact page (emails, socials, co-sponsorship)
├── docs/
│   ├── about/               # Mission, programs/committees, meetings
│   ├── officers/            # Executive board, department reps
│   ├── policies/            # Governance docs, procedures, honor council
│   └── resources/           # Funding overview, travel grant, campus resources
└── static/
    └── img/                 # Logo and images
```

---

## Maintenance tasks

### Update the announcement bar
Edit `docusaurus.config.ts` → `themeConfig.announcementBar.content`.
Change the GBM date each month. Also update the `id` field so returning visitors see the new bar.

```ts
announcementBar: {
  id: 'gbm_apr_2026',   // change this each time
  content: '📅 Next GBM: <strong>Apr 7 · 6pm · Alumni Hall 201</strong>',
  ...
}
```

### Update the homepage events list
Edit `src/pages/index.tsx` → the `upcomingEvents` array near the top of the file.

### Update officer information
Edit `docs/officers/executive-board.md`. Each officer has a name, email, and role description.

### Add GBM minutes
Add a link to `docs/policies/governance-documents.md` under the "Recent meeting dates" section.
Meeting slides and full minutes live in the [GSC Box folder](https://vanderbilt.box.com/s/crffhvfojzjvgwv7jia5n0gwzyzyjd97).

### Update travel grant application link
The form URL changes each academic year. Update it in:
- `docs/resources/travel-support.md`
- `docs/resources/funding-overview.md`

---

## Design system

All custom CSS is in `src/css/custom.css`. Key classes:

| Class | Used for |
|-------|---------|
| `.gsc-card` | General purpose card with border and hover shadow |
| `.gsc-quick-card` | Homepage quick-action cards (colored top border variants: `--gold`, `--teal`, `--blue`, `--coral`) |
| `.gsc-event-row` | Event list items with date column |
| `.gsc-badge` | Event type pills (variants: `--meeting`, `--social`, `--academic`) |
| `.gsc-officer-card` | Officer listing cards |
| `.gsc-contact-card` | Contact info cards |
| `.gsc-section-label` | Uppercase section divider labels |
| `.gsc-callout` | Gold left-border info boxes |
| `.gsc-hero` | Homepage hero section |
| `.gsc-strip` | "Who we are" full-width strip |

Brand colors:
- Gold: `#CFAE70` / `#C9A227` (primary)
- Black: `#1A1A1A`
- CSS variable: `var(--ifm-color-primary)`

---

## Search

Search is powered by `@docusaurus/plugin-search-local`. It indexes all docs and pages automatically at build time. No API key or external service needed.

---

## Deployment (Vercel)

1. Push to GitHub
2. Import repo in Vercel
3. Framework: **Other** (Docusaurus handles its own build)
4. Build command: `npm run build`
5. Output directory: `build`

Before deploying, update `url` in `docusaurus.config.ts` to your actual Vercel URL.

---

## Adding new pages

**New docs page** (e.g., a new resource):
1. Create `docs/resources/my-new-page.md` with frontmatter: `title:` and `sidebar_label:`
2. Add it to `sidebars.ts` under `resourcesSidebar`

**New standalone page** (e.g., a custom layout page):
1. Create `src/pages/my-page.tsx`
2. Add a navbar link in `docusaurus.config.ts` if needed

---

## Key external links to keep updated

| Link | Location |
|------|----------|
| Travel grant form URL | `docs/resources/travel-support.md`, `docs/resources/funding-overview.md` |
| GSC Box folder | `docs/policies/governance-documents.md`, `docs/policies/procedures.md` |
| Google Calendar subscribe link | `src/pages/index.tsx`, `src/pages/events.tsx`, `docs/about/meeting-information.md` |
| AnchorLink org page | Multiple files — search for `anchorlink.vanderbilt.edu` |

---

## Deploying to Vercel

The `vercel.json` in the root handles all deployment config automatically.

1. Push this repo to GitHub (if not already)
2. Go to [vercel.com](https://vercel.com) and click **Add New Project**
3. Import your GitHub repo
4. Vercel will auto-detect the settings from `vercel.json` — no changes needed
5. Click **Deploy**

On every push to `main`, Vercel will automatically rebuild and redeploy.

After your first deploy, update the `url` field in `docusaurus.config.ts` to match your actual Vercel URL (e.g. `https://gsc-site-adam924.vercel.app`).
