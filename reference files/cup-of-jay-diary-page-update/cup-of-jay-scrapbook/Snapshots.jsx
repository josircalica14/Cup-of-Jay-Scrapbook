import { useEffect, useRef, useState } from 'react'
import PageHead from './PageHead'
import useReveal from './useReveal'
import { SNAPS, dparts, pic, rot } from './data'

const ratio = (i) => (i % 3 === 1 ? '4/5' : i % 3 === 2 ? '1/1' : '1/1.1')

export default function Snapshots() {
  const ref = useRef(null)
  const closeBtn = useRef(null)
  const [open, setOpen] = useState(null) // index of the photo in the viewer, or null
  useReveal(ref)

  const go = (i) => setOpen((i + SNAPS.length) % SNAPS.length)

  useEffect(() => {
    if (open === null) return
    closeBtn.current?.focus()
    const key = (e) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowRight') go(open + 1)
      if (e.key === 'ArrowLeft') go(open - 1)
    }
    window.addEventListener('keydown', key)
    return () => window.removeEventListener('keydown', key)
  }, [open])

  const s = open === null ? null : SNAPS[open]
  const p = s && dparts(s.d)

  return (
    <div ref={ref}>
      <PageHead kick="~/snapshots" a="Little" mark="frames" sub="tap a polaroid to look closer." />

      <div className="sb-wall">
        {SNAPS.map((x, i) => (
          <button key={x.t} className="sb-pol" data-r aria-label={`Open ${x.t}`}
                  style={{ '--r': `${rot(i)}deg`, '--i': i % 4 }} onClick={() => setOpen(i)}>
            <span className="sb-tape" style={{ left: '50%', marginLeft: -35, top: -12, transform: `rotate(${rot(i + 2)}deg)` }} />
            <div className="sb-shot" style={{ ...pic(x), aspectRatio: ratio(i) }} />
            <p>{x.t}</p>
          </button>
        ))}
      </div>

      {s && (
        <div className="sb-lb sb-on" role="dialog" aria-modal="true" aria-label="Photo viewer"
             onClick={(e) => e.target === e.currentTarget && setOpen(null)}>
          <div style={{ width: 'min(440px,100%)' }}>
            <div className="sb-pol" style={{ '--r': '-2deg' }}>
              <span className="sb-tape" style={{ left: '50%', marginLeft: -35, top: -12 }} />
              <div className="sb-shot" style={{ ...pic(s), aspectRatio: '1/1' }} />
              <p>{s.t}</p>
            </div>
            <div className="sb-meta" style={{ color: '#fff', opacity: 0.8, textAlign: 'center', fontSize: 12, marginTop: 4 }}>
              {p.m} {p.day}, {p.y} · {open + 1} / {SNAPS.length}
            </div>
            <div className="sb-lbbtns">
              <button className="sb-chip" onClick={() => go(open - 1)}>← prev</button>
              <button className="sb-chip" ref={closeBtn} onClick={() => setOpen(null)}>close</button>
              <button className="sb-chip" onClick={() => go(open + 1)}>next →</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
