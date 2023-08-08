/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    loader: 'imgix',
    path: 'ohogame.shop',
  },
}

module.exports = nextConfig
