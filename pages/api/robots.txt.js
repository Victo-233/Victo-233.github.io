export default function handler(req, res) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  res.setHeader('Content-Type', 'text/plain')
  res.send(`User-agent: *
Allow: /

Sitemap: ${baseUrl}/api/sitemap.xml
`)
}


