import { forwardRef } from 'react'
import Logo from './logo'
import NextLink from 'next/link'
import {
  Container,
  Box,
  Link,
  Stack,
  Heading,
  Flex,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  IconButton,
  Button,
  MenuDivider,
  useColorModeValue
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import ThemeToggleButton from './theme-toggle-button'
// removed GitHub icon import

const LinkItem = ({ href, path, target, children, ...props }) => {
  const active = path === href
  const inactiveColor = useColorModeValue('gray.800', 'whiteAlpha.900')
  return (
    <Link
      as={NextLink}
      href={href}
      scroll={false}
      p={2}
      bg={active ? 'grassTeal' : undefined}
      color={active ? '#202023' : inactiveColor}
      target={target}
      {...props}
    >
      {children}
    </Link>
  )
}

const MenuLink = forwardRef((props, ref) => (
  <Link ref={ref} as={NextLink} {...props} />
))

const Navbar = props => {
  const { path } = props
  const docsActive = path && path.startsWith('/doc')

  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      bg={useColorModeValue('#ffffff40', '#20202380')}
      css={{ backdropFilter: 'blur(10px)' }}
      zIndex={2}
      {...props}
    >
      <Container
        display="flex"
        p={2}
        maxW="container.md"
        wrap="wrap"
        align="center"
        justify="space-between"
      >
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg" letterSpacing={'tighter'}>
            <Logo />
          </Heading>
        </Flex>

        <Stack
          direction={{ base: 'column', md: 'row' }}
          display={{ base: 'none', md: 'flex' }}
          width={{ base: 'full', md: 'auto' }}
          alignItems="center"
          flexGrow={1}
          mt={{ base: 4, md: 0 }}
        >
          <LinkItem href="/guyueisland" path={path}>
            GuYueIsland
          </LinkItem>

          <Menu isLazy>
            <MenuButton
              as={Button}
              variant="ghost"
              size="sm"
              px={2}
              bg={docsActive ? 'grassTeal' : undefined}
              color={docsActive ? '#202023' : useColorModeValue('gray.800', 'whiteAlpha.900')}
            >
              文档
            </MenuButton>
            <MenuList>
              <MenuItem as={MenuLink} href="/doc">总览</MenuItem>
              <MenuDivider />
              <MenuItem as={MenuLink} href="/doc/changelog">更新日志</MenuItem>
              <MenuItem as={MenuLink} href="/doc/commands">指令</MenuItem>
              <MenuItem as={MenuLink} href="/doc/permissions">权限</MenuItem>
              <MenuItem as={MenuLink} href="/doc/config">配置文件说明</MenuItem>
              <MenuItem as={MenuLink} href="/doc/gui">GUI 使用</MenuItem>
            </MenuList>
          </Menu>

          {/* GitHub 跳转已移除 */}
        </Stack>

        <Box flex={1} align="right">
          <ThemeToggleButton />

          <Box ml={2} display={{ base: 'inline-block', md: 'none' }}>
            <Menu isLazy id="navbar-menu">
              <MenuButton
                as={IconButton}
                icon={<HamburgerIcon />}
                variant="outline"
                aria-label="Options"
              />
              <MenuList>
                <MenuItem as={MenuLink} href="/guyueisland">GuYueIsland</MenuItem>
                <MenuItem as={MenuLink} href="/doc">文档 · 总览</MenuItem>
                <MenuDivider />
                <MenuItem as={MenuLink} href="/doc/changelog">更新日志</MenuItem>
                <MenuItem as={MenuLink} href="/doc/commands">指令</MenuItem>
                <MenuItem as={MenuLink} href="/doc/permissions">权限</MenuItem>
                <MenuItem as={MenuLink} href="/doc/config">配置文件说明</MenuItem>
                <MenuItem as={MenuLink} href="/doc/gui">GUI 使用</MenuItem>
                {/* 移除 GitHub 跳转 */}
              </MenuList>
            </Menu>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Navbar
