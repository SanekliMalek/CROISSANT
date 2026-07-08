import type { NextConfig } from "next";
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const frontendRoot = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: frontendRoot,
  },
  // Rewrites so clean public URLs map to /routes/* segments
  async rewrites() {
    return [
      { source: "/api/:path*", destination: "http://127.0.0.1:3001/api/:path*" },
      { source: "/activities", destination: "/routes/activities" },
      { source: "/adhesion", destination: "/routes/adhesion" },
      { source: "/team", destination: "/routes/team" },
      { source: "/admin", destination: "/routes/admin" },
      { source: "/conditions", destination: "/routes/conditions" },
      { source: "/confidentialite", destination: "/routes/confidentialite" },
      { source: "/mentions-legales", destination: "/routes/mentions-legales" },
    ];
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
