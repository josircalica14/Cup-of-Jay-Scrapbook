export default function Polaroid({ scene, flipperRef }) {
  const [sky, sun, w1, w2] = scene.v
  return (
    <div ref={flipperRef}>
      <div className="polaroid">
        <div className="tape" />
        <svg
          className="photo"
          viewBox="0 0 300 230"
          role="img"
          aria-label="Illustrated sunset over a blue sea"
          style={{ '--sky': sky, '--sun': sun, '--w1': w1, '--w2': w2 }}
        >
          <rect className="sky" width="300" height="230" />
          <circle className="sun" cx="198" cy="72" r="34" />
          <g className="wv2"><path className="w2" d="M0 166 Q 37 142 75 166 T 150 166 T 225 166 T 300 166 T 375 166 T 450 166 V 230 H 0 Z" /></g>
          <g className="wv1"><path className="w1" d="M-150 190 Q -112 168 -75 190 T 0 190 T 75 190 T 150 190 T 225 190 T 300 190 T 375 190 V 230 H -150 Z" /></g>
        </svg>
        <div className="cap">
          <span className="capt">{scene.caption}</span>
          <span className="date">{scene.date}</span>
        </div>
      </div>
    </div>
  )
}
