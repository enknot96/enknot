import { createClient, type MicroCMSQueries } from "microcms-js-sdk";
import type { BlogPost, MicroCMSListResponse } from "@/types/blog";

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;

const client = serviceDomain && apiKey ? createClient({ serviceDomain, apiKey }) : null;

// microCMSの認証情報が未設定の間（ビルド時など）は空の一覧として振る舞う。
// 「まだ記事がありません」という通常の空状態表示になり、開発者向けの説明文が
// 本番の閲覧者に一瞬でも見える事態を避ける。
const MOCK_POSTS: BlogPost[] = [];

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
