import { useEffect, useRef, useState } from 'react'
import PageHead from './PageHead'
import useReveal from './useReveal'
import { ABOUT as AB, ICONS, dparts, rot } from './data'

/* ---------- tiny building blocks ---------- */
const Ico = ({ n }) => <svg viewBox="0 0 24 24" aria-hidden="true"><path d={ICONS[n]} /></svg>
const Fill = ({ children = 'fill me in' }) => <span className="sb-ab-fill">{children}</span>
const Tape = ({ style }) => <span className="sb-tape" style={style} />
const calm = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const tile = (r, i) => ({ '--r': `${r}deg`, '--i': i })

/* photo (if a path is given), else a gradient, else the dashed placeholder */
const Shot = ({ img, g, aria }) =>
  img ? <div className="sb-ab-shot" role="img" aria-label={aria} style={{ backgroundImage: `url("${img}")` }} />
  : g ? <div className="sb-ab-shot" role="img" aria-label={aria} style={{ background: `linear-gradient(160deg,${g})` }} />
  : <div className="sb-ab-shot sb-ph"><svg viewBox="0 0 24 24"><path d={ICONS.camera} /></svg><span>your photo here</span></div>

const Section = ({ title, sub, id, children }) => (
  <section className="sb-ab-sec" id={id}>
    <div className="sb-ab-hd" data-r><h2>{title}</h2></div>
    <p className="sb-ab-sub" data-r style={{ '--i': 1 }}>{sub}</p>
    {children}
  </section>
)

/* ---------- 4: tap-to-flip fact card ---------- */
function Flip({ q, i }) {
  const [on, setOn] = useState(false)
  return (
    <button className="sb-ab-t sb-ab-flip" type="button" data-m aria-pressed={on} onClick={() => setOn(!on)} style={tile(rot(i + 1), i)}>
      <span className="sb-ab-fi">
        <span className="sb-ab-ff"><b>{q}</b><em>tap to flip</em></span>
        <span className="sb-ab-fb"><small>the answer</small><b>fill me in</b></span>
      </span>
    </button>
  )
}

/* ---------- 5: goals you can tick off ---------- */
function Goal({ title, i }) {
  const [done, setDone] = useState([false, false, false])
  const toggle = (k) => setDone((d) => d.map((v, j) => (j === k ? !v : v)))
  return (
    <article className="sb-ab-t sb-ab-card sb-ab-goal" data-m style={tile(rot(i), i)}>
      <div className="sb-ab-gh"><h3>{title}</h3></div>
      <small>{done.filter(Boolean).length} / {done.length}</small>
      {done.map((d, k) => (
        <button key={k} className="sb-ab-chk" type="button" aria-pressed={d} onClick={() => toggle(k)}>
          <i className="sb-ab-bx"><svg viewBox="0 0 24 24"><path d="M5 12l5 5 9-10" /></svg></i><span>your goal here</span>
        </button>
      ))}
    </article>
  )
}

/* ---------- 7: envelope that opens ---------- */
function Envelope() {
  const [open, setOpen] = useState(false)
  return (
    <div className="sb-ab-t" data-m style={tile(-1, 1)}>
      <button className={`sb-ab-env${open ? ' sb-open' : ''}`} type="button" aria-expanded={open}
              aria-label="Open the message to my future self" onClick={() => setOpen(!open)}>
        <span className="sb-ab-lt"><p>Dear future me, … (write your message here)</p></span>
        <span className="sb-ab-flap" />
        <span className="sb-ab-evb"><small>tap to open</small><b>a message to my future self</b></span>
      </button>
    </div>
  )
}

