import { getMetrics } from '../../../lib/metrics'

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method Not Allowed' })
    return
  }
  const metrics = getMetrics()
  res.status(200).json({ ok: true, metrics })
}


