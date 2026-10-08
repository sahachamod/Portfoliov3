"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { researchCategories, researchTracks } from "@/lib/data";
import { Reveal } from "./MotionPrimitives";
import { SectionHeading } from "./SectionHeading";

export function Research() {
  const [active, setActive] = useState("ALL");
  const visible = active === "ALL" ? researchTracks : researchTracks.filter((track) => track.category === active);

  return (
    <section id="research" className="section-shell py-24">
      <SectionHeading eyebrow="CENTRAL ARCHIVE" title="Security Research" subtitle="Practical security testing combined with continuous technical research across modern applications, systems, and infrastructure." />
      <Reveal className="mt-10">
        <div className="flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Research categories">
          {researchCategories.map((category) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={active === category}
              onClick={() => setActive(category)}
              className={`min-h-10 rounded-md border px-4 font-mono text-xs transition ${
                active === category ? "border-accent/60 bg-accent/10 text-accent" : "border-white/10 bg-white/[0.03] text-slate-400 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </Reveal>
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.length === 0 ? (
            <motion.p
              key={`${active}-empty`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 18 }}
              transition={{ duration: 0.45 }}
              className="glass-panel rounded-lg p-6 text-sm leading-7 text-slate-300 lg:col-span-2"
            >
              No published research tracks in {active} yet. Notes will appear here as work is verified and written up.
            </motion.p>
          ) : null}
          {visible.map((track) => (
            <motion.article
              key={track.title}
              layout
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 18 }}
              transition={{ duration: 0.45 }}
              className="glass-panel rounded-lg p-6 transition hover:border-accent/35"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="technical-label">{track.category} / {track.date}</p>
                  <h3 className="mt-3 text-2xl font-semibold text-white">{track.title}</h3>
                </div>
                <ArrowUpRight className="text-accent" size={20} aria-hidden="true" />
              </div>
              <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
                <div>
                  <dt className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-slate-500">Target technology</dt>
                  <dd className="mt-2 text-slate-200">{track.target}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-slate-500">Disclosure status</dt>
                  <dd className="mt-2 text-slate-200">{track.status}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-slate-500">Methodology</dt>
                  <dd className="mt-2 text-slate-200">{track.methodology}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-slate-500">Impact</dt>
                  <dd className="mt-2 text-slate-200">{track.impact}</dd>
                </div>
              </dl>
              <div className="mt-6 flex flex-wrap gap-2">
                {track.tags.map((tag) => (
                  <span key={tag} className="rounded-md border border-white/10 bg-black/20 px-2.5 py-1.5 text-xs text-slate-300">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
