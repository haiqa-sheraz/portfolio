import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ Prevent ESLint warnings from breaking the build
  },
};

export default nextConfig;
