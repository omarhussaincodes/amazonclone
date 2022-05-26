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
    BASE_URL: 'https://fakestoreapi.com/'
  }
}

module.exports = nextConfig
