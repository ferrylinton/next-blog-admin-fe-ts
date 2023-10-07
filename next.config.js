const { i18n } = require('./next-i18next.config')

const nextConfig = {
  reactStrictMode: true,
  i18n,
  images: {
    domains: ["127.0.0.1:5001", "127.0.0.1", "source.unsplash.com"],
  }
}

module.exports = nextConfig
