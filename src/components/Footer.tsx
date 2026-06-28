"use client";

import Container from "./ui/Container";

// 内部ナビ: どのページからでもトップの該当セクションへ飛べるよう絶対パス + ハッシュ
const NAV = [
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#work" },
];

// 外部リンク（URL は仮置き。後で差し替え）
const SOCIAL = [
  { label: "GitHub", href: "https://github.com" },
  { label: "X", href: "https://x.com" },
];

const linkClass = "font-body text-subtle text-[14px] hover:text-ink transition-colors";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-line bg-paper">
      <Container>
        <div className="flex flex-col gap-10 py-16 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display font-bold text-ink text-[20px] tracking-[-0.02em]">ENKNOT</p>
            <p className="mt-3 font-body font-light text-subtle text-[13px]">
              AI &amp; Engineering
            </p>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <nav>
              <p className="eyebrow mb-4">Navigation</p>
              <ul className="space-y-2">
                {NAV.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className={linkClass}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="eyebrow mb-4">Social</p>
              <ul className="space-y-2">
                {SOCIAL.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-line py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-body font-light text-faint text-[12px]">
            © {year} ENKNOT. All rights reserved.
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 font-display font-medium text-faint text-xs tracking-widest uppercase hover:text-ink transition-colors"
          >
            Back to top <span className="text-[10px]">↑</span>
          </button>
        </div>
      </Container>
    </footer>
  );
}
