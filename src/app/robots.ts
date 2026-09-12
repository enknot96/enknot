import type { MetadataRoute } from "next";

// 静的エクスポート（output: "export"）では、ビルド時に生成することを明示する必要がある
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://enknot.dev/sitemap.xml",
  };
}
