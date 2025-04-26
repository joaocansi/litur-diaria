/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true
    },
    serverExternalPackages: ['dynamoose', 'stripe']
};

module.exports = nextConfig;
