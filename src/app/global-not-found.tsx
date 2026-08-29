import type { Metadata } from "next";
import { Anton, Source_Code_Pro, Zen_Kaku_Gothic_New } from "next/font/google";
import "./globals.css";
import { NotFoundTerminal } from "@/components/not-found-terminal";

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
  subsets: ["latin"],
});

const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  variable: "--font-zen-kaku-gothic-new",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://enknot.dev"),
  title: "404 Not Found | ENKNOT",
  description: "お探しのページは見つかりませんでした。",
};

const THEME_INIT_SCRIPT = `
try {
  var stored = localStorage.getItem("enknot-theme");
  document.documentElement.dataset.theme = stored || "dark";
} catch (e) {}
`;

export default function GlobalNotFound() {
  return (
    <html
      lang="ja"
      data-theme="dark"
      className={`${sourceCodePro.variable} ${zenKakuGothicNew.variable} ${anton.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="h-dvh antialiased">
        <NotFoundTerminal />
      </body>
    </html>
  );
}
