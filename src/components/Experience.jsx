import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useTheme } from '../ThemeContext'

const experiences = [
  {
    company: 'Infosys Ltd.', client: 'Dow Jones', role: 'DevOps Engineer',
    period: 'Aug 2023 – Present', location: 'Chandigarh, India', current: true,
    impact: '30% reduction in incident response time',
    achievements: [
      {
        emoji: '📡', label: 'Core Observability Platform', metric: '30% faster response',
        tools: ['OpenSearch', 'Prometheus', 'Grafana', 'Thanos'],
        detail: 'Design and maintain the observability platform covering distributed log aggregation, long-term metrics retention, and centralized alerting, contributing to a 30% reduction in incident response time.',
      },
      {
        emoji: '🐳', label: 'Kubernetes Deployments',
        tools: ['Docker', 'Kubernetes', 'Helm', 'Service Mesh'],
        detail: 'Containerized and deployed Prometheus and Grafana on a Kubernetes service mesh — deployment manifests, service mesh routing, resource limits, and rolling update strategies.',
      },
      {
        emoji: '👁️', label: 'New Relic Monitoring & IaC',
        tools: ['New Relic', 'Terraform', 'GitHub Actions', 'JFrog'],
        detail: 'Manage New Relic for monitoring, alerting, API testing, and scripted browser user-journey testing; Terraform IaC via GitHub Actions with JFrog Artifactory for remote state.',
      },
      {
        emoji: '⚡', label: 'Log Ingestion & Alerting',
        tools: ['AWS Lambda', 'CloudWatch', 'S3', 'SNS'],
        detail: 'Automated log ingestion, anomaly detection, and alerting workflows across the platform.',
      },
      {
        emoji: '📊', label: 'Uptime & SLI Reporting',
        tools: ['New Relic Synthetics', 'SLO', 'Error Budget'],
        detail: 'Built a New Relic uptime reporting framework — synthetic monitors across all key applications with SLI entities at monitor, service, and product level, tracking availability % and error budget.',
      },
      {
        emoji: '🤖', label: 'Claude AI Observability Skills',
        tools: ['Claude AI', 'MCP Server', 'OpenSearch', 'Grafana'],
        detail: 'Developed Claude AI skills for observability automation — Grafana dashboard creation with automated PR deployment, DJ Synthetics management, and a multi-platform alert builder (OpenSearch, CloudWatch, Prometheus) via an internal OpenSearch MCP server.',
      },
      {
        emoji: '🏢', label: 'Eng Ops Dashboard', metric: '7 domains',
        tools: ['Hatch', 'Redis', 'EFS', 'Secrets Manager'],
        detail: 'Built an org-wide engineering ops dashboard across 7 domains (reliability, dev experience, delivery flow, ops load, security, cost, AI usage) on Dow Jones Hatch.',
      },
      {
        emoji: '🔍', label: 'AI-Powered DevOps Agent', badge: 'In Progress',
        tools: ['CloudWatch', 'Grafana', 'New Relic', 'Lambda'],
        detail: 'Building an AI-powered AWS DevOps agent for Dow Jones B2B accounts — natural-language incident investigation with cross-tool correlation, alarm-triggered via Lambda forwarder across all PIB accounts.',
      },
    ],
    tags: ['OpenSearch', 'Prometheus', 'Grafana', 'Thanos', 'New Relic', 'Terraform', 'Kubernetes', 'Helm', 'GitHub Actions', 'AWS Lambda', 'MCP Server', 'JFrog'],
  },
  {
    company: 'Infosys Ltd.', client: 'Samsung', role: 'IAM Developer / DevOps Engineer',
    period: 'Jul 2022 – Jan 2023', location: 'Chandigarh, India', current: false,
    impact: 'Optimized user lifecycle management',
    achievements: [
      {
        emoji: '🔐', label: 'IAM Solution',
        tools: ['WSO2', 'Apache Syncope'],
        detail: 'Developed an Identity and Access Management solution using WSO2 and Apache Syncope for enterprise user management.',
      },
      {
        emoji: '⚙️', label: 'Provisioning Workflows',
        tools: ['Java', 'Multithreading'],
        detail: 'Implemented multithreaded provisioning workflows, optimising inbound and outbound user lifecycle management.',
      },
      {
        emoji: '🔗', label: 'REST API Development',
        tools: ['REST', 'Swagger'],
        detail: 'Built and documented REST APIs with Swagger for integration with enterprise applications.',
      },
      {
        emoji: '🚀', label: 'CI/CD Automation',
        tools: ['Jenkins', 'Docker'],
        detail: 'Automated deployments using Jenkins and Docker, reducing release cycle time and minimising manual configuration errors.',
      },
    ],
    tags: ['WSO2', 'Apache Syncope', 'Jenkins', 'Docker', 'REST APIs', 'Swagger'],
  },
  {
    company: 'Infosys Ltd.', client: 'Telstra', role: 'Java Developer',
    period: 'Mar 2022 – Jun 2022', location: 'Chandigarh, India', current: false,
    impact: 'Codebase analysis & migration planning',
    achievements: [
      {
        emoji: '🔍', label: 'Architecture Analysis',
        tools: ['SOAP', 'Spring Boot'],
        detail: 'Analysed the existing SOAP-based password reset service architecture; contributed to technical documentation and Spring Boot migration proposals.',
      },
      {
        emoji: '📋', label: 'Deployment Planning',
        tools: ['Zero-downtime', 'Rollout docs'],
        detail: 'Supported deployment planning and zero-downtime release strategy documentation for phased service rollouts.',
      },
      {
        emoji: '📝', label: 'Codebase Documentation',
        tools: ['REST APIs', 'Java'],
        detail: 'Documented codebase structure, REST API patterns, and architecture best practices to support team onboarding.',
      },
    ],
    tags: ['Spring Boot', 'SOAP', 'Java', 'REST APIs'],
  },
]

