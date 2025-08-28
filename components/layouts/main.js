import Head from 'next/head'
import dynamic from 'next/dynamic'
import NavBar from '../navbar'
import { Box, Container } from '@chakra-ui/react'
import Footer from '../footer'
import VoxelDogLoader from '../voxel-dog-loader'

const LazyVoxelDog = dynamic(() => import('../voxel-dog'), {
  ssr: false,
  loading: () => <VoxelDogLoader />
})
const MouseEffects = dynamic(() => import('../mouse-effects'), { ssr: false })
const BgmPlayer = dynamic(() => import('../bgm-player'), { ssr: false })

const Main = ({ children, router }) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const canonicalUrl = `${baseUrl}${router.asPath === '/' ? '' : router.asPath}`
  return (
    <Box as="main" pb={8} minH="100vh" display="flex" flexDirection="column">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="GuYueIsland - Minecraft 空岛插件，支持空岛生存管理，下载与文档。" />
        <meta name="author" content="GuYueIsland" />
        <meta name="robots" content="index, follow" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="twitter:title" content="GuYueIsland" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@GuYueIsland" />
        <meta name="twitter:creator" content="@GuYueIsland" />
        <meta name="twitter:image" content={`${baseUrl}/card.png`} />
        <meta property="og:site_name" content="GuYueIsland" />
        <meta name="og:title" content="GuYueIsland" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${baseUrl}/card.png`} />
        <meta property="og:url" content={canonicalUrl} />
        <title>GuYueIsland</title>
      </Head>

      <NavBar path={router.asPath} />
      <MouseEffects />

      <Box as="section" flex="1 0 auto">
        <Container maxW="container.md" pt={14}>
          {router.asPath !== '/' && <LazyVoxelDog />}
          {children}
        </Container>
      </Box>

      <Container as="footer" maxW="container.md" py={4}>
        <Footer />
      </Container>

      <BgmPlayer />
    </Box>
  )
}

export default Main
