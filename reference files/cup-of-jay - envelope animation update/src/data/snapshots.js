/* The photo wall on /snapshots: every file in assets/snapshots, in wall order.
   Vite fingerprints each image at build time. `t` is the polaroid's label,
   `caption` the handwritten line under it, `alt` what a screen reader hears.
   The months are placeholders — swap in the real dates whenever. */

import p01 from '../assets/snapshots/photo-01.webp'
import p02 from '../assets/snapshots/photo-02.webp'
import p03 from '../assets/snapshots/photo-03.webp'
import p04 from '../assets/snapshots/photo-04.webp'
import p05 from '../assets/snapshots/photo-05.webp'
import p06 from '../assets/snapshots/photo-06.webp'
import p07 from '../assets/snapshots/photo-07.webp'
import p08 from '../assets/snapshots/photo-08.webp'
import p09 from '../assets/snapshots/photo-09.webp'
import p10 from '../assets/snapshots/photo-10.webp'
import p11 from '../assets/snapshots/photo-11.webp'
import p12 from '../assets/snapshots/photo-12.webp'
import p13 from '../assets/snapshots/photo-13.webp'
import p14 from '../assets/snapshots/photo-14.webp'
import p15 from '../assets/snapshots/photo-15.webp'
import p16 from '../assets/snapshots/photo-16.webp'

export const PHOTOS = [
  {
    img: p01,
    t: 'No. 23, pit stop',
    caption: "still faster than anything i've shipped",
    alt: 'Yellow toy race car with the number 23 on it, parked on the floor beside a window',
    d: 'Jul 2026', s: '2026-07-01',
  },
  {
    img: p02,
    t: 'Golden hour, Watsons',
    caption: 'ran out for medicine, stayed for the sky',
    alt: 'Sunset over a shopping strip, orange clouds above the lit Watsons pharmacy sign',
    d: 'Sep 2026', s: '2026-09-04',
  },
  {
    img: p03,
    t: 'St. Peregrine, Sunday',
    caption: 'the quiet before the 5 p.m. mass',
    alt: 'The concrete facade of St. Peregrine chapel under a grey sky, cars parked in front',
    d: 'Aug 2026', s: '2026-08-09',
  },
  {
    img: p04,
    t: 'Window-shift supervisor',
    caption: 'he audits every keystroke',
    alt: 'Orange and white cat sitting by a barred window, looking off to the side',
    d: 'Oct 2026', s: '2026-10-02',
  },
  {
    img: p05,
    t: 'Beach, borrowed floats',
    caption: 'first swim of the year, last sunburn of the year',
    alt: 'Crowded beach with swimmers in the water, colourful inflatable rings hanging from a pole',
    d: 'Jun 2026', s: '2026-06-13',
  },
  {
    img: p06,
    t: 'Baywalk, sun clocking out',
    caption: 'the bay does this every evening and i still stop',
    alt: 'The sun setting over the bay, with ornate lamp posts silhouetted along the walkway',
    d: 'Sep 2026', s: '2026-09-18',
  },
  {
    img: p07,
    t: 'Purple collar, big opinions',
    caption: 'judging me from the plant shelf',
    alt: 'White cat with tabby patches and a purple bell collar sitting on a tiled ledge',
    d: 'Oct 2026', s: '2026-10-11',
  },
  {
    img: p08,
    t: 'Good boy, greenhouse',
    caption: 'sat exactly where the light fell',
    alt: 'Cream-coloured dog with a teal collar sitting on patterned tile in a plant-filled room',
    d: 'Aug 2026', s: '2026-08-22',
  },
  {
    img: p09,
    t: 'Colegio, last walk',
    caption: 'four years of stairs, one good sunset',
    alt: 'Curved pink and terracotta college building lit orange by the setting sun',
    d: 'Jul 2026', s: '2026-07-15',
  },
  {
    img: p10,
    t: 'Smile on cue',
    caption: 'he heard the word treat',
    alt: 'Cream dog with a teal collar grinning, ears up, at a gate with another dog behind',
    d: 'Sep 2026', s: '2026-09-26',
  },
  {
    img: p11,
    t: 'Desk mascot',
    caption: 'he has seen my code reviews',
    alt: 'Brown plush toy sitting on a glass table in front of a cabinet of jars',
    d: 'Oct 2026', s: '2026-10-19',
  },
  {
    img: p12,
    t: 'Sunspot, claimed',
    caption: 'found the only warm tile in the house',
    alt: 'Tan dog stretched out on patterned floor tiles in dappled sunlight beside potted plants',
    d: 'Aug 2026', s: '2026-08-03',
  },
  {
    img: p13,
    t: 'St. Peregrine Shrine',
    caption: 'asked for a small favour, took a photo anyway',
    alt: 'Statue of St. Peregrine under an arch reading St. Peregrine Shrine, framed by trees',
    d: 'Jun 2026', s: '2026-06-28',
  },
  {
    img: p14,
    t: 'Teal keys, 1 a.m.',
    caption: 'rgb does not make the code better (it helps)',
    alt: 'Close-up of a mechanical keyboard glowing teal and purple in the dark',
    d: 'Jul 2026', s: '2026-07-27',
  },
  {
    img: p15,
    t: 'Empty pews',
    caption: '3 p.m. light hits different in here',
    alt: 'Church interior with dark wooden pews and a crucifix on a stone wall, light through the side windows',
    d: 'Aug 2026', s: '2026-08-16',
  },
  {
    img: p16,
    t: 'Two left on the table',
    caption: 'called the shot, missed the shot',
    alt: 'Billiard table with the 13 and 14 balls resting on the green felt in warm sunlight',
    d: 'Sep 2026', s: '2026-09-09',
  },
]
