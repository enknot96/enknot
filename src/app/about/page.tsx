import { site } from "@/data/site";
import { skills, qualifications, timeline } from "@/data/resume";
import { ContactCTA } from "@/components/contact-cta";

export default function ResumeSkillsPage() {
  return (
    <div className="grid grid-cols-1 gap-x-10 gap-y-10 p-4 font-mono text-base md:grid-cols-2 md:p-6">
      <section>
        <h2 className="mb-4 text-sm uppercase opacity-60">resume</h2>
        <ol className="flex flex-col gap-4 border-l border-ui p-4">
          {timeline.map((entry) => (
            <li key={entry.title}>
              <div className="text-sm opacity-60">{entry.period}</div>
              <div className="flex flex-col gap-1">
                <div className="font-semibold">{entry.title}</div>
                <p className="text-sm opacity-70">{entry.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <div className="flex flex-col gap-10">
        <section>
          <h2 className="mb-4 text-sm uppercase opacity-60">{"<3 stack"}</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="border-ui px-3 py-1 text-sm opacity-80"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-sm uppercase opacity-60">qualification</h2>
          <div className="flex flex-wrap gap-2">
            {qualifications.map((qualification) => (
              <span
                key={qualification}
                className="border-ui px-3 py-1 text-sm opacity-80"
              >
                {qualification}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-2 text-sm uppercase opacity-60">availability</h2>
          <p className="border-ui p-4 text-sm opacity-70">{site.availability}</p>
          <ContactCTA />
        </section>
      </div>
    </div>
  );
}
