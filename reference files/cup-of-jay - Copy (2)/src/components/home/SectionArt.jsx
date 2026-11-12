import '../../styles/section-art.css'

/* Backgrounds for each home section.

   Only three kinds of marks are allowed here — plain geometry (rings, arcs,
   stacked page outlines), repeating patterns (ruled lines, graph grid, dots)
   and one hand-drawn scribble. Nothing depicts an object, nothing carries
   words: the sections' own artwork and hand-written notes stay the loudest
   thing on the page. Everything is hairline weight and low opacity, sits
   behind the content, and bleeds off the left/right edges so wide screens get
   dressed gutters without anything entering the reading column. */

/* ── hero: morning light — rings, arcs + scattered stars and squiggles ── */
const HERO = (
  <>
    {/* right gutter: big soft ring */}
    <svg className="sa-ring sa-acc" style={{ right: '-130px', top: '-150px', width: 470, height: 470, opacity: 0.26 }} viewBox="0 0 470 470">
      <circle cx="235" cy="235" r="234" />
    </svg>
    {/* right gutter: smaller inner ring */}
    <svg className="sa-acc" style={{ right: '-80px', top: '-60px', width: 280, height: 280, opacity: 0.12 }} viewBox="0 0 280 280">
      <circle cx="140" cy="140" r="120" strokeDasharray="6 10" />
    </svg>
    {/* left gutter: double arc */}
    <svg className="sa-arcs sa-ink" style={{ left: '-235px', top: '18%', width: 380, height: 380, opacity: 0.16 }} viewBox="0 0 380 380">
      <circle cx="190" cy="190" r="126" />
      <circle cx="190" cy="190" r="186" />
    </svg>
    {/* left gutter: floating star sparkle */}
    <svg className="sa-acc sa-float" style={{ left: 'calc(50% - 680px)', top: '28%', width: 28, height: 28, opacity: 0.45 }} viewBox="0 0 24 24">
      <path d="M12 2c.4 4.4 3.2 7.2 7.6 7.6-4.4.4-7.2 3.2-7.6 7.6-.4-4.4-3.2-7.2-7.6-7.6 4.4-.4 7.2-3.2 7.6-7.6z" fill="currentColor" stroke="none" />
    </svg>
    {/* left gutter: small star */}
    <svg className="sa-acc sa-float sa-float-slow" style={{ left: 'calc(50% - 580px)', top: '60%', width: 16, height: 16, opacity: 0.35 }} viewBox="0 0 24 24">
      <path d="M12 2c.4 4.4 3.2 7.2 7.6 7.6-4.4.4-7.2 3.2-7.6 7.6-.4-4.4-3.2-7.2-7.6-7.6 4.4-.4 7.2-3.2 7.6-7.6z" fill="currentColor" stroke="none" />
    </svg>
    {/* right gutter: squiggle */}
    <svg className="sa-ink" style={{ right: 'calc(50% - 680px)', top: '55%', width: 80, height: 50, opacity: 0.18 }} viewBox="0 0 80 50">
      <path d="M4 30c8-20 14 16 22 0s12 16 20 0 12 16 22 2" />
    </svg>
    {/* right gutter: dotted cross */}
    <svg className="sa-acc" style={{ right: 'calc(50% - 720px)', top: '22%', width: 24, height: 24, opacity: 0.3 }} viewBox="0 0 24 24">
      <path d="M12 3v18M3 12h18" strokeDasharray="2 4" />
    </svg>
  </>
)

/* ── about: handled directly in About.jsx with h-doodle elements ── */

