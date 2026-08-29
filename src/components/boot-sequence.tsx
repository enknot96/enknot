"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { useTerminalTypewriter, type TerminalEntry } from "@/lib/use-terminal-typewriter";

const PROMPT = `${site.name.toLowerCase()}@${site.brand.toLowerCase()} ~ %`;

const BOOT_SEQUENCE: TerminalEntry[] = [
  { type: "command", text: `ssh ${site.brand.toLowerCase()}.dev` },
  { type: "output", text: `connecting to ${site.brand.toLowerCase()}.dev... ok` },
  { type: "output", text: "authenticating... ok" },
  { type: "output", text: "loading profile... ok" },
  { type: "output", text: "mounting contents... ok" },
  { type: "command", text: "whoami" },
  { type: "output", text: `${site.brand}｜${site.tagline}` },
];

const HOLD_AFTER_MS = 1800;
const REVEAL_DURATION_MS = 600;

function formatLastLogin(date: Date) {
  const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const day = date.getDate();
  const time = date.toLocaleTimeString("en-US", { hour12: false });
  return `Last login: ${weekday} ${month} ${day} ${time} on ttys000`;
}

const MAX_LINE_LENGTH = Math.max(
  formatLastLogin(new Date()).length,
  ...BOOT_SEQUENCE.map((entry) =>
    entry.type === "command"
      ? PROMPT.length + 1 + entry.text.length
      : entry.text.length,
  ),
);

type Phase = "typing" | "revealing" | "done";

export function BootSequence({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<Phase>("typing");
  const [lastLogin, setLastLogin] = useState<string | null>(null);

  const { lines, typingText, typedChars, idle, prefersReducedMotion } = useTerminalTypewriter(
    BOOT_SEQUENCE,
    { onBeforeStart: () => setLastLogin(formatLastLogin(new Date())) },
  );

  useEffect(() => {
    if (!idle) return;
    const timeout = setTimeout(
      () => setPhase("revealing"),
      prefersReducedMotion ? 0 : HOLD_AFTER_MS,
    );
    return () => clearTimeout(timeout);
  }, [idle, prefersReducedMotion]);

  useEffect(() => {
    if (phase !== "revealing") return;
    const timeout = setTimeout(() => setPhase("done"), REVEAL_DURATION_MS);
    return () => clearTimeout(timeout);
  }, [phase]);

  return (
    <>
      {phase !== "done" && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-(--color-backdrop) p-6 transition-opacity ease-out ${
            phase === "revealing" ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
          style={{ transitionDuration: `${REVEAL_DURATION_MS}ms` }}
        >
          <div
            className="flex flex-col gap-1 text-left font-mono text-lg text-background"
            style={{ width: `${MAX_LINE_LENGTH + 1}ch` }}
          >
            {lastLogin && (
              <p className="boot-line whitespace-nowrap opacity-50">{lastLogin}</p>
            )}
            {lines.map((line, i) => (
              <p
                key={i}
                className={`boot-line whitespace-nowrap ${line.type === "command" ? "opacity-90" : "opacity-50"}`}
              >
                {line.type === "command" ? `${PROMPT} ${line.text}` : line.text}
              </p>
            ))}
            {typingText !== null && (
              <p className="whitespace-nowrap opacity-90">
                {PROMPT} {typingText.slice(0, typedChars)}
                <span
                  className="cursor-blink ml-0.5 inline-block h-[1em] w-[0.5em] align-middle bg-(--color-accent)"
                  aria-hidden="true"
                />
              </p>
            )}
            {idle && typingText === null && (
              <p className="whitespace-nowrap opacity-90">
                {PROMPT}{" "}
                <span
                  className="cursor-blink ml-0.5 inline-block h-[1em] w-[0.5em] align-middle bg-(--color-accent)"
                  aria-hidden="true"
                />
              </p>
            )}
          </div>
        </div>
      )}
      <div
        className={`transition-all ease-out ${
          phase === "typing" ? "scale-[0.97] opacity-0" : "scale-100 opacity-100"
        }`}
        style={{ transitionDuration: `${REVEAL_DURATION_MS}ms` }}
      >
        {children}
      </div>
    </>
  );
}
