/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://testing-learning-backend.onrender.com',
  },
  images: {
    domains: ['localhost'],
  },
}

module.exports = nextConfig



