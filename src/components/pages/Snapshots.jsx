import { useEffect, useRef, useState } from 'react'
import PageHead from './PageHead'
import useReveal from '../../hooks/usePageReveal'
import { MarginRail, Ring, Camera, TornStrip, Stars, Sun, Squiggle, Heart, Paperclip, Arrow, Bookmark } from './PageArt'
import { SNAPS, rot } from '../../data/pages'

const ratio = (i) => (i % 3 === 1 ? '4/5' : i % 3 === 2 ? '1/1' : '1/1.1')

/* Hand-drawn margin art behind the wall: a film strip down the left gutter, a
   pencil swirl and a vertical note on the right, a scribbled arrow, sparkles.
   Sits behind the polaroids, never intercepts a click, and only appears where
   there is gutter to hold it (see .sbp-wallart). */
function WallArt() {
  return (
    <div className="sbp-wallart" aria-hidden="true">
      {/* sprocket holes tile down the whole strip, however tall the wall gets */}
      <svg className="sbp-wa-film">
        <defs>
          <pattern id="sbp-film-holes" width="26" height="21" patternUnits="userSpaceOnUse">
            <rect x="3" y="4" width="20" height="12" rx="2.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#sbp-film-holes)" />
      </svg>

      <svg className="sbp-wa-swirl" viewBox="0 0 200 200">
        <path d="M18 118c-8-52 34-96 84-92s88 40 78 84-56 66-96 46-30-76 14-92 78 6 82 44" />
      </svg>

      <svg className="sbp-wa-arrow" viewBox="0 0 130 96">
        <path d="M6 88C20 32 76 4 122 20M122 20l-20-6M122 20l-4 20" />
      </svg>

      <p className="sbp-wa-note">from the phone roll</p>

      <svg className="sbp-wa-stars a" viewBox="0 0 60 44">
        <path d="M12 3c.9 7.4 3.2 9.7 10.6 10.6C15.2 14.5 12.9 16.8 12 24.2 11.1 16.8 8.8 14.5 1.4 13.6 8.8 12.7 11.1 10.4 12 3z" />
        <path d="M44 22c.5 4.6 2 6.1 6.6 6.6-4.6.5-6.1 2-6.6 6.6-.5-4.6-2-6.1-6.6-6.6 4.6-.5 6.1-2 6.6-6.6z" />
      </svg>
      <svg className="sbp-wa-stars b" viewBox="0 0 34 34">
        <path d="M17 2c.7 6.4 2.7 8.4 9.1 9.1-6.4.7-8.4 2.7-9.1 9.1-.7-6.4-2.7-8.4-9.1-9.1 6.4-.7 8.4-2.7 9.1-9.1z" />
      </svg>
    </div>
  )
}

