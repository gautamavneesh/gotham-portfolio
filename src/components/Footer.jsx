import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'
import { useTheme } from '../ThemeContext'

const links = [
  { icon: <Github size={15} />, href: 'https://github.com/gautamavneesh', label: 'GitHub' },
  { icon: <Linkedin size={15} />, href: 'https://linkedin.com/in/avneesh-gautam63', label: 'LinkedIn' },
  { icon: <Mail size={15} />, href: 'mailto:avneesh.gautam63@gmail.com', label: 'Email' },
]

export default function Footer() {
  const { theme } = useTheme()
  const isBatman = theme === 'batman'

  return (
    <footer className="py-8 px-6" style={{ borderTop: '1px solid var(--accent-border)' }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="flex items-center gap-3">
          {isBatman
            ? <img src="/bat-logo.png" alt="Batman" width={62}
                style={{ objectFit: 'contain', pointerEvents: 'none', opacity: 0.55 }} />
            : <span className="font-heading font-bold text-sm tracking-[0.25em] gradient-name">AG</span>
          }
          <span className="font-heading text-xs tracking-[0.25em]" style={{ color: 'var(--dim)' }}>AVNEESH GAUTAM</span>
        </motion.div>

        <div className="flex items-center gap-5">
          {links.map(({ icon, href, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              className="transition-colors"
              style={{ color: 'var(--dim)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--dim)')}>
              {icon}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="font-body text-xs tracking-[0.12em] uppercase" style={{ color: 'var(--dim)' }}>
            Open to Opportunities
          </span>
        </div>
      </div>
    </footer>
  )
}
