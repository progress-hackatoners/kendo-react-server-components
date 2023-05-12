/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['kendo'],
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
