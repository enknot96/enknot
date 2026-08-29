"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

const PROMPT = `${site.name.toLowerCase()}@${site.brand.toLowerCase()} ~ %`;

type Entry = { type: "command"; text: string } | { type: "output"; text: string };

const SEQUENCE: Entry[] = [
  { type: "command", text: "cat ./requested-page" },
  { type: "output", text: "cat: ./requested-page: No such file or directory" },
  { type: "output", text: "" },
  { type: "output", text: "404 Not Found" },
  { type: "output", text: "お探しのページは見つかりませんでした。" },
];

const TYPE_CHAR_MS = 55;
const OUTPUT_LINE_MS = 380;
const AFTER_COMMAND_PAUSE_MS = 250;
const BEFORE_TYPING_MS = 300;
const AFTER_SEQUENCE_MS = 400;

export function NotFoundTerminal() {
  const [lines, setLines] = useState<Entry[]>([]);
  const [typingText, setTypingText] = useState<string | null>(null);
  const [typedChars, setTypedChars] = useState(0);
  const [idle, setIdle] = useState(false);
  const [showLink, setShowLink] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timeouts.push(setTimeout(resolve, ms));
      });

    async function run() {
      await wait(BEFORE_TYPING_MS);
      if (cancelled) return;
      for (const entry of SEQUENCE) {
        if (cancelled) return;
        if (entry.type === "command") {
          setTypingText(entry.text);
          for (let c = 1; c <= entry.text.length; c++) {
            if (cancelled) return;
            setTypedChars(c);
            await wait(TYPE_CHAR_MS);
          }
          await wait(AFTER_COMMAND_PAUSE_MS);
          if (cancelled) return;
          setLines((prev) => [...prev, entry]);
          setTypingText(null);
          setTypedChars(0);
        } else {
          await wait(OUTPUT_LINE_MS);
          if (cancelled) return;
          setLines((prev) => [...prev, entry]);
        }
      }
      if (cancelled) return;
      setIdle(true);
      await wait(AFTER_SEQUENCE_MS);
      if (cancelled) return;
      setShowLink(true);
    }

    run();
    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, []);

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
