import { Container, Heading, Text, Link, List, ListItem } from '@chakra-ui/react'
import { useEffect } from 'react'
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
  useEffect(() => {
    fetch('/api/metrics/increment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'view' })
    }).catch(() => {})
  }, [])

  return (
    <Layout title="下载">
      <Container>
        <Heading as="h2" variant="page-title" mb={4}>GuYueIsland 下载</Heading>
        {jars && jars.length ? (
          <List spacing={2}>
            {jars.map(j => (
              <ListItem key={j.name}>
                <Link href={`/api/guyueisland/download?file=${encodeURIComponent(j.name)}`}>{j.name}</Link>
                {j.createdAt ? ` （更新时间：${new Date(j.createdAt).toLocaleString('zh-CN', { hour12: false })}）` : ''}
              </ListItem>
            ))}
          </List>
        ) : (
          <Text>未找到可下载的 JAR 文件。请将 .jar 文件放到 public/files/ 目录。</Text>
        )}
      </Container>
    </Layout>
  )
}

export default DownloadPage


