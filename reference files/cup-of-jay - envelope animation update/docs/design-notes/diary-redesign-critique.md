# Dear diary — redesign, look-and-fix rounds

Before: `.taste-skill/before-diary/` (9 FAIL, 8 WARN)
After: `.taste-skill/final-diary/` (5 FAIL, 7 WARN)

## ROUND 1 (v1: first build of the book)

Seen in one second: "a blue hardcover diary, sitting open on the desk."
Idea (one sentence): the dairy is a physical notebook — its cover, its ruled
pages, its taped-in prints — so reading it means turning pages.
Live thing: turn the book's pages with buttons, the on-screen book, or ← →.
Layout words by section: header (kicker, one-line serif title, squiggle, hand
sub) / book spread (inside cover + first entry) / turn controls / footer strip.
Scores: design 6 · usability 6 · creativity 7 · content 7 → overall 6.0
Caps applied: any remaining FAIL caps at 6.0; a shadow on a resting element and
shouted buttons also cap at 6.5.
Problems:
1. The entry text ran under the taped photo on the right page at 768px and
   1024px — the page had a fixed height while the type did not shrink.
   (tablet-fold) Fix: page height scales with page width, type scales with the
   page, photo narrowed to 58%, extra clearance above the print.
2. On phones and tablets the turn controls sat under a 500–660px-tall book and
   were off the first screen; nothing visible said the book could be turned.
   (mobile-fold) Fix: controls ride above the book below 900px, label on its own
   line.
3. The prints were pushed against the centre gutter on both pages, leaving the
   outer corners of the spread empty. (desktop-page-01) Fix: each print sits at
   its page's outer edge.

## ROUND 2 (final: responsive book)

Seen in one second: "an open diary with two written pages and photos taped in."
Idea (one sentence): the diary is a physical notebook — cover, ruled pages,
taped-in prints — and reading it means turning the pages.
Live thing: page turns (buttons / arrow keys), the cover opening itself on arrival.
Layout words by section: header / book spread (two entries, or one page on
phones) / turn controls / footer strip.
Scores: design 6.5 · usability 7 · creativity 7 · content 7 → overall 6.0
Caps applied: inspect.mjs still reports the site's own patterns (kicker labels,
sticker shadows, shadowed buttons) and the footer marquee's edge text, so the
6.0 cap holds; there are 4 real photographs and the idea is specific to this
diary, so no lower cap applies.

Top three problems still visible (most visible first):
1. On a 1440×900 laptop the book is 624px tall under a 300px header, so the
   turn controls are just below the first screen; the opening animation is the
   only cue that the book turns. (.taste-skill/final-diary/desktop-fold.jpg)
   Fix: a page-edge "turn" tab inside the first screen, or let the stage scale
   with viewport height.
2. The single-page (phone/tablet) pages are tall enough that short entries
   leave a large ruled gap between the last line and the print.
   (mobile-fold.jpg) Fix: size the book to the tallest page's content, not to a
   fixed ratio.
3. The inside back cover is a flat blue field with one small stamp, so the last
   spread is two-thirds empty once the end page is reached. Fix: a paper pocket
   or a taped keepsake on the back board.

A stranger reading the first screen sees the section title, the book, and (from
900px down) the "turn the page" control. Every section has a heading; margins
match; no empty stretch is taller than the book itself. Failed checks that
remain are the site's existing house style plus the deliberate object shadows,
listed in the final report.
