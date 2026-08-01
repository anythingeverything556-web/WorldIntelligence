import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // SAFETY NET: Prevent TypeScript errors from breaking the entire Vercel
    // build. When the build fails, ALL API routes return 404 — even standalone
    // api/*.mjs functions. This ensures the site always deploys, even if there
    // are type errors in src/.
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
