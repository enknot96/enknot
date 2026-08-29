import type { Metadata } from "next";
import { Anton, Source_Code_Pro, Zen_Kaku_Gothic_New } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { MobileNav } from "@/components/mobile-nav";
import { MobileFooter } from "@/components/mobile-footer";
import { MobileSocialBar } from "@/components/mobile-social-bar";
import { TerminalFrame } from "@/components/terminal-frame";
import { BootSequence } from "@/components/boot-sequence";

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
  document.documentElement.dataset.theme = stored || "dark";
} catch (e) {}
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      data-theme="dark"
      className={`${sourceCodePro.variable} ${zenKakuGothicNew.variable} ${anton.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="h-dvh overflow-hidden antialiased">
        <ThemeProvider>
          <BootSequence>
            <TerminalFrame>
              <Sidebar />
              <div className="flex-1 flex flex-col min-w-0 gap-2">
                <Header />
                <MobileNav />
                <main className="relative flex-1 min-h-0 border-ui overflow-y-auto">
                  {children}
                </main>
                <MobileSocialBar />
                <MobileFooter />
              </div>
            </TerminalFrame>
          </BootSequence>
        </ThemeProvider>
      </body>
    </html>
  );
}
