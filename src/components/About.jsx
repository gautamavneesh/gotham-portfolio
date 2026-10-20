import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Cloud, Zap, Shield, Terminal } from 'lucide-react'
import { useTheme } from '../ThemeContext'

function useCountUp(target, duration = 1100, inView = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.round(eased * target))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target, duration])
  return count
}

function AnimatedStat({ value, label, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const numeric = parseInt(value, 10)
  const suffix = value.replace(String(numeric), '')
  const count = useCountUp(numeric, 1000, inView)
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ delay }}>
      <div className="font-heading font-bold text-3xl mb-1 gradient-name">
        {inView ? `${count}${suffix}` : `0${suffix}`}
      </div>
      <div className="font-body text-xs tracking-wide" style={{ color: 'var(--dim)' }}>{label}</div>
    </motion.div>
  )
}

function AnimatedStatBatman({ value, label, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const numeric = parseInt(value, 10)
  const suffix = value.replace(String(numeric), '')
  const count = useCountUp(numeric, 1000, inView)
  return (
    <div ref={ref} style={{ borderLeft: '2px solid var(--accent)', paddingLeft: 16 }}>
      <div className="font-heading font-bold text-3xl" style={{ color: 'var(--accent)' }}>
        {inView ? `${count}${suffix}` : `0${suffix}`}
      </div>
      <div className="term-label mt-1">{label.toUpperCase()}</div>
    </div>
  )
}

const stats = [
  { value: '5+',  label: 'Years Experience' },
  { value: '30%', label: 'MTTR Reduction' },
  { value: '3',   label: 'Enterprise Clients' },
  { value: '3+',  label: 'Yrs Observability' },
]

const pillars = [
  { icon: <Cloud size={16} />,    title: 'Cloud Architecture',      desc: 'AWS-native solutions — EC2, Lambda, S3, IAM, CloudWatch, SNS at enterprise scale.' },
  { icon: <Zap size={16} />,      title: 'Observability',           desc: 'Full-stack monitoring with OpenSearch, Prometheus, Grafana, Thanos, and New Relic.' },
  { icon: <Shield size={16} />,   title: 'Reliability Engineering', desc: 'SLO/SLI/SLA frameworks, error budget analysis, incident management, alert tuning.' },
  { icon: <Terminal size={16} />, title: 'Automation',              desc: 'IaC with Terraform, CI/CD with Jenkins, Lambda-driven workflows, Python/Bash scripting.' },
]

/* ── MODERN ── */
function AboutModern() {
  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="section-tag">
          <span className="font-heading font-semibold text-xs tracking-[0.3em] uppercase"
            style={{ color: 'var(--accent)' }}>About</span>
        </motion.div>

        {/* Intro quote */}
        <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.05 }}
          className="font-heading font-semibold text-2xl md:text-3xl text-white leading-snug mb-16 max-w-3xl">
          I build cloud infrastructure that's{' '}
          <span style={{ color: 'var(--accent)' }}>observable, reliable,</span>{' '}
          and ready for scale.
        </motion.p>

        <div className="grid md:grid-cols-[1fr,320px] gap-16 items-start">

          {/* Bio */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="font-body text-base leading-relaxed mb-5" style={{ color: 'var(--text)', lineHeight: 1.9 }}>
              DevOps Engineer with 5+ years of IT experience — 3+ in cloud, observability, and DevOps — designing monitoring systems that make complex infrastructure readable and resilient. I specialize in turning operational noise into actionable signal: a runaway alert, a degrading SLO, or a midnight incident that shouldn't have happened.
            </p>
            <p className="font-body text-base leading-relaxed mb-10" style={{ color: 'var(--dim)', lineHeight: 1.9 }}>
              Currently embedded with Dow Jones at Infosys, I own the observability backbone for critical news
              infrastructure — from real-time anomaly detection and synthetic monitoring for SSL certificates and
              service-level targets, to building AI-powered tooling that lets engineers manage alerts, dashboards,
              and synthetics directly from a Claude chat prompt.
            </p>

            {/* Competencies list */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
              {['Cloud Architecture (AWS)', 'Distributed Observability', 'SRE & Reliability Engineering',
                'CI/CD & Infrastructure as Code', 'Incident Management', 'Log Aggregation & Analysis',
                'AI-assisted DevOps Tooling'].map(c => (
                <div key={c} className="flex items-center gap-2 font-body text-sm" style={{ color: 'var(--text)' }}>
                  <span style={{ color: 'var(--accent)', fontSize: 18, lineHeight: 1 }}>›</span> {c}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Stats card */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-2 gap-px"
            style={{ border: '1px solid var(--accent-border)', background: 'var(--accent-border)' }}>
            {stats.map(({ value, label }, i) => (
              <div key={label} className="p-6" style={{ background: 'var(--card)' }}>
                <AnimatedStat value={value} label={label} delay={i * 0.1} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ── BATMAN ── */
function AboutBatman() {
  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="section-tag">
          <span className="font-heading font-semibold text-xs tracking-[0.3em] uppercase"
            style={{ color: 'var(--accent)' }}>About</span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-white leading-tight mb-6">
              Defending systems.<br />
              <span style={{ color: 'var(--accent)' }}>Enabling reliability.</span>
            </h2>
            <p className="font-body leading-relaxed mb-5" style={{ color: 'var(--dim)', lineHeight: 1.8 }}>
              DevOps Engineer with 5+ years of IT experience — 3+ in cloud, observability, and DevOps — specializing in AWS-based monitoring and automation. I design systems that make complex infrastructure readable, reliable, and resilient: turning noise into signal.
            </p>
            <p className="font-body leading-relaxed" style={{ color: 'var(--dim)', lineHeight: 1.8 }}>
              Currently embedded with Dow Jones at Infosys, I build the observability backbone that keeps
              critical news infrastructure operational — from real-time anomaly detection to synthetic
              monitoring for SSL certificates and service-level targets.
            </p>
            <div className="grid grid-cols-2 gap-6 mt-10">
              {stats.map(({ value, label }, i) => (
                <AnimatedStatBatman key={label} value={value} label={label} delay={i * 0.1} />
              ))}
            </div>
          </motion.div>

          <div className="space-y-3">
            {pillars.map(({ icon, title, desc }, i) => (
              <motion.div key={title} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card-hover flex items-start gap-4 p-5 relative"
                style={{ background: 'var(--card)', border: '1px solid var(--accent-border)' }}>
                <div className="hud-corner tl" /><div className="hud-corner br" />
                <div style={{ color: 'var(--accent)', marginTop: 2, flexShrink: 0 }}>{icon}</div>
                <div>
                  <div className="font-heading font-semibold text-white mb-1">{title}</div>
                  <div className="font-body text-sm" style={{ color: 'var(--dim)', lineHeight: 1.7 }}>{desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function About() {
  const { theme } = useTheme()
  return theme === 'batman' ? <AboutBatman /> : <AboutModern />
}
