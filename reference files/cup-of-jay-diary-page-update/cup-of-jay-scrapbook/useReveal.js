import { useEffect } from 'react'

/* Fades/slides every [data-r] inside ref in once, in reading order.
   Pass deps (e.g. a filter) to re-observe after the list changes.
   The hidden state only exists under .sb-js + no-preference (see the CSS). */
export default function useReveal(ref, deps = []) {
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const els = [...root.querySelectorAll('[data-r]')]
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('sb-is-in'))
      return
    }
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue
        io.unobserve(e.target)
        e.target.classList.add('sb-is-in')
      }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 })
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
