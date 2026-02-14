import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.cdn.kaufland.de",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
      {
        protocol: "https",
        hostname: "crdms.images.consumerreports.org",
      },
      {
        protocol: "https",
        hostname: "oneearpod.com",
      },
    ],
  },
};

export default nextConfig;
