import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import '../../styles/home-about.css'

/* Same facts as before; `d` is the icon path(s) drawn in the little chip. */
const facts = [
  ['Living in',        'Laguna, PH (where the mangoes are better than anywhere else)', 'M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z M12 7a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z'],
  ['Online as',        '@cupofjayyy_',                                                 'M16 12v1.5a2.5 2.5 0 0 0 5 0V12a9 9 0 1 0-3.5 7 M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z'],
  ['Daytime alias',    'Frontend dev who argues with CSS',                             'm8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16'],
  ['Nighttime ritual', 'Photo editing until my eyes glaze over',                       'M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z'],
  ['Running on',       'Coffee, obviously.',                                           'M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V9zM17 10h1.5a2.5 2.5 0 0 1 0 5H17'],
]

const words = [
  'just call me jay', 'chaotic sunsets', 'cup no. 4', 'jeepney window views', '3am thoughts',
  'half-decent phone shots', 'bugs into learning experiences', 'too much caffeine', 'best mangoes',
]

/* Reveals every [data-reveal] once, in reading order. The hidden state only
   exists under .hello.js + no-preference, so nothing is stuck invisible.
   useLayoutEffect adds .js before paint to avoid a flash. */
function useSectionReveal(ref) {
  useLayoutEffect(() => {
    ref.current?.classList.add('js')
    return () => ref.current?.classList.remove('js')
  }, [ref])

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const els = [...root.querySelectorAll('[data-reveal]')]
    if (!els.length) return
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'))
      return
    }
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue
        io.unobserve(e.target)
        e.target.classList.add('is-in')
      }
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.15 })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ref])
}

/* Notebook card leans toward the cursor. Transform only, rAF-throttled,
   skipped on touch and when reduced motion is on. */
function useTilt(ref) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ok = window.matchMedia('(hover:hover) and (pointer:fine)').matches &&
               !window.matchMedia('(prefers-reduced-motion:reduce)').matches
    if (!ok) return
    let raf = 0
    const move = (e) => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect()
        const x = (e.clientX - r.left) / r.width - 0.5
        const y = (e.clientY - r.top) / r.height - 0.5
        el.style.setProperty('--ry', (x * 6).toFixed(2) + 'deg')
        el.style.setProperty('--rx', (-y * 6).toFixed(2) + 'deg')
        raf = 0
      })
    }
    const leave = () => {
      el.style.setProperty('--rx', '0deg')
      el.style.setProperty('--ry', '0deg')
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [ref])
}

const Spark = () => (
  <svg viewBox="0 0 24 24"><use href="#h-spark" /></svg>
)

