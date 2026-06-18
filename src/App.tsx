import { useLenis } from '@/hooks/useLenis'
import { Reflectors } from '@/components/Reflectors'
import { CursorLens } from '@/components/CursorLens'
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
      <CursorLens />
      <Reflectors />
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
