import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/freshcart",

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