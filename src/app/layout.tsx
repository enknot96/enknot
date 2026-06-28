import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "enknot",
  description: "Portfolio — Design & Engineering",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full antialiased">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full" style={{ background: "#FAFAFA" }}>
        {children}
      </body>
    </html>
  );
}
