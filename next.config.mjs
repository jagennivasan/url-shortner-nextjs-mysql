/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/:shortId',
            destination: '/api/:shortId',
          },
        ];
      },
};

export default nextConfig;
