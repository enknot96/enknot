"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";
import { useTheme } from "@/components/theme-provider";
import {
  GithubIcon,
  XIcon,
  NoteIcon,
  ZennIcon,
  DevIcon,
  SunIcon,
  MoonIcon,
} from "@/components/icons";

const SOCIAL_ICONS = {
  github: GithubIcon,
  x: XIcon,
  note: NoteIcon,
  zenn: ZennIcon,
  dev: DevIcon,
} as const;

function formatTime(date: Date) {
  return date.toLocaleTimeString("en-US", { hour12: false });
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="flex h-12 items-center gap-2 border-ui px-3 font-mono text-sm md:text-base">
      <div className="shrink-0 opacity-70">{pathname === "/" ? "/home" : pathname}</div>
      <div className="flex min-w-0 flex-1 items-center justify-center gap-2 md:gap-4">
        {now && (
          <>
            <span className="shrink-0 opacity-70">{formatTime(now)}</span>
            <span className="shrink-0 opacity-70">{formatDate(now)}</span>
          </>
        )}
      </div>
      <div className="flex shrink-0 items-center justify-end gap-4">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="テーマ切替"
          className="flex shrink-0 cursor-pointer items-center justify-center border-ui p-2 opacity-70 transition duration-200 ease-out hover:opacity-100 hover:text-(--color-accent)"
        >
          {theme === "light" ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
        </button>
        <div className="flex items-center gap-3 max-[560px]:hidden">
          {site.social.map((link) => {
            const Icon = SOCIAL_ICONS[link.icon];
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
                className="opacity-70 transition duration-200 ease-out hover:opacity-100 hover:text-(--color-accent)"
              >
                <Icon className="h-5 w-5" />
              </a>
            );
          })}
        </div>
      </div>
    </header>
  );
}