/* ── diary: ruled paper + margin line + corner curls + scattered dots ── */
const DIARY = (
  <>
    <div className="sa-rule" />
    {/* wavering margin line */}
    <svg className="sa-margin sa-ink" style={{ left: 'calc(50% - 460px)', top: '14%', width: 40, height: '64%', opacity: 0.2 }} viewBox="0 0 40 400" preserveAspectRatio="none">
      <path d="M10 4C32 30 2 56 10 82s22 26 0 52 22 26 0 52 22 26 0 52 22 26 0 52 22 26 0 52" />
    </svg>
    {/* right gutter: a scattering of loose dots — like a pen tested on the page */}
    <svg className="sa-ink" style={{ right: 'calc(50% - 600px)', top: '20%', width: 60, height: 180, opacity: 0.18 }} viewBox="0 0 60 180">
      <circle cx="20" cy="20" r="2.5" fill="currentColor" stroke="none" />
      <circle cx="40" cy="48" r="2" fill="currentColor" stroke="none" />
      <circle cx="12" cy="78" r="3" fill="currentColor" stroke="none" />
      <circle cx="46" cy="110" r="2" fill="currentColor" stroke="none" />
      <circle cx="26" cy="142" r="2.5" fill="currentColor" stroke="none" />
      <circle cx="50" cy="165" r="1.5" fill="currentColor" stroke="none" />
    </svg>
    {/* left gutter: a small spiral doodle */}
    <svg className="sa-acc" style={{ left: 'calc(50% - 580px)', top: '44%', width: 54, height: 54, opacity: 0.22 }} viewBox="0 0 54 54">
      <path d="M27 27c0-4 5-4 5 0s-8 7-12 2-2-14 8-16 20 4 20 16-10 22-24 20S4 38 8 20" />
    </svg>
    {/* right gutter: star */}
    <svg className="sa-acc sa-float" style={{ right: 'calc(50% - 640px)', top: '68%', width: 22, height: 22, opacity: 0.4 }} viewBox="0 0 24 24">
      <path d="M12 2c.4 4.4 3.2 7.2 7.6 7.6-4.4.4-7.2 3.2-7.6 7.6-.4-4.4-3.2-7.2-7.6-7.6 4.4-.4 7.2-3.2 7.6-7.6z" fill="currentColor" stroke="none" />
    </svg>
    {/* left gutter: corner tick marks — like a page has been measured */}
    <svg className="sa-ink" style={{ left: 'calc(50% - 520px)', top: '10%', width: 40, height: 40, opacity: 0.15 }} viewBox="0 0 40 40">
      <path d="M4 4h10M4 4v10" />
      <path d="M36 36h-10M36 36v-10" />
    </svg>
  </>
)

/* ── moments: a pile of pages, colour washes, wavy lines, plus gutter stamps ── */
const MOMENTS = (
  <>
    <div className="sa-wash" style={{ right: '-90px', top: '6%', width: 560, height: 560 }} />
    <div className="sa-wash sa-wash-cyan" style={{ left: '-140px', bottom: '8%', width: 520, height: 520 }} />
    {/* right gutter: stacked page outlines */}
    <svg className="sa-pages sa-acc" style={{ right: '-70px', top: 64, width: 250, height: 320, opacity: 0.3 }} viewBox="0 0 250 320">
      <rect x="42" y="38" width="166" height="236" rx="10" transform="rotate(-9 125 156)" />
      <rect x="42" y="38" width="166" height="236" rx="10" transform="rotate(-3 125 156)" />
      <rect x="42" y="38" width="166" height="236" rx="10" />
    </svg>
    {/* left gutter: smaller page pair */}
    <svg className="sa-pages sa-acc" style={{ left: '-80px', top: '54%', width: 230, height: 296, opacity: 0.2 }} viewBox="0 0 250 320">
      <rect x="42" y="38" width="166" height="236" rx="10" transform="rotate(8 125 156)" />
      <rect x="42" y="38" width="166" height="236" rx="10" />
    </svg>
    {/* bottom left: dotted wave */}
    <svg className="sa-waves sa-ink" style={{ left: '-30px', bottom: 110, width: 330, height: 90, opacity: 0.2 }} viewBox="0 0 330 90">
      <path d="M2 58c22-26 40 26 62 0s40 26 62 0 40 26 62 0 40 26 62 0" strokeDasharray="1 9" />
    </svg>
    {/* right gutter: a small round stamp ring */}
    <svg className="sa-acc" style={{ right: 'calc(50% - 700px)', top: '72%', width: 72, height: 72, opacity: 0.22 }} viewBox="0 0 72 72">
      <circle cx="36" cy="36" r="32" strokeDasharray="3 6" />
      <circle cx="36" cy="36" r="22" />
    </svg>
    {/* left gutter: floating sparkle */}
    <svg className="sa-acc sa-float" style={{ left: 'calc(50% - 660px)', top: '18%', width: 20, height: 20, opacity: 0.4 }} viewBox="0 0 24 24">
      <path d="M12 2c.4 4.4 3.2 7.2 7.6 7.6-4.4.4-7.2 3.2-7.6 7.6-.4-4.4-3.2-7.2-7.6-7.6 4.4-.4 7.2-3.2 7.6-7.6z" fill="currentColor" stroke="none" />
    </svg>
    {/* left gutter: loose arrow scribble */}
    <svg className="sa-ink" style={{ left: 'calc(50% - 610px)', top: '42%', width: 48, height: 48, opacity: 0.16 }} viewBox="0 0 48 48">
      <path d="M8 38C14 16 34 16 40 10M40 10l-8 2M40 10l-2 8" />
    </svg>
  </>
)

