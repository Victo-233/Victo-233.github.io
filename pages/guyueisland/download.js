import { Container, Heading, Text, Link, List, ListItem, Box } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import Layout from '../../components/layouts/article'
import fs from 'fs'
import path from 'path'

export async function getStaticProps() {
  const root = path.join(process.cwd(), 'public', 'files')
  let jars = []
  try {
    if (fs.existsSync(root)) {
      jars = fs.readdirSync(root)
        .filter(f => /\.jar$/.test(f))
        .map(name => {
          const full = path.join(root, name)
          let createdAt = null
          try {
            const stat = fs.statSync(full)
            const t = stat.birthtime || stat.ctime
            createdAt = t ? t.toISOString() : null
          } catch {}
          return { name, createdAt }
        })
    }
  } catch {}
  return { props: { jars } }
}

const DownloadPage = ({ jars }) => {
  const [metrics, setMetrics] = useState(null)
  useEffect(() => {
    try {
      const key = 'metrics:view:' + (typeof window !== 'undefined' ? window.location.pathname : 'unknown')
      const last = typeof window !== 'undefined' ? window.sessionStorage.getItem(key) : null
      const now = Date.now()
      if (!last || now - Number(last) > 3000) {
        fetch('/api/metrics/increment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: 'view' })
        }).catch(() => {})
        if (typeof window !== 'undefined') {
          window.sessionStorage.setItem(key, String(now))
        }
      }
    } catch {}
  }, [])

  useEffect(() => {
    fetch('/api/metrics')
      .then(r => r.json())
      .then(d => setMetrics(d.metrics))
      .catch(() => {})
  }, [])

  return (
    <Layout title="下载">
      <Container>
        <Heading as="h2" variant="page-title" mb={4}>GuYueIsland 下载</Heading>
        {metrics ? (
          <Box mb={3} fontSize="sm" opacity={0.7}>
            总浏览：{metrics.views} 次 · 总下载：{metrics.downloads} 次
          </Box>
        ) : null}

        {jars && jars.length ? (
          <List spacing={2}>
            {jars.map(j => {
              const count = metrics && metrics.perFileDownloads ? (metrics.perFileDownloads[j.name] || 0) : 0
              return (
                <ListItem key={j.name}>
                  <Link href={`/api/guyueisland/download?file=${encodeURIComponent(j.name)}`}>{j.name}</Link>
                  {j.createdAt ? ` （更新时间：${new Date(j.createdAt).toLocaleString('zh-CN', { hour12: false })}）` : ''}
                  {`  · 下载：${count} 次`}
                </ListItem>
              )
            })}
          </List>
        ) : (
          <Text>未找到可下载的 JAR 文件。请将 .jar 文件放到 public/files/ 目录。</Text>
        )}
      </Container>
    </Layout>
  )
}

export default DownloadPage


