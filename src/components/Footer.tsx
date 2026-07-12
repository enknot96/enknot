"use client";

import Image from "next/image";
import Container from "./ui/Container";

// 内部ナビ: どのページからでもトップの該当セクションへ飛べるよう絶対パス + ハッシュ
const NAV = [
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#work" },
];

// ブランドロゴ（公式マーク）。currentColor を継承するので文字色のhoverに追従。
function GitHubIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.51 11.51 0 0 1 3.003-.404c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.933Zm-1.291 19.487h2.039L6.486 3.24H4.298l13.312 17.4Z" />
    </svg>
  );
}

const SOCIAL = [
  { label: "GitHub", href: "https://github.com", icon: GitHubIcon },
  { label: "X", href: "https://x.com", icon: XIcon },
];

const linkClass =
  "inline-flex items-center gap-2 font-body text-subtle text-[14px] hover:text-ink transition-colors";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-line bg-paper">
      <Container>
        <div className="flex flex-col gap-10 py-16 md:flex-row md:items-start md:justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="/enknot.png"
              alt="ENKNOT"
              width={48}
              height={48}
              className="rounded-full border border-line"
            />
            <div>
              <p className="font-display font-bold text-ink text-[20px] tracking-[-0.02em]">
                ENKNOT
              </p>
              <p className="mt-1 font-body font-light text-subtle text-[13px]">
                AI × Web Developer
              </p>
            </div>
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
                {SOCIAL.map(({ label, href, icon: Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      <Icon />
                      {label}
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
