import { site } from "@/data/site";

export function TerminalFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-dvh w-full p-0 sm:p-4 md:flex md:items-center md:justify-center">
      <div className="mx-auto flex h-dvh w-full max-w-7xl flex-col overflow-hidden border-ui bg-background shadow-2xl md:h-[92vh] md:rounded-xl">
        <div className="flex shrink-0 items-center gap-2 border-b border-ui px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <p className="flex-1 text-center font-mono text-sm opacity-50">
            {site.name.toLowerCase()}@{site.brand.toLowerCase()} — zsh
          </p>
        </div>
        <div className="flex min-h-0 flex-1 gap-2 p-2">{children}</div>
      </div>
    </div>
  );
}
