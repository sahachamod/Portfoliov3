import { Award, GraduationCap, Languages } from "lucide-react";
import { certifications, education, languages } from "@/lib/data";
import { Reveal } from "./MotionPrimitives";
import { SectionHeading } from "./SectionHeading";

export function Education() {
  return (
    <section id="education" className="section-shell py-24">
      <SectionHeading eyebrow="EDUCATION & CERTIFICATIONS" title="Academic Background" />
      <div className="mt-10 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="grid gap-4">
          {education.map((item) => (
            <Reveal key={item.degree}>
              <article className="glass-panel flex gap-4 rounded-lg p-6">
                <span className="grid size-10 shrink-0 place-items-center rounded-md border border-accent/25 bg-accent/10 text-accent">
                  <GraduationCap size={18} />
                </span>
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-slate-500">{item.period}</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">{item.degree}</h3>
                  {item.institution ? <p className="mt-1 text-slate-200">{item.institution}</p> : null}
                  {item.details ? <p className="mt-2 text-sm leading-7 text-slate-300">{item.details}</p> : null}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="grid gap-4">
          <Reveal>
            <article className="glass-panel rounded-lg p-6">
              <div className="flex items-center gap-3 text-accent">
                <Award size={18} />
                <p className="technical-label">Certifications & Platforms</p>
              </div>
              <div className="mt-5 grid gap-2">
                {certifications.map((cert) => (
                  <div key={cert.name} className="flex items-center justify-between gap-3 rounded-md border border-white/10 bg-black/20 px-3 py-2">
                    <span className="text-sm text-slate-200">{cert.name}</span>
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-accent">{cert.year}</span>
                  </div>
                ))}
              </div>
            </article>
          </Reveal>
          <Reveal>
            <article className="glass-panel rounded-lg p-6">
              <div className="flex items-center gap-3 text-accent">
                <Languages size={18} />
                <p className="technical-label">Languages</p>
              </div>
              <div className="mt-5 grid gap-2">
                {languages.map(([name, level]) => (
                  <div key={name} className="flex items-center justify-between gap-3 rounded-md border border-white/10 bg-black/20 px-3 py-2">
                    <span className="text-sm text-slate-200">{name}</span>
                    <span className="text-xs text-slate-400">{level}</span>
                  </div>
                ))}
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