/* ── Achievement row — expandable, shared by both modes ── */
function AchievementRow({ ach, index }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04 }}
      onClick={() => setOpen(o => !o)}
      className="cursor-pointer transition-all"
      style={{
        padding: '10px 12px',
        border: `1px solid ${open ? 'var(--accent-border)' : 'transparent'}`,
        background: open ? 'var(--card)' : 'transparent',
      }}>
      <div className="flex items-center gap-2 flex-wrap">
        <span style={{ fontSize: 15, lineHeight: 1, flexShrink: 0 }}>{ach.emoji}</span>
        <span className="font-body font-medium text-sm" style={{ color: open ? 'var(--accent)' : 'var(--text)' }}>
          {ach.label}
        </span>
        {ach.metric && (
          <span className="font-body text-xs px-2 py-0.5"
            style={{ background: 'rgba(13,148,136,0.1)', color: 'var(--cyan)', border: '1px solid var(--cyan-border)' }}>
            {ach.metric}
          </span>
        )}
        {ach.badge && (
          <span className="font-body text-xs px-2 py-0.5"
            style={{ background: 'rgba(194,65,12,0.08)', color: 'var(--accent)', border: '1px solid var(--accent-border)' }}>
            {ach.badge}
          </span>
        )}
        <div className="flex gap-1 flex-wrap">
          {ach.tools.map(t => (
            <span key={t} className="font-body text-xs px-1.5 py-0.5"
              style={{ color: 'var(--dim)', background: 'var(--surface)' }}>
              {t}
            </span>
          ))}
        </div>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-auto flex-shrink-0"
          style={{ color: 'var(--dim)' }}>
          <ChevronDown size={13} />
        </motion.span>
      </div>

      <AnimatePresence>
        {open && (
          <motion.p
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 10 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.22 }}
            className="font-body text-sm pl-6 overflow-hidden"
            style={{ color: 'var(--dim)', lineHeight: 1.75 }}>
            {ach.detail}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ── MODERN — tab selector left, content right ── */
