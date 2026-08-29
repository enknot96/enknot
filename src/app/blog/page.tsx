import { fetchDevToPosts, fetchNotePosts, fetchZennPosts, type BlogPost } from "@/lib/blog";
import { NoteIcon, ZennIcon, DevIcon, ArrowRightIcon } from "@/components/icons";

const POSTS_PER_PLATFORM = 3;
const USERNAME = "enknot96";

const PLATFORMS = [
  { key: "note", label: "note", Icon: NoteIcon, profileUrl: `https://note.com/${USERNAME}` },
  { key: "zenn", label: "Zenn", Icon: ZennIcon, profileUrl: `https://zenn.dev/${USERNAME}` },
  { key: "dev", label: "dev.to", Icon: DevIcon, profileUrl: `https://dev.to/${USERNAME}` },
] as const;

function PlatformRow({
  label,
  Icon,
  profileUrl,
  posts,
}: {
  label: string;
  Icon: typeof NoteIcon;
  profileUrl: string;
  posts: BlogPost[];
}) {
  return (
    <section className="border-ui flex flex-col gap-4 p-4 md:flex-row">
      <div className="flex shrink-0 flex-row items-center justify-between gap-2 md:w-40 md:flex-col md:items-start md:justify-start">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5" />
          <h2 className="text-sm uppercase opacity-60">{label}</h2>
        </div>
        <a
          href={profileUrl}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-1 text-sm opacity-60 transition duration-200 ease-out hover:opacity-100 hover:text-(--color-accent)"
        >
          view all
          <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-200 ease-out group-hover:translate-x-1" />
        </a>
      </div>
      {posts.length > 0 ? (
        <ul className="flex flex-1 flex-col gap-2">
          {posts.map((post) => (
            <li key={post.link + post.title} className="border-ui p-3">
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
  );
}

export default async function BlogPage() {
  const [notePosts, zennPosts, devPosts] = await Promise.all([
    fetchNotePosts(USERNAME, POSTS_PER_PLATFORM),
    fetchZennPosts(USERNAME, POSTS_PER_PLATFORM),
    fetchDevToPosts(USERNAME, POSTS_PER_PLATFORM),
  ]);

  const postsByPlatform: Record<(typeof PLATFORMS)[number]["key"], BlogPost[]> = {
    note: notePosts,
    zenn: zennPosts,
    dev: devPosts,
  };

  return (
    <div className="p-4 font-mono text-base md:p-6">
      <div className="flex flex-col gap-4">
        {PLATFORMS.map((platform) => (
          <PlatformRow
            key={platform.key}
            label={platform.label}
            Icon={platform.Icon}
            profileUrl={platform.profileUrl}
            posts={postsByPlatform[platform.key]}
          />
        ))}
      </div>
    </div>
  );
}
