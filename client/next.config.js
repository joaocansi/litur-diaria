/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true
    },
    serverExternalPackages: ['dynamoose']
};

module.exports = nextConfig;
