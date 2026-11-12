import { useEffect, useLayoutEffect } from 'react'

/* Shared scroll-in reveal for the scrapbook sections.
   The hidden state only exists under .sb.js + no-preference, so nothing can be
   stuck invisible; useLayoutEffect adds .js before paint to avoid a flash.
   Pass deps (e.g. a filter) when the list inside can change, so the new nodes
   get observed too. */
export default function useReveal(rootRef, deps = []) {
  useLayoutEffect(() => {
    const el = rootRef.current
    if (!el) return
    el.classList.add('js')
    return () => el.classList.remove('js')
  }, [rootRef])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const els = [...root.querySelectorAll('[data-reveal]')]
    if (!els.length) return
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'))
      return
    }
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue
        io.unobserve(e.target)
        e.target.classList.add('is-in')
      }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
