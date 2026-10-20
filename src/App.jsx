import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ThemeProvider, useTheme } from './ThemeContext'
import LoadingScreen, { LoadingScreenModern } from './components/LoadingScreen'
import Arcade from './components/Arcade'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'

function Site() {
  const { theme, booting, onBootComplete } = useTheme()
  const isBatman = theme === 'batman'

  const [showIntro, setShowIntro] = useState(() => {
    try { return !localStorage.getItem('ag_visited') } catch { return false }
  })

  const handleIntroDone = () => {
    try { localStorage.setItem('ag_visited', '1') } catch {}
    setShowIntro(false)
  }

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isBatman ? 'batman' : 'modern')
  }, [isBatman])

  return (
    <div style={{ backgroundColor: 'var(--bg)' }} className="min-h-screen">
      {/* Modern intro — first visit only */}
      {showIntro && <LoadingScreenModern onDone={handleIntroDone} />}
      {/* Batman boot screen — on entering Dark Knight Mode */}
      {booting && <LoadingScreen onDone={onBootComplete} />}

      <motion.div
        key={theme}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Batman-only ambient elements */}
        {isBatman && <div className="scan-line" />}
        {isBatman && <div className="bat-grid fixed inset-0 pointer-events-none z-0" />}

        <div className="relative z-10">
          <Navbar />
          <Hero />
          <About />
          <Experience />
          <Skills />
          {isBatman && <Arcade />}
          <Contact />
          <Footer />
        </div>
      </motion.div>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <Site />
    </ThemeProvider>
  )
}
