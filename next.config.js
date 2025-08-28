module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    // 在此配置 B 站播放器地址，可通过 .env.local 覆盖：
    // NEXT_PUBLIC_BILIBILI_EMBED="https://player.bilibili.com/player.html?bvid=BVxxxxxxxxx&as_wide=1&high_quality=1&autoplay=0"
    NEXT_PUBLIC_BILIBILI_EMBED:
      process.env.NEXT_PUBLIC_BILIBILI_EMBED ||
      'https://www.bilibili.com/video/BV1wRh1zwEZm/'
  },
  
}
