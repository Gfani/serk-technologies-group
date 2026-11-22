/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/about_us',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/about_us/:path*',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/services',
        destination: '/solutions',
        permanent: true,
      },
      {
        source: '/services/:path*',
        destination: '/solutions',
        permanent: true,
      },
      {
        source: '/contact_us',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/contact_us/:path*',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/insight',
        destination: '/insights',
        permanent: true,
      },
      {
        source: '/insight/:path*',
        destination: '/insights',
        permanent: true,
      },
      {
        source: '/category/:path*',
        destination: '/insights',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
