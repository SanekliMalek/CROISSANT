import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  // Rewrites so clean public URLs map to /routes/* segments
  async rewrites() {
    return [
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
