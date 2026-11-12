import { useState } from 'react'

/* Your picture lives at public/jay.jpg (swap in a higher-res original any time).
   If the file is missing, the little illustration shows instead.
   BASE_URL is "/" locally and on Vercel, and the site's subpath on GitHub Pages, so the
   photo keeps loading wherever the site is served from. */
const PHOTO = `${import.meta.env.BASE_URL}jay.jpg`

export default function HeroPolaroid({ src = PHOTO, caption, date }) {
  const [broken, setBroken] = useState(false)
  return (
    <div className="polaroid">
      <div className="tape" />
      {broken ? (
        <svg className="photo" viewBox="0 0 300 230" role="img" aria-label="Illustrated sunset over a blue sea">
          <rect className="sky" width="300" height="230" />
          <circle className="sun" cx="198" cy="72" r="34" />
          <g className="wv2"><path className="w2" d="M0 166 Q 37 142 75 166 T 150 166 T 225 166 T 300 166 T 375 166 T 450 166 V 230 H 0 Z" /></g>
          <g className="wv1"><path className="w1" d="M-150 190 Q -112 168 -75 190 T 0 190 T 75 190 T 150 190 T 225 190 T 300 190 T 375 190 V 230 H -150 Z" /></g>
        </svg>
      ) : (
        <img className="photo-img" src={src} alt="Jay in a teal suit and bow tie, smiling in a garden" onError={() => setBroken(true)} />
      )}
      <div className="cap">
        <span className="capt">{caption}</span>
        <span className="date">{date}</span>
      </div>
    </div>
  )
}
