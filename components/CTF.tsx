import { ctfCategories, ctfPlatforms } from "@/lib/data";
import { Reveal } from "./MotionPrimitives";
import { SectionHeading } from "./SectionHeading";

export function CTF() {
  return (
    <section id="ctf" className="section-shell py-24">
      <SectionHeading
        eyebrow="OFFENSIVE PRACTICE"
        title="Capture The Flag"
        subtitle="Active participation in Hack The Box, TryHackMe, PicoCTF, and international competitions covering web security, OSINT, digital forensics, cloud security, Active Directory, reverse engineering, and exploitation."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <Reveal>
          <div className="glass-panel h-full rounded-lg p-6">
            <p className="technical-label">PLATFORMS</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {ctfPlatforms.map((platform) => (
                <span key={platform} className="rounded-md border border-accent/25 bg-accent/10 px-3 py-2 text-sm text-accent">
                  {platform}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal>
          <div className="glass-panel h-full rounded-lg p-6">
            <p className="technical-label">CATEGORIES</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {ctfCategories.map((category) => (
                <span key={category} className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-slate-300">
                  {category}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
