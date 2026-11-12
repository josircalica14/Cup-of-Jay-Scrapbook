import { useEffect, useRef } from 'react'
import { PAGES } from './data'

/* Sticky top bar: wordmark + hand-lettered tabs. Scrolls sideways on mobile
   and keeps the active tab in view. `page` is the current page id. */
export default function Navbar({ page }) {
  const nav = useRef(null)
  useEffect(() => {
    nav.current?.querySelector('[aria-current="page"]')
      ?.scrollIntoView({ inline: 'center', block: 'nearest' })
  }, [page])

  return (
    <header className="sb-top">
      <div className="sb-bar">
        <a className="sb-brand" href="#home">Cup of <b>Jay</b></a>
        <nav ref={nav} aria-label="Pages">
          {PAGES.map((p) => (
            <a key={p.id} href={`#${p.id}`} aria-current={page === p.id ? 'page' : undefined}>
              {p.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
