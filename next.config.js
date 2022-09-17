/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    INDEX_TITLE: process.env.TITLE
  }
}

module.exports = nextConfig
