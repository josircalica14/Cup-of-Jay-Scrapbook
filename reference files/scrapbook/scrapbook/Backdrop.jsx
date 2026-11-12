/* Decorative background shared by every page: dots, drifting blobs, sparkles, grain.
   Also defines the sparkle symbol (#sb-sp) the pages reuse. */
export default function Backdrop() {
  return (
    <>
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <symbol id="sb-sp" viewBox="0 0 24 24">
          <path d="M12 1c.6 6.4 4.6 10.4 11 11-6.4.6-10.4 4.6-11 11-.6-6.4-4.6-10.4-11-11 6.4-.6 10.4-4.6 11-11z" />
        </symbol>
      </svg>
      <div className="sb-bg" aria-hidden="true">
        <div className="sb-dots" />
        <div className="sb-blob sb-a" /><div className="sb-blob sb-b" />
        <div className="sb-doodle" style={{ top: 130, right: '8%' }}><svg><use href="#sb-sp" /></svg></div>
        <div className="sb-doodle" style={{ top: '58%', left: '3%', width: 22, height: 22, animationDelay: '-3s' }}><svg><use href="#sb-sp" /></svg></div>
        <div className="sb-doodle" style={{ bottom: '12%', right: '12%', width: 36, height: 36, color: 'var(--cyan)', animationDelay: '-5s' }}><svg><use href="#sb-sp" /></svg></div>
      </div>
    </>
  )
}
