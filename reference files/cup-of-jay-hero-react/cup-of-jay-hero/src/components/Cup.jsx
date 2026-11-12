import { useEffect, useRef, useState } from 'react'

const COLORS = ['var(--accent)', '#f0a9b6', '#e9c75a']

export default function Cup({ count, onTap, reduce }) {
  const btn = useRef(null)
  const timer = useRef()
  const [bubble, setBubble] = useState({ text: 'hi!', on: true })

  const say = (text, ms) => {
    clearTimeout(timer.current)
    setBubble({ text, on: true })
    timer.current = setTimeout(() => setBubble((b) => ({ ...b, on: false })), ms)
  }

  useEffect(() => {
    say('hi!', 2800)
    return () => clearTimeout(timer.current)
  }, [])

  /* short-lived sparkles: created and removed outside React, so no re-renders */
  const burst = () => {
    for (let i = 0; i < 8; i++) {
      const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      s.setAttribute('class', 'spark')
      s.style.fill = COLORS[i % 3]
      s.innerHTML = '<use href="#sp"/>'
      btn.current.appendChild(s)
      const a = (Math.PI * 2 * i) / 8 + Math.random() * 0.5
      const r = 55 + Math.random() * 35
      const anim = s.animate(
        [
          { transform: 'translate(-50%,-50%) scale(.4)', opacity: 1 },
          { transform: `translate(calc(-50% + ${Math.cos(a) * r}px), calc(-50% + ${Math.sin(a) * r}px)) scale(1.1) rotate(90deg)`, opacity: 0 },
        ],
        { duration: 700, easing: 'cubic-bezier(.16,1,.3,1)' }
      )
      anim.onfinish = () => s.remove()
    }
  }

  const tap = () => {
    onTap()
    say(`cup no. ${count + 1}`, 1900)
    if (!reduce) burst()
  }

  return (
    <button ref={btn} className="cupbtn" type="button" onClick={tap} aria-label="Add a cup of coffee to today’s count">
      <span className={`bubble${bubble.on ? ' on' : ''}`}>{bubble.text}</span>
      <svg className="cup" viewBox="0 0 130 150" aria-hidden="true">
        <g fill="none" stroke="var(--muted)" strokeWidth="4" strokeLinecap="round">
          <path className="s s1" d="M45 46 q-8-8 0-15 t0-15" />
          <path className="s s2" d="M62 42 q-8-8 0-15 t0-15" />
          <path className="s s3" d="M79 46 q-8-8 0-15 t0-15" />
        </g>
        <g fill="var(--paper)" stroke="var(--paper)" strokeLinejoin="round" strokeLinecap="round">
          <path strokeWidth="14" d="M24 56 H98 V90 C98 112 82 126 61 126 C40 126 24 112 24 90 Z" />
          <path fill="none" strokeWidth="22" d="M98 66 C122 62 122 102 96 104" />
        </g>
        <path fill="none" stroke="var(--accent)" strokeWidth="9" strokeLinecap="round" d="M98 66 C122 62 122 102 96 104" />
        <path fill="var(--accent)" d="M24 56 H98 V90 C98 112 82 126 61 126 C40 126 24 112 24 90 Z" />
        <ellipse cx="61" cy="56" rx="37" ry="8" fill="#6b4330" stroke="var(--paper)" strokeWidth="3" />
        <path fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="4" strokeLinecap="round" d="M34 74 q-2 12 4 22" />
        <circle className="eye" cx="47" cy="94" r="3.8" fill="#fff" />
        <circle className="eye" cx="75" cy="94" r="3.8" fill="#fff" />
        <ellipse cx="38" cy="104" rx="6" ry="3.5" fill="#f4a9b8" />
        <ellipse cx="84" cy="104" rx="6" ry="3.5" fill="#f4a9b8" />
        <path d="M54 103 q7 7 14 0" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </button>
  )
}
