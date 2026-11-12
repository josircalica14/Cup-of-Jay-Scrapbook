import { useCallback, useEffect, useRef, useState } from 'react'
import PageHead from './PageHead'
import useReveal from '../../hooks/usePageReveal'
import { MarginRail, Bookmark, CalendarPage, Heart, Paperclip, Squiggle, Stars } from './PageArt'
import { DIARY } from '../../data/pages'
import { PHOTOS } from '../../data/snapshots'
import { useReducedMotion } from '../../hooks/motion'

/* One hand-drawn mark per mood, same stroke language as the home diary. */
const MOOD = {
  cozy: <path d="M4 13c2-6 12-6 16 0" />,
  proud: <path d="M12 3l2.4 5.2 5.6.6-4.2 3.9 1.2 5.6L12 15.6 6.9 18.3l1.2-5.6L4 8.8l5.6-.6z" />,
  sleepy: <path d="M16.5 12.5A6.5 6.5 0 1 1 8 5.2a5.2 5.2 0 0 0 8.5 7.3z" />,
}

/* Phone- and tablet-sized screens show one page at a time; anything wider
   opens a spread. */
function useNarrow() {
  const q = '(max-width: 900px)'
  const [narrow, setNarrow] = useState(() => typeof window !== 'undefined' && window.matchMedia(q).matches)
  useEffect(() => {
    const mq = window.matchMedia(q)
    const on = () => setNarrow(mq.matches)
    // both: the media query covers rotation and zoom, resize covers the rest
    mq.addEventListener('change', on)
    window.addEventListener('resize', on)
    return () => {
      mq.removeEventListener('change', on)
      window.removeEventListener('resize', on)
    }
  }, [])
  return narrow
}

/* Prints taped into the entries — Jay's own photos from the snapshot roll, so
   the diary pages hold real pictures instead of decoration. */
const photo = (title) => PHOTOS.find((p) => p.t === title)
const NOTE_PHOTOS = [
  photo('Window-shift supervisor'),
  photo('Desk mascot'),
  photo('Teal keys, 1 a.m.'),
]
const INSIDE_PHOTO = photo('Baywalk, sun clocking out')

function Cover() {
  return (
    <div className="sbp-bk-cover">
      <div className="sbp-bk-plate">
        <span className="sbp-bk-plate-tape" aria-hidden="true" />
        <span className="sbp-bk-plate-top">cup of jay</span>
        <span className="sbp-bk-plate-ttl">Dear<br />diary</span>
        <span className="sbp-bk-plate-sub">keep out, please</span>
      </div>
      <svg className="sbp-bk-sp a" viewBox="0 0 24 24" aria-hidden="true"><use href="#sbp-sp" /></svg>
      <svg className="sbp-bk-sp b" viewBox="0 0 24 24" aria-hidden="true"><use href="#sbp-sp" /></svg>
      <span className="sbp-bk-rib" aria-hidden="true" />
    </div>
  )
}

/* Inside front cover — the book's welcome page: the owner's nameplate, a print
   taped down with the coffee sticker, and a note to whoever opened it. Every
   size is a container unit, so the whole composition scales with the sheet. */
function Inside() {
  return (
    <div className="sbp-bk-pg l sbp-bk-ins">
      <svg className="sbp-bk-spark a" viewBox="0 0 24 24" aria-hidden="true"><use href="#sbp-sp" /></svg>
      <svg className="sbp-bk-spark b" viewBox="0 0 24 24" aria-hidden="true"><use href="#sbp-sp" /></svg>

      <div className="sbp-bk-wi">
        <div className="sbp-bk-np">
          <span>this book belongs to</span>
          <b>jay</b>
          <small>started october 2026</small>
        </div>

        {INSIDE_PHOTO && (
          <figure className="sbp-bk-wphoto">
            <span className="sbp-bk-wtape" aria-hidden="true" />
            <img src={INSIDE_PHOTO.img} alt={INSIDE_PHOTO.alt} loading="lazy" decoding="async" />
            <figcaption>{INSIDE_PHOTO.caption}</figcaption>
            <span className="sbp-bk-wst" aria-hidden="true">handle<br />with coffee</span>
          </figure>
        )}

        <div className="sbp-bk-wtx">
          <h3>Oh, you&rsquo;re here.</h3>
          <p>Pour a coffee, mind the 3am thoughts (they bite). Nothing in here got edited twice. Read gently, laugh loudly.</p>
          <span className="sbp-bk-sg">&mdash; Jay, probably awake</span>
        </div>
      </div>
    </div>
  )
}

