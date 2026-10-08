"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Shield, X } from "lucide-react";
import { identity } from "@/lib/data";

const nav = [
  ["About", "#about"],
  ["Experience", "#experience"],
  ["Research", "#research"],
  ["Projects", "#projects"],
  ["Skills", "#skills"],
  ["CTF", "#ctf"],
  ["Education", "#education"]
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/[0.06] bg-[#0b0f1a]/80 backdrop-blur-xl">
      <nav className="section-shell flex h-16 items-center justify-between" aria-label="Primary">
        <a className="flex items-center gap-2.5 text-white" href="#top" aria-label="Home">
          <Shield size={18} className="text-accent" aria-hidden="true" />
          <span className="text-sm font-semibold">{identity.name}</span>
        </a>
        <div className="hidden items-center gap-7 lg:flex">
          {nav.map(([label, href]) => (
            <a key={label} className="text-sm text-slate-400 transition hover:text-white" href={href}>
              {label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <a className="rounded-full bg-white px-5 py-2 text-sm font-medium text-slate-950 transition hover:bg-slate-200" href="#contact">
            Contact
          </a>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full border border-white/15 text-white lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-white/[0.06] lg:hidden"
          >
            <div className="section-shell grid gap-1 py-3">
              {nav.map(([label, href]) => (
                <a key={label} className="rounded-md px-3 py-3 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white" href={href} onClick={() => setOpen(false)}>
                  {label}
                </a>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
