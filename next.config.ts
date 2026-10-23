import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF d'abord : les photos denses (foules, stades) pèsent 2 à 3 fois moins
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75],
    // pas de palier 4K : personne n'affiche ces photos à 3840 px
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920],
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
      // la Coupe du Monde 2026 a laissé sa place à la Ligue des champions
      {
        source: "/:locale(fr|en|es|pt)/evenements/coupe-du-monde-2026",
        destination: "/:locale/evenements/champions-league",
        permanent: true,
      },
      // Wimbledon, US Open et Roland-Garros sont regroupés dans le Tennis Tour
      {
        source: "/:locale(fr|en|es|pt)/evenements/:slug(wimbledon|us-open|roland-garros)",
        destination: "/:locale/evenements/tennis-tour",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
