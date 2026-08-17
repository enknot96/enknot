import { createClient, type MicroCMSQueries } from "microcms-js-sdk";
import type { BlogPost, MicroCMSListResponse } from "@/types/blog";

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;

const client = serviceDomain && apiKey ? createClient({ serviceDomain, apiKey }) : null;

// microCMSの認証情報が未設定の間（サービス作成前のローカル開発用）はモックデータで代替する。
const MOCK_POSTS: BlogPost[] = [
  {
    id: "mock-1",
    title: "サンプル記事タイトル",
    description: "microCMSの認証情報が未設定のため、モックデータを表示しています。",
    body: "<p>MICROCMS_SERVICE_DOMAIN / MICROCMS_API_KEY を設定すると、実際の記事が表示されます。</p>",
    publishedAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
  },
];

export async function getBlogList(
  queries?: MicroCMSQueries,
): Promise<MicroCMSListResponse<BlogPost>> {
  if (!client) {
    return { contents: MOCK_POSTS, totalCount: MOCK_POSTS.length, offset: 0, limit: MOCK_POSTS.length };
  }
  return client.getList<BlogPost>({ endpoint: "blogs", queries });
}

export async function getBlogDetail(contentId: string): Promise<BlogPost | null> {
  if (!client) {
    return MOCK_POSTS.find((post) => post.id === contentId) ?? null;
  }
  try {
    return await client.getListDetail<BlogPost>({ endpoint: "blogs", contentId });
  } catch {
    return null;
  }
}
