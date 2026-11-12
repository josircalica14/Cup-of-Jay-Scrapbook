import { useRef } from 'react'

/* Button/link that leans toward the cursor. Transform is written directly to the node. */
export default function Magnetic({ as: Tag = 'button', reduce = false, className = '', ...rest }) {
  const ref = useRef(null)
  const move = (e) => {
    if (reduce) return
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left - r.width / 2) * 0.18
    const y = (e.clientY - r.top - r.height / 2) * 0.3
    ref.current.style.transform = `translate(${x}px, ${y}px)`
  }
  const leave = () => { if (ref.current) ref.current.style.transform = '' }
  return <Tag ref={ref} className={`btn ${className}`} onPointerMove={move} onPointerLeave={leave} {...rest} />
}
