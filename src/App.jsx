import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div style={{ backgroundColor: '#060a12' }} className="min-h-screen">
      {/* Global scan line */}
      <div className="scan-line" />

      {/* Global grid background */}
      <div className="bat-grid fixed inset-0 pointer-events-none z-0" />

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Contact />
        <Footer />
      </div>
    </div>
  )
}
