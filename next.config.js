/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')();

const nextConfig = {
  images: {
    domains: ['cdn.sanity.io'],
  },
  reactStrictMode: false,
};

module.exports = withNextIntl(nextConfig);
