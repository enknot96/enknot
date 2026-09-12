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
  const isProjectDetail = pathname.startsWith("/projects/");
  const isProjectsList = pathname === "/projects";

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

  const renderPath = () => (
    <div className="min-w-0 truncate opacity-70">{pathname === "/" ? "/home" : pathname}</div>
  );

  const renderTimeDate = () => (
    <div className="flex items-center gap-2 md:gap-4">
      {now && (
        <>
          <span className="shrink-0 opacity-70">{formatTime(now)}</span>
          <span
            className={`shrink-0 opacity-70 ${
              isProjectDetail
                ? "max-[495px]:hidden"
                : isProjectsList
                  ? "max-[400px]:hidden"
                  : ""
            }`}
          >
            {formatDate(now)}
          </span>
        </>
      )}
    </div>
  );

  const renderActions = () => (
    <div className="flex min-w-0 items-center justify-end gap-4">
      <button
        type="button"
        onClick={toggleTheme}
        aria-label="テーマ切替"
        className="flex shrink-0 cursor-pointer items-center justify-center border-ui p-2 opacity-70 transition duration-200 ease-out hover:opacity-100 hover:text-(--color-accent)"
      >
        {theme === "light" ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
      </button>
      <div className="flex items-center gap-3 max-[680px]:hidden">
        <SocialLinks />
      </div>
    </div>
  );

  return (
    <header className="flex h-12 items-center border-ui px-3 font-mono text-sm md:text-base">
      <div className="hidden w-full min-[681px]:grid min-[681px]:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] min-[681px]:items-center min-[681px]:gap-2">
        {renderPath()}
        {renderTimeDate()}
        {renderActions()}
      </div>
      <div className="flex w-full items-center justify-between gap-2 min-[681px]:hidden">
        {renderPath()}
        <div className="flex min-w-0 items-center gap-2 md:gap-4">
          {renderTimeDate()}
          {renderActions()}
        </div>
      </div>
    </header>
  );
}
