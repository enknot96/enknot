"use client";

import { site } from "@/data/site";
import { XIcon, MailIcon } from "@/components/icons";

const buttonClass =
  "inline-flex items-center gap-2 border-ui px-4 py-2 text-sm opacity-80 transition duration-200 ease-out hover:opacity-100 hover:text-(--color-accent) cursor-pointer";

export function ContactCTA() {
  const xLink = site.social.find((link) => link.icon === "x")?.href;

  return (
    <div className="mt-3 flex flex-wrap gap-3">
      {xLink && (
        <a
          href={xLink}
          target="_blank"
          rel="noreferrer"
          className={buttonClass}
        >
          <XIcon className="h-4 w-4" />
          DMで問い合わせる
        </a>
      )}
      <button
        type="button"
        className={buttonClass}
        onClick={() => {
          const { user, domain } = site.contactEmail;
          window.location.href = `mailto:${user}@${domain}`;
        }}
      >
        <MailIcon className="h-4 w-4" />
        メールで問い合わせる
      </button>
    </div>
  );
}
