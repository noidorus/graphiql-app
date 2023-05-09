/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  babel: {
    presets: ['next/babel'],
    plugins: [['@swc-node/register']],
  },
};

module.exports = nextConfig;
