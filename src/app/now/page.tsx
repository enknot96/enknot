import type { Metadata } from "next";
import Image from "next/image";
import { fetchDevToPosts } from "@/lib/blog";
import { nowProducts, X_URL } from "@/data/now";
import { DevIcon, XIcon, ArrowRightIcon } from "@/components/icons";

const USERNAME = "enknot96";
const POSTS_LIMIT = 3;

export const metadata: Metadata = {
  title: "Shuto — now",
};

export default async function NowPage() {
  const devPosts = await fetchDevToPosts(USERNAME, POSTS_LIMIT);

  return (
    <div className="p-4 font-mono text-base md:p-6">
      <div className="flex flex-col gap-8">
        <section className="flex flex-col gap-3">
          <p className="text-sm opacity-60">whoami</p>
          <div className="flex items-center gap-4">
            <Image
              src="/enknot-logo.png"
              alt="Shuto"
              width={72}
              height={72}
              className="h-16 w-16 shrink-0 rounded-full object-cover md:h-18 md:w-18"
            />
            <div className="flex items-center gap-2">
              <h1 className="font-anton text-3xl tracking-wide md:text-5xl">Shuto｜</h1>
              <a
                href={X_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="Shuto on X"
                className="opacity-70 transition duration-200 ease-out hover:opacity-100 hover:text-(--color-accent)"
              >
                <XIcon className="h-6 w-6 md:h-7 md:w-7" />
              </a>
            </div>
          </div>
          <p className="text-base opacity-70 max-[425px]:text-sm">
            Building in public, step by step 👣 Bucket list: Bali & Venice ☕️
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-sm uppercase opacity-60">shipped</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {nowProducts.map((product) => (
              <div
                key={product.name}
                className="border-ui flex flex-col gap-3 p-4"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={product.iconSrc}
                    alt=""
                    width={40}
                    height={40}
                    className="h-10 w-10 shrink-0 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm opacity-60">{product.metric}</p>
                  </div>
                </div>
                <p className="text-sm opacity-70">{product.description}</p>
                <div className="mt-auto flex items-center gap-4 text-sm">
                  <a
                    href={product.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-1 opacity-70 transition duration-200 ease-out hover:opacity-100 hover:text-(--color-accent)"
                  >
                    Visit
                    <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="border-ui flex flex-col gap-4 p-4 md:flex-row">
          <div className="flex shrink-0 flex-row items-center justify-between gap-2 md:w-40 md:flex-col md:items-start md:justify-start">
            <div className="flex items-center gap-2">
              <DevIcon className="h-5 w-5" />
              <h2 className="text-sm uppercase opacity-60">dev.to</h2>
            </div>
            <a
              href={`https://dev.to/${USERNAME}`}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-1 text-sm opacity-60 transition duration-200 ease-out hover:opacity-100 hover:text-(--color-accent)"
            >
              view all
              <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover:translate-x-1" />
            </a>
          </div>
          {devPosts.length > 0 ? (
            <ul className="flex flex-1 flex-col gap-2">
              {devPosts.map((post) => (
                <li
                  key={post.link + post.title}
                  className="border-ui p-3"
                >
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noreferrer"
                    className="transition duration-200 ease-out hover:text-(--color-accent)"
                  >
                    <p className="text-sm font-semibold">{post.title}</p>
                    <p className="text-xs opacity-50">{post.date}</p>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-1 items-center border-ui p-3 text-sm opacity-50">
              coming soon...
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
