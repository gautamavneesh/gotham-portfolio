import { useCallback, useEffect, useRef, useState } from 'react'

const W = 600, H = 260
const GROUND = H - 52
const PAX = 72, PAW = 12, PAH = 44
const GRAVITY = 0.62
const JUMP_V = -13.4
const BASE_SPEED = 4.0

// ── building layer data (deterministic so layout is consistent) ──
function genLayer(heights, widthFn, gapFn) {
  let x = 0
  return heights.map((h, i) => {
    const w = widthFn(i)
    const b = { x, w, h }
    x += w + gapFn(i)
    return b
  })
}

const FAR_H = [130, 165, 95, 205, 145, 175, 110, 185, 135, 155, 95, 215, 160, 140, 120, 195, 100, 160, 130, 180]
const MID_H = [75, 100, 60, 115, 82, 105, 58, 125, 78, 92, 68, 110, 88, 98]

const FAR_BLDGS = genLayer(FAR_H, i => 50 + (i % 3) * 30, i => 10 + (i % 4) * 12)
const MID_BLDGS = genLayer(MID_H, i => 36 + (i % 3) * 20, i => 8  + (i % 3) * 10)

const farTotal = FAR_BLDGS[FAR_BLDGS.length - 1].x + FAR_BLDGS[FAR_BLDGS.length - 1].w + 80
const midTotal = MID_BLDGS[MID_BLDGS.length - 1].x + MID_BLDGS[MID_BLDGS.length - 1].w + 50

