export default function Scene({ type, tone = ['#F2D9D3', '#3F5BD8'] }) {
  const [a, b] = tone
  return (
    <svg
      viewBox="0 0 200 150"
      className="w-full h-full block"
      role="img"
      aria-label={`${type} photo`}
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="200" height="150" fill={a} />

      {type === 'sunset' && (
        <>
          <circle cx="140" cy="60" r="24" fill="#FAF7F2" />
          <path d="M0 105 Q50 80 100 102 T200 98 V150 H0Z" fill={b} opacity=".85" />
          <path d="M0 128 Q60 112 120 126 T200 122 V150 H0Z" fill="#1F1F1F" opacity=".15" />
        </>
      )}

      {type === 'jeep' && (
        <>
          <rect x="25" y="68" width="150" height="48" rx="12" fill={b} />
          <rect x="40" y="78" width="30" height="20" rx="3" fill="#FAF7F2" />
          <rect x="80" y="78" width="30" height="20" rx="3" fill="#FAF7F2" />
          <circle cx="55"  cy="118" r="11" fill="#1F1F1F" />
          <circle cx="145" cy="118" r="11" fill="#1F1F1F" />
        </>
      )}

      {type === 'street' && (
        <>
          <rect x="18"  y="62" width="48" height="88" fill={b} />
          <rect x="76"  y="40" width="48" height="110" fill="#FAF7F2" opacity=".8" />
          <rect x="134" y="72" width="48" height="78"  fill="#1F1F1F" opacity=".2" />
          <circle cx="100" cy="22" r="9" fill="#FAF7F2" />
        </>
      )}

      {type === 'cup' && (
        <>
          <path d="M62 54h66v44a26 26 0 0 1-26 26h-14a26 26 0 0 1-26-26z" fill={b} />
          <path d="M128 66h10a14 14 0 0 1 0 28h-10" fill="none" stroke={b} strokeWidth="8" />
          <path d="M82 40q6-10 0-18M102 40q6-10 0-18" stroke="#FAF7F2" strokeWidth="4" fill="none" strokeLinecap="round" />
        </>
      )}

      {type === 'lake' && (
        <>
          <circle cx="60" cy="48" r="18" fill="#FAF7F2" />
          <path d="M0 90h200v60H0z" fill={b} opacity=".8" />
          <path d="M20 110h60M100 124h70M40 136h50" stroke="#FAF7F2" strokeWidth="3" strokeLinecap="round" />
        </>
      )}
    </svg>
  )
}
