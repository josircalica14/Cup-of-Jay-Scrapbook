import { useEffect, useRef, useState } from 'react'
import PageHead from './PageHead'
import useReveal from '../../hooks/usePageReveal'
import { useReducedMotion } from '../../hooks/motion'
import { MarginRail, Ring, Camera, Envelope, Heart, Paperclip, Stars, Squiggle, Bookmark, CalendarPage, Arrow, TornStrip } from './PageArt'
import { rot } from '../../data/pages'
import {
  ICONS, shot, INTRO_SHOT, SLOTS, FAVS, LOVES, FACTS, GOALS, MEMS, QUOTE, LETTER,
  LEARNING, STICKY, TRACKS, POTD, NOW, END_QUOTES, dparts,
} from '../../data/about'

import '../../styles/personal-corner.css'

/* The about page: the reference's ten sections, filled with Jay's own content.
   Every print is a real photo from the snapshot roll — `Print` falls back to the
   dashed placeholder if the roll ever loses that title. */

/* ---------- tiny building blocks ---------- */
const Ico = ({ n }) => <svg viewBox="0 0 24 24" aria-hidden="true"><path d={ICONS[n]} /></svg>
const Tape = ({ style }) => <span className="sbp-tape" style={style} aria-hidden="true" />
const calm = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const tile = (r, i) => ({ '--r': `${r}deg`, '--i': i })

/* a print from the phone roll, or the dashed placeholder when there is none */
const Print = ({ p, ratio = '4 / 5', alt }) =>
  p ? (
    <span className="sbp-ab-shot">
      <img src={p.img} alt={alt ?? p.alt} loading="lazy" decoding="async" style={{ aspectRatio: ratio }} />
    </span>
  ) : (
    <span className="sbp-ab-shot sbp-ab-noimg" role="img" aria-label="No photo chosen yet">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d={ICONS.camera} /></svg>
      <em>add the photo</em>
    </span>
  )

/* every section: a named heading, the line under it, then its own composition */
const Sec = ({ id, title, sub, children }) => (
  <section className="sbp-ab-sec" id={id} aria-labelledby={`${id}-h`}>
    <h2 id={`${id}-h`} data-r>{title}</h2>
    <p className="sbp-ab-sub" data-r style={{ '--i': 1 }}>{sub}</p>
    {children}
  </section>
)

/* ---------- 4: tap-to-flip fact ---------- */
function Flip({ q, a, i }) {
  const [on, setOn] = useState(false)
  return (
    <button className="sbp-ab-t sbp-ab-flip" type="button" data-r aria-pressed={on}
            onClick={() => setOn(!on)} style={tile(rot(i + 1), i)}>
      <span className="sbp-ab-fi">
        <span className="sbp-ab-ff"><b>{q}</b><em>tap to flip</em></span>
        <span className="sbp-ab-fb"><small>the answer</small><p>{a}</p></span>
      </span>
    </button>
  )
}

/* ---------- the page's one live thing, up in the introduction: the coffee
   counter the home page keeps too, so the first screen holds a real action --- */
function Cups() {
  const [n, setN] = useState(4)
  const [bump, setBump] = useState(0)
  const mood = ['none yet. brave.', 'warming up.', 'a good pace.', 'productive buzz.', 'seeing colours.', 'please drink water.'][Math.min(n, 5)]
  return (
    <div className="sbp-ab-cups">
      <button type="button" className="sbp-ab-cup" aria-label="Pour another cup of coffee"
              onClick={() => { setN(n + 1); setBump(bump + 1) }}>
        <svg viewBox="0 0 30 30" aria-hidden="true">
          <g className="steam"><path d="M10 9c-2-2 2-3 0-5" /><path d="M15 9c-2-2 2-3 0-5" /><path d="M20 9c-2-2 2-3 0-5" /></g>
          <path d="M5 13h17v6a6 6 0 0 1-6 6h-5a6 6 0 0 1-6-6v-6zM22 14h2a3 3 0 0 1 0 6h-2" />
        </svg>
        <span>pour cup no. <b key={bump} className={bump ? 'bump' : ''}>{n + 1}</b></span>
      </button>
      <p className="sbp-ab-cupsnote" aria-live="polite">cup no. {n} as we speak. {mood}</p>
    </div>
  )
}

