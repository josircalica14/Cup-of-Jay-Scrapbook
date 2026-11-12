# cup of jay

A personal scrapbook site: one long home page of polaroids, moments and diary
excerpts, plus five routed pages. React 19 + Vite + Tailwind, hand-drawn look,
hash routing (no router dependency).

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
npm run preview  # serve the build
npm run lint     # eslint
```

## Pages

Routing is a tiny hash router in `src/components/pages/usePage.js`; the tab list
lives in `src/data/pages.js`. Only ids in that list are routes — every other
hash is an in-page anchor on the home page.

| Hash | Page | Component |
| --- | --- | --- |
| `#home` | Home scroll (hero, about, moments, diary, little things) | `src/components/home/*` |
| `#archives` | Memories by year | `pages/Archives.jsx` |
| `#snapshots` | Photo gallery | `pages/Snapshots.jsx` |
| `#dear-diary` | The diary | `pages/DearDiary.jsx` |
| `#about` | Things About Me | `pages/AboutPage.jsx` |

## Layout

Full "I want to change X → edit Y" table: **[WHERE-TO-EDIT.md](WHERE-TO-EDIT.md)**.

```
src/
  App.jsx              route table + home page composition
  main.jsx             React entry
  components/
    home/              home-page sections, one file each
                       Hero, About, Moments, Diary, LittleThings, Guestbook
    layout/            Navbar (sticky bar + mobile drawer)
    pages/             routed pages, page shell, hash router, page art
    ui/                small primitives (Tape, Polaroid, Magnetic, Squiggle…)
  data/                all content, no markup
    index.js           diary entries (DIARY_DATA)
    snapshots.js       photo list + captions
    pages.js           derived lists: snapshots, diary, archives, page tabs
    about.js           the About page's copy and lists
  hooks/               useReveal, usePageReveal, motion (parallax/typewriter)
  styles/
    index.css          Tailwind entry, page background, shared base
    scrapbook.css      shared design language for the home-page sections
    home-about.css     the home "A few things about me" section
    pages.css          navbar + routed pages (incl. Things About Me)
  assets/              logo, photo, snapshots/ (the real photographs)
docs/
  design-notes/        critique rounds for each redesign
  prototypes/          the first single-file HTML prototype
reference files/       design references supplied for each redesign
  _archives/           the original .zip drops, kept unopened
.taste-skill/          screenshots + JSON from the design inspector (scratch)
```

## Where the content lives

Everything the site says is in `src/data`. Edit there, not in the components:

- diary posts → `data/index.js`
- photos and captions → `data/snapshots.js` (files in `src/assets/snapshots`)
- tab names and order → `data/pages.js`
- About page copy → `data/about.js`

Some lists (`MEMORIES`, `HOBBIES`, `FAVS` in `data/pages.js`) are sample content
written in the site's voice — swap in your own.

## Notes

- `.taste-skill/` is inspector output, not source. It is git-ignored and safe to
  delete; `node <design-taste-frontend>/scripts/inspect.mjs <url>` recreates it.
- `reference files/` is read-only design material. Nothing in `src` imports it.
- `docs/prototypes/cup-of-jay-scrapbook.html` is the original one-file draft, kept
  for comparison. It is not built or served.