/* ---------- soundtrack: a mock player (no audio) ---------- */
function Soundtrack() {
  const [i, setI] = useState(0)
  const [on, setOn] = useState(false)
  const [p, setP] = useState(0)
  const n = AB.tracks.length

  useEffect(() => {
    if (!on) return
    const id = setInterval(() => setP((v) => v + 100 / 60), 200)   // ~12 seconds per song
    return () => clearInterval(id)
  }, [on])
  useEffect(() => { if (p >= 100) { setI((k) => (k + 1) % n); setP(0) } }, [p, n])

  const go = (k) => { setI(k); setP(0) }
  const t = AB.tracks[i]
  return (
    <div className="sb-ab-pl">
      <div className={`sb-ab-t sb-ab-card sb-ab-deck${on ? ' sb-play' : ''}`} data-m style={tile(-1, 0)}>
        <div className="sb-ab-vinyl" />
        <small>now playing</small>
        <h3>{t[0]}</h3>
        <small style={{ marginTop: 4 }}>{t[1]} · {t[2]}</small>
        <div className="sb-ab-bar"><i style={{ '--p': `${p}%` }} /></div>
        <div className="sb-ab-ctl">
          <button type="button" aria-label="Previous song" onClick={() => go((i + n - 1) % n)}>prev</button>
          <button type="button" className="sb-go" onClick={() => setOn(!on)}>{on ? 'pause' : 'play'}</button>
          <button type="button" aria-label="Next song" onClick={() => go((i + 1) % n)}>next</button>
        </div>
        <div className="sb-ab-eq" aria-hidden="true"><i /><i /><i /><i /></div>
      </div>
      <div>
        {AB.tracks.map((tr, k) => (
          <button key={k} className={`sb-ab-trk${k === i ? ' sb-on' : ''}`} type="button" onClick={() => { go(k); setOn(true) }}>
            <span className="sb-k" />
            <span><b>{tr[0]}</b><small>{tr[1]}</small></span>
            <em>{tr[2]}</em>
          </button>
        ))}
      </div>
    </div>
  )
}

/* ---------- photo of the day: browse back through the days ---------- */
function PhotoOfDay() {
  const [d, setD] = useState(0)
  const p = AB.potd[d]
  const dp = dparts(p.d)
  return (
    <div className="sb-ab-potd" data-r>
      <figure className="sb-ab-big" style={{ margin: '0 auto' }}>
        <Tape />
        <div className="sb-ab-stamp"><span>{dp.m}<b>{dp.day}</b>{dp.y}</span></div>
        <Shot img={p.img} g={p.g} aria={p.t} />
        <figcaption>{p.t}</figcaption>
      </figure>
      <div className="sb-ab-info">
        <dl>
          <div><dt>date</dt><dd>{dp.m} {dp.day}, {dp.y}</dd></div>
          <div><dt>shot on</dt><dd>{p.dev}</dd></div>
        </dl>
        <p className="sb-ab-story">{p.story}</p>
        <div className="sb-ab-ctl" style={{ justifyContent: 'flex-start' }}>
          <button type="button" disabled={d >= AB.potd.length - 1} onClick={() => setD(d + 1)}>older day</button>
          <button type="button" className="sb-go" disabled={d <= 0} onClick={() => setD(d - 1)}>newer day</button>
        </div>
      </div>
    </div>
  )
}

/* ---------- end of page: personal quotes ---------- */
function EndQuotes({ onTop }) {
  const [q, setQ] = useState(0)
  const [out, setOut] = useState(false)
  const next = () => {
    setOut(true)
    setTimeout(() => { setQ((v) => (v + 1) % AB.quotes.length); setOut(false) }, calm() ? 0 : 300)
  }
  return (
    <div className="sb-ab-end" data-r>
      {[0, -2, -4].map((dl) => (
        <svg key={dl} className="sb-sp" viewBox="0 0 24 24" style={{ animationDelay: `${dl}s` }}><use href="#sb-sp" /></svg>
      ))}
      <p className={`sb-q${out ? ' sb-out' : ''}`} aria-live="polite" style={{ marginTop: 14 }}>{AB.quotes[q]}</p>
      <div className="sb-ab-ctl">
        <button type="button" onClick={next}>another quote</button>
        <button type="button" className="sb-go" onClick={onTop}>back to top</button>
      </div>
      <small>— end of page —</small>
    </div>
  )
}