/* ── the desk: graph-paper corners + cup rings + extra gutter marks ── */
const DESK = (
  <>
    {/* corner graph grids */}
    <div className="sa-grid" style={{ left: 0, bottom: 40, width: 330, height: 300 }} />
    <div className="sa-grid" style={{ right: 0, top: 40, width: 300, height: 280 }} />
    {/* left gutter: double coffee-ring */}
    <svg className="sa-rings sa-acc" style={{ left: 'calc(50% - 560px - 120px)', bottom: '18%', width: 190, height: 190, opacity: 0.24 }} viewBox="0 0 190 190">
      <circle cx="95" cy="95" r="86" />
      <circle cx="95" cy="95" r="62" strokeDasharray="2 7" />
    </svg>
    {/* right gutter: single ring */}
    <svg className="sa-rings sa-acc" style={{ right: 'calc(50% - 560px - 150px)', top: '46%', width: 210, height: 210, opacity: 0.18 }} viewBox="0 0 210 210">
      <circle cx="105" cy="105" r="98" />
    </svg>
    {/* right gutter: small plus tick marks */}
    <svg className="sa-ink" style={{ right: 'calc(50% - 680px)', top: '20%', width: 50, height: 90, opacity: 0.15 }} viewBox="0 0 50 90">
      <path d="M10 10h8M14 6v8" />
      <path d="M34 44h8M38 40v8" />
      <path d="M12 76h8M16 72v8" />
    </svg>
    {/* left gutter: small wavy underline */}
    <svg className="sa-acc" style={{ left: 'calc(50% - 640px)', top: '28%', width: 90, height: 30, opacity: 0.25 }} viewBox="0 0 90 30">
      <path d="M4 18c8-14 12 10 20 0s10 10 18 0 10 10 20 0 10 6 24 0" />
    </svg>
    {/* left gutter: floating star */}
    <svg className="sa-acc sa-float-slow" style={{ left: 'calc(50% - 590px)', top: '64%', width: 18, height: 18, opacity: 0.38 }} viewBox="0 0 24 24">
      <path d="M12 2c.4 4.4 3.2 7.2 7.6 7.6-4.4.4-7.2 3.2-7.6 7.6-.4-4.4-3.2-7.2-7.6-7.6 4.4-.4 7.2-3.2 7.6-7.6z" fill="currentColor" stroke="none" />
    </svg>
  </>
)

/* ── guestbook: corkboard dots, long arcs, scattered pin marks ── */
const GUESTBOOK = (
  <>
    <div className="sa-dots" />
    {/* left gutter: long sweeping arc */}
    <svg className="sa-arc sa-paper" style={{ left: 'calc(50% - 640px)', top: 60, width: 280, height: 280, opacity: 0.45 }} viewBox="0 0 280 280">
      <path d="M4 276A272 272 0 0 1 276 4" />
    </svg>
    {/* right gutter: wavy line */}
    <svg className="sa-waves sa-paper" style={{ right: 'calc(50% - 660px)', bottom: 90, width: 240, height: 76, opacity: 0.4 }} viewBox="0 0 240 76">
      <path d="M2 52c18-28 34 14 52-6s34 6 52-10 32 16 54 6" />
    </svg>
    {/* left gutter: pin dot cluster — corkboard push pins */}
    <svg className="sa-paper" style={{ left: 'calc(50% - 700px)', top: '38%', width: 60, height: 100, opacity: 0.5 }} viewBox="0 0 60 100">
      <circle cx="14" cy="18" r="5" fill="currentColor" stroke="none" />
      <circle cx="46" cy="38" r="4" fill="currentColor" stroke="none" />
      <circle cx="20" cy="64" r="5" fill="currentColor" stroke="none" />
      <circle cx="48" cy="80" r="3.5" fill="currentColor" stroke="none" />
    </svg>
    {/* right gutter: second arc */}
    <svg className="sa-arc sa-paper" style={{ right: 'calc(50% - 680px)', top: '12%', width: 200, height: 200, opacity: 0.28 }} viewBox="0 0 200 200">
      <path d="M196 4A192 192 0 0 1 4 196" />
    </svg>
    {/* right gutter: small sparkle */}
    <svg className="sa-paper sa-float" style={{ right: 'calc(50% - 620px)', top: '62%', width: 20, height: 20, opacity: 0.55 }} viewBox="0 0 24 24">
      <path d="M12 2c.4 4.4 3.2 7.2 7.6 7.6-4.4.4-7.2 3.2-7.6 7.6-.4-4.4-3.2-7.2-7.6-7.6 4.4-.4 7.2-3.2 7.6-7.6z" fill="currentColor" stroke="none" />
    </svg>
  </>
)

const ART = { hero: HERO, moments: MOMENTS, diary: DIARY, desk: DESK, guestbook: GUESTBOOK }

export default function SectionArt({ variant }) {
  return (
    <div className={`sart sart-${variant}`} aria-hidden="true">
      {ART[variant]}
    </div>
  )
}
