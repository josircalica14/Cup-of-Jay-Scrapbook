import { useState, useEffect, useRef } from 'react'
import useReveal from '../../hooks/useReveal'
import SectionArt from './SectionArt.jsx'
import { NOW_DATA } from '../../data'
import '../../styles/scrapbook.css'

/* ── Coffee tally — a ruled card with hand-drawn cups ── */
function Coffee() {
  const [n, setN] = useState(0)
  const messages = ['None yet. Brave.', 'Warming up.', 'A good pace.', 'Productive buzz.', 'Seeing colors.', 'Please drink water.']
  const msg = messages[Math.min(n, 5)]

  return (
    <div className="sb-tool sb-paper" style={{ '--r': '-1deg' }}>
      <span className="sb-tape" style={{ top: -11, left: 26, transform: 'rotate(-5deg)' }} aria-hidden="true" />
      <h3>coffee count</h3>
      <div className="flex flex-wrap gap-1.5 mb-3" aria-label={`${n} cups of coffee`}>
        {Array.from({ length: 6 }).map((_, i) => (
          <svg
            key={i}
            viewBox="0 0 40 40"
            className="w-8 h-8 transition-transform duration-300"
            style={{ transform: i < n ? 'scale(1.12) rotate(-4deg)' : 'scale(1)' }}
            aria-hidden="true"
          >
            <path d="M6 13h23v11a8 8 0 0 1-8 8h-7a8 8 0 0 1-8-8z" fill={i < n ? '#3F5BD8' : 'none'} stroke="#1F1F1F" strokeWidth="2" strokeLinejoin="round" />
            <path d="M29 16h3.5a3.5 3.5 0 0 1 0 7H29" fill="none" stroke="#1F1F1F" strokeWidth="2" />
            {i < n && <path d="M13 9q4-4 0-7M21 9q4-4 0-7" stroke="#1F1F1F" strokeWidth="1.6" fill="none" strokeLinecap="round" />}
          </svg>
        ))}
      </div>
      <p className="font-hand text-2xl h-8 text-ink/90">{msg}</p>
      <div className="flex gap-2 mt-4">
        <button type="button" onClick={() => setN(Math.min(6, n + 1))} className="sb-pill !bg-ink !text-paper !border-ink">+ one more</button>
        <button type="button" onClick={() => setN(0)} className="sb-pill">reset</button>
      </div>
    </div>
  )
}

/* ── Music player — a little cassette deck ── */
function Player() {
  const [on, setOn] = useState(false)
  const [t, setT] = useState(12)

  useEffect(() => {
    if (!on) return
    const id = setInterval(() => setT(v => (v >= 100 ? 0 : v + 1)), 400)
    return () => clearInterval(id)
  }, [on])

  return (
    <div className="sb-tool" style={{ '--r': '0.8deg' }}>
      <span className="sb-tape" style={{ top: -11, right: 26, transform: 'rotate(4deg)' }} aria-hidden="true" />
      <h3>now playing</h3>

      {/* cassette window */}
      <div className="mt-1 rounded-lg border-2 border-ink bg-paper px-4 py-3 flex items-center gap-3">
        <span className="w-9 h-9 rounded-full border-2 border-ink grid place-items-center shrink-0" style={{ animation: on ? 'sb-spin 3s linear infinite' : 'none' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-acc" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-serif text-xl leading-tight truncate">Rainy Jeepney</p>
          <p className="text-[12px] text-mute">lo-fi · for staying in</p>
        </div>
        <span className="w-9 h-9 rounded-full border-2 border-ink grid place-items-center shrink-0" style={{ animation: on ? 'sb-spin 3s linear infinite' : 'none' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-acc" />
        </span>
      </div>

      <div className="flex items-end gap-1 h-9 my-4" aria-hidden="true">
        {Array.from({ length: 16 }).map((_, i) => (
          <span
            key={i}
            className="eq flex-1 bg-acc/70 rounded-sm h-full"
            style={{ animationDelay: `${(i * 83) % 800}ms`, animationPlayState: on ? 'running' : 'paused' }}
          />
        ))}
      </div>
      <input
        type="range" min="0" max="100" value={t}
        onChange={e => setT(+e.target.value)}
        aria-label="Track position"
        className="w-full accent-[#3F5BD8]"
      />
      <button type="button" onClick={() => setOn(!on)} className="sb-pill mt-4 !bg-ink !text-paper !border-ink">
        {on ? 'Pause' : 'Play'}
      </button>
    </div>
  )
}

/* ── Mood — a scatter of sticky notes ── */
function Mood() {
  const moods = [['sunny', '#F4E8B8', -2], ['cozy', '#F2D9D3', 2], ['calm', '#D6E2EC', 1.5], ['tired', '#D5DDCB', -1.5]]
  const [m, setM] = useState(null)

  return (
    <div className="sb-tool" style={{ '--r': '-0.5deg' }}>
      <span className="sb-tape" style={{ top: -11, left: '42%', transform: 'rotate(-3deg)' }} aria-hidden="true" />
      <h3>today's mood</h3>
      <div className="grid grid-cols-2 gap-3">
        {moods.map(([name, color, rot]) => (
          <button
            key={name}
            type="button"
            onClick={() => setM(name)}
            style={{ background: color, rotate: `${rot}deg`, border: m === name ? '2px solid #1F1F1F' : '2px solid transparent' }}
            aria-pressed={m === name}
            className="rounded-xl py-4 font-hand text-2xl transition-all duration-300 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-acc"
          >{name}</button>
        ))}
      </div>
      <p className="font-hand text-2xl mt-4 h-8 text-ink/90">
        {m ? `Noted: feeling ${m}.` : 'How are you today?'}
      </p>
    </div>
  )
}

/* ── Section ── */
export default function LittleThings() {
  const ref = useRef(null)
  useReveal(ref)

  return (
    <section id="things" ref={ref} className="sb max-w-5xl mx-auto px-5 py-24">
      <SectionArt variant="desk" />
      <header className="sb-head">
        <p className="sb-kick" data-reveal>~/the desk</p>
        <h2 className="sb-title" data-reveal style={{ '--i': 1 }}>
          Poke <span className="sb-mark">around</span>
        </h2>
        <p className="sb-sub" data-reveal style={{ '--i': 2 }}>
          three small things on the desk. go ahead, click them.
        </p>
      </header>

      <div className="sb-desk">
        <div data-reveal style={{ '--i': 3 }}><Coffee /></div>
        <div data-reveal style={{ '--i': 4 }}><Player /></div>
        <div data-reveal style={{ '--i': 5 }}><Mood /></div>
      </div>

      <header className="sb-head" style={{ margin: '72px 0 26px' }}>
        <p className="sb-kick" data-reveal>~/right now</p>
        <h3 className="sb-title sb-h3" data-reveal style={{ '--i': 1 }}>
          Right <span className="sb-mark">now</span>
        </h3>
      </header>

      <ul className="sb-now">
        {NOW_DATA.map((n, i) => (
          <li
            key={n.label}
            data-reveal
            style={{ '--i': i + 2, '--r': i % 2 ? '1deg' : '-1deg' }}
            className="sb-nowi"
          >
            <span className="sb-sticker block px-6 py-4" style={{ background: n.color }}>
              <span className="sb-tape" style={{ top: -10, left: 22, transform: `rotate(${i % 2 ? 3 : -4}deg)` }} aria-hidden="true" />
              <small>{n.label}</small>
              <p className="font-hand text-3xl leading-tight">{n.value}</p>
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}
