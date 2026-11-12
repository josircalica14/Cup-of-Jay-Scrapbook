import { useCallback, useEffect, useRef, useState } from 'react'
import logo from '../../assets/logo.png'
import { PAGES } from '../../data/pages'
import '../../styles/pages.css'

/* Sticky top bar, ported from reference files/scrapbook/scrapbook/Navbar.jsx
   (sb- -> sbp- classes, see styles/pages.css): wordmark + hand-lettered
   tabs. Wide screens keep the row; below 820px the tabs collapse into a
   burger drawer so the page names never have to wrap or scroll sideways.
   `page` is the current page id from usePage. */
export default function Navbar({ page }) {
  const [open, setOpen] = useState(false)
  const [seenPage, setSeenPage] = useState(page)
  const nav = useRef(null)
  const btn = useRef(null)

  // a route change (link, back/forward) never leaves the drawer hanging open
  if (page !== seenPage) {
    setSeenPage(page)
    setOpen(false)
  }

  // hand focus back to the burger when the drawer closes under it
  const close = useCallback(() => {
    setOpen(false)
    if (nav.current?.contains(document.activeElement)) btn.current?.focus()
  }, [])

  // keep the active tab visible when the row is too wide to show every tab
  useEffect(() => {
    if (open) return
    nav.current?.querySelector('[aria-current="page"]')
      ?.scrollIntoView({ inline: 'center', block: 'nearest' })
  }, [page, open])

  // while open: land focus on the first tab, Esc closes. The page-scroll lock
  // is CSS (html:has(.sbp-top.is-open)), so it lifts with the breakpoint itself.
  useEffect(() => {
    if (!open) return
    nav.current?.querySelector('a')?.focus()
    const onKey = (e) => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, close])

  return (
    <>
      <header className={`sbp-top${open ? ' is-open' : ''}`}>
        <div className="sbp-bar">
          <a className="sbp-brand" href="#home" onClick={close}>
            <img src={logo} alt="" />
            cup of <b>jay</b>
          </a>

          <button
            type="button"
            ref={btn}
            className="sbp-burger"
            aria-expanded={open}
            aria-controls="sbp-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>

          <nav id="sbp-nav" ref={nav} aria-label="Pages">
            {PAGES.map((p) => (
              <a
                key={p.id}
                href={`#${p.id}`}
                aria-current={page === p.id ? 'page' : undefined}
                onClick={close}
              >
                {p.label}
                <span className="sbp-tab-n" aria-hidden="true">{p.n}</span>
              </a>
            ))}
          </nav>
        </div>
      </header>
      {open && <div className="sbp-scrim" aria-hidden="true" onClick={close} />}
    </>
  )
}