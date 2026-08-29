import Link from "next/link";
import { projects } from "@/data/projects";

function ProjectGroup({
  title,
  items,
}: {
  title: string;
  items: typeof projects;
}) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 text-sm uppercase opacity-60">{title}</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="border-ui p-4 transition duration-200 ease-out hover:border-(--color-accent) hover:text-(--color-accent)"
          >
            <h3 className="mb-1 text-base font-semibold">{project.name}</h3>
            <p className="mb-2 text-sm opacity-70">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="border-ui px-2 py-0.5 text-sm opacity-60"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function ProjectsWorkPage() {
  const client = projects.filter((p) => p.category === "client");
  const personal = projects.filter((p) => p.category === "personal");

  return (
    <div className="p-4 font-mono text-base md:p-6">
      <ProjectGroup title="client work" items={client} />
      <ProjectGroup title="personal projects" items={personal} />
    </div>
  );
}
