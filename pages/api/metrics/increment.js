import { incrementMetric } from '../../../lib/metrics'

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' })
    return
  }
  const { type, file } = req.body || {}
  if (!type || (type !== 'view' && type !== 'download')) {
    res.status(400).json({ error: 'type 必须为 view 或 download' })
    return
  }
  const updated = incrementMetric(type, file)
  res.status(200).json({ ok: true, metrics: updated })
}


