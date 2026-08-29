import { Fragment } from "react";
import Image from "next/image";
import { site } from "@/data/site";

export default function HomePage() {
  return (
    <div className="relative flex min-h-full flex-col justify-start gap-8 p-4 font-mono md:p-8">
      <p className="text-sm opacity-60">whoami</p>
      <h1 className="font-anton text-4xl md:text-6xl max-[484px]:leading-[1.2]">
        <span>{site.brand}</span>
        <span className="max-[484px]:hidden">｜</span>
        <br className="hidden max-[484px]:inline" />
        <span>{site.tagline}</span>
        <span
          className="cursor-blink ml-3 inline-block h-[0.8em] w-[0.3em] shrink-0 bg-(--color-accent) opacity-80"
          aria-hidden="true"
        />
      </h1>
      <div className="flex flex-col gap-3">
        <div>
          <p className="text-sm opacity-60">business</p>
          <p className="text-lg opacity-80 max-[425px]:text-base">{site.businessName}</p>
        </div>
        <div>
          <p className="text-sm opacity-60">service</p>
          <p className="text-lg opacity-80 max-[425px]:text-base">{site.services.join(" / ")}</p>
        </div>
      </div>
      <p className="text-base opacity-80 max-[425px]:text-sm">
        {site.about.split("<br>").map((line, i, lines) => (
          <Fragment key={i}>
            {line}
            {i < lines.length - 1 && <br />}
          </Fragment>
        ))}
      </p>
      <div
        className="group absolute right-8 bottom-8 hidden h-56 w-80 md:block"
        aria-hidden="true"
      >
        <div className="pointer-events-none absolute right-0 bottom-0 flex items-center gap-4 border-ui bg-background p-4 opacity-0 shadow-2xl transition-opacity duration-500 group-hover:opacity-100">
          <Image
            src={site.readingNow.coverSrc}
            alt=""
            width={80}
            height={114}
            className="h-28 w-20 object-cover"
          />
          <div className="flex flex-col gap-1">
            <p className="text-xs whitespace-nowrap opacity-60">
              <span className="text-(--color-accent)">$</span> reading_now
            </p>
            <p className="text-base opacity-90">{site.readingNow.title}</p>
            <p className="text-xs opacity-60">著: {site.readingNow.author}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
