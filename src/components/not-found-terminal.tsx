"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { useTerminalTypewriter, type TerminalEntry } from "@/lib/use-terminal-typewriter";

const PROMPT = `${site.name.toLowerCase()}@${site.brand.toLowerCase()} ~ %`;

const SEQUENCE: TerminalEntry[] = [
  { type: "command", text: "cat ./requested-page" },
  { type: "output", text: "cat: ./requested-page: No such file or directory" },
  { type: "output", text: "" },
  { type: "output", text: "404 Not Found" },
  { type: "output", text: "お探しのページは見つかりませんでした。" },
];

const AFTER_SEQUENCE_MS = 400;

export function NotFoundTerminal() {
  const [showLink, setShowLink] = useState(false);
  const { lines, typingText, typedChars, idle, prefersReducedMotion } =
    useTerminalTypewriter(SEQUENCE);

  useEffect(() => {
    if (!idle) return;
    const timeout = setTimeout(
      () => setShowLink(true),
      prefersReducedMotion ? 0 : AFTER_SEQUENCE_MS,
    );
    return () => clearTimeout(timeout);
  }, [idle, prefersReducedMotion]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-(--color-backdrop) p-6">
      <div className="flex w-full max-w-xl flex-col gap-1 text-left font-mono text-base text-background md:text-lg">
        {lines.map((line, i) => (
          <p
            key={i}
            className={`boot-line whitespace-pre-wrap ${line.type === "command" ? "opacity-90" : "opacity-60"}`}
          >
            {line.type === "command" ? `${PROMPT} ${line.text}` : line.text || " "}
          </p>
        ))}
        {typingText !== null && (
          <p className="whitespace-pre-wrap opacity-90">
            {PROMPT} {typingText.slice(0, typedChars)}
            <span
              className="cursor-blink ml-0.5 inline-block h-[1em] w-[0.5em] align-middle bg-(--color-accent)"
              aria-hidden="true"
            />
          </p>
        )}
        {idle && typingText === null && !showLink && (
          <p className="whitespace-pre-wrap opacity-90">
            {PROMPT}{" "}
            <span
              className="cursor-blink ml-0.5 inline-block h-[1em] w-[0.5em] align-middle bg-(--color-accent)"
              aria-hidden="true"
            />
          </p>
        )}
        {showLink && (
          <p className="boot-line mt-2">
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- root layout外(global-not-found)からの遷移でnext/link のクライアントナビゲーションが機能しないため、意図的にフルページ遷移させている */}
            <a
              href="/"
              className="opacity-70 underline-offset-4 transition duration-200 ease-out hover:opacity-100 hover:text-(--color-accent) hover:underline"
            >
              $ cd ~ && open .
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
