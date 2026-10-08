import { disclosureSteps } from "@/lib/data";
import { Reveal } from "./MotionPrimitives";
import { SectionHeading } from "./SectionHeading";

export function ResponsibleDisclosure() {
  return (
    <section className="section-shell py-24">
      <SectionHeading
        eyebrow="DISCLOSURE"
        title="Responsible Disclosure"
        subtitle="Security research is most valuable when vulnerabilities are responsibly disclosed and systems become stronger because of the research."
      />
      <Reveal className="mt-10">
        <div className="glass-panel rounded-lg p-6">
          <div className="grid gap-3 md:grid-cols-6">
            {disclosureSteps.map((step, index) => (
              <div key={step} className="relative rounded-md border border-white/10 bg-black/20 p-4">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-accent">0{index + 1}</p>
                <p className="mt-3 text-sm font-medium text-white">{step}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-md border border-accent/20 bg-accent/5 p-4 text-sm text-slate-300">
            Only verified recognitions from real organizations are listed. Private target details are never published.
          </div>
        </div>
      </Reveal>
    </section>
  );
}
