const { i18n } = require('./next-i18next.config')

const nextConfig = {
  reactStrictMode: true,
  i18n,
  images: {
    domains: ["127.0.0.1:5001", "127.0.0.1", "192.168.98.31", "source.unsplash.com"],
  },
  async rewrites() {
    return [
      {
        source: '/_next/:path*',
        destination: '/blogadmin/_next/:path*',
      },
    ]
  },
}

module.exports = nextConfig
