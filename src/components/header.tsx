"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "@/components/theme-provider";
import { SunIcon, MoonIcon } from "@/components/icons";
import { SocialLinks } from "@/components/social-links";

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
    let id: ReturnType<typeof setInterval> | null = null;

    function start() {
      setNow(new Date());
      id = setInterval(() => setNow(new Date()), 1000);
    }

    function stop() {
      if (id !== null) {
        clearInterval(id);
        id = null;
      }
    }

    function handleVisibilityChange() {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    }

    if (!document.hidden) start();
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
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
          <SocialLinks />
        </div>
      </div>
    </header>
  );
}