export default function About() {
  const ref = useRef(null)
  const card = useRef(null)
  const [cups, setCups] = useState(4)
  const [bump, setBump] = useState(0)
  useSectionReveal(ref)
  useTilt(card)

  const pour = () => { setCups((c) => c + 1); setBump((b) => b + 1) }
  const loop = [...words, ...words]

  return (
    <>
    <section id="hello" ref={ref} className="hello" aria-labelledby="hello-title">
      {/* shared sparkle shape */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <symbol id="h-spark" viewBox="0 0 24 24">
          <path d="M12 1c.6 6.4 4.6 10.4 11 11-6.4.6-10.4 4.6-11 11-.6-6.4-4.6-10.4-11-11 6.4-.6 10.4-4.6 11-11z" />
        </symbol>
      </svg>

      {/* decorative background — the site body already carries the dot grid,
          so the reference's own grid layer is omitted here */}
      <div className="h-bg" aria-hidden="true">
        <div className="blob a" /><div className="blob b" />
        <div className="h-doodle c" style={{ top: 90, right: '9%', width: 34, height: 34, '--r': '10deg' }}><svg viewBox="0 0 24 24"><use href="#h-spark" className="fill" /></svg></div>
        <div className="h-doodle" style={{ top: '46%', left: '2%', width: 26, height: 26, '--r': '-8deg', animationDelay: '-2s' }}><svg viewBox="0 0 24 24"><use href="#h-spark" className="fill" /></svg></div>
        <div className="h-doodle" style={{ top: 150, left: '44%', width: 70, height: 70, animationDuration: '11s' }}><svg viewBox="0 0 70 70"><path d="M35 35c0-4 5-4 5 0s-8 7-12 2-2-14 8-16 20 4 20 16-10 22-24 20S6 46 10 28" /></svg></div>
        <div className="h-doodle c" style={{ bottom: 210, right: '4%', width: 64, height: 40, '--r': '-6deg', animationDelay: '-3s' }}><svg viewBox="0 0 64 40"><path d="M4 30C20 4 40 4 56 26M56 26l-12-1M56 26l-3-12" /></svg></div>
        <div className="h-doodle" style={{ bottom: 260, left: '46%', width: 22, height: 22, animationDelay: '-4s' }}><svg viewBox="0 0 22 22"><path d="M11 3v16M3 11h16" /></svg></div>
        <div className="h-doodle c" style={{ top: '36%', right: '46%', width: 56, height: 56, animationDuration: '9s' }}><svg viewBox="0 0 56 56"><path d="M8 30c-4-14 14-26 28-20s14 26-2 30-24-8-18-20" /></svg></div>
      </div>

      <div className="h-wrap">
        {/* left: facts */}
        <div>
          <h2 id="hello-title" data-reveal style={{ '--i': 0 }}>
            A few <span className="h-mark">things</span> about me
          </h2>
          <svg className="squig" viewBox="0 0 200 16" aria-hidden="true" data-reveal style={{ '--i': 1 }}>
            <path d="M3 9c10-9 14 7 24 0s14 7 24 0 14 7 24 0 14 7 24 0 14 7 24 0 14 7 24 0 10 2 22-2" />
          </svg>

          <dl>
            {facts.map(([k, v, d], i) => (
              <div key={k} className="fact" data-reveal style={{ '--i': i + 2 }}>
                <span className="ic"><svg viewBox="0 0 24 24"><path d={d} /></svg></span>
                <dt>{k}</dt>
                <dd>
                  {v}
                  {k === 'Running on' && <> Cup no. <b key={bump} className={bump ? 'bump' : ''}>{cups}</b> as we speak.</>}
                </dd>
              </div>
            ))}
          </dl>

          <a className="more-link" href="#about" data-reveal style={{ '--i': 7 }}>
            <span>More things about me</span>
            <span className="tail" aria-hidden="true">
              <svg viewBox="0 0 24 14"><path d="M2 7h19M15 2l6 5-6 5" /></svg>
            </span>
          </a>

          <button className="cup-btn" type="button" onClick={pour} data-reveal style={{ '--i': 8 }} aria-label="Pour another cup of coffee">
            <svg viewBox="0 0 30 30" aria-hidden="true">
              <g className="steam"><path d="M10 9c-2-2 2-3 0-5" /><path d="M15 9c-2-2 2-3 0-5" /><path d="M20 9c-2-2 2-3 0-5" /></g>
              <path d="M5 13h17v6a6 6 0 0 1-6 6h-5a6 6 0 0 1-6-6v-6zM22 14h2a3 3 0 0 1 0 6h-2" />
            </svg>
            <span>pour cup no. {cups + 1}</span>
          </button>

          <div className="h-polaroid" data-reveal style={{ '--i': 9 }}>
            <span className="h-tape" />
            <div className="shot" role="img" aria-label="Illustrated sunset over dark hills">
              <div className="h-sun" /><div className="hill" /><div className="hill f" />
            </div>
            <p className="font-hand">jeepney window, half-decent, from my phone</p>
          </div>
        </div>

        {/* right: notebook card */}
        <div className="h-stage">
          <div className="h-badge" data-reveal style={{ '--i': 5 }} aria-label="Just call me Jay">
            <div className="disc" />
            <svg className="h-ring" viewBox="0 0 112 112" aria-hidden="true">
              <defs><path id="h-circ" d="M56 56m-40 0a40 40 0 1 1 80 0a40 40 0 1 1-80 0" /></defs>
              <text textLength="244" lengthAdjust="spacing">
                <textPath href="#h-circ" textLength="244">just jay · just jay · just jay · </textPath>
              </text>
            </svg>
            <div className="core"><svg viewBox="0 0 24 24"><use href="#h-spark" fill="currentColor" /></svg></div>
          </div>

          <article ref={card} className="tilt" data-reveal style={{ '--i': 4 }} tabIndex={0}>
            <span className="h-tape" style={{ top: -12, right: 36, transform: 'rotate(4deg)' }} />
            <span className="h-tape" style={{ top: -10, left: 70, transform: 'rotate(-5deg)', width: 56 }} />
            <p>
              Fresh IT grad from Laguna, equally obsessed with clean code and chaotic sunsets.
            </p>
            <p>
              I turn coffee into websites and bugs into "learning experiences."
            </p>
            <p>
              What's left is what I refuse to throw away: the window seat, the 3am edits,
              the half-decent shots.
            </p>
            <p className="sign">
              — Jay (the unpolished version)
              <svg viewBox="0 0 46 18" aria-hidden="true"><path d="M2 12c6-12 10 4 14-4s6 8 12 2 8-2 16-4" /></svg>
            </p>
          </article>
        </div>
      </div>

    </section>

    {/* marquee divider — sits between the sections, so it lives outside #hello */}
    <div className="h-strip-clip">
    <div className="h-strip" aria-hidden="true">
      <div className="h-track">
        {loop.map((w, i) => (
          <span key={i}>{w}<Spark /></span>
        ))}
      </div>
    </div>
    </div>
    </>
  )
}
