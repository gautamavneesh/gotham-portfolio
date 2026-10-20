import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const M = { fontFamily: 'Courier New, monospace', letterSpacing: '0.07em' }

const INCIDENTS = [
  {
    id: 'disk',
    severity: 'P2',
    title: 'OpenSearch Indexing Backlog',
    context: 'Log ingestion stalling across all environments. Indexing lag growing rapidly. Triggered 02:15 UTC.',
    logs: [
      '[02:14:53] INFO  opensearch-master   disk watermark 87.2% on node data-02',
      '[02:15:01] WARN  opensearch-master   throttling writes: high watermark exceeded',
      '[02:15:03] ERROR opensearch-coord    FORBIDDEN: index write blocked — cluster_block_exception',
      '[02:15:04] ERROR log-ingestion-svc   failed to index batch 4422: 403 cluster_block_exception',
      '[02:15:04] WARN  log-ingestion-svc   retrying batch 4422 (attempt 1/3)',
      '[02:15:09] ERROR log-ingestion-svc   retry failed: 403 cluster_block_exception',
      '[02:15:12] ERROR lambda-forwarder    SQS queue depth: 14,822 messages (normal: <200)',
      '[02:15:19] WARN  alertmanager        firing: OPENSEARCH_INDEXING_BACKLOG threshold exceeded 4m',
    ],
    metrics: {
      label: 'OpenSearch Indexing Rate (docs/sec)',
      before: [3200, 3150, 3300, 3250, 3100, 3400, 3300, 3200],
      during: [2800, 1400, 400, 50, 20],
    },
    alerts: [
      { name: 'OPENSEARCH_DISK_WATERMARK_HIGH', thresh: '> 85%',    value: '87.2%',  firing: true  },
      { name: 'OPENSEARCH_INDEXING_BACKLOG',    thresh: '> 500/s',  value: '20/s',   firing: true  },
      { name: 'OPENSEARCH_SHARD_ALLOC_PAUSED',  thresh: 'any',      value: 'FIRED',  firing: true  },
      { name: 'LAMBDA_SQS_QUEUE_DEPTH',         thresh: '> 1,000',  value: '14,822', firing: true  },
      { name: 'OPENSEARCH_CLUSTER_STATUS',      thresh: 'green',    value: 'yellow', firing: true  },
      { name: 'PROMETHEUS_SCRAPE_TARGET',        thresh: 'up',       value: 'up',     firing: false },
    ],
    options: [
      'Lambda log forwarder hitting SQS rate limits — queue saturation blocking ingestion',
      'OpenSearch disk watermark at 87% — shard allocation throttled, all index writes blocked',
      'Prometheus pushing too many metrics, overloading the OpenSearch write path',
      'Alertmanager webhook misconfiguration causing duplicate delivery and backpressure',
    ],
    correct: 1,
    explanation: 'OpenSearch enforces a high watermark (default 85%) — once breached, it blocks new shard allocation and write operations to protect against disk-full failures. Node data-02 hit 87.2%, triggering a cluster block that rejected all indexing requests. The Lambda SQS queue ballooned as a side effect, not the cause. Fix: expand disk or delete old indices, then clear the block with PUT /_cluster/settings.',
  },
  {
    id: 'alertstorm',
    severity: 'P2',
    title: 'Alert Storm — 47 Conditions Firing',
    context: '47 New Relic alert conditions fired simultaneously at 14:30 UTC across all services. No deployment or traffic spike in progress.',
    logs: [
      '[14:30:02] INFO  nr-webhook-svc      alert: APP_LATENCY_HIGH — web-api (condition_id: 8821)',
      '[14:30:02] INFO  nr-webhook-svc      alert: APP_LATENCY_HIGH — auth-svc (condition_id: 8822)',
      '[14:30:02] INFO  nr-webhook-svc      alert: APP_ERROR_RATE — search-svc (condition_id: 8831)',
      '[14:30:03] WARN  nr-webhook-svc      alert burst: 47 conditions fired in 1.2s',
      '[14:30:03] INFO  nr-webhook-svc      all conditions share same evaluation window',
      '[14:30:04] INFO  terraform-gha       run #5821 applied: nr_alert_thresholds.tf — newrelic_nrql_alert_condition.latency_threshold',
      '[14:30:05] WARN  pagerduty-svc       incident MJ-1048 created (47 alerts merged)',
      '[14:30:08] INFO  nr-alert-engine     baseline p99 latency: 420ms | new threshold applied: 350ms',
    ],
    metrics: {
      label: 'New Relic Alerts Firing (count)',
      before: [0, 1, 0, 0, 2, 0, 1, 0],
      during: [0, 14, 36, 47, 47],
    },
    alerts: [
      { name: 'NR_APP_LATENCY_HIGH (×31)',   thresh: '> 350ms',  value: '420ms',   firing: true  },
      { name: 'NR_APP_ERROR_RATE (×9)',       thresh: '> 0.5%',   value: '0.8%',    firing: true  },
      { name: 'NR_APDEX_SCORE (×7)',          thresh: '< 0.85',   value: '0.82',    firing: true  },
      { name: 'PAGERDUTY_INCIDENT_VOLUME',    thresh: '< 5/hr',   value: '47/min',  firing: true  },
      { name: 'AWS_EC2_CPU_HIGH',             thresh: '> 80%',    value: '42%',     firing: false },
      { name: 'OPENSEARCH_CLUSTER_STATUS',    thresh: 'green',    value: 'green',   firing: false },
    ],
    options: [
      'AWS us-east-1 AZ failure — cascading service degradation across all apps',
      'SNS topic misconfiguration duplicating alert notifications 10×',
      'New Relic alert threshold lowered in Terraform PR below existing baseline — all services instantly breach',
      'DDoS attack hitting all B2B endpoints simultaneously causing latency spike',
    ],
    correct: 2,
    explanation: 'The Terraform run at 14:30:04 changed the NRQL alert condition threshold from 600ms to 350ms. Existing p99 latency was already sitting at ~420ms — under the old threshold but above the new one — so all 47 conditions fired immediately. No actual service degradation occurred. Fix: revert threshold to a value above current baseline, and add PR review gates for threshold changes in the IaC pipeline.',
  },
  {
    id: 'lambda',
    severity: 'P1',
    title: 'B2B API Timeouts — Response Spike',
    context: 'API Gateway response times spiking to 15s+. Timeout errors cascading across B2B services. 09:45 UTC.',
    logs: [
      '[09:44:51] ERROR lambda-b2b-api  REPORT RequestId:4f2e Duration:29341ms Memory:128MB MaxUsed:128MB',
      '[09:44:51] ERROR lambda-b2b-api  Runtime.ExitError: exit status 1 (OOM)',
      '[09:44:52] WARN  lambda-b2b-api  Init Duration: 4821.22ms (cold start after OOM kill)',
      '[09:44:58] ERROR lambda-b2b-api  REPORT RequestId:9c1a Duration:30000ms MaxUsed:128MB',
      '[09:45:01] ERROR api-gateway     Execution failed: Endpoint request timed out',
      '[09:45:03] WARN  lambda-b2b-api  concurrent executions: 143 / 150 (near throttle)',
      '[09:45:07] ERROR cloudwatch      ALARM: LAMBDA_DURATION_P99 — 29s > 10s threshold',
      '[09:45:09] ERROR cloudwatch      ALARM: API_GATEWAY_5XX_RATE — 18% > 1% threshold',
    ],
    metrics: {
      label: 'Lambda Duration P99 (ms)',
      before: [280, 310, 295, 320, 285, 300, 315, 290],
      during: [8200, 18500, 27800, 30000, 30000],
    },
    alerts: [
      { name: 'LAMBDA_DURATION_P99',       thresh: '> 10,000ms', value: '30,000ms', firing: true  },
      { name: 'LAMBDA_MEMORY_UTILIZATION', thresh: '> 90%',      value: '100%',     firing: true  },
      { name: 'LAMBDA_ERROR_RATE',         thresh: '> 1%',       value: '23%',      firing: true  },
      { name: 'API_GATEWAY_5XX_RATE',      thresh: '> 1%',       value: '18%',      firing: true  },
      { name: 'API_GATEWAY_LATENCY_P99',   thresh: '> 5,000ms',  value: '15,200ms', firing: true  },
      { name: 'OPENSEARCH_QUERY_LATENCY',  thresh: '> 2,000ms',  value: '340ms',    firing: false },
    ],
    options: [
      'RDS connection pool exhaustion — database queries timing out under concurrent load',
      'API Gateway throttle limit too low — requests queuing before reaching Lambda',
      'Lambda function hitting 128 MB memory limit — OOM kills cascading into cold starts on every invocation',
      'S3 cross-region replication latency causing Lambda trigger event delays',
    ],
    correct: 2,
    explanation: 'Lambda was provisioned at 128 MB — the minimum. When the function hit that limit, the runtime was killed (OOM), forcing a cold start (4.8s) for the next invocation. With 143 concurrent executions all hitting OOM → cold start → 30s timeout, API Gateway cascaded into 5XX errors. OpenSearch query latency was normal, ruling out a database issue. Fix: increase Lambda memory to 512 MB–1 GB. A CloudWatch alarm on MemoryUtilization > 85% would have caught this before impact.',
  },
]