/* ---------- the page ---------- */
export default function About() {
  const ref = useRef(null)
  useReveal(ref)

  const top = () => window.scrollTo({ top: 0, behavior: calm() ? 'auto' : 'smooth' })

  return (
    <div ref={ref}>
      <PageHead kick="~/about" a="Things" mark="about" b="me" sub="a scrapbook of the little stuff." />

      {/* 1 */}
      <Section id="ab1" title="A little introduction" sub="a short hello: who I am, my personality, and what makes me different.">
        <article className="sb-ab-t sb-ab-note" data-m style={tile(-1, 0)}>
          <Tape style={{ top: -11, left: 50, transform: 'rotate(-4deg)' }} />
          <Tape style={{ top: -10, right: 60, transform: 'rotate(5deg)' }} />
          <p className="sb-big">{AB.intro}</p>
          <div className="sb-ab-slots">{AB.slots.map((s) => <div key={s}><small>{s}</small><Fill /></div>)}</div>
        </article>
      </Section>

      {/* 2 */}
      <Section id="ab2" title="My favorite things" sub="a collection of the little things I enjoy.">
        <div className="sb-ab-g">
          {AB.favs.map(([k, s, ic], i) => (
            <article key={k} className="sb-ab-t sb-ab-card" data-m style={tile(rot(i), i)}>
              <span className="sb-ab-ic"><Ico n={ic} /></span><h3>{k}</h3><small>{s}</small>
              {ic === 'palette'
                ? <><div className="sb-ab-dots">{['var(--acc)', 'var(--cyan)', 'var(--ink)', 'var(--paper)'].map((c) => <i key={c} style={{ background: c }} />)}</div><Fill>add your own</Fill></>
                : <><Fill>+ add one</Fill><Fill>+ add one</Fill><Fill>+ add one</Fill></>}
            </article>
          ))}
        </div>
      </Section>

      {/* 3 */}
      <Section id="ab3" title="Things I love doing" sub="activities that make me happy and keep me inspired.">
        <div className="sb-ab-g">
          {AB.loves.map(([l, ic], i) => (
            <article key={l} className="sb-ab-t sb-ab-card" data-m style={tile(rot(i + 2), i)}>
              <span className="sb-ab-ic"><Ico n={ic} /></span><h3>{l}</h3>
            </article>
          ))}
        </div>
      </Section>

      {/* 4 */}
      <Section id="ab4" title="Random facts about me" sub="small details that people might not know about me. tap a card.">
        <div className="sb-ab-g">{AB.facts.map((f, i) => <Flip key={f} q={f} i={i} />)}</div>
      </Section>

      {/* 5 */}
      <Section id="ab5" title="My dreams & goals" sub="things I’m working toward and hope to experience someday. tick them off.">
        <div className="sb-ab-g">{AB.goals.map((g, i) => <Goal key={g} title={g} i={i} />)}</div>
      </Section>

      {/* 6 */}
      <Section id="ab6" title="Little moments, big memories" sub="memorable experiences, milestones, and everyday moments. scroll sideways.">
        <div className="sb-ab-film" data-r>
          <div className="sb-ab-fs" tabIndex={0} aria-label="Memories, scroll sideways">
            {AB.mems.map(([title, img]) => (
              <figure key={title} className="sb-ab-t sb-ab-mem" style={{ margin: 0 }}>
                <div className="sb-ab-pol">
                  <Tape style={{ top: -11, left: '50%', marginLeft: -35, transform: 'rotate(-3deg)' }} />
                  <Shot img={img} aria={title} />
                  <b>{title}</b><Fill>write the story</Fill>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </Section>

      {/* 7 */}
      <Section id="ab7" title="My personal corner" sub="a personal space for thoughts, reflections, and reminders.">
        <div className="sb-ab-cg">
          <article className="sb-ab-t sb-ab-quote" data-m style={tile(1.5, 0)}>
            <span className="sb-qm">“</span><small>my favorite quote</small><p>{AB.quote}</p>
          </article>
          <Envelope />
          <article className="sb-ab-t sb-ab-card sb-ab-lines" data-m style={tile(-1.5, 2)}>
            <small>things I’m learning about life</small>
            {[0, 1, 2].map((n) => <p key={n}><Fill /></p>)}
          </article>
          <article className="sb-ab-t sb-ab-sticky" data-m style={tile(2.5, 3)}>
            <i className="sb-ab-pin" /><small>a little reminder I need sometimes</small><p>write it here, big and kind.</p>
          </article>
        </div>
      </Section>

      {/* bonus */}
      <div className="sb-ab-bonus" data-r><span>bonus: extra interactive</span></div>

      <Section id="ab8" title="My soundtrack" sub="songs that match my personality or different chapters of my life."><Soundtrack /></Section>
      <Section id="ab9" title="Photo of the day" sub="a featured photo with the date, the camera or phone used, and the story behind it."><PhotoOfDay /></Section>
      <Section id="ab10" title="Currently into" sub="what I’m listening to, watching, playing, learning, or enjoying lately.">
        <div className="sb-ab-now">
          {AB.now.map(([k, ic], i) => (
            <article key={k} className="sb-ab-t sb-ab-card" data-m style={tile(rot(i + 3), i)}>
              <i className="sb-ab-live" aria-hidden="true" />
              <span className="sb-ab-ic"><Ico n={ic} /></span><h3>{k}</h3><Fill>right now</Fill>
            </article>
          ))}
        </div>
      </Section>

      <EndQuotes onTop={top} />
    </div>
  )
}
