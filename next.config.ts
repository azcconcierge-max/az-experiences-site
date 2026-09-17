import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF d'abord : les photos denses (foules, stades) pèsent 2 à 3 fois moins
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75],
  },
  async redirects() {
    return [
      // www -> domaine nu (une seule adresse canonique)
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.azexperiences.com" }],
        destination: "https://azexperiences.com/:path*",
        permanent: true,
      },
      {
        source: "/",
        destination: "/fr",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
