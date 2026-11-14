import Backdrop from './Backdrop'
import { WORDS } from '../../data/pages'
import '../../styles/pages.css'

/* Wraps every routed page: background + page content + footer marquee.
   The navbar lives in App (it never unmounts between pages). */
export default function Shell({ page, children }) {
  const loop = [...WORDS, ...WORDS]
  return (
    <div className="sbp js">
      <Backdrop />
      <div className="sbp-page" key={page}>
        <main id="main" tabIndex={-1} className="max-w-[1080px] mx-auto px-5 pt-14 pb-10 min-h-[70vh]">{children}</main>
      </div>
      <footer>
        <div className="sbp-strip" aria-hidden="true">
          <div className="sbp-track">
            {loop.map((w, i) => (
              <span key={i}>{w}<svg viewBox="0 0 24 24"><use href="#sbp-sp" /></svg></span>
            ))}
          </div>
        </div>
        <div className="sbp-foot"><span>made with too much coffee · @cupofjayyy_</span><span>cup no. 4 and counting</span></div>
      </footer>
    </div>
  )
}
