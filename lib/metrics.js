import fs from 'fs'
import path from 'path'

const METRICS_DIR = path.join(process.cwd(), 'data')
const METRICS_FILE = path.join(METRICS_DIR, 'metrics.json')

function ensureMetricsFile() {
  if (!fs.existsSync(METRICS_DIR)) {
    fs.mkdirSync(METRICS_DIR, { recursive: true })
  }
  if (!fs.existsSync(METRICS_FILE)) {
    const initial = { views: 0, downloads: 0, perFileDownloads: {} }
    fs.writeFileSync(METRICS_FILE, JSON.stringify(initial, null, 2), 'utf8')
  }
}

export function readMetrics() {
  ensureMetricsFile()
  try {
    const raw = fs.readFileSync(METRICS_FILE, 'utf8')
    const data = JSON.parse(raw)
    return {
      views: Number(data.views) || 0,
      downloads: Number(data.downloads) || 0,
      perFileDownloads: data.perFileDownloads && typeof data.perFileDownloads === 'object' ? data.perFileDownloads : {}
    }
  } catch {
    return { views: 0, downloads: 0, perFileDownloads: {} }
  }
}

export function incrementMetric(type, fileName) {
  ensureMetricsFile()
  const metrics = readMetrics()
  if (type === 'view') {
    metrics.views += 1
  } else if (type === 'download') {
    metrics.downloads += 1
    if (fileName) {
      const key = String(fileName)
      metrics.perFileDownloads[key] = (metrics.perFileDownloads[key] || 0) + 1
    }
  }
  fs.writeFileSync(METRICS_FILE, JSON.stringify(metrics, null, 2), 'utf8')
  return metrics
}

export function getMetrics() {
  return readMetrics()
}


