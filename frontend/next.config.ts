import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname, // Always resolves to frontend/ regardless of cwd
  },

  // Allow images from Unsplash and other CDNs used in the existing app
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**.githubusercontent.com" },
    ],
  },
};

export default nextConfig;
