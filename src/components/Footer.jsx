import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="py-8 px-6" style={{ borderTop: '1px solid var(--cyan-border)' }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="flex items-center gap-3">
          <img src="/bat-logo.png" alt="Batman" width={62} style={{ objectFit: 'contain', pointerEvents: 'none', mixBlendMode: 'screen', opacity: 0.55 }} />
          <span className="font-heading text-xs tracking-[0.25em]" style={{ color: 'var(--dim)' }}>AVNEESH GAUTAM</span>
        </motion.div>

        <p className="font-body text-xs text-center" style={{ color: 'var(--dim)', opacity: 0.6 }}>
          © {new Date().getFullYear()} · React + Framer Motion · Deployed on Vercel
        </p>

        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="term-label">OPEN TO OPPORTUNITIES</span>
        </div>
      </div>
    </footer>
  )
}
