import { useEffect, useMemo, useRef, useState } from 'react'
import PageHead from './PageHead'
import useReveal from './useReveal'
import { DIARY, dparts } from './data'

/* ---------- small hooks ---------- */
const useMedia = (q) => {
  const [m, setM] = useState(() => window.matchMedia(q).matches)
  useEffect(() => {
    const mq = window.matchMedia(q)
    const on = () => setM(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [q])
  return m
}

/* ---------- pages inside the book ---------- */
const Spark = ({ style }) => <svg className="sb-sp" viewBox="0 0 24 24" style={style}><use href="#sb-sp" /></svg>

const Cover = () => (
  <div className="sb-cov">
    <div className="sb-plate">
      <span className="sb-tape" />
      <small>~/dear diary</small>
      <b>Dear<br />Diary</b>
      <span>the unpolished version</span>
    </div>
    <Spark style={{ top: '7%', right: '9%' }} />
    <Spark style={{ bottom: '12%', left: '15%', width: 16, height: 16 }} />
    <i className="sb-rib" />
  </div>
)

const Inside = () => (
  <div className="sb-pg sb-l sb-ins sb-c">
    <p className="sb-kick">this book belongs to</p>
    <h3>Just Jay</h3>
    <p>unpolished, unedited, mine.</p>
  </div>
)

const End = () => (
  <div className="sb-pg sb-endp sb-c">
    <h3>to be continued…</h3>
    <p>more notes soon</p>
  </div>
)

const Blank = () => <div className="sb-pg sb-l sb-endp" />

function Note({ e, num, side }) {
  const p = dparts(e.d)
  return (
    <div className={`sb-pg sb-${side}`}>
      <span className="sb-tape" />
      <div className="sb-hd">
        <div className="sb-dt">{p.m} {p.day}, {p.y}</div>
        <p className="sb-mood">{e.m}</p>
        <h3>{e.t}</h3>
      </div>
      {/* long entries scroll inside the page */}
      <div className="sb-tx"><p>{e.s}</p>{e.x && <p>{e.x}</p>}</div>
      <span className="sb-pn">— {num} —</span>
    </div>
  )
}

/* ---------- the page ---------- */
export default function DearDiary() {
  const ref = useRef(null)
  useReveal(ref)

  const narrow = useMedia('(max-width: 719px)')
  const calm = useMedia('(prefers-reduced-motion: reduce)')

  /* page sequence: every note, then an "end" page */
  const total = DIARY.length + 1
  const page = (i, side) => (i < DIARY.length ? <Note e={DIARY[i]} num={i + 1} side={side} /> : <End />)

  /* leaf = one physical sheet: front is the right-hand page, back is the left-hand page.
     Wide screens show a two-page spread; narrow screens show one page at a time. */
  const leaves = useMemo(() => {
    const out = [{ f: <Cover />, b: narrow ? <Blank /> : <Inside /> }]
    if (narrow) {
      for (let i = 0; i < total; i++) out.push({ f: page(i, 'r'), b: <Blank /> })
    } else {
      for (let i = 0; i < total; i += 2) out.push({ f: page(i, 'r'), b: i + 1 < total ? page(i + 1, 'l') : <Blank /> })
    }
    return out
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [narrow])

  const n = leaves.length
  const max = narrow ? n - 1 : n          // narrow: the last page stays put
  const [t, setT] = useState(0)           // how many sheets have been turned
  const [flip, setFlip] = useState(null)  // which sheet is moving ('all' while closing)
  const tRef = useRef(0)
  const busy = useRef(false)
  const timers = useRef([])
  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms))

  const turn = (d) => {
    if (busy.current) return
    const from = tRef.current
    let to = from + d
    if (d > 0 && from >= max) to = 0      // at the end the button closes the book
    if (to < 0 || to > n) return
    tRef.current = to
    busy.current = true
    setT(to)
    setFlip(to === 0 ? 'all' : Math.min(from, to, n - 1))
    later(() => { busy.current = false; setFlip(null) }, calm ? 60 : 1250)
  }

  /* open the cover shortly after the page loads (and again if the layout switches) */
  useEffect(() => {
    tRef.current = 0; setT(0); busy.current = false
    later(() => turn(1), calm ? 60 : 850)
    return () => { timers.current.forEach(clearTimeout); timers.current = [] }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [narrow])

  useEffect(() => {
    const key = (e) => {
      if (e.key === 'ArrowRight') turn(1)
      if (e.key === 'ArrowLeft') turn(-1)
    }
    window.addEventListener('keydown', key)
    return () => window.removeEventListener('keydown', key)
  })

  const state = t === 0 ? 'cover' : !narrow && t === n ? 'back' : 'open'
  const label =
    !narrow && t === n ? 'the end'
    : t === 0 ? 'closed'
    : narrow ? `page ${t}`
    : t === 1 ? 'page 1'
    : `pages ${2 * (t - 1)}–${Math.min(2 * (t - 1) + 1, total)}`
  const nextText = t === 0 ? 'open the book' : t >= max ? 'close the book' : 'turn the page →'

  return (
    <div ref={ref}>
      <PageHead kick="~/dear diary" a="Dear" mark="diary" sub="unpolished, unedited, mine." />

      <div className="sb-bk-stage">
        <div className="sb-book" data-s={state} aria-label="Diary book">
          <div className="sb-bd sb-bd-r" /><div className="sb-bd sb-bd-l" />
          {leaves.map((lf, i) => {
            const turned = i < t
            const moving = flip === 'all' || flip === i
            return (
              <div key={i} className={`sb-leaf${turned ? ' sb-turned' : ''}${moving ? ' sb-flip' : ''}`}
                   style={{ zIndex: flip === i ? 99 : turned ? i + 1 : n - i }}>
                <div className="sb-face sb-front" aria-hidden={turned}>{lf.f}</div>
                <div className="sb-face sb-back" aria-hidden={!turned}>{lf.b}</div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="sb-bk-ctl">
        <button className="sb-bk-btn" aria-label="Previous page" disabled={t <= 1} onClick={() => turn(-1)}>← back</button>
        <span className="sb-bk-n" aria-live="polite">{label}</span>
        <button className="sb-bk-btn sb-go" aria-label="Next page" onClick={() => turn(1)}>{nextText}</button>
      </div>
    </div>
  )
}
