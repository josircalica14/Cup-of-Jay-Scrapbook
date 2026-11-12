# Where to edit things

A map of the project, so you always know which file to open. Start with the
"I want to change…" table, then scroll to the folder tree for the full picture.

## I want to change…

| What you want to change | Open this file |
| --- | --- |
| Nav tab names or order ("home", "dear diary", "Things About Me"…) | `src/data/pages.js` → `PAGES` |
| Diary entries (home page + `#dear-diary` page) | `src/data/index.js` → `DIARY_DATA` |
| Photo captions, dates, order of the photo roll | `src/data/snapshots.js` (images in `src/assets/snapshots/`) |
| Home hero headline, intro paragraph, buttons | `src/components/home/Hero.jsx` |
| Home "A few things about me" facts / words | `src/components/home/About.jsx` |
| Home "moments" grid and its filters | `src/components/home/Moments.jsx` |
| Home diary teaser list | `src/components/home/Diary.jsx` |
| Home coffee counter, music player, mood, "Right now" | `src/components/home/LittleThings.jsx` |
| Guestbook | `src/components/home/Guestbook.jsx` |
| The background art behind each home section | `src/components/home/SectionArt.jsx` (+ `src/styles/section-art.css`) |
| Which sections the home page shows, and their order | `src/App.jsx` → `Home()` |
| Navbar markup / burger menu behaviour | `src/components/layout/Navbar.jsx` |
| Anything on the **Things About Me** page | `src/data/about.js` (copy) and `src/components/pages/AboutPage.jsx` (layout) |
| Archives page | `src/components/pages/Archives.jsx` |
| Snapshots page | `src/components/pages/Snapshots.jsx` |
| Dear diary page | `src/components/pages/DearDiary.jsx` |
| Style of the home "about me" section | `src/styles/home-about.css` |
| Style of the home sections (hero, moments, diary…) | `src/styles/scrapbook.css` |
| Style of the home section backgrounds | `src/styles/section-art.css` |
| Style of the routed pages + navbar | `src/styles/pages.css` |
| Global colours, fonts, page background | `tailwind.config.js` + `src/styles/index.css` |
| Add or remove a page route | `src/App.jsx` (`routes`) + `src/data/pages.js` (`PAGES`) |

**Rule of thumb:** words and lists live in `src/data/`. Markup and behaviour live
in `src/components/`. Colours, type and layout rules live in `src/styles/`.

## Folder tree

```
cup-of-jay/
├─ src/
│  ├─ main.jsx                 React entry — mounts <App />
│  ├─ App.jsx                  route table + home page composition
│  ├─ components/
│  │  ├─ home/                 the home page, one file per section
│  │  │  ├─ Hero.jsx
│  │  │  ├─ About.jsx          "A few things about me" (short version)
│  │  │  ├─ Moments.jsx
│  │  │  ├─ Diary.jsx
│  │  │  ├─ LittleThings.jsx
│  │  │  ├─ Guestbook.jsx
│  │  │  └─ SectionArt.jsx     background shapes/patterns behind each home section
│  │  ├─ layout/
│  │  │  └─ Navbar.jsx         sticky top bar + mobile drawer
│  │  ├─ pages/                the routed pages
│  │  │  ├─ AboutPage.jsx      #about — "Things About Me" (long version)
│  │  │  ├─ Archives.jsx       #archives
│  │  │  ├─ Snapshots.jsx      #snapshots
│  │  │  ├─ DearDiary.jsx      #dear-diary
│  │  │  ├─ Shell.jsx          wrapper every routed page renders inside
│  │  │  ├─ PageHead.jsx       the "~/page" kicker + big title
│  │  │  ├─ PageArt.jsx        margin doodles used by the routed pages
│  │  │  ├─ Backdrop.jsx       page background
│  │  │  └─ usePage.js         tiny hash router
│  │  └─ ui/                   small reusable pieces (Tape, Polaroid, Magnetic, Squiggle…)
│  ├─ data/                    all content, no markup
│  │  ├─ index.js              DIARY_DATA, NOW_DATA, guestbook seed
│  │  ├─ snapshots.js          photo roll: imports + captions
│  │  ├─ pages.js              PAGES (nav), derived SNAPS / DIARY / ARCH, songs
│  │  ├─ about.js              everything the Things About Me page says
│  ├─ hooks/
│  │  ├─ useReveal.js          scroll-in reveal for home sections ([data-reveal])
│  │  ├─ usePageReveal.js      scroll-in reveal for routed pages ([data-r])
│  │  └─ motion.js             useReducedMotion, useParallax, useTypewriter
│  ├─ styles/
│  │  ├─ index.css             Tailwind entry, page background, global base
│  │  ├─ scrapbook.css         shared look for the home page sections
│  │  ├─ home-about.css        home "A few things about me" section
│  │  ├─ section-art.css       background art for the home sections
│  │  ├─ pages.css             navbar + routed pages (incl. Things About Me)
│  │  └─ personal-corner.css   "My personal corner" on the Things About Me page
│  └─ assets/                  logo, hero photo, snapshots/ (the real photographs)
├─ public/                     favicon, icon sprite, jay.jpg
├─ docs/
│  ├─ design-notes/            critique notes for each redesign
│  └─ prototypes/              the original one-file HTML draft
├─ reference files/            design references supplied for each redesign (read-only)
└─ .taste-skill/               design-inspector screenshots (git-ignored scratch)
```

## Two "about me" places — which is which

- **`src/components/home/About.jsx`** — the *short* section on the home page
  ("A few things about me"). Styles: `src/styles/home-about.css`.
- **`src/components/pages/AboutPage.jsx`** — the *full* `#about` page
  ("Things About Me", ten sections). Copy lives in `src/data/about.js`,
  styles in `src/styles/pages.css`.

## Runs and checks

```bash
npm install
npm run dev      # dev server
npm run build    # production build into dist/
npm run preview  # serve the build
npm run lint     # eslint
```

`dist/`, `node_modules/` and `.taste-skill/` are generated — never edit them.
`reference files/` is read-only design material; nothing in `src/` imports it.
