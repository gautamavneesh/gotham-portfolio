import { motion } from 'framer-motion'

const experiences = [
  {
    company: 'Infosys Ltd.', client: 'Dow Jones', role: 'DevOps Engineer',
    period: 'Aug 2023 – Present', location: 'Chandigarh, India', current: true,
    bullets: [
      'Designed and maintained a robust observability platform using OpenSearch, Prometheus, and Grafana — reducing incident response time by 30%.',
      'Automated log pipelines, anomaly detection, and alerting workflows with AWS Lambda, CloudWatch, S3, and SNS.',
      'Integrated New Relic for synthetic monitoring, service-level tracking, and SSL certificate expiration management.',
      'Partnered with SRE teams to define cloud monitoring best practices, improving uptime and reducing false alert volume.',
    ],
    tags: ['OpenSearch', 'Prometheus', 'Grafana', 'AWS Lambda', 'New Relic', 'Terraform', 'Thanos'],
  },
  {
    company: 'Infosys Ltd.', client: 'Samsung', role: 'IAM Developer / DevOps Engineer',
    period: 'Jul 2022 – Jan 2023', location: 'Chandigarh, India', current: false,
    bullets: [
      'Built a scalable Identity and Access Management solution using WSO2 and Apache Syncope.',
      'Implemented multithreaded provisioning workflows to optimize user lifecycle management.',
      'Developed and secured REST APIs with Swagger for enterprise application integration.',
      'Automated deployments with Jenkins and Docker, reducing release time and manual errors.',
    ],
    tags: ['WSO2', 'Apache Syncope', 'Jenkins', 'Docker', 'REST APIs', 'Swagger'],
  },
  {
    company: 'Infosys Ltd.', client: 'Telstra', role: 'Java Developer',
    period: 'Mar 2022 – Jun 2022', location: 'Chandigarh, India', current: false,
    bullets: [
      'Contributed to migration of password reset functionality to Spring Boot and SOAP services.',
      'Supported phased deployments with zero-downtime release strategies.',
    ],
    tags: ['Spring Boot', 'SOAP', 'Java', 'REST APIs'],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="py-28 px-6" style={{ background: 'var(--surface)' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-tag">
          <span className="font-heading font-semibold text-xs tracking-[0.3em] uppercase" style={{ color: 'var(--accent)' }}>Experience</span>
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="font-heading font-bold text-4xl text-white mb-14">The Mission Log
        </motion.h2>

        <div className="relative">
          <div className="absolute left-3 md:left-9 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, rgba(192,204,216,0.4), rgba(192,204,216,0.1), transparent)' }} />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative pl-12 md:pl-28"
              >
                <div className="absolute left-0 md:left-[26px] top-6 w-3 h-3 rounded-full"
                  style={{
                    border: '2px solid var(--accent)',
                    background: exp.current ? 'var(--accent)' : 'var(--surface)',
                    boxShadow: exp.current ? '0 0 14px rgba(192,204,216,0.7)' : 'none',
                  }}
                />
                <div className="card-hover p-6 relative" style={{ background: 'var(--card)', border: '1px solid var(--accent-border)' }}>
                  <div className="hud-corner tl" /><div className="hud-corner tr" />

                  <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
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
                        <span style={{ color: 'var(--dim)' }}> · Client: </span>
                        <span style={{ color: 'var(--text)' }}>{exp.client}</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-body text-sm" style={{ color: 'var(--dim)' }}>{exp.period}</div>
                      <div className="font-body text-xs mt-1" style={{ color: 'var(--dim)', opacity: 0.6 }}>{exp.location}</div>
                    </div>
                  </div>

                  <ul className="space-y-2.5 mb-5">
                    {exp.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-3 font-body text-sm" style={{ color: 'var(--dim)', lineHeight: 1.7 }}>
                        <span className="mt-1.5 flex-shrink-0 text-xs" style={{ color: 'var(--accent)' }}>▸</span>
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 font-body text-xs tracking-wide transition-colors cursor-default"
                        style={{ background: 'var(--surface)', border: '1px solid var(--cyan-border)', color: 'var(--dim)' }}
                        onMouseEnter={e => { e.currentTarget.style.color = 'var(--cyan)'; e.currentTarget.style.borderColor = 'rgba(0,184,224,0.3)' }}
                        onMouseLeave={e => { e.currentTarget.style.color = 'var(--dim)'; e.currentTarget.style.borderColor = 'var(--cyan-border)' }}
                      >
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
          className="mt-14 p-6 flex items-center gap-5" style={{ background: 'var(--card)', border: '1px solid var(--accent-border)' }}>
          <div className="text-2xl">🎓</div>
          <div>
            <div className="font-heading font-bold text-white">B.Tech — Computer Science Engineering</div>
            <div className="font-body text-sm mt-0.5" style={{ color: 'var(--dim)' }}>Guru Gobind Singh Indraprastha University, Delhi · 2020</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
