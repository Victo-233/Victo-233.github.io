export default function handler(req, res) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://victo-233.github.io'
  const urls = [
    '',
    '/guyueisland',
    '/guyueisland/download',
    '/doc',
    '/doc/changelog',
    '/doc/commands',
    '/doc/permissions',
    '/doc/config',
    '/doc/gui'
  ]
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(path => {
    const loc = `${baseUrl}${path}`
    return `  <url><loc>${loc}</loc></url>`
  })
  .join('\n')}
</urlset>`
  res.setHeader('Content-Type', 'application/xml')
  res.status(200).send(body)
}


