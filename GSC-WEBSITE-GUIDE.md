# GSC Website — Maintenance & Update Guide

**For:** Vanderbilt Graduate Student Council, incoming Media/PR Chair and Executive Board  
**Last updated:** April 2026  
**Site:** https://gsc-site.vercel.app  
**Repository:** https://github.com/Adam924/gsc-site

---

## Table of Contents

1. [Overview — how the site works](#1-overview)
2. [Getting started — tools you need](#2-getting-started)
3. [Most common tasks (start here)](#3-most-common-tasks)
   - [Update the "Next GBM" date](#31-update-the-next-gbm-date)
   - [Update upcoming events](#32-update-upcoming-events)
   - [Update the executive board](#33-update-the-executive-board)
   - [Add officer photos](#34-add-officer-photos)
   - [Update any text on a doc page](#35-update-any-doc-page-text)
4. [Automation — what updates itself](#4-automation)
5. [Images — how to add and update](#5-images)
6. [Google Calendar integration](#6-google-calendar)
7. [Site structure — where everything lives](#7-site-structure)
8. [Deploying changes](#8-deploying-changes)
9. [Semester checklist](#9-semester-checklist)
10. [Troubleshooting](#10-troubleshooting)

---

## 1. Overview

The GSC site is built with **Docusaurus 3** (a React-based static site generator) and hosted on **Vercel** with automatic deployment from GitHub.

**The workflow is always the same:**
1. Edit a file in GitHub (or locally)
2. Commit the change
3. Vercel automatically rebuilds and redeploys in ~60 seconds
4. Changes are live

You do **not** need to know React or TypeScript to do most updates. The majority of content lives in plain Markdown (`.md`) files.

---

## 2. Getting started

### Option A — Edit directly on GitHub (easiest, no install required)

1. Go to https://github.com/Adam924/gsc-site
2. Navigate to the file you want to edit
3. Click the pencil ✏️ icon in the top-right of the file view
4. Make your changes
5. Click **Commit changes** at the bottom
6. Vercel will auto-deploy in about 60 seconds

> ✅ This works for **all Markdown files** (`.md`) and most simple text changes.

### Option B — Edit locally (recommended for bigger changes)

**Prerequisites:** Node.js 20+ and Git installed.

```bash
# 1. Clone the repo (one-time setup)
git clone https://github.com/Adam924/gsc-site.git
cd gsc-site

# 2. Install dependencies (one-time setup)
npm install

# 3. Start local dev server
npm start
# → Opens http://localhost:3000 with live reload

# 4. Make your changes, then:
git add .
git commit -m "describe what you changed"
git push
# → Vercel auto-deploys
```

---

## 3. Most common tasks

### 3.1 Update the "Next GBM" date

There are **two places** to update — both take 30 seconds:

#### A) Site-wide announcement bar (appears on every page)

**File:** `docusaurus.config.ts`

Find the `announcementBar` section:
```ts
announcementBar: {
  id: 'gbm_apr7_2026',      // ← CHANGE THIS to something new each time
  content: 'Next General Body Meeting: <strong>Apr 7, 2026 · 6–7 pm · Alumni Hall 201</strong> ...',
  //                                                 ↑ CHANGE THIS DATE
```

**Rules:**
- Always change **both** `id` **and** `content` when updating the date
- Changing the `id` forces the bar to reappear for users who previously dismissed it
- Suggested id format: `gbm_sep2_2026`, `gbm_oct7_2026`, etc.

#### B) Homepage quick-action card

**File:** `src/pages/index.tsx`

Find the `quickActions` array and look for the entry with `title: 'Next GBM'` — if it exists, update `desc` with the new date/time/location.

> **Note:** The homepage also has a **dynamic banner** (see Section 4) that tries to auto-fetch the next GBM from Google Calendar. If the calendar is up to date, you may not need to edit index.tsx at all.

---

### 3.2 Update upcoming events

**File:** `src/pages/events.tsx`

Find the `events` array near the top of the file:

```typescript
const events: Event[] = [
  {
    month: 'APR',       // ← 3-letter all-caps month abbreviation
    day: '7',           // ← Day number as a string
    title: 'General Body Meeting + Elections',
    time: '6–7 pm',
    location: 'Alumni Hall 201 (+ Zoom)',
    description: 'Monthly general body meeting...',
    badge: 'Meeting',
    badgeType: 'meeting',   // ← 'meeting' | 'social' | 'academic'
    rsvpUrl: 'https://anchorlink.vanderbilt.edu/organization/GSC',
  },
  // ... more events
];
```

**To add a new event:** Copy one of the existing blocks, paste it into the array, and fill in the new details.

**To remove a past event:** Delete the block, or move it to the `pastEvents` array below:

```typescript
const pastEvents = [
  { title: 'Fall Social', date: 'Sept 12, 2025', badge: 'Social', badgeType: 'social' as const },
  // ← paste moved events here, using this simpler format
];
```

Also update the homepage preview (3 events max):

**File:** `src/pages/index.tsx` → `upcomingEvents` array (same format)

---

### 3.3 Update the executive board

**File:** `docs/officers/executive-board.md`

Each officer is an `<OfficerCard>` component tag:

```mdx
<OfficerCard
  name="AC Lane"
  role="President"
  email="alicia.c.lane@vanderbilt.edu"
  bio="Presides over GBMs and exec meetings..."
/>
```

**To update an officer:**
1. Change `name`, `email`, and `bio` to the new person's details
2. Leave `role` the same unless the position title changed

**For unfilled positions**, use:
```mdx
<OfficerCard
  name="TBA"
  role="Secretary"
  bio="Records meeting minutes..."
/>
```

**To change the academic year heading:**
Change `## 2025–26 Board` to `## 2026–27 Board` (etc.)

---

### 3.4 Add officer photos

1. **Get a photo.** A square headshot works best (LinkedIn photo is fine). Minimum 200×200 px.

2. **Save it** to: `static/img/officers/firstname-lastname.jpg`
   - Use lowercase, hyphens instead of spaces
   - Example: `static/img/officers/ac-lane.jpg`

3. **Add the `photo` prop** to the OfficerCard in `executive-board.md`:
   ```mdx
   <OfficerCard
     name="AC Lane"
     role="President"
     email="alicia.c.lane@vanderbilt.edu"
     bio="..."
     photo="/img/officers/ac-lane.jpg"    ← add this line
   />
   ```

4. Commit and push. Vercel redeploys in ~60 seconds.

> If no `photo` is provided, a **gold circle with initials** is shown automatically — it looks clean until real photos are added.

---

### 3.5 Update any doc page text

All content under the navigation dropdowns (Officers, Resources, Advocacy, Policies, About) lives in the `docs/` folder as plain Markdown files:

| Nav item | Folder | Example file |
|---|---|---|
| Officers → Executive Board | `docs/officers/` | `executive-board.md` |
| Resources → Funding | `docs/resources/` | `funding-overview.md` |
| Advocacy | `docs/advocacy/` | `advocacy.md` |
| Policies → Governance | `docs/policies/` | `governance-documents.md` |
| About → Mission | `docs/about/` | `mission-role.md` |

Just open the file, edit the text, and commit. Markdown formatting:
- `**bold**` → **bold**
- `*italic*` → *italic*
- `## Heading` → section heading
- `[link text](https://example.com)` → hyperlink
- `- item` → bullet point

---

## 4. Automation

The following things **update themselves** with no action required:

### ✅ Live Google Calendar embed (events page)
The embedded calendar on the Events page always shows the **current date range**. It will never show stale 2022–23 events again.

**How it works:** The calendar iframe URL includes a dynamic `dates=` parameter computed fresh each time the page loads, anchoring it to today's date.

**You still need to:** Add new events to the GSC Google Calendar so they appear in the embed. See Section 6 for how.

### ✅ "Next Meeting" dynamic banner (homepage)
The sticky dark banner at the top of the homepage **tries to auto-fetch** the next General Body Meeting from the GSC Google Calendar public feed.

**How it works:** On page load, it fetches the calendar's public JSON feed (no API key needed) and finds the next upcoming event with "General Body" in the title. If the fetch fails (network error, etc.) it falls back to the hardcoded date in the `FALLBACK_MEETING` object in `src/pages/index.tsx`.

**Limitation:** This depends on the Google Calendar being kept up to date. If a GBM is cancelled, removed from the calendar, or renamed, the banner may show wrong info. Keep the calendar current.

### ✅ Vercel auto-deployment
Every push to the `main` branch on GitHub automatically triggers a Vercel rebuild. Changes go live in ~60 seconds with no manual deployment needed.

### ✅ Copyright year in footer
`© ${new Date().getFullYear()} Vanderbilt GSC` — updates automatically each year.

---

## 5. Images

### Hero image (homepage top)
**File:** `src/pages/index.tsx`  
**Variable:** `GSC_HERO` near the top of the file

```typescript
const GSC_HERO = 'https://cdn.vanderbilt.edu/.../Vanderbilt-GSC-3.png';
//                ↑ Replace with any publicly accessible image URL
```

You can use:
- A URL from Vanderbilt's CDN (already in use)
- A URL from any publicly hosted image (Google Drive public link, etc.)
- A local file: put it in `static/img/` and reference it as `/img/filename.jpg`

### Officers photo (homepage right column)
**Variable:** `GSC_OFFICERS_2425` in `src/pages/index.tsx`

Update at the start of each academic year with the new board photo.

### Events page banner
**Variable:** `BANNER_SRC` in `src/pages/events.tsx`

### Doc page sidebar image (right column on all /docs pages)
**CSS variable:** `--gsc-sidebar-right-img` in `src/css/custom.css`

```css
:root {
  --gsc-sidebar-right-img: url('https://cdn.vanderbilt.edu/.../Vanderbilt-GSC-3.png');
  /*                             ↑ Change this URL to update the sidebar image */
}
```

### Adding photos from Instagram

Instagram does not provide a public API for embedding photos without an access token (which requires a developer app). The practical options are:

1. **Manual:** Download the photo from Instagram, upload it to `static/img/`, and reference it with `/img/filename.jpg`.
2. **Embed a post:** Use Instagram's built-in embed code (click ··· → Embed on any public post). Paste the `<blockquote>` HTML into a `.md` file using a raw HTML block.

---

## 6. Google Calendar

### Calendar ID
```
ajc2ZGhzczIwZHE4Ymg2aG1jNDVpYmxkaGtAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ
```

This appears in:
- `src/pages/index.tsx` — `CALENDAR_ID` constant
- `src/pages/events.tsx` — `CALENDAR_ID` constant
- `docusaurus.config.ts` — announcementBar links
- Several doc page links

If the GSC ever gets a new Google Calendar, update `CALENDAR_ID` in the first two files and the links in the config.

### Adding events to the calendar

1. Open Google Calendar and sign in with the GSC account.
2. Click **+ Create** and fill in the event title, date, time, and location.
3. **For GBMs specifically:** The title must include "General Body" for the auto-detection in the homepage banner to work.
4. Save the event — it will appear in the live calendar embed on the Events page within minutes.

### Why AnchorLink can't auto-sync

AnchorLink does not expose a public API or iCal feed for external apps to read. This means events must be **manually added** to both AnchorLink (for RSVP tracking) and Google Calendar (for the website). This is a limitation of Vanderbilt's AnchorLink platform.

**Recommended workflow:** When you create an event in AnchorLink, immediately also add it to the GSC Google Calendar so the website stays in sync.

---

## 7. Site structure

```
gsc-site/
│
├── docusaurus.config.ts    ← Site title, navbar items, announcement bar,
│                             footer links. Edit here for site-wide changes.
│
├── sidebars.ts             ← Controls which docs appear in which dropdown
│                             menus and in what order. Edit if adding new pages.
│
├── src/
│   ├── pages/
│   │   ├── index.tsx       ← Homepage (hero, quick actions, events, stats)
│   │   ├── events.tsx      ← Events page + live calendar embed
│   │   └── contact.tsx     ← Contact page
│   │
│   ├── components/
│   │   └── OfficerCard.tsx ← Reusable officer profile card
│   │
│   └── css/
│       └── custom.css      ← ALL styling. Vanderbilt gold tokens, card
│                             styles, banner, officer cards, responsive rules.
│
├── docs/                   ← All content pages (plain Markdown)
│   ├── about/              ← Mission, committees, meeting info
│   ├── advocacy/           ← Advocacy work and resolutions
│   ├── officers/           ← Executive board, department reps
│   ├── policies/           ← Governance, honor council, procedures
│   └── resources/          ← Funding, student support, spaces
│
└── static/
    └── img/                ← Static image files
        ├── officers/       ← Officer headshots (add here)
        └── gsc-logo-temp.png
```

---

## 8. Deploying changes

### Setting up Vercel (first time)

Unfortunately, Vercel projects cannot be transferred on Hobby (free) accounts, so setting up your own account is necessary. Please follow Vercel's [Deploying a Git Repository](https://vercel.com/docs/git#deploying-a-git-repository) guide. The short version:

1. Sign in at [vercel.com](https://vercel.com) and click **New Project**.
2. Select the `Adam924/gsc-site` repository (or your forked version) from the list (or import it as a third party Git repo).
3. Leave all build and framework settings at their **defaults**. The project uses standard Docusaurus defaults and no custom configuration is needed.
4. Click **Deploy**.

After initial setup, every push to `main` triggers an automatic redeploy. No further Vercel work is required. 

### Automatic deployment (recommended)
Push any commit to the `main` branch → Vercel auto-deploys in ~60 seconds.

### Check deployment status
Go to https://vercel.com and sign in with the GSC account to see deployment logs and status.

### If a deployment fails
1. Go to Vercel → look at the build log for the error message.
2. Most failures are caused by TypeScript syntax errors in `.tsx` files.
3. Fix the error, commit, and push again.
4. Markdown files (`.md`) cannot cause build failures — only `.tsx` and `.ts` files can.

### To preview changes before deploying
Run `npm start` locally — this opens a live-reloading preview at `http://localhost:3000`.

---

## 9. Semester checklist

### At the start of each semester

- [ ] Update the **announcement bar** in `docusaurus.config.ts` with the first GBM date
- [ ] Update the **upcomingEvents** array in `src/pages/events.tsx` with new semester events
- [ ] Update the **upcomingEvents** array in `src/pages/index.tsx` (homepage preview)
- [ ] Move old events to `pastEvents` in `events.tsx`
- [ ] Add all new semester events to the **GSC Google Calendar**

### At the start of each academic year (after elections)

- [ ] Update **Executive Board** in `docs/officers/executive-board.md`:
  - Change the year heading
  - Update all OfficerCard entries with new officers
  - Add officer photos if available (see Section 3.4)
- [ ] Update the **officers photo** constant `GSC_OFFICERS_2425` in `src/pages/index.tsx`
- [ ] Review and update **Department Representatives** in `docs/officers/representatives.md`
- [ ] Update **funding amounts** if the annual allocation changed in `docs/resources/funding-overview.md`
- [ ] Update the **GBM schedule table** in `docs/about/meeting-information.md`

### Ongoing

- [ ] Add events to Google Calendar as they're confirmed
- [ ] Update upcoming events on the site when events are added/changed/cancelled
- [ ] Move past events to the `pastEvents` array after they occur

---

## 10. Troubleshooting

### The announcement bar reappears for everyone after my update
This is **expected and intentional**. Changing the `id` field in `announcementBar` causes it to reappear for users who previously dismissed it. This ensures everyone sees the new GBM date.

### The homepage dynamic banner shows the wrong GBM date
The banner fetches from Google Calendar. Make sure:
1. The next GBM is on the GSC Google Calendar with "General Body" in the event title.
2. The event date is in the future.
3. If the calendar isn't accessible, the banner falls back to the `FALLBACK_MEETING` object in `src/pages/index.tsx` — update that object with the correct date.

### The live calendar embed shows old events / wrong month
This should no longer happen with the updated code — the embed always starts at today's date. If you see an issue:
1. Hard-refresh the page (Ctrl+Shift+R / Cmd+Shift+R) to clear cache.
2. If still broken, check `src/pages/events.tsx` and make sure the `CalendarEmbed` component is present (not commented out).

### A page is showing a 404
A doc page link is broken. Possible causes:
- A file was moved or renamed in `docs/`
- An internal link was typed incorrectly
- A sidebar entry doesn't match a file path

Check `sidebars.ts` to ensure each item matches an actual file in `docs/`.

### The build fails after a code change
1. Check the Vercel build log for the error.
2. If you edited a `.tsx` file, look for TypeScript errors (missing commas, unclosed tags, etc.).
3. Markdown files can't cause build failures. If you only edited `.md` files, the issue is elsewhere.
4. To recover quickly: revert your last commit on GitHub (Git history → revert).

### I accidentally broke something / need to undo
On GitHub: go to the repository → click on the file → click **History** → find the last good version → click the commit hash → view raw → copy the content → paste it back into the current file and commit.

Or if using Git locally:
```bash
git log --oneline        # find the last good commit hash
git revert <hash>        # creates a new commit that undoes that change
git push
```

---

## Appendix: Adding a completely new page

1. Create a new `.md` file in the appropriate `docs/` subfolder, e.g.:
   `docs/resources/housing-resources.md`

2. Add a front matter header:
   ```md
   ---
   title: Housing Resources
   sidebar_label: Housing
   ---
   
   # Housing Resources
   
   Content here...
   ```

3. Add it to `sidebars.ts` under the right sidebar:
   ```ts
   resourcesSidebar: [
     {
       type: 'category',
       label: 'Campus Support',
       collapsible: false,
       items: [
         'resources/student-support',
         'resources/housing-resources',   // ← add this line
       ],
     },
   ],
   ```

4. Commit and push — the new page appears in the nav automatically.

---

*Questions? Contact the GSC Media/PR Chair or email gsc@vanderbilt.edu.*
