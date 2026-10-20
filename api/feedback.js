/**
 * Vercel serverless function — POST /api/feedback
 *
 * Authenticates with Salesforce via OAuth 2.0 Client Credentials flow
 * (no username/password needed — just Consumer Key + Secret) and creates
 * a Lead record from the portfolio contact form submission.
 *
 * Required env vars (Vercel project settings → Environment Variables):
 *   SF_CLIENT_ID      — Connected App Consumer Key
 *   SF_CLIENT_SECRET  — Connected App Consumer Secret
 *   SF_LOGIN_URL      — https://login.salesforce.com  (or test.salesforce.com for sandbox)
 */

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name = '', email = '', rating = 0, message = '' } = req.body ?? {}

  if (!email || !message) {
    return res.status(400).json({ error: 'email and message are required' })
  }

  const loginUrl = process.env.SF_LOGIN_URL || 'https://login.salesforce.com'

  // ── 1. Authenticate via Client Credentials flow ──────────────────────────────
  let access_token, instance_url

  try {
    const tokenRes = await fetch(`${loginUrl}/services/oauth2/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type:    'client_credentials',
        client_id:     process.env.SF_CLIENT_ID,
        client_secret: process.env.SF_CLIENT_SECRET,
      }),
    })

    if (!tokenRes.ok) {
      console.error('[SF auth]', await tokenRes.text())
      return res.status(502).json({ error: 'Salesforce authentication failed' })
    }

    ;({ access_token, instance_url } = await tokenRes.json())
  } catch (err) {
    console.error('[SF auth network]', err)
    return res.status(502).json({ error: 'Could not reach Salesforce' })
  }

  // ── 2. Build Lead payload ────────────────────────────────────────────────────
  // SF Lead Rating picklist: Hot / Warm / Cold
  const sfRating =
    rating >= 4 ? 'Hot'
    : rating >= 2 ? 'Warm'
    : rating >= 1 ? 'Cold'
    : undefined

  // SF requires LastName; split display name
  const parts     = name.trim().split(/\s+/).filter(Boolean)
  const firstName = parts.length > 1 ? parts.slice(0, -1).join(' ') : undefined
  const lastName  = parts[parts.length - 1] || 'Unknown'

  const payload = {
    LastName:    lastName,
    Email:       email,
    Company:     'Portfolio Visitor',
    LeadSource:  'Web',
    Description: `Portfolio rating: ${rating}/5\n\n${message}`,
    ...(firstName && { FirstName: firstName }),
    ...(sfRating  && { Rating:    sfRating  }),
  }

  // ── 3. Create Lead ───────────────────────────────────────────────────────────
  try {
    const leadRes = await fetch(`${instance_url}/services/data/v59.0/sobjects/Lead/`, {
      method: 'POST',
      headers: {
        Authorization:  `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!leadRes.ok) {
      console.error('[SF lead]', await leadRes.text())
      return res.status(502).json({ error: 'Failed to create Salesforce Lead' })
    }

    const { id } = await leadRes.json()
    return res.status(200).json({ success: true, id })
  } catch (err) {
    console.error('[SF lead network]', err)
    return res.status(502).json({ error: 'Lead request failed' })
  }
}
