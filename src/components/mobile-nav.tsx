"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/data/nav";

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="flex md:hidden border-ui font-mono text-sm">
      {NAV_ITEMS.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex-1 py-2 text-center transition-opacity ${
              active ? "opacity-100" : "opacity-60"
            }`}
            style={{
              borderBottom: active ? "2px solid var(--color-accent)" : "2px solid transparent",
            }}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
