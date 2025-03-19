/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  images: { domains: ["firebasestorage.googleapis.com"] },
};

module.exports = nextConfig;
