/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Use the CDN in production and localhost for development.
  assetPrefix: isProd ? 'https://tosinamuda.com' : undefined,
}

module.exports = nextConfig
