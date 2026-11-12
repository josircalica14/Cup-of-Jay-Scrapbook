import { useEffect, useLayoutEffect } from 'react'

/* Scroll-in reveal for the routed pages: fades/slides every [data-r] inside
   ref in once, in reading order. Pass deps (e.g. a filter) to re-observe after
   the list changes. The hidden state only exists under .sbp.js + no-preference
   (see styles/pages.css), so nothing can be stuck invisible;
   useLayoutEffect adds .js before paint to avoid a flash. */
export default function useReveal(ref, deps = []) {
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    el.classList.add('js')
    return () => el.classList.remove('js')
  }, [ref])

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const els = [...root.querySelectorAll('[data-r]')]
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('sbp-is-in'))
      return
    }
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue
        io.unobserve(e.target)
        e.target.classList.add('sbp-is-in')
      }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
