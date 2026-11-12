/* Page heading: kicker, big serif title with a highlighted word, drawn squiggle,
   handwritten subline — ported from the reference PageHead (sb- -> sbp-). */
export default function PageHead({ kick, a, mark, b, sub }) {
  return (
    <>
      <p className="sbp-kick" data-r>{kick}</p>
      <h1 data-r style={{ '--i': 1 }}>{a} <span className="sbp-mark">{mark}</span>{b ? ` ${b}` : ''}</h1>
      <svg className="sbp-squig" viewBox="0 0 200 16" aria-hidden="true" data-r style={{ '--i': 2 }}>
        <path d="M3 9c10-9 14 7 24 0s14 7 24 0 14 7 24 0 14 7 24 0 14 7 24 0 14 7 24 0 10 2 22-2" />
      </svg>
      {sub && <p className="sbp-sub" data-r style={{ '--i': 2, marginTop: -18 }}>{sub}</p>}
    </>
  )
}
