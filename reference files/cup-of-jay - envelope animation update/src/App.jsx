import Navbar         from './components/layout/Navbar'
import Hero           from './components/home/Hero'
import About          from './components/home/About'
import Moments        from './components/home/Moments'
import Diary          from './components/home/Diary'
import LittleThings   from './components/home/LittleThings'
import Guestbook      from './components/home/Guestbook'

import Shell          from './components/pages/Shell'
import usePage        from './components/pages/usePage'
import Archives       from './components/pages/Archives'
import Snapshots      from './components/pages/Snapshots'
import DearDiary      from './components/pages/DearDiary'
import AboutPage      from './components/pages/AboutPage'

/* Home is the main scrapbook page: the full scroll, unchanged.
   Each section paints its own background art (see components/home/SectionArt.jsx),
   bleeding past the column so wide screens don't open onto empty gutters. */
function Home() {
  return (
    <>
      <main>
        <Hero />
        <About />
        <Moments />
        <Diary />
        <LittleThings />
      </main>
      <Guestbook />
    </>
  )
}

const routes = {
  home: Home,
  archives: Archives,
  snapshots: Snapshots,
  'dear-diary': DearDiary,
  about: AboutPage,
}

export default function App() {
  const page = usePage()
  const Page = routes[page] ?? Home

  return (
    <>
      <Navbar page={page} />
      {page === 'home' ? <Home /> : <Shell page={page}><Page /></Shell>}
    </>
  )
}