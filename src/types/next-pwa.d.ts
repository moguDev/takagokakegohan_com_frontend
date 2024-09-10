// src/types/next-pwa.d.ts
declare module "next-pwa" {
  import { NextConfig } from "next";

  interface PWAConfig {
    dest: string;
    register?: boolean;
    skipWaiting?: boolean;
    disable?: boolean;
    // 他のオプションも追加可能
  }

  const withPWA: (config: NextConfig) => NextConfig;
  export default withPWA;
}
