/* About page content — ported from reference files/about_page_redesign/data.js.
   The section list and the icon set come from the reference; the words are Jay's
   and are pulled from where they already live (NOW_DATA in data/index.js, SONGS in
   data/pages.js, the photos in data/snapshots.js) so nothing is written twice.
   The goals, the life lessons and the letter to future me are SAMPLE text in his
   voice — swap them for his own. */

import { PHOTOS } from './snapshots'
import { SONGS } from './pages'
import { NOW_DATA } from './index'
import myPhoto from '../assets/my_photo.jpg'

/* A print from the phone roll, by its title in data/snapshots.js. Keeping the
   lookup here means no image path is typed twice, and a title that disappears
   from the roll falls back to the dashed placeholder instead of a broken image. */
export const shot = (t) => PHOTOS.find((p) => p.t === t)

/* the print taped into the introduction: Jay's own portrait, not a photo from
   the roll, so it does not depend on a title surviving in snapshots.js */
export const INTRO_SHOT = {
  img: myPhoto,
  t: 'that is me',
  alt: 'Jay in a teal suit and bow tie, smiling in front of a blurred garden',
}

/* the three answers under the big hello */
export const SLOTS = [
  ['who i am', 'My full name is Josir James S. Calica, they call me Josir or Jay-Jay, but I always prefer Jay-Jay hehe.'],
  ['my personality', 'chaotic sunsets, calm code, mild caffeine problem'],
  ['what makes me different', 'i shoot the ordinary jeepney window and call it a gallery'],
]

export const FAVS = [
  ['Music', 'lo-fi, rain sounds, old OPM', 'note'],
  ['Movies, anime & series', 'a very long manga backlog', 'film'],
  ['Food & drinks', 'mangoes, halo-halo, any coffee', 'cup'],
  ['Colors & aesthetics', 'sunset pink, blueprint blue', 'palette'],
  ['Games & hobbies', 'photography, editing, coding at night', 'game'],
  ['Little rituals', 'cup no. 4, the window seat, 3am music', 'heart'],
]

/* [what it is, how often, the icon drawn on the card] */
export const LOVES = [
  ['Taking photos of very ordinary streets', 'most evenings', 'camera'],
  ['Editing pictures until they feel like the day did', 'way too late', 'sliders'],
  ['Coding and breaking my own layout', 'weekends', 'code'],
  ['Listening to music while working', 'always', 'headphones'],
  ['Exploring new places without a plan', 'when i can', 'compass'],
]

/* [the question on the front, the answer on the back] */
export const FACTS = [
  ['A weird habit I have', 'Rewriting one CSS rule five times. The fifth one is the right one.'],
  ['Something I can talk about for hours', 'Why the jeepney window seat is the best seat in the country.'],
  ['My comfort activity', 'Coffee, headphones, and a folder of photos I have not edited yet.'],
  ['Something I am surprisingly good at', 'Editing three years of photos in one night.'],
  ['One thing on my bucket list', 'Watch a sunrise from a mountain, not from a jeepney.'],
]

/* [the aim, the three ticks under it] */
export const GOALS = [
  ['Skills I want to learn', ['TypeScript without guessing', 'shoot fully manual', 'edit video properly']],
  ['Places I want to visit', ['Batanes, at sunrise', 'Kyoto, in the rain', 'any beach with no signal']],
  ['Projects I want to create', ['a photo zine of Laguna streets', 'one app people actually use', 'this site, finished']],
  ['My dream career or lifestyle', ['frontend work with a camera bag', 'remote hours, local coffee', 'time to edit what i shoot']],
  ['Things I want to achieve this year', ['a portfolio worth sending', 'shoot twelve rolls of film', 'sleep before 3am, once']],
]

/* the film strip: [title in data/snapshots.js, the line written under it] */
export const MEMS = [
  ['Golden hour, Watsons', 'ran out for medicine, stayed for the sky'],
  ['Window-shift supervisor', 'he audits every keystroke'],
  ['Baywalk, sun clocking out', 'the bay does this every evening and i still stop'],
  ['Desk mascot', 'he has seen my code reviews'],
  ['Colegio, last walk', 'four years of stairs, one good sunset'],
  ['Two left on the table', 'called the shot, missed the shot'],
]

