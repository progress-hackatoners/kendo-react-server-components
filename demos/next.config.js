/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['kendo'],
  experimental: {
    appDir: true,
    serverActions: true
  },
}

module.exports = nextConfig
