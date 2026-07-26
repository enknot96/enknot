import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "ENKNOT｜AI × Web Developer",
  description: "Portfolio — AI & Engineering",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className="h-full antialiased"
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Geologica:wght@700;800&family=Roboto+Mono:wght@300;400;500;600;700&family=Noto+Sans+JP:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full bg-paper">
        <SmoothScrollProvider>
          {children}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
