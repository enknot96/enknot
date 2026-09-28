import type { Metadata } from "next";
import { Anton, Source_Code_Pro, Zen_Kaku_Gothic_New } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteChrome } from "@/components/site-chrome";
import { TerminalFrame } from "@/components/terminal-frame";
// import { BootSequence } from "@/components/boot-sequence";

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
  title: "ENKNOT | AI × Web Developer",
  description: "AI × Web Developer Shuto のポートフォリオ",
};

const THEME_INIT_SCRIPT = `
try {
  var stored = localStorage.getItem("enknot-theme");
  document.documentElement.dataset.theme = stored || "light";
} catch (e) {}
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      data-theme="light"
      suppressHydrationWarning
      className={`${sourceCodePro.variable} ${zenKakuGothicNew.variable} ${anton.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="h-dvh overflow-hidden antialiased">
        <ThemeProvider>
          {/* <BootSequence> */}
          <TerminalFrame>
            <SiteChrome>{children}</SiteChrome>
          </TerminalFrame>
          {/* </BootSequence> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
