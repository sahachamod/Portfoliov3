import { medium, writing } from "@/lib/data";
import { Reveal } from "./MotionPrimitives";
import { SectionHeading } from "./SectionHeading";

export function Writing() {
  return (
    <section id="writing" className="section-shell py-24">
      <SectionHeading
        eyebrow="PUBLICATION INTERFACE"
        title="Research Notes"
        subtitle="Technical research and educational content on security topics, published on Medium."
      />
      <div className="mt-10 grid gap-4">
        {writing.map(([title, category, difficulty, reading, date]) => (
          <Reveal key={title}>
            <article className="glass-panel grid gap-4 rounded-lg p-5 md:grid-cols-[1.4fr_0.6fr_0.6fr_0.6fr_auto] md:items-center">
              <div>
                <p className="technical-label">{category}</p>
                <h3 className="mt-2 text-xl font-semibold text-white">{title}</h3>
              </div>
              <span className="text-sm text-slate-300">{difficulty}</span>
              <span className="text-sm text-slate-300">{reading}</span>
              <span className="text-sm text-slate-300">{date}</span>
              <a href={medium} target="_blank" rel="noreferrer" className="text-sm text-accent">
                Read on Medium →
              </a>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
