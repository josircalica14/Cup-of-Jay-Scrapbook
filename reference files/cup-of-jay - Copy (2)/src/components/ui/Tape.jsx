export default function Tape({ className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute w-20 h-5 bg-butter/80 border border-black/5 ${className}`}
    />
  )
}
