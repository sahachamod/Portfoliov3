"use client";

import { useCallback, useState } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { identity } from "@/lib/data";
import { HeroGlobe, type AttackEvent } from "./HeroGlobe";

const stats = [
  ["NASA", "Hall of Fame · Letter of Recognition"],
  ["#45", "Global rank · HTB Cyber Apocalypse 2026"],
  ["Top 150", "Black Hat CTF"]
];

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: "easeOut" as const }
});

const MAX_EVENTS = 4;

export function Hero() {
  const [events, setEvents] = useState<(AttackEvent & { id: number })[]>([]);

  const handleEvent = useCallback((event: AttackEvent) => {
    setEvents((current) => [{ ...event, id: Date.now() + Math.random() }, ...current].slice(0, MAX_EVENTS));
  }, []);

  return (
    <section id="top" className="relative overflow-hidden pt-16">
      <div className="section-shell grid min-h-[calc(100vh-4rem)] items-center gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-10">
        <div className="relative z-10">
          <motion.h1 {...fade(0)} className="text-6xl font-semibold leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-8xl">
            Sahan
            <br />
            Chamod
          </motion.h1>
          <motion.p {...fade(0.16)} className="mt-6 text-2xl text-accent sm:text-3xl">
            DevSecOps Engineer &amp; Cybersecurity Researcher
          </motion.p>
          <motion.p {...fade(0.24)} className="mt-5 max-w-xl text-lg leading-8 text-slate-300">
            I secure software delivery pipelines and cloud infrastructure, and break applications through vulnerability research, penetration
            testing, and bug bounty programs.
          </motion.p>
          <motion.div {...fade(0.32)} className="mt-9 flex flex-wrap gap-3">
            <a
              href="#experience"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-200"
            >
              View my work
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/[0.08]"
            >
              Get in touch
            </a>
          </motion.div>
          <motion.dl {...fade(0.42)} className="mt-12 flex max-w-xl flex-wrap gap-x-10 gap-y-6 border-t border-white/10 pt-8">
            {stats.map(([value, label]) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd className={`text-4xl font-semibold ${value === "NASA" ? "text-accent" : "text-white"}`}>{value}</dd>
                <p className="mt-1 max-w-[12rem] text-sm text-slate-400">{label}</p>
              </div>
            ))}
          </motion.dl>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="relative mx-auto aspect-square w-full max-w-[560px] lg:max-w-none"
        >
          <HeroGlobe onEvent={handleEvent} />

          {/* Live attack-chain feed */}
          <div className="pointer-events-none absolute bottom-3 left-3 w-[min(100%,19rem)] rounded-md border border-white/[0.08] bg-[#0b0f1a]/80 p-3 font-mono text-[0.62rem] backdrop-blur">
            <div className="flex items-center justify-between text-slate-500">
              <span className="flex items-center gap-2 uppercase tracking-[0.18em]">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#ff785a] opacity-70" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-[#ff785a]" />
                </span>
                Attack chain simulation
              </span>
              <span className="uppercase tracking-[0.18em]">Live</span>
            </div>
            <ul className="mt-2 space-y-1" aria-live="off">
              {events.length === 0 ? <li className="text-slate-600">Initialising sensors…</li> : null}
              {events.map((event, index) => (
                <li key={event.id} className="flex gap-2 text-slate-300" style={{ opacity: 1 - index * 0.2 }}>
                  <span className="text-slate-500">{event.time}</span>
                  <span className="text-[#ff785a]">{event.stage}</span>
                  <span className="truncate text-slate-400">
                    {event.from} → {event.to}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <p className="pointer-events-none absolute right-3 top-3 text-[0.62rem] uppercase tracking-[0.2em] text-slate-500">Drag to rotate</p>
        </motion.div>
      </div>
      <p className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-slate-500 lg:block">
        Scroll
      </p>
      <span className="sr-only">{identity.headline}</span>
    </section>
  );
}
