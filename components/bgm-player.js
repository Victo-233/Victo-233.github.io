import { useEffect, useRef, useState } from 'react'
import { Box, IconButton, Slider, SliderTrack, SliderFilledTrack, SliderThumb, useColorModeValue } from '@chakra-ui/react'
import { TriangleUpIcon, SmallCloseIcon } from '@chakra-ui/icons'

// 轻量 BGM 播放器：右下角悬浮，自动循环播放，支持音量与静音
// 音源可通过 NEXT_PUBLIC_BGM_URL 配置
const BgmPlayer = () => {
  const audioRef = useRef(null)
  const [volume, setVolume] = useState(0.4)
  const [muted, setMuted] = useState(false)
  const bg = useColorModeValue('whiteAlpha.800', 'blackAlpha.600')
  const border = useColorModeValue('blackAlpha.200', 'whiteAlpha.300')
  const src = process.env.NEXT_PUBLIC_BGM_URL || '/card.png' // 占位，避免 404；请配置正式音源

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = volume
  }, [volume])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = muted
  }, [muted])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    // 尝试自动播放（部分浏览器需用户交互才允许）
    const tryPlay = () => {
      audio.play().catch(() => {})
    }
    tryPlay()
    document.addEventListener('click', tryPlay, { once: true })
    return () => {
      document.removeEventListener('click', tryPlay)
    }
  }, [])

  return (
    <Box position="fixed" right={3} bottom={3} zIndex={3} bg={bg} borderWidth="1px" borderColor={border} rounded="md" px={3} py={2} boxShadow="md" display="flex" alignItems="center" gap={2}>
      <audio ref={audioRef} src={src} loop preload="none" />
      <IconButton aria-label={muted ? '取消静音' : '静音'} icon={muted ? <TriangleUpIcon /> : <SmallCloseIcon />} size="sm" onClick={() => setMuted(m => !m)} />
      <Slider aria-label='音量' value={Math.round(volume * 100)} onChange={v => setVolume(v / 100)} width="120px">
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Box>
  )
}

export default BgmPlayer


