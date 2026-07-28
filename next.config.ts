import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // All site imagery ships from /public. Serving it directly avoids coupling
  // local previews and static edge deployments to Cloudflare Images bindings.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
