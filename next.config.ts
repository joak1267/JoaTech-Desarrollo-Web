import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.0.90", "192.168.0.90:3000", "localhost:3000"],
} as any;

export default nextConfig;
