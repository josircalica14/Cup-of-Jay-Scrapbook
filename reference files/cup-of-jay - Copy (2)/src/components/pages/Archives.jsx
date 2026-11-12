import { Fragment, useMemo, useRef, useState } from 'react'
import PageHead from './PageHead'
import useReveal from '../../hooks/usePageReveal'
import { MarginRail, Ring, Envelope, CalendarPage, Stars, Paperclip, Heart, Bookmark, Squiggle, Arrow } from './PageArt'
import { ARCH } from '../../data/pages'

/* Small decorations that sit in the empty half beside each entry (desktop only).
   Cycle: stamp, arrow to the next entry, sparkles, postage stamp. */
function Deco({ a, n, isLast }) {
  let t = n % 4
  if (t === 1 && isLast) t = 0
  return (
    <div className="sbp-deco" aria-hidden="true">
      {t === 0 && <div className="sbp-stamp"><span>kept<b>{a.y}</b>{a.k}</span></div>}
      {t === 1 && <svg className="sbp-darr" viewBox="0 0 96 68"><path d="M8 8C58 0 88 26 56 58M56 58l-3-15M56 58l14-8" /></svg>}
      {t === 2 && <div className="sbp-sprk">{[0, 1, 2].map((i) => <svg key={i} viewBox="0 0 24 24"><use href="#sbp-sp" /></svg>)}</div>}
      {t === 3 && <div className="sbp-ptg"><i /><span>no. {String(n + 1).padStart(2, '0')}</span></div>}
    </div>
  )
}

export default function Archives() {
  const ref = useRef(null)
  const [year, setYear] = useState('all')
  const years = useMemo(() => [...new Set(ARCH.map((a) => a.y))], [])
  const list = ARCH.filter((a) => year === 'all' || a.y === year)
  useReveal(ref, [year])

  return (
    <div ref={ref} className="sbp-art-host">
      {/* the outer gutters hold a rail of kept-paper doodles, washi tape and
          sticker dots so the desktop margins aren't blank; hidden where there
          is no gutter to hold them */}
      <MarginRail seed={1}
        left={[Envelope, CalendarPage, Ring, Bookmark, Stars, Paperclip]}
        right={[Ring, Arrow, Stars, CalendarPage, Heart, Squiggle]} />

      <PageHead kick="~/the archives" a="Memories," mark="in order" sub="by date and by year." />

      <div className="sbp-chips" role="group" aria-label="Filter by year">
        {['all', ...years].map((y) => (
          <button key={y} className="sbp-chip" aria-pressed={year === y} onClick={() => setYear(y)}>{y}</button>
        ))}
      </div>

      {/* zigzag timeline: entries alternate sides on desktop, single column on mobile */}
      <div className="sbp-tl">
        {list.map((a, n) => {
          const newYear = n === 0 || list[n - 1].y !== a.y
          const hasPhoto = a.img
          return (
            <Fragment key={`${a.d}-${a.t}`}>
              {newYear && <div className="sbp-yr">{a.y}</div>}
              <div className={`sbp-ent ${n % 2 ? 'r' : 'l'}`} data-r style={{ '--i': n % 3 }}>
                <i className="sbp-dot" />
                <a className="sbp-card" href={`#${a.to}`}>
                  {hasPhoto && (
                    <div className="sbp-ph">
                      <span className="sbp-tape" />
                      <div className="sbp-shot">
                        <img src={a.img} alt={a.t} loading="lazy" decoding="async" />
                      </div>
                    </div>
                  )}
                  <div className="sbp-meta">
                    <time>{a.d}</time>
                    <span className="sbp-chip" style={{ cursor: 'inherit', fontSize: 10, padding: '1px 9px' }}>{a.k}</span>
                  </div>
                  <h3>{a.t}</h3>
                  <p>{a.sub}</p>
                </a>
                <Deco a={a} n={n} isLast={n === list.length - 1} />
              </div>
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}