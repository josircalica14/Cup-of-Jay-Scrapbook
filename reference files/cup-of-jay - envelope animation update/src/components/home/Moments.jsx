import { useMemo, useRef, useState } from 'react'
import Scene from '../ui/Scene'
import SectionArt from './SectionArt.jsx'
import useReveal from '../../hooks/useReveal'
import { MOMENTS_DATA } from '../../data'
import '../../styles/scrapbook.css'
import '../../styles/latest-pages.css'

/* "Pages I pasted in" — rebuilt from
   reference files/pages_i_pasted_section_home page.
   The newest page gets the story; the rest are pages you turn over to read what
   was written on the back. The art is the site's drawn <Scene>; an entry that
   carries `img` shows that photo instead. */

/* chips come from the pages themselves, so a new tag in the data just appears */
const CATS = ['All', ...new Set(MOMENTS_DATA.map((m) => m.tag))]

/* the reference's rest tilts, so a pile of six never lines up into a grid */
const rot = (i) => [-3, 2.5, -1.5, 3, -2.5, 1.5][i % 6]

const Art = ({ m, label }) =>
  m.img ? (
    <img src={m.img} alt={m.alt ?? label} loading="lazy" decoding="async" />
  ) : (
    <Scene type={m.scene} tone={m.tone} />
  )

/* one page from the pile: front has the art and the line, back has the note */
function PastedPage({ m, i }) {
  const [flipped, setFlipped] = useState(false)
  const [mon, yr] = m.date.split(' ')

  return (
    <button
      type="button"
      className="lp-card"
      data-reveal
      aria-pressed={flipped}
      onClick={() => setFlipped((v) => !v)}
      style={{ '--r': `${rot(i + 1)}deg`, '--i': i + 1 }}
    >
      <span
        className="sb-tape"
        style={{ left: '50%', marginLeft: -39, top: -11, transform: `rotate(${rot(i + 3)}deg)` }}
        aria-hidden="true"
      />
      <span className="lp-in">
        <span className="lp-face lp-front">
          <span className="lp-art" aria-hidden="true">
            <Art m={m} label={`${m.caption}, ${m.title}`} />
          </span>
          <b className="lp-cap">{m.caption}</b>
          <small className="lp-meta">{m.title} · {m.date}</small>
          <svg className="lp-turn" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 12a8 8 0 0 1 14-5M20 4v4h-4M20 12a8 8 0 0 1-14 5M4 20v-4h4" />
          </svg>
        </span>

        <span className="lp-face lp-back">
          <small>on the back</small>
          <span className="lp-note">{m.note}</span>
          <span className="lp-row">
            <em className="lp-mood">{m.mood}</em>
            <span className="lp-stamp" aria-hidden="true">{mon}<br />{yr}</span>
          </span>
        </span>
      </span>
    </button>
  )
}

/* the newest page, opened flat: print on the left, the story on ruled paper */
function Featured({ m }) {
  return (
    <div className="lp-feat" data-reveal>
      <figure className="lp-fig">
        <span
          className="sb-tape"
          style={{ left: '50%', marginLeft: -39, top: -11, transform: 'rotate(-3deg)' }}
          aria-hidden="true"
        />
        <span className="lp-new" aria-hidden="true">fresh<br />page!</span>
        <span className="lp-art" aria-hidden="true">
          <Art m={m} label={`${m.caption}, ${m.title}`} />
        </span>
        <b className="lp-cap">{m.caption}</b>
      </figure>

      <div className="lp-story">
        <p className="lp-meta">{m.title} · {m.date}</p>
        <h3>{m.caption}</h3>
        <p className="lp-t">{m.note}</p>
        <div className="lp-chips">
          <span className="lp-chip is-static">{m.mood}</span>
          <span className="lp-chip is-static">{m.tag}</span>
        </div>
        <a href="#snapshots">see more in snapshots →</a>
      </div>
    </div>
  )
}

export default function Moments() {
  const ref = useRef(null)
  const [cat, setCat] = useState('All')
  const [shuffled, setShuffled] = useState(null)   // null = newest first

  const list = useMemo(() => {
    const base = MOMENTS_DATA.filter((m) => cat === 'All' || m.tag === cat)
    return shuffled ? [...base].sort((a, b) => shuffled[a.id] - shuffled[b.id]) : base
  }, [cat, shuffled])

  // the pile is rebuilt on filter/shuffle, so the reveal has to re-observe it
  useReveal(ref, [cat, shuffled])

  const shuffle = () =>
    setShuffled(shuffled ? null : Object.fromEntries(MOMENTS_DATA.map((m) => [m.id, Math.random()])))

  const featured = list[0]

  return (
    <section id="moments" ref={ref} className="sb lp max-w-5xl mx-auto px-5 py-24">
      <SectionArt variant="moments" />
      <header className="lp-hd">
        <div>
          <p className="sb-kick" data-reveal>~/latest</p>
          <h2 className="sb-title" data-reveal style={{ '--i': 1 }}>
            Pages I <span className="sb-mark">pasted</span> in
          </h2>
          <p className="sb-sub" data-reveal style={{ '--i': 2 }}>
            the newest one gets the whole story. turn the others over — I wrote on the backs.
          </p>
        </div>

        <div className="lp-tools" data-reveal style={{ '--i': 3 }}>
          <div className="lp-chips" role="group" aria-label="Filter pages">
            {CATS.map((c) => (
              <button
                key={c}
                type="button"
                className="lp-chip lp-filter"
                aria-pressed={c === cat}
                onClick={() => setCat(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <button type="button" className="lp-shuf" onClick={shuffle}>
            {shuffled ? 'newest first' : 'shuffle the pile'}
          </button>
        </div>
      </header>

      <p className="lp-count" aria-live="polite">
        {list.length} {list.length === 1 ? 'page' : 'pages'}
        {cat === 'All' ? ' pasted in lately' : ` in ${cat.toLowerCase()}`}
      </p>

      <div className="lp-grid">
        {!featured && <p className="lp-empty">nothing here yet…</p>}
        {featured && <Featured m={featured} key={`${cat}-${featured.id}`} />}

        {list.slice(1).map((m, i) => (
          <PastedPage key={m.id} m={m} i={i} />
        ))}

        {featured && (
          <a className="lp-more" href="#snapshots" data-reveal style={{ '--i': list.length }}>
            <span>there’s more in</span>
            <b>snapshots →</b>
          </a>
        )}
      </div>
    </section>
  )
}
