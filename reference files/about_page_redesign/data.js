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

/* About page content, from your outline. Prompts show as "fill me in" until you write your answers.
   Photos: mems[i][1] and potd[i].img take a path like '/photos/x.jpg'. */
export const ABOUT = {
 intro:'Just a person collecting little moments, chasing ideas, and figuring things out one day at a time.',
 slots:['who I am','my personality','what makes me different'],
 favs:[['Music','artists, and songs','note'],['Movies, anime & series','what I keep watching','film'],['Food & drinks','the little cravings','cup'],['Colors & aesthetics','the vibe','palette'],['Games & hobbies','how I unwind','game']],
 loves:[['Taking photos and exploring photography','camera'],['Editing pictures in Lightroom or Photoshop','sliders'],['Coding and experimenting with web design','code'],['Listening to music while working','phones'],['Exploring new places and ideas','compass']],
 facts:['A weird habit I have','Something I could talk about for hours','My comfort activity','Something I’m surprisingly good at','One thing on my bucket list'],
 goals:['Skills I want to learn','Places I want to visit','Projects I want to create','My dream career or lifestyle','Things I want to achieve this year'],
 mems:[['Childhood memories',''],['School experiences',''],['First photography projects',''],['Favorite recent memories',''],['Moments that changed my perspective','']],   /* [title, photo path] */
 quote:'Still growing, still creating, still becoming.',
 tracks:[['Song title 01','Artist name','chapter 01'],['Song title 02','Artist name','chapter 02'],['Song title 03','Artist name','chapter 03'],['Song title 04','Artist name','chapter 04'],['Song title 05','Artist name','chapter 05']],
 potd:[
  {d:'2026-10-26',dev:'Phone or camera model',t:'Photo title',img:'',g:'#ffb36b,#ff6f8e,#5b4bd6',story:'Sample story. Where I was, what the light was doing, and why I pressed the shutter.'},
  {d:'2026-10-25',dev:'Phone or camera model',t:'Yesterday’s photo',img:'',g:'#c9f4ff,#5fd0ee,#1b6fa8',story:'Sample story. A second photo, so you can flip back through the days.'},
  {d:'2026-10-24',dev:'Phone or camera model',t:'The day before',img:'',g:'#d9ccff,#8f7be0,#2d2a6e',story:'Sample story. Every day gets its own little caption.'}
 ],
 now:[['Listening to','phones'],['Watching','eye'],['Playing','game'],['Learning','book'],['Enjoying','heart']],
 quotes:['Still growing, still creating, still becoming.','Just a person collecting little moments, chasing ideas, and figuring things out one day at a time.']
}
export const ICONS = {
 note:'M9 18V6l10-2v12M9 18a3 3 0 1 1-3-3M19 16a3 3 0 1 1-3-3',
 film:'M3 5h18v14H3zM7 5v14M17 5v14M3 9h4M3 15h4M17 9h4M17 15h4',
 cup:'M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9zM17 10h1.5a2.5 2.5 0 0 1 0 5H17',
 palette:'M12 3a9 9 0 1 0 0 18c1.5 0 2-1 1.5-2-.6-1.2 0-2.5 1.5-2.5H17a4 4 0 0 0 4-4c0-5-4-9.5-9-9.5zM7.5 11h.01M10 7.5h.01M14.5 7.5h.01',
 game:'M6 8h12a4 4 0 0 1 4 4v3a2 2 0 0 1-3.4 1.4L16 14H8l-2.6 2.4A2 2 0 0 1 2 15v-3a4 4 0 0 1 4-4zM8 10v3M6.5 11.5h3M15.5 11h.01M17.5 12.5h.01',
 camera:'M4 8h3l1.5-2h7L17 8h3v11H4zM12 10a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z',
 sliders:'M4 7h10M18 7h2M4 17h2M10 17h10M14 4v6M6 14v6',
 code:'m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16',
 phones:'M4 15v-3a8 8 0 0 1 16 0v3M4 15h3v5H5a1 1 0 0 1-1-1zM20 15h-3v5h2a1 1 0 0 0 1-1z',
 compass:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM15.5 8.5l-2 5-5 2 2-5z',
 eye:'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z',
 book:'M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19V5',
 heart:'M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z'
}

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
