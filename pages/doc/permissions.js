import fs from 'fs'
import path from 'path'
import { Container, Heading, Box } from '@chakra-ui/react'
import Layout from '../../components/layouts/article'
import Markdown from '../../components/markdown'

export async function getStaticProps() {
  const readmePath = path.join(process.cwd(), 'public', 'README.md')
  let section = ''
  try {
    const md = fs.readFileSync(readmePath, 'utf8')
    const start = md.indexOf('## 权限节点')
    const end = md.indexOf('## GUI 一览')
    if (start >= 0) {
      section = md.slice(start, end > start ? end : undefined)
    }
  } catch {}
  return { props: { section } }
}

export default function Page({ section }) {
  return (
    <Layout title="权限">
      <Container>
        <Heading as="h2" variant="page-title" mb={4}>权限</Heading>
        <Box>
          <Markdown content={section || '暂无'} showToc={true} />
        </Box>
      </Container>
    </Layout>
  )
}


