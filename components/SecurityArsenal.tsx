import { skills } from "@/lib/data";
import { Reveal } from "./MotionPrimitives";
import { SectionHeading } from "./SectionHeading";

export function SecurityArsenal() {
  return (
    <section id="skills" className="section-shell py-24">
      <SectionHeading eyebrow="TECHNICAL SKILLS" title="Skills & Tooling" subtitle="DevSecOps, cloud, security testing, and the full-stack engineering background behind it." />
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skills.map(({ group, icon: Icon, items }) => (
          <Reveal key={group}>
            <article className="glass-panel h-full rounded-lg p-5">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-md border border-accent/25 bg-accent/10 text-accent">
                  <Icon size={18} />
                </span>
                <h3 className="text-lg font-semibold text-white">{group}</h3>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {items.map((name) => (
                  <span key={name} className="rounded-md border border-white/10 bg-black/20 px-3 py-1.5 text-sm text-slate-200">
                    {name}
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
