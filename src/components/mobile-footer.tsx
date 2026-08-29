import Image from "next/image";
import { site } from "@/data/site";

export function MobileFooter() {
  return (
    <footer className="flex items-center justify-between gap-2 border-t border-ui px-4 py-3 font-mono md:hidden">
      <div className="flex items-center gap-2">
        <Image
          src="/enknot-logo.png"
          alt={site.brand}
          width={32}
          height={32}
          className="shrink-0 rounded-full object-cover"
        />
        <div className="flex flex-col leading-tight">
          <span className="font-anton text-base tracking-wide">{site.brand}</span>
          <span className="text-[10px] opacity-50">{site.tagline}</span>
        </div>
      </div>
      <div className="shrink-0 text-[11px] opacity-40">
        &copy; {new Date().getFullYear()} {site.brand}
      </div>
    </footer>
  );
}
