/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    transpilePackages: ['kendo'],
    appDir: true,
  },
}

module.exports = nextConfig
