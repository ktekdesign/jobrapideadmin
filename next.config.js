/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com', 'avatar.vercel.sh', '0.gravatar.com',
    '1.gravatar.com',
    '2.gravatar.com',
    'secure.gravatar.com',
    'www.jobrapide.org',]
  },
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['@tremor/react']
  }
};

module.exports = nextConfig;
