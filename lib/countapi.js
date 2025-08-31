const ENDPOINT = 'https://api.countapi.xyz'

function nsKey(key) {
  const origin = (typeof window !== 'undefined' && window.location && window.location.host) || 'localhost'
  return `${origin}:${key}`
}

export async function increment(key) {
  const k = nsKey(key)
  const res = await fetch(`${ENDPOINT}/hit/${encodeURIComponent(k)}`)
  if (!res.ok) throw new Error('countapi increment failed')
  return res.json()
}

export async function get(key) {
  const k = nsKey(key)
  const res = await fetch(`${ENDPOINT}/get/${encodeURIComponent(k)}`)
  if (!res.ok) throw new Error('countapi get failed')
  return res.json()
}


