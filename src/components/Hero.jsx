import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Linkedin, Mail } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTheme } from '../ThemeContext'

const roles = ['DevOps Engineer', 'Observability Specialist', 'Cloud Engineer', 'SRE Practitioner']

function useTypewriter() {
  const [roleIdx, setRoleIdx] = useState(0)
  const [display, setDisplay] = useState('')
  const [typing, setTyping]   = useState(true)
  useEffect(() => {
    const role = roles[roleIdx]
    let i = typing ? 0 : role.length
    const timer = setInterval(() => {
      if (typing) {
        if (i <= role.length) setDisplay(role.slice(0, i++))
        else { clearInterval(timer); setTimeout(() => setTyping(false), 2400) }
      } else {
        if (i >= 0) setDisplay(role.slice(0, i--))
        else { clearInterval(timer); setRoleIdx(p => (p + 1) % roles.length); setTyping(true) }
      }
    }, typing ? 72 : 32)
    return () => clearInterval(timer)
  }, [roleIdx, typing])
  return display
}

/* ───── MODERN HERO ───── */
const techStack = ['AWS', 'OpenSearch', 'Grafana', 'Kubernetes', 'Terraform', 'Prometheus', 'Python', 'New Relic']

function HeroModern() {
  const display = useTypewriter()
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Subtle gradient backdrop */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 50% at 30% 50%, rgba(129,140,248,0.06) 0%, transparent 65%)',
      }} />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,380px] gap-16 items-center">

          {/* ── Left ── */}
          <div>
            {/* Available badge */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }} className="flex items-center gap-2 mb-8 w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-body text-xs tracking-[0.18em] uppercase"
                style={{ color: '#34d399' }}>Available for opportunities</span>
            </motion.div>

            {/* Name */}
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="font-heading font-bold leading-none mb-6"
              style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}>
              <span className="gradient-name">Avneesh<br />Gautam.</span>
            </motion.h1>

            {/* Role typewriter */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="flex items-center gap-1 font-body text-xl mb-6 h-8"
              style={{ color: 'var(--accent)' }}>
              <span>{display}</span>
              <span className="w-px h-5 blink" style={{ background: 'var(--accent)' }} />
            </motion.div>

            {/* Bio */}
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="font-body text-base leading-relaxed mb-10 max-w-lg"
              style={{ color: 'var(--text)' }}>
              Building reliable, observable cloud infrastructure at enterprise scale.
              5+ years in IT, 3+ in DevOps and observability — delivering solutions
              with AWS, OpenSearch, and Kubernetes at Infosys, currently with Dow Jones.
            </motion.p>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-7 py-3 font-heading font-bold text-sm tracking-[0.15em] uppercase transition-all duration-300"
                style={{ background: 'var(--accent)', color: 'var(--bg)' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                Get in touch →
              </button>
              <button
                onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-7 py-3 font-heading font-semibold text-sm tracking-[0.15em] uppercase transition-all duration-300"
                style={{ border: '1px solid var(--accent-border)', color: 'var(--accent)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = 'var(--accent-glow)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--accent-border)'; e.currentTarget.style.background = 'transparent' }}>
                View Work
              </button>
            </motion.div>

            {/* Socials */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.75 }}
              className="flex items-center gap-6">
              {[
                { icon: <Linkedin size={15} />, label: 'LinkedIn', href: 'https://linkedin.com/in/avneesh-gautam63' },
                { icon: <Mail size={15} />, label: 'Email', href: 'mailto:avneesh.gautam63@gmail.com' },
              ].map(({ icon, label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 font-body text-sm transition-colors"
                  style={{ color: 'var(--dim)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--dim)')}>
                  {icon}<span>{label}</span>
                </a>
              ))}
            </motion.div>
          </div>

          {/* ── Right card ── */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="hidden lg:block p-8"
            style={{ background: 'var(--card)', border: '1px solid var(--accent-border)' }}>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-5 mb-7">
              {[
                { val: '5+',     lbl: 'Years Experience' },
                { val: 'AWS',    lbl: 'Certified' },
                { val: 'Delhi',  lbl: 'India' },
                { val: 'Infosys',lbl: 'Current Employer' },
              ].map(({ val, lbl }) => (
                <div key={lbl} className="p-3" style={{ borderLeft: '2px solid var(--accent-border)' }}>
                  <div className="font-heading font-bold text-base text-white">{val}</div>
                  <div className="font-body text-xs mt-0.5" style={{ color: 'var(--dim)' }}>{lbl}</div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div style={{ height: '1px', background: 'var(--accent-border)', marginBottom: 24 }} />

            {/* Tech stack */}
            <div className="font-body text-xs tracking-[0.15em] uppercase mb-4"
              style={{ color: 'var(--dim)' }}>Tech Stack</div>
            <div className="flex flex-wrap gap-2">
              {techStack.map(t => (
                <span key={t} className="px-2.5 py-1 font-body text-xs"
                  style={{ background: 'var(--surface)', border: '1px solid var(--accent-border)', color: 'var(--text)' }}>
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        style={{ color: 'var(--dim)' }}>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ───── BATMAN HERO ───── */
const HudRings = () => (
  <svg className="absolute pointer-events-none"
    style={{ width: 480, height: 480, top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
    viewBox="0 0 480 480" fill="none">
    <circle cx="240" cy="240" r="220" stroke="#00b8e0" strokeWidth="0.5"
      strokeDasharray="10 22" strokeOpacity="0.2" className="spin-cw" />
    <circle cx="240" cy="240" r="168" stroke="#c0ccd8" strokeWidth="0.5"
      strokeDasharray="18 8" strokeOpacity="0.15" className="spin-ccw" />
    <circle cx="240" cy="240" r="118" stroke="#00b8e0" strokeWidth="0.4" strokeOpacity="0.12" />
    <line x1="0" y1="240" x2="480" y2="240" stroke="#00b8e0" strokeWidth="0.3" strokeOpacity="0.08" />
    <line x1="240" y1="0" x2="240" y2="480" stroke="#00b8e0" strokeWidth="0.3" strokeOpacity="0.08" />
    <path d="M312,180 L334,180 L334,202" stroke="#00b8e0" strokeWidth="1.2" strokeOpacity="0.4" />
    <path d="M168,180 L146,180 L146,202" stroke="#00b8e0" strokeWidth="1.2" strokeOpacity="0.4" />
    <path d="M312,300 L334,300 L334,278" stroke="#00b8e0" strokeWidth="1.2" strokeOpacity="0.4" />
    <path d="M168,300 L146,300 L146,278" stroke="#00b8e0" strokeWidth="1.2" strokeOpacity="0.4" />
    {[0,45,90,135,180,225,270,315].map(deg => {
      const r = (deg * Math.PI) / 180
      return <line key={deg}
        x1={240 + 210 * Math.cos(r)} y1={240 + 210 * Math.sin(r)}
        x2={240 + 224 * Math.cos(r)} y2={240 + 224 * Math.sin(r)}
        stroke="#c0ccd8" strokeWidth="1.5" strokeOpacity="0.3" />
    })}
  </svg>
)

const statusRows = [
  { key: 'GOTHAM',     val: 'SECURE',   ok: true  },
  { key: 'THREAT LVL', val: 'MINIMAL',  ok: true  },
  { key: 'ALERTS',     val: '0 ACTIVE', ok: true  },
  { key: 'UPTIME',     val: '99.97%',   ok: false },
]
const LeftPanel = () => {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % statusRows.length), 2200)
    return () => clearInterval(t)
  }, [])
  return (
    <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.7 }} className="hud-panel hidden lg:block" style={{ minWidth: 200 }}>
      <div className="term-label mb-3">// GOTHAM STATUS</div>
      <div style={{ height: 1, background: 'var(--cyan-border)', marginBottom: 12 }} />
      {statusRows.map((row, i) => (
        <div key={row.key} className="flex justify-between items-center mb-3 font-body text-xs transition-all duration-300"
          style={{ color: i === active ? '#fff' : 'var(--dim)', transform: i === active ? 'translateX(4px)' : 'none' }}>
          <span className="tracking-wider">{row.key}</span>
          <span style={{ color: row.ok ? '#4ade80' : 'var(--accent)' }}>{row.val}</span>
        </div>
      ))}
      <div style={{ height: 1, background: 'var(--cyan-border)', margin: '12px 0' }} />
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        <span className="term-label">ALL SYSTEMS GO</span>
      </div>
    </motion.div>
  )
}

const profileRows = [
  { key: 'LOCATION',  val: 'DELHI, IN' },
  { key: 'SPECIALTY', val: 'DEVOPS'    },
  { key: 'CLOUD',     val: 'AWS'       },
  { key: 'EXP',       val: '5+ YRS'   },
  { key: 'CLEARANCE', val: 'LEVEL 5'  },
]
const RightPanel = () => (
  <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 1.2, duration: 0.7 }} className="hud-panel hidden lg:block" style={{ minWidth: 200 }}>
    <div className="term-label mb-3">// AGENT PROFILE</div>
    <div style={{ height: 1, background: 'var(--cyan-border)', marginBottom: 12 }} />
    {profileRows.map((row, i) => (
      <motion.div key={row.key} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4 + i * 0.1 }}
        className="flex justify-between items-center mb-3 font-body text-xs" style={{ color: 'var(--dim)' }}>
        <span className="tracking-wider">{row.key}</span>
        <span style={{ color: 'var(--cyan)', fontFamily: 'Courier New, monospace' }}>{row.val}</span>
      </motion.div>
    ))}
    <div style={{ height: 1, background: 'var(--cyan-border)', margin: '12px 0' }} />
    <div className="term-label">AWS CERTIFIED 2025</div>
  </motion.div>
)

const scanMsgs = ['SCANNING GOTHAM...', 'THREAT LEVEL: MINIMAL', 'SYSTEMS NOMINAL', 'STANDING BY...']

const CityLine = () => (
  <svg className="absolute bottom-0 left-0 w-full pointer-events-none"
    viewBox="0 0 1440 220" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
    <path d="M0,220 L0,135 L40,135 L40,95 L62,95 L62,75 L82,75 L82,55 L102,55 L102,75 L122,75 L122,105
      L152,105 L152,118 L172,118 L172,80 L182,80 L182,60 L192,60 L192,40 L202,40 L202,60 L212,60 L212,80
      L222,80 L222,118 L255,118 L255,95 L275,95 L275,65 L285,65 L285,45 L290,32 L295,45 L295,65 L315,65 L315,95
      L335,95 L335,75 L355,75 L355,55 L375,55 L375,75 L395,75 L395,105 L435,105 L435,118
      L462,118 L462,92 L472,92 L472,72 L482,72 L482,52 L492,52 L492,72 L502,72 L502,92 L532,92 L532,108
      L572,108 L572,78 L592,78 L592,58 L602,58 L602,42 L607,28 L612,42 L612,58 L622,58 L622,78 L652,78 L652,108
      L692,108 L692,90 L712,90 L712,68 L732,68 L732,48 L752,48 L752,68 L772,68 L772,90 L812,90 L812,108
      L852,108 L852,82 L870,82 L870,62 L880,62 L880,45 L890,32 L900,45 L900,62 L910,62 L910,82 L932,82 L932,108
      L972,108 L972,88 L992,88 L992,65 L1007,65 L1007,48 L1017,35 L1027,22 L1037,35 L1037,48 L1047,48 L1047,65
      L1067,65 L1067,88 L1107,88 L1107,108 L1147,108 L1147,82 L1167,82 L1167,62 L1187,62 L1187,48 L1207,48
      L1207,62 L1227,62 L1227,82 L1267,82 L1267,108 L1307,108 L1307,88 L1327,88 L1327,65 L1347,65 L1347,88
      L1367,88 L1367,115 L1440,115 L1440,220 Z" fill="#0b1520" />
    {[88,97,185,195,280,290,470,480,595,607,875,885,1020,1030,1190,1200].map((x, i) => (
      <rect key={i} x={x} y={i%2===0 ? 44 : 54} width="3" height="3"
        fill={i%3===0 ? 'var(--accent)' : 'var(--cyan)'} opacity="0.2" />
    ))}
  </svg>
)

function HeroBatman() {
  const display = useTypewriter()
  const [scanIdx, setScanIdx] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setScanIdx(p => (p + 1) % scanMsgs.length), 3000)
    return () => clearInterval(t)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex flex-col overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 50% 50% at 50% 48%, rgba(12,18,28,0.6) 0%, transparent 70%)'
      }} />

      {/* Terminal header */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
        className="relative z-20 mt-16 mx-4 md:mx-10 flex items-center justify-between px-4 py-2"
        style={{ border: '1px solid var(--cyan-border)', background: 'rgba(11,21,32,0.55)' }}>
        <div className="term-label flex items-center gap-3">
          <span style={{ color: 'var(--accent)', opacity: 0.9 }}>WAYNE ENTERPRISES</span>
          <span style={{ opacity: 0.25 }}>|</span>
          <span>SECURE TERMINAL v4.7</span>
        </div>
        <div className="flex items-center gap-4">
          <AnimatePresence mode="wait">
            <motion.span key={scanIdx}
              initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3 }}
              className="term-label hidden sm:block" style={{ color: 'var(--cyan)', opacity: 0.65 }}>
              {scanMsgs[scanIdx]}
            </motion.span>
          </AnimatePresence>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="term-label" style={{ color: '#4ade80' }}>ONLINE</span>
          </div>
        </div>
      </motion.div>

      {/* 3-col layout */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[210px,1fr,210px] gap-8 items-center py-8">
          <LeftPanel />

          <div className="flex flex-col items-center text-center">
            <div className="relative flex items-center justify-center mb-6" style={{ width: 320, height: 280 }}>
              <HudRings />
              <motion.div className="absolute"
                style={{ width: 200, height: 80,
                  background: 'radial-gradient(ellipse, rgba(192,204,216,0.18) 0%, transparent 70%)',
                  filter: 'blur(12px)' }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }} />
              <motion.img src="/bat-logo.png" alt="Batman" width={260}
                className="relative z-10"
                style={{ objectFit: 'contain', pointerEvents: 'none',
                  filter: 'drop-shadow(0 0 16px rgba(192,204,216,0.5)) drop-shadow(0 0 40px rgba(192,204,216,0.2))' }}
                animate={{ opacity: [0.85, 1, 0.85] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />
            </div>

            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="font-heading font-bold text-4xl md:text-6xl tracking-widest text-white mb-2"
              style={{ textShadow: '0 0 50px rgba(192,204,216,0.2)' }}>
              AVNEESH GAUTAM
            </motion.h1>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
              className="font-body text-base md:text-lg mb-1 flex items-center gap-1 h-7"
              style={{ color: 'var(--text)' }}>
              <span>{display}</span>
              <span className="w-px h-5 blink" style={{ background: 'var(--accent)' }} />
            </motion.div>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
              className="term-label mb-8" style={{ opacity: 0.45 }}>
              DELHI, INDIA &nbsp;·&nbsp; 5+ YEARS &nbsp;·&nbsp; AWS · OPENSEARCH · GRAFANA
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex flex-wrap items-center justify-center gap-4 mb-8">
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-7 py-3 font-heading font-bold text-xs tracking-[0.22em] uppercase transition-all duration-300"
                style={{ background: 'var(--accent)', color: '#060a12' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#d8e4f0'; e.currentTarget.style.boxShadow = '0 0 24px rgba(192,204,216,0.3)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.boxShadow = 'none' }}>
                Signal the Bat
              </button>
              <button
                onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-7 py-3 font-heading font-semibold text-xs tracking-[0.22em] uppercase transition-all duration-300"
                style={{ border: '1px solid var(--accent-border)', color: 'var(--accent)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = 'rgba(192,204,216,0.05)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--accent-border)'; e.currentTarget.style.background = 'transparent' }}>
                View Work
              </button>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
              className="flex items-center gap-5">
              {[
                { icon: <Linkedin size={14} />, label: 'LinkedIn', href: 'https://linkedin.com/in/avneesh-gautam63' },
                { icon: <Mail size={14} />, label: 'Email', href: 'mailto:avneesh.gautam63@gmail.com' },
              ].map(({ icon, label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 font-body text-xs transition-colors"
                  style={{ color: 'var(--dim)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--dim)')}>
                  {icon}<span>{label}</span>
                </a>
              ))}
            </motion.div>
          </div>

          <RightPanel />
        </div>
      </div>

      <CityLine />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        className="absolute bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10"
        style={{ color: 'var(--dim)' }}>
        <span className="term-label" style={{ fontSize: 9 }}>SCROLL</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
          <ChevronDown size={13} />
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ───── EXPORT ───── */
export default function Hero() {
  const { theme } = useTheme()
  return theme === 'batman' ? <HeroBatman /> : <HeroModern />
}
