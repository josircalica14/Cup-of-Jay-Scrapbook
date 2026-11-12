import { useState, useRef } from 'react'
import useReveal from '../../hooks/useReveal'
import SectionArt from './SectionArt.jsx'
import { DIARY_DATA } from '../../data'
import '../../styles/scrapbook.css'

/* mood -> a small hand-drawn mark, one stroke weight, in the accent */
const MOOD_MARK = {
  cozy:   'M4 13c2-6 12-6 16 0',                                                          // little smile
  proud:  'M12 3l2.4 5.2 5.6.6-4.2 3.9 1.2 5.6L12 15.6 6.9 18.3l1.2-5.6L4 8.8l5.6-.6z',   // star
  sleepy: 'M16.5 12.5A6.5 6.5 0 1 1 8 5.2a5.2 5.2 0 0 0 8.5 7.3z',                        // moon
}

export default function Diary() {
  const [open, setOpen] = useState(1)
  const ref = useRef(null)
  useReveal(ref)

  return (
    <section id="diary" ref={ref} className="sb max-w-3xl mx-auto px-5 py-24">
      <SectionArt variant="diary" />
      <header className="sb-head">
        <p className="sb-kick" data-reveal>~/dear diary</p>
        <h2 className="sb-title" data-reveal style={{ '--i': 1 }}>
          Dear <span className="sb-mark">diary</span>,
        </h2>
        <p className="sb-sub" data-reveal style={{ '--i': 2 }}>
          the short version — weather, work, and whatever the coffee did.
        </p>
      </header>

      <ul className="sb-diary">
        {DIARY_DATA.map((d, i) => {
          const isOpen = open === d.id
          return (
            <li
              key={d.id}
              className="sb-entry sb-paper"
              data-reveal
              style={{ '--i': i + 3, '--r': i % 2 ? '0.6deg' : '-0.5deg' }}
            >
              <span
                className="sb-tape"
                style={{ top: -11, left: 26, transform: `rotate(${i % 2 ? 3 : -4}deg)` }}
                aria-hidden="true"
              />

              <button
                type="button"
                className="sb-entry-btn"
                aria-expanded={isOpen}
                aria-controls={`diary-entry-${d.id}`}
                onClick={() => setOpen(isOpen ? null : d.id)}
              >
                <span className="sb-entry-date">{d.date}</span>
                <span className="sb-entry-title">{d.title}</span>
                <span className="sb-mood" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d={MOOD_MARK[d.mood] || MOOD_MARK.cozy} />
                  </svg>
                  <em>{d.mood}</em>
                </span>
                <span className={`sb-entry-more${isOpen ? ' on' : ''}`} aria-hidden="true">
                  <svg viewBox="0 0 16 16"><path d="M8 2v12M2 8h12" /></svg>
                </span>
              </button>

              <div
                className="sb-entry-body"
                id={`diary-entry-${d.id}`}
                style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
              >
                <div><p>{d.body}</p></div>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
