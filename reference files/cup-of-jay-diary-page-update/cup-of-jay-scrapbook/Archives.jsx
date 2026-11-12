import { Fragment, useMemo, useRef, useState } from 'react'
import PageHead from './PageHead'
import useReveal from './useReveal'
import { ARCH, dparts, pic } from './data'

/* Small decorations that sit in the empty half beside each entry (desktop only).
   Cycle: stamp, arrow to the next entry, sparkles, postage stamp. */
function Deco({ a, n, isLast }) {
  let t = n % 4
  if (t === 1 && isLast) t = 0
  return (
    <div className="sb-deco" aria-hidden="true">
      {t === 0 && <div className="sb-stamp"><span>kept<b>{a.d.slice(0, 4)}</b>{a.k}</span></div>}
      {t === 1 && <svg className="sb-darr" viewBox="0 0 96 68"><path d="M8 8C58 0 88 26 56 58M56 58l-3-15M56 58l14-8" /></svg>}
      {t === 2 && <div className="sb-sprk">{[0, 1, 2].map((i) => <svg key={i} viewBox="0 0 24 24"><use href="#sb-sp" /></svg>)}</div>}
      {t === 3 && <div className="sb-ptg"><i /><span>no. {String(n + 1).padStart(2, '0')}</span></div>}
    </div>
  )
}

export default function Archives() {
  const ref = useRef(null)
  const [year, setYear] = useState('all')
  const years = useMemo(() => [...new Set(ARCH.map((a) => a.d.slice(0, 4)))], [])
  const list = ARCH.filter((a) => year === 'all' || a.d.startsWith(year))
  useReveal(ref, [year])

  return (
    <div ref={ref}>
      <PageHead kick="~/the archives" a="Memories," mark="in order" sub="by date and by year." />

      <div className="sb-chips" role="group" aria-label="Filter by year">
        {['all', ...years].map((y) => (
          <button key={y} className="sb-chip" aria-pressed={year === y} onClick={() => setYear(y)}>{y}</button>
        ))}
      </div>

      {/* zigzag timeline: entries alternate sides on desktop, single column on mobile */}
      <div className="sb-tl">
        {list.map((a, n) => {
          const p = dparts(a.d)
          const newYear = n === 0 || list[n - 1].d.slice(0, 4) !== a.d.slice(0, 4)
          const hasPhoto = a.img || a.g
          return (
            <Fragment key={`${a.d}-${a.t}`}>
              {newYear && <div className="sb-yr">{p.y}</div>}
              <div className={`sb-ent ${n % 2 ? 'sb-r' : 'sb-l'}`} data-r style={{ '--i': n % 3 }}>
                <i className="sb-dot" />
                <a className="sb-card" href={`#${a.to}`}>
                  {hasPhoto && (
                    <div className="sb-ph">
                      <span className="sb-tape" />
                      <div className="sb-shot" role="img" aria-label={a.t} style={pic(a)} />
                    </div>
                  )}
                  <div className="sb-meta">
                    <time dateTime={a.d}>{p.m} {p.day}</time>
                    <span className="sb-chip" style={{ cursor: 'inherit', fontSize: 10, padding: '1px 9px' }}>{a.k}</span>
                  </div>
                  <h3>{a.t}</h3>
                  <p>{a.s}</p>
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
