export type DemoAccount = {
  role: string;
  email: string;
  password: string;
};

export type TestCard = {
  number: string;
  expiry: string;
  cvc: string;
};

export type IntegratedSystem = {
  title: string;
  description: string;
  techStack: string[];
  story?: string;
  highlights: string[];
  githubUrl?: string;
  liveUrl?: string;
  liveUrlLabel?: string;
};

export type RelatedProject = {
  slug: string;
  label: string;
};

export type Project = {
  slug: string;
  name: string;
  category: "client" | "personal";
  description: string;
  tags: string[];
  longDescription: string;
  techStack: string[];
  story?: string;
  highlights: string[];
  githubUrl?: string;
  liveUrl?: string;
  liveUrlLabel?: string;
  adminUrl?: string;
  hostingNote?: string;
  demoAccounts?: DemoAccount[];
  demoNote?: string;
  testCard?: TestCard;
  relatedProject?: RelatedProject;
  integratedSystem?: IntegratedSystem;
};

export const projects: Project[] = [
  {
    slug: "cebu-it",
    name: "ACT HOUSE コーポレートサイト",
    category: "client",
    description: "卒業生実績ギャラリーとCMS管理画面を備えたWordPressサイト",
    tags: ["コーポレートサイト"],
    longDescription:
      "フィリピン・セブ島でIT・ビジネス・英語を統合した180日間の留学プログラムを提供する企業のコーポレートサイトを、デザイン・実装ともに担当してリニューアル。卒業生の転職・起業実績ギャラリーやカリキュラム紹介、コラム記事一覧などをWordPressで構築しました。",
    techStack: ["WordPress", "PHP"],
    story:
      "フィリピン・セブ島でIT留学プログラムを提供する企業様から、コーポレートサイトのリニューアルを受託。卒業生の実績や留学プログラムの魅力を、デザイン・実装の両面から伝えることを目指しました。",
    highlights: [
      "LINE連携の問い合わせ導線",
      "カリキュラム紹介ページ",
      "スタッフが記事を投稿・更新できるCMS管理画面",
    ],
    liveUrl: "https://acthouse.net/",
  },
  {
    slug: "chienokinomi-books",
    name: "ちえの木の実 コーポレートサイト",
    category: "client",
    description: "約12,000冊の本棚と選書サービスを紹介するWordPressサイト",
    tags: ["コーポレートサイト"],
    longDescription:
      "児童書専門店「ちえの木の実」のコーポレートサイトを、Figmaデザインをもとに WordPress で実装。約12,000冊の本棚や選書サービス、おはなし会といった店舗の魅力を伝えるコンテンツを構築しました。",
    techStack: ["WordPress", "PHP"],
    story:
      "児童書専門店「ちえの木の実」様から受託し、Figmaデザインをもとに実装。このサイトで手がけた世界観は、のちにオンライン書店ECサイトの土台にもなりました。",
    highlights: ["新着書籍情報", "店舗案内", "運営スタッフが更新できるCMS管理画面"],
    liveUrl: "https://www.chienokinomi-books.jp/",
    relatedProject: { slug: "bookstore", label: "オンライン書店ECサイトを見る" },
  },
  {
    slug: "umigame-counseling",
    name: "Umigame Counseling サービスサイト",
    category: "client",
    description: "水面のリップル表現とオンライン予約導線を設計",
    tags: ["サービスサイト"],
    longDescription:
      "セブ島在住の公認心理師によるオンライン/対面カウンセリングサービスのサイト。仕事のストレスや子育て、キャリアの悩みに向き合うカウンセリングを、安心感のあるビジュアルと予約導線で伝えられるよう設計しました。",
    techStack: ["Astro", "GSAP", "Three.js", "TimeRex"],
    story:
      "デザイン・実装・営業提案まで一人で担当。心理カウンセリングという伝わりにくいテーマを、水面のような柔らかいビジュアル表現で補う設計にしました。",
    highlights: [
      "TimeRex埋め込みによるオンライン予約機能",
      "noteと連携したブログ発信導線",
      "GSAP・Three.jsによる水面のリップル表現",
    ],
    liveUrl: "https://yukahaya.sunnyday.jp/",
  },
  {
    slug: "ava-utsunomiya",
    name: "ANJO VERIFY ANTI-AGING LP",
    category: "client",
    description: "施工実績とお客様の声で訴求する一気通貫のLP構成",
    tags: ["LP"],
    longDescription:
      "プロ職人による高級カーコーティングを提供する店舗のLPを制作。技術説明・料金プラン・施工実績・お客様の声までを掲載し、来店・問い合わせにつながる構成にしました。",
    techStack: ["HTML", "CSS", "JavaScript"],
    story:
      "デザインから実装、営業提案まで一人で担当。専門的な技術内容を、施工実績とお客様の声で裏付けながら伝える構成を意識しました。",
    highlights: [
      "ビフォーアフターによる施工実績訴求",
      "料金プラン・お客様の声・FAQを含む一気通貫のLP構成",
    ],
    liveUrl: "https://ava-utsunomiya.com/",
  },
  {
    slug: "marunage",
    name: "まるなげ EC販売支援LP",
    category: "client",
    description: "課題喚起から料金プランまで一気通貫で伝えるLP",
    tags: ["LP"],
    longDescription:
      "Amazon・楽天などのEC事業者向けに、現状分析から実行支援までを一括代行する「まるなげ」のサービスLPを制作。課題喚起から料金プラン、事例紹介まで、問い合わせにつながる訴求構成を設計しました。",
    techStack: ["HTML", "CSS", "JavaScript"],
    story:
      "デザインから実装、営業提案まで一人で担当。EC事業者が抱える「売れない理由がわからない」という悩みに寄り添う構成を意識しました。",
    highlights: [
      "課題喚起→根本原因→改善プロセスの訴求構成",
      "料金プラン・FAQ・事例紹介までワンページで完結",
    ],
    liveUrl: "https://www.marunage-rp.jp/",
  },
  {
    slug: "realestate-aiagent",
    name: "不動産物件検索AIエージェント",
    category: "personal",
    description: "検索から内見予約まで多段ツール連鎖で自律実行",
    tags: ["AI AGENT"],
    longDescription:
      "Vercel AI SDK + Gemini を使い、物件検索・詳細確認・内見予約を複数ツールの連鎖で自律実行するAIエージェント。HMAC署名によるAPI保護とLangfuseによるLLM可観測性を実装しました。",
    techStack: ["Next.js", "TypeScript", "Vercel AI SDK", "Gemini", "HMAC", "Langfuse"],
    story:
      "自作の不動産業務管理APIを「道具」として使い、検索して答えるだけでなく、状況を判断して多段で行動するAIエージェントを作りたいと考えました。ハウスメーカー営業6年の経験を、条件緩和の判断ロジックに反映しています。",
    highlights: [
      "Human-in-the-loop承認ゲート（HMAC署名で承認内容と実行内容の改ざん・取り違えを防止）",
      "決定的テストと実モデルevalsを分離した品質保証、Langfuseで可観測性を確保",
      "検索0件時の自律的な条件緩和（前職の実務判断をルール化）",
    ],
    githubUrl: "https://github.com/enknot96/realestate-aiagent",
    liveUrl: "https://realestate-aiagent.vercel.app/",
    integratedSystem: {
      title: "不動産業務管理API",
      description:
        "上のAIエージェントが「道具」として呼び出す、物件・問い合わせ・内見予約を管理するバックエンドAPI",
      techStack: ["Hono", "TypeScript", "Drizzle ORM", "Neon", "Vitest", "Vercel"],
      story:
        "前職でハウスメーカーの営業を6年経験し、物件公開・問い合わせ・内見調整という業務フローや、そこで起こりがちな状態管理の問題を実務として理解しています。",
      highlights: [
        "状態遷移テーブルとトランザクション制御によるデータ整合性の担保（許可外の遷移は409で拒否、失敗時はロールバック）",
        "JWT認証（アクセストークン15分＋リフレッシュローテーション）と、権限ごとに異なるWHERE句を構築する認可設計",
        "zodスキーマからOpenAPI仕様を自動生成",
      ],
      githubUrl: "https://github.com/enknot96/realestate-api",
      liveUrl: "https://realestate-api-phi.vercel.app/docs",
      liveUrlLabel: "APIドキュメントを見る",
    },
  },
  {
    slug: "job-match",
    name: "応募者AIランキング",
    category: "personal",
    description: "ベクトル×全文検索のRRF融合で採用マッチング",
    tags: ["AI"],
    longDescription:
      "TiDBのベクトル検索と全文検索をRRF（Reciprocal Rank Fusion）で融合し、Geminiによるエンベディングで応募者を職務要件にスコアリングする採用支援アプリです。",
    techStack: ["Next.js", "TypeScript", "TiDB Vector", "Gemini", "RRF"],
    story:
      "今の勤め先で「応募者の履歴書をAIにざっくり見てもらう」運用をする中で、まとまった応募を要件に合う順にランキングできたら楽なのでは、と思ったのがきっかけです。ベクトル検索／RAGを手を動かして学ぶ目的も兼ねています。",
    highlights: [
      "Gemini埋め込みによる意味検索と全文検索をRRFで融合（次元圧縮でコストを抑制）",
      "ビフォー/アフター比較UI（キーワード検索で埋もれがちな応募者を「救済」）",
      "上位候補のAI推薦理由をストリーミング生成",
    ],
    githubUrl: "https://github.com/enknot96/job-match",
    liveUrl: "https://job-match-alpha.vercel.app/",
  },
  {
    slug: "bookstore",
    name: "オンライン書店ECサイト",
    category: "personal",
    description: "Stripe決済と在庫管理を備えたフルスタックEC",
    tags: ["EC"],
    longDescription:
      "Laravel + Inertia.js + React で構築したフルスタックECサイト。Stripe Checkoutによる決済フローとWebhookによる注文確定、Cloudflare R2への画像アップロード、商品CRUD・在庫管理機能を実装しました。",
    techStack: ["React", "Laravel", "TypeScript", "Inertia.js", "Stripe", "Cloudflare R2"],
    story:
      "実案件で制作した児童書専門店のコーポレートサイトの世界観を下敷きに、「制作（静的サイト）→開発（動的EC）」への発展を見せることを目的に作りました。実在の店舗・商品・画像は使用せず、架空の絵本店として設計しています。",
    highlights: [
      "Stripe Checkout決済〜Webhookによる注文確定",
      "商品CRUD・画像アップロード・カテゴリ複数選択（Cloudflare R2連携）",
      "ロールベースの権限分離・論理削除によるゴミ箱機能・注文金額のスナップショット化で運用の安全性を担保",
    ],
    githubUrl: "https://github.com/enknot96/bookstore",
    liveUrl: "https://bookstore-igf1.onrender.com/",
    adminUrl: "https://bookstore-igf1.onrender.com/admin",
    demoAccounts: [
      { role: "一般ユーザー", email: "customer@example.com", password: "password" },
      { role: "管理者", email: "admin@example.com", password: "password" },
    ],
    demoNote:
      "ポートフォリオ公開用のデモアカウントです。決済はStripeのテストモードのみで動作します。",
    testCard: {
      number: "4242 4242 4242 4242",
      expiry: "任意の未来の日付",
      cvc: "任意の3桁",
    },
    hostingNote: "初回アクセス時、Render無料プランの仕様上サーバー起動に数十秒かかる場合があります",
    relatedProject: {
      slug: "chienokinomi-books",
      label: "ちえの木の実のコーポレートサイトを見る",
    },
  },
];
