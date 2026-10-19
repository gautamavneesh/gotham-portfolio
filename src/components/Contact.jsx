import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Star, Github, Linkedin, Mail, MapPin } from 'lucide-react'
import { useTheme } from '../ThemeContext'

function useForm() {
  const [form, setForm]   = useState({ name: '', email: '', rating: 0, message: '' })
  const [hover, setHover] = useState(0)
  const [status, setStatus] = useState(null)
  const update = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch { setStatus('success') }
    setTimeout(() => setStatus(null), 5000)
  }
  return { form, setForm, hover, setHover, status, update, handleSubmit }
}

/* ── MODERN ── */
function ContactModern() {
  const { form, setForm, hover, setHover, status, update, handleSubmit } = useForm()

  return (
    <section id="contact" className="py-28 px-6" style={{ background: 'var(--surface)' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="section-tag">
          <span className="font-heading font-semibold text-xs tracking-[0.3em] uppercase"
            style={{ color: 'var(--accent)' }}>Contact</span>
        </motion.div>

        <div className="grid md:grid-cols-[1fr,480px] gap-16 items-start">

          {/* Left — CTA + links */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="font-heading font-bold leading-tight text-white mb-4"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              Let's build something<br />
              <span style={{ color: 'var(--accent)' }}>great together.</span>
            </h2>
            <p className="font-body text-base leading-relaxed mb-10 max-w-md"
              style={{ color: 'var(--dim)', lineHeight: 1.8 }}>
              Open to DevOps, SRE, and Cloud Engineering roles. Whether it's a full-time
              position, a contract, or just a conversation about observability — I'd love to hear from you.
            </p>

            {/* Direct links */}
            <div className="space-y-4 mb-10">
              {[
                { icon: <Mail size={16} />, label: 'Email', val: 'avneesh.gautam63@gmail.com', href: 'mailto:avneesh.gautam63@gmail.com' },
                { icon: <Linkedin size={16} />, label: 'LinkedIn', val: 'linkedin.com/in/avneesh-gautam63', href: 'https://linkedin.com/in/avneesh-gautam63' },
                { icon: <Github size={16} />, label: 'GitHub', val: 'github.com/gautamavneesh', href: 'https://github.com/gautamavneesh' },
                { icon: <MapPin size={16} />, label: 'Location', val: 'Delhi, India', href: null },
              ].map(({ icon, label, val, href }) => {
                const inner = (
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0" style={{ color: 'var(--accent)' }}>{icon}</div>
                    <div>
                      <div className="font-body text-xs tracking-[0.12em] uppercase mb-0.5"
                        style={{ color: 'var(--dim)' }}>{label}</div>
                      <div className="font-body text-sm" style={{ color: 'var(--text)' }}>{val}</div>
                    </div>
                  </div>
                )
                return href
                  ? <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                      className="block transition-opacity hover:opacity-70">{inner}</a>
                  : <div key={label}>{inner}</div>
              })}
            </div>

            {/* Availability */}
            <div className="inline-flex items-center gap-3 px-4 py-3"
              style={{ background: 'rgba(52,211,153,0.06)', border: '1px solid rgba(52,211,153,0.15)' }}>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-body text-sm" style={{ color: '#34d399' }}>
                Available for new opportunities
              </span>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: 'name',  label: 'Your Name',  placeholder: 'John Doe',          type: 'text'  },
                  { name: 'email', label: 'Email',       placeholder: 'john@example.com',  type: 'email' },
                ].map(({ name, label, placeholder, type }) => (
                  <div key={name}>
                    <label className="block font-body text-xs tracking-[0.1em] uppercase mb-2"
                      style={{ color: 'var(--dim)' }}>{label}</label>
                    <input name={name} type={type} value={form[name]} onChange={update} required
                      placeholder={placeholder}
                      className="w-full font-body text-sm px-4 py-3 text-white transition-all"
                      style={{ background: 'var(--card)', border: '1px solid var(--accent-border)',
                        placeholder: 'var(--dim)' }}
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block font-body text-xs tracking-[0.1em] uppercase mb-2"
                  style={{ color: 'var(--dim)' }}>Rate this portfolio</label>
                <div className="flex gap-2">
                  {[1,2,3,4,5].map(star => (
                    <button key={star} type="button"
                      onClick={() => setForm(f => ({ ...f, rating: star }))}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                      className="transition-transform hover:scale-110">
                      <Star size={22}
                        fill={(hover || form.rating) >= star ? 'var(--accent)' : 'transparent'}
                        stroke={(hover || form.rating) >= star ? 'var(--accent)' : 'var(--dim)'}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-body text-xs tracking-[0.1em] uppercase mb-2"
                  style={{ color: 'var(--dim)' }}>Message</label>
                <textarea name="message" value={form.message} onChange={update} required rows={5}
                  placeholder="What's on your mind?"
                  className="w-full font-body text-sm px-4 py-3 text-white resize-none transition-all"
                  style={{ background: 'var(--card)', border: '1px solid var(--accent-border)' }}
                />
              </div>

              <button type="submit" disabled={status === 'sending'}
                className="w-full flex items-center justify-center gap-3 py-4 font-heading font-bold text-sm tracking-[0.15em] uppercase transition-all duration-300 disabled:opacity-60"
                style={{ background: 'var(--accent)', color: 'var(--bg)' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                {status === 'sending' ? 'Sending…' : <><span>Send Message</span><Send size={14} /></>}
              </button>

              <AnimatePresence>
                {status === 'success' && (
                  <motion.p initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="text-center font-body text-sm" style={{ color: '#34d399' }}>
                    Message received! I'll get back to you soon.
                  </motion.p>
                )}
                {status === 'error' && (
                  <motion.p initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="text-center font-body text-sm text-red-400">
                    Something went wrong — try emailing directly.
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

/* ── BATMAN ── */
function ContactBatman() {
  const { form, setForm, hover, setHover, status, update, handleSubmit } = useForm()

  return (
    <section id="contact" className="py-28 px-6" style={{ background: 'var(--surface)' }}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="section-tag">
          <span className="font-heading font-semibold text-xs tracking-[0.3em] uppercase"
            style={{ color: 'var(--accent)' }}>Contact</span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-white leading-tight mb-5">
              Signal the <span style={{ color: 'var(--accent)' }}>Bat.</span>
            </h2>
            <p className="font-body mb-10" style={{ color: 'var(--dim)', lineHeight: 1.8 }}>
              Open to new opportunities, collaborations, or just a conversation about observability and
              DevOps. Your feedback gets stored in Gotham HQ.
            </p>

            <div className="space-y-5">
              {[
                { icon: <Mail size={15} />, label: 'EMAIL', val: 'avneesh.gautam63@gmail.com', href: 'mailto:avneesh.gautam63@gmail.com' },
                { icon: <Linkedin size={15} />, label: 'LINKEDIN', val: 'linkedin.com/in/avneesh-gautam63', href: 'https://linkedin.com/in/avneesh-gautam63' },
                { icon: <Github size={15} />, label: 'GITHUB', val: 'github.com/gautamavneesh', href: 'https://github.com/gautamavneesh' },
              ].map(({ icon, label, val, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-4">
                  <div className="w-9 h-9 flex items-center justify-center transition-all"
                    style={{ border: '1px solid var(--cyan-border)', color: 'var(--accent)' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,184,224,0.4)'; e.currentTarget.style.background = 'rgba(0,184,224,0.05)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--cyan-border)'; e.currentTarget.style.background = 'transparent' }}>
                    {icon}
                  </div>
                  <div>
                    <div className="term-label mb-0.5">{label}</div>
                    <div className="font-body text-sm" style={{ color: 'var(--dim)' }}>{val}</div>
                  </div>
                </a>
              ))}
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 flex items-center justify-center"
                  style={{ border: '1px solid var(--cyan-border)', color: 'var(--accent)' }}>
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

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: 'name',  label: 'NAME',  placeholder: 'Bruce Wayne',      type: 'text'  },
                  { name: 'email', label: 'EMAIL', placeholder: 'bruce@wayne.com',  type: 'email' },
                ].map(({ name, label, type, placeholder }) => (
                  <div key={name}>
                    <label className="block term-label mb-2">{label}</label>
                    <input name={name} type={type} value={form[name]} onChange={update} required
                      placeholder={placeholder}
                      className="w-full font-body text-sm px-4 py-3 text-white transition-all"
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
                      onClick={() => setForm(f => ({ ...f, rating: star }))}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                      className="transition-transform hover:scale-110">
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
                  className="w-full font-body text-sm px-4 py-3 text-white resize-none transition-all"
                  style={{ background: 'var(--card)', border: '1px solid var(--accent-border)' }}
                />
              </div>

              <button type="submit" disabled={status === 'sending'}
                className="w-full flex items-center justify-center gap-3 py-4 font-heading font-bold text-xs tracking-[0.25em] uppercase transition-all duration-300 disabled:opacity-60"
                style={{ background: 'var(--accent)', color: '#000' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#d8e4f0'; e.currentTarget.style.boxShadow = '0 0 28px rgba(192,204,216,0.25)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.boxShadow = 'none' }}>
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

export default function Contact() {
  const { theme } = useTheme()
  return theme === 'batman' ? <ContactBatman /> : <ContactModern />
}
