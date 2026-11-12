import Shell from './Shell'
import usePage from './usePage'
import Archives from './Archives'
import Snapshots from './Snapshots'
import DearDiary from './DearDiary'
import LittleThings from './LittleThings'
import About from './About'
import './scrapbook-pages.css'

/* Home is yours: drop your own component in as `home`. */
const Home = () => <p style={{ padding: 40 }}>home goes here</p>

const pages = {
  home: Home,
  archives: Archives,
  snapshots: Snapshots,
  diary: DearDiary,
  'little-things': LittleThings,
  about: About,
}

export default function App() {
  const page = usePage()
  const Page = pages[page]
  return (
    <Shell page={page}>
      <Page key={page} />
    </Shell>
  )
}
