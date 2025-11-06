/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['your-image-domain.com'], // Add external image domains here
  },
  experimental: {
    appDir: true, // Enable if you're using the /app directory structure
  },
  env: {
    CUSTOM_API_URL: process.env.CUSTOM_API_URL, // Example environment variable
  },
};

module.exports = nextConfig;
