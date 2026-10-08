import { Bug, Briefcase } from "lucide-react";
import { bugBounty, experience } from "@/lib/data";
import { Reveal } from "./MotionPrimitives";
import { SectionHeading } from "./SectionHeading";

export function Experience() {
  return (
    <section id="experience" className="section-shell py-24">
      <SectionHeading
        eyebrow="PROFESSIONAL EXPERIENCE"
        title="Where I've Worked"
        subtitle="DevSecOps engineering, security consulting, and full-stack software development, with bug bounty research running alongside since 2022."
      />
      <div className="mt-10 grid gap-5">
        {experience.map((job) => (
          <Reveal key={`${job.company}-${job.role}`}>
            <article className="glass-panel grid gap-6 rounded-lg p-6 lg:grid-cols-[0.9fr_1.6fr]">
              <div>
                <div className="flex items-center gap-3 text-accent">
                  <span className="grid size-10 place-items-center rounded-md border border-accent/25 bg-accent/10">
                    <Briefcase size={18} />
                  </span>
                  <p className="technical-label">{job.type}</p>
                </div>
                <h3 className="mt-5 text-2xl font-semibold text-white">{job.role}</h3>
                <p className="mt-1 text-lg text-slate-200">{job.company}</p>
                <p className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-slate-500">{job.period}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {job.stack.map((item) => (
                    <span key={item} className="rounded-md border border-white/10 bg-black/20 px-2.5 py-1.5 text-xs text-slate-300">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <ul className="grid gap-3 text-sm leading-7 text-slate-300">
                {job.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-3 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
        <Reveal>
          <article className="glass-panel grid gap-6 rounded-lg border-accent/35 p-6 lg:grid-cols-[0.9fr_1.6fr]">
            <div>
              <div className="flex items-center gap-3 text-accent">
                <span className="grid size-10 place-items-center rounded-md border border-accent/25 bg-accent/10">
                  <Bug size={18} />
                </span>
                <p className="technical-label">Security Research</p>
              </div>
              <h3 className="mt-5 text-2xl font-semibold text-white">{bugBounty.title}</h3>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-slate-500">{bugBounty.period}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {bugBounty.platforms.map((item) => (
                  <span key={item} className="rounded-md border border-accent/25 bg-accent/10 px-2.5 py-1.5 text-xs text-accent">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-sm leading-7 text-slate-300">
              <p>{bugBounty.summary}</p>
              <ul className="mt-4 grid gap-3">
                {bugBounty.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-3 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
