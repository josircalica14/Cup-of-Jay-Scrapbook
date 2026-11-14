/* Page content for the routed scrapbook pages, adapted from
   reference files/scrapbook/scrapbook/data.js.
   SNAPS come from the photos in assets/snapshots (see data/snapshots.js);
   DIARY reuses DIARY_DATA, with entries split into the shown part and the
   "keep reading" part.
   MEMORIES / SONGS are SAMPLE content in Jay's voice — replace them with
   your own (or fetch them later). */

import { DIARY_DATA } from './index'
import { PHOTOS } from './snapshots'

export const PAGES = [
  { id: 'home',          label: 'home',            n: '01', desc: 'Main scrapbook page' },
  { id: 'archives',      label: 'the archives',    n: '02', desc: 'Memories organized by date or year' },
  { id: 'snapshots',     label: 'snapshots',       n: '03', desc: 'Photo gallery' },
  { id: 'dear-diary',    label: 'dear diary',      n: '04', desc: 'Personal journal entries' },
  { id: 'about',         label: 'Things About Me', n: '05', desc: 'Personal introduction' },
]

const MON = { Jan:1, Feb:2, Mar:3, Apr:4, May:5, Jun:6, Jul:7, Aug:8, Sep:9, Oct:10, Nov:11, Dec:12 }

/* The site's data carries two display-date shapes: moments are "Sep 2026",
   diary entries are "Oct 20" (year lives in the entry). Normalize both into
   { d, y, m, day, s } where s is a sortable YYYYMMDD string. */
const parse = (date, year) => {
  const [a, b] = date.split(' ')
  const mon = MON[a]
  const y = b.length === 4 ? b : year
  const day = b.length === 4 ? '' : String(b).padStart(2, '0')
  return { d: date, y, m: a.toLowerCase(), day, s: `${y}-${String(mon).padStart(2, '0')}-${day || '00'}` }
}

/* Snapshots are the real photos: each polaroid holds an <img>, the caption is
   the handwritten line, and the month drives the archives timeline. */
export const SNAPS = PHOTOS.map((p) => ({ ...p, y: p.d.split(' ')[1] }))

/* Diary entries: the site posts keep one body; the pages show a short lead
   plus a "keep reading" reveal, so split each body at the first sentence. */
const splitAt = (body) => {
  const m = body.match(/^(.+?[.!?])\s+(.+)$/s)
  return m ? [m[1], m[2]] : [body, '']
}

export const DIARY = DIARY_DATA.map((e) => {
  const [s, x] = splitAt(e.body)
  const p = parse(e.date, '2026')
  return { d: p.d, y: p.y, day: p.day, mon: p.m, s: p.s, m: e.mood, t: e.title, lead: s, more: x }
})

/* SAMPLE memories — swap for the real ones. */
export const MEMORIES = [
  { d: 'Jun 2025', y: '2025', s: '2025-06-00', k: 'memory', t: 'Graduation day',          sub: 'Fresh IT grad, one bow tie, zero bugs (that anyone saw).', to: 'about' },
  { d: 'Nov 2024', y: '2024', s: '2024-11-00', k: 'memory', t: 'First deploy that stuck', sub: 'It was a queue app. It worked on an actual jeepney.',     to: 'about' },
]

/* SAMPLE content, used by the Things About Me page — replace with your own. */
export const SONGS = [
  ['Jeepney Window Lo-fi', 'Rainy Jeepney FM'],
  ['Mango Season', 'Halo-Halo Harmonies'],
  ['3AM Debugging', 'Coffeehouse Tapes'],
  ['Golden Hour Walk', 'Laguna Sunset Society'],
]

export const WORDS = [
  'just call me jay', 'chaotic sunsets', 'cup no. 4', 'jeepney window views',
  '3am thoughts', 'half-decent phone shots', 'too much caffeine', 'best mangoes',
]

/* The archives are built from the other lists, so nothing is entered twice. */
export const ARCH = [
  ...SNAPS.map((x) => ({ d: x.d, y: x.y, s: x.s, k: 'snapshot', t: x.t, sub: x.caption, to: 'snapshots', img: x.img })),
  ...DIARY.map((x) => ({ d: x.d, y: x.y, s: x.s, k: 'diary', t: x.t, sub: x.m, to: 'dear-diary' })),
  ...MEMORIES,
].sort((a, b) => (a.s < b.s ? 1 : -1))

/* ---- helpers ---- */
export const rot = (i) => [-3, 2.5, -1.5, 3, -2.5, 1.5][i % 6]