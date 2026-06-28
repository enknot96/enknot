export type Project = {
  slug: string;
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
    slug: "project-01",
    title: "Project 01",
    description: "短い説明文がここに入ります",
    longDescription:
      "プロジェクトの詳しい説明、背景、解決した課題などを書きます。",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    highlights: [
      "こだわったポイント1",
      "こだわったポイント2",
      "こだわったポイント3",
    ],
    thumbnail: "",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    slug: "project-02",
    title: "Project 02",
    description: "短い説明文がここに入ります",
    longDescription:
      "プロジェクトの詳しい説明、背景、解決した課題などを書きます。",
    techStack: ["React", "Node.js", "PostgreSQL"],
    highlights: ["こだわったポイント1", "こだわったポイント2"],
    thumbnail: "",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
  {
    slug: "project-03",
    title: "Project 03",
    description: "短い説明文がここに入ります",
    longDescription:
      "プロジェクトの詳しい説明、背景、解決した課題などを書きます。",
    techStack: ["Vue.js", "Firebase", "Tailwind CSS"],
    highlights: ["こだわったポイント1", "こだわったポイント2"],
    thumbnail: "",
    githubUrl: "https://github.com",
  },
];