function End() {
  return (
    <div className="sbp-bk-pg l sbp-bk-endp">
      <div className="sbp-bk-in sbp-bk-center">
        <svg className="sbp-bk-stars" viewBox="0 0 60 44" aria-hidden="true">
          <path d="M12 3c.9 7.4 3.2 9.7 10.6 10.6C15.2 14.5 12.9 16.8 12 24.2 11.1 16.8 8.8 14.5 1.4 13.6 8.8 12.7 11.1 10.4 12 3z" />
          <path d="M44 22c.5 4.6 2 6.1 6.6 6.6-4.6.5-6.1 2-6.6 6.6-.5-4.6-2-6.1-6.6-6.6 4.6-.5 6.1-2 6.6-6.6z" />
        </svg>
        <h3 className="sbp-bk-name">that&rsquo;s all for now</h3>
        <p className="sbp-bk-hand">more notes after the next rainy afternoon.</p>
      </div>
    </div>
  )
}

function Note({ e, num, side }) {
  const ph = NOTE_PHOTOS[num - 1]
  const mark = MOOD[e.m] || MOOD.cozy
  return (
    <div className={`sbp-bk-pg ${side}`}>
      <div className="sbp-bk-in">
        <div className="sbp-bk-hd">
          <div className="sbp-bk-meta">
            <span className="sbp-bk-dt">{e.mon} {e.day} <i>{e.y}</i></span>
            <span className="sbp-bk-mood">
              <svg viewBox="0 0 24 24" aria-hidden="true">{mark}</svg>
              {e.m}
            </span>
          </div>
          <h3>{e.t}</h3>
        </div>

        <div className="sbp-bk-tx">
          <p>{e.lead}</p>
          {e.more && <p>{e.more}</p>}
        </div>

        {ph && (
          <figure className="sbp-bk-snap" style={{ '--t': side === 'l' ? '-1.6deg' : '1.4deg' }}>
            <span className="sbp-bk-snap-tape" aria-hidden="true" />
            <img src={ph.img} alt={ph.alt} loading="lazy" decoding="async" />
            <figcaption>{ph.caption}</figcaption>
          </figure>
        )}

        <span className="sbp-bk-pn" aria-hidden="true">{num}</span>
      </div>
    </div>
  )
}

const page = (i, side) => (i < DIARY.length ? <Note e={DIARY[i]} num={i + 1} side={side} /> : <End />)

/* The book itself. `key` on <Book> changes with the layout, so a switch from
   spread to single page rebuilds the sheets and the book opens itself again. */
