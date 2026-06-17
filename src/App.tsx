import { useLenis } from '@/hooks/useLenis'
import { Grain } from '@/components/Grain'
import { Nav } from '@/components/Nav'
import { Hero } from '@/sections/Hero'
import { About } from '@/sections/About'
import { Brand } from '@/sections/Brand'
import { Projects } from '@/sections/Projects'
import { Contact } from '@/sections/Contact'

function App() {
  useLenis()
  return (
    <>
      <Grain />
      <Nav />
      <main>
        <Hero />
        <About />
        <Brand />
        <Projects />
        <Contact />
      </main>
    </>
  )
}

export default App
