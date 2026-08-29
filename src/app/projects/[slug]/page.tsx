import Link from "next/link";
import { redirect } from "next/navigation";
import { projects } from "@/data/projects";
import { GithubIcon, ArrowRightIcon, ArrowUpRightIcon } from "@/components/icons";

const tagClass = "border-ui px-3 py-1 text-sm opacity-80";
const buttonClass =
  "group inline-flex items-center gap-2 border-ui px-4 py-2 text-sm opacity-80 transition duration-200 ease-out hover:opacity-100 hover:text-(--color-accent)";
const primaryButtonClass =
  "group inline-flex items-center gap-2 bg-(--color-primary) px-4 py-2 text-sm text-(--color-bg) transition duration-200 ease-out hover:opacity-85";
const arrowClass = "h-3 w-3 transition-transform duration-200 ease-out group-hover:translate-x-1";
const externalArrowClass =
  "h-3 w-3 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    redirect("/projects");
  }

  return (
    <div className="p-4 font-mono text-base md:p-6">
      <div className="max-w-3xl">
        <Link
          href="/projects"
          className="group mb-8 inline-flex items-center gap-1 text-sm opacity-60 transition duration-200 ease-out hover:opacity-100 hover:text-(--color-accent)"
        >
          <ArrowRightIcon className="h-3.5 w-3.5 rotate-180 transition-transform duration-200 ease-out group-hover:-translate-x-1" />
          projects
        </Link>

        <p className="text-sm opacity-60">
          {project.category === "client" ? "client work" : "personal project"}
        </p>
        <h1 className="mt-1 mb-4 text-2xl font-semibold md:text-4xl">{project.name}</h1>
        <p className="mb-8 text-sm leading-relaxed opacity-80">{project.longDescription}</p>

        <section className="mb-8">
          <h2 className="mb-3 text-sm uppercase opacity-60">tech stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className={tagClass}
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {project.story && (
          <section className="mb-8">
            <h2 className="mb-3 text-sm uppercase opacity-60">story</h2>
            <p className="text-sm leading-relaxed opacity-70">{project.story}</p>
            {project.relatedProject && (
              <Link
                href={`/projects/${project.relatedProject.slug}`}
                className="group mt-3 inline-flex items-center gap-1 border-b border-(--color-line) pb-0.5 text-sm opacity-60 transition duration-200 ease-out hover:opacity-100 hover:border-(--color-accent) hover:text-(--color-accent)"
              >
                {project.relatedProject.label}
                <ArrowRightIcon className={arrowClass} />
              </Link>
            )}
          </section>
        )}

        <section className="mb-8">
          <h2 className="mb-3 text-sm uppercase opacity-60">highlights</h2>
          <ul className="flex flex-col gap-2">
            {project.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex gap-2 text-sm opacity-70"
              >
                <span className="opacity-50">—</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="flex flex-wrap gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className={buttonClass}
            >
              <GithubIcon className="h-4 w-4" />
              GitHub
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className={primaryButtonClass}
            >
              {project.liveUrlLabel ?? "サイトを見る"}
              <ArrowUpRightIcon className={externalArrowClass} />
            </a>
          )}
          {project.adminUrl && (
            <a
              href={project.adminUrl}
              target="_blank"
              rel="noreferrer"
              className={buttonClass}
            >
              管理画面を見る
              <ArrowUpRightIcon className={externalArrowClass} />
            </a>
          )}
        </div>

        {project.integratedSystem && (
          <section className="mt-8 border-ui p-4">
            <h2 className="mb-1 text-sm uppercase opacity-60">related system</h2>
            <h3 className="mb-2 font-semibold">{project.integratedSystem.title}</h3>
            <p className="mb-3 text-sm opacity-70">{project.integratedSystem.description}</p>
            <div className="mb-3 flex flex-wrap gap-2">
              {project.integratedSystem.techStack.map((tech) => (
                <span
                  key={tech}
                  className={tagClass}
                >
                  {tech}
                </span>
              ))}
            </div>
            {project.integratedSystem.story && (
              <p className="mb-3 text-sm leading-relaxed opacity-70">
                {project.integratedSystem.story}
              </p>
            )}
            <ul className="mb-3 flex flex-col gap-2">
              {project.integratedSystem.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex gap-2 text-sm opacity-70"
                >
                  <span className="opacity-50">—</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              {project.integratedSystem.githubUrl && (
                <a
                  href={project.integratedSystem.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={buttonClass}
                >
                  <GithubIcon className="h-4 w-4" />
                  GitHub
                </a>
              )}
              {project.integratedSystem.liveUrl && (
                <a
                  href={project.integratedSystem.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={primaryButtonClass}
                >
                  {project.integratedSystem.liveUrlLabel ?? "サイトを見る"}
                  <ArrowUpRightIcon className={externalArrowClass} />
                </a>
              )}
            </div>
          </section>
        )}

        {project.hostingNote && (
          <p className="mt-4 rounded-sm border border-red-300 bg-red-50 px-4 py-3 text-[13px] text-red-700">
            ⚠️ {project.hostingNote}
          </p>
        )}

        {project.demoAccounts && project.demoAccounts.length > 0 && (
          <div className="mt-6 border-ui p-4">
            <h2 className="mb-3 text-sm uppercase opacity-60">デモ用アカウント</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-(--color-line) opacity-60">
                    <th className="py-2 pr-4 font-normal">role</th>
                    <th className="py-2 pr-4 font-normal">email</th>
                    <th className="py-2 font-normal">password</th>
                  </tr>
                </thead>
                <tbody>
                  {project.demoAccounts.map((account) => (
                    <tr
                      key={account.email}
                      className="border-b border-(--color-line) last:border-0"
                    >
                      <td className="py-2 pr-4 whitespace-nowrap opacity-80">{account.role}</td>
                      <td className="py-2 pr-4 opacity-80">{account.email}</td>
                      <td className="py-2 opacity-80">{account.password}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {project.demoNote && <p className="mt-4 text-sm opacity-60">{project.demoNote}</p>}
            {project.testCard && (
              <div className="mt-3 flex flex-col gap-1 text-sm opacity-70">
                <p>
                  テストカード番号: <span className="opacity-100">{project.testCard.number}</span>
                </p>
                <p>有効期限: {project.testCard.expiry}</p>
                <p>セキュリティコード: {project.testCard.cvc}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
