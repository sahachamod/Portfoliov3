"use client";

import { type FormEvent } from "react";
import { BookOpen, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { github, identity, linkedin, medium } from "@/lib/data";
import { MagneticButton } from "./MotionPrimitives";
import { SectionHeading } from "./SectionHeading";

export function Contact() {
  // Opens the visitor's mail client with the message prefilled. No server-side email configuration required.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (String(data.get("company") ?? "").trim() !== "") return; // honeypot
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}
Email: ${email}

${message}`);
    window.location.href = `mailto:${identity.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="section-shell py-24">
      <SectionHeading
        eyebrow="CONTACT"
        title="Have a security problem worth solving?"
        subtitle="DevSecOps consulting, security research collaboration, responsible disclosure, CTF teams, or interesting security problems."
      />
      <div className="mt-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="glass-panel rounded-lg p-6">
          <div className="flex flex-wrap gap-3">
            <MagneticButton href={`mailto:${identity.email}`}>Email Sahan</MagneticButton>
            <MagneticButton href={linkedin} variant="secondary">
              LinkedIn
            </MagneticButton>
          </div>
          <div className="mt-8 grid gap-3 text-sm text-slate-300">
            <a className="flex items-center gap-3 transition hover:text-accent" href={`mailto:${identity.email}`}>
              <Mail size={16} /> {identity.email}
            </a>
            <a className="flex items-center gap-3 transition hover:text-accent" href={identity.phoneHref}>
              <Phone size={16} /> {identity.phone}
            </a>
            <p className="flex items-center gap-3">
              <MapPin size={16} /> {identity.location}
            </p>
            <a className="flex items-center gap-3 transition hover:text-accent" href={github} target="_blank" rel="noreferrer">
              <Github size={16} /> github.com/{github.split("/").pop()}
            </a>
            <a className="flex items-center gap-3 transition hover:text-accent" href={linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={16} /> linkedin.com/in/{linkedin.split("/").pop()}
            </a>
            <a className="flex items-center gap-3 transition hover:text-accent" href={medium} target="_blank" rel="noreferrer">
              <BookOpen size={16} /> medium.com/{medium.split("/").pop()}
            </a>
          </div>
        </div>
        <form
          className="glass-panel rounded-lg p-6"
          onSubmit={handleSubmit}
        >
          <input className="hidden" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm text-slate-300">
              Name
              <input required minLength={2} className="mt-2 w-full rounded-md border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-accent/60" name="name" />
            </label>
            <label className="text-sm text-slate-300">
              Email
              <input required type="email" className="mt-2 w-full rounded-md border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-accent/60" name="email" />
            </label>
          </div>
          <label className="mt-4 block text-sm text-slate-300">
            Message
            <textarea required minLength={20} rows={6} className="mt-2 w-full resize-y rounded-md border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-accent/60" name="message" />
          </label>
          <div className="mt-5 flex items-center justify-between gap-4">
            <p className="text-xs text-slate-500">Opens your email app with the message ready to send.</p>
            <button className="rounded-full bg-white px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-slate-200" type="submit">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
