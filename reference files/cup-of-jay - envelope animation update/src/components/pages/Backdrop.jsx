/* Decorative background shared by every routed page: drifting blobs, sparkles,
   grain — ported from the reference Backdrop (sb- -> sbp-, dot grid dropped:
   the site body already carries it). Also defines the sparkle symbol (#sbp-sp)
   the pages reuse. */
export default function Backdrop() {
  return (
    <>
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <symbol id="sbp-sp" viewBox="0 0 24 24">
          <path d="M12 1c.6 6.4 4.6 10.4 11 11-6.4.6-10.4 4.6-11 11-.6-6.4-4.6-10.4-11-11 6.4-.6 10.4-4.6 11-11z" />
        </symbol>
      </svg>
      <div className="sbp-bg" aria-hidden="true">
        <div className="sbp-blob a" /><div className="sbp-blob b" />
        <div className="sbp-doodle" style={{ top: 130, right: '8%' }}><svg viewBox="0 0 24 24"><use href="#sbp-sp" /></svg></div>
        <div className="sbp-doodle" style={{ top: '58%', left: '3%', width: 22, height: 22, animationDelay: '-3s' }}><svg viewBox="0 0 24 24"><use href="#sbp-sp" /></svg></div>
        <div className="sbp-doodle" style={{ bottom: '12%', right: '12%', width: 36, height: 36, color: 'var(--cyan)', animationDelay: '-5s' }}><svg viewBox="0 0 24 24"><use href="#sbp-sp" /></svg></div>
      </div>
    </>
  )
}
