import { useState, useEffect, useRef } from 'react'
import useReveal from '../../hooks/useReveal'
import SectionArt from './SectionArt.jsx'
import { GUESTBOOK_SEED, STICKER_LINKS } from '../../data'
import '../../styles/scrapbook.css'

const STICKER_COLORS = ['#F4E8B8', '#F2D9D3', '#D6E2EC', '#D5DDCB']

export default function Guestbook() {
  const ref = useRef(null)
  useReveal(ref)
  const [entries, setEntries] = useState(() => {
    try {
      const s = localStorage.getItem('coj-guestbook')
      if (s) return JSON.parse(s)
    } catch {
      // unreadable or malformed storage — fall through to the seed notes
    }
    return GUESTBOOK_SEED
  })
  const [name, setName] = useState('')
  const [msg,  setMsg]  = useState('')
  const [err,  setErr]  = useState('')

  useEffect(() => {
    try {
      localStorage.setItem('coj-guestbook', JSON.stringify(entries))
    } catch {
      // storage full or blocked (private mode) — entries stay in memory
    }
  }, [entries])

  /* one field at a time when only one is missing, so the message can name it */
  const submit = () => {
    const missing = []
    if (!name.trim()) missing.push('a name')
    if (!msg.trim()) missing.push('a message')
    if (missing.length) { setErr(`Please add ${missing.join(' and ')}.`); return }
    const ts = new Date().toISOString().slice(0, 16).replace('T', ' ')
    setEntries([{ name: name.trim(), message: msg.trim(), timestamp: ts }, ...entries])
    setName(''); setMsg(''); setErr('')
  }

  const field = 'w-full bg-transparent border-b border-ink/25 focus:border-acc outline-none py-2 text-[17px] font-hand text-[22px] placeholder:font-ui placeholder:text-[15px] placeholder:text-mute/70 transition-colors duration-200'
  const label = 'block text-[11px] tracking-[0.14em] uppercase text-mute mb-1'

  return (
    <footer id="guestbook" ref={ref} className="sb gb relative overflow-hidden">
      <SectionArt variant="guestbook" />
      <div className="max-w-5xl mx-auto px-5 py-24 grid md:grid-cols-2 gap-14">
        {/* Form */}
        <div className="order-2 md:order-1">
          <header className="sb-head">
            <p className="sb-kick" data-reveal>~/guestbook</p>
            <h2 className="sb-title" data-reveal style={{ '--i': 1 }}>
              Leave a <span className="sb-mark">note</span>
            </h2>
            <p className="sb-sub" data-reveal style={{ '--i': 2 }}>
              say hi, leave a link. it stays pinned on the corkboard.
            </p>
          </header>

          <div className="sb-sticker sb-paper p-7" style={{ "--r": "-0.8deg" }} data-reveal>
            <span className="sb-tape" style={{ top: -11, left: 34, transform: 'rotate(-4deg)' }} aria-hidden="true" />
            {/* a real form: Enter submits, the browser marks empty fields, and the
                error is announced through aria-describedby instead of floating free */}
            <form className="grid gap-6" onSubmit={(e) => { e.preventDefault(); submit() }} noValidate={false}>
              <div>
                <label htmlFor="gn" className={label}>Your name</label>
                <input id="gn" value={name} onChange={e => setName(e.target.value)} className={field}
                  placeholder="e.g. Mika" required maxLength={40} autoComplete="nickname"
                  aria-invalid={err ? name.trim() === '' : undefined} aria-describedby={err ? 'gb-err' : undefined} />
              </div>
              <div>
                <label htmlFor="gm" className={label}>Message</label>
                <textarea id="gm" rows="3" value={msg} onChange={e => setMsg(e.target.value)} className={field + ' resize-none'}
                  placeholder="say something kind…" required maxLength={400}
                  aria-invalid={err ? msg.trim() === '' : undefined} aria-describedby={err ? 'gb-err' : undefined} />
              </div>
              {err && <p id="gb-err" role="alert" className="text-[#A2382B] font-hand text-xl">{err}</p>}
              <button type="submit" className="sb-pill justify-self-start !bg-ink !text-paper !border-ink !px-6 !py-2.5">
                Sign the page
              </button>
            </form>
          </div>

          {/* Social stickers */}
          <div className="flex flex-wrap gap-4 mt-12" data-reveal>
            {STICKER_LINKS.map((s, i) => (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                style={{ background: STICKER_COLORS[i % STICKER_COLORS.length], rotate: `${s.rot}deg` }}
                className="sb-sticker rounded-full px-5 py-2 text-sm"
              >
                <span className="font-medium">{s.platform}</span>{' '}
                <span className="text-ink/60">{s.handle}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Entries — pinned sticky notes */}
        <div className="order-1 md:order-2">
          <p className="sb-kick" data-reveal>~/pinned notes · {entries.length}</p>
          <ul className="grid gap-5 content-start">
            {entries.map((e, i) => (
              <li
                key={e.timestamp + i}
                data-reveal
                style={{ '--i': Math.min(i, 4), '--r': i % 2 ? '1.2deg' : '-1.4deg', background: STICKER_COLORS[i % STICKER_COLORS.length] }}
                className="sb-sticker px-6 py-5"
              >
                <span className="sb-tape" style={{ top: -10, left: '50%', marginLeft: -39, transform: `rotate(${i % 2 ? -3 : 2}deg)` }} aria-hidden="true" />
                <p className="font-hand text-[26px] leading-tight">{e.message}</p>
                <p className="text-[13px] text-ink/60 mt-2">{e.name} · {e.timestamp}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="text-center text-xs text-ink/70 pb-12">
        © 2026 Cup of Jay · Laguna, PH · made slowly, with coffee
      </p>
    </footer>
  )
}
