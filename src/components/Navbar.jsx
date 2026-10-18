import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export const BatLogo = ({ width = 80 }) => (
  <img
    src="/bat-logo.png"
    alt="Batman"
    width={width}
    height={Math.round(width * 0.6)}
    style={{ objectFit: 'contain', pointerEvents: 'none', mixBlendMode: 'screen' }}
  />
)

const navItems = ['About', 'Experience', 'Skills', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={scrolled ? {
        background: 'rgba(6,10,18,0.92)',
        backdropFilter: 'blur(14px)',
        borderBottom: '1px solid rgba(0,184,224,0.07)',
      } : {}}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 group"
        >
          <BatLogo width={72} />
          <div className="flex flex-col leading-none">
            <span
              className="font-heading font-bold text-sm tracking-[0.28em]"
              style={{ color: 'var(--accent)' }}
            >
              AVNEESH GAUTAM
            </span>
            <span className="term-label" style={{ fontSize: 9 }}>DEVOPS ENGINEER</span>
          </div>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="nav-link font-body text-xs tracking-[0.18em] uppercase transition-colors"
              style={{ color: 'var(--dim)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--dim)')}
            >
              {item}
            </button>
          ))}
          <button
            onClick={() => scrollTo('Contact')}
            className="px-5 py-2 font-heading font-semibold text-xs tracking-[0.18em] uppercase transition-all duration-300"
            style={{ border: '1px solid var(--accent-border)', color: 'var(--accent)' }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--accent)'
              e.currentTarget.style.color = '#060a12'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = 'var(--accent)'
            }}
          >
            Hire Me
          </button>
        </div>

        <button className="md:hidden p-1" style={{ color: 'var(--accent)' }} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
            style={{ background: 'var(--surface)', borderTop: '1px solid var(--cyan-border)' }}
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navItems.map(item => (
                <button key={item} onClick={() => scrollTo(item)}
                  className="text-left font-body text-xs tracking-[0.18em] uppercase"
                  style={{ color: 'var(--dim)' }}>
                  {item}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
