/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains:
      [
        "links.papareact.com",
        "images.unsplash.com",
        "fakestoreapi.com"
      ]
  },
  env: {
    BASE_URL: 'https://fakestoreapi.com/',
    stripe_public_key: process.env.STRIPE_PUBLIC_KEY
  },
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 50 * 1000,
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 5,
  },
}

module.exports = nextConfig
