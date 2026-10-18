import { motion } from 'framer-motion'

const categories = [
  { title: 'Cloud & AWS',               emoji: '☁️', skills: ['EC2','Lambda','S3','IAM','CloudWatch','SNS','CloudFormation','AWS CLI'] },
  { title: 'Monitoring & Observability', emoji: '📡', skills: ['OpenSearch','Prometheus','Grafana','Thanos','New Relic','Alertmanager','CloudWatch Alarms'] },
  { title: 'CI/CD & Infrastructure',    emoji: '⚙️', skills: ['Jenkins','Terraform','Docker','Kubernetes','GitHub Actions'] },
  { title: 'Languages & Scripting',     emoji: '💻', skills: ['Python','Bash','JavaScript','Shell Scripting','YAML','JSON'] },
  { title: 'API & Identity',            emoji: '🔐', skills: ['REST APIs','SOAP','Postman','AWS IAM','WSO2','OAuth 2.0','Swagger'] },
  { title: 'Reliability & Process',     emoji: '🛡️', skills: ['SLO / SLI / SLA','Error Budget','Incident Mgmt','Alert Tuning','Log Aggregation'] },
]

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }
const card = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }

export default function Skills() {
  return (
    <section id="skills" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-tag">
          <span className="font-heading font-semibold text-xs tracking-[0.3em] uppercase" style={{ color: 'var(--accent)' }}>Skills</span>
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="font-heading font-bold text-4xl text-white mb-12">The Utility Belt
        </motion.h2>

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
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--dim)'; e.currentTarget.style.borderColor = 'var(--cyan-border)' }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-8 p-6 flex flex-wrap items-center gap-5 relative"
          style={{ background: 'var(--card)', border: '1px solid rgba(192,204,216,0.15)' }}>
          <div className="hud-corner tl" /><div className="hud-corner br" />
          <div style={{ filter: 'drop-shadow(0 0 8px rgba(192,204,216,0.35))' }}>
            <img src="/bat-logo.png" alt="Batman" width={62} style={{ objectFit: 'contain', pointerEvents: 'none', mixBlendMode: 'screen' }} />
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
