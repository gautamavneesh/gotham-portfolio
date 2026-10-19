import { motion } from 'framer-motion'
import { useTheme } from '../ThemeContext'

const categories = [
  { title: 'Cloud & AWS',               emoji: '☁️', skills: ['EC2','Lambda','S3','IAM','CloudWatch','SNS','CloudFormation','AWS Secrets Manager','EFS','Redis'] },
  { title: 'Monitoring & Observability', emoji: '📡', skills: ['OpenSearch','Prometheus','Grafana','Thanos','New Relic','Alertmanager','CloudWatch Alarms'] },
  { title: 'CI/CD & Infrastructure',    emoji: '⚙️', skills: ['Jenkins','Terraform','Docker','Kubernetes','GitHub Actions','JFrog Artifactory'] },
  { title: 'AI & Automation',           emoji: '🤖', skills: ['Claude AI Skills','MCP Server','NotebookLM','AI-assisted IaC'] },
  { title: 'Languages & Scripting',     emoji: '💻', skills: ['Python','Bash','JavaScript','Shell Scripting','YAML','JSON'] },
  { title: 'API & Identity',            emoji: '🔐', skills: ['REST APIs','SOAP','Postman','AWS IAM','WSO2','OAuth 2.0','Swagger'] },
  { title: 'Reliability & Process',     emoji: '🛡️', skills: ['SLO / SLI / SLA','Error Budget','Incident Mgmt','Alert Tuning','Log Aggregation'] },
]

/* ── MODERN ── editorial list layout */
function SkillsModern() {
  return (
    <section id="skills" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="section-tag">
          <span className="font-heading font-semibold text-xs tracking-[0.3em] uppercase"
            style={{ color: 'var(--accent)' }}>Skills</span>
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="font-heading font-bold text-4xl text-white mb-14">Skills & Tools</motion.h2>

        {/* Editorial skill list — category heading + inline tags */}
        <div className="space-y-0">
          {categories.map(({ title, skills }, i) => (
            <motion.div key={title}
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.06 }}
              className="grid md:grid-cols-[220px,1fr] gap-6 py-6 items-baseline"
              style={{ borderBottom: '1px solid var(--accent-border)' }}>
              <span className="font-heading font-semibold text-sm" style={{ color: 'var(--text)' }}>
                {title}
              </span>
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <span key={skill}
                    className="font-body text-sm transition-colors cursor-default"
                    style={{ color: 'var(--dim)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--dim)')}>
                    {skill}
                  </span>
                )).reduce((acc, el, i, arr) => {
                  acc.push(el)
                  if (i < arr.length - 1) acc.push(
                    <span key={`sep-${i}`} style={{ color: 'var(--accent-border)', userSelect: 'none' }}>·</span>
                  )
                  return acc
                }, [])}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certification — clean card */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.3 }}
          className="mt-10 p-6 flex flex-wrap items-center justify-between gap-5"
          style={{ background: 'var(--card)', border: '1px solid var(--accent-border)' }}>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center text-lg flex-shrink-0"
              style={{ background: 'var(--surface)', border: '1px solid var(--accent-border)' }}>
              ☁️
            </div>
            <div>
              <div className="font-heading font-bold text-white">AWS Certified Cloud Practitioner</div>
              <div className="font-body text-sm mt-0.5" style={{ color: 'var(--dim)' }}>
                Amazon Web Services · 2025
              </div>
            </div>
          </div>
          <span className="px-4 py-2 font-body text-xs tracking-wide font-medium"
            style={{ background: 'rgba(129,140,248,0.1)', border: '1px solid var(--accent-border)',
              color: 'var(--accent)' }}>
            Verified ✓
          </span>
        </motion.div>
      </div>
    </section>
  )
}

/* ── BATMAN ── card grid layout */
const container = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }
const card      = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }

function SkillsBatman() {
  return (
    <section id="skills" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="section-tag">
          <span className="font-heading font-semibold text-xs tracking-[0.3em] uppercase"
            style={{ color: 'var(--accent)' }}>Skills</span>
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="font-heading font-bold text-4xl text-white mb-12">The Utility Belt</motion.h2>

        <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map(({ title, emoji, skills }) => (
            <motion.div key={title} variants={card} className="card-hover p-6 relative"
              style={{ background: 'var(--card)', border: '1px solid var(--accent-border)' }}>
              <div className="hud-corner tl" />
              <div className="flex items-center gap-3 mb-4">
                <span className="text-lg">{emoji}</span>
                <h3 className="font-heading font-semibold text-white text-sm tracking-wide">{title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <span key={skill} className="px-2.5 py-1.5 font-body text-xs tracking-wide cursor-default transition-all"
                    style={{ background: 'var(--surface)', border: '1px solid var(--cyan-border)', color: 'var(--dim)' }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--cyan)'; e.currentTarget.style.borderColor = 'rgba(0,184,224,0.35)' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--dim)'; e.currentTarget.style.borderColor = 'var(--cyan-border)' }}>
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="mt-8 p-6 flex flex-wrap items-center gap-5 relative"
          style={{ background: 'var(--card)', border: '1px solid rgba(192,204,216,0.15)' }}>
          <div className="hud-corner tl" /><div className="hud-corner br" />
          <div style={{ filter: 'drop-shadow(0 0 8px rgba(192,204,216,0.35))' }}>
            <img src="/bat-logo.png" alt="Batman" width={62} style={{ objectFit: 'contain', pointerEvents: 'none' }} />
          </div>
          <div>
            <div className="font-heading font-bold text-white text-lg">AWS Certified Cloud Practitioner</div>
            <div className="font-body text-sm mt-0.5" style={{ color: 'var(--dim)' }}>Amazon Web Services · 2025</div>
          </div>
          <div className="ml-auto">
            <span className="px-4 py-2 font-heading text-xs tracking-widest uppercase"
              style={{ border: '1px solid rgba(192,204,216,0.25)', color: 'var(--accent)' }}>
              Verified ✓
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default function Skills() {
  const { theme } = useTheme()
  return theme === 'batman' ? <SkillsBatman /> : <SkillsModern />
}
