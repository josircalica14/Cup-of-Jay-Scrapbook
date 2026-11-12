import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

/* One codebase, three places to run it:
     npm run dev    -> http://localhost:5173/                    (base "/")
     Vercel         -> https://<project>.vercel.app/             (base "/")
     GitHub Pages   -> https://<user>.github.io/<repo>/          (base "/<repo>/")

   A Pages project site is served from a subfolder, so its asset URLs need that prefix,
   while everywhere else the site sits at the root. The deploy workflow sets
   VITE_BASE_PATH; leave it unset for dev, `vite preview` and Vercel.

   Type it without a leading slash — Git Bash on Windows rewrites a leading "/" in an
   environment variable into a Windows path, so `VITE_BASE_PATH=Cup-of-Jay-Scrapbook npm
   run build && npm run preview` is the safe way to reproduce a Pages build locally
   (it then serves at http://localhost:4173/Cup-of-Jay-Scrapbook/). */
function resolveBase(raw) {
  const value = (raw || '').trim()
  if (!value || value === '/') return '/'
  if (/^https?:\/\//i.test(value)) return value.replace(/\/+$/, '/')
  return `/${value.replace(/^\/+|\/+$/g, '')}/`
}

const base = resolveBase(process.env.VITE_BASE_PATH)

export default defineConfig({
  base,
  plugins: [react()],
})