/* my personal corner */
export const QUOTE = 'Still growing, still creating, still becoming.'
export const LETTER = 'If you are reading this: the site shipped, the coffee went cold, and you still take the window seat. Say hi to the version of you who was scared of CSS.'
export const LEARNING = ['Rest is part of the work.', 'Post the half-decent shot anyway.', 'Nobody is auditing your first draft.']
export const STICKY = 'drink water, ALWAYS.'

/* the four songs in data/pages.js, each with the part of life it belongs to */
const CHAPTERS = ['the commute', 'mango season', 'the deadline', 'golden hour']
export const TRACKS = SONGS.map(([t, a], i) => [t, a, CHAPTERS[i]])

/* today's photo and the two days before it; dev and story are the honest part */
export const POTD = [
  { p: shot('Baywalk, sun clocking out'), dev: 'phone camera, no filter', story: 'I stopped on the walkway because the lamp posts went black against the sky. Two shots, and this is the honest one.' },
  { p: shot('Window-shift supervisor'), dev: 'phone camera, held very still', story: 'He found the only lit window in the house and sat in it. I moved slowly. He judged anyway.' },
  { p: shot('Teal keys, 1 a.m.'), dev: 'phone camera, lights off', story: 'The keyboard glow did more work than the code that night. I kept the photo and dropped the feature.' },
]

/* what i am into right now, plus one the home page does not carry */
export const NOW = [
  ...NOW_DATA.map((n) => [n.label, n.value]),
  ['Watching', 'the same three comfort series, again'],
]

export const END_QUOTES = [
  'Still growing, still creating, still becoming.',
  'Just a person collecting little moments and figuring it out one day at a time.',
  'The window seat was worth the extra fare.',
]

/* ---- helpers ---- */
const MON = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
/* '2026-09-18' -> the pieces the date stamp is written with */
export const dparts = (iso) => {
  const [y, m, day] = iso.split('-')
  return { y, m: MON[+m - 1], day: String(Number(day)) }
}

/* the reference's icon outlines, drawn on a 24x24 grid; one per favourite, plus
   the camera the print placeholder uses */
export const ICONS = {
  note: 'M9 18V6l10-2v12M9 18a3 3 0 1 1-3-3M19 16a3 3 0 1 1-3-3',
  film: 'M3 5h18v14H3zM7 5v14M17 5v14M3 9h4M3 15h4M17 9h4M17 15h4',
  cup: 'M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9zM17 10h1.5a2.5 2.5 0 0 1 0 5H17',
  palette: 'M12 3a9 9 0 1 0 0 18c1.5 0 2-1 1.5-2-.6-1.2 0-2.5 1.5-2.5H17a4 4 0 0 0 4-4c0-5-4-9.5-9-9.5zM7.5 11h.01M10 7.5h.01M14.5 7.5h.01',
  game: 'M6 8h12a4 4 0 0 1 4 4v3a2 2 0 0 1-3.4 1.4L16 14H8l-2.6 2.4A2 2 0 0 1 2 15v-3a4 4 0 0 1 4-4zM8 10v3M6.5 11.5h3M15.5 11h.01M17.5 12.5h.01',
  heart: 'M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z',
  sliders: 'M4 7h6M14 7h6M4 17h4M12 17h8M12 5a2 2 0 1 0 0 4 2 2 0 0 0 0-4M10 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4',
  code: 'M8.5 7.5l-4.5 4.5 4.5 4.5M15.5 16.5l4.5-4.5-4.5-4.5M13.5 6l-3 12',
  headphones: 'M4 14v-2a8 8 0 0 1 16 0v2M4 14h3.5v6H5.5A1.5 1.5 0 0 1 4 18.5zM20 14h-3.5v6h2A1.5 1.5 0 0 0 20 18.5z',
  compass: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18M15.8 8.2l-2.3 5.6-5.6 2.3 2.3-5.6z',
  camera: 'M4 8h3l1.5-2h7L17 8h3v11H4zM12 10a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z',
}
