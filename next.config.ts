import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/about.html", destination: "/about", permanent: true },
      { source: "/viewrail-digital-quote.html", destination: "/viewrail-digital-quote", permanent: true },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/index.html" },
        { source: "/about", destination: "/about.html" },
        { source: "/viewrail-digital-quote", destination: "/viewrail-digital-quote.html" },
      ],
    };
  },
};

export default nextConfig;
