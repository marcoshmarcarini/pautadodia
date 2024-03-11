/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.icons8.com',
        port: '',
        pathname: '/**',
      }
    ]
  },
  babel: {
    presets:["next/babel"],
    plugins: [],
  },
};

export default nextConfig;
