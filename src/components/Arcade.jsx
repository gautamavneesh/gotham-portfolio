import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import GameDetective from './games/GameDetective'
import GameRunner from './games/GameRunner'

const GAMES = [
  {
    id: 'detective',
    title: 'Detective Mode',
    subtitle: 'Find the Incident',
    tag: 'INVESTIGATION',
    desc: '3 real production incidents from the observability stack. Examine logs, metrics, and alerts — then diagnose the root cause before the clock runs out.',
    tools: ['OpenSearch', 'New Relic', 'Lambda', 'CloudWatch'],
    icon: '🔍',
    component: GameDetective,
  },
  {
    id: 'runner',
    title: 'Rooftop Shadow Run',
    subtitle: 'Gotham Rooftops',
    tag: 'ARCADE',
    desc: 'Batman running across Gotham rooftops. Jump over chimneys and vents. Collect bat tokens. The city never sleeps — and neither does the on-call engineer.',
    tools: ['SPACE', '↑ ARROW', 'TAP'],
    icon: '🦇',
    component: GameRunner,
  },
]

export default function Arcade() {
  const [active, setActive] = useState(null)
  const activeGame = GAMES.find(g => g.id === active)

  return (
    <section id="arcade" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="section-tag">
          <span className="font-heading font-semibold text-xs tracking-[0.3em] uppercase"
            style={{ color: 'var(--accent)' }}>Bat Cave</span>
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="font-heading font-bold text-4xl text-white mb-4">The Arcade</motion.h2>

        <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.14 }}
          className="font-body text-sm mb-12" style={{ color: 'var(--dim)', maxWidth: 480, lineHeight: 1.8 }}>
          Two games built around real observability work — not decoration, part of the story.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-6">
          {GAMES.map((game, i) => (
            <motion.div key={game.id}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.14 }}
              onClick={() => setActive(game.id)}
              className="card-hover cursor-pointer p-7 relative"
              style={{ background: 'var(--card)', border: '1px solid var(--accent-border)' }}>
              <div className="hud-corner tl" /><div className="hud-corner br" />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <span style={{
                  fontFamily: "'Rajdhani',sans-serif", fontSize: 8, letterSpacing: '0.32em', fontWeight: 600,
                  padding: '3px 8px', border: '1px solid var(--accent-border)', color: 'var(--dim)',
                }}>{game.tag}</span>
                <span style={{ fontSize: 26, lineHeight: 1 }}>{game.icon}</span>
              </div>

              <h3 className="font-heading font-bold text-2xl text-white mb-1">{game.title}</h3>
              <div className="font-body text-xs mb-5" style={{ color: 'var(--accent)', letterSpacing: '0.06em' }}>{game.subtitle}</div>

              <p className="font-body text-sm mb-6" style={{ color: 'var(--dim)', lineHeight: 1.75 }}>{game.desc}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {game.tools.map(t => (
                  <span key={t} style={{
                    fontFamily: "'Rajdhani',sans-serif", fontSize: 9, letterSpacing: '0.16em', fontWeight: 500,
                    padding: '2px 8px', background: 'var(--surface)', border: '1px solid var(--cyan-border)', color: 'var(--dim)',
                  }}>{t}</span>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Rajdhani',sans-serif", fontSize: 10, letterSpacing: '0.28em', color: 'var(--accent)', fontWeight: 600 }}>
                <span>LAUNCH</span><span>→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal overlay */}
      <AnimatePresence>
        {active && activeGame && (
          <motion.div
            key="modal-bg"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 50,
              background: 'rgba(4,6,12,0.92)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: 16,
            }}
            onClick={(e) => { if (e.target === e.currentTarget) setActive(null) }}>

            <motion.div
              key="modal-box"
              initial={{ scale: 0.96, opacity: 0, y: 8 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 8 }}
              transition={{ duration: 0.18 }}
              style={{
                width: '100%', maxWidth: 680,
                height: '90vh', maxHeight: 560,
                background: 'var(--card)',
                border: '1px solid var(--accent-border)',
                display: 'flex', flexDirection: 'column',
                position: 'relative', overflow: 'hidden',
              }}>

              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '9px 16px', borderBottom: '1px solid var(--accent-border)', flexShrink: 0,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 14 }}>{activeGame.icon}</span>
                  <span style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '0.26em', color: 'var(--text)' }}>
                    {activeGame.title.toUpperCase()}
                  </span>
                </div>
                <button onClick={() => setActive(null)} style={{
                  fontFamily: 'Courier New', fontSize: 9, cursor: 'pointer',
                  background: 'none', border: '1px solid rgba(192,204,216,0.1)',
                  color: '#3c5468', padding: '3px 9px',
                }}>✕ CLOSE</button>
              </div>

              <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <activeGame.component onClose={() => setActive(null)} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
