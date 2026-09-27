export type BlogPost = {
  title: string;
  link: string;
  date: string;
};

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// 取得はビルド時に一度だけ実行される（GitHub Actions の日次ビルドで更新）。
// 失敗を握りつぶすとサイトが空の状態で公開されてしまうため、例外はそのまま送出して
// ビルドを失敗させ、前回デプロイの内容を維持する。
// 正常に応答したが記事が 0 件の場合はエラーではないので、空配列を返す。
export async function fetchDevToPosts(username: string, limit: number): Promise<BlogPost[]> {
  const url = `https://dev.to/api/articles?username=${username}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch dev.to articles: ${url} (${res.status} ${res.statusText})`);
  }

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
}
