import { useEffect, useState } from 'react'
import { PAGES } from './data'

/* Tiny hash router (#archives, #snapshots, ...). No dependency needed.
   Swap for react-router later; Navbar only needs the current page id. */
export default function usePage() {
  const read = () => {
    const id = (window.location.hash || '#home').slice(1)
    return PAGES.some((p) => p.id === id) ? id : 'home'
  }
  const [page, setPage] = useState(read)
  useEffect(() => {
    const on = () => { setPage(read()); window.scrollTo(0, 0) }
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  return page
}
