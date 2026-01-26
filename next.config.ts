import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  images: {
    unoptimized: true
  },
  allowedDevOrigins: ["https://cdn.jsdelivr.net"],
  typescript:{
    ignoreBuildErrors: true
  }
};

export default nextConfig;
