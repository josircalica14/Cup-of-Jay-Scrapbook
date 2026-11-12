import { useRef, useState } from 'react'
import PageHead from './PageHead'
import useReveal from './useReveal'
import { DIARY, dparts } from './data'

function Entry({ e, i }) {
  const more = useRef(null)
  const [open, setOpen] = useState(false)
  const p = dparts(e.d)
  return (
    <article className="sb-card sb-lined" data-r style={{ '--i': i, transform: `rotate(${i % 2 ? 0.6 : -0.5}deg)` }}>
      <span className="sb-tape" style={{ top: -11, right: 34, transform: 'rotate(3deg)' }} />
      <div className="sb-date"><b>{p.day}</b>{p.m}<br />{p.y}</div>
      <p className="sb-mood">{e.m}</p>
      <h3>{e.t}</h3>
      <p className="sb-body">{e.s}</p>
      <div className="sb-more" id={`m${i}`} ref={more} style={{ maxHeight: open ? more.current?.scrollHeight : 0 }}>
        <p>{e.x}</p>
      </div>
      <button className="sb-rd" aria-expanded={open} aria-controls={`m${i}`} onClick={() => setOpen(!open)}>
        {open ? 'fold it up' : 'keep reading'}
      </button>
    </article>
  )
}

export default function DearDiary() {
  const ref = useRef(null)
  useReveal(ref)
  return (
    <div ref={ref}>
      <PageHead kick="~/dear diary" a="Dear" mark="diary" sub="unpolished, unedited, mine." />
      <div className="sb-dia">
        {DIARY.map((e, i) => <Entry key={e.d} e={e} i={i} />)}
      </div>
    </div>
  )
}
