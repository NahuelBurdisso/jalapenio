import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { cn } from '@/lib/cn'

const LINKS = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#sobre-mi', label: 'Sobre mí' },
  { href: '#marca', label: 'Marca' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#contacto', label: 'Contacto' },
]

export function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center">
      <nav className="border-paper/12 bg-ink/55 mx-auto mt-5 flex w-[min(92%,64rem)] items-center justify-between rounded-full border px-3 py-2 backdrop-blur-xl">
        <a
          href="#inicio"
          className="font-display text-paper flex items-center gap-2 pl-2 text-lg tracking-tight uppercase"
        >
          <span style={{ fontFamily: 'Michroma, sans-serif', fontWeight: 600 }}>
            Jalapeño
          </span>
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {LINKS.slice(1).map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-paper/70 hover:text-paper text-xs font-bold tracking-[0.18em] uppercase transition-colors duration-300"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contacto"
          className="bg-chili text-paper hover:bg-ember hidden rounded-full px-5 py-2 text-xs font-bold tracking-wide uppercase transition-colors duration-500 md:inline-block"
        >
          Hablemos
        </a>

        {/* Hamburger → X morph */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          className="relative flex h-11 w-11 items-center justify-center md:hidden"
        >
          <span
            className={cn(
              'bg-paper absolute h-0.5 w-5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
              open ? 'rotate-45' : '-translate-y-1.5',
            )}
          />
          <span
            className={cn(
              'bg-paper absolute h-0.5 w-5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
              open ? '-rotate-45' : 'translate-y-1.5',
            )}
          />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-char/90 fixed inset-0 -z-10 flex flex-col justify-center gap-2 px-8 backdrop-blur-2xl md:hidden"
          >
            {LINKS.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="display text-paper hover:text-ember text-6xl transition-colors"
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
