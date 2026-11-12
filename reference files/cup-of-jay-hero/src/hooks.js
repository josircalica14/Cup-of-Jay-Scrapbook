import { useEffect, useRef, useState } from 'react'

export function useReducedMotion() {
  const query = '(prefers-reduced-motion: reduce)'
  const [reduce, setReduce] = useState(() => typeof window !== 'undefined' && matchMedia(query).matches)
  useEffect(() => {
    const m = matchMedia(query)
    const on = () => setReduce(m.matches)
    m.addEventListener('change', on)
    return () => m.removeEventListener('change', on)
  }, [])
  return reduce
}

/* Writes --mx / --my (-1..1) straight to the stage element. No React state, no re-renders. */
export function useParallax(hostRef, stageRef, enabled) {
  useEffect(() => {
    const host = hostRef.current
    const stage = stageRef.current
    if (!enabled || !host || !stage) return
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0

    const tick = () => {
      cx += (tx - cx) * 0.08
      cy += (ty - cy) * 0.08
      stage.style.setProperty('--mx', cx.toFixed(3))
      stage.style.setProperty('--my', cy.toFixed(3))
      raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.002 ? requestAnimationFrame(tick) : 0
    }
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick) }
    const move = (e) => {
      const r = host.getBoundingClientRect()
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2
      kick()
    }
    const leave = () => { tx = ty = 0; kick() }

    host.addEventListener('pointermove', move)
    host.addEventListener('pointerleave', leave)
    return () => {
      host.removeEventListener('pointermove', move)
      host.removeEventListener('pointerleave', leave)
      cancelAnimationFrame(raf)
    }
  }, [hostRef, stageRef, enabled])
}

export function useTypewriter(text, { enabled = true, firstDelay = 0, speed = 36 } = {}) {
  const [shown, setShown] = useState(enabled ? '' : text)
  const first = useRef(true)
  useEffect(() => {
    if (!enabled) { setShown(text); return }
    const delay = first.current ? firstDelay : 0
    first.current = false
    let i = 0, iv
    setShown('')
    const t = setTimeout(() => {
      iv = setInterval(() => {
        i += 1
        setShown(text.slice(0, i))
        if (i >= text.length) clearInterval(iv)
      }, speed)
    }, delay)
    return () => { clearTimeout(t); clearInterval(iv) }
  }, [text, enabled, firstDelay, speed])
  return shown
}
