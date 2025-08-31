import fs from 'fs'
import path from 'path'
import { incrementMetric } from '../../../lib/metrics'

export default function handler(req, res) {
  const { file } = req.query
  if (!file || Array.isArray(file)) {
    res.status(400).json({ error: 'file 参数缺失' })
    return
  }
  const base = path.join(process.cwd(), 'public', 'files')
  const safe = path.basename(file)
  const full = path.join(base, safe)
  if (!fs.existsSync(full) || !fs.statSync(full).isFile()) {
    res.status(404).json({ error: '文件不存在' })
    return
  }
  try {
    incrementMetric('download', safe)
  } catch {}
  res.setHeader('Content-Type', 'application/java-archive')
  res.setHeader('Content-Disposition', `attachment; filename="${safe}"`)
  const stream = fs.createReadStream(full)
  stream.pipe(res)
}


