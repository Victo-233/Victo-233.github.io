import fs from 'fs'
import path from 'path'
import { Container, Heading, Text, Link, Button, Badge, Stack, AspectRatio } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import Layout from '../../components/layouts/article'

export async function getStaticProps() {
  const filesDir = path.join(process.cwd(), 'public', 'files')
  let version = ''
  let jarName = ''
  try {
    const entries = fs.existsSync(filesDir) ? fs.readdirSync(filesDir) : []
    const jar = entries.find(f => /^guyueisland-.*\.jar$/.test(f))
    jarName = jar || ''
    if (jar) {
      const m = jar.match(/^guyueisland-(.+)\.jar$/)
      version = m ? m[1] : ''
    }
  } catch {}

  return { props: { version, jarName } }
}

const GuyueIntro = ({ version, jarName }) => {
  const bvid = process.env.NEXT_PUBLIC_BILIBILI_BVID || 'BV1wRh1zwEZm'
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
    <Layout title="GuYueIsland">
      <Container textAlign="center">
        <Head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'GuYueIsland',
                operatingSystem: 'Cross-platform',
                applicationCategory: 'Game',
                description: 'Minecraft 空岛插件，现代、可配置，提供下载与文档。',
                offers: { '@type': 'Offer', price: '0', priceCurrency: 'CNY' },
                url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://victo-233.github.io') + '/guyueisland'
              })
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'VideoObject',
                name: 'GuYueIsland 演示视频',
                description: 'GuYueIsland 插件演示。',
                thumbnailUrl: [(process.env.NEXT_PUBLIC_SITE_URL || 'https://victo-233.github.io') + '/card.png'],
                uploadDate: new Date().toISOString(),
                contentUrl: `https://www.bilibili.com/video/${bvid}`,
                embedUrl: `https://player.bilibili.com/player.html?bvid=${bvid}`
              })
            }}
          />
        </Head>
        <Heading as="h2" variant="page-title" mb={2}>
          GuYueIsland <Badge ml={2} colorScheme="green">{version || '未知'}</Badge>
        </Heading>
        <Text mb={2} opacity={0.8}>Minecraft 空岛插件</Text>
        {metrics ? (
          <Text mb={6} fontSize="sm" opacity={0.7}>
            总浏览：{metrics.views} 次 · 总下载：{metrics.downloads} 次
          </Text>
        ) : (
          <Text mb={6} fontSize="sm" opacity={0.5}>正在加载统计...</Text>
        )}
        <Stack direction={{ base: 'column', sm: 'row' }} spacing={3} justify="center" align="center">
          {jarName ? (
            <Button as={Link} href={`/api/guyueisland/download?file=${encodeURIComponent(jarName)}`} colorScheme="teal">
              下载最新 ({jarName})
            </Button>
          ) : (
            <Button isDisabled>暂无构建</Button>
          )}
          <Button as={Link} href="/guyueisland/download" variant="outline">查看所有构建</Button>
        </Stack>

        <Stack mt={8} spacing={3} align="center">
          <Heading as="h3" fontSize={18}>演示视频</Heading>
          <AspectRatio ratio={16 / 9} w="full">
            <iframe
              src={`//player.bilibili.com/player.html?bvid=${bvid}&page=1&high_quality=1&danmaku=0`}
              allowFullScreen
              frameBorder="0"
            />
          </AspectRatio>
        </Stack>
      </Container>
    </Layout>
  )
}

export default GuyueIntro


