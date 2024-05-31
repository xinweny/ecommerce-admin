/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  experimental: {
    typedRoutes: true,
  },
  redirects: async () => ([
    {
      source: "/",
      destination: "/dashboard",
      permanent: true,
    },
  ]),
};

export default nextConfig;
