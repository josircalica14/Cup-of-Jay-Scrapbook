import { rm } from 'node:fs/promises'
import { build } from 'vite'

/* GitHub Pages is set to publish this repository's docs/ folder from the main branch
   (Settings -> Pages -> Deploy from a branch -> main -> /docs). That folder also holds
   the design notes, so only the generated entries are cleared — never the whole folder.

   The site is built with the repository subpath as its base, which is where a Pages
   project site is served from. For Vercel or a local preview use `npm run build`, which
   keeps the default "/" base. */
const GENERATED = ['docs/index.html', 'docs/assets', 'docs/jay.jpg', 'docs/icons.svg', 'docs/favicon.svg']

for (const entry of GENERATED) {
  await rm(entry, { recursive: true, force: true })
}

process.env.VITE_BASE_PATH = 'Cup-of-Jay-Scrapbook'

/* outDir is passed here rather than in vite.config.js so plain `npm run build` keeps
   writing dist/ for Vercel and local previews. */
await build({ build: { outDir: 'docs', emptyOutDir: false } })
console.log('\nbuilt the Pages site into docs/ — commit it to publish\n')
