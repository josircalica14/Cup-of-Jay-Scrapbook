import { useEffect, useRef, useState } from 'react'
import { PAGES } from '../../data/pages'

/* Tiny hash router (#home, #archives, ...). No dependency needed —
   same call the reference made; swap for react-router later.
   Only known page ids count as routes. Any other hash (#hello, #diary,
   #guestbook) is an in-page anchor on the home page: if we're already home
   the browser's native scroll is left alone; if we're on another page the
   hash brings us back home (landing at its top). */
export default function usePage() {
  const read = () => {
    const id = (window.location.hash || '#home').slice(1)
    return PAGES.some((p) => p.id === id) ? id : 'home'
  }
  const [page, setPage] = useState(read)
  const pageRef = useRef(page)

  useEffect(() => {
    const on = () => {
      const id = (window.location.hash || '').slice(1)
      const next = PAGES.some((p) => p.id === id) ? id : 'home'
      if (next === pageRef.current) return // same page: keep native anchor scrolling
      pageRef.current = next
      setPage(next)
      // 'instant' beats the page's smooth scroll-behavior: a page switch should not animate up from the bottom
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])

  return page
}
