"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";
import { NAV_ITEMS } from "@/data/nav";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-56 shrink-0 flex-col justify-between border-ui p-4 font-mono text-base">
      <div>
        <div className="mb-1 flex items-center justify-center gap-2">
          <span className="font-anton text-[38px] tracking-wide">{site.brand}</span>
          <Image
            src="/enknot-logo.png"
            alt={site.brand}
            width={60}
            height={60}
            className="rounded-full object-cover"
          />
        </div>
        <div className="text-sm opacity-50 mb-6 text-center">{site.tagline}</div>
        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`py-2 px-1 transition-opacity ${
                  active ? "opacity-100" : "opacity-60 hover:opacity-100"
                }`}
              >
                <span className="relative mr-2 inline-flex h-1.5 w-1.5 items-center justify-center">
                  {active && (
                    <span
                      className="nav-dot-ring absolute inline-block h-1.5 w-1.5 rounded-full bg-(--color-accent)"
                      aria-hidden="true"
                    />
                  )}
                  <span
                    className={`relative inline-block h-1.5 w-1.5 rounded-full ${
                      active ? "nav-dot-beat bg-(--color-accent)" : "bg-transparent"
                    }`}
                  />
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="border-t border-ui py-2 text-center text-[13px] opacity-50">
        &copy; {new Date().getFullYear()} {site.brand}
      </div>
    </aside>
  );
}
