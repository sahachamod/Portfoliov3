import { achievements } from "@/lib/data";
import { Reveal } from "./MotionPrimitives";
import { SectionHeading } from "./SectionHeading";

export function Achievements() {
  return (
    <section id="achievements" className="section-shell py-24">
      <SectionHeading eyebrow="COMPETITIVE CYBERSECURITY" title="Achievements" subtitle="NASA Hall of Fame recognition, international CTF placements, and ongoing bug bounty research." />
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {achievements.map(({ title, result, detail, stat, icon: Icon }, index) => (
          <Reveal key={title}>
            <article className={`glass-panel flex h-full flex-col rounded-lg p-6 ${index === 0 ? "border-accent/35" : ""}`}>
              <div className="flex items-start justify-between gap-4">
                <span className="grid size-10 place-items-center rounded-md border border-accent/25 bg-accent/10 text-accent">
                  <Icon size={18} />
                </span>
                <span className="rounded-md border border-accent/25 bg-accent/10 px-3 py-1.5 font-mono text-xs text-accent">{stat}</span>
              </div>
              <p className="mt-6 technical-label">{result}</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{detail}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