function Sparkline({ before, during }) {
  const all = [...before, ...during]
  const max = Math.max(...all)
  const W = 240, H = 56
  const total = all.length
  const pts = all.map((v, i) => [i * (W / (total - 1)), H - 4 - ((v / max) * (H - 8))])
  const bPts = pts.slice(0, before.length)
  const dPts = pts.slice(before.length - 1)
  const toD = (p) => p.map((pt, i) => `${i === 0 ? 'M' : 'L'}${pt[0].toFixed(1)},${pt[1].toFixed(1)}`).join(' ')
  return (
    <svg width={W} height={H} style={{ overflow: 'visible', display: 'block' }}>
      <path d={toD(bPts)} fill="none" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" />
      <path d={toD(dPts)} fill="none" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
      <line x1={bPts[bPts.length - 1][0]} y1="0" x2={bPts[bPts.length - 1][0]} y2={H}
        stroke="rgba(239,68,68,0.22)" strokeWidth="1" strokeDasharray="3 2" />
    </svg>
  )
}

function AlertTable({ alerts }) {
  return (
    <div>
      <div style={{ display: 'flex', padding: '0 0 5px', borderBottom: '1px solid rgba(192,204,216,0.07)', marginBottom: 2 }}>
        {[['ALERT', 180], ['THRESHOLD', 72], ['CURRENT', 72], ['STATUS', 64]].map(([h, w]) => (
          <span key={h} style={{ ...M, fontSize: 8, color: '#2a3a4a', minWidth: w, textAlign: h === 'ALERT' ? 'left' : 'right' }}>{h}</span>
        ))}
      </div>
      {alerts.map(a => (
        <div key={a.name} style={{ display: 'flex', alignItems: 'center', padding: '4px 0', borderBottom: '1px solid rgba(192,204,216,0.04)' }}>
          <span style={{ ...M, fontSize: 9, color: '#3c5468', minWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.name}</span>
          <span style={{ ...M, fontSize: 9, color: '#2a3a4a', minWidth: 72, textAlign: 'right' }}>{a.thresh}</span>
          <span style={{ ...M, fontSize: 9, color: a.firing ? '#ef4444' : '#22c55e', minWidth: 72, textAlign: 'right' }}>{a.value}</span>
          <span style={{ ...M, fontSize: 8, minWidth: 64, textAlign: 'right', color: a.firing ? '#ef4444' : '#22c55e' }}>
            {a.firing ? '● ALARM' : '○ OK'}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function GameDetective({ onClose }) {
  const [idx,      setIdx]      = useState(0)
  const [phase,    setPhase]    = useState('case')
  const [tab,      setTab]      = useState('logs')
  const [selected, setSelected] = useState(null)
  const [score,    setScore]    = useState(0)
  const [elapsed,  setElapsed]  = useState(0)
  const [best,     setBest]     = useState(() => +localStorage.getItem('detective_best') || 0)

  const inc = INCIDENTS[idx]

  useEffect(() => {
    if (phase !== 'case' && phase !== 'guess') return
    const t = setInterval(() => setElapsed(e => e + 1), 1000)
    return () => clearInterval(t)
  }, [phase])

  useEffect(() => { setElapsed(0); setTab('logs'); setSelected(null) }, [idx])

  const pts = selected === inc.correct ? Math.max(50, 300 - elapsed * 4) : 0

  const handleGuess = () => {
    if (selected === null) return
    setScore(s => s + pts)
    setPhase('result')
  }

  const handleNext = () => {
    if (idx + 1 >= INCIDENTS.length) {
      const final = score + pts
      const newBest = Math.max(best, final)
      localStorage.setItem('detective_best', newBest)
      setBest(newBest)
      setPhase('done')
    } else {
      setIdx(i => i + 1)
      setPhase('case')
    }
  }

  const restart = () => { setIdx(0); setPhase('case'); setScore(0); setSelected(null) }

  const Btn = ({ children, onClick, dim }) => (
    <button onClick={onClick} style={{
      ...M, fontSize: 10, padding: '9px 18px', cursor: 'pointer',
      background: dim ? 'transparent' : 'rgba(192,204,216,0.07)',
      border: `1px solid ${dim ? 'rgba(192,204,216,0.1)' : 'rgba(192,204,216,0.18)'}`,
      color: dim ? '#3c5468' : '#c0ccd8',
    }}>{children}</button>
  )

  if (phase === 'done') {
    const final = score
    const isRecord = final >= best && final > 0
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, padding: 24 }}>
        <div style={{ ...M, fontSize: 9, color: '#2a3a4a', letterSpacing: '0.35em' }}>INVESTIGATION COMPLETE</div>
        <div style={{ fontFamily: "'Rajdhani',sans-serif", fontWeight: 700, fontSize: 56, color: isRecord ? '#00b8e0' : '#c0ccd8', lineHeight: 1 }}>{final}</div>
        <div style={{ ...M, fontSize: 9, color: '#3c5468' }}>BEST: {best}</div>
        {isRecord && <div style={{ ...M, fontSize: 9, color: '#00b8e0', letterSpacing: '0.3em' }}>NEW RECORD</div>}
        <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
          <Btn onClick={restart}>RETRY</Btn>
          <Btn onClick={onClose} dim>CLOSE</Btn>
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      {/* HUD */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 14px', borderBottom: '1px solid rgba(192,204,216,0.07)', flexShrink: 0 }}>
        <span style={{ ...M, fontSize: 9, color: '#2a3a4a' }}>CASE {idx + 1} / {INCIDENTS.length}</span>
        <span style={{ ...M, fontSize: 9, color: inc.severity === 'P1' ? '#ef4444' : '#f59e0b' }}>{inc.severity}</span>
        <span style={{ ...M, fontSize: 9, color: '#3c5468' }}>{elapsed}s · {score}pts</span>
      </div>

      {/* Context */}
      <div style={{ padding: '9px 14px', borderBottom: '1px solid rgba(192,204,216,0.05)', flexShrink: 0 }}>
        <div style={{ ...M, fontSize: 11, color: '#c0ccd8', marginBottom: 3 }}>{inc.title}</div>
        <div style={{ ...M, fontSize: 9, color: '#3c5468', lineHeight: 1.6 }}>{inc.context}</div>
      </div>

      <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        <AnimatePresence mode="wait">

          {phase === 'case' && (
            <motion.div key="case" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', borderBottom: '1px solid rgba(192,204,216,0.07)', flexShrink: 0 }}>
                {['LOGS', 'METRICS', 'ALERTS'].map(t => (
                  <button key={t} onClick={() => setTab(t.toLowerCase())} style={{
                    ...M, fontSize: 9, padding: '7px 14px', cursor: 'pointer',
                    background: 'none', border: 'none',
                    borderBottom: tab === t.toLowerCase() ? '1.5px solid #c0ccd8' : '1.5px solid transparent',
                    color: tab === t.toLowerCase() ? '#c0ccd8' : '#3c5468',
                  }}>{t}</button>
                ))}
              </div>

              <div style={{ flex: 1, padding: 14, overflowY: 'auto' }}>
                {tab === 'logs' && (
                  <div style={{ fontFamily: 'Courier New', fontSize: 9, lineHeight: 1.9 }}>
                    {inc.logs.map((log, i) => (
                      <div key={i} style={{ color: log.includes('ERROR') ? '#ef4444' : log.includes('WARN') ? '#f59e0b' : '#3c5468', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{log}</div>
                    ))}
                  </div>
                )}
                {tab === 'metrics' && (
                  <div>
                    <div style={{ ...M, fontSize: 8, color: '#2a3a4a', marginBottom: 10 }}>{inc.metrics.label}</div>
                    <Sparkline before={inc.metrics.before} during={inc.metrics.during} />
                    <div style={{ display: 'flex', gap: 14, marginTop: 10 }}>
                      {[['#22c55e', 'NORMAL'], ['#ef4444', 'INCIDENT']].map(([c, l]) => (
                        <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                          <div style={{ width: 18, height: 2, background: c }} />
                          <span style={{ ...M, fontSize: 8, color: '#2a3a4a' }}>{l}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {tab === 'alerts' && <AlertTable alerts={inc.alerts} />}
              </div>

              <div style={{ padding: '10px 14px', borderTop: '1px solid rgba(192,204,216,0.06)', flexShrink: 0 }}>
                <button onClick={() => setPhase('guess')} style={{
                  width: '100%', padding: '9px', ...M, fontSize: 10, cursor: 'pointer',
                  background: 'rgba(192,204,216,0.06)', border: '1px solid rgba(192,204,216,0.16)', color: '#c0ccd8',
                }}>IDENTIFY ROOT CAUSE →</button>
              </div>
            </motion.div>
          )}

          {phase === 'guess' && (
            <motion.div key="guess" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 14 }}>
              <div style={{ ...M, fontSize: 9, color: '#2a3a4a', marginBottom: 12, letterSpacing: '0.28em' }}>SELECT ROOT CAUSE:</div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 7 }}>
                {inc.options.map((opt, i) => (
                  <button key={i} onClick={() => setSelected(i)} style={{
                    padding: '9px 12px', textAlign: 'left', ...M, fontSize: 9, lineHeight: 1.65, cursor: 'pointer', transition: 'all 0.15s',
                    color: selected === i ? '#c0ccd8' : '#3c5468',
                    background: selected === i ? 'rgba(0,184,224,0.05)' : 'rgba(192,204,216,0.02)',
                    border: `1px solid ${selected === i ? 'rgba(0,184,224,0.22)' : 'rgba(192,204,216,0.07)'}`,
                  }}>
                    <span style={{ color: selected === i ? '#00b8e0' : '#2a3a4a', marginRight: 8 }}>
                      {selected === i ? '◉' : '○'}
                    </span>
                    {opt}
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                <Btn onClick={() => setPhase('case')} dim>← REVIEW</Btn>
                <button onClick={handleGuess} disabled={selected === null} style={{
                  flex: 1, padding: '9px', ...M, fontSize: 10,
                  cursor: selected !== null ? 'pointer' : 'default',
                  background: selected !== null ? 'rgba(192,204,216,0.07)' : 'transparent',
                  border: `1px solid ${selected !== null ? 'rgba(192,204,216,0.18)' : 'rgba(192,204,216,0.06)'}`,
                  color: selected !== null ? '#c0ccd8' : '#2a3a4a',
                }}>CONFIRM →</button>
              </div>
            </motion.div>
          )}

          {phase === 'result' && (
            <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ flex: 1, padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 18, color: selected === inc.correct ? '#22c55e' : '#ef4444' }}>
                  {selected === inc.correct ? '✓' : '✗'}
                </span>
                <div>
                  <div style={{ ...M, fontSize: 11, color: selected === inc.correct ? '#22c55e' : '#ef4444' }}>
                    {selected === inc.correct ? 'CORRECT DIAGNOSIS' : 'WRONG CALL'}
                  </div>
                  {selected === inc.correct && (
                    <div style={{ ...M, fontSize: 9, color: '#00b8e0', marginTop: 2 }}>+{pts} pts · {elapsed}s</div>
                  )}
                </div>
              </div>

              {selected !== inc.correct && (
                <div style={{ padding: '8px 10px', background: 'rgba(34,197,94,0.04)', border: '1px solid rgba(34,197,94,0.14)' }}>
                  <div style={{ ...M, fontSize: 8, color: '#2a3a4a', marginBottom: 4 }}>CORRECT:</div>
                  <div style={{ ...M, fontSize: 9, color: '#22c55e', lineHeight: 1.65 }}>{inc.options[inc.correct]}</div>
                </div>
              )}

              <div style={{ padding: '10px 12px', background: 'rgba(192,204,216,0.02)', border: '1px solid rgba(192,204,216,0.06)', flex: 1 }}>
                <div style={{ ...M, fontSize: 8, color: '#2a3a4a', marginBottom: 5 }}>ROOT CAUSE ANALYSIS:</div>
                <div style={{ ...M, fontSize: 9, color: '#7a9ab0', lineHeight: 1.78 }}>{inc.explanation}</div>
              </div>

              <button onClick={handleNext} style={{
                padding: '9px', width: '100%', ...M, fontSize: 10, cursor: 'pointer',
                background: 'rgba(192,204,216,0.07)', border: '1px solid rgba(192,204,216,0.18)', color: '#c0ccd8',
              }}>
                {idx + 1 < INCIDENTS.length ? 'NEXT INCIDENT →' : 'VIEW RESULTS →'}
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}
