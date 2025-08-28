import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {
  Box,
  Heading,
  Link as ChakraLink,
  Code as ChakraCode,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue
} from '@chakra-ui/react'

function slugify(text) {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

function extractHeadings(md) {
  const lines = (md || '').split(/\r?\n/)
  const headings = []
  for (const line of lines) {
    const m2 = line.match(/^##\s+(.+)/)
    const m3 = line.match(/^###\s+(.+)/)
    if (m2) headings.push({ depth: 2, text: m2[1], id: slugify(m2[1]) })
    else if (m3) headings.push({ depth: 3, text: m3[1], id: slugify(m3[1]) })
  }
  return headings
}

export default function Markdown({ content, showToc = true }) {
  const headings = showToc ? extractHeadings(content) : []
  const borderColor = useColorModeValue('blackAlpha.200', 'whiteAlpha.200')
  const codeBg = useColorModeValue('blackAlpha.50', 'whiteAlpha.100')

  return (
    <Box>
      {showToc && headings.length > 0 && (
        <Box
          borderWidth="1px"
          borderColor={borderColor}
          borderRadius="md"
          p={3}
          mb={6}
          fontSize="sm"
        >
          <Text mb={2} fontWeight="semibold" opacity={0.9}>目录</Text>
          {headings.map(h => (
            <Box key={h.id} pl={h.depth === 3 ? 4 : 0} mb={1}>
              <ChakraLink href={`#${h.id}`} color={useColorModeValue('teal.600', 'teal.300')}>
                {h.text}
              </ChakraLink>
            </Box>
          ))}
        </Box>
      )}

      <Box fontSize="sm" opacity={0.95}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h2({ node, children, ...props }) {
              const text = String(children?.[0] || '')
              const id = slugify(text)
              return (
                <Heading as="h2" size="md" id={id} mt={6} mb={3} {...props}>
                  {children}
                </Heading>
              )
            },
            h3({ node, children, ...props }) {
              const text = String(children?.[0] || '')
              const id = slugify(text)
              return (
                <Heading as="h3" size="sm" id={id} mt={5} mb={2} opacity={0.95} {...props}>
                  {children}
                </Heading>
              )
            },
            a({ node, children, href, ...props }) {
              return (
                <ChakraLink href={href} color={useColorModeValue('teal.600', 'teal.300')} {...props}>
                  {children}
                </ChakraLink>
              )
            },
            code({ inline, className, children, ...props }) {
              const language = (className || '').replace('language-', '')
              if (inline) {
                return (
                  <ChakraCode fontSize="0.85em" px={1} rounded="sm" {...props}>
                    {children}
                  </ChakraCode>
                )
              }
              return (
                <Box as="pre" p={3} bg={codeBg} borderRadius="md" overflowX="auto" mb={4}>
                  {language && (
                    <Text fontSize="xs" opacity={0.6} mb={2}>{language}</Text>
                  )}
                  <Box as="code" fontFamily="mono" fontSize="0.9em">
                    {children}
                  </Box>
                </Box>
              )
            },
            table({ children, ...props }) {
              return (
                <Box overflowX="auto" mb={4} {...props}>
                  <Table size="sm" variant="simple">
                    {children}
                  </Table>
                </Box>
              )
            },
            thead({ children, ...props }) {
              return <Thead {...props}>{children}</Thead>
            },
            tbody({ children, ...props }) {
              return <Tbody {...props}>{children}</Tbody>
            },
            tr({ children, ...props }) {
              return <Tr {...props}>{children}</Tr>
            },
            th({ children, ...props }) {
              return <Th {...props}>{children}</Th>
            },
            td({ children, ...props }) {
              return <Td {...props}>{children}</Td>
            },
            p({ children, ...props }) {
              return <Text mb={3} {...props}>{children}</Text>
            }
          }}
        >
          {content}
        </ReactMarkdown>
      </Box>
    </Box>
  )
}


