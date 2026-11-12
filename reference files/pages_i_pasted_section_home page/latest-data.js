/* Home: "Fresh off the glue stick" (latest pages). Newest first.
   Captions, places and dates are the ones from your page. The back-of-photo notes and moods are SAMPLE copy: write your real ones.
   Photos: add img: '/photos/x.jpg' to an item to replace its drawn art. cat is one of Places / Food / Everyday. */
export const LATEST = [
 {t:'the sky was showing off',w:'Golden hour, Calamba',d:'2026-09',cat:'Places',art:'sunset',mood:'show-off sky',note:'5:48pm. I stopped mid-walk and a tricycle honked at me. worth it.'},
 {t:'window seat, always',w:'Last jeep home',d:'2026-08',cat:'Places',art:'jeep',mood:'soft + sleepy',note:'the driver’s radio was on. I pretended not to know the words.'},
 {t:'mangoes beat deadlines',w:'Palengke morning',d:'2026-08',cat:'Food',art:'mango',mood:'zero regrets',note:'came for one kilo, left with three. deadlines can wait, mangoes can’t.'},
 {t:'no regrets (some regrets)',w:'Third coffee',d:'2026-07',cat:'Food',art:'cup',mood:'wired',note:'cup no. 3. yes, I’m counting. no, I’m not stopping.'},
 {t:'the quiet kind of Sunday',w:'Lake walk',d:'2026-07',cat:'Places',art:'lake',mood:'unbothered',note:'nothing happened. that was the whole point.'},
 {t:'one more bug, then sleep',w:'Desk, 1 a.m.',d:'2026-06',cat:'Everyday',art:'bug',mood:'delulu',note:'it was a missing semicolon. it’s always a semicolon. (it was not a semicolon.)'}
]
export const LATEST_ART = {
 sunset:'<rect width="200" height="150" fill="#f6d5cf"/><circle cx="100" cy="62" r="24" fill="#fbf1e4"/><path d="M0 104c30-16 56-14 86 0s62 14 114-4v50H0z" fill="#5b6fdc"/><path d="M0 124c34-10 64-8 94 2s70 8 106-6v30H0z" fill="#4a58b8"/>',
 jeep:'<rect width="200" height="150" fill="#d5e1ea"/><rect x="40" y="52" width="122" height="52" rx="14" fill="#f3d5d1"/><rect x="52" y="62" width="30" height="20" rx="4" fill="#fff"/><rect x="90" y="62" width="30" height="20" rx="4" fill="#fff"/><rect x="128" y="62" width="24" height="20" rx="4" fill="#fff"/><circle cx="68" cy="108" r="10" fill="#0a0a0a"/><circle cx="140" cy="108" r="10" fill="#0a0a0a"/><path d="M0 128h200" stroke="#fff" stroke-width="3" stroke-dasharray="14 10"/>',
 mango:'<rect width="200" height="150" fill="#f5e6b3"/><ellipse cx="68" cy="88" rx="26" ry="32" fill="#ffc857" transform="rotate(-14 68 88)"/><ellipse cx="118" cy="94" rx="24" ry="30" fill="#ff9f43" transform="rotate(10 118 94)"/><ellipse cx="92" cy="106" rx="22" ry="28" fill="#ffd77a" transform="rotate(-4 92 106)"/><path d="M76 54c10-14 24-14 30-8-8 2-14 8-18 16z" fill="#6b9f6a"/>',
 cup:'<rect width="200" height="150" fill="#d5dfcf"/><path d="M62 70h62v34a24 24 0 0 1-24 24H86a24 24 0 0 1-24-24z" fill="#8b5a3c"/><path d="M124 78h8a14 14 0 0 1 0 28h-8" fill="none" stroke="#8b5a3c" stroke-width="9"/><path d="M80 56c-5-8 5-10 0-18M98 56c-5-8 5-10 0-18" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".85"/>',
 lake:'<rect width="200" height="150" fill="#d5e1ec"/><circle cx="58" cy="44" r="20" fill="#fbf1e4"/><rect y="88" width="200" height="62" fill="#5b6fdc"/><path d="M30 106h56M100 118h60M40 132h44" stroke="#fff" stroke-width="4" stroke-linecap="round"/>',
 bug:'<rect width="200" height="150" fill="#f1d6d2"/><circle cx="156" cy="36" r="14" fill="#fbf1e4"/><rect x="48" y="58" width="104" height="62" rx="6" fill="#1d1d1d"/><path d="M34 126h132l-8 8H42z" fill="#3a3a3a"/><ellipse cx="100" cy="90" rx="9" ry="11" fill="#7ee0f0"/><path d="M88 82l-10-6M88 92h-12M88 102l-10 6M112 82l10-6M112 92h12M112 102l10 6" fill="none" stroke="#7ee0f0" stroke-width="3" stroke-linecap="round"/>'
}

const MON = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
export const monthYear = (d) => { const [y, m] = d.split('-'); const s = MON[+m - 1]; return `${s[0].toUpperCase()}${s.slice(1)} ${y}` }
export const rot = (i) => [-3, 2.5, -1.5, 3, -2.5, 1.5][i % 6]
