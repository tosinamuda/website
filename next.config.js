/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  assetPrefix: "https://tosinamuda.com/"
}

module.exports = {
  ...nextConfig,
};
