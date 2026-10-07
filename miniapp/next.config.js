const backendUrl = process.env.BACKEND_URL || 'http://127.0.0.1:8085';

const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
