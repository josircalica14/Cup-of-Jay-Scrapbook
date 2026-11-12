import { useRef, useState } from 'react'
import { useParallax, useReducedMotion, useTypewriter } from '../hooks.js'
import Magnetic from './Magnetic.jsx'
import SvgDefs from './SvgDefs.jsx'
import Polaroid from './Polaroid.jsx'
import Cup from './Cup.jsx'

const SCENES = [
  { caption: 'laguna, golden hour', date: 'SEP 14 · 5:42 PM', v: ['#f2d8d3', '#fbf5ee', '#5a6fd6', '#4f5fb8'], note: 'currently: coffee, rain, and a photo backlog' },
  { caption: 'window seat, light rain', date: 'OCT 03 · 8:10 AM', v: ['#d9dfee', '#f4f1ea', '#8a96b8', '#6f7ba0'], note: 'cup no. 2 and the rain won’t quit' },
  { caption: 'a very ordinary tuesday', date: 'OCT 19 · 9:30 PM', v: ['#efdca9', '#fff7e0', '#dc8f70', '#c2735a'], note: 'no plans. best kind of day.' },
]
const TICKER = ['coffee counts', 'film photos', 'quiet thoughts', 'rain on the window', 'small walks', 'golden hour', 'unfinished lists']
const chrome = { fill: 'url(#chrome)', stroke: 'var(--line)', strokeWidth: 0.5 }

const Spark = () => <use href="#sp" />

export default function Hero() {
  const reduce = useReducedMotion()
  const hostRef = useRef(null)
  const stageRef = useRef(null)
  const flipperRef = useRef(null)
  const busy = useRef(false)
  const [idx, setIdx] = useState(0)
  const [count, setCount] = useState(3)
  const scene = SCENES[idx]

  useParallax(hostRef, stageRef, !reduce)
  const note = useTypewriter(scene.note, { enabled: !reduce, firstDelay: 1500 })

  const flip = () => {
    if (busy.current) return
    const next = (idx + 1) % SCENES.length
    if (reduce) return setIdx(next)
    busy.current = true
    const el = flipperRef.current
    const out = el.animate(
      [{ transform: 'translate(0,0) rotate(0)', opacity: 1 }, { transform: 'translate(70px,-34px) rotate(14deg)', opacity: 0 }],
      { duration: 280, easing: 'ease-in', fill: 'forwards' }
    )
    out.onfinish = () => {
      setIdx(next)
      const back = el.animate(
        [{ transform: 'translate(-50px,34px) rotate(-12deg)', opacity: 0 }, { transform: 'translate(0,0) rotate(0)', opacity: 1 }],
        { duration: 620, easing: 'cubic-bezier(.34,1.56,.64,1)', fill: 'forwards' }
      )
      back.onfinish = () => { out.cancel(); back.cancel(); busy.current = false }
    }
  }

  return (
    <section className="hero" ref={hostRef}>
      <SvgDefs />

      <nav>
        <a className="mark" href="#"><svg><Spark /></svg>cup of jay</a>
        <ul>
          <li><a href="#diary">diary</a></li>
          <li><a href="#photos">photos</a></li>
          <li><a href="#about">about</a></li>
        </ul>
        <a className="hi" href="#hello">say hi</a>
      </nav>

      <main>
        <div>
          <p className="eyebrow"><svg><Spark /></svg>A little book of my days · Vol. 01</p>

          <h1 aria-label="Small days, kept on paper.">
            <span className="word" style={{ '--i': 0 }}>Small</span>{' '}
            <span className="word" style={{ '--i': 1 }}>days,</span><br />
            <span className="word kept" style={{ '--i': 2 }}>
              kept
              <svg viewBox="0 0 100 10" preserveAspectRatio="none">
                <path className="draw" pathLength="1" style={{ '--dl': '1.1s', '--t': '1.1s' }} vectorEffect="non-scaling-stroke" d="M0 5 Q 4 0 8 5 T 16 5 T 24 5 T 32 5 T 40 5 T 48 5 T 56 5 T 64 5" />
              </svg>
            </span>{' '}
            <span className="word" style={{ '--i': 3 }}>on</span>{' '}
            <span className="word" style={{ '--i': 4 }}>paper.</span>
          </h1>

          <p className="lede">
            Hi, I’m Josir James, but most people call me{' '}
            <span className="circled">
              Jay
              <svg viewBox="0 0 100 40" preserveAspectRatio="none">
                <path className="draw" pathLength="1" style={{ '--dl': '1.7s', '--t': '1s' }} vectorEffect="non-scaling-stroke" d="M8 22 C 2 8, 40 2, 70 6 C 98 10, 98 34, 52 36 C 18 38, 0 28, 10 12" />
              </svg>
            </span>
            . This is where I keep the photos, coffee counts and quiet thoughts that don’t fit anywhere else.
          </p>

          <div className="row">
            <Magnetic className="solid" reduce={reduce} type="button" onClick={flip}>Flip through</Magnetic>
            <Magnetic as="a" className="line" reduce={reduce} href="#diary">Read the diary</Magnetic>
          </div>

          <div className="status">
            <span className="dot" />
            <span>freshly brewed · cup no. <b>{count}</b> today</span>
          </div>
        </div>

        <div className="wrap">
          <div className="stage" ref={stageRef}>
            <svg className="tw" style={{ left: 262, top: -8, width: 30, height: 30, '--dl': '.2s', ...chrome }}><Spark /></svg>
            <svg className="tw" style={{ right: 22, top: 128, width: 18, height: 18, fill: 'var(--accent)', '--dl': '1s' }}><Spark /></svg>
            <svg className="tw" style={{ left: 8, top: 452, width: 20, height: 20, fill: '#f0a9b6', '--dl': '1.6s' }}><Spark /></svg>
            <svg className="tw" style={{ left: 214, top: 410, width: 14, height: 14, '--dl': '.7s', ...chrome }}><Spark /></svg>

            <div className="layer" style={{ '--d': 10, left: 50, top: 34 }}>
              <div className="float"><Polaroid scene={scene} flipperRef={flipperRef} /></div>
            </div>

            <div className="layer" style={{ '--d': 22, left: -8, top: 322 }}>
              <div className="note"><span>{note}</span></div>
            </div>

            <div className="layer" style={{ '--d': 26, left: -12, top: 70 }}>
              <div className="win">
                <div className="bar"><i /><i /><i /><span>jay.exe</span></div>
                <div className="body">brewing the day…<div className="prog"><b /></div></div>
              </div>
            </div>

            <div className="layer" style={{ '--d': 34, right: -8, top: 296 }}>
              <Cup count={count} reduce={reduce} onTap={() => setCount((c) => c + 1)} />
            </div>

            <div className="layer" style={{ '--d': 14, left: 230, top: 448 }}>
              <div className="doodle">
                <svg viewBox="0 0 60 46" fill="none">
                  <path className="draw" pathLength="1" style={{ '--dl': '2.4s', '--t': '.9s' }} d="M6 42 C 8 20, 30 28, 40 8 M40 8 L 30 10 M40 8 L 44 18" />
                </svg>
                psst, tap the cup
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="ticker" aria-hidden="true">
        <div className="track">
          {[0, 1].map((n) => (
            <span key={n}>
              {TICKER.map((t) => (<span key={t}>{t}<svg><Spark /></svg></span>))}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
