import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useTheme } from '../ThemeContext'

const BatIcon = ({ size = 18 }) => (
  <svg width={size} height={size * 0.5} viewBox="0 0 60 30" fill="currentColor">
    <path d="M30,6 L32,3 L34,4.5 L39,4.8 L45,5.5 L51,8 L55,11.5 L57,15
             L55,13.5 L53,14 L50.5,15.5 L48,14 L45.5,15.5 L42.5,14 L40,15.5
             L37.5,14.3 L35,15.7 L32.5,16.8 L30,17.7
             L27.5,16.8 L25,15.7 L22.5,14.3 L20,15.5 L17.5,14 L14.5,15.5
             L12,14 L9.5,15.5 L7,14 L5,13.5 L3,15
             L5,11.5 L9,8 L15,5.5 L21,4.8 L26,4.5 L28,3 Z" />
  </svg>
)

export const BatLogo = ({ width = 80 }) => (
  <img src="/bat-logo.png" alt="Batman" width={width}
    height={Math.round(width * 0.6)} style={{ objectFit: 'contain', pointerEvents: 'none' }} />
)

const navItems = ['About', 'Experience', 'Skills', 'Contact']

export default function Navbar() {
  const { theme, enterBatman, exitBatman } = useTheme()
  const isBatman = theme === 'batman'
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

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
        background: 'rgba(10,10,15,0.92)',
        backdropFilter: 'blur(14px)',
        borderBottom: '1px solid rgba(129,140,248,0.07)',
      } : {}}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 group">
          {isBatman
            ? <BatLogo width={68} />
            : (
              <div className="flex flex-col leading-none">
                <span className="font-heading font-bold text-sm tracking-[0.2em] gradient-name">
                  AVNEESH GAUTAM
                </span>
                <span className="font-body text-[9px] tracking-[0.22em] mt-0.5" style={{ color: 'var(--dim)' }}>
                  DEVOPS ENGINEER
                </span>
              </div>
            )
          }
          {isBatman && (
            <div className="flex flex-col leading-none">
              <span className="font-heading font-bold text-sm tracking-[0.28em]" style={{ color: 'var(--accent)' }}>
                AVNEESH GAUTAM
              </span>
              <span className="term-label" style={{ fontSize: 9 }}>DEVOPS ENGINEER</span>
            </div>
          )}
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button key={item} onClick={() => scrollTo(item)}
              className="nav-link font-body text-xs tracking-[0.18em] uppercase transition-colors"
              style={{ color: 'var(--dim)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--dim)')}>
              {item}
            </button>
          ))}

          <button onClick={() => scrollTo('Contact')}
            className="px-5 py-2 font-heading font-semibold text-xs tracking-[0.18em] uppercase transition-all duration-300"
            style={{ border: '1px solid var(--accent-border)', color: 'var(--accent)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = 'var(--bg)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--accent)' }}>
            Hire Me
          </button>

          {/* Dark Knight toggle */}
          {isBatman ? (
            <button onClick={exitBatman}
              className="font-body text-xs tracking-[0.08em] transition-all duration-300"
              style={{ color: 'var(--dim)', opacity: 0.5, fontStyle: 'italic' }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.color = '#c2410c' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '0.5'; e.currentTarget.style.color = 'var(--dim)' }}>
              Bruce Wayne
            </button>
          ) : (
            <button onClick={enterBatman}
              className="flex items-center gap-2 px-3 py-2 font-body text-xs tracking-[0.12em] uppercase transition-all duration-300"
              style={{ border: '1px solid rgba(129,140,248,0.15)', color: 'var(--dim)', borderRadius: 2 }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(129,140,248,0.45)'
                e.currentTarget.style.color = 'var(--accent)'
                e.currentTarget.style.boxShadow = '0 0 14px rgba(129,140,248,0.12)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(129,140,248,0.15)'
                e.currentTarget.style.color = 'var(--dim)'
                e.currentTarget.style.boxShadow = 'none'
              }}>
              <BatIcon size={16} />
              Dark Knight
            </button>
          )}
        </div>

        <button className="md:hidden p-1" style={{ color: 'var(--accent)' }}
          onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }} className="md:hidden overflow-hidden"
            style={{ background: 'var(--surface)', borderTop: '1px solid var(--cyan-border)' }}>
            <div className="px-6 py-4 flex flex-col gap-4">
              {navItems.map(item => (
                <button key={item} onClick={() => scrollTo(item)}
                  className="text-left font-body text-xs tracking-[0.18em] uppercase"
                  style={{ color: 'var(--dim)' }}>{item}</button>
              ))}
              {isBatman
                ? <button onClick={() => { exitBatman(); setMenuOpen(false) }}
                    className="text-left font-body text-xs tracking-[0.08em]"
                    style={{ color: 'var(--dim)', fontStyle: 'italic' }}>Bruce Wayne</button>
                : <button onClick={() => { enterBatman(); setMenuOpen(false) }}
                    className="flex items-center gap-2 font-body text-xs tracking-[0.12em] uppercase"
                    style={{ color: 'var(--accent)' }}><BatIcon size={14} /> Dark Knight Mode</button>
              }
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