/* ---------- 5: goals, all five on one to-do sheet ---------- */
function Goals() {
  const [done, setDone] = useState(() => GOALS.map(() => [false, false, false]))
  const tick = (g, k) => setDone((d) => d.map((row, j) => (j === g ? row.map((v, l) => (l === k ? !v : v)) : row)))
  const total = done.flat().filter(Boolean).length

  return (
    <div className="sbp-ab-t sbp-ab-sheet" style={tile(-0.8, 0)}>
      <Tape style={{ top: -11, left: 46, transform: 'rotate(-4deg)' }} />
      <Tape style={{ top: -10, right: 58, transform: 'rotate(5deg)' }} />
      <p className="sbp-ab-sheet-in">
        Five things I am aiming at, three lines under each. Tick them off as they happen —
        this is the version of the page that keeps score.
      </p>
      <p className="sbp-ab-count" aria-live="polite">{total} of 15 ticked</p>
      {GOALS.map(([title, lines], g) => (
        <div className="sbp-ab-deal" key={title}>
          <div className="sbp-ab-deal-hd">
            <h3>{title}</h3>
            <small>{done[g].filter(Boolean).length} / {lines.length}</small>
          </div>
          <ul>
            {lines.map((line, k) => (
              <li key={line}>
                <button className="sbp-ab-chk" type="button" aria-pressed={done[g][k]} onClick={() => tick(g, k)}>
                  <i className="sbp-ab-bx" aria-hidden="true">
                    <svg viewBox="0 0 24 24"><path d="M5 12l5 5 9-10" /></svg>
                  </i>
                  <span>{line}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

/* ---------- 6: the film strip of memories ---------- */
function Film() {
  return (
    <div className="sbp-ab-film" data-r>
      <div className="sbp-ab-fs">
        {MEMS.map(([title, line], i) => {
          const p = shot(title)
          return (
            <figure className="sbp-pol sbp-ab-mem" key={title} style={{ '--r': `${rot(i + 3)}deg`, margin: 0 }}>
              <Tape style={{ top: -12, left: '50%', marginLeft: -35, transform: `rotate(${rot(i + 5)}deg)` }} />
              <Print p={p} ratio="4 / 5" />
              <p>{title}</p>
              <span className="sbp-ab-memline">{line}</span>
            </figure>
          )
        })}
      </div>
    </div>
  )
}

/* ---------- 7: the personal corner ---------- */
function EnvelopeOpen() {
  const [open, setOpen] = useState(false)
  return (
    <button className={`sbp-pc-env${open ? ' on' : ''}`} type="button" aria-expanded={open}
            aria-label="Open the letter to my future self" onClick={() => setOpen(!open)}>
      <span className="sbp-pc-letter"><p>{LETTER}</p></span>
      <span className="sbp-pc-flap" aria-hidden="true" />
      <span className="sbp-pc-evb">
        <span className="sbp-pc-evlabel">
          <small>{open ? 'tap to close' : 'tap to open'}</small>
          <b>a letter to future me</b>
        </span>
      </span>
    </button>
  )
}

/* ---------- 8: the soundtrack ---------- */
function Soundtrack() {
  /* one state holds the track and how far into it we are, so the ticking
     interval is the only thing that moves it — no effect chasing another */
  const [pos, setPos] = useState({ i: 0, p: 0 })
  const [on, setOn] = useState(false)
  const n = TRACKS.length
  const { i, p } = pos

  useEffect(() => {
    if (!on) return
    const id = setInterval(() => {
      setPos((s) => {
        const next = s.p + 100 / 60 // about twelve seconds a track
        return next >= 100 ? { i: (s.i + 1) % n, p: 0 } : { i: s.i, p: next }
      })
    }, 200)
    return () => clearInterval(id)
  }, [on, n])

  const go = (k) => setPos({ i: k, p: 0 })
  const [title, artist, chapter] = TRACKS[i]

  return (
    <div className="sbp-ab-pl">
      <div className={`sbp-ab-t sbp-card sbp-ab-deck${on ? ' on' : ''}`} style={tile(-1, 1)}>
        <span className="sbp-ab-vinyl" aria-hidden="true">
          <svg viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="56" />
            <circle cx="60" cy="60" r="48" />
            <circle cx="60" cy="60" r="40" />
            <circle cx="60" cy="60" r="32" />
            <path className="sheen" d="M22 26A52 52 0 0 1 60 8a52 52 0 0 1 36 16" />
            <circle className="label" cx="60" cy="60" r="17" />
            <circle className="hole" cx="60" cy="60" r="4" />
          </svg>
        </span>
        <small>now playing</small>
        <h3>{title}</h3>
        <small className="sbp-ab-trk-sub">{artist} &middot; {chapter}</small>
        <div className="sbp-ab-bar" role="progressbar" aria-label="Track position, pretend" aria-valuemin="0" aria-valuemax="100" aria-valuenow={Math.round(p)}>
          <i style={{ width: `${p}%` }} />
        </div>
        <div className="sbp-ab-ctl">
          <button type="button" aria-label="Previous track" onClick={() => go((i + n - 1) % n)}>prev</button>
          <button type="button" className="go" onClick={() => setOn(!on)}>{on ? 'pause' : 'play'}</button>
          <button type="button" aria-label="Next track" onClick={() => go((i + 1) % n)}>next</button>
        </div>
        <div className="sbp-ab-eq" aria-hidden="true"><i /><i /><i /><i /></div>
        <p className="sbp-ab-hint">a pretend player, no audio on this page, just the list.</p>
      </div>

      <div>
        {TRACKS.map((tr, k) => (
          <button key={tr[0]} className={`sbp-ab-trk${k === i ? ' on' : ''}`} type="button"
                  aria-pressed={k === i} onClick={() => { go(k); setOn(true) }}>
            <span className="sbp-ab-k" aria-hidden="true" />
            <span><b>{tr[0]}</b><small>{tr[1]}</small></span>
            <em>{tr[2]}</em>
          </button>
        ))}
      </div>
    </div>
  )
}

/* ---------- 9: photo of the day ---------- */
function PhotoOfDay() {
  const [d, setD] = useState(0)
  const it = POTD[d]
  const dp = dparts(it.p.s)
  return (
    <div className="sbp-ab-potd" data-r>
      <figure className="sbp-ab-big">
        <Tape style={{ top: -12, left: '50%', marginLeft: -37, transform: 'rotate(-3deg)' }} />
        <span className="sbp-ab-stamp"><span>{dp.m}<b>{dp.day}</b>{dp.y}</span></span>
        <Print p={it.p} ratio="4 / 3" />
        <figcaption>{it.p.t}</figcaption>
      </figure>

      <div className="sbp-ab-info">
        <dl>
          <div><dt>date</dt><dd>{dp.m} {dp.day}, {dp.y}</dd></div>
          <div><dt>shot on</dt><dd>{it.dev}</dd></div>
        </dl>
        <p className="sbp-ab-story">{it.story}</p>
        <div className="sbp-ab-ctl" style={{ justifyContent: 'flex-start' }}>
          <button type="button" disabled={d >= POTD.length - 1} onClick={() => setD(d + 1)}>older day</button>
          <button type="button" className="go" disabled={d <= 0} onClick={() => setD(d - 1)}>newer day</button>
        </div>
      </div>
    </div>
  )
}

/* ---------- end of the page ---------- */
function EndQuotes({ onTop }) {
  const [q, setQ] = useState(0)
  const [out, setOut] = useState(false)
  const next = () => {
    setOut(true)
    setTimeout(() => { setQ((v) => (v + 1) % END_QUOTES.length); setOut(false) }, calm() ? 0 : 300)
  }
  return (
    <div className="sbp-ab-end" data-r>
      {[0, -2, -4].map((dl) => (
        <svg key={dl} className="sbp-sp" viewBox="0 0 24 24" aria-hidden="true" style={{ animationDelay: `${dl}s` }}>
          <use href="#sbp-sp" />
        </svg>
      ))}
      <p className={`sbp-ab-quote${out ? ' out' : ''}`} aria-live="polite">{END_QUOTES[q]}</p>
      <div className="sbp-ab-ctl">
        <button type="button" onClick={next}>another one</button>
        <button type="button" className="go" onClick={onTop}>back to top</button>
      </div>
      <small>end of the long version</small>
    </div>
  )
}

/* ---------- the page ---------- */
export default function AboutPage() {
  const ref = useRef(null)
  const calmMotion = useReducedMotion()
  useReveal(ref)

  const top = () => window.scrollTo({ top: 0, behavior: calmMotion ? 'auto' : 'smooth' })

  return (
    <div ref={ref} className="sbp-art-host">
      <MarginRail seed={5}
        left={[Camera, Stars, Heart, Squiggle, Envelope, Bookmark]}
        right={[Ring, CalendarPage, Paperclip, Stars, Arrow, TornStrip]} />

      <PageHead kick="~/things about me" a="Come in, it's just" mark="Jay"
                sub="the longer version — favorites, facts, plans, and more." />

      {/* 1 */}
      <Sec id="ab1" title="A little introduction" sub="the full hello: who i am, how i am, and what makes me different.">
        <div className="sbp-ab-intro">
          <article className="sbp-ab-t sbp-ab-note" style={tile(-0.7, 0)}>
            <Tape style={{ top: -11, left: 50, transform: 'rotate(-4deg)' }} />
            <Tape style={{ top: -10, right: 60, transform: 'rotate(5deg)' }} />
            <div className="sbp-ab-hello">
              <p>
                Hello! I'm <b>Josir James S. Calica</b> — call me that in public and I'll pretend
                I don't know you. Jay is fine.
              </p>
              <p>
                Fresh out of an IT degree in Laguna, equally obsessed with clean code and
                chaotic <em>sunsets</em>.
              </p>
              <p>
                I turn coffee into websites, screenshots into memories, and bugs into learning
                experiences.
              </p>
              <p>
                This corner of the internet is where I hoard the small stuff: jeepney windows,
                3am thoughts, and proof that I drink too much caffeine.
              </p>
              <p className="sbp-ab-sign">— Jay (the unpolished version)</p>
            </div>
          </article>

          {/* the print keeps the top of the right column; the coffee counter
              and the three answers sit under it, so the note stays a letter */}
          <div className="sbp-ab-aside">
            <figure className="sbp-ab-print" data-r style={{ '--i': 1 }}>
              <Tape style={{ top: -12, left: '50%', marginLeft: -37, transform: 'rotate(-4deg)' }} />
              <Print p={INTRO_SHOT} ratio="4 / 5" />
              <figcaption>the teal suit, the bow tie, and the face behind Cup of Jay</figcaption>
            </figure>

            <div className="sbp-ab-side">
              <Cups />

              <dl className="sbp-ab-slots">
                {SLOTS.map(([k, s]) => (
                  <div key={k}><dt>{k}</dt><dd>{s}</dd></div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </Sec>

      {/* 2 */}
      <Sec id="ab2" title="My favorite things" sub="the small collection i keep coming back to.">
        {/* one taped index card holding all six, instead of six cards: this is
            the collection, not a product grid */}
        <article className="sbp-ab-favs" data-r>
          <Tape style={{ top: -11, left: 44, transform: 'rotate(-4deg)' }} />
          <Tape style={{ top: -10, right: 52, transform: 'rotate(4deg)' }} />
          <ul>
            {FAVS.map(([k, s, ic]) => (
              <li key={k}>
                <span className="sbp-ab-ic"><Ico n={ic} /></span>
                <span className="sbp-ab-favtx">
                  <b>{k}</b>
                  <em>{s}</em>
                  {ic === 'palette' && (
                    <span className="sbp-ab-dots" aria-hidden="true">
                      {['var(--acc)', 'var(--cyan)', 'var(--ink)', 'var(--paper)'].map((c) => <i key={c} style={{ background: c }} />)}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </article>
      </Sec>

      {/* 3 */}
      <Sec id="ab3" title="Things i love doing" sub="and roughly how often i am doing them.">
        {/* five pasted cards, one icon each. The card is the unit here, the way
            a sticker is: the doing in writing, the cadence written beneath it */}
        <ul className="sbp-ab-loves">
          {LOVES.map(([l, when, ic], i) => (
            <li key={l} className="sbp-ab-t sbp-ab-love" data-r style={tile(rot(i + 1) / 2, i)}>
              <span className="sbp-ab-ic"><Ico n={ic} /></span>
              <h3>{l}</h3>
              <span className="sbp-ab-when">{when}</span>
            </li>
          ))}
        </ul>
      </Sec>

      {/* 4 */}
      <Sec id="ab4" title="Random facts about me" sub="the small details. tap a card to turn it over.">
        <div className="sbp-ab-facts">
          {FACTS.map(([q, a], i) => <Flip key={q} q={q} a={a} i={i} />)}
        </div>
      </Sec>

      {/* 5 */}
      <Sec id="ab5" title="My dreams & goals" sub="what i am working toward, written down where i can see it.">
        <Goals />
      </Sec>

      {/* 6 */}
      <Sec id="ab6" title="Little moments, big memories" sub="six frames off the phone roll, with what was happening.">
        <Film />
      </Sec>

      {/* 7 */}
      <Sec id="ab7" title="My personal corner" sub="thoughts, reminders, and one letter i owe myself.">
        <div className="sbp-pc-recap" aria-hidden="true" />
        <div className="sbp-pc-cols">
          <div className="sbp-pc-col">
            <article className="sbp-pc-t sbp-pc-qcard" data-r style={tile(1.2, 0)}>
              <span className="sbp-pc-label">my favorite quote</span>
              <p className="sbp-pc-quote">{QUOTE}</p>
            </article>

            <article className="sbp-pc-t sbp-pc-lined" data-r style={tile(-1.2, 1)}>
              <small>things i am learning about life</small>
              <hr />
              {LEARNING.map((l) => <p key={l}>{l}</p>)}
            </article>
          </div>

          <div className="sbp-pc-col">
            <EnvelopeOpen />

            <article className="sbp-pc-t sbp-pc-sticky" data-r style={tile(1.8, 2)}>
              <i className="sbp-pc-pin" aria-hidden="true" />
              <small>the reminder i need sometimes</small>
              <p>{STICKY}</p>
            </article>
          </div>
        </div>
      </Sec>

      <p className="sbp-pc-bonus" data-r><span>bonus: still interactive</span></p>

      {/* 8 */}
      <Sec id="ab8" title="My soundtrack" sub="the songs that match the different chapters of this.">
        <Soundtrack />
      </Sec>

      {/* 9 */}
      <Sec id="ab9" title="Photo of the day" sub="one frame, the day it happened, and what i was doing there.">
        <PhotoOfDay />
      </Sec>

      {/* 10 */}
      <Sec id="ab10" title="Currently into" sub="what the tabs and the headphones are full of this week.">
        {/* bare entries, not cards: this section answers the favourite-things
            grid without repeating its shape */}
        <ul className="sbp-ab-now">
          {NOW.map(([k, v], i) => (
            <li key={k} className="sbp-ab-t sbp-ab-nowi" data-r style={tile(rot(i + 3) / 2, i)}>
              <small>{k}</small>
              <p>{v}</p>
            </li>
          ))}
        </ul>
      </Sec>

      <EndQuotes onTop={top} />
    </div>
  )
}
