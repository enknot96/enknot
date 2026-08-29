export const site = {
  brand: "ENKNOT",
  tagline: "AI × Web Developer",
  name: "Shuto",
  businessName: "屋号：ENKNOT（エンノット）",
  services: ["Web開発", "AI活用開発", "業務改善", "Web制作"],
  about:
    "営業時代に培った顧客対応や業務プロセスの知見を、エンジニアとしての仕事にも活かしています。<br>趣味は読書とキャンプ、子供の頃はサッカーに打ち込んでいました。",
  availability:
    "日中は本業のためチャットベースでの対応、実装は朝・夜間・週末を中心に進めるスタイルです。業務委託でのお仕事を受け付けています。",
  social: [
    { label: "GitHub", icon: "github", href: "https://github.com/enknot96" },
    { label: "X", icon: "x", href: "https://x.com/enknot96" },
    { label: "note", icon: "note", href: "https://note.com/enknot96" },
    { label: "Zenn", icon: "zenn", href: "https://zenn.dev/enknot96" },
    { label: "dev.to", icon: "dev", href: "https://dev.to/enknot96" },
  ],
  readingNow: {
    title: "世界99（下）",
    author: "村田沙耶香",
    coverSrc: "/reading-now.jpg",
  },
  contactEmail: {
    user: "info",
    domain: "enknot.dev",
  },
} as const;