// ── drawing ──
function drawBg(ctx, scroll) {
  const sky = ctx.createLinearGradient(0, 0, 0, H)
  sky.addColorStop(0, '#05080f')
  sky.addColorStop(1, '#090f1c')
  ctx.fillStyle = sky
  ctx.fillRect(0, 0, W, H)

  ctx.save()
  ctx.globalAlpha = 0.06
  ctx.fillStyle = '#c0ccd8'
  ctx.beginPath()
  ctx.arc(W * 0.81, 46, 28, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()

  const farOff = (scroll * 0.22) % farTotal
  ctx.fillStyle = '#090e18'
  FAR_BLDGS.forEach(b => {
    for (let d = -1; d <= 1; d++) {
      const bx = b.x - farOff + d * farTotal
      if (bx + b.w > 0 && bx < W) ctx.fillRect(bx, GROUND - b.h, b.w, b.h)
    }
  })

  const midOff = (scroll * 0.52) % midTotal
  ctx.fillStyle = '#0c1220'
  MID_BLDGS.forEach(b => {
    for (let d = -1; d <= 1; d++) {
      const bx = b.x - midOff + d * midTotal
      if (bx + b.w > 0 && bx < W) ctx.fillRect(bx, GROUND - b.h, b.w, b.h)
    }
  })
}

function drawGround(ctx) {
  ctx.fillStyle = '#10162a'
  ctx.fillRect(0, GROUND, W, H - GROUND)
  const eg = ctx.createLinearGradient(0, GROUND, 0, GROUND + 4)
  eg.addColorStop(0, 'rgba(192,204,216,0.1)')
  eg.addColorStop(1, 'rgba(192,204,216,0)')
  ctx.fillStyle = eg
  ctx.fillRect(0, GROUND, W, 4)
  ctx.strokeStyle = 'rgba(192,204,216,0.025)'
  ctx.lineWidth = 1
  for (let i = 20; i < W; i += 26) {
    ctx.beginPath(); ctx.moveTo(i, GROUND + 3); ctx.lineTo(i, H); ctx.stroke()
  }
}

function drawPlayer(ctx, py, vy, phase, dead) {
  const bob = Math.abs(vy) < 0.5 ? Math.sin(phase) * 1.6 : 0
  const y = py + bob
  const px = PAX

  ctx.save()
  if (dead) ctx.globalAlpha = 0.35

  // Left cape wing
  ctx.fillStyle = '#0b1020'
  ctx.beginPath()
  ctx.moveTo(px + 4, y + 10)
  ctx.quadraticCurveTo(px - 10, y + 30, px + 1, y + 44)
  ctx.lineTo(px + 5, y + 27)
  ctx.closePath()
  ctx.fill()
  // Right cape wing
  ctx.beginPath()
  ctx.moveTo(px + 8, y + 10)
  ctx.quadraticCurveTo(px + 22, y + 30, px + 11, y + 44)
  ctx.lineTo(px + 7, y + 27)
  ctx.closePath()
  ctx.fill()

  // Body
  ctx.fillStyle = '#131d30'
  ctx.fillRect(px + 1, y + 12, 10, 26)

  // Head
  ctx.beginPath()
  ctx.arc(px + 6, y + 10, 8, 0, Math.PI * 2)
  ctx.fill()

  // Left ear
  ctx.fillStyle = '#0b1020'
  ctx.beginPath(); ctx.moveTo(px + 1, y + 5); ctx.lineTo(px - 4, y - 6); ctx.lineTo(px + 5, y + 3); ctx.closePath(); ctx.fill()
  // Right ear
  ctx.beginPath(); ctx.moveTo(px + 11, y + 5); ctx.lineTo(px + 16, y - 6); ctx.lineTo(px + 7, y + 3); ctx.closePath(); ctx.fill()

  // Eyes
  ctx.fillStyle = 'rgba(0,184,224,0.55)'
  ctx.fillRect(px + 2, y + 7, 2.5, 1.5)
  ctx.fillRect(px + 7, y + 7, 2.5, 1.5)

  ctx.restore()
}

function drawObstacle(ctx, obs) {
  if (obs.type === 'chimney') {
    ctx.fillStyle = '#0e1828'
    ctx.fillRect(obs.x, GROUND - obs.h, obs.w, obs.h)
    ctx.fillStyle = '#090f1c'
    ctx.fillRect(obs.x - 2, GROUND - obs.h, obs.w + 4, 5)
  } else {
    ctx.fillStyle = '#0d1726'
    ctx.fillRect(obs.x, GROUND - obs.h, obs.w, obs.h)
    const gw = Math.max(4, Math.floor((obs.w - 8) / 3))
    ctx.fillStyle = '#080d1a'
    for (let i = 0; i < 3; i++) ctx.fillRect(obs.x + 4 + i * (gw + 3), GROUND - obs.h + 5, gw, obs.h - 8)
  }
}

function drawToken(ctx, tok, t) {
  if (tok.collected) return
  const blink = 0.65 + Math.sin(t * 0.003 + tok.phase) * 0.35
  ctx.save()
  ctx.globalAlpha = blink
  const g = ctx.createRadialGradient(tok.x, tok.y, 0, tok.x, tok.y, 13)
  g.addColorStop(0, 'rgba(251,191,36,0.22)')
  g.addColorStop(1, 'rgba(251,191,36,0)')
  ctx.fillStyle = g
  ctx.beginPath(); ctx.arc(tok.x, tok.y, 13, 0, Math.PI * 2); ctx.fill()
  ctx.translate(tok.x, tok.y)
  ctx.rotate(Math.PI / 4)
  ctx.fillStyle = '#fbbf24'
  ctx.fillRect(-5, -5, 10, 10)
  ctx.restore()
}

function drawHUD(ctx, score, speed, best) {
  ctx.save()
  ctx.font = '700 13px "Rajdhani", "Courier New", monospace'
  ctx.fillStyle = 'rgba(192,204,216,0.75)'
  ctx.fillText(`${score}`, 12, 22)
  ctx.font = '9px "Courier New", monospace'
  ctx.fillStyle = '#2a3a4a'
  ctx.fillText(`BEST ${best}`, 12, 36)
  ctx.textAlign = 'right'
  ctx.fillStyle = '#2a3a4a'
  ctx.fillText(`${speed.toFixed(1)}x`, W - 12, 22)
  ctx.restore()
}

function drawIdleOverlay(ctx) {
  ctx.save()
  ctx.font = '700 14px "Rajdhani", sans-serif'
  ctx.fillStyle = 'rgba(192,204,216,0.65)'
  ctx.textAlign = 'center'
  ctx.fillText('PRESS SPACE / TAP TO RUN', W / 2, H / 2 - 8)
  ctx.font = '9px "Courier New", monospace'
  ctx.fillStyle = '#3c5468'
  ctx.fillText('JUMP OVER CHIMNEYS · COLLECT BAT TOKENS', W / 2, H / 2 + 12)
  ctx.restore()
}

// ── component ──
export default function GameRunner({ onClose }) {
  const canvasRef    = useRef(null)
  const gameRef      = useRef(null)
  const rafRef       = useRef(null)
  const bestRef      = useRef(0)
  const [phase,      setPhase]      = useState('idle')
  const [uiScore,    setUiScore]    = useState(0)
  const [best,       setBest]       = useState(() => {
    const v = +localStorage.getItem('runner_best') || 0
    bestRef.current = v
    return v
  })

  const updateBest = useCallback((score) => {
    setBest(b => {
      const nb = Math.max(b, score)
      bestRef.current = nb
      localStorage.setItem('runner_best', nb)
      return nb
    })
  }, [])

  const initGame = () => ({
    playerY: GROUND - PAH,
    playerVY: 0,
    onGround: true,
    runPhase: 0,
    scroll: 0,
    score: 0,
    speed: BASE_SPEED,
    obstacles: [],
    tokens: [],
    nextObs: 260,
    nextTok: 160,
    dead: false,
    deathFrames: 0,
  })

  const loop = useCallback((ts) => {
    const g = gameRef.current
    const canvas = canvasRef.current
    if (!g || !canvas) return
    const ctx = canvas.getContext('2d')

    if (!g.dead) {
      g.speed = Math.min(BASE_SPEED + g.score * 0.006, BASE_SPEED * 2.4)
      g.scroll += g.speed
      g.score += g.speed * 0.05
      g.runPhase += 0.19

      // physics
      g.playerVY = Math.min(g.playerVY + GRAVITY, 18)
      g.playerY += g.playerVY
      if (g.playerY >= GROUND - PAH) {
        g.playerY = GROUND - PAH
        g.playerVY = 0
        g.onGround = true
      }

      // obstacles
      g.obstacles.forEach(o => { o.x -= g.speed })
      g.obstacles = g.obstacles.filter(o => o.x + o.w > -30)
      if (g.scroll >= g.nextObs) {
        const type = Math.random() < 0.54 ? 'chimney' : 'vent'
        const h = type === 'chimney' ? 52 + Math.random() * 36 : 26 + Math.random() * 12
        const w = type === 'chimney' ? 18 + Math.random() * 8 : 34 + Math.random() * 14
        g.obstacles.push({ type, x: W + 16, w, h })
        g.nextObs = g.scroll + 200 + Math.random() * 200 - g.speed * 4
      }

      // tokens
      g.tokens.forEach(t => { t.x -= g.speed })
      g.tokens = g.tokens.filter(t => t.x > -20)
      if (g.scroll >= g.nextTok) {
        g.tokens.push({ x: W + 16, y: GROUND - PAH - 20 - Math.random() * 48, phase: Math.random() * 6, collected: false })
        g.nextTok = g.scroll + 110 + Math.random() * 130
      }

      // token collection
      g.tokens.forEach(tok => {
        if (!tok.collected && Math.abs(tok.x - (PAX + 6)) < 18 && Math.abs(tok.y - (g.playerY + 20)) < 20) {
          tok.collected = true
          g.score += 25
        }
      })

      // collision
      const px = PAX + 2, py = g.playerY + 4, pw = PAW - 2, ph = PAH - 8
      for (const obs of g.obstacles) {
        const ow = obs.w - 2, ox = obs.x + 1, oh = obs.h - 2, oy = GROUND - oh
        if (px < ox + ow && px + pw > ox && py < oy + oh && py + ph > oy) {
          g.dead = true
          const final = Math.round(g.score)
          setPhase('dead')
          setUiScore(final)
          updateBest(final)
          break
        }
      }
    } else {
      g.deathFrames++
    }

    // render
    drawBg(ctx, g.scroll)
    drawGround(ctx)
    g.obstacles.forEach(o => drawObstacle(ctx, o))
    g.tokens.forEach(t => drawToken(ctx, t, ts))
    drawPlayer(ctx, g.playerY, g.playerVY, g.runPhase, g.dead)
    drawHUD(ctx, Math.round(g.score), g.speed / BASE_SPEED, bestRef.current)

    if (!g.dead || g.deathFrames < 55) {
      rafRef.current = requestAnimationFrame(loop)
    }
  }, [updateBest])

  const start = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    gameRef.current = initGame()
    setPhase('running')
    setUiScore(0)
    rafRef.current = requestAnimationFrame(loop)
  }, [loop])

  const doJump = useCallback(() => {
    const g = gameRef.current
    if (g && g.onGround && !g.dead) {
      g.playerVY = JUMP_V
      g.onGround = false
    }
  }, [])

  // idle canvas draw
  useEffect(() => {
    if (phase !== 'idle') return
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return
    drawBg(ctx, 0)
    drawGround(ctx)
    drawPlayer(ctx, GROUND - PAH, 0, 0, false)
    drawIdleOverlay(ctx)
  }, [phase])

  useEffect(() => {
    const onKey = (e) => {
      if (e.code !== 'Space' && e.code !== 'ArrowUp') return
      e.preventDefault()
      if (phase === 'idle' || phase === 'dead') start()
      else doJump()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase, start, doJump])

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }, [])

  const handlePointer = () => {
    if (phase === 'idle' || phase === 'dead') start()
    else doJump()
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', background: '#05080f' }}>
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          onPointerDown={handlePointer}
          style={{ maxWidth: '100%', cursor: 'pointer', display: 'block', touchAction: 'none' }}
        />

        {phase === 'dead' && (
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', gap: 8, background: 'rgba(5,8,15,0.72)',
          }}>
            <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: 13, fontWeight: 700, color: '#ef4444', letterSpacing: '0.3em' }}>MISSION FAILED</div>
            <div style={{ fontFamily: 'Courier New', fontSize: 10, color: '#3c5468' }}>
              SCORE: {uiScore} · BEST: {best}
            </div>
            <button onClick={start} style={{
              marginTop: 6, padding: '8px 18px', fontFamily: 'Courier New', fontSize: 10, cursor: 'pointer',
              background: 'rgba(192,204,216,0.07)', border: '1px solid rgba(192,204,216,0.2)', color: '#c0ccd8',
            }}>RETRY</button>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 14px', borderTop: '1px solid rgba(192,204,216,0.07)' }}>
        <span style={{ fontFamily: 'Courier New', fontSize: 9, color: '#2a3a4a' }}>SPACE / ↑ / TAP TO JUMP</span>
        <button onClick={onClose} style={{ fontFamily: 'Courier New', fontSize: 9, cursor: 'pointer', background: 'none', border: 'none', color: '#3c5468' }}>CLOSE</button>
      </div>
    </div>
  )
}
