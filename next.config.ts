import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.cc",
        pathname: "/i1/**",
      },
    ],
  },
  reactCompiler: true,
  reactStrictMode: true,
};

export default nextConfig;