function Book({ narrow, calm }) {
  const stage = useRef(null)
  const total = DIARY.length + 1 // every entry, then the closing page

  /* wide screens: one spread = two pages, the cover folded against the inside
     cover; phones: one page per leaf so a single page fills the book */
  const leaves = []
  if (narrow) {
    leaves.push({ f: <Cover />, b: null })
    leaves.push({ f: <Inside />, b: null })
    for (let i = 0; i < total; i++) leaves.push({ f: page(i, 'r'), b: null })
  } else {
    leaves.push({ f: <Cover />, b: <Inside /> })
    for (let i = 0; i < total; i += 2) {
      leaves.push({ f: page(i, 'r'), b: i + 1 < total ? page(i + 1, 'l') : null })
    }
  }

  const n = leaves.length
  const max = narrow ? n - 1 : n // phones keep the last page in place

  const [t, setT] = useState(0) // how many leaves have turned
  const [flip, setFlip] = useState(null) // which leaf is moving ('all' while closing)
  const tRef = useRef(0)
  const busy = useRef(false)
  const opened = useRef(false)
  const timers = useRef([])

  const later = useCallback((fn, ms) => { timers.current.push(setTimeout(fn, ms)) }, [])

  const turn = useCallback((d) => {
    if (busy.current) return
    const from = tRef.current
    let to = from + d
    if (d > 0 && from >= max) to = 0 // at the end the button closes the book
    if (to < 0 || to > n) return
    tRef.current = to
    busy.current = true
    setT(to)
    setFlip(to === 0 ? 'all' : Math.min(from, to, n - 1))
    later(() => { busy.current = false; setFlip(null) }, calm ? 80 : 1250)
  }, [max, n, calm, later])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  /* the book opens itself shortly after the page arrives — the page's one
     authored moment, before the visitor touches anything */
  useEffect(() => {
    if (opened.current) return
    const id = setTimeout(() => { opened.current = true; turn(1) }, calm ? 80 : 800)
    return () => clearTimeout(id)
  }, [calm, turn])

  /* arrows turn pages, never while typing */
  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (e.target instanceof HTMLElement && e.target.closest('input, textarea, [contenteditable="true"]')) return
      if (e.key === 'ArrowRight') { e.preventDefault(); turn(1) }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); turn(-1) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [turn])

  const state = t === 0 ? 'cover' : !narrow && t === n ? 'back' : 'open'
  const lastEntry = DIARY.length
  const label = narrow
    ? t === 0 ? 'the cover'
      : t === 1 ? 'the inside cover'
        : t === total + 1 ? 'the end'
          : `entry ${t - 1} of ${lastEntry}`
    : t === 0 ? 'the cover'
      : t === n ? 'the end'
        : t === 1 ? `entry 1 of ${lastEntry}`
          : `entries ${2 * t - 2}\u2013${Math.min(2 * t - 1, lastEntry)}`
  const nextText = t === 0 ? 'open the book' : t >= max ? 'close the book' : 'turn the page'

  return (
    <div className="sbp-bk-wrap" data-r style={{ '--i': 1 }}>
      <div className="sbp-bk-stage" ref={stage}>
        <div className="sbp-bk" data-s={state} role="group" aria-label="Diary book">
          <div className="sbp-bk-bd l" aria-hidden="true" />
          <div className="sbp-bk-bd r" aria-hidden="true" />
          {leaves.map((lf, i) => {
            const turned = i < t
            const moving = flip === 'all' || flip === i
            // only the spread on show is exposed: the front of the top unturned
            // leaf and the back of the last turned one
            const showFront = i === t
            const showBack = i === t - 1
            return (
              <div
                key={i}
                className={`sbp-bk-leaf${moving ? ' moving' : ''}`}
                data-turned={turned || undefined}
                style={{ zIndex: flip === i ? 99 : turned ? i + 1 : n - i }}
              >
                <div className="sbp-bk-face front" aria-hidden={!showFront || undefined}>{lf.f}</div>
                <div className="sbp-bk-face back" aria-hidden={!showBack || undefined}>{lf.b}</div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="sbp-bk-ctl">
        <button type="button" className="sbp-bk-btn" aria-label="Previous page" disabled={t <= 1} onClick={() => turn(-1)}>
          &larr; back
        </button>
        <span className="sbp-bk-n" aria-live="polite">{label}</span>
        <button
          type="button"
          className="sbp-bk-btn go"
          aria-label={t === 0 ? 'Open the book' : t >= max ? 'Close the book' : 'Next page'}
          onClick={() => turn(1)}
        >
          {nextText}
        </button>
      </div>
      <p className="sbp-bk-hint">&larr; &rarr; keys turn the pages too</p>
    </div>
  )
}

export default function DearDiary() {
  const ref = useRef(null)
  const narrow = useNarrow()
  const calm = useReducedMotion()
  useReveal(ref, [narrow])

  return (
    <div ref={ref} className="sbp-art-host">
      {/* pen-and-paper doodles in the outer gutters, like the other pages;
          hidden where there is no gutter to hold them */}
      <MarginRail seed={2}
        left={[Bookmark, Stars, Heart, Squiggle, Paperclip, CalendarPage]}
        right={[Stars, CalendarPage, Bookmark, Paperclip, Squiggle, Heart]} />

      <PageHead kick="~/dear diary" a="Dear" mark="diary" sub="unpolished, unedited, mine." />

      <Book key={narrow ? 'one' : 'two'} narrow={narrow} calm={calm} />
    </div>
  )
}
