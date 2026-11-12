/* SAMPLE content: replace with your own (or fetch it later).
   PHOTOS: add img: '/photos/your-file.jpg' to any snapshot, diary entry or memory.
   No img = the colored gradient placeholder (g) or a text-only card. */

export const PAGES = [
  { id: 'home',          label: 'home',          n: '01', desc: 'The main scrapbook page' },
  { id: 'archives',      label: 'the archives',  n: '02', desc: 'Memories organized by date or year' },
  { id: 'snapshots',     label: 'snapshots',     n: '03', desc: 'The photo gallery' },
  { id: 'diary',         label: 'dear diary',    n: '04', desc: 'Personal journal entries' },
  { id: 'little-things', label: 'little things', n: '05', desc: 'Favorite songs, hobbies, and random favorites' },
  { id: 'about',         label: 'about',         n: '06', desc: 'A personal introduction' },
]

export const SNAPS = [
  { t: 'jeepney window',    d: '2026-10-14', g: '#ffb36b,#ff6f8e,#5b4bd6' },
  { t: 'cup no. 4',         d: '2026-10-02', g: '#c9f4ff,#5fd0ee,#1b6fa8' },
  { t: 'chaotic sunset',    d: '2026-09-21', g: '#ffe9a8,#ffb36b,#e0577a' },
  { t: '3am screen glow',   d: '2026-08-30', g: '#d9ccff,#8f7be0,#2d2a6e' },
  { t: 'mango season',      d: '2025-05-11', g: '#fff3b0,#ffc857,#e08a2d' },
  { t: 'rainy commute',     d: '2025-07-19', g: '#bfe3ff,#6fa8ff,#1f3fbf' },
  { t: 'blue hour, Laguna', d: '2025-11-03', g: '#e7f1ff,#8fb4e8,#233a7a' },
  { t: 'first website',     d: '2024-12-01', g: '#ffffff,#cfe3f7,#8fb4e8' },
]

export const DIARY = [
  { d: '2026-10-22', m: 'sleepy · hopeful', t: '3am thoughts, again',
    s: 'Sample entry. The page is quiet, the coffee is cold, and I am rewriting one CSS rule for the fifth time.',
    x: 'Sample second paragraph. This is where the longer part of an entry opens up when you tap keep reading.' },
  { d: '2026-10-14', m: 'soft · tired', t: 'the jeepney ride home',
    s: 'Sample entry. Window seat, golden hour, a half-decent shot from my phone.',
    x: 'Sample second paragraph. Some days are just small views and that is plenty.' },
  { d: '2026-09-28', m: 'proud · nervous', t: 'a site that finally felt like me',
    s: 'Sample entry. Bugs turned into learning experiences, mostly.',
    x: 'Sample second paragraph for the rest of the entry.' },
]

export const MEMORIES = [
  { d: '2025-06-10', k: 'memory', t: 'A sample milestone', s: 'Sample entry. Memories without a photo look like this; add img to give one a polaroid.', to: 'archives' },
  { d: '2024-03-02', k: 'memory', t: 'Another sample memory', s: 'Sample entry, older, to show the year grouping.', to: 'archives' },
]

/* Inside front cover. Put a photo path in img (e.g. '/photos/me.jpg'); empty shows the placeholder. */
export const WELCOME = { img: '', cap: 'me, probably mid-sip' }

export const SONGS = [
  ['Song title 01', 'Artist name'], ['Song title 02', 'Artist name'],
  ['Song title 03', 'Artist name'], ['Song title 04', 'Artist name'],
]
export const HOBBIES = ['photography', 'photo editing', 'coding at night', 'coffee', 'chasing sunsets', 'jeepney window gazing']
export const FAVS = [['Favorite fuel', 'Coffee'], ['Favorite view', 'Jeepney window'], ['Favorite fruit', 'Mango'], ['Favorite hour', '3am']]
export const WORDS = ['just call me jay', 'chaotic sunsets', 'cup no. 4', 'jeepney window views', '3am thoughts', 'half-decent phone shots', 'too much caffeine', 'best mangoes']

/* The archives are built from the other lists, so nothing is entered twice. */
export const ARCH = [
  ...SNAPS.map((x) => ({ d: x.d, k: 'snapshot', t: x.t, s: 'Added to the gallery.', to: 'snapshots', img: x.img, g: x.g })),
  ...DIARY.map((x) => ({ d: x.d, k: 'diary', t: x.t, s: x.m, to: 'diary', img: x.img, g: x.g })),
  ...MEMORIES,
].sort((a, b) => (a.d < b.d ? 1 : -1))

/* ---- helpers ---- */
const MON = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
export const dparts = (d) => { const [y, m, day] = d.split('-'); return { y, m: MON[+m - 1], day } }
export const rot = (i) => [-3, 2.5, -1.5, 3, -2.5, 1.5][i % 6]
/* real photo if the item has img, otherwise its gradient placeholder (inline style object) */
export const pic = (x) =>
  x.img
    ? { backgroundImage: `url("${x.img}")`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { background: `linear-gradient(160deg,${x.g})`, backgroundSize: 'cover' }
