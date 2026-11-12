import { useEffect, useRef, useState } from 'react'
import { useParallax, useReducedMotion, useTypewriter } from '../hooks.js'
import Magnetic from './Magnetic.jsx'
import SvgDefs from './SvgDefs.jsx'
import Polaroid from './Polaroid.jsx'
import Cup from './Cup.jsx'

const NOTES = [
  'currently: coffee, rain, and a photo backlog',
  'cup no. 2 and the rain won’t quit',
  'debugging, but make it cozy',
  'no plans. best kind of day.',
]
const TICKER = ['certified coffee enthusiast', 'film photos', 'professional daydreamer', 'rain appreciator', 'small walks', 'golden hour chaser', 'unfinished lists']
const chrome = { fill: 'url(#chrome)', stroke: 'var(--line)', strokeWidth: 0.5 }

const Spark = () => <use href="#sp" />

export default function Hero() {
  const reduce = useReducedMotion()
  const hostRef = useRef(null)
  const stageRef = useRef(null)
  const [count, setCount] = useState(3)
  const [n, setN] = useState(0)

  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => setN((i) => (i + 1) % NOTES.length), 7000)
    return () => clearInterval(id)
  }, [reduce])


  useParallax(hostRef, stageRef, !reduce)
  const note = useTypewriter(NOTES[n], { enabled: !reduce, firstDelay: 1500 })

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

          <h1 aria-label="Hi, I’m Jay. Pixels in my photos, logic in my code.">
            <span className="word" style={{ '--i': 0 }}>Hi,</span>{' '}
            <span className="word" style={{ '--i': 1 }}>I’m</span>{' '}
            <span className="word kept" style={{ '--i': 2 }}>
              Jay.
              <svg viewBox="0 0 100 10" preserveAspectRatio="none">
                <path className="draw" pathLength="1" style={{ '--dl': '.9s', '--t': '1.1s' }} vectorEffect="non-scaling-stroke" d="M0 5 Q 4 0 8 5 T 16 5 T 24 5 T 32 5 T 40 5 T 48 5 T 56 5 T 64 5" />
              </svg>
            </span><br />
            <span className="word" style={{ '--i': 3 }}>Pixels</span>{' '}
            <span className="word" style={{ '--i': 4 }}>in</span>{' '}
            <span className="word" style={{ '--i': 5 }}>my</span>{' '}
            <span className="word" style={{ '--i': 6 }}>photos,</span><br />
            <span className="word" style={{ '--i': 7 }}>logic</span>{' '}
            <span className="word" style={{ '--i': 8 }}>in</span>{' '}
            <span className="word" style={{ '--i': 9 }}>my</span>{' '}
            <span className="word" style={{ '--i': 10 }}>code.</span>
          </h1>

          <p className="lede">
            Officially{' '}
            <span className="circled">
              Josir James
              <svg viewBox="0 0 100 40" preserveAspectRatio="none">
                <path className="draw" pathLength="1" style={{ '--dl': '1.7s', '--t': '1s' }} vectorEffect="non-scaling-stroke" d="M8 22 C 2 8, 40 2, 70 6 C 98 10, 98 34, 52 36 C 18 38, 0 28, 10 12" />
              </svg>
            </span>
            , unofficially the person behind this cup. I collect golden-hour photos, an unreasonable number of coffees, and thoughts too small to live anywhere else. Pull up a chair, the kettle’s on.
          </p>

          <div className="row">
            <Magnetic as="a" className="solid" reduce={reduce} href="#about">Meet Jay</Magnetic>
            <Magnetic as="a" className="line" reduce={reduce} href="#diary">Peek at my diary</Magnetic>
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
              <div className="float"><Polaroid src="/jay.jpg" caption="dressed to deploy." date="Teal suit · 0 bugs · 1 bow tie" /></div>
            </div>

            <div className="layer" style={{ '--d': 22, left: -8, top: 332 }}>
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
                that’s my cup. tap it!
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
