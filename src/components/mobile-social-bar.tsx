import { SocialLinks } from "@/components/social-links";

export function MobileSocialBar() {
  return (
    <div className="hidden items-center justify-center gap-4 border-ui px-4 py-2 font-mono max-[559px]:flex md:hidden">
      <SocialLinks />
    </div>
  );
}
