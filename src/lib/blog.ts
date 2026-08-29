import { XMLParser } from "fast-xml-parser";

export type BlogPost = {
  title: string;
  link: string;
  date: string;
};

const parser = new XMLParser({ ignoreAttributes: false });

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

async function fetchRssPosts(url: string, limit: number): Promise<BlogPost[]> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
      next: { revalidate: 1800 },
    });
    if (!res.ok) return [];

    const xml = await res.text();
    const data = parser.parse(xml);
    const rawItems = data?.rss?.channel?.item;
    const items = Array.isArray(rawItems) ? rawItems : rawItems ? [rawItems] : [];

    return items.slice(0, limit).map((item) => ({
      title: String(item.title ?? ""),
      link: String(item.link ?? ""),
      date: formatDate(String(item.pubDate ?? "")),
    }));
  } catch {
    return [];
  }
}

export async function fetchNotePosts(username: string, limit: number): Promise<BlogPost[]> {
  return fetchRssPosts(`https://note.com/${username}/rss`, limit);
}

export async function fetchZennPosts(username: string, limit: number): Promise<BlogPost[]> {
  return fetchRssPosts(`https://zenn.dev/${username}/feed`, limit);
}

export async function fetchDevToPosts(username: string, limit: number): Promise<BlogPost[]> {
  try {
    const res = await fetch(`https://dev.to/api/articles?username=${username}`, {
      next: { revalidate: 1800 },
    });
    if (!res.ok) return [];

    const articles = (await res.json()) as Array<{
      title: string;
      url: string;
      published_at: string;
    }>;

    return articles.slice(0, limit).map((article) => ({
      title: article.title,
      link: article.url,
      date: formatDate(article.published_at),
    }));
  } catch {
    return [];
  }
}
