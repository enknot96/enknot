"use client";

import { useEffect, useState } from "react";

export type TerminalEntry =
  | { type: "command"; text: string }
  | { type: "output"; text: string };

type Options = {
  beforeMs?: number;
  typeCharMs?: number;
  afterCommandPauseMs?: number;
  outputLineMs?: number;
  onBeforeStart?: () => void;
  onDone?: () => void;
};

export function useTerminalTypewriter(sequence: TerminalEntry[], options: Options = {}) {
  const {
    beforeMs = 300,
    typeCharMs = 55,
    afterCommandPauseMs = 250,
    outputLineMs = 380,
    onBeforeStart,
    onDone,
  } = options;

  const [lines, setLines] = useState<TerminalEntry[]>([]);
  const [typingText, setTypingText] = useState<string | null>(null);
  const [typedChars, setTypedChars] = useState(0);
  const [idle, setIdle] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timeouts.push(setTimeout(resolve, ms));
      });

    async function run() {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setPrefersReducedMotion(reduceMotion);
      onBeforeStart?.();

      if (reduceMotion) {
        setLines(sequence);
        setIdle(true);
        onDone?.();
        return;
      }

      await wait(beforeMs);
      if (cancelled) return;
      for (const entry of sequence) {
        if (cancelled) return;
        if (entry.type === "command") {
          setTypingText(entry.text);
          for (let c = 1; c <= entry.text.length; c++) {
            if (cancelled) return;
            setTypedChars(c);
            await wait(typeCharMs);
          }
          await wait(afterCommandPauseMs);
          if (cancelled) return;
          setLines((prev) => [...prev, entry]);
          setTypingText(null);
          setTypedChars(0);
        } else {
          await wait(outputLineMs);
          if (cancelled) return;
          setLines((prev) => [...prev, entry]);
        }
      }
      if (cancelled) return;
      setIdle(true);
      onDone?.();
    }

    run();
    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { lines, typingText, typedChars, idle, prefersReducedMotion };
}
