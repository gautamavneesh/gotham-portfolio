import { motion } from 'framer-motion'
import { Cloud, Zap, Shield, Terminal } from 'lucide-react'

const stats = [
  { value: '4+', label: 'YEARS IN IT' },
  { value: '2+', label: 'YRS OBSERVABILITY' },
  { value: '3',  label: 'MAJOR CLIENTS' },
  { value: '30%', label: 'MTTR REDUCTION' },
]

const pillars = [
  { icon: <Cloud size={16} />, title: 'Cloud Architecture', desc: 'AWS-native solutions — EC2, Lambda, S3, IAM, CloudWatch, SNS at enterprise scale.' },
  { icon: <Zap size={16} />, title: 'Observability', desc: 'Full-stack monitoring with OpenSearch, Prometheus, Grafana, Thanos, and New Relic.' },
  { icon: <Shield size={16} />, title: 'Reliability Engineering', desc: 'SLO/SLI/SLA frameworks, error budget analysis, incident management, alert tuning.' },
  { icon: <Terminal size={16} />, title: 'Automation', desc: 'IaC with Terraform, CI/CD with Jenkins, Lambda-driven workflows, Python/Bash scripting.' },
]

export default function About() {
  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-tag"
        >
          <span className="font-heading font-semibold text-xs tracking-[0.3em] uppercase" style={{ color: 'var(--accent)' }}>
            About
          </span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-white leading-tight mb-6">
              Defending systems.<br />
              <span style={{ color: 'var(--accent)' }}>Enabling reliability.</span>
            </h2>
            <p className="font-body leading-relaxed mb-5" style={{ color: 'var(--dim)', lineHeight: 1.8 }}>
              DevOps Engineer with 4+ years of IT experience, specializing in AWS-based observability and automation. I design monitoring systems that make complex infrastructure readable, reliable, and resilient — turning noise into signal.
            </p>
            <p className="font-body leading-relaxed" style={{ color: 'var(--dim)', lineHeight: 1.8 }}>
              Currently embedded with Dow Jones at Infosys, I build the observability backbone that keeps critical news infrastructure operational — from real-time anomaly detection to synthetic monitoring for SSL certificates and service-level targets.
            </p>

            <div className="grid grid-cols-2 gap-6 mt-10">
              {stats.map(({ value, label }) => (
                <div key={label} style={{ borderLeft: '2px solid var(--accent)', paddingLeft: 16 }}>
                  <div className="font-heading font-bold text-3xl" style={{ color: 'var(--accent)' }}>{value}</div>
                  <div className="term-label mt-1">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="space-y-3">
            {pillars.map(({ icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card-hover flex items-start gap-4 p-5 relative"
                style={{ background: 'var(--card)', border: '1px solid var(--accent-border)' }}
              >
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
