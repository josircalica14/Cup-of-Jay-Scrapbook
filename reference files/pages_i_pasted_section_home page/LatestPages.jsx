import { useEffect, useRef, useState } from 'react'
import './latest-pages.css'
import { LATEST, LATEST_ART, monthYear, rot } from './latest-data'

/* Fades each [data-r]/[data-m] element in once, as it scrolls into view. Re-runs when deps change. */
function useReveal(ref, deps = []) {
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const els = [...root.querySelectorAll('[data-r],[data-m]')]
    if (!('IntersectionObserver' in window)) { els.forEach((el) => el.classList.add('sb-is-in')); return }
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue
        io.unobserve(e.target); e.target.classList.add('sb-is-in')
      }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

/* Home section: the newest page is featured with its story, the rest are polaroids you flip over
   to read what was written on the back. Works anywhere: it brings its own colors (the .sb tokens). */
const CATS = ['All', 'Places', 'Food', 'Everyday']

const Art = ({ x }) =>
  x.img
    ? <span className="sb-lp-img" role="img" aria-label={x.t} style={{ backgroundImage: `url("${x.img}")` }} />
    : <svg viewBox="0 0 200 150" preserveAspectRatio="xMidYMid slice" role="img" aria-label={x.t}
           dangerouslySetInnerHTML={{ __html: LATEST_ART[x.art] }} />

function Polaroid({ x, i }) {
  const [flipped, setFlipped] = useState(false)
  const [mon, yr] = monthYear(x.d).toUpperCase().split(' ')
  return (
    <button className="sb-lp-pl" type="button" data-m aria-pressed={flipped} aria-label={`Flip the photo: ${x.t}`}
            onClick={() => setFlipped(!flipped)} style={{ '--r': `${rot(i + 1)}deg`, '--i': i }}>
      <span className="sb-tape" style={{ left: '50%', marginLeft: -35, top: -12, transform: `rotate(${rot(i + 3)}deg)` }} />
      <span className="sb-lp-in">
        <span className="sb-lp-f">
          <span className="sb-lp-art"><Art x={x} /></span>
          <b className="sb-lp-cap">{x.t}</b>
          <small className="sb-lp-meta">{x.w} · {monthYear(x.d)}</small>
          <svg className="sb-lp-curl" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 0 1 14-5M20 4v4h-4M20 12a8 8 0 0 1-14 5M4 20v-4h4" /></svg>
        </span>
        <span className="sb-lp-b">
          <small>on the back</small>
          <span className="sb-lp-note">{x.note}</span>
          <span className="sb-lp-row"><em className="sb-lp-mood">{x.mood}</em><span className="sb-lp-st">{mon}<br />{yr}</span></span>
        </span>
      </span>
    </button>
  )
}

export default function LatestPages({ allHref = '#snapshots' }) {
  const ref = useRef(null)
  const [cat, setCat] = useState('All')
  const [rnd, setRnd] = useState(null)        // null = newest first, otherwise a shuffled order

  let list = LATEST.filter((x) => cat === 'All' || x.cat === cat)
  if (rnd) list = [...list].sort((a, b) => rnd[a.t] - rnd[b.t])
  const shuffle = () => setRnd(rnd ? null : Object.fromEntries(LATEST.map((x) => [x.t, Math.random()])))

  useReveal(ref, [cat, rnd])
  const f = list[0]

  return (
    <section ref={ref} className="sb sb-js sb-lp" id="lp">
      <div className="sb-lp-hd">
        <div>
          <p className="sb-kick" data-r>~/latest</p>
          <h2 data-r style={{ '--i': 1 }}>Fresh off the <span className="sb-mark">glue stick</span></h2>
          <p className="sb-lp-sub" data-r style={{ '--i': 2 }}>pages I pasted in lately. flip them over, I wrote on the backs.</p>
        </div>
        <div className="sb-lp-tools" data-r style={{ '--i': 3 }}>
          <div className="sb-chips" role="group" aria-label="Filter pages">
            {CATS.map((c) => <button key={c} className="sb-chip" type="button" aria-pressed={c === cat} onClick={() => setCat(c)}>{c}</button>)}
          </div>
          <button className="sb-lp-shuf" type="button" onClick={shuffle}>{rnd ? 'newest first' : 'shuffle the pile'}</button>
        </div>
      </div>
      <p className="sb-lp-count" aria-live="polite">
        {list.length} {list.length === 1 ? 'page' : 'pages'}{cat === 'All' ? ' pasted in lately' : ` in ${cat.toLowerCase()}`}
      </p>

      <div className="sb-lp-grid">
        {!f && <p className="sb-lp-empty">nothing here yet…</p>}
        {f && (
          <div className="sb-lp-feat" key={`${cat}-${f.t}`} data-m>
            <figure className="sb-lp-fig">
              <span className="sb-tape" style={{ left: '50%', marginLeft: -35, top: -12, transform: 'rotate(-3deg)' }} />
              <span className="sb-lp-new">fresh<br />page!</span>
              <span className="sb-lp-art"><Art x={f} /></span>
              <b className="sb-lp-cap">{f.t}</b>
            </figure>
            <div className="sb-lp-story">
              <p className="sb-m">{f.w} · {monthYear(f.d)}</p>
              <h3>{f.t}</h3>
              <p className="sb-t">{f.note}</p>
              <div className="sb-chips">
                <span className="sb-chip" style={{ cursor: 'default' }}>{f.mood}</span>
                <span className="sb-chip" style={{ cursor: 'default' }}>{f.cat}</span>
              </div>
              <a href={allHref}>see more in snapshots →</a>
            </div>
          </div>
        )}
        {list.slice(1).map((x, i) => <Polaroid key={x.t} x={x} i={i} />)}
        {f && (
          <a className="sb-lp-more" href={allHref} data-m style={{ '--i': list.length }}>
            <span>there’s more in</span><b>snapshots →</b>
          </a>
        )}
      </div>
    </section>
  )
}
