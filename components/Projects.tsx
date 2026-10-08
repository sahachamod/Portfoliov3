import { projects } from "@/lib/data";
import { Reveal } from "./MotionPrimitives";
import { SectionHeading } from "./SectionHeading";

export function Projects() {
  return (
    <section id="projects" className="section-shell py-24">
      <SectionHeading eyebrow="SELECTED PROJECTS" title="Projects & Research Work" subtitle="Security tooling, machine learning, and full-stack products built across study, work, and independent research." />
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {projects.map(({ title, summary, stack, category, icon: Icon }) => (
          <Reveal key={title}>
            <article className="glass-panel flex h-full flex-col rounded-lg p-6 transition hover:border-accent/35">
              <div className="flex items-center justify-between gap-4">
                <span className="grid size-10 place-items-center rounded-md border border-accent/25 bg-accent/10 text-accent">
                  <Icon size={18} />
                </span>
                <p className="technical-label">{category}</p>
              </div>
              <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>
              <p className="mt-3 flex-1 text-sm leading-7 text-slate-300">{summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {stack.map((item) => (
                  <span key={item} className="rounded-md border border-white/10 bg-black/20 px-2.5 py-1.5 text-xs text-slate-300">
                    {item}
                  </span>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
