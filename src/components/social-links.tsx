import { site } from "@/data/site";
import { GithubIcon, XIcon, DevIcon } from "@/components/icons";

export const SOCIAL_ICONS = {
  github: GithubIcon,
  x: XIcon,
  dev: DevIcon,
} as const;

const DEFAULT_LINK_CLASS =
  "opacity-70 transition duration-200 ease-out hover:opacity-100 hover:text-(--color-accent)";

export function SocialLinks({
  linkClassName = DEFAULT_LINK_CLASS,
  iconClassName = "h-5 w-5",
}: {
  linkClassName?: string;
  iconClassName?: string;
}) {
  return (
    <>
      {site.social.map((link) => {
        const Icon = SOCIAL_ICONS[link.icon];
        return (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            aria-label={link.label}
            className={linkClassName}
          >
            <Icon className={iconClassName} />
          </a>
        );
      })}
    </>
  );
}
