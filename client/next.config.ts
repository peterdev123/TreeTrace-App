import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  images: {
    domains: ["balkangraph.com", "cdn.balkangraph.com"],
  },
};

export default nextConfig;
