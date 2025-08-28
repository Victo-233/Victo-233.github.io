import { Container, Heading, Text, Button, Stack, Box, AspectRatio } from '@chakra-ui/react'
import Layout from '../components/layouts/article'
import NextLink from 'next/link'

export async function getStaticProps() { return { props: {} } }

export default function Home() {
  const raw = process.env.NEXT_PUBLIC_BILIBILI_EMBED || ''
  const toEmbed = (url) => {
    if (!url) return ''
    if (url.includes('player.bilibili.com')) return url
    const m = url.match(/BV[\w]+/i)
    const bvid = m ? m[0] : ''
    return bvid ? `https://player.bilibili.com/player.html?bvid=${bvid}&as_wide=1&high_quality=1&autoplay=0` : url
  }
  const embedSrc = toEmbed(raw)
  return (
    <Layout title="首页">
      <Container>
        <Heading as="h1" size="lg" mb={3}>
          GuYueIsland
        </Heading>
        <Text opacity={0.85} mb={6}>
          一个现代、可配置的 Minecraft 空岛生存管理插件。
        </Text>

        <Stack direction={{ base: 'column', sm: 'row' }} spacing={3}>
          <Button as={NextLink} href="/guyueisland" colorScheme="teal">
            了解插件
          </Button>
          <Button as={NextLink} href="/guyueisland/download" variant="outline">
            立即下载
          </Button>
        </Stack>

        {embedSrc && (
          <Box mt={8}>
            <AspectRatio ratio={16 / 9}>
              <iframe
                src={embedSrc}
                allowFullScreen
                frameBorder="0"
              />
            </AspectRatio>
          </Box>
        )}
      </Container>
    </Layout>
  )
}


