import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  basePath: "/FreshCart",

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",
      },
    ],
  },
};

export default nextConfig;