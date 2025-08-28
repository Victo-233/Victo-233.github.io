import { useEffect, useRef } from 'react'
import { Box, useColorModeValue } from '@chakra-ui/react'

const MouseEffects = () => {
  const canvasRef = useRef(null)
  const pointsRef = useRef([])
  const rafRef = useRef(0)
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
  const color = useColorModeValue('rgba(0, 0, 0, 0.12)', 'rgba(255, 255, 255, 0.18)')

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      const { innerWidth, innerHeight } = window
      canvas.width = Math.floor(innerWidth * dpr)
      canvas.height = Math.floor(innerHeight * dpr)
      canvas.style.width = `${innerWidth}px`
      canvas.style.height = `${innerHeight}px`
    }
    resize()

    const onMove = e => {
      const x = (e.clientX || 0) * dpr
      const y = (e.clientY || 0) * dpr
      pointsRef.current.push({ x, y, life: 1 })
      if (pointsRef.current.length > 120) pointsRef.current.shift()
    }

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < pointsRef.current.length; i++) {
        const p = pointsRef.current[i]
        const radius = 10 * p.life
        ctx.beginPath()
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.fill()
        p.life *= 0.94
      }
      pointsRef.current = pointsRef.current.filter(p => p.life > 0.03)
      rafRef.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [color, dpr])

  return (
    <Box position="fixed" inset={0} pointerEvents="none" zIndex={1}>
      <canvas ref={canvasRef} />
    </Box>
  )
}

export default MouseEffects


