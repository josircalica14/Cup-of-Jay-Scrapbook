import Tape from './Tape'

export default function Polaroid({ children, caption, sub, rotation = 0, className = '' }) {
  return (
    <figure
      style={{ transform: `rotate(${rotation}deg)` }}
      className={`card relative p-3 pb-4 transition-transform hover:-translate-y-1 ${className}`}
    >
      <Tape className="-top-2.5 left-1/2 -translate-x-1/2 -rotate-2" />
      <div className="aspect-[4/3] overflow-hidden bg-line">{children}</div>
      <figcaption className="mt-3 px-1">
        <p className="font-hand text-2xl leading-none">{caption}</p>
        {sub && <p className="text-[11px] tracking-widest uppercase text-mute mt-1">{sub}</p>}
      </figcaption>
    </figure>
  )
}
