/* Render once. Provides #sp (4-point sparkle) and #chrome (y2k silver gradient). */
export default function SvgDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <symbol id="sp" viewBox="0 0 24 24">
          <path d="M12 0C12 7 17 12 24 12C17 12 12 17 12 24C12 17 7 12 0 12C7 12 12 7 12 0Z" />
        </symbol>
        <linearGradient id="chrome" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset=".45" stopColor="#b9c3e6" />
          <stop offset=".6" stopColor="#f4f6ff" />
          <stop offset="1" stopColor="#8f9bd0" />
        </linearGradient>
      </defs>
    </svg>
  )
}
