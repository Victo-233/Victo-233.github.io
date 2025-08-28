import { Container, Heading, Box, Text, SimpleGrid, LinkBox, LinkOverlay, Badge } from '@chakra-ui/react'
import Layout from '../components/layouts/article'

export async function getStaticProps() { return { props: {} } }

const cards = [
  { href: '/guyueisland', title: '插件介绍', desc: '功能概览与项目简介', badge: 'Overview' },
  { href: '/guyueisland/download', title: '下载页面', desc: '获取最新构建文件', badge: 'Download' },
  { href: '/doc/changelog', title: '更新日志', desc: '版本变化与修复记录', badge: 'Changelog' },
  { href: '/doc/commands', title: '指令', desc: '命令用法与参数说明', badge: 'Commands' },
  { href: '/doc/permissions', title: '权限', desc: '权限节点与分配建议', badge: 'Permissions' },
  { href: '/doc/config', title: '配置文件说明', desc: '配置项详解与示例', badge: 'Config' },
  { href: '/doc/gui', title: 'GUI 使用', desc: '图形界面与交互介绍', badge: 'GUI' }
]

const DocPage = () => (
  <Layout title="文档">
    <Container>
      <Heading as="h2" variant="page-title" mb={4}>文档</Heading>
      <Box mb={6}>
        <Text opacity={0.9}>这里收纳与 GuYueIsland 相关的参考资料与链接。</Text>
      </Box>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 2 }} spacing={4}>
        {cards.map(card => (
          <LinkBox
            key={card.href}
            p={4}
            borderWidth="1px"
            borderRadius="md"
            transition="all 200ms ease"
            _hover={{ transform: 'translateY(-2px)', shadow: 'md' }}
          >
            <Badge colorScheme="green" mb={2}>{card.badge}</Badge>
            <Heading as="h3" fontSize="lg" mb={1}>
              <LinkOverlay href={card.href}>{card.title}</LinkOverlay>
            </Heading>
            <Text fontSize="sm" opacity={0.85}>{card.desc}</Text>
          </LinkBox>
        ))}
      </SimpleGrid>
    </Container>
  </Layout>
)

export default DocPage


