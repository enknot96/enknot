"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { MobileNav } from "@/components/mobile-nav";
import { MobileFooter } from "@/components/mobile-footer";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideChrome = pathname.startsWith("/now");

  return (
    <>
      {!hideChrome && <Sidebar />}
      <div className="flex-1 flex flex-col min-w-0 gap-2">
        <Header />
        {!hideChrome && <MobileNav />}
        <main className="relative flex-1 min-h-0 border-ui overflow-y-auto">{children}</main>
        {!hideChrome && <MobileFooter />}
      </div>
    </>
  );
}
