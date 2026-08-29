import { site } from "@/data/site";
import { GithubIcon, XIcon, NoteIcon, ZennIcon, DevIcon } from "@/components/icons";

const SOCIAL_ICONS = {
  github: GithubIcon,
  x: XIcon,
  note: NoteIcon,
  zenn: ZennIcon,
  dev: DevIcon,
} as const;

export function MobileSocialBar() {
  return (
    <div className="hidden items-center justify-center gap-4 border-ui px-4 py-3 font-mono max-[559px]:flex md:hidden">
      {site.social.map((link) => {
        const Icon = SOCIAL_ICONS[link.icon];
        return (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            aria-label={link.label}
            className="opacity-70 transition duration-200 ease-out hover:opacity-100 hover:text-(--color-accent)"
          >
            <Icon className="h-5 w-5" />
          </a>
        );
      })}
    </div>
  );
}
