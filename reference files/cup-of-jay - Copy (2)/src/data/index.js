import { PHOTOS } from './snapshots'

/* The "pages I pasted in" pile on the home page: the newest six prints off the
   photo roll. Photo, caption, date and alt all come from data/snapshots.js, so
   a photo still lives in exactly one place — only the pile's own extras (which
   chip it files under, the mood sticker, and what is written on the back) are
   written here, keyed by the photo's title. Those three are SAMPLE copy in
   Jay's voice — swap them for your own. */
const PILE = {
  'Desk mascot': {
    tag: 'Everyday', mood: 'on duty',
    note: 'he does not know what a merge conflict is. he sits on the desk anyway.',
  },
  'Purple collar, big opinions': {
    tag: 'Creatures', mood: 'watching me',
    note: 'she picked the plant shelf. I moved one leaf and she held a meeting about it.',
  },
  'Window-shift supervisor': {
    tag: 'Creatures', mood: 'judged',
    note: 'the only window in the house with good light, and he found it first.',
  },
  'Smile on cue': {
    tag: 'Creatures', mood: 'treat activated',
    note: 'I said the word. I did not have a treat. I am a liar.',
  },
  'Baywalk, sun clocking out': {
    tag: 'Places', mood: 'end of day',
    note: 'the lamps go black against the sky before the bay turns copper. every single evening.',
  },
  'Golden hour, Watsons': {
    tag: 'Places', mood: 'ran an errand, got a sky',
    note: 'went out for medicine, stood in the parking lot for ten minutes instead.',
  },
  'Two left on the table': {
    tag: 'Everyday', mood: 'so close',
    note: '13 and 14 left on the felt. the table looked better than the game did.',
  },
}

const newestFirst = [...PHOTOS].sort((a, b) => (a.s < b.s ? 1 : -1))

export const MOMENTS_DATA = newestFirst.slice(0, 6).map((p, i) => {
  // a photo with no entry here still joins the pile; it just writes its caption
  // on the back until you give it a note
  const extra = PILE[p.t] ?? { tag: 'Everyday', mood: 'noted', note: p.caption }
  return {
    id: i + 1,
    img: p.img,
    alt: p.alt,
    title: p.t,
    caption: p.caption,
    date: p.d,
    tag: extra.tag,
    mood: extra.mood,
    note: extra.note,
  }
})

export const DIARY_DATA = [
  { id: 1, date: 'Oct 20', mood: 'cozy',   title: 'Rainy afternoon',         body: 'It rained so hard the street turned into a mirror. I stayed in, edited a few photos, and let the playlist loop. Small day, good day.' },
  { id: 2, date: 'Oct 14', mood: 'proud',  title: 'Finally finished the thing', body: 'The queue app works on an actual phone, on an actual jeepney. I did a tiny dance in the hallway and nobody saw. Probably.' },
  { id: 3, date: 'Oct 03', mood: 'sleepy', title: 'Over-caffeinated again',  body: 'Four cups. I can hear colors. Note to self: water exists, and it is also a drink.' },
]

export const NOW_DATA = [
  { label: 'Listening', value: 'lo-fi, rain sounds, old OPM',        color: '#D6E2EC' },
  { label: 'Reading',   value: 'a very long manga backlog',           color: '#F4E8B8' },
  { label: 'Making',    value: 'film-ish edits of ordinary streets',  color: '#F2D9D3' },
  { label: 'Craving',   value: 'halo-halo, any weather',              color: '#D5DDCB' },
]

export const STICKER_LINKS = [
  { platform: 'Instagram', handle: '@cupofjayyy_', url: 'https://instagram.com/cupofjayyy_', color: '#F2D9D3', rot: -3 },
  { platform: 'GitHub',    handle: 'cupofjay',     url: 'https://github.com/',               color: '#D6E2EC', rot:  2 },
  { platform: 'Email',     handle: 'say hi',       url: 'mailto:hello@example.com',           color: '#F4E8B8', rot: -2 },
]

export const GUESTBOOK_SEED = [
  { name: 'Mika',      message: 'Your photos feel like a warm blanket.', timestamp: '2026-09-12 14:02' },
  { name: 'Kuya Ben',  message: 'Kain tayo pag nasa Laguna ka!',          timestamp: '2026-09-30 08:41' },
]