function ExperienceModern() {
  const [active, setActive] = useState(0)
  const exp = experiences[active]

  return (
    <section id="experience" className="py-28 px-6" style={{ background: 'var(--surface)' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="section-tag">
          <span className="font-heading font-semibold text-xs tracking-[0.3em] uppercase"
            style={{ color: 'var(--accent)' }}>Experience</span>
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="font-heading font-bold text-4xl text-white mb-14">Work History</motion.h2>

        <div className="flex flex-col md:flex-row gap-0" style={{ minHeight: 480 }}>

          {/* Left: job tabs */}
          <div className="flex md:flex-col overflow-x-auto md:overflow-visible flex-shrink-0 md:w-48"
            style={{ borderBottom: '1px solid var(--accent-border)', marginBottom: 24 }}
          >
            <style>{`@media (min-width: 768px) { .exp-tab-list { border-bottom: none !important; margin-bottom: 0 !important; border-right: 1px solid var(--accent-border); } }`}</style>
            {experiences.map((e, i) => (
              <motion.button key={i} onClick={() => setActive(i)}
                whileTap={{ scale: 0.98 }}
                className="exp-tab-list text-left px-5 py-5 transition-all flex-shrink-0 md:flex-shrink"
                style={{
                  borderLeft: `2px solid ${i === active ? 'var(--accent)' : 'transparent'}`,
                  background: i === active ? 'var(--accent-glow)' : 'transparent',
                }}>
                <div className="font-heading font-bold text-sm whitespace-nowrap"
                  style={{ color: i === active ? 'var(--accent)' : 'var(--text)' }}>
                  {e.client}
                </div>
                <div className="font-body text-xs mt-0.5 whitespace-nowrap" style={{ color: 'var(--dim)' }}>{e.period}</div>
                {e.current && (
                  <span className="hidden md:inline-block mt-1.5 px-1.5 py-0.5 font-body text-xs"
                    style={{ background: 'rgba(52,211,153,0.08)', color: '#34d399', border: '1px solid rgba(52,211,153,0.15)' }}>
                    current
                  </span>
                )}
              </motion.button>
            ))}
          </div>

          {/* Right: content */}
          <div className="flex-1 md:pl-10">
            <AnimatePresence mode="wait">
              <motion.div key={active}
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.25 }}>

                <div className="mb-5">
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <h3 className="font-heading font-bold text-2xl text-white">{exp.role}</h3>
                    {exp.current && (
                      <span className="px-2 py-0.5 font-body text-xs"
                        style={{ background: 'rgba(52,211,153,0.08)', color: '#34d399', border: '1px solid rgba(52,211,153,0.15)' }}>
                        Current
                      </span>
                    )}
                  </div>
                  <div className="font-body text-sm" style={{ color: 'var(--dim)' }}>
                    {exp.company} · {exp.location}
                  </div>
                  {exp.impact && (
                    <div className="flex items-center gap-2 mt-3">
                      <span style={{ color: 'var(--cyan)', fontSize: 12 }}>↗</span>
                      <span className="font-body text-sm font-medium" style={{ color: 'var(--cyan)' }}>{exp.impact}</span>
                    </div>
                  )}
                </div>

                <div style={{ height: 1, background: 'var(--accent-border)', marginBottom: 12 }} />

                <div className="space-y-0.5 mb-8">
                  {exp.achievements.map((ach, j) => (
                    <AchievementRow key={`${active}-${j}`} ach={ach} index={j} />
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {exp.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 font-body text-xs transition-colors cursor-default"
                      style={{ background: 'var(--card)', border: '1px solid var(--accent-border)', color: 'var(--dim)' }}
                      onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--accent-dim)' }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'var(--dim)'; e.currentTarget.style.borderColor = 'var(--accent-border)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Education */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="mt-14 p-6 flex items-center gap-5"
          style={{ background: 'var(--card)', border: '1px solid var(--accent-border)' }}>
          <div className="text-2xl">🎓</div>
          <div>
            <div className="font-heading font-bold text-white">B.Tech — Computer Science Engineering</div>
            <div className="font-body text-sm mt-0.5" style={{ color: 'var(--dim)' }}>
              Guru Gobind Singh Indraprastha University, Delhi · 2021
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ── BATMAN — timeline with achievement chips ── */
function ExperienceBatman() {
  return (
    <section id="experience" className="py-28 px-6" style={{ background: 'var(--surface)' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="section-tag">
          <span className="font-heading font-semibold text-xs tracking-[0.3em] uppercase"
            style={{ color: 'var(--accent)' }}>Experience</span>
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="font-heading font-bold text-4xl text-white mb-14">The Mission Log</motion.h2>

        <div className="relative">
          <div className="absolute left-3 md:left-9 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, rgba(192,204,216,0.4), rgba(192,204,216,0.1), transparent)' }} />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative pl-12 md:pl-28">
                <div className="absolute left-0 md:left-[26px] top-6 w-3 h-3 rounded-full"
                  style={{
                    border: '2px solid var(--accent)',
                    background: exp.current ? 'var(--accent)' : 'var(--surface)',
                    boxShadow: exp.current ? '0 0 14px rgba(192,204,216,0.7)' : 'none',
                  }} />

                <div className="card-hover p-6 relative"
                  style={{ background: 'var(--card)', border: '1px solid var(--accent-border)' }}>
                  <div className="hud-corner tl" /><div className="hud-corner tr" />

                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-heading font-bold text-xl text-white">{exp.role}</span>
                        {exp.current && (
                          <span className="px-2 py-0.5 font-body text-xs tracking-widest"
                            style={{ border: '1px solid rgba(192,204,216,0.25)', color: 'var(--accent)', background: 'rgba(192,204,216,0.06)' }}>
                            CURRENT
                          </span>
                        )}
                      </div>
                      <div className="font-body text-sm">
                        <span style={{ color: 'var(--accent)' }}>{exp.company}</span>
                        <span style={{ color: 'var(--dim)' }}> · </span>
                        <span style={{ color: 'var(--text)' }}>{exp.client}</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-body text-sm" style={{ color: 'var(--dim)' }}>{exp.period}</div>
                      <div className="font-body text-xs mt-0.5" style={{ color: 'var(--dim)', opacity: 0.6 }}>{exp.location}</div>
                    </div>
                  </div>

                  <div style={{ height: 1, background: 'var(--accent-border)', marginBottom: 12 }} />

                  <div className="space-y-0.5 mb-5">
                    {exp.achievements.map((ach, j) => (
                      <AchievementRow key={`bat-${i}-${j}`} ach={ach} index={j} />
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 font-body text-xs tracking-wide transition-colors cursor-default"
                        style={{ background: 'var(--surface)', border: '1px solid var(--cyan-border)', color: 'var(--dim)' }}
                        onMouseEnter={e => { e.currentTarget.style.color = 'var(--cyan)'; e.currentTarget.style.borderColor = 'rgba(0,184,224,0.3)' }}
                        onMouseLeave={e => { e.currentTarget.style.color = 'var(--dim)'; e.currentTarget.style.borderColor = 'var(--cyan-border)' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="mt-14 p-6 flex items-center gap-5"
          style={{ background: 'var(--card)', border: '1px solid var(--accent-border)' }}>
          <div className="text-2xl">🎓</div>
          <div>
            <div className="font-heading font-bold text-white">B.Tech — Computer Science Engineering</div>
            <div className="font-body text-sm mt-0.5" style={{ color: 'var(--dim)' }}>
              Guru Gobind Singh Indraprastha University, Delhi · 2021
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default function Experience() {
  const { theme } = useTheme()
  return theme === 'batman' ? <ExperienceBatman /> : <ExperienceModern />
}
