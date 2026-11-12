import Backdrop from './Backdrop'
import Navbar from './Navbar'
import { WORDS } from './data'

/* Wraps every page: background + navbar + page content + footer marquee. */
export default function Shell({ page, children }) {
  const loop = [...WORDS, ...WORDS]
  return (
    <div className="sb sb-js">
      <Backdrop />
      <Navbar page={page} />
      <main>{children}</main>
      <footer>
        <div className="sb-strip" aria-hidden="true">
          <div className="sb-track">
            {loop.map((w, i) => (
              <span key={i}>{w}<svg viewBox="0 0 24 24"><use href="#sb-sp" /></svg></span>
            ))}
          </div>
        </div>
        <div className="sb-foot"><span>made with too much coffee · @cupofjayyy_</span><span>cup no. 4 and counting</span></div>
      </footer>
    </div>
  )
}
