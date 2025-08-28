export default function handler(req, res) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://victo-233.github.io'
  res.setHeader('Content-Type', 'text/plain')
  res.send(`User-agent: *
Allow: /

Sitemap: ${baseUrl}/api/sitemap.xml
`)
}


