export type Project = {
  slug: string;
  thumbnail: string;
  category: string;
  type: "personal" | "client";
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  story?: string;
  highlights: string[];
  githubUrl?: string;
  liveUrl?: string;
  liveUrlLabel?: string;
  adminUrl?: string;
  demoVideoUrl?: string;
  demoAccounts?: { role: string; email: string; password: string }[];
  hostingNote?: string;
  relatedProject?: { slug: string; label: string };
};

export const projects: Project[] = [
  {
    slug: "realestate-aiagent",
    thumbnail: "/thumbnails/rs-aiagent.png",
    category: "AI Agent",
    type: "personal",
    title: "不動産物件検索AIエージェント",
    description: "物件探し〜内見予約を多段ツール連鎖で自律実行",
    longDescription:
      "Vercel AI SDK + Gemini を使い、物件検索・詳細確認・内見予約を複数ツールの連鎖で自律実行する AI エージェント。HMAC 署名による API 保護と Langfuse による LLM 可観測性を実装しました。",
    techStack: ["Next.js", "Vercel AI SDK", "Gemini", "HMAC", "Langfuse"],
    story:
      "自作の不動産業務管理APIを「道具」として使い、検索して答えるだけでなく、状況を判断して多段で行動するAIエージェントを作りたいと考えました。ハウスメーカー営業6年の経験を、条件緩和の判断ロジックに反映しています。",
    highlights: [
      "Human-in-the-loop承認ゲート（書き込みツール実行前にユーザー承認を要求、AI SDK v7のtoolApproval）",
      "HMAC署名による引数一致検証（承認内容と実行内容の改ざん・取り違えを防止。本番初回でモデルの時刻取り違えを実際にブロック）",
      "非決定的エージェントの品質保証（決定的ユニットテストと実モデルevalsを分離し、安全構造と判断の質を別々に検証）",
      "モデルフォールバック（503/429時に別モデルへ自動切替し実効レート枠を拡張）",
      "Langfuseによる可観測性（サーバーレス環境でのトレース欠落をafter()でのflushにより防止）",
      "検索0件時の自律的な条件緩和（前職の実務判断をルール化、こだわり条件は勝手に外さない）",
    ],
    githubUrl: "https://github.com/enknot96/realestate-aiagent",
    liveUrl: "https://realestate-aiagent.vercel.app/",
  },
  {
    slug: "job-match",
    thumbnail: "/thumbnails/job-match.png",
    category: "AI Web App",
    type: "personal",
    title: "応募者AIランキング",
    description: "ベクトル検索 × 全文検索 RRF融合の採用マッチング",
    longDescription:
      "TiDB のベクトル検索と全文検索を RRF（Reciprocal Rank Fusion）で融合し、Gemini によるエンべディングで応募者を職務要件にスコアリングする採用支援アプリです。",
    techStack: ["Next.js", "TiDB Vector", "Gemini", "RRF", "TypeScript"],
    story:
      "今の勤め先で「応募者の履歴書をAIにざっくり見てもらう」運用をする中で、まとまった応募を要件に合う順にランキングできたら楽なのでは、と思ったのがきっかけです。あわせて、気になっていたベクトル検索／RAGを手を動かして学ぶ目的も兼ねています。",
    highlights: [
      "ベクトル×全文検索のRRF融合（順位のみを使い、スケールの異なる2種のスコアを頑健に融合）",
      "ビフォー/アフター比較UI（意味検索だけでは埋もれがちな応募者をキーワード検索で「救済」、順位の変化をひと目で可視化）",
      "Gemini埋め込みによる意味検索（3072次元→1536次元に縮約しコストを抑制）",
      "上位候補のAI推薦理由生成（軽量モデルでストリーミング、レイテンシとコストを両立）",
      "TiDBで検索・リレーショナルを1テーブルに統合（検索専用エンジンを別立てしないシンプルな構成）",
      "破壊的APIの本番ガード（/api/seed等を環境判定で403化し誤爆を防止）",
      "デモ用の架空応募者30名分をあらかじめ投入済み — サイトを開いてすぐに検索を試せます",
    ],
    githubUrl: "https://github.com/enknot96/job-match",
    liveUrl: "https://job-match-alpha.vercel.app/",
  },
  {
    slug: "realestate-api",
    thumbnail: "/thumbnails/rs-api.png",
    category: "REST API",
    type: "personal",
    title: "不動産業務管理API",
    description: "物件・問い合わせ・内見予約の状態遷移管理",
    longDescription:
      "Hono + Drizzle ORM + Neon PostgreSQL で構築した不動産業務向け REST API。物件・問い合わせ・内見予約の CRUD と状態遷移を JWT 認証で保護し、Vitest でユニットテストを整備しました。",
    techStack: ["Hono", "TypeScript", "Drizzle ORM", "Neon", "Vitest", "Vercel"],
    story:
      "前職でハウスメーカーの営業を6年経験し、物件公開・問い合わせ・内見調整という業務フローや、そこで起こりがちな状態管理の問題を実務として理解しています。この経験を、実際に手を動かして学んだTypeScript/Hono/Drizzleで設計・実装し直しました。",
    highlights: [
      "状態遷移テーブルによるガード（ALLOWED_TRANSITIONSで許可された遷移のみ表現、それ以外は409で一律拒否）",
      "トランザクションのロールバック検証（2番目の処理を強制失敗させ、DBの実値でロールバックをテスト）",
      "所有権・可視性の認可設計（assertOwnershipの共通化＋未認証/エージェント/管理者で異なるWHERE句を動的構築）",
      "ドキュメントと実装の乖離防止（zodスキーマからOpenAPI仕様を自動生成、ルート定義は書き換えない）",
      "JWT認証（アクセストークン15分＋リフレッシュトークンのローテーション、httpOnly Cookie）",
      "空き枠をテーブルで持たない設計（営業時間枠と予約中の内見の重複計算で導出、整合性維持コストを回避）",
    ],
    githubUrl: "https://github.com/enknot96/realestate-api",
    liveUrl: "https://realestate-api-phi.vercel.app/docs",
    liveUrlLabel: "APIドキュメントを見る",
  },
  {
    slug: "bookstore",
    thumbnail: "/thumbnails/bookstore.png",
    category: "Web App",
    type: "personal",
    title: "オンライン書店 ECサイト",
    description: "決済・在庫管理・Cloudflare R2連携を備えたフルスタックEC",
    longDescription:
      "Laravel + Inertia.js + React で構築したフルスタック EC サイト。Stripe Checkout による決済フローと Webhook による注文確定、Cloudflare R2 への画像アップロード、商品CRUD・在庫管理機能を実装しました。",
    techStack: ["React", "Laravel", "Inertia.js", "Stripe", "Cloudflare R2"],
    story:
      "実案件で制作した児童書専門店のコーポレートサイトの世界観を下敷きに、「制作（静的サイト）→開発（動的EC）」への発展を見せることを目的に作りました。実在の店舗・商品・画像は使用せず、架空の絵本店として設計しています。",
    highlights: [
      "Stripe Checkout決済〜Webhookによる注文確定（署名検証・冪等な状態更新）",
      "商品CRUD・画像アップロード・カテゴリ複数選択（Cloudflare R2連携）",
      "論理削除によるゴミ箱機能（復元・一括操作対応）",
      "ロールベースの権限分離（admin/customerのミドルウェア制御）",
      "注文金額のスナップショット化（価格変更後も過去注文を保護）",
      "カテゴリ・対象年齢での絞り込み検索",
    ],
    githubUrl: "https://github.com/enknot96/bookstore",
    liveUrl: "https://bookstore-igf1.onrender.com/",
    adminUrl: "https://bookstore-igf1.onrender.com/admin",
    demoAccounts: [
      { role: "一般ユーザー", email: "customer@example.com", password: "password" },
      { role: "管理者", email: "admin@example.com", password: "password" },
    ],
    hostingNote: "初回アクセス時、Render無料プランの仕様上サーバー起動に数十秒かかる場合があります",
    relatedProject: { slug: "chienokinomi-books", label: "児童書専門店コーポレートサイトを見る" },
  },
  {
    slug: "acthouse",
    thumbnail: "/thumbnails/act.png",
    category: "Web制作",
    type: "client",
    title: "セブ島IT留学コーポレートサイト",
    description: "acthouse.net — WordPress",
    longDescription:
      "フィリピン・セブ島でIT・ビジネス・英語を統合した180日間の留学プログラムを提供する企業のコーポレートサイトを、デザイン・実装ともに担当してリニューアル。卒業生の転職・起業実績ギャラリーやカリキュラム紹介、コラム記事一覧などを WordPress で構築し、社内スタッフがコラム記事を日々投稿・更新できる管理画面も整備しました。",
    techStack: ["WordPress", "PHP", "HTML", "CSS"],
    story:
      "フィリピン・セブ島でIT留学プログラムを提供する企業様から、コーポレートサイトのリニューアルを受託しました。卒業生の実績や留学プログラムの魅力を、デザイン・実装の両面から伝えることを目指しました。",
    highlights: ["卒業生実績ギャラリー", "カリキュラム紹介ページ", "CMS 管理画面"],
    liveUrl: "https://acthouse.net/",
  },
  {
    slug: "chienokinomi-books",
    thumbnail: "/thumbnails/chiebook.png",
    category: "Web制作",
    type: "client",
    title: "児童書専門店コーポレートサイト",
    description: "chienokinomi-books.jp — WordPress",
    longDescription:
      "児童書専門店「ちえの木の実」のコーポレートサイトを、Figmaデザインをもとに WordPress で実装。約12,000冊の本棚や選書サービス、おはなし会といった店舗の魅力を伝えるコンテンツを構築し、運営スタッフが新着情報や店舗案内を手軽に更新できるCMS構成にしました。",
    techStack: ["WordPress", "PHP", "HTML", "CSS"],
    story:
      "児童書専門店「ちえの木の実」様から受託し、Figmaデザインをもとに実装しました。このサイトで手がけた世界観は、のちに「制作（静的サイト）→開発（動的EC）」への発展を見せるポートフォリオ作品として、オンライン書店ECサイトの土台にもなりました。",
    highlights: ["新着書籍情報", "店舗案内", "CMS 管理画面"],
    liveUrl: "https://www.chienokinomi-books.jp/",
    relatedProject: { slug: "bookstore", label: "オンライン書店ECサイトを見る" },
  },
  {
    slug: "primesign-3bs",
    thumbnail: "/thumbnails/prime.png",
    category: "Web制作",
    type: "client",
    title: "ガラス面広告サービス販売LP",
    description: "3Bs社「プライムサイン」販売用LP — GSAPアニメーション",
    longDescription:
      "店舗の窓を動く広告に変える集客ソリューション「プライムサイン」を、代理販売する3Bs社向けに制作したランディングページ。GSAPによるスクロールアニメーションで商品の訴求力を高め、問い合わせ導線を設計しました。",
    techStack: ["HTML", "CSS", "JavaScript", "GSAP"],
    story:
      "デザイン・実装に加えて営業提案までを一人で担当。ガラス面という新しい広告媒体の価値を、視覚的なアニメーションでどう伝えるかを意識して制作しました。",
    highlights: [
      "GSAPによるスクロール連動アニメーション",
      "ガラス面広告という新しい商材の価値をLP設計で可視化",
    ],
    liveUrl: "https://primesign-peacebiz-3bs.jp/",
  },
  {
    slug: "umigame-counseling",
    thumbnail: "/thumbnails/umigame.png",
    category: "Web制作",
    type: "client",
    title: "心理カウンセリング サービスサイト",
    description: "Umigame Counseling — セブ島発のオンライン/対面カウンセリングサイト",
    longDescription:
      "セブ島在住の公認心理師によるオンライン/対面カウンセリングサービスのサイト。仕事のストレスや子育て、キャリアの悩みに向き合うカウンセリングを、安心感のあるビジュアルと予約導線で伝えられるよう設計しました。",
    techStack: ["HTML", "CSS", "JavaScript", "GSAP", "Three.js", "TimeRex"],
    story:
      "デザイン・実装・営業提案まで一人で担当。心理カウンセリングという伝わりにくいテーマを、水面のような柔らかいビジュアル表現で補う設計にしました。",
    highlights: [
      "TimeRex埋め込みによるオンライン予約機能",
      "note連携によるブログ発信導線",
      "GSAP・Three.jsによる水面リップル/バルジ表現",
    ],
    liveUrl: "https://yukahaya.sunnyday.jp/",
  },
  {
    slug: "ava-utsunomiya",
    thumbnail: "/thumbnails/ava.png",
    category: "Web制作",
    type: "client",
    title: "カーコーティング専門店LP",
    description: "栃木県宇都宮市のカーコーティング専門店LP",
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
    thumbnail: "/thumbnails/marunage.png",
    category: "Web制作",
    type: "client",
    title: "EC販売支援コンサルLP",
    description: "まるなげ — Amazon・楽天のEC改善支援サービスLP",
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
];
