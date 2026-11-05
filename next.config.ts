import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // next.config.js
images: {
  remotePatterns: [
    { protocol: "https", hostname: "images.unsplash.com" },
    { protocol: "https", hostname: "via.placeholder.com" },
    {protocol: "https", hostname:"placehold.co"},
    { protocol: "https", hostname: "cdn.sanity.io" },
    { protocol: "https", hostname: "*.ytimg.com" },
    { protocol: "https", hostname: "api-web.icentra.com" },
    { protocol: "https", hostname: "*.r2.cloudflarestorage.com" },
  ],
},
};

export default nextConfig;
