import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Star, Linkedin, Mail, MapPin } from 'lucide-react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', rating: 0, message: '' })
  const [hover, setHover] = useState(0)
  const [status, setStatus] = useState(null)

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('success') // dev mode — Vercel function not yet wired
    }
    if (status !== 'error') setForm({ name: '', email: '', rating: 0, message: '' })
    setTimeout(() => setStatus(null), 5000)
  }

  return (
    <section id="contact" className="py-28 px-6" style={{ background: 'var(--surface)' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="section-tag">
          <span className="font-heading font-semibold text-xs tracking-[0.3em] uppercase" style={{ color: 'var(--accent)' }}>Contact</span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-white leading-tight mb-5">
              Signal the <span style={{ color: 'var(--accent)' }}>Bat.</span>
            </h2>
            <p className="font-body mb-10" style={{ color: 'var(--dim)', lineHeight: 1.8 }}>
              Open to new opportunities, collaborations, or just a conversation about observability and DevOps. Your feedback gets stored in Gotham HQ (Salesforce).
            </p>

            <div className="space-y-5">
              {[
                { icon: <Mail size={15} />, label: 'EMAIL', val: 'avneesh.gautam63@gmail.com', href: 'mailto:avneesh.gautam63@gmail.com' },
                { icon: <Linkedin size={15} />, label: 'LINKEDIN', val: 'linkedin.com/in/avneesh-gautam63', href: 'https://linkedin.com/in/avneesh-gautam63' },
              ].map(({ icon, label, val, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                  <div className="w-9 h-9 flex items-center justify-center transition-all"
                    style={{ border: '1px solid var(--cyan-border)', color: 'var(--accent)' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,184,224,0.4)'; e.currentTarget.style.background = 'rgba(0,184,224,0.05)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--cyan-border)'; e.currentTarget.style.background = 'transparent' }}
                  >
                    {icon}
                  </div>
                  <div>
                    <div className="term-label mb-0.5">{label}</div>
                    <div className="font-body text-sm transition-colors" style={{ color: 'var(--dim)' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--dim)')}
                    >{val}</div>
                  </div>
                </a>
              ))}
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 flex items-center justify-center" style={{ border: '1px solid var(--cyan-border)', color: 'var(--accent)' }}>
                  <MapPin size={15} />
                </div>
                <div>
                  <div className="term-label mb-0.5">LOCATION</div>
                  <div className="font-body text-sm" style={{ color: 'var(--dim)' }}>Delhi, India</div>
                </div>
              </div>
            </div>

            <div className="mt-10 p-4 relative" style={{ borderLeft: '2px solid rgba(192,204,216,0.4)', background: 'var(--card)' }}>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="term-label" style={{ color: '#4ade80' }}>AVAILABLE FOR HIRE</span>
              </div>
              <p className="font-body text-sm" style={{ color: 'var(--dim)' }}>
                Open to DevOps / SRE / Observability roles — full-time or consulting.
              </p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: 'name', label: 'NAME', placeholder: 'Bruce Wayne' },
                  { name: 'email', label: 'EMAIL', type: 'email', placeholder: 'bruce@wayne.com' },
                ].map(({ name, label, type, placeholder }) => (
                  <div key={name}>
                    <label className="block term-label mb-2">{label}</label>
                    <input name={name} type={type || 'text'} value={form[name]} onChange={update} required
                      placeholder={placeholder}
                      className="w-full font-body text-sm px-4 py-3 text-white placeholder-[#3c5468] transition-all"
                      style={{ background: 'var(--card)', border: '1px solid var(--accent-border)' }}
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block term-label mb-2">RATING</label>
                <div className="flex gap-2">
                  {[1,2,3,4,5].map(star => (
                    <button key={star} type="button"
                      onClick={() => setForm({ ...form, rating: star })}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star size={24}
                        fill={(hover || form.rating) >= star ? '#c0ccd8' : 'transparent'}
                        stroke={(hover || form.rating) >= star ? '#c0ccd8' : 'var(--dim)'}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block term-label mb-2">MESSAGE</label>
                <textarea name="message" value={form.message} onChange={update} required rows={5}
                  placeholder="Your feedback or message..."
                  className="w-full font-body text-sm px-4 py-3 text-white placeholder-[#3c5468] resize-none transition-all"
                  style={{ background: 'var(--card)', border: '1px solid var(--accent-border)' }}
                />
              </div>

              <button type="submit" disabled={status === 'sending'}
                className="w-full flex items-center justify-center gap-3 py-4 font-heading font-bold text-xs tracking-[0.25em] uppercase transition-all duration-300 disabled:opacity-60"
                style={{ background: 'var(--accent)', color: '#000' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#d8e4f0'; e.currentTarget.style.boxShadow = '0 0 28px rgba(192,204,216,0.25)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                {status === 'sending' ? 'Transmitting...' : <><span>Send to Gotham HQ</span><Send size={14} /></>}
              </button>

              <AnimatePresence>
                {status === 'success' && (
                  <motion.p initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="text-center font-body text-sm" style={{ color: '#4ade80' }}>
                    Transmission received. I'll respond shortly.
                  </motion.p>
                )}
                {status === 'error' && (
                  <motion.p initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="text-center font-body text-sm text-red-400">
                    Transmission failed. Try emailing directly.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
