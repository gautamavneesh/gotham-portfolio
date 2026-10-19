import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ─── MODERN LOADING SCREEN (first visit only) ─── */
const LOG_STEPS = [
  'pulling engineer profile',
  'loading 5 years of experience',
  'warming up AWS environment',
  'silencing false positive alerts',
  'brewing coffee',
]
const STEP_DELAYS = [300, 600, 920, 1240, 1580]
const PROGRESS_TOTAL = 2100

export function LoadingScreenModern({ onDone }) {
  const [step, setStep]         = useState(0)
  const [progress, setProgress] = useState(0)
  const [showName, setShowName] = useState(false)
  const [exiting, setExiting]   = useState(false)
  const rafRef = useRef(null)

  useEffect(() => {
    const timers = STEP_DELAYS.map((d, i) => setTimeout(() => setStep(i + 1), d))
    return () => timers.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min(((now - start) / PROGRESS_TOTAL) * 100, 100)
      setProgress(p)
      if (p < 100) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setTimeout(() => setShowName(true), 150)
        setTimeout(() => { setExiting(true); setTimeout(onDone, 900) }, 2200)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: '#faf8f5' }}
      animate={exiting ? { opacity: 0, scale: 1.015 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: 'easeInOut' }}
    >
      <AnimatePresence mode="wait">
        {!showName ? (
          <motion.div key="log"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -14, transition: { duration: 0.25 } }}
            style={{ width: '100%', maxWidth: 360, padding: '0 2rem' }}>

            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: '#c2410c', opacity: 0.65, marginBottom: 32 }}>
              $ deploying portfolio...
            </p>

            <div style={{ marginBottom: 36 }}>
              {LOG_STEPS.map((s, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: i < step ? 1 : 0.15, x: 0 }}
                  transition={{ duration: 0.22 }}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    fontFamily: 'DM Sans, sans-serif', fontSize: 13.5, color: '#44403c',
                    marginBottom: 14 }}>
                  <span>{s}</span>
                  <AnimatePresence>
                    {i < step && (
                      <motion.span key="check"
                        initial={{ opacity: 0, scale: 0.3 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 22 }}
                        style={{ color: '#c2410c', marginLeft: 20, fontSize: 15 }}>
                        ✓
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            <div style={{ height: 1, background: 'rgba(194,65,12,0.1)', position: 'relative' }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, bottom: 0,
                width: `${progress}%`,
                background: '#c2410c',
                transition: 'width 0.04s linear',
              }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 10,
                letterSpacing: '0.14em', color: '#78716c', opacity: 0.45 }}>BUILD</span>
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 10,
                letterSpacing: '0.1em', color: '#c2410c' }}>
                {Math.round(progress)}%
              </span>
            </div>
          </motion.div>
        ) : (
          <motion.div key="name"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ textAlign: 'center', padding: '0 2rem' }}>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="gradient-name"
              style={{ fontFamily: "'DM Serif Display', Georgia, serif",
                fontWeight: 700, lineHeight: 1.05,
                fontSize: 'clamp(3rem, 10vw, 5.5rem)' }}>
              Avneesh<br />Gautam.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11,
                letterSpacing: '0.3em', color: '#78716c', marginTop: 18 }}>
              PORTFOLIO READY
            </motion.p>
            {/* Subtle underline that draws in after the name lands */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                height: 1, background: 'rgba(194,65,12,0.2)',
                width: 120, margin: '20px auto 0',
                transformOrigin: 'left',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const TOTAL = 3200


export default function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0)
  const [flash, setFlash]       = useState(false)
  const [exiting, setExiting]   = useState(false)
  const rafRef = useRef(null)

  useEffect(() => {
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min(((now - start) / TOTAL) * 100, 100)
      setProgress(p)
      if (p < 100) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setFlash(true)
        setTimeout(() => setFlash(false), 200)
        setTimeout(() => { setExiting(true); setTimeout(onDone, 650) }, 380)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [onDone])

  const g = progress / 100

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      style={{ background: '#02050d' }}
      animate={exiting ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 1, 1] }}
    >
      {/* Scan line */}
      <div className="scan-line" />

      {/* Deep radial atmosphere — grows with progress */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse ${Math.round(200 + g * 400)}px ${Math.round(100 + g * 200)}px at 50% 50%,
            rgba(192,204,216,${(0.04 + g * 0.22).toFixed(2)}) 0%,
            rgba(0,184,224,${(0.02 + g * 0.08).toFixed(2)}) 50%,
            transparent 75%)
        `,
        filter: `blur(${Math.round(30 + g * 30)}px)`,
      }} />

      {/* ── CENTER STACK ── */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* Bat logo — slams in with spring, glows harder as progress builds */}
        <motion.div
          initial={{ opacity: 0, scale: 1.5, y: -20 }}
          animate={{ opacity: 1, scale: 1,   y: 0   }}
          transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'relative' }}
        >
          {/* Scan beam that sweeps over the bat once */}
          <motion.div
            initial={{ top: '-40%' }}
            animate={{ top: '140%' }}
            transition={{ delay: 0.7, duration: 0.7, ease: 'easeInOut' }}
            style={{
              position: 'absolute', left: '-10%', right: '-10%', height: '35%',
              background: 'linear-gradient(to bottom, transparent 0%, rgba(0,184,224,0.18) 40%, rgba(0,184,224,0.12) 60%, transparent 100%)',
              filter: 'blur(6px)',
              pointerEvents: 'none',
              zIndex: 3,
            }}
          />

          <img
            src="/bat-logo.png"
            alt="Batman"
            width={300}
            style={{
              display: 'block',
              pointerEvents: 'none',
              filter: `
                drop-shadow(0 0 ${Math.round(16 + g * 48)}px rgba(192,204,216,${(0.25 + g * 0.75).toFixed(2)}))
                drop-shadow(0 0 ${Math.round(32 + g * 80)}px rgba(192,204,216,${(0.08 + g * 0.32).toFixed(2)}))
              `,
            }}
          />
        </motion.div>

        {/* CRT-flicker name reveal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0, 0.8, 0.3, 1] }}
          transition={{ delay: 0.6, duration: 0.5, times: [0, 0.15, 0.3, 0.55, 0.75, 1] }}
          style={{ marginTop: 28, textAlign: 'center' }}
        >
          <div className="font-heading font-bold tracking-[0.5em] text-lg" style={{ color: 'var(--accent)' }}>
            AVNEESH GAUTAM
          </div>
          <div className="term-label mt-1.5" style={{ opacity: 0.4, letterSpacing: '0.25em' }}>
            DEVOPS ENGINEER
          </div>
        </motion.div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.4, ease: 'easeOut' }}
          style={{ marginTop: 32, width: 260 }}
        >
          {/* Track */}
          <div style={{ height: '1px', background: 'rgba(192,204,216,0.07)', position: 'relative' }}>
            {/* Fill */}
            <div style={{
              position: 'absolute', top: 0, left: 0, height: '100%',
              width: `${progress}%`,
              background: `rgba(192,204,216,${(0.45 + g * 0.55).toFixed(2)})`,
              boxShadow: `0 0 ${Math.round(4 + g * 14)}px rgba(192,204,216,0.8)`,
              transition: 'width 0.04s linear',
            }} />
            {/* Leading edge glow dot */}
            <div style={{
              position: 'absolute', top: -3, height: 7, width: 7,
              borderRadius: '50%',
              left: `calc(${progress}% - 3px)`,
              background: '#c0ccd8',
              boxShadow: '0 0 10px rgba(192,204,216,1)',
              transition: 'left 0.04s linear',
            }} />
          </div>

          <div className="flex justify-between mt-2">
            <span className="term-label" style={{ opacity: 0.3 }}>SYSTEM BOOT</span>
            <span className="term-label" style={{ color: 'var(--cyan)', opacity: 0.7 }}>
              {progress < 100 ? `${Math.round(progress)}%` : 'ONLINE'}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Cinematic letterbox bars */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: 52, background: '#02050d',
          transformOrigin: 'top', zIndex: 5,
          borderBottom: '1px solid rgba(0,184,224,0.08)',
        }}
      />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: 52, background: '#02050d',
          transformOrigin: 'bottom', zIndex: 5,
          borderTop: '1px solid rgba(0,184,224,0.08)',
        }}
      />

      {/* Completion flash */}
      {flash && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 20,
          background: 'rgba(192,204,216,0.15)',
          pointerEvents: 'none',
        }} />
      )}
    </motion.div>
  )
}
