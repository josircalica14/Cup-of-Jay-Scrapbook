import { useEffect } from 'react'

/* One <title> and one description for the whole site is what a hash-routed SPA
   starts with, which makes every tab and every shared link say the same thing.
   The routes set their own here, in the same voice as the page headings. */
const META = {
  home: {
    title: 'Cup of Jay — a little book of my days',
    description: 'A scrapbook of small things: half-decent phone shots, diary pages, and the bits about me worth keeping.',
  },
  archives: {
    title: 'The archives — Cup of Jay',
    description: 'Every kept moment in order: photos, diary entries and memories, sorted by date and by year.',
  },
  snapshots: {
    title: 'Snapshots — Cup of Jay',
    description: 'Sixteen little frames from the phone roll, kept rather than deleted.',
  },
  'dear-diary': {
    title: 'Dear diary — Cup of Jay',
    description: 'The pages I actually wrote: rainy afternoons, 3am thoughts, and the ordinary weeks worth recording.',
  },
  about: {
    title: 'Things About Me — Cup of Jay',
    description: 'My corner of the scrapbook: favourite quotes, things I am learning, and a letter to the version of me reading this later.',
  },
}

function setMeta(name, content) {
  let tag = document.querySelector(`meta[name="${name}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('name', name)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

export default function usePageMeta(page) {
  useEffect(() => {
    const m = META[page] ?? META.home
    document.title = m.title
    setMeta('description', m.description)
  }, [page])
}
