export type Project = {
  slug: string;
  category: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  highlights: string[];
  thumbnail: string;
  githubUrl?: string;
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "acthouse",
    category: "Web 制作",
    title: "IT留学 コーポレートサイト",
    description: "acthouse.net — WordPress",
    longDescription:
      "IT留学を提供する会社のコーポレートサイトを WordPress で制作。施工事例ギャラリーや問い合わせフォームを実装し、社内スタッフが更新できる管理画面を整備しました。",
    techStack: ["WordPress", "PHP", "CSS"],
    highlights: ["施工事例ギャラリー", "問い合わせフォーム", "CMS 管理画面"],
    thumbnail: "",
    liveUrl: "https://acthouse.net/",
  },
  {
    slug: "chienokinomi-books",
    category: "Web 制作",
    title: "書店 コーポレートサイト",
    description: "chienokinomi-books.jp — WordPress",
    longDescription:
      "書店のコーポレートサイトを WordPress で制作。店舗情報・新着書籍情報の発信を中心に、運営スタッフが手軽に更新できる構成にしました。",
    techStack: ["WordPress", "PHP", "CSS"],
    highlights: ["新着書籍情報", "店舗案内", "CMS 管理画面"],
    thumbnail: "",
    liveUrl: "https://www.chienokinomi-books.jp/",
  },
  {
    slug: "bookstore",
    category: "Web App",
    title: "オンライン書店 EC サイト",
    description: "決済・在庫管理・S3 連携を備えたフルスタック EC",
    longDescription:
      "Laravel + Inertia.js + React で構築したフルスタック EC サイト。Stripe による決済フロー、AWS S3 への画像アップロード、在庫管理機能を実装しました。",
    techStack: ["Laravel", "PHP", "Inertia.js", "React", "Stripe", "AWS S3"],
    highlights: ["Stripe 決済フロー", "AWS S3 画像管理", "在庫・注文管理"],
    thumbnail: "",
  },
  {
    slug: "realestate-api",
    category: "REST API",
    title: "不動産業務管理 API",
    description: "物件・問い合わせ・内見予約の状態遷移管理",
    longDescription:
      "Hono + Drizzle ORM + Neon PostgreSQL で構築した不動産業務向け REST API。物件・問い合わせ・内見予約の CRUD と状態遷移を JWT 認証で保護し、Vitest でユニットテストを整備しました。",
    techStack: ["Hono", "TypeScript", "Drizzle ORM", "Neon", "Vitest", "Vercel"],
    highlights: ["JWT 認証", "状態遷移管理", "Vitest によるテスト整備"],
    thumbnail: "",
  },
  {
    slug: "job-match",
    category: "AI Web App",
    title: "応募者 AI ランキング",
    description: "ベクトル検索 × 全文検索 RRF 融合の採用マッチング",
    longDescription:
      "TiDB のベクトル検索と全文検索を RRF（Reciprocal Rank Fusion）で融合し、Gemini によるエンべディングで応募者を職務要件にスコアリングする採用支援アプリです。",
    techStack: ["Next.js", "TiDB Vector", "Gemini", "RRF", "TypeScript"],
    highlights: ["ベクトル × 全文検索 RRF", "Gemini エンべディング", "リアルタイムスコアリング"],
    thumbnail: "",
  },
  {
    slug: "realestate-aiagent",
    category: "AI Agent",
    title: "不動産 AI エージェント",
    description: "物件探し〜内見予約を多段ツール連鎖で自律実行",
    longDescription:
      "Vercel AI SDK + Gemini を使い、物件検索・詳細確認・内見予約を複数ツールの連鎖で自律実行する AI エージェント。HMAC 署名による API 保護と Langfuse による LLM 可観測性を実装しました。",
    techStack: ["Next.js", "Vercel AI SDK", "Gemini", "HMAC", "Langfuse"],
    highlights: ["多段ツール連鎖エージェント", "HMAC 署名認証", "Langfuse 可観測性"],
    thumbnail: "",
  },
];
