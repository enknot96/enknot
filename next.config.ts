import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    // ローカル開発でNAT64ネットワークだとNext.jsの画像最適化がプライベートIPと誤検知するため、
    // 開発時のみ最適化をスキップして直接画像を表示する（本番ビルドには影響しない）。
    unoptimized: process.env.NODE_ENV !== "production",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
      },
    ],
  },
};

export default nextConfig;
