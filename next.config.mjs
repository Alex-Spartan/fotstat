/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'media.api-sports.io',
                protocol: 'https',
            }
        ]
    }
};

export default nextConfig;
