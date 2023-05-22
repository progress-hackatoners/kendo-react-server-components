/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  transpilePackages: ["kendo"],
  reactStrictMode: false,
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