export default function Snapshots() {
  const ref = useRef(null)
  const closeBtn = useRef(null)
  const dialog = useRef(null)
  const opener = useRef(null) // the polaroid that opened the viewer
  const touch = useRef(null)
  const [open, setOpen] = useState(null) // index of the photo in the viewer, or null
  useReveal(ref)

  const go = (i) => setOpen((i + SNAPS.length) % SNAPS.length)

  const closeViewer = () => {
    setOpen(null)
    // hand focus back to the polaroid that opened it, not into the page body
    opener.current?.focus()
    opener.current = null
  }

  const openViewer = (i, el) => {
    opener.current = el
    setOpen(i)
  }

  useEffect(() => {
    if (open === null) return
    closeBtn.current?.focus()

    const key = (e) => {
      if (e.key === 'Escape') { closeViewer(); return }
      if (e.key === 'ArrowRight') go(open + 1)
      if (e.key === 'ArrowLeft') go(open - 1)
      // the viewer is modal, so Tab stays inside it instead of reaching the wall
      if (e.key !== 'Tab') return
      const f = dialog.current?.querySelectorAll('button')
      if (!f?.length) return
      const first = f[0]
      const last = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }

    window.addEventListener('keydown', key)
    return () => window.removeEventListener('keydown', key)
  }, [open])

  const s = open === null ? null : SNAPS[open]

  return (
    <div ref={ref} className="sbp-art-host">
      {/* the outer gutters hold a rail of camera-roll doodles, washi tape and
          sticker dots so the desktop margins aren't blank; hidden where there
          is no gutter to hold them */}
      <MarginRail seed={4}
        left={[Camera, Stars, Sun, Squiggle, Heart, TornStrip]}
        right={[Ring, TornStrip, Paperclip, Stars, Arrow, Bookmark]} />

      <div className="sbp-snaphead">
        {/* title and note sit in one flex row: the note follows the headline at a
            fixed gap instead of being pinned to a guessed x-offset */}
        <div className="sbp-headrow">
          <div className="sbp-headtext">
            <PageHead kick="~/snapshots" a="Little" mark="frames" sub="tap a polaroid to look closer." />
          </div>
          <div className="sbp-wa-scrap">
            <span className="sbp-tape" aria-hidden="true" />
            <p>kept, not deleted</p>
          </div>
        </div>
      </div>

      <div className="sbp-wallwrap">
        <WallArt />
        <div className="sbp-wall">
        {SNAPS.map((x, i) => (
          <button key={x.t} className="sbp-pol" data-r aria-label={`Open ${x.t}`}
                  style={{ '--r': `${rot(i)}deg`, '--i': i % 4 }}
                  onClick={(e) => openViewer(i, e.currentTarget)}>
            <span className="sbp-tape" style={{ left: '50%', marginLeft: -35, top: -12, transform: `rotate(${rot(i + 2)}deg)` }} />
            <span className="sbp-shot" style={{ aspectRatio: ratio(i) }}>
              {/* photos ship at 960px wide (~90 KB each): double the 330px column,
                  and sharp enough for the 440px viewer */}
              <img src={x.img} alt={x.alt} loading={i < 4 ? 'eager' : 'lazy'} decoding="async" />
            </span>
            <span className="sbp-pol-cap">{x.caption}</span>
            <time className="sbp-pol-date" dateTime={x.s}>{x.d}</time>
          </button>
        ))}
        </div>
      </div>

      {/* the wall needs an ending, not just a ragged bottom */}
      <p className="sbp-wall-end"><span aria-hidden="true">—</span> end of roll <span aria-hidden="true">—</span></p>

      {s && (
        <div className="sbp-lb on" role="dialog" aria-modal="true" aria-label="Photo viewer" ref={dialog}
             onClick={(e) => e.target === e.currentTarget && closeViewer()}
             onTouchStart={(e) => { touch.current = e.touches[0].clientX }}
             onTouchEnd={(e) => {
               if (touch.current === null) return
               const dx = e.changedTouches[0].clientX - touch.current
               if (Math.abs(dx) > 48) go(open + (dx < 0 ? 1 : -1))
               touch.current = null
             }}>
          <div style={{ width: 'min(440px,100%)' }}>
            <div className="sbp-pol" style={{ '--r': '-2deg' }}>
              <span className="sbp-tape" style={{ left: '50%', marginLeft: -35, top: -12 }} />
              <span className="sbp-shot sbp-shot-full">
                <img src={s.img} alt={s.alt} decoding="async" />
              </span>
              <span className="sbp-pol-cap sbp-pol-cap-lg">{s.caption}</span>
              <time className="sbp-pol-date" dateTime={s.s}>{s.d}</time>
            </div>
            <div style={{ color: '#fff', opacity: 0.85, textAlign: 'center', fontSize: 12, marginTop: 6 }}>
              {open + 1} / {SNAPS.length} · swipe or use ← → to flip
            </div>
            <div className="sbp-lbbtns">
              <button className="sbp-chip" onClick={() => go(open - 1)}>← prev</button>
              <button className="sbp-chip" ref={closeBtn} onClick={closeViewer}>close</button>
              <button className="sbp-chip" onClick={() => go(open + 1)}>next →</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
