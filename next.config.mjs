/** @type {import('next').NextConfig} */

// @ts-ignore
import withPWA from "next-pwa";

const withPWA = nextPwa({
  dest: "public",
  register: true,
  skipWaiting: true,
});

const nextConfig = withPWA({
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "tamagokakegohan-com-backend.onrender.com",
        pathname: "/uploads/**",
      },
    ],
  },
});

export default nextConfig;
