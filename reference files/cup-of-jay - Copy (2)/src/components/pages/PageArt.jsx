/* Hand-drawn margin art for the routed pages: a decorative layer that sits
   behind the content and holds the empty outer gutters on wide screens.
   It never intercepts a click and only shows past 1360px (see .sbp-pageart),
   where there is real gutter to hold it. Children are absolutely positioned
   by their own class, anchored to .sbp-art-l / .sbp-art-r. */
export default function PageArt({ children }) {
  return (
    <div className="sbp-pageart" aria-hidden="true">
      {children}
    </div>
  )
}

/* shared doodle shapes, drawn in the site's ink-blue line language */
export const Ring = () => (
  <svg viewBox="0 0 120 120">
    <path d="M60 6c30 1 52 24 52 52s-24 56-54 56S6 88 6 58 30 5 60 6z" />
    <path d="M60 20c22 1 38 17 38 39s-18 41-40 41-38-16-38-37 18-43 40-43z" opacity=".45" />
  </svg>
)

export const Envelope = () => (
  <svg viewBox="0 0 100 84">
    <rect x="6" y="14" width="88" height="60" rx="4" />
    <path d="M6 18l44 32 44-32" />
    <path d="M6 70l30-24M94 70L64 46" opacity=".5" />
  </svg>
)

export const CalendarPage = () => (
  <svg viewBox="0 0 90 88">
    <rect x="8" y="14" width="72" height="66" rx="6" />
    <path d="M8 34h72M26 6v16M62 6v16" />
    <path d="M46 48c9 0 16 5 16 12s-9 13-17 13-16-5-16-12 8-13 17-13z" opacity=".8" />
  </svg>
)

export const Camera = () => (
  <svg viewBox="0 0 100 78">
    <path d="M8 22h18l8-9h26l8 9h16v46H8z" />
    <circle cx="49" cy="45" r="15" />
  </svg>
)

export const TornStrip = () => (
  <svg viewBox="0 0 100 44">
    <path d="M4 12l14-8 14 8 14-8 14 8 14-8 14 8v22l-14 8-14-8-14 8-14-8-14 8-14-8z" />
  </svg>
)

export const Stars = () => (
  <svg viewBox="0 0 60 44">
    <path d="M12 3c.9 7.4 3.2 9.7 10.6 10.6C15.2 14.5 12.9 16.8 12 24.2 11.1 16.8 8.8 14.5 1.4 13.6 8.8 12.7 11.1 10.4 12 3z" />
    <path d="M44 22c.5 4.6 2 6.1 6.6 6.6-4.6.5-6.1 2-6.6 6.6-.5-4.6-2-6.1-6.6-6.6 4.6-.5 6.1-2 6.6-6.6z" />
  </svg>
)

export const Paperclip = () => (
  <svg viewBox="0 0 60 90">
    <path d="M44 26v34c0 10-8 17-17 17s-17-7-17-17V22c0-7 6-13 13-13s13 6 13 13v36c0 4-3 7-7 7s-7-3-7-7V26" />
  </svg>
)

export const Heart = () => (
  <svg viewBox="0 0 84 76">
    <path d="M42 68C22 54 8 42 8 27 8 16 16 8 27 8c7 0 12 4 15 9 3-5 8-9 15-9 11 0 19 8 19 19 0 15-14 27-34 41z" />
  </svg>
)

export const Sun = () => (
  <svg viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="20" />
    <path d="M50 6v14M50 80v14M6 50h14M80 50h14M19 19l10 10M71 71l10 10M81 19L71 29M29 71L19 81" />
  </svg>
)

export const Bookmark = () => (
  <svg viewBox="0 0 60 90">
    <path d="M10 6h40v78L30 66 10 84z" />
  </svg>
)

export const Squiggle = () => (
  <svg viewBox="0 0 120 30">
    <path d="M4 18c8-14 16 10 24-2s16 10 24-2 16 10 24-2 16 10 24-2" />
  </svg>
)

export const Arrow = () => (
  <svg viewBox="0 0 100 90">
    <path d="M8 82C22 30 74 8 92 26M92 26L74 20M92 26l-6 18" />
  </svg>
)

/* A full rail of kept-paper doodles down both outer gutters, so the desktop
   side margins hold a steady hand-drawn rhythm instead of one or two lonely
   marks. `seed` tilts the rotations so two pages don't match exactly. */
const LEFT = [Ring, Stars, Paperclip, Heart, Squiggle, Bookmark]
const RIGHT = [CalendarPage, Stars, Sun, Envelope, Arrow, TornStrip]
const TAPE = ['#F4E8B8', '#D6E2EC', '#F2D9D3', '#D5DDCB']

export function MarginRail({ seed = 0, left = LEFT, right = RIGHT }) {
  const tilt = (i, dir) => `${dir * (3 + ((i * 7 + seed * 5) % 6))}deg`
  const tape = (i) => TAPE[(i + seed) % TAPE.length]
  return (
    <PageArt>
      {left.map((Shape, i) => (
        <div key={`l${i}`} className={`sbp-pa-l sbp-pa-s${i + 1}`}
             style={{ '--rot': tilt(i, i % 2 ? 1 : -1) }}><Shape /></div>
      ))}
      {right.map((Shape, i) => (
        <div key={`r${i}`} className={`sbp-pa-r sbp-pa-s${i + 1}`}
             style={{ '--rot': tilt(i + 3, i % 2 ? -1 : 1) }}><Shape /></div>
      ))}
      {/* washi-tape strips and sticker dots fill the stretches between the
          doodles, so the gutter reads as a decorated margin rather than a
          sparse column of outlines */}
      {[16, 47, 79].map((top, i) => (
        <span key={`t${i}`} className={`sbp-pa-tape ${i % 2 ? 'r' : 'l'}`}
              style={{ top: `${top}%`, background: tape(i), rotate: tilt(i, i % 2 ? 1 : -1) }} />
      ))}
      {[29, 62, 90].map((top, i) => (
        <span key={`d${i}`} className={`sbp-pa-dot ${i % 2 ? 'l' : 'r'}`}
              style={{ top: `${top}%`, background: i === 1 ? 'var(--cyan)' : undefined }} />
      ))}
    </PageArt>
  )
}
