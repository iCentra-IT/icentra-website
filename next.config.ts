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
  //  unoptimized: false,
},
  async redirects() {
    return [
      // /careers was renamed to /career, and single job pages moved under
      // /career/opportunities/[slug] — redirect old links so nothing 404s.
      { source: "/careers", destination: "/career", permanent: true },
      { source: "/careers/opportunities", destination: "/career/opportunities", permanent: true },
      { source: "/careers/:slug", destination: "/career/opportunities/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
