import { Container, Heading, Text, Link, List, ListItem } from '@chakra-ui/react'
import Layout from '../../components/layouts/article'
import fs from 'fs'
import path from 'path'

export async function getStaticProps() {
  const root = path.join(process.cwd(), 'public', 'files')
  let jars = []
  try {
    if (fs.existsSync(root)) {
      jars = fs.readdirSync(root).filter(f => /\.jar$/.test(f))
    }
  } catch {}
  return { props: { jars } }
}

const DownloadPage = ({ jars }) => (
  <Layout title="下载">
    <Container>
      <Heading as="h2" variant="page-title" mb={4}>GuYueIsland 下载</Heading>
      {jars && jars.length ? (
        <List spacing={2}>
          {jars.map(name => (
            <ListItem key={name}>
              <Link href={`/files/${encodeURIComponent(name)}`}>{name}</Link>
            </ListItem>
          ))}
        </List>
      ) : (
        <Text>未找到可下载的 JAR 文件。请将 .jar 文件放到 public/files/ 目录。</Text>
      )}
    </Container>
  </Layout>
)

export default DownloadPage


