import { useRef, useState } from 'react'
import PageHead from './PageHead'
import useReveal from './useReveal'
import { SONGS, HOBBIES, FAVS, rot } from './data'

export default function LittleThings() {
  const ref = useRef(null)
  const [playing, setPlaying] = useState(() => new Set())
  useReveal(ref)

  const toggle = (i) => setPlaying((s) => {
    const n = new Set(s)
    n.has(i) ? n.delete(i) : n.add(i)
    return n
  })

  return (
    <div ref={ref}>
      <PageHead kick="~/little things" a="Little" mark="things" sub="songs, hobbies and random favorites." />

      <div className="sb-two">
        <div>
          <h2 data-r>On repeat</h2>
          {SONGS.map(([title, artist], i) => (
            <div key={i} className={`sb-song${playing.has(i) ? ' sb-play' : ''}`} data-r style={{ '--i': i }}>
              <div className="sb-disc" />
              <div><b>{title}</b><small>{artist}</small></div>
              <button aria-label={`Mark ${title} as playing`} aria-pressed={playing.has(i)} onClick={() => toggle(i)}>
                <svg viewBox="0 0 12 12"><path d="M2 1l9 5-9 5z" /></svg>
              </button>
            </div>
          ))}
        </div>

        <div>
          <h2 data-r>Hobbies</h2>
          <div className="sb-stk">
            {HOBBIES.map((h, i) => <span key={h} data-r style={{ '--r': `${rot(i)}deg`, '--i': i }}>{h}</span>)}
          </div>

          <h2 data-r>Random favorites</h2>
          <div className="sb-favs">
            {FAVS.map(([k, v], i) => (
              <div key={k} className="sb-card sb-fav" data-r style={{ '--r': `${rot(i)}deg`, '--i': i }}>
                <small>{k}</small><b>{v}</b>
              </div>
            ))}
            <div className="sb-card sb-fav sb-empty" data-r>
              <span className="sb-hand" style={{ fontSize: 22 }}>+ add one</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
